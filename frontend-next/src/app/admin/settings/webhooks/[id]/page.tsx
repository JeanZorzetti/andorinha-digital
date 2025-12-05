import { ArrowLeft, Activity, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWebhook, listWebhookLogs } from "@/lib/actions/webhook-actions";
import { redirect } from "next/navigation";
import { WebhookLogsTable } from "@/components/admin/settings/WebhookLogsTable";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WebhookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getWebhook(id);

  if (!result.success || !result.webhook) {
    redirect("/admin/settings/webhooks");
  }

  const webhook = result.webhook;
  const logsResult = await listWebhookLogs({ subscriptionId: id, limit: 20 });
  const logs = logsResult.success ? logsResult.logs : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/settings/webhooks">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            {webhook.name}
          </h1>
          <p className="text-muted-foreground mt-2">{webhook.description || "Sem descrição"}</p>
        </div>
        <div>
          {webhook.isActive ? (
            <Badge variant="default" className="bg-green-600">
              Ativo
            </Badge>
          ) : (
            <Badge variant="secondary">Inativo</Badge>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              URL do Webhook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-sm break-all">{webhook.url}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Entregas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhook.logs?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eventos Inscritos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhook.events.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Configurados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {webhook.events.map((event: string) => (
              <Badge key={event} variant="outline">
                {event}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Logs Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs && logs.length > 0 ? (
            <WebhookLogsTable logs={logs} />
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma entrega registrada ainda
            </p>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href={`/admin/settings/webhooks/${id}/edit`}>Editar Webhook</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/settings/webhooks">Voltar para Lista</Link>
        </Button>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const result = await getWebhook(id);

  return {
    title: result.success ? `${result.webhook?.name} | Webhooks` : "Webhook | Admin",
    description: "Detalhes do webhook",
  };
}
