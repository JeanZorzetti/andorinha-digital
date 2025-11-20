import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Target,
  Heart,
  Zap,
  Users,
  TrendingUp,
  Handshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós | Quem Somos | Andorinha Marketing",
  description: "Conheça a Andorinha Marketing: agência especializada em PMEs com 15 anos de experiência. Transparência, estratégia e resultados reais.",
  keywords: "sobre andorinha marketing, quem somos, agência de marketing, história, valores, equipe",
  openGraph: {
    url: "https://andorinha.roilabs.com.br/sobre",
    images: [
      {
        url: "https://andorinha.roilabs.com.br/og/og-sobre.png",
        width: 1200,
        height: 630,
        alt: "Sobre a Andorinha Marketing",
      },
    ],
  },
};

export default function SobrePage() {
  const values = [
    {
      icon: Eye,
      title: "Transparência",
      description:
        "Comunicação clara e honesta em todas as etapas. Sem letras miúdas ou surpresas.",
    },
    {
      icon: Target,
      title: "Estratégia",
      description:
        "Cada decisão é baseada em dados e objetivos. Marketing que faz sentido para seu negócio.",
    },
    {
      icon: Zap,
      title: "Agilidade",
      description:
        "Processos enxutos e comunicação direta. Decisões rápidas sem burocracia.",
    },
    {
      icon: TrendingUp,
      title: "Resultado",
      description:
        "Foco em métricas que importam. Vendas são consequência de um bom trabalho.",
    },
    {
      icon: Handshake,
      title: "Parceria",
      description:
        "Trabalhamos juntos, não para você. Seu sucesso é o nosso sucesso.",
    },
  ];

  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "50+", label: "Projetos Entregues" },
    { number: "98%", label: "Taxa de Satisfação" },
    { number: "30", label: "Dias (Prazo Médio)" },
  ];

  const differentials = [
    {
      icon: Users,
      title: "Especializados em PMEs",
      description:
        "Entendemos os desafios de pequenas e médias empresas. Soluções que cabem no seu orçamento.",
    },
    {
      icon: Eye,
      title: "Transparência Total",
      description:
        "Você sabe exatamente o que está pagando e o que vai receber. Sem surpresas.",
    },
    {
      icon: Handshake,
      title: "Processo Colaborativo",
      description:
        "Você participa de cada etapa. Nada é decidido sem sua aprovação.",
    },
    {
      icon: Target,
      title: "Estratégia Real",
      description:
        "Não fazemos marketing por fazer. Cada ação tem um objetivo claro e mensurável.",
    },
    {
      icon: Heart,
      title: "Suporte Verdadeiro",
      description:
        "Não abandonamos você após a entrega. Suporte real até você se sentir seguro.",
    },
    {
      icon: Zap,
      title: "Sem Burocracias",
      description:
        "Comunicação direta, decisões rápidas. Seu tempo é valioso demais para reuniões inúteis.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Finalmente encontrei uma agência que entende a realidade de uma PME. Soluções inteligentes que cabem no orçamento.",
      author: "Paulo Ferreira",
      role: "Diretor, Ferreira & Associados",
    },
    {
      quote:
        "O processo foi muito tranquilo. Sempre soube exatamente em que etapa estávamos e o que vinha a seguir.",
      author: "Marina Costa",
      role: "CEO, TechStart",
    },
    {
      quote:
        "A equipe realmente se importa com o resultado. Não é só entregar e tchau. Eles acompanham até funcionar.",
      author: "Roberto Lima",
      role: "Fundador, Lima Digital",
    },
    {
      quote:
        "Depois de 3 agências que não deram certo, finalmente encontrei parceiros de verdade. Recomendo muito.",
      author: "Carla Santos",
      role: "Sócia, Santos Consultoria",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              Voe Certo. Voe Alto.
            </h1>
            <p className="text-xl font-body text-muted-foreground mb-8">
              Marketing que transforma vendas em consequência, não em luta.
              Ajudamos PMEs a crescerem com estratégia, não com sorte.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-foreground mb-8 text-center">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none font-body text-muted-foreground space-y-4">
              <p>
                A Andorinha nasceu da frustração. Depois de anos trabalhando em
                grandes agências, percebemos que pequenas e médias empresas eram
                tratadas como clientes de segunda classe. Briefings genéricos,
                soluções caras demais, e resultados que nunca chegavam.
              </p>
              <p>
                Decidimos fazer diferente. Criamos uma agência que entende a
                realidade das PMEs: orçamentos limitados, decisões que precisam
                ser rápidas, e cada real investido precisa trazer retorno.
              </p>
              <p>
                Hoje, com mais de 15 anos de experiência e 50+ projetos
                entregues, continuamos com a mesma filosofia: marketing
                estratégico de qualidade a preços justos. Sem enrolação, sem
                burocracia, sem promessas vazias.
              </p>
              <p>
                Nosso nome vem da andorinha: um pássaro pequeno, mas que voa
                longe e sempre encontra o caminho de casa. Assim como ela,
                ajudamos empresas a irem longe sem perder a essência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3">Missão</h3>
              <p className="font-body text-muted-foreground">
                Tornar marketing estratégico de qualidade acessível para pequenas
                e médias empresas, ajudando-as a crescer de forma sustentável e
                inteligente.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3">Visão</h3>
              <p className="font-body text-muted-foreground">
                Ser referência em projetos de marketing para PMEs, reconhecida
                pela qualidade, transparência e resultados reais que entregamos.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-heading text-center text-foreground mb-4">
            Nossos Valores
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Os princípios que guiam cada projeto e decisão
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white px-6 py-4 rounded-xl shadow-sm border border-border flex items-center gap-3 min-w-[280px] max-w-[320px]"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {value.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-heading text-center text-foreground mb-4">
            Por Que Escolher a Andorinha?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            6 razões que nos diferenciam das outras agências
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {differentials.map((diff, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <diff.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-heading text-center text-foreground mb-12">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-border"
              >
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer Fazer Parte Dessa História?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Agende um diagnóstico gratuito e descubra como podemos ajudar seu
            negócio a crescer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-muted"
            >
              <Link href="/contato">Agendar Diagnóstico</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="/processo">Ver Nosso Processo</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
