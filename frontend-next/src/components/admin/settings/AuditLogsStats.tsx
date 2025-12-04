import { getAuditStats } from "@/lib/actions/audit-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, FileText, Database } from "lucide-react";

export async function AuditLogsStats() {
  const result = await getAuditStats();

  if (!result.success || !result.stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Erro ao carregar estatísticas
      </div>
    );
  }

  const { stats } = result;

  const statCards = [
    {
      title: "Total de Logs",
      value: stats.totalLogs.toLocaleString("pt-BR"),
      icon: Database,
      description: "Registros totais",
    },
    {
      title: "Logs Hoje",
      value: stats.todayLogs.toLocaleString("pt-BR"),
      icon: TrendingUp,
      description: "Atividades de hoje",
    },
    {
      title: "Ação Mais Comum",
      value: stats.topActions[0]?.action || "N/A",
      icon: Activity,
      description: `${stats.topActions[0]?.count || 0} ocorrências`,
    },
    {
      title: "Recurso Mais Acessado",
      value: stats.topResources[0]?.resource || "N/A",
      icon: FileText,
      description: `${stats.topResources[0]?.count || 0} ações`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
