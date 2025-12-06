"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  createLeadSchema,
  updateLeadSchema,
  type CreateLeadInput,
  type UpdateLeadInput,
  type LeadFilterInput,
} from "@/lib/validations/lead-schema";

// ============================================
// LEAD CRUD ACTIONS
// ============================================

export async function createLead(data: CreateLeadInput) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Validate input
    const validatedData = createLeadSchema.parse(data);

    // Calculate initial score based on provided data
    const initialScore = calculateLeadScore(validatedData);

    // Remove undefined/empty fields for Prisma
    const cleanData: any = {};
    Object.keys(validatedData).forEach((key) => {
      const value = (validatedData as any)[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanData[key] = value;
      }
    });

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        ...cleanData,
        score: initialScore,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create activity for lead creation
    await prisma.activity.create({
      data: {
        type: "LEAD_CREATED",
        title: "Lead criado",
        description: `Lead ${lead.name} foi criado`,
        leadId: lead.id,
        createdBy: session.user.id,
      },
    });

    revalidatePath("/admin/crm/leads");

    return {
      success: true,
      data: lead,
      message: "Lead criado com sucesso!",
    };
  } catch (error: unknown) {
    console.error("Error creating lead:", error);
    return {
      success: false,
      error: "Erro ao criar lead",
    };
  }
}

export async function getLeads(filters?: LeadFilterInput) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Build where clause from filters
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.source) {
      where.source = filters.source;
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    if (filters?.assignedTo) {
      where.assignedTo = filters.assignedTo;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
        { company: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters?.minScore !== undefined || filters?.maxScore !== undefined) {
      where.score = {};
      if (filters.minScore !== undefined) {
        where.score.gte = filters.minScore;
      }
      if (filters.maxScore !== undefined) {
        where.score.lte = filters.maxScore;
      }
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags,
      };
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            tasks: true,
            activities: true,
          },
        },
      },
      orderBy: [
        { priority: "desc" },
        { score: "desc" },
        { createdAt: "desc" },
      ],
    });

    return { success: true, data: leads };
  } catch (error: unknown) {
    console.error("Error getting leads:", error);
    return {
      success: false,
      error: "Erro ao buscar leads",
    };
  }
}

export async function getLead(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            dueDate: "asc",
          },
        },
        activities: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!lead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    return { success: true, data: lead };
  } catch (error: unknown) {
    console.error("Error getting lead:", error);
    return {
      success: false,
      error: "Erro ao buscar lead",
    };
  }
}

export async function updateLead(id: string, data: UpdateLeadInput) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    // Validate input
    const validatedData = updateLeadSchema.parse(data);

    // Get current lead for comparison
    const currentLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!currentLead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    // Remove undefined/empty fields for Prisma
    const cleanData: any = {};
    Object.keys(validatedData).forEach((key) => {
      const value = (validatedData as any)[key];
      if (value !== undefined && value !== null && value !== "") {
        cleanData[key] = value;
      }
    });

    // Update lead
    const lead = await prisma.lead.update({
      where: { id },
      data: cleanData,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create activity for status change if status changed
    if (validatedData.status && validatedData.status !== currentLead.status) {
      await prisma.activity.create({
        data: {
          type: "STATUS_CHANGE",
          title: "Status alterado",
          description: `Status alterado de ${currentLead.status} para ${validatedData.status}`,
          leadId: id,
          createdBy: session.user.id,
        },
      });
    }

    revalidatePath("/admin/crm/leads");
    revalidatePath(`/admin/crm/leads/${id}`);

    return {
      success: true,
      data: lead,
      message: "Lead atualizado com sucesso!",
    };
  } catch (error: unknown) {
    console.error("Error updating lead:", error);
    return {
      success: false,
      error: "Erro ao atualizar lead",
    };
  }
}

export async function deleteLead(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    await prisma.lead.delete({
      where: { id },
    });

    revalidatePath("/admin/crm/leads");

    return {
      success: true,
      message: "Lead excluído com sucesso!",
    };
  } catch (error: unknown) {
    console.error("Error deleting lead:", error);
    return {
      success: false,
      error: "Erro ao excluir lead",
    };
  }
}

export async function updateLeadScore(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    // Recalculate score
    const newScore = calculateLeadScore(lead);

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { score: newScore },
    });

    revalidatePath("/admin/crm/leads");
    revalidatePath(`/admin/crm/leads/${id}`);

    return {
      success: true,
      data: updatedLead,
      message: "Score atualizado com sucesso!",
    };
  } catch (error: unknown) {
    console.error("Error updating lead score:", error);
    return {
      success: false,
      error: "Erro ao atualizar score",
    };
  }
}

// ============================================
// LEAD SCORING LOGIC
// ============================================

function calculateLeadScore(lead: any): number {
  let score = 0;

  // Contact completeness (max 30 points)
  if (lead.email) score += 10;
  if (lead.phone) score += 5;
  if (lead.company) score += 5;
  if (lead.position) score += 5;
  if (lead.website) score += 5;

  // Business information (max 30 points)
  if (lead.budget) {
    if (lead.budget >= 50000) score += 20;
    else if (lead.budget >= 20000) score += 15;
    else if (lead.budget >= 5000) score += 10;
    else score += 5;
  }
  if (lead.timeline) score += 10;

  // Source quality (max 20 points)
  const sourceScores: Record<string, number> = {
    REFERRAL: 20,
    EMAIL_CAMPAIGN: 15,
    ORGANIC_SEARCH: 12,
    PAID_ADS: 10,
    WEBSITE: 8,
    CONTACT_FORM: 8,
    SOCIAL_MEDIA: 6,
    EVENT: 12,
    COLD_OUTREACH: 4,
    OTHER: 2,
  };
  score += sourceScores[lead.source] || 0;

  // Engagement (max 20 points)
  if (lead.notes && lead.notes.length > 50) score += 10;
  if (lead.tags && lead.tags.length > 0) score += 5;
  if (lead.lastContactedAt) score += 5;

  // Ensure score is between 0 and 100
  return Math.min(100, Math.max(0, score));
}

// ============================================
// LEAD STATISTICS
// ============================================

export async function getLeadStats() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Não autorizado" };
    }

    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      leadsBySource,
      leadsByStatus,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "QUALIFIED" } }),
      prisma.lead.count({ where: { status: "WON" } }),
      prisma.lead.count({ where: { status: "LOST" } }),
      prisma.lead.groupBy({
        by: ["source"],
        _count: true,
      }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

    const conversionRate =
      totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(2) : "0.00";

    return {
      success: true,
      data: {
        total: totalLeads,
        new: newLeads,
        qualified: qualifiedLeads,
        won: wonLeads,
        lost: lostLeads,
        conversionRate: parseFloat(conversionRate),
        bySource: leadsBySource,
        byStatus: leadsByStatus,
      },
    };
  } catch (error: unknown) {
    console.error("Error getting lead stats:", error);
    return {
      success: false,
      error: "Erro ao buscar estatísticas",
    };
  }
}
