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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  deleteApiKey,
  regenerateApiKey,
  updateApiKey,
} from "@/lib/actions/api-actions";
import { toast } from "sonner";
import {
  Key,
  Edit,
  Trash2,
  Plus,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";
import { ApiKeyDialog } from "./ApiKeyDialog";

interface ApiKey {
  id: string;
  name: string;
  description: string | null;
  scopes: string[];
  isActive: boolean;
  customRateLimit: boolean | null;
  requestsPerMinute: number | null;
  requestsPerHour: number | null;
  lastUsedAt: Date | null;
  usageCount: number;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiKeysListProps {
  apiKeys: ApiKey[];
}

export function ApiKeysList({ apiKeys: initialKeys }: ApiKeysListProps) {
  const [apiKeys, setApiKeys] = useState(initialKeys);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editKey, setEditKey] = useState<ApiKey | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyDialog, setNewKeyDialog] = useState<{
    open: boolean;
    key: string;
    name: string;
  }>({ open: false, key: "", name: "" });

  async function handleDelete(id: string) {
    const result = await deleteApiKey(id);

    if (result.success) {
      toast.success("API key excluída com sucesso!");
      setApiKeys(apiKeys.filter((k) => k.id !== id));
    } else {
      toast.error(result.error || "Erro ao excluir API key");
    }

    setDeleteId(null);
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    const result = await updateApiKey(id, { isActive: !isActive });

    if (result.success && result.data) {
      toast.success(!isActive ? "API key ativada" : "API key desativada");
      setApiKeys(apiKeys.map((k) => (k.id === id ? result.data! : k)));
    } else {
      toast.error(result.error || "Erro ao atualizar API key");
    }
  }

  async function handleRegenerate(id: string, name: string) {
    const result = await regenerateApiKey(id);

    if (result.success && result.plainKey) {
      toast.success("API key regenerada com sucesso!");
      setNewKeyDialog({
        open: true,
        key: result.plainKey,
        name,
      });
      if (result.data) {
        setApiKeys(apiKeys.map((k) => (k.id === id ? result.data! : k)));
      }
    } else {
      toast.error(result.error || "Erro ao regenerar API key");
    }
  }

  function handleEdit(key: ApiKey) {
    setEditKey(key);
  }

  function handleCloseDialog() {
    setEditKey(null);
    setIsCreateOpen(false);
  }

  function handleKeyCreated(key: ApiKey, plainKey?: string) {
    setApiKeys([key, ...apiKeys]);
    if (plainKey) {
      setNewKeyDialog({
        open: true,
        key: plainKey,
        name: key.name,
      });
    }
    handleCloseDialog();
  }

  function handleKeyUpdated(key: ApiKey, plainKey?: string) {
    setApiKeys(apiKeys.map((k) => (k.id === key.id ? key : k)));
    handleCloseDialog();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("API key copiada!");
  }

  function formatDate(date: Date | null) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-BR");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">API Keys</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie suas chaves de API
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova API Key
        </Button>
      </div>

      {apiKeys.length === 0 ? (
        <Card className="p-8 text-center">
          <Key className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma API key encontrada</h3>
          <p className="text-muted-foreground mb-4">
            Crie sua primeira API key para começar
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar API Key
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold">{apiKey.name}</h4>
                    {!apiKey.isActive && (
                      <Badge variant="outline">Inativa</Badge>
                    )}
                    {apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date() && (
                      <Badge variant="destructive">Expirada</Badge>
                    )}
                  </div>

                  {apiKey.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {apiKey.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Uso: {apiKey.usageCount} requisições
                      </span>
                    </div>

                    {apiKey.lastUsedAt && (
                      <div className="text-muted-foreground">
                        Último uso: {formatDate(apiKey.lastUsedAt)}
                      </div>
                    )}

                    {apiKey.expiresAt && (
                      <div className="text-muted-foreground">
                        Expira: {formatDate(apiKey.expiresAt)}
                      </div>
                    )}
                  </div>

                  {apiKey.scopes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-sm text-muted-foreground">Scopes:</span>
                      {apiKey.scopes.map((scope) => (
                        <Badge key={scope} variant="outline">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {apiKey.customRateLimit && (
                    <div className="mt-3 p-2 bg-muted rounded text-sm">
                      Rate Limit: {apiKey.requestsPerMinute}/min,{" "}
                      {apiKey.requestsPerHour}/hora
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(apiKey.id, apiKey.isActive)}
                  >
                    {apiKey.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRegenerate(apiKey.id, apiKey.name)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(apiKey)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteId(apiKey.id)}
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
              Tem certeza que deseja excluir esta API key? Esta ação não pode ser
              desfeita e todas as aplicações usando esta key perderão acesso.
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

      {/* New Key Display Dialog */}
      <Dialog
        open={newKeyDialog.open}
        onOpenChange={(open) =>
          setNewKeyDialog({ open, key: "", name: "" })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Criada com Sucesso!</DialogTitle>
            <DialogDescription>
              Esta é a sua nova API key. Copie-a agora, pois não será possível
              visualizá-la novamente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Nome:</p>
              <p className="text-sm">{newKeyDialog.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">API Key:</p>
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded text-sm break-all">
                  {newKeyDialog.key}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(newKeyDialog.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Importante:</strong> Guarde esta chave em um local seguro.
                Por motivos de segurança, não será possível visualizá-la novamente.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Dialog */}
      {(isCreateOpen || editKey) && (
        <ApiKeyDialog
          apiKey={editKey}
          onClose={handleCloseDialog}
          onSuccess={editKey ? handleKeyUpdated : handleKeyCreated}
        />
      )}
    </div>
  );
}
