import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SchemaService, SchemaFAQPage } from "@/components/SchemaOrg";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceFAQ from "@/components/servicos/ServiceFAQ";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { Search, Users, Lightbulb, Palette, RefreshCw } from "lucide-react";

const Rebranding = () => {
  const includedItems = [
    "Auditoria de marca atual (análise SWOT)",
    "Pesquisa de mercado aprofundada",
    "Análise de concorrência",
    "Workshops estratégicos com stakeholders",
    "Reposicionamento de marca",
    "Nova identidade visual completa",
    "Arquitetura de marca (se necessário)",
    "Manual de marca extenso",
    "Plano de transição",
    "Redesign de materiais existentes",
    "Aplicações em todos os touchpoints",
    "4 rodadas de revisão",
    "60 dias de suporte pós-entrega",
  ];

  const processSteps = [
    {
      icon: Search,
      title: "Auditoria",
      description:
        "Análise profunda da marca atual, mercado e concorrência",
      duration: "7-10 dias",
    },
    {
      icon: Users,
      title: "Workshops",
      description:
        "Sessões estratégicas com stakeholders para definir direção",
      duration: "3-5 dias",
    },
    {
      icon: Lightbulb,
      title: "Estratégia",
      description:
        "Definição de posicionamento, proposta de valor e personalidade",
      duration: "5-7 dias",
    },
    {
      icon: Palette,
      title: "Criação",
      description:
        "Desenvolvimento da nova identidade visual completa",
      duration: "14-21 dias",
    },
    {
      icon: RefreshCw,
      title: "Transição",
      description:
        "Plano de implementação e redesign de materiais",
      duration: "7-14 dias",
    },
  ];

  const pricingTiers = [
    {
      name: "Básico",
      price: "R$ 15.000",
      duration: "45 dias",
      description: "Renovação visual da marca",
      badge: "Entrada",
      features: [
        "Auditoria básica",
        "Nova identidade visual",
        "Manual de marca",
        "Redesign de papelaria",
        "Arquivos editáveis",
        "4 rodadas de revisão",
        "30 dias de suporte",
      ],
    },
    {
      name: "Completo",
      price: "R$ 22.000",
      duration: "50 dias",
      description: "Reposicionamento estratégico",
      badge: "Mais Popular",
      highlighted: true,
      features: [
        "Pesquisa de mercado",
        "Workshops estratégicos",
        "Nova identidade completa",
        "Todas as aplicações",
        "Plano de transição",
        "Materiais digitais",
        "60 dias de suporte",
      ],
    },
    {
      name: "Premium",
      price: "R$ 35.000",
      duration: "60 dias",
      description: "Transformação total",
      badge: "Premium",
      features: [
        "Tudo do Completo",
        "Pesquisa aprofundada",
        "Arquitetura de marca",
        "Site institucional",
        "Materiais de marketing",
        "Treinamento da equipe",
        "90 dias de suporte",
      ],
    },
  ];

  const faqItems = [
    {
      question: "Qual a diferença entre branding e rebranding?",
      answer:
        "Branding é criar uma marca do zero. Rebranding é reformular uma marca existente - pode ser uma evolução sutil ou uma transformação completa. Envolve análise do que funciona, o que precisa mudar e como fazer a transição.",
    },
    {
      question: "Como sei se preciso de rebranding?",
      answer:
        "Sinais comuns: sua marca parece desatualizada, você mudou de público-alvo ou posicionamento, houve fusão/aquisição, a marca não reflete mais seus valores, ou você está perdendo relevância para concorrentes.",
    },
    {
      question: "Quanto tempo leva um processo de rebranding?",
      answer:
        "De 45 a 60 dias dependendo da complexidade. Inclui pesquisa, estratégia, criação e planejamento de transição. Projetos maiores com múltiplas submarcas podem levar mais tempo.",
    },
    {
      question: "Vocês ajudam na transição da marca?",
      answer:
        "Sim! Criamos um plano de transição detalhado: cronograma de substituição de materiais, comunicação para clientes, orientações para redes sociais e pontos de contato prioritários.",
    },
    {
      question: "O que acontece com os materiais antigos?",
      answer:
        "Incluímos o redesign dos principais materiais no pacote. Materiais impressos em estoque podem ser usados em paralelo durante a transição. Orientamos sobre como fazer essa mudança de forma suave.",
    },
    {
      question: "Posso manter elementos da marca atual?",
      answer:
        "Sim! Nem todo rebranding precisa ser radical. Podemos evoluir elementos que funcionam bem e têm reconhecimento, enquanto atualizamos o que está defasado. A decisão vem da análise estratégica.",
    },
  ];

  return (
    <>
      <SEO
        title="Rebranding Completo | Transforme sua Marca | R$ 15.000"
        description="Reposicionamento e renovação completa da sua marca. Pesquisa, estratégia, nova identidade visual e plano de transição. Projetos de 45 a 60 dias."
        keywords="rebranding, quanto custa rebranding, reposicionamento de marca, renovação de marca, reformulação de identidade visual"
        url="https://andorinhamarketing.com.br/servicos/rebranding"
        image="https://andorinhamarketing.com.br/og/og-rebranding.png"
      />
      <SchemaService
        name="Rebranding Completo"
        description="Reposicionamento e renovação completa da sua marca. Pesquisa, estratégia, nova identidade visual e plano de transição. Projetos de 45 a 60 dias."
        price="15000"
        url="https://andorinhamarketing.com.br/servicos/rebranding"
      />
      <SchemaFAQPage faqs={faqItems} />

      <Header />

      <main>
        <ServiceHero
          title="Rebranding Completo"
          subtitle="Transforme e reposicione sua marca"
          description="Renovamos sua identidade visual e posicionamento estratégico. Pesquisa, estratégia, nova identidade e plano de transição completo."
          price="A partir de R$ 15.000"
          duration="45-60 dias"
          breadcrumb="Rebranding"
        />

        <ServiceIncluded items={includedItems} />

        <ServiceProcess
          title="Processo de Rebranding"
          subtitle="Da análise à nova marca"
          steps={processSteps}
        />

        <ServicePricing tiers={pricingTiers} />

        <ServiceFAQ items={faqItems} />

        <ServiceCTA
          title="Pronto para Transformar sua Marca?"
          subtitle="Agende um diagnóstico gratuito e descubra se é hora de renovar sua identidade"
        />
      </main>

      <Footer />
    </>
  );
};

export default Rebranding;
