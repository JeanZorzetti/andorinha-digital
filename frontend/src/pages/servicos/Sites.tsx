import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceFAQ from "@/components/servicos/ServiceFAQ";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { FileSearch, Layout, Code, TestTube, Rocket } from "lucide-react";

const Sites = () => {
  const includedItems = [
    "Planejamento de arquitetura de informação",
    "Design responsivo (mobile, tablet, desktop)",
    "Até X páginas (conforme pacote)",
    "Sistema de gestão de conteúdo (CMS)",
    "SEO básico (meta tags, sitemap, robots.txt)",
    "Integração com Google Analytics",
    "Formulários de contato",
    "Hospedagem por 1 ano (opcional)",
    "Certificado SSL incluído",
    "Treinamento de uso do CMS",
    "3 rodadas de revisão",
    "30 dias de suporte pós-entrega",
  ];

  const processSteps = [
    {
      icon: FileSearch,
      title: "Planejamento",
      description:
        "Definição de arquitetura, wireframes e fluxo de navegação do site",
      duration: "3-5 dias",
    },
    {
      icon: Layout,
      title: "Design",
      description:
        "Criação do layout visual seguindo sua identidade de marca",
      duration: "5-7 dias",
    },
    {
      icon: Code,
      title: "Desenvolvimento",
      description:
        "Programação responsiva com código limpo e otimizado",
      duration: "7-14 dias",
    },
    {
      icon: TestTube,
      title: "Testes",
      description:
        "Testes em diversos dispositivos e navegadores",
      duration: "2-3 dias",
    },
    {
      icon: Rocket,
      title: "Lançamento",
      description:
        "Publicação, configuração de DNS e treinamento da equipe",
      duration: "1-2 dias",
    },
  ];

  const pricingTiers = [
    {
      name: "Landing Page Express",
      price: "R$ 3.500",
      duration: "15 dias",
      description: "Uma página de alta conversão",
      badge: "Entrada",
      features: [
        "1 página estratégica",
        "Design responsivo",
        "Formulário de contato",
        "SEO básico",
        "Integração WhatsApp",
        "3 rodadas de revisão",
        "30 dias de suporte",
      ],
    },
    {
      name: "Site Institucional",
      price: "R$ 8.000",
      duration: "21 dias",
      description: "Presença completa online",
      badge: "Mais Popular",
      highlighted: true,
      features: [
        "Até 5 páginas",
        "Blog integrado",
        "CMS para edição",
        "SEO completo",
        "Google Analytics",
        "SSL incluído",
        "30 dias de suporte",
      ],
    },
    {
      name: "Site Premium",
      price: "R$ 18.000",
      duration: "45 dias",
      description: "Solução completa e personalizada",
      badge: "Premium",
      features: [
        "Páginas ilimitadas",
        "Integrações avançadas",
        "Animações personalizadas",
        "SEO avançado",
        "Estratégia de conteúdo",
        "Hospedagem 1 ano",
        "60 dias de suporte",
      ],
    },
  ];

  const faqItems = [
    {
      question: "Quanto tempo leva para criar um site?",
      answer:
        "Uma landing page leva em média 15 dias. Sites institucionais básicos levam 21 dias, e sites mais complexos podem levar até 45 dias. Os prazos consideram todas as etapas, do planejamento à publicação.",
    },
    {
      question: "O site será responsivo?",
      answer:
        "Sim! Todos os nossos sites são 100% responsivos, funcionando perfeitamente em celulares, tablets e desktops. Testamos em diversos dispositivos antes da entrega.",
    },
    {
      question: "Vou conseguir editar o site sozinho?",
      answer:
        "Sim! Usamos sistemas de gestão de conteúdo (CMS) intuitivos. Após a entrega, fazemos um treinamento para você aprender a atualizar textos, imagens e criar novas páginas.",
    },
    {
      question: "O que é SEO e está incluído?",
      answer:
        "SEO é a otimização para aparecer no Google. Incluímos SEO básico (meta tags, sitemap, velocidade) em todos os pacotes. O pacote Premium inclui estratégia de palavras-chave e conteúdo otimizado.",
    },
    {
      question: "Preciso contratar hospedagem separada?",
      answer:
        "Para landing pages e sites básicos, você precisará de hospedagem (indicamos parceiros). O pacote Premium inclui 1 ano de hospedagem. Valores de renovação a partir de R$ 300/ano.",
    },
    {
      question: "Vocês fazem e-commerce/loja virtual?",
      answer:
        "Sim, desenvolvemos lojas virtuais sob consulta. O investimento começa em R$ 15.000 dependendo do número de produtos e integrações necessárias. Entre em contato para um orçamento personalizado.",
    },
  ];

  return (
    <>
      <SEO
        title="Criação de Sites | A partir de R$ 3.500 | Andorinha Marketing"
        description="Sites institucionais e landing pages que convertem. Design responsivo, SEO otimizado e CMS para você gerenciar. Entrega em 15 a 45 dias."
        keywords="criação de sites, quanto custa criar site, site institucional, landing page, desenvolvimento web, site responsivo"
        url="https://andorinhamarketing.com.br/servicos/sites"
      />

      <Header />

      <main>
        <ServiceHero
          title="Sites & Landing Pages"
          subtitle="Sua presença digital profissional"
          description="Criamos sites e landing pages que convertem visitantes em clientes. Design moderno, responsivo e otimizado para SEO."
          price="A partir de R$ 3.500"
          duration="15-45 dias"
          breadcrumb="Sites"
        />

        <ServiceIncluded items={includedItems} />

        <ServiceProcess
          title="Processo de Desenvolvimento"
          subtitle="Do planejamento ao lançamento"
          steps={processSteps}
        />

        <ServicePricing tiers={pricingTiers} />

        <ServiceFAQ items={faqItems} />

        <ServiceCTA
          title="Pronto para Ter seu Site?"
          subtitle="Agende um diagnóstico gratuito e descubra a melhor solução para seu negócio"
        />
      </main>

      <Footer />
    </>
  );
};

export default Sites;
