import { Suspense } from "react";
import { getRedirectStats, listRedirects } from "@/lib/actions/redirect-actions";
import { RedirectsTable } from "@/components/admin/seo/RedirectsTable";
import { RedirectForm } from "@/components/admin/seo/RedirectForm";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, XCircle, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Redirects | Admin",
  description: "Gerenciar redirects 301 e 302",
};

async function RedirectStats() {
  const result = await getRedirectStats();

  if (!result.success || !result.stats) {
    return null;
  }

  const { stats } = result;

  const statCards = [
    {
      label: "Total de Redirects",
      value: stats.total,
      icon: ArrowRight,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Ativos",
      value: stats.active,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Inativos",
      value: stats.inactive,
      icon: XCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "Total de Acessos",
      value: stats.totalHits,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

async function RedirectsData() {
  const result = await listRedirects({ page: 1, limit: 50 });

  if (!result.success || !result.redirects) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Erro ao carregar redirects
      </div>
    );
  }

  return <RedirectsTable redirects={result.redirects} />;
}

export default async function RedirectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gerenciamento de Redirects
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure redirects 301 (permanentes) e 302 (temporários) para SEO
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-20 bg-muted rounded" />
              </Card>
            ))}
          </div>
        }
      >
        <RedirectStats />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Redirects Ativos</h2>
            <Suspense
              fallback={
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              }
            >
              <RedirectsData />
            </Suspense>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Novo Redirect</h2>
            <RedirectForm />
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-3">Sobre Redirects</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">301 - Permanente</p>
                <p>Use quando a página foi movida definitivamente. Transfere SEO juice.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">302 - Temporário</p>
                <p>Use para redirects temporários. Não transfere SEO juice.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
