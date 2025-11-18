import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Zap, Diamond, TrendingUp, Palette, Monitor, Video, RefreshCw, Layers, CheckCircle2, Clock, Shield, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Andorinha Marketing | Marketing Estratégico para PMEs"
        description="Agência de marketing estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total. Diagnóstico gratuito."
        keywords="agência marketing digital, branding preço, quanto custa criar site, marketing estratégico PMEs, vídeo institucional"
        url="https://andorinha.roilabs.com.br"
        image="https://andorinha.roilabs.com.br/og/og-home.png"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-blue to-accent-blue pattern-andorinha">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Voe Certo. Voe Alto com Marketing Estratégico
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-slide-up">
              Transformamos seu marketing em resultados reais. Estratégia + Execução + Transparência para PMEs que pensam grande.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 hover-glow">
                <Link to="/contato">Agende Diagnóstico Gratuito</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg px-8 py-6">
                <Link to="/precos">Ver Pacotes e Preços</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>30 dias de suporte incluído</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Entrega em 15-45 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5 text-primary" />
                <span>Transparência total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projetos Entregues</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-primary">15 anos</div>
              <div className="text-sm text-muted-foreground">De Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Por Que Escolher a Andorinha?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Não somos apenas mais uma agência. Somos parceiros estratégicos do seu crescimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Estratégia Real</h3>
              <p className="text-muted-foreground">
                Não fazemos só o design bonito. Pensamos o seu negócio, público e objetivos antes de criar qualquer pixel.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Velocidade Inteligente</h3>
              <p className="text-muted-foreground">
                Qualidade de média agência entregue em 15-45 dias. Porque timing é tudo em marketing.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Diamond className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Transparência Total</h3>
              <p className="text-muted-foreground">
                Preços claros, processo documentado, sem surpresas. Você sabe exatamente o que recebe e quanto custa.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Suporte Real</h3>
              <p className="text-muted-foreground">
                30 dias de suporte pós-entrega incluído. Não entregamos e sumimos, acompanhamos seus resultados.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Projetos que Transformam Negócios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Todos os serviços são projetos pontuais. Você contrata o que precisa, quando precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Branding */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Palette className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Branding & Identidade Visual</h3>
                <p className="text-muted-foreground mb-4">
                  Logo, paleta de cores, tipografia e manual completo de marca
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 6.000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">21-30 dias</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ Inclui 3 rodadas de revisão
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/servicos/branding">Saiba Mais →</Link>
                </Button>
              </div>
            </Card>

            {/* Sites */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Monitor className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Sites & Landing Pages</h3>
                <p className="text-muted-foreground mb-4">
                  Sites institucionais, landing pages e páginas de conversão estratégicas
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 3.500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">15-30 dias</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ SEO básico incluído
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/servicos/sites">Saiba Mais →</Link>
                </Button>
              </div>
            </Card>

            {/* Vídeo */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Video className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Vídeo Institucional</h3>
                <p className="text-muted-foreground mb-4">
                  Vídeos profissionais para apresentar sua empresa, produto ou serviço
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 8.000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">30-45 dias</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ Roteiro + produção + edição
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/servicos/video">Saiba Mais →</Link>
                </Button>
              </div>
            </Card>

            {/* Rebranding */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <RefreshCw className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Rebranding Completo</h3>
                <p className="text-muted-foreground mb-4">
                  Renovação completa da identidade visual e posicionamento de marca
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 15.000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">45-60 dias</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ Pesquisa + estratégia incluída
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/servicos/rebranding">Saiba Mais →</Link>
                </Button>
              </div>
            </Card>

            {/* Design Gráfico */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Design Gráfico</h3>
                <p className="text-muted-foreground mb-4">
                  Materiais impressos, digitais, papelaria e peças de comunicação
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">5-15 dias</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ Peças avulsas ou pacotes
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/servicos/design-grafico">Saiba Mais →</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 px-4 bg-primary-dark text-primary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Um processo claro e colaborativo do início ao fim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { icon: "📋", title: "Diagnóstico Gratuito", time: "30-60 min", desc: "Entendemos seu negócio, desafios e objetivos" },
              { icon: "🎯", title: "Onboarding Estratégico", time: "1-2 horas", desc: "Workshop de alinhamento colaborativo" },
              { icon: "⚙️", title: "Execução Ágil", time: "15-45 dias", desc: "Sprints com check-ins semanais" },
              { icon: "🚀", title: "Entrega + Handoff", time: "Apresentação", desc: "Capacitação e documentação" },
              { icon: "🛡️", title: "Suporte", time: "30 dias", desc: "Acompanhamento e ajustes" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <div className="text-sm text-primary mb-2 font-semibold">{step.time}</div>
                <p className="text-sm text-primary-foreground/70">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/processo">Conheça o Processo Completo →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pacotes */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Investimento Transparente
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o projeto que faz sentido para seu momento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Decolagem */}
            <Card className="p-8 hover-lift border-2">
              <div className="inline-block bg-accent-blue-light/20 text-accent-blue text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Entrada
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Decolagem</h3>
              <div className="text-3xl font-bold text-primary mb-4">A partir de R$ 3.500</div>
              <p className="text-muted-foreground mb-6">Perfeito para começar</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Landing Page estratégica</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Design responsivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">SEO básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">3 rodadas de revisão</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">30 dias de suporte</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground mb-6">Prazo: 15-21 dias</div>
              <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contato">Solicitar Proposta</Link>
              </Button>
            </Card>

            {/* Voo Alto - Destaque */}
            <Card className="p-8 hover-lift border-4 border-primary relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                ⭐ Mais Popular
              </div>
              <div className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 mt-4">
                Recomendado
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Voo Alto</h3>
              <div className="text-3xl font-bold text-primary mb-4">A partir de R$ 8.000</div>
              <p className="text-muted-foreground mb-6">Para empresas em crescimento</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Site institucional completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Identidade visual básica OU Vídeo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">SEO avançado</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Estratégia de conteúdo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">30 dias de suporte</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground mb-6">Prazo: 30-45 dias</div>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link to="/contato">Começar Agora</Link>
              </Button>
            </Card>

            {/* Estratosfera */}
            <Card className="p-8 hover-lift border-2">
              <div className="inline-block bg-accent-peach/30 text-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Premium
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Estratosfera</h3>
              <div className="text-3xl font-bold text-primary mb-4">A partir de R$ 15.000</div>
              <p className="text-muted-foreground mb-6">Transformação completa</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Rebranding completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Site institucional premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Vídeo institucional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Materiais de apoio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">60 dias de suporte</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground mb-6">Prazo: 45-60 dias</div>
              <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contato">Agendar Consultoria</Link>
              </Button>
            </Card>
          </div>

          <div className="text-center mt-8 text-sm text-muted-foreground">
            Todos os projetos incluem 3 rodadas de revisão | Pagamento parcelado disponível | Garantia de prazo
          </div>
        </div>
      </section>

      {/* Garantias */}
      <section className="py-20 px-4 bg-accent-blue-light/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Nossos Compromissos com Você
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Garantia de Prazo", desc: "Entregamos no prazo ou você ganha 10% de desconto" },
              { icon: RefreshCw, title: "3 Rodadas de Revisão", desc: "Incluídas em todos os projetos, sem custo adicional" },
              { icon: Shield, title: "30 Dias de Suporte", desc: "Suporte pós-entrega para ajustes e dúvidas" },
              { icon: Award, title: "Satisfação Garantida", desc: "Não aprovou o conceito? Devolvemos 50% do sinal" }
            ].map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground">{guarantee.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary text-primary-foreground pattern-andorinha">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para Decolar?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Agende 30 minutos de diagnóstico gratuito e descubra como podemos transformar seu marketing em resultados reais
          </p>
          <Button asChild size="lg" className="bg-primary-dark hover:bg-primary-dark/90 text-primary-foreground font-semibold text-lg px-12 py-6">
            <Link to="/contato">Agendar Diagnóstico Gratuito</Link>
          </Button>
          <p className="mt-6 text-sm text-primary-foreground/70">
            ✓ Sem compromisso  ✓ Sem custo  ✓ Apenas estratégia
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
