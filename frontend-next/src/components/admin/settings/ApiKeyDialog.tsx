"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  apiKeySchema,
  type ApiKeyFormData,
} from "@/lib/validations/api-schema";
import { createApiKey, updateApiKey } from "@/lib/actions/api-actions";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Save, Plus, X } from "lucide-react";

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

interface ApiKeyDialogProps {
  apiKey?: ApiKey | null;
  onClose: () => void;
  onSuccess: (apiKey: ApiKey, plainKey?: string) => void;
}

export function ApiKeyDialog({ apiKey, onClose, onSuccess }: ApiKeyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scopes, setScopes] = useState<string[]>(apiKey?.scopes || []);
  const [newScope, setNewScope] = useState("");
  const [customRateLimit, setCustomRateLimit] = useState(
    apiKey?.customRateLimit || false
  );

  const isEdit = !!apiKey;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: apiKey
      ? {
          name: apiKey.name,
          description: apiKey.description || "",
          scopes: apiKey.scopes,
          customRateLimit: apiKey.customRateLimit || false,
          requestsPerMinute: apiKey.requestsPerMinute || undefined,
          requestsPerHour: apiKey.requestsPerHour || undefined,
          expiresAt: apiKey.expiresAt || null,
        }
      : {
          name: "",
          description: "",
          scopes: [],
          customRateLimit: false,
        },
  });

  async function onSubmit(data: ApiKeyFormData) {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        scopes,
        customRateLimit,
      };

      const result = isEdit
        ? await updateApiKey(apiKey.id, payload)
        : await createApiKey(payload);

      if (result.success && result.data) {
        toast.success(
          isEdit ? "API key atualizada com sucesso!" : "API key criada com sucesso!"
        );
        const plainKey = "plainKey" in result ? (result.plainKey as string | undefined) : undefined;
        onSuccess(result.data, plainKey);
      } else {
        toast.error(result.error || "Erro ao salvar API key");
      }
    } catch (error) {
      console.error("Error submitting API key:", error);
      toast.error("Erro ao salvar API key");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAddScope() {
    if (newScope && !scopes.includes(newScope)) {
      setScopes([...scopes, newScope]);
      setNewScope("");
    }
  }

  function handleRemoveScope(scope: string) {
    setScopes(scopes.filter((s) => s !== scope));
  }

  const commonScopes = [
    "read:posts",
    "write:posts",
    "read:users",
    "write:users",
    "read:media",
    "write:media",
    "read:analytics",
    "admin:all",
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar API Key" : "Nova API Key"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edite as informações da API key"
              : "Crie uma nova chave de API para acessar a plataforma"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Ex: Produção App Mobile"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva o propósito desta API key..."
              rows={3}
            />
          </div>

          <div>
            <Label>Scopes (Permissões)</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {scopes.map((scope) => (
                  <Badge key={scope} variant="secondary" className="gap-2">
                    {scope}
                    <button
                      type="button"
                      onClick={() => handleRemoveScope(scope)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  placeholder="Ex: read:posts"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddScope();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddScope}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-3 bg-muted rounded">
                <p className="text-xs font-medium mb-2">Scopes comuns:</p>
                <div className="flex flex-wrap gap-1">
                  {commonScopes.map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => {
                        if (!scopes.includes(scope)) {
                          setScopes([...scopes, scope]);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-background rounded hover:bg-accent"
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rate Limiting Customizado</p>
                <p className="text-sm text-muted-foreground">
                  Sobrescrever configurações globais
                </p>
              </div>
              <Switch
                checked={customRateLimit}
                onCheckedChange={setCustomRateLimit}
              />
            </div>

            {customRateLimit && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="requestsPerMinute">Req/Minuto</Label>
                  <Input
                    id="requestsPerMinute"
                    type="number"
                    {...register("requestsPerMinute", { valueAsNumber: true })}
                    placeholder="60"
                  />
                </div>
                <div>
                  <Label htmlFor="requestsPerHour">Req/Hora</Label>
                  <Input
                    id="requestsPerHour"
                    type="number"
                    {...register("requestsPerHour", { valueAsNumber: true })}
                    placeholder="1000"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="expiresAt">Data de Expiração (Opcional)</Label>
            <Input
              id="expiresAt"
              type="date"
              {...register("expiresAt", {
                setValueAs: (value) => (value ? new Date(value) : null),
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Deixe em branco para nunca expirar
            </p>
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
