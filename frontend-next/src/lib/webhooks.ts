/**
 * Webhook Dispatch System
 *
 * Sistema para enviar webhooks para URLs externas quando eventos ocorrem no sistema
 */

import prisma from "@/lib/prisma";
import crypto from "crypto";

export type WebhookEvent =
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "POST_PUBLISHED"
  | "POST_UNPUBLISHED"
  | "CASE_CREATED"
  | "SERVICE_CREATED";

interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: Record<string, unknown>;
}

/**
 * Gera assinatura HMAC para verificação de autenticidade
 */
function generateSignature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Envia webhook para uma URL específica com retry
 */
async function sendWebhookRequest(
  url: string,
  payload: WebhookPayload,
  secret: string,
  retryCount = 0
): Promise<{
  success: boolean;
  statusCode?: number;
  response?: string;
  error?: string;
}> {
  const maxRetries = 3;
  const payloadString = JSON.stringify(payload);
  const signature = generateSignature(payloadString, secret);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
        "X-Webhook-Event": payload.event,
        "User-Agent": "Andorinha-Webhooks/1.0",
      },
      body: payloadString,
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Retry on 5xx errors
      if (response.status >= 500 && retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        return sendWebhookRequest(url, payload, secret, retryCount + 1);
      }

      return {
        success: false,
        statusCode: response.status,
        response: responseText,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      statusCode: response.status,
      response: responseText,
    };
  } catch (error) {
    // Retry on network errors
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendWebhookRequest(url, payload, secret, retryCount + 1);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Dispatcha um evento de webhook para todas as subscriptions ativas
 */
export async function dispatchWebhook(
  event: WebhookEvent,
  data: Record<string, unknown>
): Promise<void> {
  try {
    // Buscar todas as subscriptions ativas que estão inscritas neste evento
    const subscriptions = await prisma.webhookSubscription.findMany({
      where: {
        isActive: true,
        events: {
          has: event,
        },
      },
    });

    if (subscriptions.length === 0) {
      console.log(`ℹ️ No active webhooks for event: ${event}`);
      return;
    }

    const payload: WebhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      data,
    };

    // Enviar webhooks em paralelo (fire-and-forget)
    const promises = subscriptions.map(async (subscription) => {
      try {
        const result = await sendWebhookRequest(
          subscription.url,
          payload,
          subscription.secret
        );

        // Log o resultado
        await prisma.webhookLog.create({
          data: {
            subscriptionId: subscription.id,
            event,
            payload: JSON.stringify(payload),
            response: result.response,
            statusCode: result.statusCode,
            success: result.success,
            error: result.error,
            retriesCount: 0, // TODO: track actual retry count
          },
        });

        if (result.success) {
          console.log(
            `✅ Webhook sent successfully to ${subscription.name} (${subscription.url})`
          );
        } else {
          console.error(
            `❌ Webhook failed for ${subscription.name}: ${result.error}`
          );
        }
      } catch (error) {
        console.error(
          `❌ Error sending webhook to ${subscription.name}:`,
          error
        );
      }
    });

    // Não aguardar os webhooks completarem para não bloquear a operação principal
    Promise.all(promises).catch((error) => {
      console.error("Error dispatching webhooks:", error);
    });

    console.log(`📤 Dispatched ${subscriptions.length} webhook(s) for event: ${event}`);
  } catch (error) {
    console.error("Error in dispatchWebhook:", error);
  }
}

/**
 * Helpers para eventos específicos
 */
export const WebhookHelpers = {
  userCreated: (user: { id: string; name: string; email: string; role: string }) => {
    return dispatchWebhook("USER_CREATED", {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  },

  userUpdated: (user: { id: string; name: string; email: string; role: string }) => {
    return dispatchWebhook("USER_UPDATED", {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  },

  userDeleted: (userId: string, email: string) => {
    return dispatchWebhook("USER_DELETED", {
      userId,
      email,
    });
  },

  postPublished: (post: { id: string; title: string; slug: string; author: string }) => {
    return dispatchWebhook("POST_PUBLISHED", {
      postId: post.id,
      title: post.title,
      slug: post.slug,
      author: post.author,
      url: `${process.env.NEXTAUTH_URL}/blog/${post.slug}`,
    });
  },

  postUnpublished: (postId: string, title: string) => {
    return dispatchWebhook("POST_UNPUBLISHED", {
      postId,
      title,
    });
  },

  caseCreated: (caseStudy: { id: string; title: string; slug: string; client: string }) => {
    return dispatchWebhook("CASE_CREATED", {
      caseId: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      client: caseStudy.client,
      url: `${process.env.NEXTAUTH_URL}/cases/${caseStudy.slug}`,
    });
  },

  serviceCreated: (service: { id: string; title: string; slug: string }) => {
    return dispatchWebhook("SERVICE_CREATED", {
      serviceId: service.id,
      title: service.title,
      slug: service.slug,
      url: `${process.env.NEXTAUTH_URL}/servicos/${service.slug}`,
    });
  },
};
