import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting service updates...');

    // 1. Create 'fotografia' Service
    const fotografiaService = {
        id: 'fotografia',
        title: 'Fotografia Profissional',
        subtitle: 'Imagens que vendem',
        description: 'Ensaios corporativos, fotografia de produtos e cobertura de eventos com olhar estratégico e qualidade publicitária.',
        price: 'A partir de R$ 897',
        duration: 'Conforme projeto',
        breadcrumb: 'Fotografia',
        seo: {
            title: 'Fotografia Profissional | Ensaios e Produtos | Andorinha Audiovisual',
            description: 'Fotografia profissional para empresas. Ensaios corporativos, fotos de produtos (still) e cobertura de eventos. Qualidade publicitária para sua marca.',
            keywords: 'fotografia corporativa, fotografo profissional, fotos de produtos, ensaio business, fotografia publicitaria',
            image: 'https://andorinha.roilabs.com.br/og/og-fotografia.png',
        },
        schema: {
            name: 'Fotografia Profissional',
            description: 'Ensaios corporativos, fotografia de produtos e cobertura de eventos com olhar estratégico.',
            price: '897',
        },
        includedItems: [
            'Briefing e direção de fotografia',
            'Iluminação profissional',
            'Tratamento de imagem high-end',
            'Entrega em alta e baixa resolução',
            'Galeria online para seleção',
            'Direitos de uso comercial',
        ],
        processSteps: [
            {
                iconName: 'MessageSquare',
                title: 'Briefing',
                description: 'Alinhamento do estilo, referências e objetivos das fotos',
                duration: 'Pré-produção',
            },
            {
                iconName: 'Camera',
                title: 'Sessão',
                description: 'Dia do ensaio com direção e iluminação profissional',
                duration: '1 dia',
            },
            {
                iconName: 'FileCheck',
                title: 'Seleção',
                description: 'Você escolhe as melhores fotos em nossa galeria online',
                duration: '2-3 dias',
            },
            {
                iconName: 'Sparkles',
                title: 'Tratamento',
                description: 'Edição profissional de cor, luz e pele (se necessário)',
                duration: '3-5 dias',
            },
            {
                iconName: 'Send',
                title: 'Entrega',
                description: 'Envio dos arquivos finais prontos para uso',
                duration: 'Final',
            },
        ],
        pricingTiers: [
            {
                name: 'Ensaio Express',
                price: 'R$ 897',
                duration: '1h sessão',
                description: 'Para perfis profissionais',
                badge: 'Entrada',
                features: [
                    '1 hora de ensaio',
                    '1 locação',
                    '10 fotos tratadas',
                    '2 trocas de roupa',
                    'Entrega em 5 dias',
                ],
            },
            {
                name: 'Corporativo Pro',
                price: 'R$ 1.597',
                duration: '3h sessão',
                description: 'Banco de imagens da empresa',
                badge: 'Mais Popular',
                highlighted: true,
                features: [
                    '3 horas de ensaio',
                    'Na sua empresa',
                    '30 fotos tratadas',
                    'Fotos da equipe e ambiente',
                    'Entrega em 7 dias',
                ],
            },
            {
                name: 'E-commerce',
                price: 'R$ 2.497',
                duration: 'Diária',
                description: 'Fotos de produtos (Still)',
                badge: 'Vendas',
                features: [
                    'Diária de 6 horas',
                    'Fundo infinito ou ambientado',
                    'Até 50 produtos',
                    'Tratamento publicitário',
                    'Entrega em 10 dias',
                ],
            },
        ],
        faqItems: [
            {
                question: 'Vocês têm estúdio próprio?',
                answer: 'Sim, temos estúdio parceiro equipado, mas a maioria dos nossos ensaios corporativos é feita na própria empresa do cliente para trazer mais autenticidade.',
            },
            {
                question: 'Posso escolher as fotos?',
                answer: 'Sim! Após o ensaio, enviamos uma galeria online com todas as fotos (com marca d\'água) para você selecionar as contratadas para tratamento.',
            },
            {
                question: 'Vocês entregam as fotos sem edição?',
                answer: 'Não entregamos arquivos RAW ou sem tratamento, pois a edição é parte fundamental da nossa assinatura visual e qualidade.',
            },
        ],
        cta: {
            title: 'Precisa de fotos profissionais?',
            subtitle: 'Agende seu ensaio e valorize sua imagem profissional',
        },
    };

    await prisma.service.upsert({
        where: { id: 'fotografia' },
        update: fotografiaService,
        create: fotografiaService,
    });
    console.log('Upserted service: fotografia');

    // 2. Update 'captacao-conteudo'
    const captacaoConteudoTiers = [
        {
            name: 'Start',
            price: 'R$ 997',
            duration: 'Pontual',
            description: 'Para quem está começando',
            badge: 'Entrada',
            features: [
                '5 vídeos editados (Reels)',
                '2h de captação',
                'Roteiros inclusos',
                'Edição profissional',
                '1 locação',
            ],
        },
        {
            name: 'Creator',
            price: 'R$ 1.797',
            duration: 'Mensal',
            description: 'Conteúdo para o mês todo',
            badge: 'Mais Popular',
            highlighted: true,
            features: [
                '10 vídeos editados',
                '4h de captação',
                'Roteiros estratégicos',
                'Edição dinâmica',
                'Equipamento completo',
                '1 rodada de revisão',
            ],
        },
        {
            name: 'Authority',
            price: 'R$ 2.997',
            duration: 'Produção',
            description: 'Vídeo + Fotos Profissionais',
            badge: 'Completo',
            features: [
                '20 vídeos editados',
                '6h de captação',
                '50 fotos profissionais',
                'Drone (se aplicável)',
                'Maquiagem inclusa',
                'Prioridade na entrega',
            ],
        },
    ];

    await prisma.service.update({
        where: { id: 'captacao-conteudo' },
        data: { pricingTiers: captacaoConteudoTiers },
    });
    console.log('Updated pricing for: captacao-conteudo');

    // 3. Update 'cobertura-eventos'
    const coberturaEventosTiers = [
        {
            name: 'Flash',
            price: 'R$ 897',
            duration: '2h evento',
            description: 'Registro rápido',
            badge: 'Econômico',
            features: [
                '2h de cobertura',
                '1 Aftermovie (1 min)',
                'Formato vertical',
                'Entrega em 48h',
                'Captação mobile',
            ],
        },
        {
            name: 'Express',
            price: 'R$ 1.297',
            duration: '4h30 evento',
            description: 'O ideal para a maioria',
            badge: 'Mais Popular',
            highlighted: true,
            features: [
                '4h30 de cobertura',
                'Aftermovie dinâmico',
                'Stories em tempo real (básico)',
                'Entrega em 24h',
                'Captação iPhone Pro',
            ],
        },
        {
            name: 'Completo',
            price: 'R$ 2.497',
            duration: '8h evento',
            description: 'Cobertura total',
            badge: 'Premium',
            features: [
                'Até 8h de cobertura',
                'Aftermovie longo + curto',
                'Entrevistas com convidados',
                'Fotos dos melhores momentos',
                'Entrega prioritária',
            ],
        },
    ];

    await prisma.service.update({
        where: { id: 'cobertura-eventos' },
        data: { pricingTiers: coberturaEventosTiers },
    });
    console.log('Updated pricing for: cobertura-eventos');

    // 4. Update 'storymaker'
    const storymakerTiers = [
        {
            name: 'Lite',
            price: 'R$ 997',
            duration: '4h evento',
            description: 'Cobertura essencial',
            badge: 'Entrada',
            features: [
                '4h de presença',
                '15 Stories postados',
                'Fotos básicas',
                'Sem edição complexa',
                'Postagem imediata',
            ],
        },
        {
            name: 'Live',
            price: 'R$ 1.497',
            duration: 'Evento completo',
            description: 'Cobertura full time',
            badge: 'Recomendado',
            highlighted: true,
            features: [
                'Até 6h de presença',
                'Stories ilimitados',
                'Narrativa estratégica',
                'Interação com público',
                'Você livre do celular',
            ],
        },
        {
            name: 'Pro',
            price: 'R$ 2.497',
            duration: 'Premium',
            description: 'Takeover completo',
            badge: 'VIP',
            features: [
                'Cobertura de 2 dias (se houver)',
                'Stories + Reels no Feed',
                'Design nos stories',
                'Relatório de engajamento',
                '2 profissionais',
            ],
        },
    ];

    await prisma.service.update({
        where: { id: 'storymaker' },
        data: { pricingTiers: storymakerTiers },
    });
    console.log('Updated pricing for: storymaker');

    // 5. Update 'video-institucional-express'
    const videoExpressTiers = [
        {
            name: 'Express',
            price: 'R$ 997',
            duration: 'Rápido',
            description: 'Custo-benefício',
            badge: 'Entrada',
            highlighted: true,
            features: [
                'Vídeo até 3 min',
                'Roteiro base',
                'Captação na empresa (2h)',
                'Edição cortes secos',
                'Trilha branca',
            ],
        },
        {
            name: 'Plus',
            price: 'R$ 1.997',
            duration: 'Profissional',
            description: 'Mais elaborado',
            badge: 'Qualidade',
            features: [
                'Vídeo até 3 min',
                'Roteiro personalizado',
                'Locução profissional (Off)',
                'Motion Graphics básicos',
                'Correção de cor avançada',
            ],
        },
        {
            name: 'Premium',
            price: 'R$ 3.497',
            duration: 'Cinematográfico',
            description: 'Produção completa',
            badge: 'Top',
            features: [
                'Vídeo até 5 min',
                'Imagens de Drone',
                'Roteiro storytelling',
                'Entrevistas dirigidas',
                'Teaser para redes sociais',
            ],
        },
    ];

    await prisma.service.update({
        where: { id: 'video-institucional-express' },
        data: { pricingTiers: videoExpressTiers },
    });
    console.log('Updated pricing for: video-institucional-express');

    console.log('All service updates completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
