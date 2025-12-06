import { z } from "zod";

export const emailSettingsSchema = z.object({
  // SMTP Configuration
  smtpHost: z.string().min(1, "Host SMTP é obrigatório"),
  smtpPort: z.number().min(1).max(65535, "Porta inválida"),
  smtpUser: z.string().min(1, "Usuário SMTP é obrigatório"),
  smtpPassword: z.string().min(1, "Senha SMTP é obrigatória"),
  smtpSecure: z.boolean(),
  smtpFrom: z.string().email("Email remetente inválido"),
  smtpFromName: z.string().min(1, "Nome do remetente é obrigatório"),

  // Email Preferences
  enableEmailNotifications: z.boolean(),
  enableWelcomeEmail: z.boolean(),
  enablePasswordReset: z.boolean(),
  enableContactFormEmail: z.boolean(),
  enableNewsletterEmail: z.boolean(),
});

export type EmailSettingsFormData = z.infer<typeof emailSettingsSchema>;

export const emailTemplateSchema = z.object({
  name: z.string().min(1, "Nome do template é obrigatório"),
  type: z.enum([
    "WELCOME",
    "PASSWORD_RESET",
    "CONTACT_FORM",
    "NEWSLETTER",
    "NOTIFICATION",
    "CUSTOM",
  ]),
  subject: z.string().min(1, "Assunto é obrigatório"),
  body: z.string().min(1, "Corpo do email é obrigatório"),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;
