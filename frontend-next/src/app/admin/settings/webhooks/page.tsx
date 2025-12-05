import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Webhook } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebhookTable } from "@/components/admin/settings/WebhookTable";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";

async function getWebhookStats() {
  const [total, active, inactive, totalLogs, failedLogs] = await Promise.all([
    prisma.webhookSubscription.count(),
    prisma.webhookSubscription.count({ where: { isActive: true } }),
    prisma.webhookSubscription.count({ where: { isActive: false } }),
    prisma.webhookLog.count(),
    prisma.webhookLog.count({ where: { success: false } }),
  ]);

  const successRate = totalLogs > 0
    ? Math.round(((totalLogs - failedLogs) / totalLogs) * 100)
    : 100;

  return { total, active, inactive, totalLogs, successRate };
}

export default async function WebhooksPage() {
  const stats = await getWebhookStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            Gerenciar Webhooks
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure integrações com sistemas externos via webhooks
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/settings/webhooks/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Webhook
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Entregas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLogs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.successRate >= 90 ? 'text-green-600' : stats.successRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
              {stats.successRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Table */}
      <Suspense fallback={<TableSkeleton />}>
        <WebhookTable />
      </Suspense>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Como funcionam os Webhooks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Os webhooks permitem que você receba notificações em tempo real quando eventos
            importantes acontecem no sistema, como criação de usuários, publicação de posts, etc.
          </p>
          <p>
            <strong>Eventos disponíveis:</strong> USER_CREATED, USER_UPDATED, USER_DELETED,
            POST_PUBLISHED, POST_UNPUBLISHED, CASE_CREATED, SERVICE_CREATED
          </p>
          <p>
            <strong>Segurança:</strong> Cada webhook possui um secret único usado para gerar
            assinaturas HMAC SHA-256 que você pode usar para verificar a autenticidade das requisições.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export const metadata = {
  title: "Webhooks | Admin",
  description: "Gerenciar webhooks e integrações",
};
