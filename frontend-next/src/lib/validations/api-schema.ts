import { z } from "zod";

export const apiSettingsSchema = z.object({
  // Rate Limiting
  enableRateLimiting: z.boolean(),
  requestsPerMinute: z.number().min(1).max(10000),
  requestsPerHour: z.number().min(1).max(100000),

  // CORS Settings
  enableCors: z.boolean(),
  allowedOrigins: z.array(z.string()),
  allowedMethods: z.array(z.string()),
  allowedHeaders: z.array(z.string()),
  allowCredentials: z.boolean(),

  // API Security
  requireApiKey: z.boolean(),
  apiKeyHeaderName: z.string().min(1),
  enableRequestLogging: z.boolean(),
});

export type ApiSettingsFormData = z.infer<typeof apiSettingsSchema>;

export const apiKeySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  customRateLimit: z.boolean().optional(),
  requestsPerMinute: z.number().min(1).max(10000).optional(),
  requestsPerHour: z.number().min(1).max(100000).optional(),
  expiresAt: z.date().optional().nullable(),
});

export type ApiKeyFormData = z.infer<typeof apiKeySchema>;
