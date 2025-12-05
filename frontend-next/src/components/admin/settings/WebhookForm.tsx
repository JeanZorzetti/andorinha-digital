"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createWebhook, updateWebhook } from "@/lib/actions/webhook-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Copy } from "lucide-react";

const WEBHOOK_EVENTS = [
  { id: "USER_CREATED", label: "Usuário Criado", description: "Quando um novo usuário é criado" },
  { id: "USER_UPDATED", label: "Usuário Atualizado", description: "Quando um usuário é atualizado" },
  { id: "USER_DELETED", label: "Usuário Deletado", description: "Quando um usuário é removido" },
  { id: "POST_PUBLISHED", label: "Post Publicado", description: "Quando um post é publicado" },
  { id: "POST_UNPUBLISHED", label: "Post Despublicado", description: "Quando um post é despublicado" },
  { id: "CASE_CREATED", label: "Case Criado", description: "Quando um case de sucesso é criado" },
  { id: "SERVICE_CREATED", label: "Serviço Criado", description: "Quando um serviço é criado" },
] as const;

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  url: z.string().url("URL inválida"),
  events: z.array(z.enum([
    "USER_CREATED",
    "USER_UPDATED",
    "USER_DELETED",
    "POST_PUBLISHED",
    "POST_UNPUBLISHED",
    "CASE_CREATED",
    "SERVICE_CREATED"
  ] as const)).min(1, "Selecione pelo menos um evento"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface WebhookFormProps {
  webhook?: {
    id: string;
    name: string;
    url: string;
    events: string[];
    description?: string | null;
  };
}

export function WebhookForm({ webhook }: WebhookFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secretDialogOpen, setSecretDialogOpen] = useState(false);
  const [webhookSecret, setWebhookSecret] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: webhook?.name || "",
      url: webhook?.url || "",
      events: webhook?.events || [],
      description: webhook?.description || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      if (webhook) {
        // Update
        const result = await updateWebhook({
          id: webhook.id,
          ...values,
        });

        if (result.success) {
          toast.success("Webhook atualizado com sucesso");
          router.push("/admin/settings/webhooks");
          router.refresh();
        } else {
          toast.error(result.error || "Erro ao atualizar webhook");
        }
      } else {
        // Create
        const result = await createWebhook(values);

        if (result.success && result.secret) {
          setWebhookSecret(result.secret);
          setSecretDialogOpen(true);
        } else {
          toast.error(result.error || "Erro ao criar webhook");
        }
      }
    } catch {
      toast.error("Erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(webhookSecret);
    toast.success("Secret copiado para a área de transferência");
  };

  const closeAndRedirect = () => {
    setSecretDialogOpen(false);
    router.push("/admin/settings/webhooks");
    router.refresh();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Integração com CRM" {...field} />
                    </FormControl>
                    <FormDescription>
                      Um nome descritivo para identificar este webhook
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL do Endpoint</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://api.exemplo.com/webhook"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A URL que receberá as notificações via POST
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição da integração..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="events"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Selecione os eventos que deseja receber
                      </FormLabel>
                      <FormDescription>
                        O webhook será acionado quando qualquer um destes eventos ocorrer
                      </FormDescription>
                    </div>
                    <div className="space-y-3">
                      {WEBHOOK_EVENTS.map((event) => (
                        <FormField
                          key={event.id}
                          control={form.control}
                          name="events"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={event.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(event.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, event.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== event.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-medium">
                                    {event.label}
                                  </FormLabel>
                                  <FormDescription>
                                    {event.description}
                                  </FormDescription>
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? webhook
                  ? "Salvando..."
                  : "Criando..."
                : webhook
                ? "Salvar Alterações"
                : "Criar Webhook"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Secret Dialog - apenas para criação */}
      <AlertDialog open={secretDialogOpen} onOpenChange={setSecretDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Webhook Criado com Sucesso!</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p className="text-yellow-600 font-medium">
                  ⚠️ Copie o secret abaixo. Ele não será exibido novamente!
                </p>
                <div className="relative">
                  <code className="block p-3 bg-muted rounded text-sm break-all">
                    {webhookSecret}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={copySecret}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Como usar o secret:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Use para verificar a assinatura HMAC SHA-256</li>
                    <li>Header: X-Webhook-Signature</li>
                    <li>Algoritmo: HMAC-SHA256(payload, secret)</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeAndRedirect}>
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
