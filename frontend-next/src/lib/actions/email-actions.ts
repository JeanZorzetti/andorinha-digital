"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { EmailTemplateType } from "@prisma/client";

// ============================================
// EMAIL SETTINGS ACTIONS
// ============================================

export async function getEmailSettings() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    let settings = await prisma.emailSettings.findUnique({
      where: { id: "singleton" },
    });

    if (!settings) {
      settings = await prisma.emailSettings.create({
        data: { id: "singleton" },
      });
    }

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error getting email settings:", error);
    return {
      success: false,
      error: "Erro ao buscar configurações de email",
    };
  }
}

export async function updateEmailSettings(data: {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  smtpFrom: string;
  smtpFromName: string;
  enableEmailNotifications: boolean;
  enableWelcomeEmail: boolean;
  enablePasswordReset: boolean;
  enableContactFormEmail: boolean;
  enableNewsletterEmail: boolean;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const settings = await prisma.emailSettings.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    revalidatePath("/admin/settings/email");

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error updating email settings:", error);
    return {
      success: false,
      error: "Erro ao atualizar configurações de email",
    };
  }
}

export async function testEmailConnection(data: {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  smtpFrom: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // TODO: Implement actual email test using nodemailer
    // For now, just validate the configuration
    if (!data.smtpHost || !data.smtpUser || !data.smtpPassword || !data.smtpFrom) {
      return { success: false, error: "Configuração SMTP incompleta" };
    }

    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Conexão testada com sucesso! (Simulação)",
    };
  } catch (error: unknown) {
    console.error("Error testing email connection:", error);
    return {
      success: false,
      error: "Erro ao testar conexão de email",
    };
  }
}

// ============================================
// EMAIL TEMPLATE ACTIONS
// ============================================

export async function getEmailTemplates() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const templates = await prisma.emailTemplate.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: templates };
  } catch (error: unknown) {
    console.error("Error getting email templates:", error);
    return {
      success: false,
      error: "Erro ao buscar templates de email",
    };
  }
}

export async function getEmailTemplateById(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const template = await prisma.emailTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      return { success: false, error: "Template não encontrado" };
    }

    return { success: true, data: template };
  } catch (error: unknown) {
    console.error("Error getting email template:", error);
    return {
      success: false,
      error: "Erro ao buscar template",
    };
  }
}

export async function createEmailTemplate(data: {
  name: string;
  type: EmailTemplateType;
  subject: string;
  body: string;
  variables?: string[];
  isActive?: boolean;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const template = await prisma.emailTemplate.create({
      data: {
        name: data.name,
        type: data.type,
        subject: data.subject,
        body: data.body,
        variables: data.variables || [],
        isActive: data.isActive ?? true,
      },
    });

    revalidatePath("/admin/settings/email");

    return { success: true, data: template };
  } catch (error: unknown) {
    console.error("Error creating email template:", error);
    return {
      success: false,
      error: "Erro ao criar template de email",
    };
  }
}

export async function updateEmailTemplate(
  id: string,
  data: {
    name?: string;
    type?: EmailTemplateType;
    subject?: string;
    body?: string;
    variables?: string[];
    isActive?: boolean;
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const template = await prisma.emailTemplate.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/settings/email");

    return { success: true, data: template };
  } catch (error: unknown) {
    console.error("Error updating email template:", error);
    return {
      success: false,
      error: "Erro ao atualizar template",
    };
  }
}

export async function deleteEmailTemplate(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    await prisma.emailTemplate.delete({
      where: { id },
    });

    revalidatePath("/admin/settings/email");

    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting email template:", error);
    return {
      success: false,
      error: "Erro ao excluir template",
    };
  }
}
