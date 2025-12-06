"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSettingsSchema,
  type EmailSettingsFormData,
} from "@/lib/validations/email-schema";
import {
  updateEmailSettings,
  testEmailConnection,
} from "@/lib/actions/email-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save, TestTube, Server, Mail, Bell } from "lucide-react";
import type { EmailSettings } from "@prisma/client";

interface EmailSettingsFormProps {
  initialData: EmailSettings;
}

export function EmailSettingsForm({ initialData }: EmailSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailSettingsFormData>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpHost: initialData.smtpHost,
      smtpPort: initialData.smtpPort,
      smtpUser: initialData.smtpUser,
      smtpPassword: initialData.smtpPassword,
      smtpSecure: initialData.smtpSecure,
      smtpFrom: initialData.smtpFrom,
      smtpFromName: initialData.smtpFromName,
      enableEmailNotifications: initialData.enableEmailNotifications,
      enableWelcomeEmail: initialData.enableWelcomeEmail,
      enablePasswordReset: initialData.enablePasswordReset,
      enableContactFormEmail: initialData.enableContactFormEmail,
      enableNewsletterEmail: initialData.enableNewsletterEmail,
    },
  });

  const watchedValues = watch();

  async function onSubmit(data: EmailSettingsFormData) {
    setIsSubmitting(true);

    try {
      const result = await updateEmailSettings(data);

      if (result.success) {
        toast.success("Configurações de email atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar configurações");
      }
    } catch (error) {
      console.error("Error submitting email settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleTestConnection() {
    setIsTesting(true);

    try {
      const result = await testEmailConnection({
        smtpHost: watchedValues.smtpHost,
        smtpPort: watchedValues.smtpPort,
        smtpUser: watchedValues.smtpUser,
        smtpPassword: watchedValues.smtpPassword,
        smtpSecure: watchedValues.smtpSecure,
        smtpFrom: watchedValues.smtpFrom,
      });

      if (result.success) {
        toast.success(result.message || "Conexão testada com sucesso!");
      } else {
        toast.error(result.error || "Erro ao testar conexão");
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast.error("Erro ao testar conexão");
    } finally {
      setIsTesting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* SMTP Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Configuração SMTP</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpHost">Host SMTP *</Label>
              <Input
                id="smtpHost"
                {...register("smtpHost")}
                placeholder="smtp.gmail.com"
              />
              {errors.smtpHost && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpHost.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="smtpPort">Porta *</Label>
              <Input
                id="smtpPort"
                type="number"
                {...register("smtpPort", { valueAsNumber: true })}
                placeholder="587"
              />
              {errors.smtpPort && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpPort.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpUser">Usuário SMTP *</Label>
              <Input
                id="smtpUser"
                {...register("smtpUser")}
                placeholder="seu-email@gmail.com"
              />
              {errors.smtpUser && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpUser.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="smtpPassword">Senha SMTP *</Label>
              <Input
                id="smtpPassword"
                type="password"
                {...register("smtpPassword")}
                placeholder="••••••••"
              />
              {errors.smtpPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpFrom">Email Remetente *</Label>
              <Input
                id="smtpFrom"
                type="email"
                {...register("smtpFrom")}
                placeholder="noreply@andorinha.digital"
              />
              {errors.smtpFrom && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpFrom.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="smtpFromName">Nome do Remetente *</Label>
              <Input
                id="smtpFromName"
                {...register("smtpFromName")}
                placeholder="Andorinha Digital"
              />
              {errors.smtpFromName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.smtpFromName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Conexão Segura (TLS/SSL)</p>
              <p className="text-sm text-muted-foreground">
                Usar conexão criptografada
              </p>
            </div>
            <Switch {...register("smtpSecure")} defaultChecked={initialData.smtpSecure} />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="w-full md:w-auto"
          >
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              <>
                <TestTube className="mr-2 h-4 w-4" />
                Testar Conexão
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Email Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Preferências de Email</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificações por Email</p>
              <p className="text-sm text-muted-foreground">
                Enviar notificações gerais por email
              </p>
            </div>
            <Switch
              {...register("enableEmailNotifications")}
              defaultChecked={initialData.enableEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Email de Boas-vindas</p>
              <p className="text-sm text-muted-foreground">
                Enviar email ao criar nova conta
              </p>
            </div>
            <Switch
              {...register("enableWelcomeEmail")}
              defaultChecked={initialData.enableWelcomeEmail}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Redefinição de Senha</p>
              <p className="text-sm text-muted-foreground">
                Enviar email para redefinir senha
              </p>
            </div>
            <Switch
              {...register("enablePasswordReset")}
              defaultChecked={initialData.enablePasswordReset}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Formulário de Contato</p>
              <p className="text-sm text-muted-foreground">
                Enviar notificações de novos contatos
              </p>
            </div>
            <Switch
              {...register("enableContactFormEmail")}
              defaultChecked={initialData.enableContactFormEmail}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-muted-foreground">
                Enviar emails de newsletter
              </p>
            </div>
            <Switch
              {...register("enableNewsletterEmail")}
              defaultChecked={initialData.enableNewsletterEmail}
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
