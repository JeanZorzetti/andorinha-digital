import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, Shield, Database, Mail, Webhook, Plug, Settings } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const settingsCards = [
  {
    title: "Configurações Gerais",
    description: "Configurações básicas do site e sistema",
    icon: Settings,
    href: "/admin/settings/general",
    iconColor: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  {
    title: "Gerenciar Usuários",
    description: "Adicionar, editar e remover usuários do sistema",
    icon: Users,
    href: "/admin/settings/users",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "SEO Global",
    description: "Configurações de SEO do site (meta tags, sitemap)",
    icon: Globe,
    href: "/admin/seo",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Email & Notificações",
    description: "Configurar notificações por email e webhooks",
    icon: Mail,
    href: "/admin/settings/email",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Webhooks",
    description: "Gerenciar integrações com sistemas externos via webhooks",
    icon: Webhook,
    href: "/admin/settings/webhooks",
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Audit Logs",
    description: "Logs de auditoria e histórico de atividades do sistema",
    icon: Shield,
    href: "/admin/settings/audit-logs",
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Backup & Restore",
    description: "Fazer backup e restaurar dados do sistema",
    icon: Database,
    href: "/admin/settings/backup",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "API Keys",
    description: "Gerenciar chaves de API e integrações externas",
    icon: Plug,
    href: "/admin/settings/api",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  // Apenas ADMIN pode acessar configurações
  if (session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-primary-dark">
          Configurações
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie todas as configurações do sistema
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => {
          const Icon = card.icon;
          const isDisabled = card.disabled;

          const cardContent = (
            <Card
              className={`h-full transition-all ${
                isDisabled
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-lg cursor-pointer hover:border-primary/50"
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {card.description}
                    </CardDescription>
                    {isDisabled && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        Em breve
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          );

          return isDisabled ? (
            <div key={card.title}>{cardContent}</div>
          ) : (
            <Link key={card.title} href={card.href}>
              {cardContent}
            </Link>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versão:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ambiente:</span>
              <span className="font-medium">
                {process.env.NODE_ENV === "production" ? "Produção" : "Desenvolvimento"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next.js:</span>
              <span className="font-medium">15.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">React:</span>
              <span className="font-medium">19.0.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usuário Logado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium">{session.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{session.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium">{session.user.role}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Configurações | Admin",
  description: "Configurações do sistema",
};
