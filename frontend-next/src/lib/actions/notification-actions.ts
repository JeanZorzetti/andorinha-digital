/**
 * Notification Actions
 *
 * Server Actions para gerenciar notificações in-app
 */

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

interface CreateNotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

/**
 * Cria uma nova notificação para um usuário
 */
export async function createNotification(data: CreateNotificationData) {
  try {
    const notification = await prisma.notification.create({
      data,
    });

    revalidatePath("/admin");

    return { success: true, notification };
  } catch (error) {
    console.error("Error creating notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error creating notification",
    };
  }
}

/**
 * Busca notificações do usuário logado
 */
export async function getMyNotifications({
  limit = 10,
  unreadOnly = false,
}: {
  limit?: number;
  unreadOnly?: boolean;
} = {}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
        ...(unreadOnly && { read: false }),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const unreadCount = await prisma.notification.count({
      where: {
        userId: session.user.id,
        read: false,
      },
    });

    return { success: true, notifications, unreadCount };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error fetching notifications",
    };
  }
}

/**
 * Marca uma notificação como lida
 */
export async function markAsRead(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Verificar se a notificação pertence ao usuário
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== session.user.id) {
      return { success: false, error: "Notification not found" };
    }

    await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error updating notification",
    };
  }
}

/**
 * Marca todas as notificações como lidas
 */
export async function markAllAsRead() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        read: false,
      },
      data: { read: true },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error updating notifications",
    };
  }
}

/**
 * Deleta uma notificação
 */
export async function deleteNotification(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Verificar se a notificação pertence ao usuário
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== session.user.id) {
      return { success: false, error: "Notification not found" };
    }

    await prisma.notification.delete({
      where: { id },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error deleting notification",
    };
  }
}

/**
 * Helpers para criar notificações específicas
 */
export const NotificationHelpers = {
  /**
   * Notificação de boas-vindas
   */
  welcomeUser: async (userId: string, userName: string) => {
    return createNotification({
      userId,
      type: "SUCCESS",
      title: "Bem-vindo!",
      message: `Olá ${userName}! Sua conta foi criada com sucesso. Explore o painel administrativo e comece a gerenciar seu conteúdo.`,
    });
  },

  /**
   * Notificação de publicação de post
   */
  postPublished: async (userId: string, postTitle: string, postSlug: string) => {
    return createNotification({
      userId,
      type: "SUCCESS",
      title: "Post Publicado",
      message: `Seu post "${postTitle}" foi publicado com sucesso!`,
      link: `/blog/${postSlug}`,
    });
  },

  /**
   * Notificação de erro genérico
   */
  errorNotification: async (userId: string, title: string, message: string) => {
    return createNotification({
      userId,
      type: "ERROR",
      title,
      message,
    });
  },

  /**
   * Notificação de webhook falhado
   */
  webhookFailed: async (userId: string, webhookName: string) => {
    return createNotification({
      userId,
      type: "WARNING",
      title: "Webhook Falhado",
      message: `O webhook "${webhookName}" falhou ao entregar uma notificação. Verifique os logs para mais detalhes.`,
      link: "/admin/settings/webhooks",
    });
  },
};
