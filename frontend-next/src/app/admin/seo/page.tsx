import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Link as LinkIcon,
  Search,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "SEO & Marketing | Admin",
  description: "Ferramentas de SEO e marketing digital",
};

export default function SEOPage() {
  const tools = [
    {
      title: "Redirects",
      description: "Gerenciar redirects 301 e 302 para preservar SEO",
      icon: ArrowRight,
      href: "/admin/seo/redirects",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      available: true,
    },
    {
      title: "Sitemap",
      description: "Visualizar e configurar o sitemap.xml",
      icon: FileText,
      href: "/sitemap.xml",
      color: "text-green-600",
      bgColor: "bg-green-50",
      available: true,
      external: true,
    },
    {
      title: "Meta Tags",
      description: "Configurar meta tags padrão e OG tags",
      icon: Search,
      href: "/admin/seo/meta-tags",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      available: false,
    },
    {
      title: "Analytics",
      description: "Ver dados de tráfego e conversões",
      icon: TrendingUp,
      href: "/admin/analytics",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      available: true,
    },
    {
      title: "Link Checker",
      description: "Verificar links quebrados no site",
      icon: LinkIcon,
      href: "/admin/seo/link-checker",
      color: "text-red-600",
      bgColor: "bg-red-50",
      available: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO & Marketing</h1>
        <p className="text-muted-foreground mt-2">
          Ferramentas para otimizar o posicionamento do site nos mecanismos de busca
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isExternal = tool.external;

          return (
            <Card
              key={tool.title}
              className={`p-6 hover:shadow-lg transition-shadow ${
                !tool.available ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${tool.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                {!tool.available && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    Em breve
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {tool.description}
              </p>

              {tool.available ? (
                isExternal ? (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={tool.href}>Acessar</Link>
                  </Button>
                )
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Em desenvolvimento
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Status de SEO Atual</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Sitemap
            </p>
            <p className="text-2xl font-bold text-green-600">✓ Ativo</p>
            <p className="text-xs text-muted-foreground">
              Atualizado automaticamente
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Robots.txt
            </p>
            <p className="text-2xl font-bold text-green-600">✓ Ativo</p>
            <p className="text-xs text-muted-foreground">
              Configurado para produção
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Meta Tags
            </p>
            <p className="text-2xl font-bold text-green-600">✓ Ativo</p>
            <p className="text-xs text-muted-foreground">
              Configuradas em todos os content types
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>Redirects configurados:</strong> Sistema de redirects 301/302
              implementado
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">→</span>
            <span>
              <strong>Link Checker:</strong> Implementar verificação automática de
              links quebrados
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">→</span>
            <span>
              <strong>SEO Score:</strong> Calculadora de score SEO para cada página
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">→</span>
            <span>
              <strong>Schema.org:</strong> Gerador de markup estruturado
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
