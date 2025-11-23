"use client";

import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Globe, Video, RefreshCw, Image as ImageIcon, Camera, Smartphone, Film, Clapperboard } from "lucide-react";

const services = [
    {
        icon: Palette,
        title: "Branding",
        description: "Criação de identidade visual completa, desde o logo até o manual da marca. Construímos marcas memoráveis.",
        href: "/servicos/branding",
    },
    {
        icon: Globe,
        title: "Sites & Landing Pages",
        description: "Desenvolvimento de sites profissionais, rápidos e otimizados para conversão. Sua presença digital levada a sério.",
        href: "/servicos/sites",
    },
    {
        icon: Video,
        title: "Vídeo Institucional",
        description: "Produção de vídeos de alta qualidade para contar a história da sua empresa e engajar seu público.",
        href: "/servicos/video",
    },
    {
        icon: RefreshCw,
        title: "Rebranding",
        description: "Renovação estratégica da sua marca para se alinhar com novos objetivos e momentos de mercado.",
        href: "/servicos/rebranding",
    },
    {
        icon: ImageIcon,
        title: "Design Gráfico",
        description: "Materiais gráficos para redes sociais, apresentações e comunicação interna com design premium.",
        href: "/servicos/design-grafico",
    },
    {
        icon: Camera,
        title: "Fotografia Corporativa",
        description: "Ensaios fotográficos profissionais para sua equipe e ambiente de trabalho. Humanize sua marca.",
        href: "/servicos/fotografia",
    },
    {
        icon: Smartphone,
        title: "Captação de Conteúdo",
        description: "10 vídeos estratégicos gravados em um único dia para suas redes sociais. Roteiro e edição inclusos.",
        href: "/servicos/captacao-conteudo",
    },
    {
        icon: Film,
        title: "Cobertura de Eventos",
        description: "Cobertura mobile profissional com entrega de aftermovie em 24 horas. Ideal para Reels e TikTok.",
        href: "/servicos/cobertura-eventos",
    },
    {
        icon: Clapperboard,
        title: "StoryMaker",
        description: "Cobertura de Stories em tempo real para você curtir o evento. Postagem imediata e profissional.",
        href: "/servicos/storymaker",
    },
    {
        icon: Video,
        title: "Vídeo Institucional Express",
        description: "Vídeo institucional de até 3 minutos com excelente custo-benefício. Roteiro e edição ágil.",
        href: "/servicos/video-institucional-express",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-blue to-accent-blue pattern-andorinha">
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 animate-fade-in">
                        Nossas Soluções
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-slide-up">
                        Estratégias completas de audiovisual estratégico para impulsionar o crescimento do seu negócio.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Link key={index} href={service.href} className="group">
                                <MagicCard
                                    className="h-full p-8 flex flex-col items-start gap-4 transition-all duration-300 group-hover:-translate-y-2"
                                    gradientColor="#262626"
                                    gradientOpacity={0.1}
                                >
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div
                                        className="mt-auto pt-4 flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                                        onClick={() => trackEvent({
                                            action: 'click',
                                            category: 'service_card',
                                            label: service.title
                                        })}
                                    >
                                        Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </MagicCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Pronto para transformar seu negócio?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Agende um diagnóstico gratuito e descubra como podemos ajudar sua empresa a voar mais alto.
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        <Link href="/contato">
                            Falar com Especialista
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
