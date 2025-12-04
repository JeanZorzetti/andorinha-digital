"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  iconColor = "text-primary",
}: StatsCardProps) {
  const trendColor = trend && trend.value > 0 ? "text-green-600" : "text-red-600";
  const trendBg = trend && trend.value > 0 ? "bg-green-100" : "bg-red-100";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <Badge variant="outline" className={`mt-2 ${trendBg} ${trendColor} border-0`}>
            {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
