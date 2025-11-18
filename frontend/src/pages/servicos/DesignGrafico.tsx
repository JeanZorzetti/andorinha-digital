import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceFAQ from "@/components/servicos/ServiceFAQ";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { MessageSquare, Pencil, Palette, FileCheck, Send } from "lucide-react";

const DesignGrafico = () => {
  const includedItems = [
    "Briefing detalhado do projeto",
    "Pesquisa de referências visuais",
    "Desenvolvimento de conceitos",
    "Design em alta resolução",
    "Adaptações para diferentes formatos",
    "Arquivos editáveis (AI, PSD, PDF)",
    "Versões para web e impressão",
    "2 rodadas de revisão",
    "Suporte para impressão",
    "Entrega em até 5 dias úteis",
  ];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Briefing",
      description:
        "Entendemos suas necessidades, objetivos e público-alvo do material",
      duration: "1 dia",
    },
    {
      icon: Pencil,
      title: "Conceito",
      description:
        "Desenvolvemos conceitos visuais alinhados com sua marca",
      duration: "1-2 dias",
    },
    {
      icon: Palette,
      title: "Criação",
      description:
        "Produzimos o design com atenção aos detalhes e qualidade",
      duration: "2-3 dias",
    },
    {
      icon: FileCheck,
      title: "Revisão",
      description:
        "Ajustamos conforme seu feedback até a aprovação final",
      duration: "1-2 dias",
    },
    {
      icon: Send,
      title: "Entrega",
      description:
        "Arquivos finalizados em todos os formatos necessários",
      duration: "1 dia",
    },
  ];

  const pricingTiers = [
    {
      name: "Avulso",
      price: "R$ 350",
      duration: "3-5 dias",
      description: "Peças individuais",
      badge: "Por Peça",
      features: [
        "1 peça de design",
        "Formato único",
        "2 rodadas de revisão",
        "Arquivo editável",
        "Versão web + impressão",
        "Entrega em 3-5 dias",
        "Suporte básico",
      ],
    },
    {
      name: "Pacote",
      price: "R$ 1.200",
      duration: "7 dias",
      description: "5 peças com desconto",
      badge: "Mais Popular",
      highlighted: true,
      features: [
        "5 peças de design",
        "Múltiplos formatos",
        "2 rodadas por peça",
        "Arquivos editáveis",
        "Versões web + impressão",
        "Entrega em 7 dias",
        "Prioridade no atendimento",
      ],
    },
    {
      name: "Mensal",
      price: "R$ 2.500",
      duration: "30 dias",
      description: "Demanda recorrente",
      badge: "Recorrente",
      features: [
        "10 peças por mês",
        "Todos os formatos",
        "Revisões ilimitadas",
        "Arquivos editáveis",
        "Banco de imagens",
        "Entregas semanais",
        "Suporte prioritário",
      ],
    },
  ];

  const faqItems = [
    {
      question: "Que tipos de peças vocês criam?",
      answer:
        "Criamos posts para redes sociais (feed, stories, carrossel), banners, folders, cartões de visita, flyers, apresentações, catálogos, cardápios, convites, certificados, e-mail marketing, e diversos outros materiais gráficos.",
    },
    {
      question: "Qual o prazo de entrega?",
      answer:
        "Peças avulsas são entregues em 3-5 dias úteis. Pacotes em até 7 dias úteis. Para urgências (24-48h), aplicamos uma taxa adicional de 50%. No plano mensal, as entregas são semanais.",
    },
    {
      question: "Posso pedir alterações?",
      answer:
        "Sim! Todos os pacotes incluem rodadas de revisão. No Avulso e Pacote são 2 rodadas por peça. No plano Mensal, as revisões são ilimitadas. Alterações além das rodadas incluídas são cobradas à parte.",
    },
    {
      question: "Vocês seguem minha identidade visual?",
      answer:
        "Absolutamente! Todas as peças são criadas seguindo seu manual de marca, cores, tipografia e tom de voz. Se você não tiver um manual, podemos criar um padrão visual para manter consistência.",
    },
    {
      question: "Recebo os arquivos editáveis?",
      answer:
        "Sim, você recebe os arquivos editáveis em AI (Illustrator) ou PSD (Photoshop), além de PDF, PNG e JPG em alta resolução para web e impressão.",
    },
    {
      question: "Como funciona o plano mensal?",
      answer:
        "Você tem direito a 10 peças por mês com entregas semanais. As peças não utilizadas não acumulam. Ideal para quem tem demanda constante de materiais para redes sociais e campanhas.",
    },
    {
      question: "Vocês fazem impressão?",
      answer:
        "Não fazemos a impressão, mas entregamos os arquivos preparados (CMYK, sangria, marcas de corte) e podemos indicar gráficas parceiras de confiança com bons preços.",
    },
    {
      question: "Como funciona a contratação avulsa?",
      answer:
        "Você envia o briefing, aprovamos o orçamento, você faz o pagamento (50% entrada, 50% na entrega) e iniciamos a produção. Simples e direto para demandas pontuais.",
    },
  ];

  return (
    <>
      <SEO
        title="Design Gráfico | Criação de Peças | A partir de R$ 350"
        description="Criação de materiais gráficos: posts para redes sociais, banners, folders, cartões de visita e mais. Entrega em até 5 dias úteis com arquivos editáveis."
        keywords="design gráfico, criação de posts, design para redes sociais, material gráfico, banner, folder, cartão de visita"
        url="https://andorinhamarketing.com.br/servicos/design-grafico"
      />

      <Header />

      <main>
        <ServiceHero
          title="Design Gráfico"
          subtitle="Materiais visuais de impacto"
          description="Criamos peças gráficas que comunicam sua mensagem com clareza e estética. Posts, banners, folders, apresentações e muito mais."
          price="A partir de R$ 350"
          duration="3-7 dias"
          breadcrumb="Design Gráfico"
        />

        <ServiceIncluded items={includedItems} />

        <ServiceProcess
          title="Como Funciona"
          subtitle="Do briefing à entrega"
          steps={processSteps}
        />

        <ServicePricing tiers={pricingTiers} />

        <ServiceFAQ items={faqItems} />

        <ServiceCTA
          title="Precisa de Materiais Gráficos?"
          subtitle="Solicite um orçamento e receba em até 24 horas"
        />
      </main>

      <Footer />
    </>
  );
};

export default DesignGrafico;
