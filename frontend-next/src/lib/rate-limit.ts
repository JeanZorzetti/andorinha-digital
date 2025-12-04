/**
 * Rate Limiting System
 *
 * Implementa rate limiting em memória para proteger APIs contra abuso.
 * Para produção com múltiplos servidores, considere usar Redis ou Upstash.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Limpar entries expirados a cada minuto
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  /**
   * Verifica se uma requisição está dentro do limite
   * @param identifier - Identificador único (IP, userId, etc.)
   * @param limit - Número máximo de requisições
   * @param window - Janela de tempo em segundos
   * @returns { success: boolean, limit: number, remaining: number, reset: number }
   */
  check(
    identifier: string,
    limit: number,
    window: number
  ): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  } {
    const now = Date.now();
    const key = `${identifier}:${limit}:${window}`;
    const entry = this.store.get(key);

    // Se não existe ou expirou, criar novo
    if (!entry || now >= entry.resetTime) {
      const resetTime = now + window * 1000;
      this.store.set(key, {
        count: 1,
        resetTime,
      });

      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: resetTime,
      };
    }

    // Se ainda tem quota disponível
    if (entry.count < limit) {
      entry.count++;
      this.store.set(key, entry);

      return {
        success: true,
        limit,
        remaining: limit - entry.count,
        reset: entry.resetTime,
      };
    }

    // Limite excedido
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  /**
   * Limpa entries expirados do store
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now >= entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Limpa completamente o store (útil para testes)
   */
  clear() {
    this.store.clear();
  }

  /**
   * Cleanup quando o processo termina
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Instância singleton
export const rateLimiter = new RateLimiter();

// Rate limit presets
export const RateLimitPresets = {
  // Login: 5 tentativas a cada 15 minutos
  AUTH: { limit: 5, window: 15 * 60 },

  // API pública: 100 requisições por hora
  PUBLIC_API: { limit: 100, window: 60 * 60 },

  // API autenticada: 1000 requisições por hora
  AUTHENTICATED_API: { limit: 1000, window: 60 * 60 },

  // Form submissions: 10 por hora
  FORM_SUBMIT: { limit: 10, window: 60 * 60 },

  // File uploads: 20 por hora
  FILE_UPLOAD: { limit: 20, window: 60 * 60 },
} as const;

/**
 * Helper function para aplicar rate limit
 */
export async function applyRateLimit(
  identifier: string,
  preset: keyof typeof RateLimitPresets
) {
  const config = RateLimitPresets[preset];
  return rateLimiter.check(identifier, config.limit, config.window);
}

/**
 * Helper para extrair identificador da requisição
 */
export function getIdentifier(headers: Headers, fallback = "anonymous"): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    fallback;
  return ip;
}
