import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface Case {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  challenge: string;
  result: string;
  metric: string;
}

const Cases = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "Todos",
    "Branding",
    "Sites",
    "Vídeo",
    "Rebranding",
    "Design",
  ];

  const cases: Case[] = [
    {
      id: "techstart-branding",
      title: "Nova Identidade para Startup de Tech",
      client: "TechStart",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      challenge: "Startup precisava de identidade visual que transmitisse inovação e confiança para captar investidores.",
      result: "Identidade completa em 25 dias com manual de marca extenso.",
      metric: "+40% em conversão de pitch",
    },
    {
      id: "consultoria-site",
      title: "Site Institucional de Alta Conversão",
      client: "Almeida Consultoria",
      category: "Sites",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      challenge: "Consultoria tradicional precisava modernizar presença digital e captar leads qualificados.",
      result: "Site responsivo com blog integrado e automação de marketing.",
      metric: "+180% leads qualificados",
    },
    {
      id: "restaurante-video",
      title: "Vídeo Institucional Premium",
      client: "Bistrô Jardim",
      category: "Vídeo",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      challenge: "Restaurante queria mostrar experiência gastronômica e atrair público de alto padrão.",
      result: "Vídeo de 2 minutos com filmagem em 4K e drone.",
      metric: "+65% reservas online",
    },
    {
      id: "industria-rebranding",
      title: "Reposicionamento de Marca Industrial",
      client: "MetalPro Indústria",
      category: "Rebranding",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      challenge: "Indústria de 30 anos precisava modernizar marca sem perder reconhecimento.",
      result: "Evolução da identidade mantendo elementos históricos.",
      metric: "+25% novos contratos B2B",
    },
    {
      id: "ecommerce-design",
      title: "Materiais de Campanha Sazonal",
      client: "ModaFit Store",
      category: "Design",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      challenge: "E-commerce precisava de materiais para Black Friday com urgência.",
      result: "30 peças para redes sociais e banners em 5 dias.",
      metric: "+120% vendas no período",
    },
    {
      id: "clinica-branding",
      title: "Identidade Visual para Clínica",
      client: "Clínica Vida Plena",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      challenge: "Clínica médica precisava transmitir acolhimento e profissionalismo.",
      result: "Branding completo com aplicação em sinalização e uniformes.",
      metric: "+50% agendamentos",
    },
  ];

  const filteredCases =
    activeFilter === "Todos"
      ? cases
      : cases.filter((c) => c.category === activeFilter);

  // Simula carregamento inicial de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms de loading simulado

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title="Cases de Sucesso | Projetos que Transformam"
        description="Conheça nossos cases de sucesso em branding, sites, vídeos e design. Resultados reais de clientes reais com métricas comprovadas."
        keywords="cases de sucesso, portfolio, projetos de marketing, resultados, branding cases, cases sites"
        url="https://andorinha.roilabs.com.br/cases"
        image="https://andorinha.roilabs.com.br/og/og-cases.png"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-background to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Projetos que Transformam Negócios
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Resultados reais de clientes reais. Cada projeto é uma história
                de transformação com métricas que comprovam o impacto.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {caseItem.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{caseItem.client}</p>
                    <h3 className="font-bold text-foreground mb-3 line-clamp-2">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {caseItem.challenge}
                    </p>

                    {/* Metric */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {caseItem.metric}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/cases/${caseItem.id}`}
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                    >
                      Ver Case Completo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
              </div>
            )}

            {!isLoading && filteredCases.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum case encontrado para esta categoria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
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
                className="bg-white text-primary hover:bg-muted"
              >
                <Link to="/contato">Agendar Diagnóstico</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/precos">Ver Investimentos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Cases;
