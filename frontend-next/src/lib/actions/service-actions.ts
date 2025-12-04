"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  serviceSchema,
  updateServiceSchema,
  type ServiceFormData,
  type UpdateServiceData,
} from "@/lib/validations/service-schema";

/**
 * Criar novo serviço
 */
export async function createService(data: ServiceFormData) {
  try {
    // 1. Autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // 2. Validação
    const validated = serviceSchema.parse(data);

    // 3. Verificar slug único
    let slug = validated.slug;
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService) {
      slug = `${slug}-${Date.now()}`;
    }

    // 4. Criar serviço
    const service = await prisma.service.create({
      data: {
        ...validated,
        slug,
        authorId: session.user.id,
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    // 5. Revalidar cache
    revalidateTag("services");
    revalidatePath("/servicos");
    revalidatePath("/admin/services");

    return { success: true, service };
  } catch (error: unknown) {
    console.error("Error creating service:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}

/**
 * Atualizar serviço
 */
export async function updateService(data: UpdateServiceData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const validated = updateServiceSchema.parse(data);
    const { id, ...updateData } = validated;

    // Verificar se o serviço existe
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return { error: "Serviço não encontrado" };
    }

    // Atualizar
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...updateData,
        publishedAt:
          updateData.status === "PUBLISHED" && !existingService.publishedAt
            ? new Date()
            : existingService.publishedAt,
      },
    });

    revalidateTag("services");
    revalidatePath(`/servicos/${service.slug}`);
    revalidatePath("/admin/services");

    return { success: true, service };
  } catch (error: unknown) {
    console.error("Error updating service:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}

/**
 * Deletar serviço
 */
export async function deleteService(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    await prisma.service.delete({
      where: { id },
    });

    revalidateTag("services");
    revalidatePath("/servicos");
    revalidatePath("/admin/services");

    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting service:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}

/**
 * Alternar status de publicação
 */
export async function togglePublishService(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const service = await prisma.service.findUnique({
      where: { id },
      select: { status: true, slug: true },
    });

    if (!service) {
      return { error: "Serviço não encontrado" };
    }

    const newStatus = service.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    const updated = await prisma.service.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt: newStatus === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidateTag("services");
    revalidatePath(`/servicos/${service.slug}`);
    revalidatePath("/admin/services");

    return { success: true, status: newStatus, service: updated };
  } catch (error: unknown) {
    console.error("Error toggling publish status:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}

/**
 * Alternar destaque
 */
export async function toggleFeaturedService(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const service = await prisma.service.findUnique({
      where: { id },
      select: { featured: true },
    });

    if (!service) {
      return { error: "Serviço não encontrado" };
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        featured: !service.featured,
      },
    });

    revalidateTag("services");
    revalidatePath("/admin/services");

    return { success: true, featured: updated.featured };
  } catch (error: unknown) {
    console.error("Error toggling featured:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}

/**
 * Buscar serviço por ID
 */
export async function getServiceById(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!service) {
      return { error: "Serviço não encontrado" };
    }

    return { success: true, service };
  } catch (error: unknown) {
    console.error("Error fetching service:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return { error: errorMessage };
  }
}
