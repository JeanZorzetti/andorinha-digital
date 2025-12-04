"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Briefcase, Layers } from "lucide-react";
import Link from "next/link";

interface Activity {
  id: string;
  type: "blog" | "case" | "service";
  title: string;
  action: "created" | "updated" | "published";
  author: string;
  timestamp: string | Date;
  slug?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeConfig = {
  blog: {
    icon: FileText,
    label: "Blog Post",
    color: "text-blue-600",
    bg: "bg-blue-100",
    href: (slug: string) => `/blog/${slug}`,
  },
  case: {
    icon: Briefcase,
    label: "Case Study",
    color: "text-purple-600",
    bg: "bg-purple-100",
    href: (slug: string) => `/cases/${slug}`,
  },
  service: {
    icon: Layers,
    label: "Serviço",
    color: "text-green-600",
    bg: "bg-green-100",
    href: (slug: string) => `/servicos/${slug}`,
  },
};

const actionLabels = {
  created: "criou",
  updated: "atualizou",
  published: "publicou",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Últimas atualizações do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma atividade recente
            </p>
          ) : (
            activities.map((activity) => {
              const config = typeConfig[activity.type];
              const Icon = config.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${config.bg}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="font-medium">{activity.author}</span>{" "}
                      {actionLabels[activity.action]}{" "}
                      {activity.slug ? (
                        <Link
                          href={config.href(activity.slug)}
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                        >
                          {activity.title}
                        </Link>
                      ) : (
                        <span className="font-medium">{activity.title}</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
