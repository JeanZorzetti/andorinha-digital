import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Target, Zap, Diamond, TrendingUp, Palette, Monitor, Video, RefreshCw, Layers, Camera, CheckCircle2, Clock, Shield, Award, ClipboardList, Crosshair, Settings, Rocket, ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ctaForm, setCtaForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    acceptContact: false
  });

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ctaForm.acceptContact) {
      toast({
        title: "Erro",
        description: "Você precisa aceitar receber contato para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Diagnóstico agendado!",
        description: "Entraremos em contato em até 24 horas úteis.",
      });

      setCtaForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        acceptContact: false
      });
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato por telefone.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 animate-fade-in slogan-hero tracking-wide">
              Voe Certo. Voe Alto com Marketing
              <br />
              <span className="mt-2 block">Estratégico</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
              Transformamos seu marketing em resultados reais. Estratégia + Execução + Transparência para PMEs que pensam grande.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button asChild size="xl" className="hover-glow">
                <Link to="/contato">Agende Diagnóstico Gratuito</Link>
              </Button>
              <Button asChild size="xl" variant="ghost">
                <Link to="/precos">Ver Pacotes e Preços</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80">
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
              <div className="text-3xl font-bold font-heading text-primary metric-number">50+</div>
              <div className="text-sm text-muted-foreground">Projetos Entregues</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold font-heading text-primary metric-number">98%</div>
              <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold font-heading text-primary metric-number">15 anos</div>
              <div className="text-sm text-muted-foreground">De Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
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
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Estratégia Real</h3>
              <p className="text-muted-foreground">
                Não fazemos só o design bonito. Pensamos o seu negócio, público e objetivos antes de criar qualquer pixel.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Velocidade Inteligente</h3>
              <p className="text-muted-foreground">
                Qualidade de média agência entregue em 15-45 dias. Porque timing é tudo em marketing.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Diamond className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Transparência Total</h3>
              <p className="text-muted-foreground">
                Preços claros, processo documentado, sem surpresas. Você sabe exatamente o que recebe e quanto custa.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-2 hover:border-primary transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Suporte Real</h3>
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
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
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
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Branding & Identidade Visual</h3>
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
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Sites & Landing Pages</h3>
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
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Vídeo Institucional</h3>
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
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Rebranding Completo</h3>
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
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Design Gráfico</h3>
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

            {/* Fotografia Corporativa */}
            <Card className="group overflow-hidden hover-lift border-2 hover:border-primary transition-all">
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">Fotografia Corporativa</h3>
                <p className="text-muted-foreground mb-4">
                  Sessões fotográficas para produtos, equipe, espaços e eventos
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold text-foreground">A partir de R$ 1.500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span className="font-semibold text-foreground">Agendamento flexível</span>
                  </div>
                </div>
                <div className="inline-block bg-accent-peach/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ✓ Edição e retoque incluído
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contato?servico=fotografia">Agendar Sessão →</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Resultados que Falam Por Si
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Projetos que transformaram negócios reais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case 1 - TechStart */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="TechStart Branding"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Branding
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">TechStart</p>
                <h3 className="font-bold text-foreground mb-3 line-clamp-2">
                  Nova Identidade para Startup de Tech
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Startup precisava de identidade visual que transmitisse inovação e confiança para captar investidores.
                </p>
                <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    +40% em conversão de pitch
                  </span>
                </div>
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <Quote className="w-4 h-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground italic">
                    "A nova identidade nos ajudou a fechar a rodada seed em tempo recorde."
                  </p>
                </div>
                <Link
                  to="/cases/techstart-branding"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ver Case Completo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* Case 2 - Almeida Consultoria */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="Almeida Consultoria Site"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Sites
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Almeida Consultoria</p>
                <h3 className="font-bold text-foreground mb-3 line-clamp-2">
                  Site Institucional de Alta Conversão
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Consultoria tradicional precisava modernizar presença digital e captar leads qualificados.
                </p>
                <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    +180% leads qualificados
                  </span>
                </div>
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <Quote className="w-4 h-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground italic">
                    "Nosso site agora trabalha para nós 24/7, captando clientes enquanto dormimos."
                  </p>
                </div>
                <Link
                  to="/cases/consultoria-site"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ver Case Completo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* Case 3 - Sabor & Arte */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                  alt="Sabor & Arte Vídeo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Vídeo
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Sabor & Arte Buffet</p>
                <h3 className="font-bold text-foreground mb-3 line-clamp-2">
                  Vídeo Institucional Emotivo
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Buffet familiar queria mostrar a paixão por trás de cada evento e captar clientes corporativos.
                </p>
                <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    +90% eventos corporativos
                  </span>
                </div>
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <Quote className="w-4 h-4 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground italic">
                    "O vídeo capturou exatamente a essência do nosso trabalho. Clientes se emocionam."
                  </p>
                </div>
                <Link
                  to="/cases/buffet-video"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ver Case Completo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/cases">
                Ver Todos os Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 px-4 bg-primary-dark text-primary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Um processo claro e colaborativo do início ao fim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { icon: ClipboardList, title: "Diagnóstico Gratuito", time: "30-60 min", desc: "Entendemos seu negócio, desafios e objetivos" },
              { icon: Crosshair, title: "Onboarding Estratégico", time: "1-2 horas", desc: "Workshop de alinhamento colaborativo" },
              { icon: Settings, title: "Execução Ágil", time: "15-45 dias", desc: "Sprints com check-ins semanais" },
              { icon: Rocket, title: "Entrega + Handoff", time: "Apresentação", desc: "Capacitação e documentação" },
              { icon: Shield, title: "Suporte", time: "30 dias", desc: "Acompanhamento e ajustes" }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-2">{step.title}</h3>
                  <div className="text-sm text-primary mb-2 font-semibold font-body">{step.time}</div>
                  <p className="text-sm font-body text-primary-foreground/70">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="ghost">
              <Link to="/processo">Conheça o Processo Completo →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pacotes */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
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
              <div className="text-3xl font-bold font-heading text-primary mb-4">A partir de R$ 3.500</div>
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
              <div className="text-3xl font-bold font-heading text-primary mb-4">A partir de R$ 8.000</div>
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
              <div className="text-3xl font-bold font-heading text-primary mb-4">A partir de R$ 15.000</div>
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
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
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
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground">{guarantee.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Conteúdo que Agrega
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dicas, insights e estratégias de marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Post 1 */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop"
                  alt="Quanto Custa Criar um Site"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Sites
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>15 Jan 2025</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    8 min
                  </span>
                </div>
                <h4 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  Quanto Custa Criar um Site Profissional em 2025?
                </h4>
                <Link
                  to="/blog/quanto-custa-site-2025"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ler Artigo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* Post 2 */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=340&fit=crop"
                  alt="Identidade Visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Branding
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>10 Jan 2025</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    6 min
                  </span>
                </div>
                <h4 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  Identidade Visual: Vale a Pena Investir?
                </h4>
                <Link
                  to="/blog/identidade-visual-vale-pena"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ler Artigo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* Post 3 */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=340&fit=crop"
                  alt="Orçamento de Marketing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Estratégia
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>5 Jan 2025</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    10 min
                  </span>
                </div>
                <h4 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  Como Definir Orçamento de Marketing para PMEs
                </h4>
                <Link
                  to="/blog/orcamento-marketing-pmes"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Ler Artigo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/blog">
                Ver Todos os Artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final com Formulário */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-dark via-primary-blue to-accent-blue pattern-andorinha">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white">
              Pronto para Decolar?
            </h2>
            <p className="text-xl text-white/90">
              Agende 30 minutos de diagnóstico gratuito e descubra como podemos transformar seu marketing em resultados reais
            </p>
          </div>

          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            <form onSubmit={handleCtaSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta-name" className="text-foreground">Nome *</Label>
                  <Input
                    id="cta-name"
                    required
                    value={ctaForm.name}
                    onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })}
                    placeholder="Seu nome"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cta-email" className="text-foreground">Email *</Label>
                  <Input
                    id="cta-email"
                    type="email"
                    required
                    value={ctaForm.email}
                    onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta-phone" className="text-foreground">Telefone *</Label>
                  <Input
                    id="cta-phone"
                    type="tel"
                    required
                    value={ctaForm.phone}
                    onChange={(e) => setCtaForm({ ...ctaForm, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cta-company" className="text-foreground">Empresa</Label>
                  <Input
                    id="cta-company"
                    value={ctaForm.company}
                    onChange={(e) => setCtaForm({ ...ctaForm, company: e.target.value })}
                    placeholder="Nome da empresa"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cta-service" className="text-foreground">Serviço de interesse</Label>
                <Select value={ctaForm.service} onValueChange={(value) => setCtaForm({ ...ctaForm, service: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branding">Branding & Identidade Visual</SelectItem>
                    <SelectItem value="sites">Sites & Landing Pages</SelectItem>
                    <SelectItem value="video">Vídeo Institucional</SelectItem>
                    <SelectItem value="rebranding">Rebranding</SelectItem>
                    <SelectItem value="design">Design Gráfico</SelectItem>
                    <SelectItem value="fotografia">Fotografia Corporativa</SelectItem>
                    <SelectItem value="nao-sei">Ainda não sei</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="cta-accept"
                  checked={ctaForm.acceptContact}
                  onCheckedChange={(checked) => setCtaForm({ ...ctaForm, acceptContact: checked as boolean })}
                />
                <label htmlFor="cta-accept" className="text-sm text-muted-foreground cursor-pointer">
                  Aceito receber contato da Andorinha Marketing *
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner size="sm" className="mr-2" />}
                {isSubmitting ? "Enviando..." : "Agendar Diagnóstico Gratuito"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                ✓ Sem compromisso  ✓ Sem custo  ✓ Apenas estratégia
              </p>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
