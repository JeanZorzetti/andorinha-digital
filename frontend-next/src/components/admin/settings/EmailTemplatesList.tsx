"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteEmailTemplate, updateEmailTemplate } from "@/lib/actions/email-actions";
import { toast } from "sonner";
import { Mail, Edit, Trash2, Eye, EyeOff, Plus } from "lucide-react";
import type { EmailTemplate } from "@prisma/client";
import { EmailTemplateDialog } from "./EmailTemplateDialog";

interface EmailTemplatesListProps {
  templates: EmailTemplate[];
}

export function EmailTemplatesList({ templates }: EmailTemplatesListProps) {
  const [templatesList, setTemplatesList] = useState(templates);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editTemplate, setEditTemplate] = useState<EmailTemplate | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  async function handleDelete(id: string) {
    const result = await deleteEmailTemplate(id);

    if (result.success) {
      toast.success("Template excluído com sucesso!");
      setTemplatesList(templatesList.filter((t) => t.id !== id));
    } else {
      toast.error(result.error || "Erro ao excluir template");
    }

    setDeleteId(null);
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    const result = await updateEmailTemplate(id, { isActive: !isActive });

    if (result.success && result.data) {
      toast.success(
        !isActive ? "Template ativado" : "Template desativado"
      );
      setTemplatesList(
        templatesList.map((t) => (t.id === id ? result.data! : t))
      );
    } else {
      toast.error(result.error || "Erro ao atualizar template");
    }
  }

  function handleEdit(template: EmailTemplate) {
    setEditTemplate(template);
  }

  function handleCloseDialog() {
    setEditTemplate(null);
    setIsCreateOpen(false);
  }

  function handleTemplateUpdated(template: EmailTemplate) {
    setTemplatesList(
      templatesList.map((t) => (t.id === template.id ? template : t))
    );
    handleCloseDialog();
  }

  function handleTemplateCreated(template: EmailTemplate) {
    setTemplatesList([template, ...templatesList]);
    handleCloseDialog();
  }

  const getTemplateTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      WELCOME: "Boas-vindas",
      PASSWORD_RESET: "Redefinir Senha",
      CONTACT_FORM: "Formulário de Contato",
      NEWSLETTER: "Newsletter",
      NOTIFICATION: "Notificação",
      CUSTOM: "Personalizado",
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Templates de Email</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie os templates de email do sistema
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      {templatesList.length === 0 ? (
        <Card className="p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhum template encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Crie seu primeiro template de email
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Template
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {templatesList.map((template) => (
            <Card key={template.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold">{template.name}</h4>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {getTemplateTypeLabel(template.type)}
                    </Badge>
                    {!template.isActive && (
                      <Badge variant="outline">Inativo</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Assunto:</strong> {template.subject}
                  </p>
                  {template.variables.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">
                        Variáveis:
                      </span>
                      {template.variables.map((variable) => (
                        <Badge key={variable} variant="outline">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Criado em:{" "}
                    {new Date(template.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(template.id, template.isActive)}
                  >
                    {template.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteId(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este template? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create/Edit Dialog */}
      {(isCreateOpen || editTemplate) && (
        <EmailTemplateDialog
          template={editTemplate}
          onClose={handleCloseDialog}
          onSuccess={editTemplate ? handleTemplateUpdated : handleTemplateCreated}
        />
      )}
    </div>
  );
}
