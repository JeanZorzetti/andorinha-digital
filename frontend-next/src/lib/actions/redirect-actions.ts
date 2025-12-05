"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { RedirectType } from "@prisma/client";

/**
 * List all redirects with pagination
 */
export async function listRedirects({
  page = 1,
  limit = 20,
  search,
  isActive,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
} = {}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { source: { contains: search, mode: "insensitive" } },
        { destination: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [redirects, total] = await Promise.all([
      prisma.redirect.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.redirect.count({ where }),
    ]);

    return {
      success: true,
      redirects,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  } catch {
    return { success: false, error: "Erro ao listar redirects" };
  }
}

/**
 * Get redirect by ID
 */
export async function getRedirectById(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const redirect = await prisma.redirect.findUnique({
      where: { id },
    });

    if (!redirect) {
      return { success: false, error: "Redirect não encontrado" };
    }

    return { success: true, redirect };
  } catch {
    return { success: false, error: "Erro ao buscar redirect" };
  }
}

/**
 * Create new redirect
 */
export async function createRedirect(data: {
  source: string;
  destination: string;
  type: RedirectType;
  description?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    // Validate source path
    if (!data.source.startsWith("/")) {
      return { success: false, error: "Source deve começar com /" };
    }

    // Validate destination path
    if (!data.destination.startsWith("/") && !data.destination.startsWith("http")) {
      return { success: false, error: "Destination deve começar com / ou http" };
    }

    // Check if source already exists
    const existing = await prisma.redirect.findUnique({
      where: { source: data.source },
    });

    if (existing) {
      return { success: false, error: "Já existe um redirect para este source" };
    }

    const redirect = await prisma.redirect.create({
      data: {
        source: data.source,
        destination: data.destination,
        type: data.type,
        description: data.description,
      },
    });

    revalidatePath("/admin/seo/redirects");

    return { success: true, redirect };
  } catch {
    return { success: false, error: "Erro ao criar redirect" };
  }
}

/**
 * Update redirect
 */
export async function updateRedirect(
  id: string,
  data: {
    source?: string;
    destination?: string;
    type?: RedirectType;
    description?: string;
    isActive?: boolean;
  }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    // Validate source path if provided
    if (data.source && !data.source.startsWith("/")) {
      return { success: false, error: "Source deve começar com /" };
    }

    // Validate destination path if provided
    if (data.destination && !data.destination.startsWith("/") && !data.destination.startsWith("http")) {
      return { success: false, error: "Destination deve começar com / ou http" };
    }

    // Check if new source conflicts with existing
    if (data.source) {
      const existing = await prisma.redirect.findFirst({
        where: {
          source: data.source,
          NOT: { id },
        },
      });

      if (existing) {
        return { success: false, error: "Já existe um redirect para este source" };
      }
    }

    const redirect = await prisma.redirect.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/seo/redirects");

    return { success: true, redirect };
  } catch {
    return { success: false, error: "Erro ao atualizar redirect" };
  }
}

/**
 * Delete redirect
 */
export async function deleteRedirect(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    await prisma.redirect.delete({
      where: { id },
    });

    revalidatePath("/admin/seo/redirects");

    return { success: true, message: "Redirect deletado com sucesso" };
  } catch {
    return { success: false, error: "Erro ao deletar redirect" };
  }
}

/**
 * Get redirect stats
 */
export async function getRedirectStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const [total, active, totalHits] = await Promise.all([
      prisma.redirect.count(),
      prisma.redirect.count({ where: { isActive: true } }),
      prisma.redirect.aggregate({
        _sum: { hitCount: true },
      }),
    ]);

    return {
      success: true,
      stats: {
        total,
        active,
        inactive: total - active,
        totalHits: totalHits._sum.hitCount || 0,
      },
    };
  } catch {
    return { success: false, error: "Erro ao buscar estatísticas" };
  }
}

/**
 * Increment redirect hit count
 */
export async function incrementRedirectHit(source: string) {
  try {
    await prisma.redirect.update({
      where: { source },
      data: {
        hitCount: {
          increment: 1,
        },
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Find redirect by source path
 */
export async function findRedirectBySource(source: string) {
  try {
    const redirect = await prisma.redirect.findUnique({
      where: {
        source,
        isActive: true,
      },
    });

    if (redirect) {
      // Increment hit count asynchronously
      incrementRedirectHit(source);
    }

    return redirect;
  } catch {
    return null;
  }
}
