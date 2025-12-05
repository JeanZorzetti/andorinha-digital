/**
 * Webhook Management Actions
 *
 * Server Actions para gerenciar webhooks subscriptions
 */

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

type WebhookEvent =
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "POST_PUBLISHED"
  | "POST_UNPUBLISHED"
  | "CASE_CREATED"
  | "SERVICE_CREATED";

interface CreateWebhookData {
  name: string;
  url: string;
  events: WebhookEvent[];
  description?: string;
}

interface UpdateWebhookData {
  id: string;
  name?: string;
  url?: string;
  events?: WebhookEvent[];
  description?: string;
  isActive?: boolean;
}

/**
 * Cria uma nova webhook subscription
 */
export async function createWebhook(data: CreateWebhookData) {
  try {
    // Verificar autenticação e autorização
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    // Validar URL
    try {
      new URL(data.url);
    } catch {
      return { success: false, error: "Invalid URL format" };
    }

    // Gerar secret aleatório para HMAC
    const secret = crypto.randomBytes(32).toString("hex");

    const webhook = await prisma.webhookSubscription.create({
      data: {
        name: data.name,
        url: data.url,
        events: data.events,
        secret,
        description: data.description,
      },
    });

    revalidatePath("/admin/settings/webhooks");

    return { success: true, webhook, secret };
  } catch (error) {
    console.error("Error creating webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error creating webhook",
    };
  }
}

/**
 * Atualiza uma webhook subscription
 */
export async function updateWebhook(data: UpdateWebhookData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    // Validar URL se fornecida
    if (data.url) {
      try {
        new URL(data.url);
      } catch {
        return { success: false, error: "Invalid URL format" };
      }
    }

    const { id, ...updateData } = data;

    const webhook = await prisma.webhookSubscription.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/settings/webhooks");

    return { success: true, webhook };
  } catch (error) {
    console.error("Error updating webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error updating webhook",
    };
  }
}

/**
 * Deleta uma webhook subscription
 */
export async function deleteWebhook(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.webhookSubscription.delete({
      where: { id },
    });

    revalidatePath("/admin/settings/webhooks");

    return { success: true };
  } catch (error) {
    console.error("Error deleting webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error deleting webhook",
    };
  }
}

/**
 * Lista todas as webhook subscriptions
 */
export async function listWebhooks() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const webhooks = await prisma.webhookSubscription.findMany({
      include: {
        _count: {
          select: {
            logs: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, webhooks };
  } catch (error) {
    console.error("Error listing webhooks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error listing webhooks",
    };
  }
}

/**
 * Busca uma webhook subscription por ID
 */
export async function getWebhook(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const webhook = await prisma.webhookSubscription.findUnique({
      where: { id },
      include: {
        logs: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!webhook) {
      return { success: false, error: "Webhook not found" };
    }

    return { success: true, webhook };
  } catch (error) {
    console.error("Error fetching webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error fetching webhook",
    };
  }
}

/**
 * Lista logs de webhooks
 */
export async function listWebhookLogs({
  subscriptionId,
  page = 1,
  limit = 50,
}: {
  subscriptionId?: string;
  page?: number;
  limit?: number;
} = {}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const skip = (page - 1) * limit;
    const where = subscriptionId ? { subscriptionId } : {};

    const [logs, total] = await Promise.all([
      prisma.webhookLog.findMany({
        where,
        include: {
          subscription: {
            select: {
              name: true,
              url: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.webhookLog.count({ where }),
    ]);

    return {
      success: true,
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error listing webhook logs:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error listing logs",
    };
  }
}

/**
 * Envia um evento de teste para um webhook
 */
export async function testWebhook(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const webhook = await prisma.webhookSubscription.findUnique({
      where: { id },
    });

    if (!webhook) {
      return { success: false, error: "Webhook not found" };
    }

    // Enviar um payload de teste
    const testPayload = {
      event: "USER_CREATED" as const,
      timestamp: new Date().toISOString(),
      data: {
        test: true,
        message: "This is a test webhook event",
      },
    };

    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": "test-signature",
        "X-Webhook-Event": "USER_CREATED",
        "User-Agent": "Andorinha-Webhooks/1.0",
      },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(10000),
    });

    const responseText = await response.text();

    // Log o teste
    await prisma.webhookLog.create({
      data: {
        subscriptionId: id,
        event: "USER_CREATED",
        payload: JSON.stringify(testPayload),
        response: responseText,
        statusCode: response.status,
        success: response.ok,
        error: response.ok ? null : `HTTP ${response.status}`,
        retriesCount: 0,
      },
    });

    return {
      success: response.ok,
      statusCode: response.status,
      response: responseText,
    };
  } catch (error) {
    console.error("Error testing webhook:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error testing webhook",
    };
  }
}

/**
 * Regenera o secret de um webhook
 */
export async function regenerateWebhookSecret(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const newSecret = crypto.randomBytes(32).toString("hex");

    const webhook = await prisma.webhookSubscription.update({
      where: { id },
      data: { secret: newSecret },
    });

    revalidatePath("/admin/settings/webhooks");

    return { success: true, webhook, secret: newSecret };
  } catch (error) {
    console.error("Error regenerating secret:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error regenerating secret",
    };
  }
}
