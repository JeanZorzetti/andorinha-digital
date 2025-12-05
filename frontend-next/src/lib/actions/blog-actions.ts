"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { blogPostSchema, updateBlogPostSchema, type BlogPostFormData, type UpdateBlogPostData } from "@/lib/validations/blog-schema";
import { generateSlug } from "@/lib/utils/slug";
import { createAuditLog } from "./audit-actions";
import { WebhookHelpers } from "@/lib/webhooks";

/**
 * Criar novo blog post
 */
export async function createBlogPost(data: BlogPostFormData) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Validar dados
    const validated = blogPostSchema.parse(data);

    // Gerar slug único se necessário
    let slug = validated.slug;
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Criar post
    const post = await prisma.blogPost.create({
      data: {
        ...validated,
        slug,
        authorId: session.user.id,
        author: session.user.name || session.user.email || "Admin",
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    // Revalidar cache
    revalidatePath("/admin/blog");
    if (validated.status === "PUBLISHED") {
      revalidatePath("/blog");
    }

    // Registrar no audit log
    await createAuditLog({
      action: validated.status === "PUBLISHED" ? "PUBLISH" : "CREATE",
      resource: "POST",
      resourceId: post.id,
      details: `${validated.status === "PUBLISHED" ? "Publicado" : "Criado"} post: ${post.title}`,
    });

    // Disparar webhook se publicado
    if (validated.status === "PUBLISHED") {
      WebhookHelpers.postPublished({
        id: post.id,
        title: post.title,
        slug: post.slug,
        author: post.author,
      }).catch((error) => {
        console.error('Failed to dispatch webhook:', error);
      });
    }

    return { success: true, post };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { error: "Erro ao criar post" };
  }
}

/**
 * Atualizar blog post existente
 */
export async function updateBlogPost(data: UpdateBlogPostData) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Validar dados
    const validated = updateBlogPostSchema.parse(data);
    const { id, ...updateData } = validated;

    // Verificar se o post existe e pertence ao usuário
    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Post não encontrado" };
    }

    // Atualizar publishedAt se status mudar para PUBLISHED
    const publishedAt = updateData.status === "PUBLISHED" && existing.status !== "PUBLISHED"
      ? new Date()
      : existing.publishedAt;

    // Atualizar post
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
        publishedAt,
      },
    });

    // Revalidar cache
    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}`);
    if (post.status === "PUBLISHED") {
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
    }

    // Registrar no audit log
    const wasPublished = existing.status !== "PUBLISHED" && post.status === "PUBLISHED";
    const wasUnpublished = existing.status === "PUBLISHED" && post.status !== "PUBLISHED";

    await createAuditLog({
      action: wasPublished ? "PUBLISH" : wasUnpublished ? "UNPUBLISH" : "UPDATE",
      resource: "POST",
      resourceId: post.id,
      details: `${wasPublished ? "Publicado" : wasUnpublished ? "Despublicado" : "Atualizado"} post: ${post.title}`,
    });

    // Disparar webhooks
    if (wasPublished) {
      WebhookHelpers.postPublished({
        id: post.id,
        title: post.title,
        slug: post.slug,
        author: post.author,
      }).catch((error) => {
        console.error('Failed to dispatch webhook:', error);
      });
    } else if (wasUnpublished) {
      WebhookHelpers.postUnpublished(post.id, post.title).catch((error) => {
        console.error('Failed to dispatch webhook:', error);
      });
    }

    return { success: true, post };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { error: "Erro ao atualizar post" };
  }
}

/**
 * Deletar blog post
 */
export async function deleteBlogPost(id: string) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    // Verificar se o post existe
    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Post não encontrado" };
    }

    // Deletar post
    await prisma.blogPost.delete({
      where: { id },
    });

    // Revalidar cache
    revalidatePath("/admin/blog");
    if (existing.status === "PUBLISHED") {
      revalidatePath("/blog");
    }

    // Registrar no audit log
    await createAuditLog({
      action: "DELETE",
      resource: "POST",
      resourceId: id,
      details: `Deletado post: ${existing.title}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { error: "Erro ao deletar post" };
  }
}

/**
 * Publicar/despublicar post
 */
export async function togglePublishPost(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Não autenticado" };
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return { error: "Post não encontrado" };
    }

    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const publishedAt = newStatus === "PUBLISHED" ? new Date() : null;

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true, post: updated };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return { error: "Erro ao alterar status" };
  }
}

/**
 * Gerar slug a partir do título
 */
export async function generateUniqueSlug(title: string): Promise<string> {
  let slug = generateSlug(title);

  // Verificar se slug já existe
  const existing = await prisma.blogPost.findUnique({
    where: { slug },
  });

  // Se existir, adicionar timestamp
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  return slug;
}
