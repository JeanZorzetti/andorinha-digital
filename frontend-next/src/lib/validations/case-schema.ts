import { z } from "zod";

export const caseStudySchema = z.object({
  title: z.string()
    .min(10, "O título deve ter no mínimo 10 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  slug: z.string()
    .min(5, "O slug deve ter no mínimo 5 caracteres")
    .max(100, "O slug deve ter no máximo 100 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use apenas letras minúsculas, números e hífens)"),

  description: z.string()
    .min(50, "A descrição deve ter no mínimo 50 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),

  content: z.string()
    .min(100, "O conteúdo deve ter no mínimo 100 caracteres")
    .optional(),

  client: z.string()
    .min(2, "O nome do cliente deve ter no mínimo 2 caracteres")
    .max(100, "O nome do cliente deve ter no máximo 100 caracteres"),

  industry: z.string()
    .min(2, "O setor deve ter no mínimo 2 caracteres")
    .max(50, "O setor deve ter no máximo 50 caracteres"),

  challenge: z.string()
    .min(50, "O desafio deve ter no mínimo 50 caracteres")
    .max(1000, "O desafio deve ter no máximo 1000 caracteres"),

  solution: z.string()
    .min(50, "A solução deve ter no mínimo 50 caracteres")
    .max(1000, "A solução deve ter no máximo 1000 caracteres"),

  results: z.array(z.string())
    .min(1, "Adicione pelo menos 1 resultado")
    .max(10, "Máximo de 10 resultados"),

  image: z.string().url("URL de imagem inválida"),

  gallery: z.array(z.string().url("URL de imagem inválida"))
    .max(10, "Máximo de 10 imagens na galeria")
    .optional(),

  tags: z.array(z.string())
    .min(1, "Adicione pelo menos 1 tag")
    .max(5, "Máximo de 5 tags"),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  featured: z.boolean().default(false),

  testimonial: z.object({
    author: z.string().optional(),
    role: z.string().optional(),
    content: z.string().optional(),
    avatar: z.string().url().optional(),
  }).optional(),

  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string().optional(),
  })).max(6, "Máximo de 6 métricas").optional(),

  technologies: z.array(z.string()).max(15, "Máximo de 15 tecnologias").optional(),

  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export type CaseStudyFormData = z.infer<typeof caseStudySchema>;

// Schema para atualização (todos campos opcionais exceto ID)
export const updateCaseStudySchema = caseStudySchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateCaseStudyData = z.infer<typeof updateCaseStudySchema>;
