export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    category: string;
    duration?: string;
    investment?: string;
    image: string;
    challenge: string;
    result?: string; // Used in listing
    metric?: string; // Used in listing
    solution?: string; // Used in detail
    results?: string[]; // Used in detail
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    deliverables?: string[];
}

export const casesData: CaseStudy[] = [
    {
        id: "techstart-branding",
        title: "Nova Identidade para Startup de Tech",
        client: "TechStart",
        category: "Branding",
        duration: "25 dias",
        investment: "R$ 9.500",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
        challenge: "A TechStart, startup de tecnologia em fase de captação, precisava de uma identidade visual que transmitisse inovação, confiança e profissionalismo para impressionar investidores e atrair os primeiros clientes enterprise.",
        result: "Identidade completa em 25 dias com manual de marca extenso.",
        metric: "+40% em conversão de pitch",
        solution: "Desenvolvemos uma identidade visual moderna e versátil, com logo que representa conexão e crescimento. A paleta de cores combina azul (confiança) com verde (inovação). Criamos aplicações para pitch deck, cartões, assinaturas de email e templates para redes sociais.",
        results: [
            "40% de aumento na taxa de conversão de pitches para investidores",
            "Captação de R$ 2.5M em rodada seed",
            "Fechamento de 3 contratos enterprise no primeiro trimestre",
            "Reconhecimento da marca em eventos de tecnologia",
        ],
        testimonial: {
            quote: "A identidade visual foi fundamental para nossa credibilidade. Os investidores comentaram sobre o profissionalismo da apresentação.",
            author: "Lucas Ferreira",
            role: "CEO, TechStart",
        },
        deliverables: [
            "Logotipo em versões horizontal, vertical e símbolo",
            "Paleta de cores completa (primárias e secundárias)",
            "Tipografia institucional",
            "Manual de identidade visual (48 páginas)",
            "Papelaria completa (cartão, papel timbrado, envelope)",
            "Template de pitch deck (30 slides)",
            "Assinaturas de email",
            "Templates para redes sociais",
        ],
    },
    {
        id: "consultoria-site",
        title: "Site Institucional de Alta Conversão",
        client: "Almeida Consultoria",
        category: "Sites",
        duration: "30 dias",
        investment: "R$ 12.000",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
        challenge: "Consultoria empresarial com 15 anos de mercado precisava modernizar sua presença digital. O site antigo não gerava leads e não refletia a qualidade dos serviços oferecidos.",
        result: "Site responsivo com blog integrado e automação de marketing.",
        metric: "+180% leads qualificados",
        solution: "Criamos um site institucional moderno com foco em conversão. Arquitetura de informação pensada para a jornada do cliente, com CTAs estratégicos e formulários otimizados. Integração com RD Station para automação de marketing.",
        results: [
            "180% de aumento em leads qualificados",
            "Redução de 40% no custo por lead",
            "Tempo médio no site de 3:45 min (era 45 seg)",
            "Taxa de conversão de 4.2% (média do setor: 2.1%)",
        ],
        testimonial: {
            quote: "O novo site transformou nossa captação de clientes. Antes dependíamos só de indicação, agora temos um fluxo constante de leads qualificados.",
            author: "Ricardo Almeida",
            role: "Diretor, Almeida Consultoria",
        },
        deliverables: [
            "Site responsivo com 8 páginas",
            "Blog integrado com CMS",
            "Formulários inteligentes",
            "Integração com RD Station",
            "Google Analytics 4 configurado",
            "SEO on-page completo",
            "Certificado SSL",
            "Treinamento de 2 horas",
        ],
    },
    {
        id: "restaurante-video",
        title: "Vídeo Institucional Premium",
        client: "Bistrô Jardim",
        category: "Vídeo",
        duration: "35 dias",
        investment: "R$ 15.000",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop",
        challenge: "Restaurante de alta gastronomia queria atrair público qualificado e aumentar reservas. Precisavam mostrar a experiência completa: ambiente, pratos, equipe e a história por trás do negócio.",
        result: "Vídeo de 2 minutos com filmagem em 4K e drone.",
        metric: "+65% reservas online",
        solution: "Produzimos vídeo institucional de 2 minutos com filmagem em 4K, incluindo tomadas aéreas com drone. Roteiro focado em storytelling emocional, destacando a paixão do chef e os ingredientes selecionados.",
        results: [
            "65% de aumento em reservas online",
            "150K visualizações orgânicas no Instagram",
            "Matéria em revista gastronômica local",
            "Aumento de 30% no ticket médio",
        ],
        testimonial: {
            quote: "O vídeo capturou exatamente a essência do Bistrô. Clientes chegam já sabendo o que esperar e saem encantados.",
            author: "Chef Marina Costa",
            role: "Proprietária, Bistrô Jardim",
        },
        deliverables: [
            "Vídeo institucional (2 min)",
            "Versão curta para redes (30 seg)",
            "Versão stories (15 seg)",
            "Tomadas aéreas com drone",
            "Trilha sonora licenciada",
            "Legendas em português",
            "Arquivos em 4K e Full HD",
            "Fotos still da produção",
        ],
    },
    {
        id: "industria-rebranding",
        title: "Reposicionamento de Marca Industrial",
        client: "MetalPro Indústria",
        category: "Rebranding",
        duration: "50 dias",
        investment: "R$ 28.000",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
        challenge: "Indústria metalúrgica com 30 anos de mercado precisava modernizar sua marca para competir com novos players, sem perder o reconhecimento construído ao longo de décadas.",
        result: "Evolução da identidade mantendo elementos históricos.",
        metric: "+25% novos contratos B2B",
        solution: "Realizamos evolução da marca mantendo elementos históricos reconhecíveis. Workshops com stakeholders para definir novo posicionamento. Nova identidade visual com sistema flexível para diferentes aplicações industriais.",
        results: [
            "25% de aumento em novos contratos B2B",
            "Participação em 3 feiras internacionais",
            "Atração de talentos qualificados (RH)",
            "Valorização percebida pelos clientes atuais",
        ],
        testimonial: {
            quote: "Conseguiram modernizar nossa marca respeitando nossa história. Os clientes antigos reconhecem, os novos se impressionam.",
            author: "João Carlos Silva",
            role: "Diretor Industrial, MetalPro",
        },
        deliverables: [
            "Auditoria de marca completa",
            "Pesquisa com stakeholders",
            "Nova identidade visual",
            "Manual de marca (72 páginas)",
            "Redesign de papelaria",
            "Sinalização industrial",
            "Uniformes e EPIs",
            "Plano de transição",
        ],
    },
    {
        id: "ecommerce-design",
        title: "Materiais de Campanha Sazonal",
        client: "ModaFit Store",
        category: "Design",
        duration: "5 dias",
        investment: "R$ 1.800",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        challenge: "E-commerce de moda fitness precisava de materiais para campanha de Black Friday com prazo apertado. Necessidade de manter consistência visual em múltiplos canais.",
        result: "30 peças para redes sociais e banners em 5 dias.",
        metric: "+120% vendas no período",
        solution: "Criamos pacote completo de 30 peças para a campanha: posts para Instagram e Facebook, stories, banners para site e email marketing. Tudo seguindo a identidade visual da marca com elementos temáticos.",
        results: [
            "120% de aumento em vendas no período",
            "Melhor Black Friday da história da loja",
            "38% de taxa de abertura nos emails",
            "Engajamento 3x maior nas redes",
        ],
        testimonial: {
            quote: "Entregaram tudo no prazo com qualidade impecável. A campanha foi um sucesso absoluto!",
            author: "Camila Santos",
            role: "Fundadora, ModaFit Store",
        },
        deliverables: [
            "15 posts para feed (Instagram/Facebook)",
            "10 stories animados",
            "3 banners para site (hero, popup, footer)",
            "2 templates de email marketing",
            "Arquivos editáveis",
            "Versões para diferentes formatos",
        ],
    },
    {
        id: "clinica-branding",
        title: "Identidade Visual para Clínica",
        client: "Clínica Vida Plena",
        category: "Branding",
        duration: "28 dias",
        investment: "R$ 8.500",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop",
        challenge: "Nova clínica médica multidisciplinar precisava de identidade que transmitisse acolhimento, profissionalismo e cuidado humanizado para se diferenciar no mercado competitivo.",
        result: "Branding completo com aplicação em sinalização e uniformes.",
        metric: "+50% agendamentos",
        solution: "Desenvolvemos identidade com cores suaves que transmitem calma e confiança. Logo simboliza cuidado e proteção. Aplicamos em toda comunicação: sinalização, uniformes, materiais impressos e digitais.",
        results: [
            "50% de aumento em agendamentos",
            "NPS de 92 pontos",
            "Reconhecimento imediato da marca na região",
            "Elogios espontâneos de pacientes sobre o ambiente",
        ],
        testimonial: {
            quote: "A identidade visual reflete exatamente o que queremos transmitir: cuidado e profissionalismo. Os pacientes se sentem acolhidos desde a primeira impressão.",
            author: "Dra. Ana Paula Mendes",
            role: "Diretora Médica, Clínica Vida Plena",
        },
        deliverables: [
            "Logotipo e variações",
            "Paleta de cores (com significados)",
            "Tipografia institucional",
            "Manual de identidade visual",
            "Papelaria médica (receituário, cartões)",
            "Sinalização interna",
            "Uniformes da equipe",
            "Templates para redes sociais",
        ],
    },
];

export function getCaseStudy(id: string): CaseStudy | undefined {
    return casesData.find((c) => c.id === id);
}

export function getAllCaseStudies(): CaseStudy[] {
    return casesData;
}
