import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string()
    .min(10, "O título deve ter no mínimo 10 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  slug: z.string()
    .min(5, "O slug deve ter no mínimo 5 caracteres")
    .max(100, "O slug deve ter no máximo 100 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use apenas letras minúsculas, números e hífens)"),

  excerpt: z.string()
    .min(50, "O resumo deve ter no mínimo 50 caracteres")
    .max(300, "O resumo deve ter no máximo 300 caracteres"),

  content: z.string()
    .min(100, "O conteúdo deve ter no mínimo 100 caracteres")
    .optional(),

  image: z.string().url("URL de imagem inválida"),

  category: z.string()
    .min(1, "Selecione uma categoria"),

  tags: z.array(z.string())
    .min(1, "Adicione pelo menos 1 tag")
    .max(5, "Máximo de 5 tags"),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  readTime: z.string()
    .regex(/^\d+ min$/, "Formato inválido (ex: 5 min)"),

  // SEO (opcional)
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Schema para atualização (todos campos opcionais exceto ID)
export const updateBlogPostSchema = blogPostSchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateBlogPostData = z.infer<typeof updateBlogPostSchema>;
