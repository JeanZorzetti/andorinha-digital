"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MediaType } from "@prisma/client";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/**
 * Criar registro de mídia no banco
 */
export async function createMedia(data: {
  name: string;
  url: string;
  key: string;
  type: MediaType;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  description?: string;
  folder?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const media = await prisma.media.create({
      data: {
        ...data,
        uploadedById: session.user.id,
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/admin/media");

    return { success: true, media };
  } catch (error) {
    console.error("Error creating media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao criar mídia",
    };
  }
}

/**
 * Listar mídias com filtros e paginação
 */
export async function listMedia({
  page = 1,
  limit = 24,
  type,
  folder,
  search,
}: {
  page?: number;
  limit?: number;
  type?: MediaType;
  folder?: string;
  search?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (type) {
      where.type = type;
    }

    if (folder !== undefined) {
      where.folder = folder === "root" ? null : folder;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { alt: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.media.count({ where }),
    ]);

    return {
      success: true,
      media,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error listing media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao listar mídias",
    };
  }
}

/**
 * Buscar mídia por ID
 */
export async function getMediaById(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!media) {
      return { success: false, error: "Mídia não encontrada" };
    }

    return { success: true, media };
  } catch (error) {
    console.error("Error getting media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao buscar mídia",
    };
  }
}

/**
 * Atualizar metadados da mídia
 */
export async function updateMedia(
  id: string,
  data: {
    name?: string;
    alt?: string;
    description?: string;
    folder?: string;
  }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const media = await prisma.media.update({
      where: { id },
      data,
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/admin/media");

    return { success: true, media };
  } catch (error) {
    console.error("Error updating media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao atualizar mídia",
    };
  }
}

/**
 * Deletar mídia (arquivo + registro)
 */
export async function deleteMedia(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Buscar mídia para pegar o key do UploadThing
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return { success: false, error: "Mídia não encontrada" };
    }

    // Deletar arquivo do UploadThing
    try {
      await utapi.deleteFiles(media.key);
    } catch (error) {
      console.error("Error deleting file from UploadThing:", error);
      // Continue mesmo se falhar no UploadThing
    }

    // Deletar registro do banco
    await prisma.media.delete({
      where: { id },
    });

    revalidatePath("/admin/media");

    return { success: true, message: "Mídia deletada com sucesso" };
  } catch (error) {
    console.error("Error deleting media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao deletar mídia",
    };
  }
}

/**
 * Deletar múltiplas mídias
 */
export async function bulkDeleteMedia(ids: string[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Buscar todas as mídias
    const mediaList = await prisma.media.findMany({
      where: { id: { in: ids } },
      select: { key: true },
    });

    const keys = mediaList.map((m) => m.key);

    // Deletar arquivos do UploadThing
    if (keys.length > 0) {
      try {
        await utapi.deleteFiles(keys);
      } catch (error) {
        console.error("Error deleting files from UploadThing:", error);
      }
    }

    // Deletar registros do banco
    const result = await prisma.media.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/admin/media");

    return {
      success: true,
      message: `${result.count} mídia(s) deletada(s) com sucesso`,
      count: result.count,
    };
  } catch (error) {
    console.error("Error bulk deleting media:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro ao deletar mídias",
    };
  }
}

/**
 * Obter estatísticas da media library
 */
export async function getMediaStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const [total, byType, totalSize] = await Promise.all([
      prisma.media.count(),
      prisma.media.groupBy({
        by: ["type"],
        _count: true,
      }),
      prisma.media.aggregate({
        _sum: {
          size: true,
        },
      }),
    ]);

    const stats = {
      total,
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type] = item._count;
          return acc;
        },
        {} as Record<string, number>
      ),
      totalSize: totalSize._sum.size || 0,
      totalSizeMB: ((totalSize._sum.size || 0) / 1024 / 1024).toFixed(2),
    };

    return { success: true, stats };
  } catch (error) {
    console.error("Error getting media stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao buscar estatísticas",
    };
  }
}

/**
 * Obter lista de pastas
 */
export async function getFolders() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const folders = await prisma.media.findMany({
      where: {
        folder: { not: null },
      },
      select: {
        folder: true,
      },
      distinct: ["folder"],
    });

    const folderList = folders
      .map((f) => f.folder)
      .filter((f): f is string => f !== null)
      .sort();

    return { success: true, folders: folderList };
  } catch (error) {
    console.error("Error getting folders:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao buscar pastas",
    };
  }
}
