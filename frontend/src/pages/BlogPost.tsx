import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

const postsData = {
  "quanto-custa-site-2025": {
    title: "Quanto Custa Criar um Site Profissional em 2025?",
    excerpt: "Guia completo com faixas de preço, fatores que influenciam o investimento e como escolher a melhor opção para seu negócio.",
    category: "Sites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    date: "15 Jan 2025",
    readTime: "8 min",
    author: "Equipe Andorinha",
    content: `
## Por que investir em um site profissional?

Antes de falarmos sobre valores, é importante entender o valor de um site profissional. Em 2025, ter presença digital não é mais opcional - é essencial para qualquer negócio que queira crescer.

Um site profissional:
- Transmite credibilidade e confiança
- Funciona 24/7 captando leads
- Aparece nas buscas do Google
- Centraliza informações sobre seu negócio

## Faixas de Investimento

### Landing Page (R$ 2.500 - 5.000)
Ideal para: Captar leads para um produto/serviço específico.
Inclui: 1 página, formulário, responsivo, SEO básico.
Prazo: 7-15 dias.

### Site Institucional Básico (R$ 5.000 - 10.000)
Ideal para: Pequenas empresas que precisam de presença online.
Inclui: 3-5 páginas, formulário, responsivo, SEO básico.
Prazo: 15-25 dias.

### Site Institucional Completo (R$ 10.000 - 18.000)
Ideal para: Empresas em crescimento que querem gerar leads.
Inclui: 5-10 páginas, blog, CMS, Analytics, SEO completo.
Prazo: 25-45 dias.

### E-commerce (R$ 15.000 - 50.000+)
Ideal para: Quem quer vender produtos online.
Inclui: Catálogo, carrinho, pagamentos, gestão de estoque.
Prazo: 45-90 dias.

## Fatores que Influenciam o Preço

### 1. Número de Páginas
Mais páginas = mais conteúdo para criar e desenvolver.

### 2. Funcionalidades
Blog, área de membros, e-commerce, integrações...

### 3. Design Personalizado
Template vs design exclusivo.

### 4. Integrações
CRM, automação de marketing, pagamentos...

### 5. Prazo
Projetos urgentes custam mais.

## Como Escolher a Melhor Opção

1. **Defina seus objetivos**: Captar leads? Vender online? Informar?
2. **Conheça seu público**: O que eles esperam encontrar?
3. **Pense no longo prazo**: O site precisa escalar?
4. **Compare propostas**: Não escolha só pelo preço.

## Conclusão

O investimento em um site profissional varia muito conforme suas necessidades. O importante é escolher um parceiro que entenda seus objetivos e entregue qualidade.

Na Andorinha, oferecemos sites a partir de R$ 3.500 com foco em conversão e resultados reais.
    `,
  },
  "identidade-visual-vale-pena": {
    title: "Identidade Visual: Vale a Pena Investir?",
    excerpt: "Descubra como uma identidade visual profissional pode transformar a percepção da sua marca e impactar diretamente nas vendas.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop",
    date: "10 Jan 2025",
    readTime: "6 min",
    author: "Equipe Andorinha",
    content: `
## O que é Identidade Visual?

Identidade visual é o conjunto de elementos gráficos que representam sua marca: logo, cores, tipografia, padrões visuais. É como seu negócio se apresenta visualmente ao mundo.

## Por que Investir em Identidade Visual?

### 1. Primeira Impressão
Você tem 7 segundos para causar uma boa primeira impressão. Uma identidade visual profissional transmite confiança imediata.

### 2. Diferenciação
Em mercados competitivos, uma identidade única ajuda você a se destacar.

### 3. Consistência
Com um manual de marca, toda sua comunicação fica consistente e profissional.

### 4. Percepção de Valor
Marcas bem apresentadas podem cobrar mais. Simples assim.

## Quanto Custa?

- **Básico (R$ 2.000 - 5.000)**: Logo e paleta de cores
- **Intermediário (R$ 5.000 - 10.000)**: Identidade completa com manual básico
- **Completo (R$ 10.000 - 20.000)**: Branding estratégico com todas as aplicações

## Quando NÃO Vale a Pena

- Quando você não tem clareza sobre seu negócio
- Quando o orçamento compromete outras áreas críticas
- Quando você muda de direção com frequência

## Quando Vale MUITO a Pena

- Antes de lançar um negócio
- Quando sua marca atual está datada
- Quando você quer reposicionar no mercado
- Quando vai captar investimento

## Conclusão

Identidade visual é um investimento, não um custo. Quando bem feita, ela trabalha para você 24/7, transmitindo profissionalismo e construindo confiança.

O ROI de uma boa identidade visual é difícil de medir, mas fácil de sentir: mais credibilidade, mais confiança, mais vendas.
    `,
  },
  "orcamento-marketing-pmes": {
    title: "Como Definir Orçamento de Marketing para PMEs",
    excerpt: "Aprenda a calcular quanto investir em marketing de acordo com seu faturamento e objetivos de crescimento.",
    category: "Estratégia",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
    date: "5 Jan 2025",
    readTime: "7 min",
    author: "Equipe Andorinha",
    content: `
## A Regra Geral

A maioria dos especialistas recomenda investir entre 5% e 15% do faturamento bruto em marketing. Mas essa "regra" precisa de contexto.

## Fatores que Influenciam

### 1. Estágio do Negócio
- **Startup**: 15-25% (precisa construir awareness)
- **Crescimento**: 10-15% (escalar resultados)
- **Maturidade**: 5-10% (manter posição)

### 2. Indústria
B2C geralmente investe mais que B2B. Setores competitivos exigem mais investimento.

### 3. Objetivos
Crescer 50% ao ano exige mais investimento que crescer 10%.

## Como Calcular

### Método do Faturamento
Faturamento Anual x Percentual = Orçamento de Marketing

Exemplo: R$ 1.000.000 x 10% = R$ 100.000/ano

### Método do Objetivo
Custo por Aquisição x Meta de Clientes = Orçamento

Exemplo: R$ 500/cliente x 200 clientes = R$ 100.000/ano

## Como Distribuir o Orçamento

Uma distribuição comum para PMEs:
- **40% - Digital** (site, SEO, ads, social)
- **25% - Conteúdo** (blog, vídeo, materiais)
- **20% - Branding** (identidade, materiais)
- **15% - Reserva** (oportunidades, testes)

## Erros Comuns

1. **Não ter orçamento definido**: Gastar "quando sobra"
2. **Cortar na crise**: Marketing é investimento, não custo
3. **Não medir resultados**: Impossível otimizar sem dados
4. **Querer tudo de uma vez**: Melhor fazer bem poucas coisas

## Conclusão

O orçamento de marketing ideal depende do seu contexto. O importante é ter um número definido, medir resultados e ajustar conforme necessário.

Comece com o que é possível, mas comece. Marketing não feito é oportunidade perdida.
    `,
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? postsData[id as keyof typeof postsData] : null;

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              O artigo que você procura não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/blog">Ver Todos os Artigos</Link>
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
        title={`${post.title} | Blog`}
        description={post.excerpt}
        keywords={`${post.category.toLowerCase()}, marketing, pme, ${post.title.toLowerCase().split(' ').slice(0, 3).join(', ')}`}
        url={`https://andorinhamarketing.com.br/blog/${id}`}
      />

      <Header />

      <main>
        {/* Header */}
        <section className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Blog
              </Link>

              <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-sm font-medium">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de leitura
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar:
                  </span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://andorinhamarketing.com.br/blog/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#0077B5]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://andorinhamarketing.com.br/blog/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#25D366]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Precisa de Ajuda com {post.category}?
              </h2>
              <p className="text-gray-600 mb-6">
                Agende um diagnóstico gratuito e descubra como podemos ajudar
                seu negócio a crescer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                  <Link to="/contato">Agendar Diagnóstico</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog">Ver Mais Artigos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
