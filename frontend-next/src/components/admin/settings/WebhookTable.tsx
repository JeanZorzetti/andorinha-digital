"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  _count: {
    logs: number;
  };
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Power,
  PowerOff,
  TestTube,
  RefreshCcw,
  Copy
} from "lucide-react";
import { toast } from "sonner";
import {
  deleteWebhook,
  updateWebhook,
  testWebhook,
  regenerateWebhookSecret,
} from "@/lib/actions/webhook-actions";
import { useWebhooks } from "@/hooks/useWebhooks";
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

export function WebhookTable() {
  const router = useRouter();
  const { webhooks, loading, error, refetch } = useWebhooks();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [secretDialogOpen, setSecretDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [newSecret, setNewSecret] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setIsProcessing(true);
    const result = await updateWebhook({ id, isActive: !currentStatus });

    if (result.success) {
      toast.success(`Webhook ${!currentStatus ? "ativado" : "desativado"} com sucesso`);
      refetch();
    } else {
      toast.error(result.error || "Erro ao alterar status");
    }
    setIsProcessing(false);
  };

  const handleTest = async (id: string, name: string) => {
    setIsProcessing(true);
    toast.info(`Enviando teste para ${name}...`);

    const result = await testWebhook(id);

    if (result.success) {
      toast.success(`Teste enviado com sucesso! Status: ${result.statusCode}`);
    } else {
      toast.error(result.error || "Erro ao enviar teste");
    }
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    if (!selectedWebhook) return;

    setIsProcessing(true);
    const result = await deleteWebhook(selectedWebhook);

    if (result.success) {
      toast.success("Webhook deletado com sucesso");
      setDeleteDialogOpen(false);
      setSelectedWebhook(null);
      refetch();
    } else {
      toast.error(result.error || "Erro ao deletar webhook");
    }
    setIsProcessing(false);
  };

  const handleRegenerateSecret = async () => {
    if (!selectedWebhook) return;

    setIsProcessing(true);
    const result = await regenerateWebhookSecret(selectedWebhook);

    if (result.success && result.secret) {
      setNewSecret(result.secret);
      toast.success("Secret regenerado com sucesso");
      refetch();
    } else {
      toast.error(result.error || "Erro ao regenerar secret");
      setSecretDialogOpen(false);
      setSelectedWebhook(null);
    }
    setIsProcessing(false);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(newSecret);
    toast.success("Secret copiado para a área de transferência");
  };

  if (loading) {
    return <div className="text-center py-8">Carregando webhooks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Erro: {error}</div>;
  }

  if (!webhooks || webhooks.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10">
        <p className="text-muted-foreground">
          Nenhum webhook configurado. Clique em &quot;Novo Webhook&quot; para começar.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Eventos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Logs</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook: Webhook) => (
              <TableRow key={webhook.id}>
                <TableCell className="font-medium">{webhook.name}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {webhook.url}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.slice(0, 2).map((event: string) => (
                      <Badge key={event} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                    {webhook.events.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{webhook.events.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {webhook.isActive ? (
                    <Badge variant="default" className="bg-green-600">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inativo</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {webhook._count.logs} entrega{webhook._count.logs !== 1 ? 's' : ''}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/settings/webhooks/${webhook.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/settings/webhooks/${webhook.id}/edit`)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleActive(webhook.id, webhook.isActive)}
                        disabled={isProcessing}
                      >
                        {webhook.isActive ? (
                          <>
                            <PowerOff className="w-4 h-4 mr-2" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Power className="w-4 h-4 mr-2" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTest(webhook.id, webhook.name)}
                        disabled={isProcessing}
                      >
                        <TestTube className="w-4 h-4 mr-2" />
                        Enviar Teste
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedWebhook(webhook.id);
                          setSecretDialogOpen(true);
                        }}
                      >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Regenerar Secret
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedWebhook(webhook.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este webhook? Esta ação não pode ser desfeita
              e todos os logs associados serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Regenerate Secret Dialog */}
      <AlertDialog open={secretDialogOpen} onOpenChange={(open) => {
        setSecretDialogOpen(open);
        if (!open) {
          setNewSecret("");
          setSelectedWebhook(null);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {newSecret ? "Novo Secret Gerado" : "Regenerar Secret"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {newSecret ? (
                <div className="space-y-4">
                  <p className="text-yellow-600 font-medium">
                    ⚠️ Copie o secret agora! Ele não será exibido novamente.
                  </p>
                  <div className="relative">
                    <code className="block p-3 bg-muted rounded text-sm break-all">
                      {newSecret}
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
                  <p className="text-sm text-muted-foreground">
                    Use este secret para verificar a assinatura HMAC SHA-256 nas requisições do webhook.
                  </p>
                </div>
              ) : (
                "Tem certeza que deseja regenerar o secret? O secret atual será invalidado e você precisará atualizar sua integração."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {newSecret ? (
              <AlertDialogAction onClick={() => {
                setSecretDialogOpen(false);
                setNewSecret("");
                setSelectedWebhook(null);
              }}>
                Fechar
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel disabled={isProcessing}>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRegenerateSecret}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Regenerando..." : "Regenerar"}
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
