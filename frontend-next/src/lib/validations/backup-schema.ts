import { z } from "zod";

export const backupSettingsSchema = z.object({
  // Automated Backup Schedule
  enableAutomatedBackup: z.boolean(),
  backupFrequency: z.enum(["daily", "weekly", "monthly"]),
  backupTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:mm)"),
  backupRetentionDays: z.number().min(1).max(365),

  // Backup Storage
  backupPath: z.string().min(1, "Caminho é obrigatório"),
  maxBackupSize: z.number().min(100).max(10000), // MB
  compressBackups: z.boolean(),

  // Email Notifications
  notifyOnBackup: z.boolean(),
  notificationEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  notifyOnBackupFailure: z.boolean(),
});

export type BackupSettingsFormData = z.infer<typeof backupSettingsSchema>;

export const createBackupSchema = z.object({
  includesDatabase: z.boolean().optional(),
  includesMedia: z.boolean().optional(),
  includesConfig: z.boolean().optional(),
});

export type CreateBackupFormData = z.infer<typeof createBackupSchema>;
