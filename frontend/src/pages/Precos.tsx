import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SchemaFAQPage } from "@/components/SchemaOrg";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Clock, Layers, Zap, RotateCcw, CreditCard, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Precos = () => {
  const services = [
    {
      name: "Landing Page",
      price: "R$ 3.500",
      duration: "15 dias",
      includes: "Design responsivo, SEO básico, formulário",
      link: "/servicos/sites",
    },
    {
      name: "Site Institucional",
      price: "R$ 8.000 - 18.000",
      duration: "25-45 dias",
      includes: "Até 10 páginas, CMS, Analytics, SSL",
      link: "/servicos/sites",
    },
    {
      name: "Branding Completo",
      price: "R$ 6.000 - 12.000",
      duration: "21-40 dias",
      includes: "Logo, paleta, tipografia, manual de marca",
      link: "/servicos/branding",
    },
    {
      name: "Vídeo Institucional",
      price: "R$ 8.000 - 18.000",
      duration: "30-45 dias",
      includes: "Roteiro, filmagem, edição, trilha",
      link: "/servicos/video",
    },
    {
      name: "Rebranding",
      price: "R$ 15.000 - 35.000",
      duration: "45-60 dias",
      includes: "Auditoria, estratégia, nova identidade",
      link: "/servicos/rebranding",
    },
    {
      name: "Design Gráfico",
      price: "R$ 350 - 2.500",
      duration: "3-30 dias",
      includes: "Peças avulsas ou pacotes mensais",
      link: "/servicos/design-grafico",
    },
  ];

  const priceFactors = [
    {
      icon: Layers,
      title: "Complexidade",
      description:
        "Projetos com mais páginas, funcionalidades ou detalhes exigem mais tempo e recursos.",
    },
    {
      icon: Zap,
      title: "Pesquisa",
      description:
        "Projetos que incluem pesquisa de mercado, concorrência e personas têm maior investimento.",
    },
    {
      icon: Clock,
      title: "Prazo",
      description:
        "Projetos urgentes (menos de 50% do prazo padrão) têm acréscimo de 20-30%.",
    },
    {
      icon: RotateCcw,
      title: "Revisões Extra",
      description:
        "Além das rodadas incluídas, cada revisão adicional é cobrada separadamente.",
    },
  ];

  const paymentMethods = [
    {
      range: "Até R$ 10.000",
      options: [
        "40% na aprovação + 60% na entrega",
        "50% na aprovação + 50% na entrega (-5% à vista)",
      ],
    },
    {
      range: "R$ 10.000 - 30.000",
      options: [
        "30% na aprovação + 40% no meio + 30% na entrega",
        "Parcelamento em até 3x sem juros",
      ],
    },
    {
      range: "Acima de R$ 30.000",
      options: [
        "Divisão em 4-6 milestones",
        "Pagamento conforme entregas parciais",
      ],
    },
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "Satisfação Garantida",
      description: "Se não estiver satisfeito com o conceito inicial, refazemos sem custo adicional.",
    },
    {
      icon: FileText,
      title: "Contrato Claro",
      description: "Tudo documentado: escopo, prazos, entregas e condições de pagamento.",
    },
    {
      icon: Clock,
      title: "Prazos Cumpridos",
      description: "98% dos projetos entregues no prazo. Se atrasarmos, você ganha desconto.",
    },
    {
      icon: CreditCard,
      title: "Pagamento Seguro",
      description: "PIX, transferência, boleto ou cartão. Nota fiscal em todas as transações.",
    },
  ];

  const policies = [
    {
      question: "Política de Revisões",
      answer:
        "Todos os projetos incluem rodadas de revisão (varia por serviço). Revisões são ajustes no conceito aprovado, não mudanças de briefing. Alterações de escopo são orçadas separadamente. Revisões extras custam R$ 150-500 dependendo da complexidade.",
    },
    {
      question: "Política de Prazos",
      answer:
        "Os prazos começam a contar após aprovação do briefing e pagamento da entrada. Atrasos por parte do cliente (falta de feedback, materiais) pausam o cronograma. Projetos urgentes têm acréscimo de 20-30%.",
    },
    {
      question: "Política de Cancelamento",
      answer:
        "Cancelamento antes do início: reembolso integral menos taxa administrativa de 10%. Durante o projeto: pagamento proporcional ao trabalho realizado. Após aprovação de conceito: sem reembolso, mas entrega dos arquivos produzidos.",
    },
    {
      question: "Propriedade Intelectual",
      answer:
        "Após pagamento integral, todos os direitos autorais são transferidos ao cliente. Você recebe arquivos editáveis e pode usar livremente. Mantemos direito de usar em portfólio (pode ser vetado por escrito).",
    },
    {
      question: "Suporte Pós-Entrega",
      answer:
        "Todos os projetos incluem período de suporte (30-60 dias dependendo do pacote). Inclui: dúvidas sobre uso, pequenos ajustes, orientações. Não inclui: novas funcionalidades, alterações de escopo, manutenção contínua.",
    },
  ];

  const faqItems = [
    {
      question: "Por que os preços variam tanto?",
      answer:
        "Cada projeto é único. Um site de 5 páginas é diferente de um e-commerce com 500 produtos. Os preços variam conforme complexidade, número de páginas/peças, pesquisa necessária, integrações e prazo. Por isso oferecemos diagnóstico gratuito para orçar corretamente.",
    },
    {
      question: "Posso parcelar o investimento?",
      answer:
        "Sim! Oferecemos parcelamento em até 3x sem juros no cartão. Para projetos maiores, dividimos o pagamento em milestones conforme as entregas. Também oferecemos 5% de desconto para pagamento à vista via PIX.",
    },
    {
      question: "Vocês fazem desconto à vista?",
      answer:
        "Sim, oferecemos 5% de desconto para pagamento integral via PIX ou transferência antes do início do projeto. Para projetos acima de R$ 20.000, podemos negociar condições especiais.",
    },
    {
      question: "O que não está incluído no preço?",
      answer:
        "Geralmente não incluímos: hospedagem (após primeiro ano), domínio, banco de imagens premium, impressão de materiais, filmagem com atores/modelos profissionais, e traduções. Tudo isso pode ser orçado à parte se necessário.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Aceitamos PIX, transferência bancária, boleto e cartão de crédito (até 3x sem juros). Emitimos nota fiscal para todas as transações. O projeto inicia após confirmação do pagamento da entrada.",
    },
    {
      question: "Posso cancelar o projeto?",
      answer:
        "Sim, mas há condições. Antes do início: reembolso de 90%. Durante: pagamento proporcional. Após aprovação de conceito: sem reembolso, mas entrega dos arquivos. Recomendamos alinhar bem o briefing para evitar cancelamentos.",
    },
  ];

  return (
    <>
      <SEO
        title="Tabela de Preços | Investimentos Transparentes | Andorinha Marketing"
        description="Tabela completa de preços dos serviços de marketing: branding, sites, vídeos e design gráfico. Investimento transparente com condições de pagamento flexíveis."
        keywords="preços marketing, quanto custa branding, preço site institucional, valores identidade visual, orçamento marketing"
        url="https://andorinhamarketing.com.br/precos"
        image="https://andorinhamarketing.com.br/og/og-precos.png"
      />
      <SchemaFAQPage faqs={faqItems} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Investimento Transparente em Marketing
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Trabalhamos com projetos pontuais de escopo fechado. Você sabe
                exatamente o que vai receber e quanto vai investir antes de começar.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white"
              >
                <Link to="/contato">Solicitar Proposta Personalizada</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Tabela de Investimentos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Serviço
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Investimento
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Prazo
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      O Que Inclui
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      Detalhes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="py-4 px-4 text-[#FF6B35] font-semibold">
                        {service.price}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {service.duration}
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {service.includes}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button asChild variant="outline" size="sm">
                          <Link to={service.link}>Ver Mais</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Price Factors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              O Que Influencia o Preço
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Entenda os fatores que compõem o investimento em cada projeto
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {priceFactors.map((factor, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4">
                    <factor.icon className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {factor.title}
                  </h3>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Formas de Pagamento
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Condições flexíveis para se adequar ao seu fluxo de caixa
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="font-semibold text-[#FF6B35] mb-4">
                    {method.range}
                  </h3>
                  <ul className="space-y-3">
                    {method.options.map((option, optIndex) => (
                      <li key={optIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600">
                <strong>Formas aceitas:</strong> PIX, Transferência Bancária,
                Boleto, Cartão de Crédito (até 3x sem juros)
              </p>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nossas Garantias
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <guarantee.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-sm text-gray-600">{guarantee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Políticas Claras
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Transparência em todas as etapas do projeto
            </p>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {policies.map((policy, index) => (
                  <AccordionItem key={index} value={`policy-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {policy.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {policy.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Perguntas Frequentes sobre Preços
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Tire suas dúvidas sobre investimentos e pagamentos
            </p>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#FF6B35]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Não Encontrou o Que Procura?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Solicite um orçamento personalizado. Analisamos seu projeto e
              enviamos uma proposta detalhada em até 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#FF6B35] hover:bg-gray-100"
              >
                <Link to="/contato">Solicitar Orçamento</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de um orçamento personalizado."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Precos;
