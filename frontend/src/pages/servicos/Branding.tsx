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
import { Search, Lightbulb, Palette, FileCheck, Rocket } from "lucide-react";

const Branding = () => {
  const includedItems = [
    "Pesquisa de mercado e concorrência",
    "Definição de personas e posicionamento",
    "Criação de logotipo (3 conceitos)",
    "Paleta de cores completa",
    "Tipografia institucional",
    "Elementos gráficos de apoio",
    "Manual de identidade visual (PDF)",
    "Mockups de aplicações",
    "Arquivos editáveis (AI, PSD, PDF)",
    "3 rodadas de revisão",
    "30 dias de suporte pós-entrega",
  ];

  const processSteps = [
    {
      icon: Search,
      title: "Pesquisa",
      description:
        "Análise de mercado, concorrência e definição de personas para entender seu público",
      duration: "3-5 dias",
    },
    {
      icon: Lightbulb,
      title: "Conceito",
      description:
        "Desenvolvimento de 3 conceitos criativos baseados na pesquisa e briefing",
      duration: "5-7 dias",
    },
    {
      icon: Palette,
      title: "Criação",
      description:
        "Refinamento do conceito escolhido com paleta de cores e tipografia",
      duration: "5-7 dias",
    },
    {
      icon: FileCheck,
      title: "Aplicações",
      description:
        "Criação de mockups e aplicações em diversos materiais e formatos",
      duration: "3-5 dias",
    },
    {
      icon: Rocket,
      title: "Entrega",
      description:
        "Manual completo de marca, arquivos editáveis e capacitação da equipe",
      duration: "2-3 dias",
    },
  ];

  const pricingTiers = [
    {
      name: "Básico",
      price: "R$ 6.000",
      duration: "21 dias",
      description: "Ideal para startups e pequenos negócios",
      badge: "Entrada",
      features: [
        "Logotipo (3 conceitos)",
        "Paleta de cores",
        "Tipografia institucional",
        "Manual básico de marca",
        "Arquivos editáveis",
        "3 rodadas de revisão",
        "30 dias de suporte",
      ],
    },
    {
      name: "Completo",
      price: "R$ 9.500",
      duration: "30 dias",
      description: "Para empresas em crescimento",
      badge: "Mais Popular",
      highlighted: true,
      features: [
        "Tudo do pacote Básico",
        "Elementos gráficos de apoio",
        "Papelaria completa",
        "Aplicações digitais",
        "Mockups profissionais",
        "Manual completo de marca",
        "30 dias de suporte",
      ],
    },
    {
      name: "Premium",
      price: "R$ 12.000",
      duration: "30-40 dias",
      description: "Transformação completa de marca",
      badge: "Premium",
      features: [
        "Tudo do pacote Completo",
        "Pesquisa aprofundada",
        "Naming (se necessário)",
        "Estratégia de marca",
        "Brand book extenso",
        "Materiais de marketing",
        "60 dias de suporte",
      ],
    },
  ];

  const faqItems = [
    {
      question: "Quanto tempo leva para criar uma identidade visual?",
      answer:
        "O prazo varia de 21 a 40 dias dependendo do pacote escolhido. O pacote Básico leva em média 21 dias, o Completo 30 dias, e o Premium de 30 a 40 dias. Esses prazos consideram todas as etapas do processo, incluindo pesquisa, criação e revisões.",
    },
    {
      question: "Quantas opções de logo vou receber?",
      answer:
        "Você receberá 3 conceitos diferentes de logotipo para escolher. Após a escolha, refinamos o conceito selecionado com 3 rodadas de revisão incluídas em todos os pacotes.",
    },
    {
      question: "Recebo os arquivos editáveis?",
      answer:
        "Sim! Todos os pacotes incluem arquivos editáveis em formato AI (Adobe Illustrator), PSD (Photoshop) e PDF vetorial. Você terá total propriedade e autonomia sobre sua marca.",
    },
    {
      question: "O que é o manual de identidade visual?",
      answer:
        "É um documento que orienta como usar corretamente sua marca. Inclui regras de aplicação do logo, códigos de cores, tipografia, espaçamentos mínimos, e exemplos de uso correto e incorreto. Essencial para manter a consistência da sua marca.",
    },
    {
      question: "Posso parcelar o investimento?",
      answer:
        "Sim! Oferecemos parcelamento em até 3x sem juros no cartão. Para projetos acima de R$ 10.000, podemos dividir em 40% de entrada, 40% no meio do projeto e 20% na entrega.",
    },
    {
      question: "E se eu não gostar de nenhum conceito?",
      answer:
        "Se nenhum dos 3 conceitos iniciais atender suas expectativas, podemos criar mais uma rodada de conceitos. Porém, isso é raro quando o briefing está bem alinhado. Por isso, investimos bastante tempo na etapa de pesquisa e onboarding.",
    },
    {
      question: "Vocês fazem naming (criação de nome)?",
      answer:
        "Sim, o naming está incluído no pacote Premium. Para os outros pacotes, pode ser contratado separadamente por R$ 2.500. Inclui pesquisa de disponibilidade no INPI e em domínios.",
    },
    {
      question: "Como funciona o suporte pós-entrega?",
      answer:
        "Após a entrega final, você tem 30 dias (ou 60 no Premium) de suporte para tirar dúvidas, solicitar pequenos ajustes e receber orientações sobre como usar a marca. Respondemos em até 24 horas úteis.",
    },
  ];

  return (
    <>
      <SEO
        title="Branding e Identidade Visual | Preços a partir de R$ 6.000"
        description="Criação de identidade visual completa: logo, paleta de cores, tipografia e manual de marca. Projetos de 21 a 40 dias com 3 rodadas de revisão incluídas."
        keywords="branding, identidade visual, criação de logo, preço identidade visual, quanto custa branding, manual de marca"
        url="https://andorinhamarketing.com.br/servicos/branding"
        image="https://andorinhamarketing.com.br/og/og-branding.png"
      />
      <SchemaService
        name="Branding e Identidade Visual"
        description="Criação de identidade visual completa: logo, paleta de cores, tipografia e manual de marca. Projetos de 21 a 40 dias com 3 rodadas de revisão incluídas."
        price="6000"
        url="https://andorinhamarketing.com.br/servicos/branding"
      />
      <SchemaFAQPage faqs={faqItems} />

      <Header />

      <main>
        <ServiceHero
          title="Branding & Identidade Visual"
          subtitle="Construa uma marca memorável"
          description="Criamos identidades visuais que comunicam a essência do seu negócio e conectam emocionalmente com seu público. Logo, cores, tipografia e manual completo de marca."
          price="A partir de R$ 6.000"
          duration="21-40 dias"
          breadcrumb="Branding"
        />

        <ServiceIncluded items={includedItems} />

        <ServiceProcess
          title="Processo de Criação"
          subtitle="5 etapas para uma marca memorável"
          steps={processSteps}
        />

        <ServicePricing tiers={pricingTiers} />

        <ServiceFAQ items={faqItems} />

        <ServiceCTA
          title="Pronto para Criar sua Marca?"
          subtitle="Agende um diagnóstico gratuito e descubra como podemos transformar sua identidade visual"
        />
      </main>

      <Footer />
    </>
  );
};

export default Branding;
