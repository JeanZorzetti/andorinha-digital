"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailTemplateSchema,
  type EmailTemplateFormData,
} from "@/lib/validations/email-schema";
import {
  createEmailTemplate,
  updateEmailTemplate,
} from "@/lib/actions/email-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import type { EmailTemplate } from "@prisma/client";

interface EmailTemplateDialogProps {
  template?: EmailTemplate | null;
  onClose: () => void;
  onSuccess: (template: EmailTemplate) => void;
}

export function EmailTemplateDialog({
  template,
  onClose,
  onSuccess,
}: EmailTemplateDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!template;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmailTemplateFormData>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: template
      ? {
          name: template.name,
          type: template.type,
          subject: template.subject,
          body: template.body,
          variables: template.variables,
          isActive: template.isActive,
        }
      : {
          name: "",
          type: "CUSTOM",
          subject: "",
          body: "",
          variables: [],
          isActive: true,
        },
  });

  const selectedType = watch("type");

  async function onSubmit(data: EmailTemplateFormData) {
    setIsSubmitting(true);

    try {
      const result = isEdit
        ? await updateEmailTemplate(template.id, data)
        : await createEmailTemplate(data);

      if (result.success && result.data) {
        toast.success(
          isEdit
            ? "Template atualizado com sucesso!"
            : "Template criado com sucesso!"
        );
        onSuccess(result.data);
      } else {
        toast.error(result.error || "Erro ao salvar template");
      }
    } catch (error) {
      console.error("Error submitting template:", error);
      toast.error("Erro ao salvar template");
    } finally {
      setIsSubmitting(false);
    }
  }

  const templateTypes = [
    { value: "WELCOME", label: "Boas-vindas" },
    { value: "PASSWORD_RESET", label: "Redefinir Senha" },
    { value: "CONTACT_FORM", label: "Formulário de Contato" },
    { value: "NEWSLETTER", label: "Newsletter" },
    { value: "NOTIFICATION", label: "Notificação" },
    { value: "CUSTOM", label: "Personalizado" },
  ];

  const commonVariables: Record<string, string[]> = {
    WELCOME: ["{{userName}}", "{{userEmail}}", "{{loginUrl}}"],
    PASSWORD_RESET: ["{{userName}}", "{{resetUrl}}", "{{expiresIn}}"],
    CONTACT_FORM: [
      "{{userName}}",
      "{{userEmail}}",
      "{{message}}",
      "{{phone}}",
    ],
    NEWSLETTER: ["{{userName}}", "{{unsubscribeUrl}}", "{{content}}"],
    NOTIFICATION: ["{{userName}}", "{{title}}", "{{message}}", "{{actionUrl}}"],
    CUSTOM: ["{{userName}}", "{{userEmail}}"],
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Template" : "Novo Template"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edite as informações do template de email"
              : "Crie um novo template de email"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Template *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Ex: Email de Boas-vindas"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="type">Tipo de Template *</Label>
            <Select
              value={selectedType}
              onValueChange={(value) =>
                setValue("type", value as EmailTemplateFormData["type"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {templateTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Assunto *</Label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder="Ex: Bem-vindo à Andorinha Digital!"
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="body">Corpo do Email *</Label>
            <Textarea
              id="body"
              {...register("body")}
              placeholder="Conteúdo do email (pode usar HTML e variáveis)"
              rows={10}
              className="font-mono text-sm"
            />
            {errors.body && (
              <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
            )}
          </div>

          {selectedType && commonVariables[selectedType] && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm font-medium mb-2">
                Variáveis disponíveis para este tipo:
              </p>
              <div className="flex flex-wrap gap-2">
                {commonVariables[selectedType].map((variable) => (
                  <code
                    key={variable}
                    className="px-2 py-1 bg-background rounded text-xs"
                  >
                    {variable}
                  </code>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Template Ativo</p>
              <p className="text-sm text-muted-foreground">
                Template será usado no sistema
              </p>
            </div>
            <Switch
              {...register("isActive")}
              defaultChecked={template?.isActive ?? true}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? "Atualizar" : "Criar"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
