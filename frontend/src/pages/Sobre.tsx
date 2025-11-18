import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Target,
  Heart,
  Zap,
  Users,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sobre = () => {
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
    <>
      <SEO
        title="Sobre Nós | Quem Somos"
        description="Conheça a Andorinha Marketing: agência especializada em PMEs com 15 anos de experiência. Transparência, estratégia e resultados reais."
        keywords="sobre andorinha marketing, quem somos, agência de marketing, história, valores, equipe"
        url="https://andorinhamarketing.com.br/sobre"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Voe Certo. Voe Alto.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Nossa História
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
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
        <section className="py-16 bg-[#FF6B35]">
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
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
                <p className="text-gray-600">
                  Tornar marketing estratégico de qualidade acessível para pequenas
                  e médias empresas, ajudando-as a crescer de forma sustentável e
                  inteligente.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
                <p className="text-gray-600">
                  Ser referência em projetos de marketing para PMEs, reconhecida
                  pela qualidade, transparência e resultados reais que entregamos.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Por Que Escolher a Andorinha?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              6 razões que nos diferenciam das outras agências
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {differentials.map((diff, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <diff.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-gray-600">{diff.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#FF6B35]">
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
                <Link to="/processo">Ver Nosso Processo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sobre;
