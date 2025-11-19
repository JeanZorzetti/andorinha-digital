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
  "seo-local-pmes": {
    title: "SEO Local para PMEs: Guia Prático",
    excerpt: "Estratégias de SEO local para aparecer nas buscas da sua região e atrair clientes próximos ao seu negócio.",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop",
    date: "28 Dez 2024",
    readTime: "10 min",
    author: "Equipe Andorinha",
    content: `
## O que é SEO Local?

SEO Local é o conjunto de estratégias para melhorar a visibilidade do seu negócio nas buscas locais. Quando alguém pesquisa "restaurante perto de mim" ou "dentista em São Paulo", o Google mostra resultados baseados na localização.

Para PMEs, SEO Local é uma das estratégias mais eficientes porque:
- Atrai clientes prontos para comprar
- Compete com menos concorrentes
- Gera resultados mais rápidos que SEO tradicional
- Tem custo zero ou muito baixo

## Google Meu Negócio: O Básico

### Criando e Otimizando seu Perfil

O Google Meu Negócio é a base do SEO Local. Para otimizar:

- Complete 100% das informações
- Adicione fotos de qualidade (mínimo 10)
- Escolha as categorias corretas
- Mantenha horários atualizados
- Responda todas as avaliações

### Conseguindo Avaliações

Avaliações são cruciais para SEO Local:

- Peça para clientes satisfeitos avaliarem
- Facilite o processo (envie link direto)
- Responda TODAS as avaliações
- Nunca compre avaliações falsas

## Palavras-chave Locais

### Como Identificar

Combine seu serviço com localização:
- "advogado trabalhista zona sul SP"
- "pet shop Moema"
- "contabilidade para PMEs Santo André"

### Onde Usar

- Título do site e páginas
- Meta descriptions
- Conteúdo das páginas
- Google Meu Negócio
- Redes sociais

## Citações e Diretórios

Citações são menções do seu negócio em outros sites:
- Nome
- Endereço
- Telefone

### Diretórios Importantes

- Google Meu Negócio
- Bing Places
- Apple Maps
- Yelp
- TripAdvisor (se aplicável)
- Diretórios do seu setor

### Consistência é Chave

Mantenha as informações IDÊNTICAS em todos os lugares. Variações confundem o Google.

## Conteúdo Local

Crie conteúdo relevante para sua região:
- Blog posts sobre eventos locais
- Guias do bairro
- Parcerias com negócios locais
- Notícias do setor na região

## Mobile First

70%+ das buscas locais são mobile. Seu site precisa:
- Carregar rápido (< 3s)
- Ser totalmente responsivo
- Ter telefone clicável
- Mostrar endereço com link para mapa

## Métricas para Acompanhar

- Visualizações no Google Meu Negócio
- Cliques para ligar/rotas
- Posição nas buscas locais
- Número de avaliações
- Tráfego orgânico local

## Erros Comuns

1. **Informações inconsistentes**: NAP diferente em cada lugar
2. **Ignorar avaliações negativas**: Responda sempre, de forma profissional
3. **Não atualizar horários**: Especialmente em feriados
4. **Fotos de baixa qualidade**: Invista em boas imagens
5. **Não criar conteúdo local**: Blog genérico não ajuda

## Conclusão

SEO Local é uma das melhores estratégias para PMEs porque combina baixo custo com alta intenção de compra. Comece pelo Google Meu Negócio, mantenha consistência nas informações e crie conteúdo relevante para sua região.

Os resultados não são imediatos, mas são duradouros e muito mais baratos que anúncios pagos.
    `,
  },
  "landing-page-converte": {
    title: "Landing Page que Converte: Guia Completo",
    excerpt: "Os elementos essenciais de uma landing page de alta conversão e como aplicá-los no seu negócio.",
    category: "Sites",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    date: "20 Dez 2024",
    readTime: "9 min",
    author: "Equipe Andorinha",
    content: `
## O que é uma Landing Page?

Landing Page é uma página focada em um único objetivo: conversão. Diferente de um site completo, ela elimina distrações e guia o visitante para uma ação específica.

Usos comuns:
- Captar leads (nome, email, telefone)
- Vender um produto/serviço específico
- Inscrições para evento ou webinar
- Download de material rico

## A Anatomia de uma LP de Alta Conversão

### 1. Headline Impactante

A headline é a primeira coisa que o visitante vê. Ela precisa:
- Comunicar o benefício principal
- Ser clara e direta
- Criar curiosidade ou urgência

Exemplo ruim: "Bem-vindo à nossa empresa"
Exemplo bom: "Aumente suas vendas em 40% em 90 dias"

### 2. Subheadline de Suporte

Complementa a headline com mais detalhes:
- Como você vai entregar o benefício
- Para quem é a oferta
- Diferencial competitivo

### 3. Imagem ou Vídeo Hero

Visual que reforça a mensagem:
- Mostre o resultado, não o processo
- Pessoas reais geram mais conexão
- Vídeos aumentam conversão em até 80%

### 4. Benefícios (Não Features)

Liste o que o cliente GANHA, não o que você FAZ:
- Feature: "10 horas de consultoria"
- Benefício: "Estratégia personalizada para dobrar seu faturamento"

### 5. Prova Social

Elementos que geram confiança:
- Depoimentos de clientes
- Logos de empresas atendidas
- Números (clientes, projetos, anos)
- Selos e certificações

### 6. Formulário Otimizado

Quanto menos campos, maior a conversão:
- Nome e email para topo de funil
- + telefone para leads qualificados
- Campos obrigatórios marcados
- Botão com texto de ação ("Quero Receber" vs "Enviar")

### 7. CTA (Call-to-Action)

O botão que gera a conversão:
- Cor contrastante
- Texto orientado a ação
- Tamanho adequado
- Posição estratégica (above the fold + final)

### 8. Urgência e Escassez

Elementos que aceleram a decisão:
- Contador regressivo
- Vagas limitadas
- Bônus por tempo limitado
- Preço promocional

## Erros que Matam Conversões

### 1. Menu de Navegação
Remove porque: Cria saídas desnecessárias

### 2. Múltiplos CTAs
Remove porque: Confunde o visitante

### 3. Texto Demais
Remove porque: Ninguém lê blocos de texto

### 4. Carregamento Lento
Remove porque: Cada segundo de delay reduz 7% de conversão

### 5. Não Mobile-Friendly
Remove porque: 60%+ do tráfego é mobile

## Checklist de Otimização

- Headline clara e benefício-orientada
- Imagem/vídeo de alta qualidade
- Benefícios em bullet points
- Pelo menos 3 depoimentos
- Formulário com mínimo de campos
- CTA contrastante e acima da dobra
- Página carrega em menos de 3s
- Funciona perfeitamente no mobile
- Sem links de saída
- Política de privacidade linkada

## Métricas para Acompanhar

- Taxa de conversão (meta: 2-5% para leads frios)
- Taxa de rejeição
- Tempo na página
- Scroll depth
- Cliques no CTA

## Conclusão

Uma landing page eficiente não precisa ser bonita, precisa ser funcional. Foque em clareza, benefícios e remoção de fricção.

Teste constantemente: mude um elemento por vez e meça os resultados. Pequenas melhorias se acumulam em grandes resultados.

Na Andorinha, criamos landing pages a partir de R$ 3.500 com foco total em conversão.
    `,
  },
  "branding-vs-identidade": {
    title: "Branding vs Identidade Visual: Qual a Diferença?",
    excerpt: "Entenda as diferenças entre branding e identidade visual e quando investir em cada um.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&h=600&fit=crop",
    date: "15 Dez 2024",
    readTime: "5 min",
    author: "Equipe Andorinha",
    content: `
## A Confusão Comum

Muitos empreendedores usam "branding" e "identidade visual" como sinônimos. Mas são coisas diferentes, embora relacionadas.

Entender a diferença ajuda a:
- Contratar o serviço certo
- Investir no momento adequado
- Ter expectativas realistas

## O que é Identidade Visual?

Identidade Visual é o conjunto de elementos GRÁFICOS que representam sua marca:

- Logo (símbolo, logotipo, assinatura)
- Paleta de cores
- Tipografia
- Elementos gráficos (patterns, ícones)
- Aplicações (cartão, papel timbrado, etc)

É tangível, visual, concreto. Você pode ver e tocar.

### Entregáveis típicos:

- Logo em diversos formatos
- Manual de uso da marca
- Paleta de cores com códigos
- Arquivos editáveis
- Mockups de aplicação

## O que é Branding?

Branding é a GESTÃO ESTRATÉGICA da marca como um todo. Inclui:

- Propósito e valores
- Posicionamento de mercado
- Tom de voz e personalidade
- Arquétipos e storytelling
- Estratégia de comunicação
- Experiência do cliente

É intangível, emocional, perceptivo. Você sente.

### Entregáveis típicos:

- Plataforma de marca
- Manifesto
- Tom de voz
- Arquétipo definido
- Estratégia de comunicação
- Guidelines completos

## Analogia Simples

Se sua marca fosse uma pessoa:

- **Branding** = Personalidade, valores, forma de falar, como se comporta
- **Identidade Visual** = Roupa, cabelo, acessórios, aparência física

Você pode mudar a roupa sem mudar a personalidade. Mas a roupa deveria refletir quem você é.

## Qual Vem Primeiro?

Idealmente, branding vem antes. A identidade visual deve ser uma expressão visual da estratégia de marca.

Mas na prática, muitas PMEs começam pela identidade visual por questões de:
- Orçamento limitado
- Urgência de lançamento
- Fase inicial do negócio

Isso não é errado, desde que haja consciência de que o branding completo virá depois.

## Quando Investir em Cada Um?

### Só Identidade Visual

- Negócio muito novo (< 1 ano)
- Orçamento limitado (< R$ 5.000)
- Modelo de negócio ainda em teste
- Precisa lançar rápido

### Branding Completo

- Negócio estabelecido (> 2 anos)
- Vai captar investimento
- Quer reposicionar no mercado
- Precisa alinhar equipe em crescimento
- Mercado muito competitivo

## Preços Típicos

### Identidade Visual

- Básico: R$ 2.000 - 5.000
- Intermediário: R$ 5.000 - 10.000
- Completo: R$ 10.000 - 15.000

### Branding Completo

- PME: R$ 15.000 - 30.000
- Médias empresas: R$ 30.000 - 80.000
- Grandes marcas: R$ 100.000+

## Conclusão

Branding é estratégia. Identidade Visual é execução visual dessa estratégia.

Não é questão de qual é melhor, mas sim do que você precisa AGORA. Se está começando, uma identidade visual sólida já ajuda muito. Conforme crescer, invista em branding completo.

O importante é que haja coerência: sua identidade visual deve refletir quem sua marca realmente é (ou quer ser).
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
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
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
        url={`https://andorinha.roilabs.com.br/blog/${id}`}
      />

      <Header />

      <main>
        {/* Header */}
        <section className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Blog
              </Link>

              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
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
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar:
                  </span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://andorinha.roilabs.com.br/blog/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#0077B5]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://andorinha.roilabs.com.br/blog/${id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#25D366]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Precisa de Ajuda com {post.category}?
              </h2>
              <p className="text-muted-foreground mb-6">
                Agende um diagnóstico gratuito e descubra como podemos ajudar
                seu negócio a crescer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90">
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
