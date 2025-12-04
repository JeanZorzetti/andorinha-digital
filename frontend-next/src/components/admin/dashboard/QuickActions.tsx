"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Layers, Image, Plus } from "lucide-react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  iconColor: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  {
    title: "Novo Post",
    description: "Criar novo artigo para o blog",
    icon: FileText,
    href: "/admin/blog/new",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Novo Case",
    description: "Adicionar case de sucesso",
    icon: Briefcase,
    href: "/admin/cases/new",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Novo Serviço",
    description: "Cadastrar novo serviço",
    icon: Layers,
    href: "/admin/services/new",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Biblioteca",
    description: "Gerenciar arquivos e mídia",
    icon: Image,
    href: "/admin/uploads",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <Icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
