import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Clock, CheckCircle } from "lucide-react";

const casesData = {
  "techstart-branding": {
    title: "Nova Identidade para Startup de Tech",
    client: "TechStart",
    category: "Branding",
    duration: "25 dias",
    investment: "R$ 9.500",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
    challenge: "A TechStart, startup de tecnologia em fase de captação, precisava de uma identidade visual que transmitisse inovação, confiança e profissionalismo para impressionar investidores e atrair os primeiros clientes enterprise.",
    solution: "Desenvolvemos uma identidade visual moderna e versátil, com logo que representa conexão e crescimento. A paleta de cores combina azul (confiança) com verde (inovação). Criamos aplicações para pitch deck, cartões, assinaturas de email e templates para redes sociais.",
    results: [
      "40% de aumento na taxa de conversão de pitches para investidores",
      "Captação de R$ 2.5M em rodada seed",
      "Fechamento de 3 contratos enterprise no primeiro trimestre",
      "Reconhecimento da marca em eventos de tecnologia",
    ],
    testimonial: {
      quote: "A identidade visual foi fundamental para nossa credibilidade. Os investidores comentaram sobre o profissionalismo da apresentação.",
      author: "Lucas Ferreira",
      role: "CEO, TechStart",
    },
    deliverables: [
      "Logotipo em versões horizontal, vertical e símbolo",
      "Paleta de cores completa (primárias e secundárias)",
      "Tipografia institucional",
      "Manual de identidade visual (48 páginas)",
      "Papelaria completa (cartão, papel timbrado, envelope)",
      "Template de pitch deck (30 slides)",
      "Assinaturas de email",
      "Templates para redes sociais",
    ],
  },
  "consultoria-site": {
    title: "Site Institucional de Alta Conversão",
    client: "Almeida Consultoria",
    category: "Sites",
    duration: "30 dias",
    investment: "R$ 12.000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    challenge: "Consultoria empresarial com 15 anos de mercado precisava modernizar sua presença digital. O site antigo não gerava leads e não refletia a qualidade dos serviços oferecidos.",
    solution: "Criamos um site institucional moderno com foco em conversão. Arquitetura de informação pensada para a jornada do cliente, com CTAs estratégicos e formulários otimizados. Integração com RD Station para automação de marketing.",
    results: [
      "180% de aumento em leads qualificados",
      "Redução de 40% no custo por lead",
      "Tempo médio no site de 3:45 min (era 45 seg)",
      "Taxa de conversão de 4.2% (média do setor: 2.1%)",
    ],
    testimonial: {
      quote: "O novo site transformou nossa captação de clientes. Antes dependíamos só de indicação, agora temos um fluxo constante de leads qualificados.",
      author: "Ricardo Almeida",
      role: "Diretor, Almeida Consultoria",
    },
    deliverables: [
      "Site responsivo com 8 páginas",
      "Blog integrado com CMS",
      "Formulários inteligentes",
      "Integração com RD Station",
      "Google Analytics 4 configurado",
      "SEO on-page completo",
      "Certificado SSL",
      "Treinamento de 2 horas",
    ],
  },
  "restaurante-video": {
    title: "Vídeo Institucional Premium",
    client: "Bistrô Jardim",
    category: "Vídeo",
    duration: "35 dias",
    investment: "R$ 15.000",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop",
    challenge: "Restaurante de alta gastronomia queria atrair público qualificado e aumentar reservas. Precisavam mostrar a experiência completa: ambiente, pratos, equipe e a história por trás do negócio.",
    solution: "Produzimos vídeo institucional de 2 minutos com filmagem em 4K, incluindo tomadas aéreas com drone. Roteiro focado em storytelling emocional, destacando a paixão do chef e os ingredientes selecionados.",
    results: [
      "65% de aumento em reservas online",
      "150K visualizações orgânicas no Instagram",
      "Matéria em revista gastronômica local",
      "Aumento de 30% no ticket médio",
    ],
    testimonial: {
      quote: "O vídeo capturou exatamente a essência do Bistrô. Clientes chegam já sabendo o que esperar e saem encantados.",
      author: "Chef Marina Costa",
      role: "Proprietária, Bistrô Jardim",
    },
    deliverables: [
      "Vídeo institucional (2 min)",
      "Versão curta para redes (30 seg)",
      "Versão stories (15 seg)",
      "Tomadas aéreas com drone",
      "Trilha sonora licenciada",
      "Legendas em português",
      "Arquivos em 4K e Full HD",
      "Fotos still da produção",
    ],
  },
  "industria-rebranding": {
    title: "Reposicionamento de Marca Industrial",
    client: "MetalPro Indústria",
    category: "Rebranding",
    duration: "50 dias",
    investment: "R$ 28.000",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
    challenge: "Indústria metalúrgica com 30 anos de mercado precisava modernizar sua marca para competir com novos players, sem perder o reconhecimento construído ao longo de décadas.",
    solution: "Realizamos evolução da marca mantendo elementos históricos reconhecíveis. Workshops com stakeholders para definir novo posicionamento. Nova identidade visual com sistema flexível para diferentes aplicações industriais.",
    results: [
      "25% de aumento em novos contratos B2B",
      "Participação em 3 feiras internacionais",
      "Atração de talentos qualificados (RH)",
      "Valorização percebida pelos clientes atuais",
    ],
    testimonial: {
      quote: "Conseguiram modernizar nossa marca respeitando nossa história. Os clientes antigos reconhecem, os novos se impressionam.",
      author: "João Carlos Silva",
      role: "Diretor Industrial, MetalPro",
    },
    deliverables: [
      "Auditoria de marca completa",
      "Pesquisa com stakeholders",
      "Nova identidade visual",
      "Manual de marca (72 páginas)",
      "Redesign de papelaria",
      "Sinalização industrial",
      "Uniformes e EPIs",
      "Plano de transição",
    ],
  },
  "ecommerce-design": {
    title: "Materiais de Campanha Sazonal",
    client: "ModaFit Store",
    category: "Design",
    duration: "5 dias",
    investment: "R$ 1.800",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    challenge: "E-commerce de moda fitness precisava de materiais para campanha de Black Friday com prazo apertado. Necessidade de manter consistência visual em múltiplos canais.",
    solution: "Criamos pacote completo de 30 peças para a campanha: posts para Instagram e Facebook, stories, banners para site e email marketing. Tudo seguindo a identidade visual da marca com elementos temáticos.",
    results: [
      "120% de aumento em vendas no período",
      "Melhor Black Friday da história da loja",
      "38% de taxa de abertura nos emails",
      "Engajamento 3x maior nas redes",
    ],
    testimonial: {
      quote: "Entregaram tudo no prazo com qualidade impecável. A campanha foi um sucesso absoluto!",
      author: "Camila Santos",
      role: "Fundadora, ModaFit Store",
    },
    deliverables: [
      "15 posts para feed (Instagram/Facebook)",
      "10 stories animados",
      "3 banners para site (hero, popup, footer)",
      "2 templates de email marketing",
      "Arquivos editáveis",
      "Versões para diferentes formatos",
    ],
  },
  "clinica-branding": {
    title: "Identidade Visual para Clínica",
    client: "Clínica Vida Plena",
    category: "Branding",
    duration: "28 dias",
    investment: "R$ 8.500",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop",
    challenge: "Nova clínica médica multidisciplinar precisava de identidade que transmitisse acolhimento, profissionalismo e cuidado humanizado para se diferenciar no mercado competitivo.",
    solution: "Desenvolvemos identidade com cores suaves que transmitem calma e confiança. Logo simboliza cuidado e proteção. Aplicamos em toda comunicação: sinalização, uniformes, materiais impressos e digitais.",
    results: [
      "50% de aumento em agendamentos",
      "NPS de 92 pontos",
      "Reconhecimento imediato da marca na região",
      "Elogios espontâneos de pacientes sobre o ambiente",
    ],
    testimonial: {
      quote: "A identidade visual reflete exatamente o que queremos transmitir: cuidado e profissionalismo. Os pacientes se sentem acolhidos desde a primeira impressão.",
      author: "Dra. Ana Paula Mendes",
      role: "Diretora Médica, Clínica Vida Plena",
    },
    deliverables: [
      "Logotipo e variações",
      "Paleta de cores (com significados)",
      "Tipografia institucional",
      "Manual de identidade visual",
      "Papelaria médica (receituário, cartões)",
      "Sinalização interna",
      "Uniformes da equipe",
      "Templates para redes sociais",
    ],
  },
};

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseData = id ? casesData[id as keyof typeof casesData] : null;

  if (!caseData) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Case não encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              O case que você procura não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/cases">Ver Todos os Cases</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${caseData.title} | Case de Sucesso`}
        description={caseData.challenge}
        keywords={`case ${caseData.category.toLowerCase()}, ${caseData.client}, projeto de marketing`}
        url={`https://andorinha.roilabs.com.br/cases/${id}`}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <Link
              to="/cases"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Cases
            </Link>

            <div className="max-w-4xl">
              <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-sm font-medium">
                {caseData.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                {caseData.title}
              </h1>
              <p className="text-xl text-gray-600">{caseData.client}</p>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <img
              src={caseData.image}
              alt={caseData.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>
        </section>

        {/* Overview */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Cliente</p>
                <p className="font-semibold text-gray-900">{caseData.client}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Duração</p>
                <p className="font-semibold text-gray-900">{caseData.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Investimento</p>
                <p className="font-semibold text-gray-900">{caseData.investment}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  O Desafio
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {caseData.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Nossa Solução
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {caseData.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Resultados
              </h2>
              <ul className="space-y-3">
                {caseData.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl bg-gray-50 p-8 rounded-2xl">
              <p className="text-xl text-gray-700 italic mb-6">
                "{caseData.testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {caseData.testimonial.author}
                </p>
                <p className="text-sm text-gray-500">
                  {caseData.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                O Que Entregamos
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {caseData.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#FF6B35]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quer Resultados Como Esses?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Agende um diagnóstico gratuito e descubra como podemos transformar
              seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#FF6B35] hover:bg-gray-100"
              >
                <Link to="/contato">Agendar Diagnóstico</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/cases">Ver Mais Cases</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CaseDetail;
