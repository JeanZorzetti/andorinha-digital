import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Rocket,
  Package,
  HeadphonesIcon,
  CheckCircle,
  Clock,
  Eye,
  Repeat,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Processo = () => {
  const processSteps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Diagnóstico Gratuito",
      duration: "30-60 minutos",
      description:
        "Conversamos para entender seu negócio, objetivos e desafios. É uma consultoria inicial sem compromisso.",
      details: [
        "Entendemos seu mercado e público-alvo",
        "Analisamos sua presença digital atual",
        "Identificamos oportunidades de melhoria",
        "Definimos prioridades e escopo",
        "Apresentamos soluções e investimento",
      ],
      deliverable: "Proposta comercial detalhada com escopo, prazo e investimento",
    },
    {
      number: "02",
      icon: Users,
      title: "Onboarding Estratégico",
      duration: "1-2 horas",
      description:
        "Workshop colaborativo para alinhar expectativas e coletar todas as informações necessárias.",
      details: [
        "Briefing detalhado do projeto",
        "Definição de personas e jornada",
        "Análise de concorrentes e referências",
        "Alinhamento de tom de voz e valores",
        "Cronograma e marcos do projeto",
      ],
      deliverable: "Briefing criativo aprovado e cronograma definido",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Execução Ágil",
      duration: "15-45 dias",
      description:
        "Desenvolvemos o projeto em sprints semanais com check-ins regulares para garantir alinhamento.",
      details: [
        "Sprints semanais com entregas parciais",
        "Check-ins de 30min para feedback",
        "Acesso ao progresso em tempo real",
        "3 rodadas de revisão incluídas",
        "Ajustes conforme seu feedback",
      ],
      deliverable: "Projeto desenvolvido e refinado conforme seu feedback",
    },
    {
      number: "04",
      icon: Package,
      title: "Entrega + Handoff",
      duration: "1-2 dias",
      description:
        "Apresentação formal do projeto finalizado com todos os arquivos e documentação completa.",
      details: [
        "Apresentação formal do projeto",
        "Entrega de todos os arquivos editáveis",
        "Documentação e manuais de uso",
        "Capacitação da equipe (1-2h)",
        "7 dias para ajustes finais",
      ],
      deliverable: "Arquivos finais, manuais e equipe capacitada",
    },
    {
      number: "05",
      icon: HeadphonesIcon,
      title: "Suporte Pós-Projeto",
      duration: "30-60 dias",
      description:
        "Período de acompanhamento para garantir que tudo funcione perfeitamente.",
      details: [
        "Resposta em até 24h úteis",
        "Dúvidas sobre uso e aplicação",
        "Pequenos ajustes e correções",
        "Orientações para evolução",
        "Opções de manutenção contínua",
      ],
      deliverable: "Suporte completo até você se sentir seguro",
    },
  ];

  const tools = [
    { name: "Figma", category: "Design" },
    { name: "Adobe CC", category: "Design" },
    { name: "Trello", category: "Gestão" },
    { name: "Notion", category: "Gestão" },
    { name: "Miro", category: "Colaboração" },
    { name: "Zoom", category: "Comunicação" },
    { name: "Google Meet", category: "Comunicação" },
    { name: "WhatsApp", category: "Comunicação" },
    { name: "Google Drive", category: "Entrega" },
    { name: "Dropbox", category: "Entrega" },
    { name: "VS Code", category: "Desenvolvimento" },
    { name: "GitHub", category: "Desenvolvimento" },
  ];

  const differentials = [
    {
      icon: Users,
      title: "Participação Ativa",
      description:
        "Você participa de cada etapa. Nada é decidido sem sua aprovação.",
    },
    {
      icon: Eye,
      title: "Transparência Total",
      description:
        "Acesso ao progresso em tempo real. Sem surpresas no final.",
    },
    {
      icon: Zap,
      title: "Sem Burocracias",
      description:
        "Comunicação direta e ágil. Decisões rápidas, sem intermediários.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação Clara",
      description:
        "Explicamos tudo em linguagem simples. Sem jargões técnicos.",
    },
    {
      icon: Clock,
      title: "Prazos Cumpridos",
      description:
        "98% dos projetos entregues no prazo. Compromisso é compromisso.",
    },
    {
      icon: Repeat,
      title: "Revisões Incluídas",
      description:
        "3 rodadas de revisão em todos os projetos. Seu feedback importa.",
    },
  ];

  const testimonials = [
    {
      quote:
        "O processo foi muito tranquilo. Sempre soube exatamente em que etapa estávamos e o que vinha a seguir. Sem surpresas.",
      author: "Marina Costa",
      role: "CEO, TechStart",
    },
    {
      quote:
        "A comunicação foi excepcional. Respondiam rápido e explicavam tudo de forma clara. Me senti parte do projeto do início ao fim.",
      author: "Ricardo Almeida",
      role: "Diretor, Almeida Consultoria",
    },
    {
      quote:
        "Os check-ins semanais fizeram toda diferença. Pudemos ajustar o rumo antes de ir longe demais. Resultado ficou perfeito.",
      author: "Carla Mendes",
      role: "Fundadora, Studio CM",
    },
  ];

  return (
    <>
      <SEO
        title="Nosso Processo | Como Trabalhamos"
        description="Conheça nosso processo de trabalho: do diagnóstico gratuito à entrega final. Metodologia clara, transparente e colaborativa em 5 etapas."
        keywords="processo de trabalho, metodologia, como funciona, etapas do projeto, diagnóstico gratuito"
        url="https://andorinhamarketing.com.br/processo"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Um Processo Claro do Início ao Fim
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transparência e colaboração em cada etapa. Você sempre sabe o que
                está acontecendo e participa das decisões importantes.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white"
              >
                <Link to="/contato">Agendar Diagnóstico Gratuito</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              5 Etapas Para o Sucesso
            </h2>
            <div className="space-y-12 max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon and Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#FF6B35] rounded-xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-sm font-bold text-[#FF6B35]">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                            O que acontece:
                          </h4>
                          <ul className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:border-l md:pl-4 border-gray-100">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                            Entregável:
                          </h4>
                          <p className="text-sm text-[#FF6B35] font-medium">
                            {step.deliverable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Ferramentas Que Usamos
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Tecnologias modernas para entregar resultados de qualidade
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {tool.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Por Que Nosso Processo Funciona
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Diferenciais que garantem o sucesso do seu projeto
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {differentials.map((diff, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4">
                    <diff.icon className="w-6 h-6 text-[#FF6B35]" />
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              O Que Dizem Sobre Nosso Processo
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
              Pronto Para Começar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Agende seu diagnóstico gratuito e descubra como podemos ajudar seu
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

export default Processo;
