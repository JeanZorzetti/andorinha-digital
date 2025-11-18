import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Todos",
    "Branding",
    "Sites",
    "SEO",
    "Estratégia",
    "Design",
  ];

  const posts: Post[] = [
    {
      id: "quanto-custa-site-2025",
      title: "Quanto Custa Criar um Site Profissional em 2025?",
      excerpt: "Guia completo com faixas de preço, fatores que influenciam o investimento e como escolher a melhor opção para seu negócio.",
      category: "Sites",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      date: "15 Jan 2025",
      readTime: "8 min",
      author: "Equipe Andorinha",
    },
    {
      id: "identidade-visual-vale-pena",
      title: "Identidade Visual: Vale a Pena Investir?",
      excerpt: "Descubra como uma identidade visual profissional pode transformar a percepção da sua marca e impactar diretamente nas vendas.",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      date: "10 Jan 2025",
      readTime: "6 min",
      author: "Equipe Andorinha",
    },
    {
      id: "orcamento-marketing-pmes",
      title: "Como Definir Orçamento de Marketing para PMEs",
      excerpt: "Aprenda a calcular quanto investir em marketing de acordo com seu faturamento e objetivos de crescimento.",
      category: "Estratégia",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      date: "5 Jan 2025",
      readTime: "7 min",
      author: "Equipe Andorinha",
    },
    {
      id: "seo-local-pmes",
      title: "SEO Local para PMEs: Guia Prático",
      excerpt: "Estratégias de SEO local para aparecer nas buscas da sua região e atrair clientes próximos ao seu negócio.",
      category: "SEO",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
      date: "28 Dez 2024",
      readTime: "10 min",
      author: "Equipe Andorinha",
    },
    {
      id: "landing-page-converte",
      title: "Landing Page que Converte: Guia Completo",
      excerpt: "Os elementos essenciais de uma landing page de alta conversão e como aplicá-los no seu negócio.",
      category: "Sites",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      date: "20 Dez 2024",
      readTime: "9 min",
      author: "Equipe Andorinha",
    },
    {
      id: "branding-vs-identidade",
      title: "Branding vs Identidade Visual: Qual a Diferença?",
      excerpt: "Entenda as diferenças entre branding e identidade visual e quando investir em cada um.",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=400&fit=crop",
      date: "15 Dez 2024",
      readTime: "5 min",
      author: "Equipe Andorinha",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeFilter === "Todos" || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Blog | Conteúdo de Marketing para PMEs"
        description="Artigos, dicas e estratégias de marketing para pequenas e médias empresas. Aprenda sobre branding, sites, SEO e muito mais."
        keywords="blog marketing, dicas marketing, estratégia marketing pme, branding, seo, sites"
        url="https://andorinhamarketing.com.br/blog"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Conteúdo que Agrega
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Dicas, estratégias e insights de marketing para PMEs que querem
                crescer de forma inteligente.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category
                      ? "bg-[#FF6B35] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-[#FF6B35] font-medium text-sm hover:gap-3 transition-all"
                    >
                      Ler Artigo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum artigo encontrado para sua busca.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Receba Conteúdo Exclusivo
              </h2>
              <p className="text-gray-600 mb-6">
                Cadastre-se para receber dicas de marketing, novos artigos e
                ofertas especiais diretamente no seu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1"
                />
                <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                  Cadastrar
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Sem spam. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#FF6B35]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Precisa de Ajuda com Marketing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Agende um diagnóstico gratuito e descubra como podemos ajudar seu
              negócio a crescer.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#FF6B35] hover:bg-gray-100"
            >
              <Link to="/contato">Agendar Diagnóstico</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
