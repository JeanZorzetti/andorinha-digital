import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceFAQ from "@/components/servicos/ServiceFAQ";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { FileText, Video as VideoIcon, Film, Sparkles, Send } from "lucide-react";

const Video = () => {
  const includedItems = [
    "Reunião de briefing e alinhamento",
    "Desenvolvimento de roteiro criativo",
    "Pré-produção (locações, casting, cronograma)",
    "Filmagem profissional (1-2 dias)",
    "Edição profissional",
    "Trilha sonora licenciada",
    "Legendas (se necessário)",
    "Motion graphics e animações (conforme pacote)",
    "Correção de cor",
    "2 rodadas de revisão na edição",
    "Entrega em múltiplos formatos (web, redes sociais)",
    "30 dias de suporte pós-entrega",
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Roteiro",
      description:
        "Desenvolvimento do roteiro criativo alinhado aos objetivos",
      duration: "5-7 dias",
    },
    {
      icon: VideoIcon,
      title: "Pré-produção",
      description:
        "Planejamento de locações, casting e cronograma de filmagem",
      duration: "3-5 dias",
    },
    {
      icon: Film,
      title: "Filmagem",
      description:
        "Captação profissional com equipamento de alta qualidade",
      duration: "1-2 dias",
    },
    {
      icon: Sparkles,
      title: "Pós-produção",
      description:
        "Edição, cor, trilha sonora e motion graphics",
      duration: "10-14 dias",
    },
    {
      icon: Send,
      title: "Entrega",
      description:
        "Arquivos finais em múltiplos formatos e resoluções",
      duration: "2-3 dias",
    },
  ];

  const pricingTiers = [
    {
      name: "Básico",
      price: "R$ 8.000",
      duration: "30 dias",
      description: "Vídeo institucional simples",
      badge: "Entrada",
      features: [
        "Vídeo de até 2 minutos",
        "1 dia de filmagem",
        "Roteiro básico",
        "Edição simples",
        "Trilha licenciada",
        "2 revisões",
        "30 dias de suporte",
      ],
    },
    {
      name: "Profissional",
      price: "R$ 12.000",
      duration: "35 dias",
      description: "Produção completa",
      badge: "Mais Popular",
      highlighted: true,
      features: [
        "Vídeo de até 3 minutos",
        "1-2 dias de filmagem",
        "Roteiro criativo",
        "Motion graphics",
        "Correção de cor",
        "Legendas incluídas",
        "30 dias de suporte",
      ],
    },
    {
      name: "Premium",
      price: "R$ 18.000",
      duration: "45 dias",
      description: "Produção cinematográfica",
      badge: "Premium",
      features: [
        "Vídeo de até 5 minutos",
        "2 dias de filmagem",
        "Roteiro + storyboard",
        "Animações avançadas",
        "Versões para redes",
        "Making of incluído",
        "60 dias de suporte",
      ],
    },
  ];

  const faqItems = [
    {
      question: "Quanto tempo leva para produzir um vídeo institucional?",
      answer:
        "O prazo médio é de 30 a 45 dias, incluindo roteiro, pré-produção, filmagem e pós-produção. Vídeos mais complexos ou com animações avançadas podem levar até 60 dias.",
    },
    {
      question: "Vocês cuidam de tudo ou preciso providenciar algo?",
      answer:
        "Cuidamos de toda a produção: roteiro, equipamento, equipe, locação (se externa), trilha sonora e edição. Você só precisa disponibilizar acesso à empresa e participar das gravações, se necessário.",
    },
    {
      question: "Posso usar o vídeo em qualquer lugar?",
      answer:
        "Sim! Você recebe os direitos totais do vídeo. Entregamos em múltiplos formatos otimizados para site, YouTube, Instagram, LinkedIn e outras plataformas.",
    },
    {
      question: "A trilha sonora é licenciada?",
      answer:
        "Sim, usamos apenas trilhas com licença comercial, sem risco de problemas de direitos autorais. Você pode usar o vídeo em campanhas pagas sem preocupação.",
    },
    {
      question: "Quantas revisões estão incluídas?",
      answer:
        "Todos os pacotes incluem 2 rodadas de revisão na edição. Alterações adicionais são cobradas à parte. Por isso, investimos bastante tempo no alinhamento do roteiro antes da filmagem.",
    },
    {
      question: "Vocês fazem vídeos para redes sociais?",
      answer:
        "Sim! Além do vídeo principal, podemos criar versões curtas (15s, 30s, 60s) otimizadas para Instagram, TikTok e outras redes. Consulte valores adicionais.",
    },
  ];

  return (
    <>
      <SEO
        title="Vídeo Institucional Profissional | A partir de R$ 8.000"
        description="Vídeos institucionais que contam a história da sua empresa. Roteiro, filmagem profissional, edição e trilha sonora licenciada. Entrega em 30-45 dias."
        keywords="vídeo institucional, quanto custa vídeo institucional, produtora de vídeo, vídeo corporativo, vídeo empresarial"
        url="https://andorinhamarketing.com.br/servicos/video"
      />

      <Header />

      <main>
        <ServiceHero
          title="Vídeo Institucional"
          subtitle="Conte sua história em movimento"
          description="Produzimos vídeos profissionais que apresentam sua empresa, produto ou serviço de forma impactante. Do roteiro à entrega final."
          price="A partir de R$ 8.000"
          duration="30-45 dias"
          breadcrumb="Vídeo"
        />

        <ServiceIncluded items={includedItems} />

        <ServiceProcess
          title="Processo de Produção"
          subtitle="Da ideia à tela"
          steps={processSteps}
        />

        <ServicePricing tiers={pricingTiers} />

        <ServiceFAQ items={faqItems} />

        <ServiceCTA
          title="Pronto para Contar sua História?"
          subtitle="Agende um diagnóstico gratuito e descubra como um vídeo pode transformar sua comunicação"
        />
      </main>

      <Footer />
    </>
  );
};

export default Video;
