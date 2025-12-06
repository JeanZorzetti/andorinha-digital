import { z } from "zod";

export const siteSettingsSchema = z.object({
  // Informações Básicas
  siteName: z.string().min(1, "Nome do site é obrigatório"),
  siteDescription: z.string().optional(),
  siteUrl: z.string().url("URL inválida"),
  contactEmail: z.string().email("Email inválido"),
  supportEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),

  // Logo e Branding
  logo: z.string().url("URL inválida").optional().or(z.literal("")),
  favicon: z.string().url("URL inválida").optional().or(z.literal("")),
  ogImage: z.string().url("URL inválida").optional().or(z.literal("")),

  // Localização
  timezone: z.string().min(1, "Timezone é obrigatório"),
  language: z.string().min(1, "Idioma é obrigatório"),
  dateFormat: z.string().min(1, "Formato de data é obrigatório"),
  timeFormat: z.string().min(1, "Formato de hora é obrigatório"),

  // Redes Sociais
  facebookUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  instagramUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  linkedinUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  twitterUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  youtubeUrl: z.string().url("URL inválida").optional().or(z.literal("")),

  // SEO Defaults
  defaultMetaTitle: z.string().optional(),
  defaultMetaDescription: z.string().optional(),
  defaultMetaKeywords: z.array(z.string()).optional(),

  // Analytics & Tracking
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  googleTagManager: z.string().optional(),
  clarityId: z.string().optional(),

  // Manutenção
  maintenanceMode: z.boolean().optional(),
  maintenanceMessage: z.string().optional(),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
