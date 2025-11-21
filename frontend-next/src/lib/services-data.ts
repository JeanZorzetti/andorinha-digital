import { LucideIcon, Search, Lightbulb, Palette, FileCheck, Rocket, FileSearch, Layout, Code, TestTube, MessageSquare, Pencil, Send, Users, RefreshCw, FileText, Video, Film, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    duration: string;
    breadcrumb: string;
    seo: {
        title: string;
        description: string;
        keywords: string;
        image: string;
    };
    schema: {
        name: string;
        description: string;
        price: string;
    };
    includedItems: string[];
    processSteps: {
        icon: LucideIcon;
        title: string;
        description: string;
        duration: string;
    }[];
    pricingTiers: {
        name: string;
        price: string;
        duration: string;
        description: string;
        badge: string;
        highlighted?: boolean;
        features: string[];
    }[];
    faqItems: {
        question: string;
        answer: string;
    }[];
    cta: {
        title: string;
        subtitle: string;
    };
}

export const servicesData: Record<string, ServiceData> = {
    branding: {
        id: "branding",
        title: "Branding & Identidade Visual",
        subtitle: "Construa uma marca memorável",
        description: "Criamos identidades visuais que comunicam a essência do seu negócio e conectam emocionalmente com seu público. Logo, cores, tipografia e manual completo de marca.",
        price: "A partir de R$ 6.000",
        duration: "21-40 dias",
        breadcrumb: "Branding",
        seo: {
            title: "Branding e Identidade Visual | Preços a partir de R$ 6.000",
            description: "Criação de identidade visual completa: logo, paleta de cores, tipografia e manual de marca. Projetos de 21 a 40 dias com 3 rodadas de revisão incluídas.",
            keywords: "branding, identidade visual, criação de logo, preço identidade visual, quanto custa branding, manual de marca",
            image: "https://andorinha.roilabs.com.br/og/og-branding.png",
        },
        schema: {
            name: "Branding e Identidade Visual",
            description: "Criação de identidade visual completa: logo, paleta de cores, tipografia e manual de marca. Projetos de 21 a 40 dias com 3 rodadas de revisão incluídas.",
            price: "6000",
        },
        includedItems: [
            "Pesquisa de mercado e concorrência",
            "Definição de personas e posicionamento",
            "Criação de logotipo (3 conceitos)",
            "Paleta de cores completa",
            "Tipografia institucional",
            "Elementos gráficos de apoio",
            "Manual de identidade visual (PDF)",
            "Mockups de aplicações",
            "Arquivos editáveis (AI, PSD, PDF)",
            "3 rodadas de revisão",
            "30 dias de suporte pós-entrega",
        ],
        processSteps: [
            {
                icon: Search,
                title: "Pesquisa",
                description: "Análise de mercado, concorrência e definição de personas para entender seu público",
                duration: "3-5 dias",
            },
            {
                icon: Lightbulb,
                title: "Conceito",
                description: "Desenvolvimento de 3 conceitos criativos baseados na pesquisa e briefing",
                duration: "5-7 dias",
            },
            {
                icon: Palette,
                title: "Criação",
                description: "Refinamento do conceito escolhido com paleta de cores e tipografia",
                duration: "5-7 dias",
            },
            {
                icon: FileCheck,
                title: "Aplicações",
                description: "Criação de mockups e aplicações em diversos materiais e formatos",
                duration: "3-5 dias",
            },
            {
                icon: Rocket,
                title: "Entrega",
                description: "Manual completo de marca, arquivos editáveis e capacitação da equipe",
                duration: "2-3 dias",
            },
        ],
        pricingTiers: [
            {
                name: "Básico",
                price: "R$ 6.000",
                duration: "21 dias",
                description: "Ideal para startups e pequenos negócios",
                badge: "Entrada",
                features: [
                    "Logotipo (3 conceitos)",
                    "Paleta de cores",
                    "Tipografia institucional",
                    "Manual básico de marca",
                    "Arquivos editáveis",
                    "3 rodadas de revisão",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Completo",
                price: "R$ 9.500",
                duration: "30 dias",
                description: "Para empresas em crescimento",
                badge: "Mais Popular",
                highlighted: true,
                features: [
                    "Tudo do pacote Básico",
                    "Elementos gráficos de apoio",
                    "Papelaria completa",
                    "Aplicações digitais",
                    "Mockups profissionais",
                    "Manual completo de marca",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Premium",
                price: "R$ 12.000",
                duration: "30-40 dias",
                description: "Transformação completa de marca",
                badge: "Premium",
                features: [
                    "Tudo do pacote Completo",
                    "Pesquisa aprofundada",
                    "Naming (se necessário)",
                    "Estratégia de marca",
                    "Brand book extenso",
                    "Materiais de marketing",
                    "60 dias de suporte",
                ],
            },
        ],
        faqItems: [
            {
                question: "Quanto tempo leva para criar uma identidade visual?",
                answer: "O prazo varia de 21 a 40 dias dependendo do pacote escolhido. O pacote Básico leva em média 21 dias, o Completo 30 dias, e o Premium de 30 a 40 dias. Esses prazos consideram todas as etapas do processo, incluindo pesquisa, criação e revisões.",
            },
            {
                question: "Quantas opções de logo vou receber?",
                answer: "Você receberá 3 conceitos diferentes de logotipo para escolher. Após a escolha, refinamos o conceito selecionado com 3 rodadas de revisão incluídas em todos os pacotes.",
            },
            {
                question: "Recebo os arquivos editáveis?",
                answer: "Sim! Todos os pacotes incluem arquivos editáveis em formato AI (Adobe Illustrator), PSD (Photoshop) e PDF vetorial. Você terá total propriedade e autonomia sobre sua marca.",
            },
            {
                question: "O que é o manual de identidade visual?",
                answer: "É um documento que orienta como usar corretamente sua marca. Inclui regras de aplicação do logo, códigos de cores, tipografia, espaçamentos mínimos, e exemplos de uso correto e incorreto. Essencial para manter a consistência da sua marca.",
            },
            {
                question: "Posso parcelar o investimento?",
                answer: "Sim! Oferecemos parcelamento em até 3x sem juros no cartão. Para projetos acima de R$ 10.000, podemos dividir em 40% de entrada, 40% no meio do projeto e 20% na entrega.",
            },
            {
                question: "E se eu não gostar de nenhum conceito?",
                answer: "Se nenhum dos 3 conceitos iniciais atender suas expectativas, podemos criar mais uma rodada de conceitos. Porém, isso é raro quando o briefing está bem alinhado. Por isso, investimos bastante tempo na etapa de pesquisa e onboarding.",
            },
            {
                question: "Vocês fazem naming (criação de nome)?",
                answer: "Sim, o naming está incluído no pacote Premium. Para os outros pacotes, pode ser contratado separadamente por R$ 2.500. Inclui pesquisa de disponibilidade no INPI e em domínios.",
            },
            {
                question: "Como funciona o suporte pós-entrega?",
                answer: "Após a entrega final, você tem 30 dias (ou 60 no Premium) de suporte para tirar dúvidas, solicitar pequenos ajustes e receber orientações sobre como usar a marca. Respondemos em até 24 horas úteis.",
            },
        ],
        cta: {
            title: "Pronto para Criar sua Marca?",
            subtitle: "Agende um diagnóstico gratuito e descubra como podemos transformar sua identidade visual",
        },
    },
    sites: {
        id: "sites",
        title: "Sites & Landing Pages",
        subtitle: "Sua presença digital profissional",
        description: "Criamos sites e landing pages que convertem visitantes em clientes. Design moderno, responsivo e otimizado para SEO.",
        price: "A partir de R$ 3.500",
        duration: "15-45 dias",
        breadcrumb: "Sites",
        seo: {
            title: "Criação de Sites | A partir de R$ 3.500 | Andorinha Marketing",
            description: "Sites institucionais e landing pages que convertem. Design responsivo, SEO otimizado e CMS para você gerenciar. Entrega em 15 a 45 dias.",
            keywords: "criação de sites, quanto custa criar site, site institucional, landing page, desenvolvimento web, site responsivo",
            image: "https://andorinha.roilabs.com.br/og/og-sites.png",
        },
        schema: {
            name: "Criação de Sites e Landing Pages",
            description: "Sites institucionais e landing pages que convertem. Design responsivo, SEO otimizado e CMS para você gerenciar. Entrega em 15 a 45 dias.",
            price: "3500",
        },
        includedItems: [
            "Planejamento de arquitetura de informação",
            "Design responsivo (mobile, tablet, desktop)",
            "Até X páginas (conforme pacote)",
            "Sistema de gestão de conteúdo (CMS)",
            "SEO básico (meta tags, sitemap, robots.txt)",
            "Integração com Google Analytics",
            "Formulários de contato",
            "Hospedagem por 1 ano (opcional)",
            "Certificado SSL incluído",
            "Treinamento de uso do CMS",
            "3 rodadas de revisão",
            "30 dias de suporte pós-entrega",
        ],
        processSteps: [
            {
                icon: FileSearch,
                title: "Planejamento",
                description: "Definição de arquitetura, wireframes e fluxo de navegação do site",
                duration: "3-5 dias",
            },
            {
                icon: Layout,
                title: "Design",
                description: "Criação do layout visual seguindo sua identidade de marca",
                duration: "5-7 dias",
            },
            {
                icon: Code,
                title: "Desenvolvimento",
                description: "Programação responsiva com código limpo e otimizado",
                duration: "7-14 dias",
            },
            {
                icon: TestTube,
                title: "Testes",
                description: "Testes em diversos dispositivos e navegadores",
                duration: "2-3 dias",
            },
            {
                icon: Rocket,
                title: "Lançamento",
                description: "Publicação, configuração de DNS e treinamento da equipe",
                duration: "1-2 dias",
            },
        ],
        pricingTiers: [
            {
                name: "Landing Page Express",
                price: "R$ 3.500",
                duration: "15 dias",
                description: "Uma página de alta conversão",
                badge: "Entrada",
                features: [
                    "1 página estratégica",
                    "Design responsivo",
                    "Formulário de contato",
                    "SEO básico",
                    "Integração WhatsApp",
                    "3 rodadas de revisão",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Site Institucional",
                price: "R$ 8.000",
                duration: "21 dias",
                description: "Presença completa online",
                badge: "Mais Popular",
                highlighted: true,
                features: [
                    "Até 5 páginas",
                    "Blog integrado",
                    "CMS para edição",
                    "SEO completo",
                    "Google Analytics",
                    "SSL incluído",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Site Premium",
                price: "R$ 18.000",
                duration: "45 dias",
                description: "Solução completa e personalizada",
                badge: "Premium",
                features: [
                    "Páginas ilimitadas",
                    "Integrações avançadas",
                    "Animações personalizadas",
                    "SEO avançado",
                    "Estratégia de conteúdo",
                    "Hospedagem 1 ano",
                    "60 dias de suporte",
                ],
            },
        ],
        faqItems: [
            {
                question: "Quanto tempo leva para criar um site?",
                answer: "Uma landing page leva em média 15 dias. Sites institucionais básicos levam 21 dias, e sites mais complexos podem levar até 45 dias. Os prazos consideram todas as etapas, do planejamento à publicação.",
            },
            {
                question: "O site será responsivo?",
                answer: "Sim! Todos os nossos sites são 100% responsivos, funcionando perfeitamente em celulares, tablets e desktops. Testamos em diversos dispositivos antes da entrega.",
            },
            {
                question: "Vou conseguir editar o site sozinho?",
                answer: "Sim! Usamos sistemas de gestão de conteúdo (CMS) intuitivos. Após a entrega, fazemos um treinamento para você aprender a atualizar textos, imagens e criar novas páginas.",
            },
            {
                question: "O que é SEO e está incluído?",
                answer: "SEO é a otimização para aparecer no Google. Incluímos SEO básico (meta tags, sitemap, velocidade) em todos os pacotes. O pacote Premium inclui estratégia de palavras-chave e conteúdo otimizado.",
            },
            {
                question: "Preciso contratar hospedagem separada?",
                answer: "Para landing pages e sites básicos, você precisará de hospedagem (indicamos parceiros). O pacote Premium inclui 1 ano de hospedagem. Valores de renovação a partir de R$ 300/ano.",
            },
            {
                question: "Vocês fazem e-commerce/loja virtual?",
                answer: "Sim, desenvolvemos lojas virtuais sob consulta. O investimento começa em R$ 15.000 dependendo do número de produtos e integrações necessárias. Entre em contato para um orçamento personalizado.",
            },
        ],
        cta: {
            title: "Pronto para Ter seu Site?",
            subtitle: "Agende um diagnóstico gratuito e descubra a melhor solução para seu negócio",
        },
    },
    "design-grafico": {
        id: "design-grafico",
        title: "Design Gráfico",
        subtitle: "Materiais visuais de impacto",
        description: "Criamos peças gráficas que comunicam sua mensagem com clareza e estética. Posts, banners, folders, apresentações e muito mais.",
        price: "A partir de R$ 350",
        duration: "3-7 dias",
        breadcrumb: "Design Gráfico",
        seo: {
            title: "Design Gráfico | Peças a partir de R$ 350 | Andorinha Marketing",
            description: "Criação de materiais gráficos: posts para redes sociais, banners, folders, cartões de visita e mais. Entrega em até 5 dias úteis com arquivos editáveis.",
            keywords: "design gráfico, criação de posts, design para redes sociais, material gráfico, banner, folder, cartão de visita",
            image: "https://andorinha.roilabs.com.br/og/og-design-grafico.png",
        },
        schema: {
            name: "Design Gráfico",
            description: "Criação de materiais gráficos: posts para redes sociais, banners, folders, cartões de visita e mais. Entrega em até 5 dias úteis com arquivos editáveis.",
            price: "350",
        },
        includedItems: [
            "Briefing detalhado do projeto",
            "Pesquisa de referências visuais",
            "Desenvolvimento de conceitos",
            "Design em alta resolução",
            "Adaptações para diferentes formatos",
            "Arquivos editáveis (AI, PSD, PDF)",
            "Versões para web e impressão",
            "2 rodadas de revisão",
            "Suporte para impressão",
            "Entrega em até 5 dias úteis",
        ],
        processSteps: [
            {
                icon: MessageSquare,
                title: "Briefing",
                description: "Entendemos suas necessidades, objetivos e público-alvo do material",
                duration: "1 dia",
            },
            {
                icon: Pencil,
                title: "Conceito",
                description: "Desenvolvemos conceitos visuais alinhados com sua marca",
                duration: "1-2 dias",
            },
            {
                icon: Palette,
                title: "Criação",
                description: "Produzimos o design com atenção aos detalhes e qualidade",
                duration: "2-3 dias",
            },
            {
                icon: FileCheck,
                title: "Revisão",
                description: "Ajustamos conforme seu feedback até a aprovação final",
                duration: "1-2 dias",
            },
            {
                icon: Send,
                title: "Entrega",
                description: "Arquivos finalizados em todos os formatos necessários",
                duration: "1 dia",
            },
        ],
        pricingTiers: [
            {
                name: "Avulso",
                price: "R$ 350",
                duration: "3-5 dias",
                description: "Peças individuais",
                badge: "Por Peça",
                features: [
                    "1 peça de design",
                    "Formato único",
                    "2 rodadas de revisão",
                    "Arquivo editável",
                    "Versão web + impressão",
                    "Entrega em 3-5 dias",
                    "Suporte básico",
                ],
            },
            {
                name: "Pacote",
                price: "R$ 1.200",
                duration: "7 dias",
                description: "5 peças com desconto",
                badge: "Mais Popular",
                highlighted: true,
                features: [
                    "5 peças de design",
                    "Múltiplos formatos",
                    "2 rodadas por peça",
                    "Arquivos editáveis",
                    "Versões web + impressão",
                    "Entrega em 7 dias",
                    "Prioridade no atendimento",
                ],
            },
            {
                name: "Mensal",
                price: "R$ 2.500",
                duration: "30 dias",
                description: "Demanda recorrente",
                badge: "Recorrente",
                features: [
                    "10 peças por mês",
                    "Todos os formatos",
                    "Revisões ilimitadas",
                    "Arquivos editáveis",
                    "Banco de imagens",
                    "Entregas semanais",
                    "Suporte prioritário",
                ],
            },
        ],
        faqItems: [
            {
                question: "Que tipos de peças vocês criam?",
                answer: "Criamos posts para redes sociais (feed, stories, carrossel), banners, folders, cartões de visita, flyers, apresentações, catálogos, cardápios, convites, certificados, e-mail marketing, e diversos outros materiais gráficos.",
            },
            {
                question: "Qual o prazo de entrega?",
                answer: "Peças avulsas são entregues em 3-5 dias úteis. Pacotes em até 7 dias úteis. Para urgências (24-48h), aplicamos uma taxa adicional de 50%. No plano mensal, as entregas são semanais.",
            },
            {
                question: "Posso pedir alterações?",
                answer: "Sim! Todos os pacotes incluem rodadas de revisão. No Avulso e Pacote são 2 rodadas por peça. No plano Mensal, as revisões são ilimitadas. Alterações além das rodadas incluídas são cobradas à parte.",
            },
            {
                question: "Vocês seguem minha identidade visual?",
                answer: "Absolutamente! Todas as peças são criadas seguindo seu manual de marca, cores, tipografia e tom de voz. Se você não tiver um manual, podemos criar um padrão visual para manter consistência.",
            },
            {
                question: "Recebo os arquivos editáveis?",
                answer: "Sim, você recebe os arquivos editáveis em AI (Illustrator) ou PSD (Photoshop), além de PDF, PNG e JPG em alta resolução para web e impressão.",
            },
            {
                question: "Como funciona o plano mensal?",
                answer: "Você tem direito a 10 peças por mês com entregas semanais. As peças não utilizadas não acumulam. Ideal para quem tem demanda constante de materiais para redes sociais e campanhas.",
            },
            {
                question: "Vocês fazem impressão?",
                answer: "Não fazemos a impressão, mas entregamos os arquivos preparados (CMYK, sangria, marcas de corte) e podemos indicar gráficas parceiras de confiança com bons preços.",
            },
            {
                question: "Como funciona a contratação avulsa?",
                answer: "Você envia o briefing, aprovamos o orçamento, você faz o pagamento (50% entrada, 50% na entrega) e iniciamos a produção. Simples e direto para demandas pontuais.",
            },
        ],
        cta: {
            title: "Precisa de Materiais Gráficos?",
            subtitle: "Solicite um orçamento e receba em até 24 horas",
        },
    },
    rebranding: {
        id: "rebranding",
        title: "Rebranding Completo",
        subtitle: "Transforme e reposicione sua marca",
        description: "Renovamos sua identidade visual e posicionamento estratégico. Pesquisa, estratégia, nova identidade e plano de transição completo.",
        price: "A partir de R$ 15.000",
        duration: "45-60 dias",
        breadcrumb: "Rebranding",
        seo: {
            title: "Rebranding Completo | Transforme sua Marca | R$ 15.000",
            description: "Reposicionamento e renovação completa da sua marca. Pesquisa, estratégia, nova identidade visual e plano de transição. Projetos de 45 a 60 dias.",
            keywords: "rebranding, quanto custa rebranding, reposicionamento de marca, renovação de marca, reformulação de identidade visual",
            image: "https://andorinha.roilabs.com.br/og/og-rebranding.png",
        },
        schema: {
            name: "Rebranding Completo",
            description: "Reposicionamento e renovação completa da sua marca. Pesquisa, estratégia, nova identidade visual e plano de transição. Projetos de 45 a 60 dias.",
            price: "15000",
        },
        includedItems: [
            "Auditoria de marca atual (análise SWOT)",
            "Pesquisa de mercado aprofundada",
            "Análise de concorrência",
            "Workshops estratégicos com stakeholders",
            "Reposicionamento de marca",
            "Nova identidade visual completa",
            "Arquitetura de marca (se necessário)",
            "Manual de marca extenso",
            "Plano de transição",
            "Redesign de materiais existentes",
            "Aplicações em todos os touchpoints",
            "4 rodadas de revisão",
            "60 dias de suporte pós-entrega",
        ],
        processSteps: [
            {
                icon: Search,
                title: "Auditoria",
                description: "Análise profunda da marca atual, mercado e concorrência",
                duration: "7-10 dias",
            },
            {
                icon: Users,
                title: "Workshops",
                description: "Sessões estratégicas com stakeholders para definir direção",
                duration: "3-5 dias",
            },
            {
                icon: Lightbulb,
                title: "Estratégia",
                description: "Definição de posicionamento, proposta de valor e personalidade",
                duration: "5-7 dias",
            },
            {
                icon: Palette,
                title: "Criação",
                description: "Desenvolvimento da nova identidade visual completa",
                duration: "14-21 dias",
            },
            {
                icon: RefreshCw,
                title: "Transição",
                description: "Plano de implementação e redesign de materiais",
                duration: "7-14 dias",
            },
        ],
        pricingTiers: [
            {
                name: "Básico",
                price: "R$ 15.000",
                duration: "45 dias",
                description: "Renovação visual da marca",
                badge: "Entrada",
                features: [
                    "Auditoria básica",
                    "Nova identidade visual",
                    "Manual de marca",
                    "Redesign de papelaria",
                    "Arquivos editáveis",
                    "4 rodadas de revisão",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Completo",
                price: "R$ 22.000",
                duration: "50 dias",
                description: "Reposicionamento estratégico",
                badge: "Mais Popular",
                highlighted: true,
                features: [
                    "Pesquisa de mercado",
                    "Workshops estratégicos",
                    "Nova identidade completa",
                    "Todas as aplicações",
                    "Plano de transição",
                    "Materiais digitais",
                    "60 dias de suporte",
                ],
            },
            {
                name: "Premium",
                price: "R$ 35.000",
                duration: "60 dias",
                description: "Transformação total",
                badge: "Premium",
                features: [
                    "Tudo do Completo",
                    "Pesquisa aprofundada",
                    "Arquitetura de marca",
                    "Site institucional",
                    "Materiais de marketing",
                    "Treinamento da equipe",
                    "90 dias de suporte",
                ],
            },
        ],
        faqItems: [
            {
                question: "Qual a diferença entre branding e rebranding?",
                answer: "Branding é criar uma marca do zero. Rebranding é reformular uma marca existente - pode ser uma evolução sutil ou uma transformação completa. Envolve análise do que funciona, o que precisa mudar e como fazer a transição.",
            },
            {
                question: "Como sei se preciso de rebranding?",
                answer: "Sinais comuns: sua marca parece desatualizada, você mudou de público-alvo ou posicionamento, houve fusão/aquisição, a marca não reflete mais seus valores, ou você está perdendo relevância para concorrentes.",
            },
            {
                question: "Quanto tempo leva um processo de rebranding?",
                answer: "De 45 a 60 dias dependendo da complexidade. Inclui pesquisa, estratégia, criação e planejamento de transição. Projetos maiores com múltiplas submarcas podem levar mais tempo.",
            },
            {
                question: "Vocês ajudam na transição da marca?",
                answer: "Sim! Criamos um plano de transição detalhado: cronograma de substituição de materiais, comunicação para clientes, orientações para redes sociais e pontos de contato prioritários.",
            },
            {
                question: "O que acontece com os materiais antigos?",
                answer: "Incluímos o redesign dos principais materiais no pacote. Materiais impressos em estoque podem ser usados em paralelo durante a transição. Orientamos sobre como fazer essa mudança de forma suave.",
            },
            {
                question: "Posso manter elementos da marca atual?",
                answer: "Sim! Nem todo rebranding precisa ser radical. Podemos evoluir elementos que funcionam bem e têm reconhecimento, enquanto atualizamos o que está defasado. A decisão vem da análise estratégica.",
            },
        ],
        cta: {
            title: "Pronto para Transformar sua Marca?",
            subtitle: "Agende um diagnóstico gratuito e descubra se é hora de renovar sua identidade",
        },
    },
    video: {
        id: "video",
        title: "Vídeo Institucional",
        subtitle: "Conte sua história em movimento",
        description: "Produzimos vídeos profissionais que apresentam sua empresa, produto ou serviço de forma impactante. Do roteiro à entrega final.",
        price: "A partir de R$ 8.000",
        duration: "30-45 dias",
        breadcrumb: "Vídeo",
        seo: {
            title: "Vídeo Institucional Profissional | A partir de R$ 8.000",
            description: "Vídeos institucionais que contam a história da sua empresa. Roteiro, filmagem profissional, edição e trilha sonora licenciada. Entrega em 30-45 dias.",
            keywords: "vídeo institucional, quanto custa vídeo institucional, produtora de vídeo, vídeo corporativo, vídeo empresarial",
            image: "https://andorinha.roilabs.com.br/og/og-video.png",
        },
        schema: {
            name: "Vídeo Institucional Profissional",
            description: "Vídeos institucionais que contam a história da sua empresa. Roteiro, filmagem profissional, edição e trilha sonora licenciada. Entrega em 30-45 dias.",
            price: "8000",
        },
        includedItems: [
            "Reunião de briefing e alinhamento",
            "Desenvolvimento de roteiro criativo",
            "Pré-produção (locações, casting, cronograma)",
            "Filmagem profissional (1-2 dias)",
            "Edição profissional",
            "Trilha sonora licenciada",
            "Legendas (se necessário)",
            "Motion graphics e animações (conforme pacote)",
            "Correção de cor",
            "2 rodadas de revisão na edição",
            "Entrega em múltiplos formatos (web, redes sociais)",
            "30 dias de suporte pós-entrega",
        ],
        processSteps: [
            {
                icon: FileText,
                title: "Roteiro",
                description: "Desenvolvimento do roteiro criativo alinhado aos objetivos",
                duration: "5-7 dias",
            },
            {
                icon: Video,
                title: "Pré-produção",
                description: "Planejamento de locações, casting e cronograma de filmagem",
                duration: "3-5 dias",
            },
            {
                icon: Film,
                title: "Filmagem",
                description: "Captação profissional com equipamento de alta qualidade",
                duration: "1-2 dias",
            },
            {
                icon: Sparkles,
                title: "Pós-produção",
                description: "Edição, cor, trilha sonora e motion graphics",
                duration: "10-14 dias",
            },
            {
                icon: Send,
                title: "Entrega",
                description: "Arquivos finais em múltiplos formatos e resoluções",
                duration: "2-3 dias",
            },
        ],
        pricingTiers: [
            {
                name: "Básico",
                price: "R$ 8.000",
                duration: "30 dias",
                description: "Vídeo institucional simples",
                badge: "Entrada",
                features: [
                    "Vídeo de até 2 minutos",
                    "1 dia de filmagem",
                    "Roteiro básico",
                    "Edição simples",
                    "Trilha licenciada",
                    "2 revisões",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Profissional",
                price: "R$ 12.000",
                duration: "35 dias",
                description: "Produção completa",
                badge: "Mais Popular",
                highlighted: true,
                features: [
                    "Vídeo de até 3 minutos",
                    "1-2 dias de filmagem",
                    "Roteiro criativo",
                    "Motion graphics",
                    "Correção de cor",
                    "Legendas incluídas",
                    "30 dias de suporte",
                ],
            },
            {
                name: "Premium",
                price: "R$ 18.000",
                duration: "45 dias",
                description: "Produção cinematográfica",
                badge: "Premium",
                features: [
                    "Vídeo de até 5 minutos",
                    "2 dias de filmagem",
                    "Roteiro + storyboard",
                    "Animações avançadas",
                    "Versões para redes",
                    "Making of incluído",
                    "60 dias de suporte",
                ],
            },
        ],
        faqItems: [
            {
                question: "Quanto tempo leva para produzir um vídeo institucional?",
                answer: "O prazo médio é de 30 a 45 dias, incluindo roteiro, pré-produção, filmagem e pós-produção. Vídeos mais complexos ou com animações avançadas podem levar até 60 dias.",
            },
            {
                question: "Vocês cuidam de tudo ou preciso providenciar algo?",
                answer: "Cuidamos de toda a produção: roteiro, equipamento, equipe, locação (se externa), trilha sonora e edição. Você só precisa disponibilizar acesso à empresa e participar das gravações, se necessário.",
            },
            {
                question: "Posso usar o vídeo em qualquer lugar?",
                answer: "Sim! Você recebe os direitos totais do vídeo. Entregamos em múltiplos formatos otimizados para site, YouTube, Instagram, LinkedIn e outras plataformas.",
            },
            {
                question: "A trilha sonora é licenciada?",
                answer: "Sim, usamos apenas trilhas com licença comercial, sem risco de problemas de direitos autorais. Você pode usar o vídeo em campanhas pagas sem preocupação.",
            },
            {
                question: "Quantas revisões estão incluídas?",
                answer: "Todos os pacotes incluem 2 rodadas de revisão na edição. Alterações adicionais são cobradas à parte. Por isso, investimos bastante tempo no alinhamento do roteiro antes da filmagem.",
            },
            {
                question: "Vocês fazem vídeos para redes sociais?",
                answer: "Sim! Além do vídeo principal, podemos criar versões curtas (15s, 30s, 60s) otimizadas para Instagram, TikTok e outras redes. Consulte valores adicionais.",
            },
        ],
        cta: {
            title: "Pronto para Contar sua História?",
            subtitle: "Agende um diagnóstico gratuito e descubra como um vídeo pode transformar sua comunicação",
        },
    },
    "captacao-conteudo": {
        id: "captacao-conteudo",
        title: "Captação Estratégica de Conteúdo",
        subtitle: "10 vídeos profissionais em 1 dia",
        description: "Um pacote pontual para quem precisa de um upgrade rápido, estratégico e acessível nas redes sociais. Em um único dia de gravação você sai com 10 vídeos profissionais.",
        price: "R$ 1.797,00",
        duration: "1 dia de gravação",
        breadcrumb: "Captação de Conteúdo",
        seo: {
            title: "Captação de Conteúdo para Redes Sociais | R$ 1.797",
            description: "10 vídeos estratégicos em 1 dia de gravação. Roteiro, captação com filmmaker e edição inclusos. Ideal para renovar suas redes sociais.",
            keywords: "captação de conteúdo, vídeos para instagram, filmmaker, produção de conteúdo, reels",
            image: "https://andorinha.roilabs.com.br/og/og-captacao.png",
        },
        schema: {
            name: "Captação Estratégica de Conteúdo",
            description: "10 vídeos estratégicos em 1 dia de gravação. Roteiro, captação com filmmaker e edição inclusos.",
            price: "1797",
        },
        includedItems: [
            "10 vídeos estratégicos para redes sociais",
            "Roteirização completa",
            "Sessão de gravação de até 4 horas",
            "Filmmaker profissional",
            "Equipamentos (luzes, microfone, iPhone última geração)",
            "Edição dinâmica (cortes, cor, som)",
            "1 rodada de alterações gratuita",
        ],
        processSteps: [
            {
                icon: Users,
                title: "Onboarding",
                description: "Reunião de alinhamento de objetivos e tom de voz",
                duration: "1 hora",
            },
            {
                icon: MessageSquare,
                title: "Grupo",
                description: "Criação de grupo para comunicação ágil",
                duration: "Imediato",
            },
            {
                icon: FileText,
                title: "Roteirização",
                description: "Criação e aprovação dos roteiros dos 10 vídeos",
                duration: "Pré-gravação",
            },
            {
                icon: Video,
                title: "Gravação",
                description: "Sessão de até 4 horas com filmmaker",
                duration: "1 dia",
            },
            {
                icon: Sparkles,
                title: "Edição",
                description: "Edição dinâmica otimizada para Reels/TikTok",
                duration: "Pós-gravação",
            },
        ],
        pricingTiers: [
            {
                name: "Pacote Black",
                price: "R$ 1.797,00",
                duration: "Pontual",
                description: "Investimento promocional",
                badge: "Black Friday",
                highlighted: true,
                features: [
                    "10 vídeos editados",
                    "4h de gravação",
                    "Roteiros inclusos",
                    "Edição profissional",
                    "Equipamento incluso",
                    "1 rodada de revisão",
                ],
            },
        ],
        faqItems: [
            {
                question: "Quantos vídeos eu recebo?",
                answer: "Você recebe 10 vídeos editados e prontos para postar nas redes sociais.",
            },
            {
                question: "Eu preciso escrever os roteiros?",
                answer: "Não! Nós fazemos a roteirização completa baseada no seu objetivo, mas você aprova tudo antes da gravação.",
            },
            {
                question: "Onde é feita a gravação?",
                answer: "A gravação é feita no seu local (escritório, loja, consultório) ou em local a combinar.",
            },
        ],
        cta: {
            title: "Quer renovar suas redes?",
            subtitle: "Garanta seus 10 vídeos profissionais agora mesmo",
        },
    },
    "cobertura-eventos": {
        id: "cobertura-eventos",
        title: "Cobertura Mobile de Eventos",
        subtitle: "Aftermovie em 24h",
        description: "Cobertura completa do seu evento com olhar profissional em formato mobile. Entregamos um aftermovie dinâmico em até 24 horas para você aproveitar o buzz.",
        price: "R$ 1.297,00",
        duration: "Até 4h30 de evento",
        breadcrumb: "Cobertura de Eventos",
        seo: {
            title: "Cobertura de Eventos Mobile | Aftermovie em 24h | R$ 1.297",
            description: "Cobertura profissional de eventos com entrega de aftermovie em 24 horas. Ideal para eventos corporativos e sociais.",
            keywords: "cobertura de eventos, aftermovie, vídeo evento, filmmaker evento, reels evento",
            image: "https://andorinha.roilabs.com.br/og/og-eventos.png",
        },
        schema: {
            name: "Cobertura Mobile de Eventos",
            description: "Cobertura completa do seu evento com olhar profissional em formato mobile. Entregamos um aftermovie dinâmico em até 24 horas.",
            price: "1297",
        },
        includedItems: [
            "Cobertura mobile de até 4h30",
            "Chegada antecipada (making of/decor)",
            "Registro de momentos chave e bastidores",
            "Aftermovie vertical (Reels/TikTok)",
            "Edição dinâmica",
            "Entrega em até 24h",
        ],
        processSteps: [
            {
                icon: MessageSquare,
                title: "Alinhamento",
                description: "Definição de objetivos e mood do vídeo",
                duration: "Pré-evento",
            },
            {
                icon: Clock,
                title: "Chegada",
                description: "Chegada antecipada para captar detalhes",
                duration: "Dia do evento",
            },
            {
                icon: Video,
                title: "Cobertura",
                description: "Captação ao vivo por até 4h30",
                duration: "Durante evento",
            },
            {
                icon: Sparkles,
                title: "Edição",
                description: "Seleção e edição expressa dos melhores momentos",
                duration: "Pós-evento",
            },
            {
                icon: Send,
                title: "Entrega",
                description: "Vídeo finalizado em até 24 horas",
                duration: "24h após",
            },
        ],
        pricingTiers: [
            {
                name: "Cobertura Express",
                price: "R$ 1.297,00",
                duration: "24h entrega",
                description: "Registro rápido e profissional",
                badge: "Agilidade",
                highlighted: true,
                features: [
                    "4h30 de cobertura",
                    "Aftermovie editado",
                    "Formato vertical",
                    "Entrega em 24h",
                    "Captação iPhone Pro",
                ],
            },
        ],
        faqItems: [
            {
                question: "Qual o formato do vídeo entregue?",
                answer: "Entregamos em formato vertical (9:16), ideal para Reels, TikTok e Stories.",
            },
            {
                question: "Vocês entregam as fotos também?",
                answer: "O foco é vídeo (aftermovie), mas podemos combinar a entrega de alguns takes brutos se alinhado previamente.",
            },
        ],
        cta: {
            title: "Vai fazer um evento?",
            subtitle: "Garanta o registro profissional e receba o vídeo no dia seguinte",
        },
    },
    "storymaker": {
        id: "storymaker",
        title: "StoryMaker em Tempo Real",
        subtitle: "Cobertura de Stories ao vivo",
        description: "Nós cuidamos dos seus Stories enquanto você curte o evento. Gravação, edição e postagem em tempo real para engajar sua audiência.",
        price: "R$ 1.497,00",
        duration: "Durante o evento",
        breadcrumb: "StoryMaker",
        seo: {
            title: "StoryMaker | Cobertura de Stories em Tempo Real | R$ 1.497",
            description: "Cobertura de eventos via Stories em tempo real. Engaje sua audiência enquanto aproveita o evento.",
            keywords: "storymaker, stories ao vivo, cobertura instagram, social media evento",
            image: "https://andorinha.roilabs.com.br/og/og-storymaker.png",
        },
        schema: {
            name: "StoryMaker em Tempo Real",
            description: "Gravação, edição e postagem de Stories em tempo real durante seu evento.",
            price: "1497",
        },
        includedItems: [
            "Cobertura estratégica em tempo real",
            "Gravação e edição rápida de Stories",
            "Publicação imediata no perfil",
            "Uso de recursos (enquetes, box, etc)",
            "Foco na narrativa do evento",
            "Mobile de última geração",
        ],
        processSteps: [
            {
                icon: MessageSquare,
                title: "Alinhamento",
                description: "Definição de perfil, senha e diretrizes",
                duration: "Pré-evento",
            },
            {
                icon: Video,
                title: "Cobertura",
                description: "Registro e postagem ao vivo",
                duration: "Durante evento",
            },
            {
                icon: Sparkles,
                title: "Storytelling",
                description: "Construção de narrativa com início, meio e fim",
                duration: "Durante evento",
            },
            {
                icon: CheckCircle2,
                title: "Finalização",
                description: "Destaques e encerramento da cobertura",
                duration: "Pós-evento",
            },
        ],
        pricingTiers: [
            {
                name: "StoryMaker Live",
                price: "R$ 1.497,00",
                duration: "Evento",
                description: "Cobertura completa em tempo real",
                badge: "Ao Vivo",
                highlighted: true,
                features: [
                    "Stories ilimitados (com bom senso)",
                    "Postagem em tempo real",
                    "Interação com público",
                    "Narrativa estratégica",
                    "Você livre do celular",
                ],
            },
        ],
        faqItems: [
            {
                question: "Preciso passar a senha do Instagram?",
                answer: "Sim, precisamos estar logados no dispositivo de captura para postar em tempo real com agilidade.",
            },
            {
                question: "Vocês respondem directs?",
                answer: "O foco é a produção de conteúdo. A interação via direct continua com sua equipe ou você, mas podemos combinar exceções.",
            },
        ],
        cta: {
            title: "Quer aproveitar sua festa?",
            subtitle: "Deixe os Stories com a gente e curta o momento",
        },
    },
    "video-institucional-express": {
        id: "video-institucional-express",
        title: "Vídeo Institucional Express",
        subtitle: "Apresente sua empresa com profissionalismo",
        description: "Vídeo institucional de até 3 minutos para apresentar a essência da sua empresa. Ideal para site, apresentações e redes sociais.",
        price: "R$ 997,00",
        duration: "Entrega rápida",
        breadcrumb: "Vídeo Express",
        seo: {
            title: "Vídeo Institucional Express | R$ 997 | Andorinha Marketing",
            description: "Vídeo institucional profissional de até 3 minutos. Roteiro, gravação e edição inclusos. Ótimo custo-benefício.",
            keywords: "vídeo institucional barato, vídeo empresa, apresentação comercial, vídeo marketing",
            image: "https://andorinha.roilabs.com.br/og/og-video-express.png",
        },
        schema: {
            name: "Vídeo Institucional Express",
            description: "Vídeo institucional de até 3 minutos para apresentar a essência da sua empresa.",
            price: "997",
        },
        includedItems: [
            "Reunião de briefing",
            "Roteiro base",
            "Captação com filmmaker profissional",
            "Gravação na empresa",
            "Edição completa (até 3 min)",
            "Trilha sonora",
            "Inserção de logo e textos",
        ],
        processSteps: [
            {
                icon: MessageSquare,
                title: "Briefing",
                description: "Entendimento do objetivo e mensagem",
                duration: "Início",
            },
            {
                icon: FileText,
                title: "Roteiro",
                description: "Estruturação das cenas e falas",
                duration: "Pré-gravação",
            },
            {
                icon: Video,
                title: "Gravação",
                description: "Captação das imagens e depoimentos",
                duration: "1 dia",
            },
            {
                icon: Sparkles,
                title: "Edição",
                description: "Montagem, cor e finalização",
                duration: "Pós-gravação",
            },
            {
                icon: Send,
                title: "Entrega",
                description: "Vídeo pronto para uso",
                duration: "Final",
            },
        ],
        pricingTiers: [
            {
                name: "Institucional Express",
                price: "R$ 997,00",
                duration: "Rápido",
                description: "Custo-benefício imbatível",
                badge: "Oferta",
                highlighted: true,
                features: [
                    "Vídeo até 3 min",
                    "Roteiro incluso",
                    "Captação profissional",
                    "Edição completa",
                    "Trilha sonora",
                ],
            },
        ],
        faqItems: [
            {
                question: "Qual a duração do vídeo?",
                answer: "O vídeo final terá até 3 minutos de duração.",
            },
            {
                question: "Inclui locução?",
                answer: "Este pacote foca em imagens e trilha, ou depoimentos gravados no local. Locução profissional off pode ser contratada à parte.",
            },
        ],
        cta: {
            title: "Precisa de um vídeo institucional?",
            subtitle: "Comece agora com um investimento acessível",
        },
    },
};

export function getServiceData(id: string): ServiceData | undefined {
    return servicesData[id];
}

export function getAllServices(): ServiceData[] {
    return Object.values(servicesData);
}
