import { z } from "zod";

// Schema para Pricing Tier
export const pricingTierSchema = z.object({
  name: z.string().min(1, "Nome do plano é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  period: z.string().optional(), // Ex: "por mês", "único"
  features: z.array(z.string()).min(1, "Adicione pelo menos uma feature"),
  highlighted: z.boolean().default(false),
  cta: z.string().optional(), // Call to action button text
});

export type PricingTier = z.infer<typeof pricingTierSchema>;

// Schema para Process Step
export const processStepSchema = z.object({
  title: z.string().min(1, "Título da etapa é obrigatório"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  icon: z.string().optional(), // Nome do ícone (ex: "Briefcase", "Code", "Rocket")
  duration: z.string().optional(), // Ex: "2-3 dias"
});

export type ProcessStep = z.infer<typeof processStepSchema>;

// Schema principal de Serviço
export const serviceSchema = z.object({
  title: z.string()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  slug: z.string()
    .min(3, "O slug deve ter no mínimo 3 caracteres")
    .max(100, "O slug deve ter no máximo 100 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use apenas letras minúsculas, números e hífens)"),

  description: z.string()
    .min(50, "A descrição deve ter no mínimo 50 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),

  content: z.string()
    .min(100, "O conteúdo deve ter no mínimo 100 caracteres")
    .optional(),

  image: z.string().url("URL de imagem inválida"),

  gallery: z.array(z.string().url()).max(10, "Máximo de 10 imagens na galeria").optional(),

  category: z.string().min(1, "Selecione uma categoria"),

  tags: z.array(z.string())
    .min(1, "Adicione pelo menos 1 tag")
    .max(5, "Máximo de 5 tags"),

  // Pricing
  pricing: z.array(pricingTierSchema)
    .min(1, "Adicione pelo menos 1 plano de preço")
    .max(5, "Máximo de 5 planos"),

  // Process
  process: z.array(processStepSchema)
    .min(1, "Adicione pelo menos 1 etapa do processo")
    .max(10, "Máximo de 10 etapas"),

  // Details
  deliveryTime: z.string().min(1, "Prazo de entrega é obrigatório"), // Ex: "15-30 dias"

  includes: z.array(z.string())
    .min(1, "Adicione pelo menos 1 item incluído")
    .max(15, "Máximo de 15 itens"),

  excludes: z.array(z.string()).max(10, "Máximo de 10 itens").optional(),

  requirements: z.array(z.string()).max(10, "Máximo de 10 requisitos").optional(),

  // Status
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  featured: z.boolean().default(false),

  // SEO
  metaTitle: z.string().max(60, "Título SEO deve ter no máximo 60 caracteres").optional(),
  metaDescription: z.string().max(160, "Descrição SEO deve ter no máximo 160 caracteres").optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// Schema para atualização
export const updateServiceSchema = serviceSchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateServiceData = z.infer<typeof updateServiceSchema>;
