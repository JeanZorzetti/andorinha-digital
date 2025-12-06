"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Get site settings (or create if doesn't exist)
 */
export async function getSiteSettings() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    let settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    // Create default settings if doesn't exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "singleton" },
      });
    }

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error getting site settings:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, error: errorMessage };
  }
}

/**
 * Update site settings
 */
export async function updateSiteSettings(data: {
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  contactEmail?: string;
  supportEmail?: string;
  phone?: string;
  logo?: string;
  favicon?: string;
  ogImage?: string;
  timezone?: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultMetaKeywords?: string[];
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  googleTagManager?: string;
  clarityId?: string;
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      create: {
        id: "singleton",
        ...data,
      },
      update: data,
    });

    revalidatePath("/admin/settings/general");
    revalidatePath("/");

    return { success: true, data: settings };
  } catch (error: unknown) {
    console.error("Error updating site settings:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, error: errorMessage };
  }
}

/**
 * Toggle maintenance mode
 */
export async function toggleMaintenanceMode() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const currentSettings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    const settings = await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: {
        maintenanceMode: !currentSettings?.maintenanceMode,
      },
    });

    revalidatePath("/admin/settings/general");
    revalidatePath("/");

    return {
      success: true,
      data: settings,
      maintenanceMode: settings.maintenanceMode,
    };
  } catch (error: unknown) {
    console.error("Error toggling maintenance mode:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, error: errorMessage };
  }
}
