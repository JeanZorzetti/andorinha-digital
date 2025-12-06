import { z } from "zod";

// Enums matching Prisma schema
export const leadStatusEnum = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
  "ARCHIVED",
]);

export const leadSourceEnum = z.enum([
  "WEBSITE",
  "CONTACT_FORM",
  "SOCIAL_MEDIA",
  "REFERRAL",
  "PAID_ADS",
  "ORGANIC_SEARCH",
  "EMAIL_CAMPAIGN",
  "EVENT",
  "COLD_OUTREACH",
  "OTHER",
]);

export const leadPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

// Lead creation schema - campos flexíveis para permitir criação rápida
export const createLeadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  status: leadStatusEnum.default("NEW"),
  source: leadSourceEnum.default("WEBSITE"),
  priority: leadPriorityEnum.default("MEDIUM"),
  budget: z.preprocess(
    (val) => {
      // Converte string vazia ou undefined para undefined
      if (val === "" || val === null || val === undefined) return undefined;
      // Converte para número
      const num = Number(val);
      // Retorna undefined se for NaN
      return isNaN(num) ? undefined : num;
    },
    z.number().positive().optional()
  ),
  timeline: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  assignedTo: z.string().optional(),
});

// Lead update schema (all fields optional except id)
export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  status: leadStatusEnum.optional(),
  source: leadSourceEnum.optional(),
  priority: leadPriorityEnum.optional(),
  budget: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().positive().optional()
  ),
  timeline: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  assignedTo: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
});

// Lead filter schema
export const leadFilterSchema = z.object({
  status: leadStatusEnum.optional(),
  source: leadSourceEnum.optional(),
  priority: leadPriorityEnum.optional(),
  assignedTo: z.string().optional(),
  search: z.string().optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxScore: z.number().min(0).max(100).optional(),
  tags: z.array(z.string()).optional(),
});

// Export types
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadFilterInput = z.infer<typeof leadFilterSchema>;
export type LeadStatus = z.infer<typeof leadStatusEnum>;
export type LeadSource = z.infer<typeof leadSourceEnum>;
export type LeadPriority = z.infer<typeof leadPriorityEnum>;
