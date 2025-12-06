"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
  type CreateUserData,
  type UpdateUserData,
  type ChangePasswordData,
} from "@/lib/validations/user-schema";
import { createAuditLog } from "./audit-actions";
import { EmailHelpers } from "@/lib/email";
import { WebhookHelpers } from "@/lib/webhooks";
import { notifyWelcomeUser } from "./notification-actions";

/**
 * Criar novo usuário
 */
export async function createUser(data: CreateUserData) {
  try {
    // 1. Autenticação e autorização
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Apenas ADMIN pode criar usuários
    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    // 2. Validação
    const validated = createUserSchema.parse(data);

    // 3. Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { success: false, error: "Email já está em uso" };
    }

    // 4. Hash da senha
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // 5. Criar usuário
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
        image: validated.image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    // 6. Revalidar cache
    
    revalidatePath("/admin/settings/users");

    // 7. Registrar no audit log
    await createAuditLog({
      action: "CREATE",
      resource: "USER",
      resourceId: user.id,
      details: `Criado usuário ${user.name} (${user.email}) com role ${user.role}`,
    });

    // 8. Enviar email de boas-vindas (não bloquear em caso de erro)
    EmailHelpers.sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error('Failed to send welcome email:', error);
    });

    // 9. Disparar webhook de USER_CREATED (não bloquear em caso de erro)
    WebhookHelpers.userCreated({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }).catch((error) => {
      console.error('Failed to dispatch webhook:', error);
    });

    // 10. Criar notificação de boas-vindas (não bloquear em caso de erro)
    notifyWelcomeUser(user.id, user.name).catch((error) => {
      console.error('Failed to create welcome notification:', error);
    });

    return { success: true, user };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao criar usuário",
    };
  }
}

/**
 * Atualizar usuário
 */
export async function updateUser(id: string, data: Partial<UpdateUserData>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Apenas ADMIN pode atualizar outros usuários
    // Usuários podem atualizar apenas seus próprios dados
    if (session.user.role !== "ADMIN" && session.user.id !== id) {
      return { success: false, error: "Não autorizado" };
    }

    const validated = updateUserSchema.parse({ id, ...data });

    // Se está atualizando senha, fazer hash
    const updateData: Record<string, unknown> = { ...validated };
    if (validated.password) {
      updateData.password = await bcrypt.hash(validated.password, 10);
    }

    // Remover ID do updateData
    delete updateData.id;

    // Não permitir usuário não-admin alterar seu próprio role
    if (session.user.role !== "ADMIN") {
      delete updateData.role;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        updatedAt: true,
      },
    });

    
    revalidatePath("/admin/settings/users");

    // Registrar no audit log
    const changedFields = Object.keys(updateData).filter(k => k !== 'password');
    await createAuditLog({
      action: "UPDATE",
      resource: "USER",
      resourceId: id,
      details: `Atualizado usuário ${user.name}: ${changedFields.join(", ")}${validated.password ? ", senha" : ""}`,
    });

    // Disparar webhook de USER_UPDATED (não bloquear)
    WebhookHelpers.userUpdated({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }).catch((error) => {
      console.error('Failed to dispatch webhook:', error);
    });

    return { success: true, user };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao atualizar usuário",
    };
  }
}

/**
 * Deletar usuário
 */
export async function deleteUser(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Apenas ADMIN pode deletar usuários
    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    // Não permitir deletar a si mesmo
    if (session.user.id === id) {
      return {
        success: false,
        error: "Você não pode deletar sua própria conta",
      };
    }

    // Buscar informações do usuário antes de deletar
    const userToDelete = await prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true },
    });

    await prisma.user.delete({
      where: { id },
    });

    
    revalidatePath("/admin/settings/users");

    // Registrar no audit log
    await createAuditLog({
      action: "DELETE",
      resource: "USER",
      resourceId: id,
      details: `Deletado usuário ${userToDelete?.name} (${userToDelete?.email})`,
    });

    // Disparar webhook de USER_DELETED (não bloquear)
    if (userToDelete) {
      WebhookHelpers.userDeleted(id, userToDelete.email).catch((error) => {
        console.error('Failed to dispatch webhook:', error);
      });
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao deletar usuário",
    };
  }
}

/**
 * Buscar usuário por ID
 */
export async function getUserById(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            blogPosts: true,
            caseStudies: true,
            services: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, error: "Usuário não encontrado" };
    }

    return { success: true, user };
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao buscar usuário",
    };
  }
}

/**
 * Listar todos os usuários
 */
export async function listUsers({
  page = 1,
  limit = 10,
  role,
  search,
}: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
} = {}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      ...(role && { role }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              blogPosts: true,
              caseStudies: true,
              services: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: unknown) {
    console.error("Error listing users:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao listar usuários",
    };
  }
}

/**
 * Alterar role do usuário
 */
export async function changeUserRole(id: string, role: "ADMIN" | "EDITOR" | "USER") {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    // Apenas ADMIN pode alterar roles
    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    // Não permitir alterar o próprio role
    if (session.user.id === id) {
      return {
        success: false,
        error: "Você não pode alterar seu próprio role",
      };
    }

    // Buscar role anterior
    const previousUser = await prisma.user.findUnique({
      where: { id },
      select: { name: true, role: true },
    });

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    
    revalidatePath("/admin/settings/users");

    // Registrar no audit log
    await createAuditLog({
      action: "ROLE_CHANGE",
      resource: "USER",
      resourceId: id,
      details: `Alterado role de ${user.name}: ${previousUser?.role} → ${role}`,
    });

    // Enviar email de notificação (não bloquear em caso de erro)
    if (previousUser?.role) {
      EmailHelpers.sendRoleChangedEmail(
        user.email,
        user.name,
        previousUser.role,
        role
      ).catch((error) => {
        console.error('Failed to send role changed email:', error);
      });
    }

    return { success: true, user };
  } catch (error: unknown) {
    console.error("Error changing user role:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao alterar role",
    };
  }
}

/**
 * Alterar senha (usuário logado)
 */
export async function changePassword(data: ChangePasswordData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    const validated = changePasswordSchema.parse(data);

    // Buscar usuário atual
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user) {
      return { success: false, error: "Usuário não encontrado" };
    }

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(
      validated.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { success: false, error: "Senha atual incorreta" };
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(validated.newPassword, 10);

    // Atualizar senha
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    // Registrar no audit log
    await createAuditLog({
      action: "PASSWORD_CHANGE",
      resource: "USER",
      resourceId: session.user.id,
      details: "Senha alterada pelo próprio usuário",
    });

    // Enviar email de confirmação (não bloquear em caso de erro)
    if (session.user.email && session.user.name) {
      EmailHelpers.sendPasswordChangedEmail(
        session.user.email,
        session.user.name
      ).catch((error) => {
        console.error('Failed to send password changed email:', error);
      });
    }

    return { success: true, message: "Senha alterada com sucesso" };
  } catch (error: unknown) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao alterar senha",
    };
  }
}
