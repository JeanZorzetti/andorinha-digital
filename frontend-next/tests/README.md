# Testing Documentation

Este diretório contém todos os testes automatizados do sistema Andorinha Digital.

## Estrutura de Testes

```
tests/
├── unit/           # Testes unitários (funções, classes, utilitários)
├── e2e/            # Testes end-to-end (fluxos completos de usuário)
├── integration/    # Testes de integração (APIs, banco de dados)
├── fixtures/       # Dados mock para testes
└── setup.ts        # Configuração global dos testes
```

## Comandos Disponíveis

### Testes Unitários (Vitest)

```bash
# Executar todos os testes unitários
npm test

# Executar com interface visual
npm run test:ui

# Executar com relatório de cobertura
npm run test:coverage

# Executar em modo watch (desenvolvimento)
npm test -- --watch
```

### Testes E2E (Playwright)

```bash
# Executar testes E2E
npm run test:e2e

# Executar com interface visual
npm run test:e2e:ui

# Executar apenas no Chromium
npm run test:e2e -- --project=chromium
```

## Testes Implementados

### Testes Unitários

#### Rate Limiting (`tests/unit/lib/rate-limit.test.ts`)
- ✅ Permite requisições dentro do limite
- ✅ Bloqueia requisições excedendo limite
- ✅ Reseta após janela expirar
- ✅ Rastreia identificadores separadamente
- ✅ Reabastece tokens gradualmente
- ✅ Remove entries expirados
- ✅ Valida todos os presets (AUTH, PUBLIC_API, etc.)

#### Webhooks (`tests/unit/lib/webhooks.test.ts`)
- ✅ Gera assinatura HMAC SHA-256
- ✅ Gera assinaturas consistentes
- ✅ Diferencia assinaturas por payload e secret
- ✅ Verifica assinaturas válidas
- ✅ Rejeita assinaturas inválidas
- ✅ Rejeita assinaturas com secret incorreto
- ✅ Detecta payload adulterado
- ✅ Trata caracteres especiais
- ✅ Usa comparação timing-safe

#### Email Templates (`tests/unit/lib/email.test.ts`)
- ✅ Gera email de boas-vindas (com/sem senha temporária)
- ✅ Gera notificação de senha alterada
- ✅ Gera notificação de role alterado
- ✅ Inclui branding correto
- ✅ Estrutura HTML válida
- ✅ Versão texto sem HTML
- ✅ Call-to-action no welcome email
- ✅ Informações de segurança

### Testes E2E

#### Autenticação (`tests/e2e/auth.spec.ts`)
- ✅ Exibe página de login
- ✅ Mostra erro para credenciais inválidas
- ✅ Mostra erro para campos vazios
- ✅ Login com credenciais de admin válidas
- ✅ Logout com sucesso
- ✅ Persiste sessão após reload
- ✅ Redireciona para login em rotas protegidas
- ✅ Rate limiting em tentativas excessivas

#### Gerenciamento de Usuários (`tests/e2e/user-management.spec.ts`)
- ✅ Exibe tabela de usuários
- ✅ Abre modal de criação
- ✅ Cria novo usuário
- ✅ Valida campos obrigatórios
- ✅ Previne email duplicado
- ✅ Edita usuário existente
- ✅ Deleta usuário
- ✅ Filtra usuários por role
- ✅ Busca usuários
- ✅ Paginação
- ✅ Autorização (apenas admin)

## Cobertura de Código

Última execução:
```
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
All files      |   28.97 |    33.33 |   23.33 |   29.52
 email.ts      |   30.76 |    43.75 |   42.85 |   30.76
 rate-limit.ts |   57.14 |       50 |      25 |   57.14
 webhooks.ts   |   13.2  |    11.76 |   13.33 |   13.72
```

## Fixtures e Mocks

### Test Data (`tests/fixtures/test-data.ts`)

Dados mock prontos para uso nos testes:
- `mockUsers`: admin, author, client
- `mockPosts`: published, draft
- `mockWebhooks`: active, inactive
- `mockNotifications`: unread, read
- `mockApiResponses`: success, error, validationError
- `mockWebhookPayload`: exemplo de payload

## Configuração

### Vitest (`vitest.config.ts`)

- **Environment**: jsdom (para testes de React)
- **Globals**: habilitado (describe, it, expect)
- **Setup**: `tests/setup.ts` (configuração global)
- **Coverage**: V8 provider
- **Path alias**: `@` → `./src`

### Playwright (`playwright.config.ts`)

- **Test dir**: `tests/e2e`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium (configurado)
- **Reporter**: HTML
- **Retry**: 2x em CI, 0x local
- **Timeout**: 30s por teste

## Mocks Globais

### Setup (`tests/setup.ts`)

Mocks automáticos:
- `next/navigation`: useRouter, usePathname, redirect
- `next-auth/react`: useSession, signIn, signOut
- `@/lib/prisma`: Prisma Client (todos os modelos)

Variáveis de ambiente de teste:
- `NEXTAUTH_SECRET`: test-secret-key-for-testing-only
- `NEXTAUTH_URL`: http://localhost:3000
- `DATABASE_URL`: postgresql://test:test@localhost:5432/test

## Boas Práticas

### Escrevendo Testes

1. **Use fixtures**: Reutilize dados de `tests/fixtures/test-data.ts`
2. **Seja específico**: Teste um comportamento por teste
3. **Nomes claros**: Descreva o que está sendo testado
4. **Arrange-Act-Assert**: Organize seu código de teste
5. **Cleanup**: Use afterEach para limpar estado

### Exemplo de Teste Unitário

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/my-module'

describe('myFunction', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = myFunction(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

### Exemplo de Teste E2E

```typescript
import { test, expect } from '@playwright/test'

test('should complete user flow', async ({ page }) => {
  // Navigate
  await page.goto('/admin/users')

  // Interact
  await page.click('button:has-text("New User")')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')

  // Assert
  await expect(page.locator('text=User created')).toBeVisible()
})
```

## CI/CD Integration

Os testes estão prontos para integração com GitHub Actions:

```yaml
- name: Run tests
  run: |
    npm test -- --run
    npm run test:e2e
```

## Próximos Passos

- [ ] Aumentar cobertura para >80%
- [ ] Adicionar testes de integração (API routes)
- [ ] Testes de acessibilidade (axe-core)
- [ ] Testes de performance (Lighthouse CI)
- [ ] Visual regression tests
- [ ] Load testing com k6
