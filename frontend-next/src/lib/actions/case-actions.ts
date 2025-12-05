"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { caseStudySchema, updateCaseStudySchema, type CaseStudyFormData, type UpdateCaseStudyData } from "@/lib/validations/case-schema";
import { WebhookHelpers } from "@/lib/webhooks";

/**
 * Criar novo case study
 */
export async function createCaseStudy(data: CaseStudyFormData) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Validar dados
    const validated = caseStudySchema.parse(data);

    // Gerar slug único se necessário
    let slug = validated.slug;
    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Criar case study
    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...validated,
        slug,
        authorId: session.user.id,
        date: new Date().toISOString().split('T')[0],
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    // Revalidar cache
    revalidatePath("/admin/cases");
    if (validated.status === "PUBLISHED") {
      revalidatePath("/cases");
    }

    // Disparar webhook se publicado
    if (validated.status === "PUBLISHED") {
      WebhookHelpers.caseCreated({
        id: caseStudy.id,
        title: caseStudy.title,
        slug: caseStudy.slug,
        client: caseStudy.client,
      }).catch((error) => {
        console.error('Failed to dispatch webhook:', error);
      });
    }

    return { success: true, caseStudy };
  } catch (error) {
    console.error("Error creating case study:", error);
    return { error: "Erro ao criar case study" };
  }
}

/**
 * Atualizar case study existente
 */
export async function updateCaseStudy(data: UpdateCaseStudyData) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Validar dados
    const validated = updateCaseStudySchema.parse(data);
    const { id, ...updateData } = validated;

    // Verificar se o case study existe
    const existing = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Case study não encontrado" };
    }

    // Atualizar publishedAt se status mudar para PUBLISHED
    const publishedAt = updateData.status === "PUBLISHED" && existing.status !== "PUBLISHED"
      ? new Date()
      : existing.publishedAt;

    // Atualizar case study
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...updateData,
        publishedAt,
      },
    });

    // Revalidar cache
    revalidatePath("/admin/cases");
    revalidatePath(`/admin/cases/${id}`);
    if (caseStudy.status === "PUBLISHED") {
      revalidatePath("/cases");
      revalidatePath(`/cases/${caseStudy.slug}`);
    }

    return { success: true, caseStudy };
  } catch (error) {
    console.error("Error updating case study:", error);
    return { error: "Erro ao atualizar case study" };
  }
}

/**
 * Deletar case study
 */
export async function deleteCaseStudy(id: string) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Verificar se o case study existe
    const existing = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Case study não encontrado" };
    }

    // Deletar case study
    await prisma.caseStudy.delete({
      where: { id },
    });

    // Revalidar cache
    revalidatePath("/admin/cases");
    if (existing.status === "PUBLISHED") {
      revalidatePath("/cases");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { error: "Erro ao deletar case study" };
  }
}

/**
 * Publicar/despublicar case study
 */
export async function togglePublishCaseStudy(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      return { error: "Case study não encontrado" };
    }

    const newStatus = caseStudy.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const publishedAt = newStatus === "PUBLISHED" ? new Date() : null;

    const updated = await prisma.caseStudy.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
      },
    });

    revalidatePath("/admin/cases");
    revalidatePath("/cases");

    return { success: true, caseStudy: updated };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return { error: "Erro ao alterar status" };
  }
}

/**
 * Toggle featured status
 */
export async function toggleFeaturedCaseStudy(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
      select: { featured: true },
    });

    if (!caseStudy) {
      return { error: "Case study não encontrado" };
    }

    const updated = await prisma.caseStudy.update({
      where: { id },
      data: {
        featured: !caseStudy.featured,
      },
    });

    revalidatePath("/admin/cases");
    revalidatePath("/cases");

    return { success: true, featured: updated.featured };
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return { error: "Erro ao alterar destaque" };
  }
}
