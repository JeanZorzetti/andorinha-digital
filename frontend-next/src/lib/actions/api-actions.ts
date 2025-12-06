"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";

// ============================================
// API SETTINGS ACTIONS
// ============================================

export async function getApiSettings() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    let settings = await prisma.apiSettings.findUnique({
      where: { id: "singleton" },
    });

    if (!settings) {
      settings = await prisma.apiSettings.create({
        data: { id: "singleton" },
      });
    }

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error getting API settings:", error);
    return {
      success: false,
      error: "Erro ao buscar configurações de API",
    };
  }
}

export async function updateApiSettings(data: {
  enableRateLimiting: boolean;
  requestsPerMinute: number;
  requestsPerHour: number;
  enableCors: boolean;
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  allowCredentials: boolean;
  requireApiKey: boolean;
  apiKeyHeaderName: string;
  enableRequestLogging: boolean;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const settings = await prisma.apiSettings.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    revalidatePath("/admin/settings/api");

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error updating API settings:", error);
    return {
      success: false,
      error: "Erro ao atualizar configurações de API",
    };
  }
}

// ============================================
// API KEY ACTIONS
// ============================================

function generateApiKey(): string {
  // Generate a secure random API key
  const prefix = "sk"; // Secret key prefix
  const randomBytes = crypto.randomBytes(32).toString("hex");
  return `${prefix}_${randomBytes}`;
}

function hashApiKey(key: string): string {
  // Hash the API key for storage
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function getApiKeys() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { createdBy: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        scopes: true,
        isActive: true,
        customRateLimit: true,
        requestsPerMinute: true,
        requestsPerHour: true,
        lastUsedAt: true,
        usageCount: true,
        expiresAt: true,
        createdAt: true,
        updatedAt: true,
        // Don't select the actual key (hashed)
      },
    });

    return { success: true, data: apiKeys };
  } catch (error: unknown) {
    console.error("Error getting API keys:", error);
    return {
      success: false,
      error: "Erro ao buscar API keys",
    };
  }
}

export async function createApiKey(data: {
  name: string;
  description?: string;
  scopes?: string[];
  customRateLimit?: boolean;
  requestsPerMinute?: number;
  requestsPerHour?: number;
  expiresAt?: Date | null;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Generate the actual API key (plain text - only shown once)
    const plainKey = generateApiKey();
    const hashedKey = hashApiKey(plainKey);

    const apiKey = await prisma.apiKey.create({
      data: {
        name: data.name,
        key: hashedKey,
        description: data.description,
        scopes: data.scopes || [],
        customRateLimit: data.customRateLimit,
        requestsPerMinute: data.requestsPerMinute,
        requestsPerHour: data.requestsPerHour,
        expiresAt: data.expiresAt,
        createdBy: session.user.id,
      },
    });

    revalidatePath("/admin/settings/api");

    // Return the plain key only once (won't be stored)
    return {
      success: true,
      data: apiKey,
      plainKey, // IMPORTANT: This is the only time the key is visible
    };
  } catch (error: unknown) {
    console.error("Error creating API key:", error);
    return {
      success: false,
      error: "Erro ao criar API key",
    };
  }
}

export async function updateApiKey(
  id: string,
  data: {
    name?: string;
    description?: string;
    scopes?: string[];
    isActive?: boolean;
    customRateLimit?: boolean;
    requestsPerMinute?: number;
    requestsPerHour?: number;
    expiresAt?: Date | null;
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Verify ownership
    const existingKey = await prisma.apiKey.findUnique({
      where: { id },
      select: { createdBy: true },
    });

    if (!existingKey) {
      return { success: false, error: "API key não encontrada" };
    }

    if (existingKey.createdBy !== session.user.id) {
      return { success: false, error: "Não autorizado" };
    }

    const apiKey = await prisma.apiKey.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/settings/api");

    return { success: true, data: apiKey };
  } catch (error: unknown) {
    console.error("Error updating API key:", error);
    return {
      success: false,
      error: "Erro ao atualizar API key",
    };
  }
}

export async function deleteApiKey(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Verify ownership
    const existingKey = await prisma.apiKey.findUnique({
      where: { id },
      select: { createdBy: true },
    });

    if (!existingKey) {
      return { success: false, error: "API key não encontrada" };
    }

    if (existingKey.createdBy !== session.user.id) {
      return { success: false, error: "Não autorizado" };
    }

    await prisma.apiKey.delete({
      where: { id },
    });

    revalidatePath("/admin/settings/api");

    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting API key:", error);
    return {
      success: false,
      error: "Erro ao excluir API key",
    };
  }
}

export async function regenerateApiKey(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Verify ownership
    const existingKey = await prisma.apiKey.findUnique({
      where: { id },
      select: { createdBy: true },
    });

    if (!existingKey) {
      return { success: false, error: "API key não encontrada" };
    }

    if (existingKey.createdBy !== session.user.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Generate new key
    const plainKey = generateApiKey();
    const hashedKey = hashApiKey(plainKey);

    const apiKey = await prisma.apiKey.update({
      where: { id },
      data: { key: hashedKey },
    });

    revalidatePath("/admin/settings/api");

    return {
      success: true,
      data: apiKey,
      plainKey, // Return new plain key (only shown once)
    };
  } catch (error: unknown) {
    console.error("Error regenerating API key:", error);
    return {
      success: false,
      error: "Erro ao regenerar API key",
    };
  }
}

// ============================================
// API KEY VERIFICATION (for middleware/API routes)
// ============================================

export async function verifyApiKey(key: string): Promise<{
  valid: boolean;
  apiKey?: {
    id: string;
    name: string;
    scopes: string[];
    userId: string;
  };
}> {
  try {
    const hashedKey = hashApiKey(key);

    const apiKey = await prisma.apiKey.findUnique({
      where: { key: hashedKey },
      select: {
        id: true,
        name: true,
        scopes: true,
        isActive: true,
        expiresAt: true,
        createdBy: true,
      },
    });

    if (!apiKey) {
      return { valid: false };
    }

    if (!apiKey.isActive) {
      return { valid: false };
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return { valid: false };
    }

    // Update usage stats
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: {
        lastUsedAt: new Date(),
        usageCount: { increment: 1 },
      },
    });

    return {
      valid: true,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        scopes: apiKey.scopes,
        userId: apiKey.createdBy,
      },
    };
  } catch (error: unknown) {
    console.error("Error verifying API key:", error);
    return { valid: false };
  }
}
