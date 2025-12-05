"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ConversionData {
  type: string;
  count: number;
  totalValue: number;
}

interface ConversionStatsProps {
  data: ConversionData[];
}

const typeLabels: Record<string, string> = {
  CONTACT_FORM: "Formulário de Contato",
  SERVICE_REQUEST: "Solicitação de Serviço",
  NEWSLETTER_SIGNUP: "Newsletter",
  CALENDLY_BOOKING: "Agendamento",
  DOWNLOAD: "Download",
  OTHER: "Outros",
};

export function ConversionStats({ data }: ConversionStatsProps) {
  const chartData = data.map((item) => ({
    name: typeLabels[item.type] || item.type,
    conversões: item.count,
    valor: item.totalValue,
  }));

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Bar
            dataKey="conversões"
            fill="hsl(var(--chart-1))"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid gap-4 md:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.type}
            className="p-4 border rounded-lg bg-card text-card-foreground"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {typeLabels[item.type] || item.type}
            </p>
            <p className="text-2xl font-bold mt-1">{item.count}</p>
            {item.totalValue > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Valor: R$ {item.totalValue.toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
