import { Suspense } from "react";
import { getAnalyticsSummary, getTrafficByDay, getDeviceStats, getConversionStats } from "@/lib/actions/analytics-actions";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrafficChart } from "@/components/admin/analytics/TrafficChart";
import { DeviceChart } from "@/components/admin/analytics/DeviceChart";
import { ConversionStats } from "@/components/admin/analytics/ConversionStats";
import { TopPages } from "@/components/admin/analytics/TopPages";
import { BarChart3, TrendingUp, Users, Target, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Analytics | Admin",
  description: "Dashboard de analytics e métricas",
};

async function AnalyticsSummary({ days = 30 }: { days?: number }) {
  const result = await getAnalyticsSummary(days);

  if (!result.success || !result.data) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Erro ao carregar dados
      </div>
    );
  }

  const { totalPageViews, uniqueVisitors, conversions, topPages } = result.data;

  const stats = [
    {
      label: "Total de Visualizações",
      value: totalPageViews.toLocaleString(),
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Visitantes Únicos",
      value: uniqueVisitors.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Conversões",
      value: conversions.toLocaleString(),
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Taxa de Conversão",
      value: totalPageViews > 0
        ? `${((conversions / totalPageViews) * 100).toFixed(2)}%`
        : "0%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {stats.map((stat) => {
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
      <TopPages pages={topPages} />
    </>
  );
}

async function TrafficData({ days = 30 }: { days?: number }) {
  const result = await getTrafficByDay(days);

  if (!result.success || !result.data) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Erro ao carregar dados de tráfego
      </div>
    );
  }

  return <TrafficChart data={result.data} />;
}

async function DeviceData({ days = 30 }: { days?: number }) {
  const result = await getDeviceStats(days);

  if (!result.success || !result.data) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Erro ao carregar dados de dispositivos
      </div>
    );
  }

  return <DeviceChart data={result.data} />;
}

async function ConversionData({ days = 30 }: { days?: number }) {
  const result = await getConversionStats(days);

  if (!result.success || !result.data) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Erro ao carregar dados de conversão
      </div>
    );
  }

  return <ConversionStats data={result.data} />;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const days = params.days ? parseInt(params.days as string) : 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Métricas de tráfego, conversões e comportamento de usuários
          </p>
        </div>

        <Button variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Exportar
        </Button>
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
        <AnalyticsSummary days={days} />
      </Suspense>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="conversions">Conversões</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tráfego por Dia</h3>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted rounded animate-pulse" />
              }
            >
              <TrafficData days={days} />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Dispositivos e Navegadores
            </h3>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted rounded animate-pulse" />
              }
            >
              <DeviceData days={days} />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Conversões por Tipo
            </h3>
            <Suspense
              fallback={
                <div className="h-[300px] bg-muted rounded animate-pulse" />
              }
            >
              <ConversionData days={days} />
            </Suspense>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
