"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  apiSettingsSchema,
  type ApiSettingsFormData,
} from "@/lib/validations/api-schema";
import { updateApiSettings } from "@/lib/actions/api-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Save, Gauge, Globe, Shield, Plus, X } from "lucide-react";
import type { ApiSettings } from "@prisma/client";

interface ApiSettingsFormProps {
  initialData: ApiSettings;
}

export function ApiSettingsForm({ initialData }: ApiSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [origins, setOrigins] = useState<string[]>(initialData.allowedOrigins);
  const [methods, setMethods] = useState<string[]>(initialData.allowedMethods);
  const [headers, setHeaders] = useState<string[]>(initialData.allowedHeaders);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiSettingsFormData>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      enableRateLimiting: initialData.enableRateLimiting,
      requestsPerMinute: initialData.requestsPerMinute,
      requestsPerHour: initialData.requestsPerHour,
      enableCors: initialData.enableCors,
      allowedOrigins: initialData.allowedOrigins,
      allowedMethods: initialData.allowedMethods,
      allowedHeaders: initialData.allowedHeaders,
      allowCredentials: initialData.allowCredentials,
      requireApiKey: initialData.requireApiKey,
      apiKeyHeaderName: initialData.apiKeyHeaderName,
      enableRequestLogging: initialData.enableRequestLogging,
    },
  });

  async function onSubmit(data: ApiSettingsFormData) {
    setIsSubmitting(true);

    try {
      const result = await updateApiSettings({
        ...data,
        allowedOrigins: origins,
        allowedMethods: methods,
        allowedHeaders: headers,
      });

      if (result.success) {
        toast.success("Configurações de API atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar configurações");
      }
    } catch (error) {
      console.error("Error submitting API settings:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Rate Limiting */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Rate Limiting</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Habilitar Rate Limiting</p>
              <p className="text-sm text-muted-foreground">
                Limitar requisições por tempo
              </p>
            </div>
            <Switch
              {...register("enableRateLimiting")}
              defaultChecked={initialData.enableRateLimiting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requestsPerMinute">Requisições por Minuto</Label>
              <Input
                id="requestsPerMinute"
                type="number"
                {...register("requestsPerMinute", { valueAsNumber: true })}
                placeholder="60"
              />
              {errors.requestsPerMinute && (
                <p className="text-sm text-destructive mt-1">
                  {errors.requestsPerMinute.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="requestsPerHour">Requisições por Hora</Label>
              <Input
                id="requestsPerHour"
                type="number"
                {...register("requestsPerHour", { valueAsNumber: true })}
                placeholder="1000"
              />
              {errors.requestsPerHour && (
                <p className="text-sm text-destructive mt-1">
                  {errors.requestsPerHour.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* CORS Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5" />
          <h3 className="text-lg font-semibold">CORS Configuration</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Habilitar CORS</p>
              <p className="text-sm text-muted-foreground">
                Permitir requisições de outras origens
              </p>
            </div>
            <Switch
              {...register("enableCors")}
              defaultChecked={initialData.enableCors}
            />
          </div>

          <div>
            <Label>Origens Permitidas</Label>
            <div className="space-y-2 mt-2">
              {origins.map((origin, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={origin}
                    onChange={(e) => {
                      const newOrigins = [...origins];
                      newOrigins[index] = e.target.value;
                      setOrigins(newOrigins);
                    }}
                    placeholder="https://example.com ou *"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setOrigins(origins.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOrigins([...origins, "https://"])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Origem
              </Button>
            </div>
          </div>

          <div>
            <Label>Métodos HTTP Permitidos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {methods.map((method, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  <Input
                    value={method}
                    onChange={(e) => {
                      const newMethods = [...methods];
                      newMethods[index] = e.target.value;
                      setMethods(newMethods);
                    }}
                    className="h-6 w-20 text-xs px-2"
                  />
                  <button
                    type="button"
                    onClick={() => setMethods(methods.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMethods([...methods, "GET"])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>

          <div>
            <Label>Headers Permitidos</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {headers.map((header, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  <Input
                    value={header}
                    onChange={(e) => {
                      const newHeaders = [...headers];
                      newHeaders[index] = e.target.value;
                      setHeaders(newHeaders);
                    }}
                    className="h-6 w-32 text-xs px-2"
                  />
                  <button
                    type="button"
                    onClick={() => setHeaders(headers.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setHeaders([...headers, "Content-Type"])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Permitir Credenciais</p>
              <p className="text-sm text-muted-foreground">
                Permitir cookies e autenticação
              </p>
            </div>
            <Switch
              {...register("allowCredentials")}
              defaultChecked={initialData.allowCredentials}
            />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Segurança</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Requerer API Key</p>
              <p className="text-sm text-muted-foreground">
                Todas requisições precisam de API key
              </p>
            </div>
            <Switch
              {...register("requireApiKey")}
              defaultChecked={initialData.requireApiKey}
            />
          </div>

          <div>
            <Label htmlFor="apiKeyHeaderName">Nome do Header da API Key</Label>
            <Input
              id="apiKeyHeaderName"
              {...register("apiKeyHeaderName")}
              placeholder="X-API-Key"
            />
            {errors.apiKeyHeaderName && (
              <p className="text-sm text-destructive mt-1">
                {errors.apiKeyHeaderName.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Logging de Requisições</p>
              <p className="text-sm text-muted-foreground">
                Registrar todas requisições à API
              </p>
            </div>
            <Switch
              {...register("enableRequestLogging")}
              defaultChecked={initialData.enableRequestLogging}
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
