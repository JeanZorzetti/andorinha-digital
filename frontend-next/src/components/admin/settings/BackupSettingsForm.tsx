"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  backupSettingsSchema,
  type BackupSettingsFormData,
} from "@/lib/validations/backup-schema";
import { updateBackupSettings } from "@/lib/actions/backup-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Save, Clock, HardDrive, Mail } from "lucide-react";
import type { BackupSettings } from "@prisma/client";

interface BackupSettingsFormProps {
  initialData: BackupSettings;
}

export function BackupSettingsForm({ initialData }: BackupSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BackupSettingsFormData>({
    resolver: zodResolver(backupSettingsSchema),
    defaultValues: {
      enableAutomatedBackup: initialData.enableAutomatedBackup,
      backupFrequency: initialData.backupFrequency as "daily" | "weekly" | "monthly",
      backupTime: initialData.backupTime,
      backupRetentionDays: initialData.backupRetentionDays,
      backupPath: initialData.backupPath,
      maxBackupSize: initialData.maxBackupSize,
      compressBackups: initialData.compressBackups,
      notifyOnBackup: initialData.notifyOnBackup,
      notificationEmail: initialData.notificationEmail || "",
      notifyOnBackupFailure: initialData.notifyOnBackupFailure,
    },
  });

  const backupFrequency = watch("backupFrequency");

  async function onSubmit(data: BackupSettingsFormData) {
    setIsSubmitting(true);

    try {
      const result = await updateBackupSettings(data);

      if (result.success) {
        toast.success("Configurações de backup atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar configurações");
      }
    } catch (error) {
      console.error("Error submitting backup settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Automated Backup Schedule */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Agendamento Automático</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Habilitar Backup Automático</p>
              <p className="text-sm text-muted-foreground">
                Executar backups automaticamente
              </p>
            </div>
            <Switch
              {...register("enableAutomatedBackup")}
              defaultChecked={initialData.enableAutomatedBackup}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backupFrequency">Frequência</Label>
              <Select
                value={backupFrequency}
                onValueChange={(value) =>
                  setValue("backupFrequency", value as "daily" | "weekly" | "monthly")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="backupTime">Horário (HH:mm)</Label>
              <Input
                id="backupTime"
                type="time"
                {...register("backupTime")}
              />
              {errors.backupTime && (
                <p className="text-sm text-destructive mt-1">
                  {errors.backupTime.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="backupRetentionDays">
              Retenção de Backups (dias)
            </Label>
            <Input
              id="backupRetentionDays"
              type="number"
              {...register("backupRetentionDays", { valueAsNumber: true })}
              placeholder="30"
            />
            {errors.backupRetentionDays && (
              <p className="text-sm text-destructive mt-1">
                {errors.backupRetentionDays.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Backups mais antigos que este período serão excluídos automaticamente
            </p>
          </div>
        </div>
      </Card>

      {/* Backup Storage */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Armazenamento</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="backupPath">Caminho de Armazenamento</Label>
            <Input
              id="backupPath"
              {...register("backupPath")}
              placeholder="./backups"
            />
            {errors.backupPath && (
              <p className="text-sm text-destructive mt-1">
                {errors.backupPath.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="maxBackupSize">Tamanho Máximo (MB)</Label>
            <Input
              id="maxBackupSize"
              type="number"
              {...register("maxBackupSize", { valueAsNumber: true })}
              placeholder="1000"
            />
            {errors.maxBackupSize && (
              <p className="text-sm text-destructive mt-1">
                {errors.maxBackupSize.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Comprimir Backups</p>
              <p className="text-sm text-muted-foreground">
                Compactar backups em formato ZIP
              </p>
            </div>
            <Switch
              {...register("compressBackups")}
              defaultChecked={initialData.compressBackups}
            />
          </div>
        </div>
      </Card>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Notificações por Email</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificar ao Completar Backup</p>
              <p className="text-sm text-muted-foreground">
                Enviar email quando backup for concluído
              </p>
            </div>
            <Switch
              {...register("notifyOnBackup")}
              defaultChecked={initialData.notifyOnBackup}
            />
          </div>

          <div>
            <Label htmlFor="notificationEmail">Email para Notificações</Label>
            <Input
              id="notificationEmail"
              type="email"
              {...register("notificationEmail")}
              placeholder="admin@example.com"
            />
            {errors.notificationEmail && (
              <p className="text-sm text-destructive mt-1">
                {errors.notificationEmail.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificar em Caso de Falha</p>
              <p className="text-sm text-muted-foreground">
                Enviar email se o backup falhar
              </p>
            </div>
            <Switch
              {...register("notifyOnBackupFailure")}
              defaultChecked={initialData.notifyOnBackupFailure}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
