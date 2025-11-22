"use client";

import Image from "next/image";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Heart, Zap, Target } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { MediaCarousel } from "@/components/ui/media-carousel";

export default function FounderPage() {
    const palestraItems = [
        { src: "/founder/carousel_palestra/1.mp4", type: "video" as const },
        { src: "/founder/carousel_palestra/2.JPG", type: "image" as const },
        { src: "/founder/carousel_palestra/3.jpg", type: "image" as const },
        { src: "/founder/carousel_palestra/4.jpg", type: "image" as const },
        { src: "/founder/carousel_palestra/5.jpg", type: "image" as const },
        { src: "/founder/carousel_palestra/6.jpg", type: "image" as const },
        { src: "/founder/carousel_palestra/7.jpg", type: "image" as const },
        { src: "/founder/carousel_palestra/8.jpg", type: "image" as const },
    ];

    const blackboxItems = [
        { src: "/founder/carousel_blackbox/1.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/2.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/3.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/4.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/5.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/6.jpg", type: "image" as const },
        { src: "/founder/carousel_blackbox/7.mp4", type: "video" as const },
        { src: "/founder/carousel_blackbox/8.mp4", type: "video" as const },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-blue to-accent-blue pattern-andorinha">
                <div className="container mx-auto relative z-10 text-center">
                    <BlurFade delay={0.2} inView>
                        <AnimatedGradientText className="mb-6">
                            <span className="text-sm font-medium">Estrategista de Marcas</span>
                        </AnimatedGradientText>
                    </BlurFade>

                    <BlurFade delay={0.4} inView>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                            Faella
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.6} inView>
                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Há 5 anos transformando posicionamento em resultado. Lidero a Andorinha Digital e atuo no Fatos Desconhecidos, criando campanhas para gigantes como Disney, Coca-Cola e Uber.
                        </p>
                    </BlurFade>
                </div>
            </section>

            {/* Storytelling Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-32">

                        {/* Chapter 1: The Beginning */}
                        <BlurFade delay={0.2} inView>
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                                        O Início
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        Da Bandeja ao Business
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                                        &quot;Várias coisas diferem a empresária de hoje e a garçonete de 3 anos atrás... o tempo, o conhecimento, a maturidade. Mas a única coisa que permanece igual é a coragem.&quot;
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Ninguém falou &quot;vai ficar tudo bem&quot;. Falaram &quot;se vira&quot;. E a gente virou. Virou madrugada, virou garçom, virou do avesso de medo. E no final virou coragem. Hoje, agradeço à Rafaela de 3 anos atrás, que teve a audácia de pagar uma mentoria que valia 8x seu salário.
                                    </p>
                                </div>
                                <div className="w-full md:w-5/12 aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <Carousel
                                        plugins={[
                                            Autoplay({
                                                delay: 4000,
                                            }),
                                        ]}
                                        className="w-full h-full"
                                        opts={{
                                            loop: true,
                                        }}
                                    >
                                        <CarouselContent className="h-full ml-0">
                                            {Array.from({ length: 9 }).map((_, index) => (
                                                <CarouselItem key={index} className="pl-0 h-full basis-full">
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={`/founder/carousel/${index + 1}.jpg`}
                                                            alt={`Foto Faella ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            priority={index === 0}
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            </div>
                        </BlurFade>

                        {/* Chapter 1.5: Palestra (NEW) */}
                        <BlurFade delay={0.2} inView>
                            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                                        Autoridade
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        Posicionamento é Estratégia
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Postar por postar não é estratégia. 🚫
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Cada conteúdo que você publica ensina o algoritmo, e o público, sobre quem você é. Se o que você entrega não tem propósito, o algoritmo vai aprender isso também.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-medium text-foreground">
                                        🎯 Entenda seu público, fale a linguagem dele e poste com intenção. Isso é posicionamento.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        ✨ Se você quer postar com propósito e estratégia, estamos aqui pra te guiar nesse caminho.
                                    </p>
                                </div>
                                <div className="w-full md:w-5/12 aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <MediaCarousel items={palestraItems} />
                                </div>
                            </div>
                        </BlurFade>

                        {/* Chapter 2: The Struggle */}
                        <BlurFade delay={0.2} inView>
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                                        A Jornada
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        Carta Aberta
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Só quem vive sabe das noites questionando se valia a pena o cansaço para sustentar sonhos. De todas as vezes que me senti menos artista por ser &quot;empresária&quot; demais, e menos empresária por ser &quot;artista&quot; demais.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Mas essa versão ficou no passado. Entendi que não preciso dessas dúvidas. Esse mundo barulhento tenta nos fazer esquecer do poder ilimitado que habita em nós. Você tem talento, tem empresa e sustenta seus B.O.s. Mantém o pique.
                                    </p>
                                </div>
                                <div className="w-full md:w-5/12 aspect-square bg-black rounded-2xl overflow-hidden shadow-xl border border-border/50 relative group">
                                    <video
                                        src="/founder/video/carta-aberta.mp4"
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <track kind="captions" src="" label="Sem legendas" />
                                    </video>
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                                </div>
                            </div>
                        </BlurFade>

                        {/* Chapter 3: Growth & Community */}
                        <BlurFade delay={0.2} inView>
                            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                                        A Comunidade
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        Crescimento é Troca
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Até quando vão vender a ideia de que o sucesso vem na solidão? 80% dos seus resultados vêm das suas conexões. É exatamente o que vivemos na <strong>Revoada</strong>: parceria real, ideias compartilhadas e evolução constante.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Há um ano, a Andorinha tinha 3 meses de vida. Éramos uma &quot;eupresa&quot;. Hoje, crescemos 5 vezes mais em faturamento, equipe e clientes. A Andorinha acredita no negócio que capacita e traz para perto.
                                    </p>
                                </div>
                                <div className="w-full md:w-5/12 aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/founder-fatos.png"
                                        alt="Grupo Fatos e Resultados"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </BlurFade>

                        {/* Chapter 4: The Future */}
                        <BlurFade delay={0.2} inView>
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                                        O Futuro
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                                        Andorinha agora é Blackbox
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        2025 é o ano da profissionalização. Entramos para o <strong>Black Box</strong>, mastermind comandado por Igor Moraes.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Estar nesse círculo não é sobre status. É sobre preparar asas para voos maiores. É trazer para dentro da Andorinha a mentalidade e os processos que nos farão voar cada vez mais alto, levando nossos clientes junto. O futuro chegou e a Andorinha vai liderar.
                                    </p>
                                    <div className="flex flex-col gap-4 mt-6">
                                        <MagicCard className="p-6 flex items-center justify-center text-center" gradientColor="#D9D9D955">
                                            <h3 className="text-2xl font-bold text-foreground">Blackbox</h3>
                                            <p className="text-sm text-muted-foreground">Mastermind de Elite</p>
                                        </MagicCard>
                                        <MagicCard className="p-6 flex items-center justify-center text-center" gradientColor="#D9D9D955">
                                            <h3 className="text-2xl font-bold text-foreground">+100 Milhões</h3>
                                            <p className="text-sm text-muted-foreground">Contas Impactadas</p>
                                        </MagicCard>
                                    </div>
                                </div>
                                <div className="w-full md:w-5/12 aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <MediaCarousel items={blackboxItems} />
                                </div>
                            </div>
                        </BlurFade>

                    </div>
                </div>
            </section>

            {/* Authority Section */}
            <section className="py-20 bg-black text-white overflow-hidden">
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Campanhas de Impacto</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Bastidores de campanhas criativas para grandes marcas. Não é só sobre mostrar um produto, é sobre contar uma história.
                    </p>
                </div>
                <div className="container mx-auto px-4">
                    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-8 relative min-h-[300px]">
                        <Image
                            src="/founder-brands.png"
                            alt="Marcas atendidas: Disney, Spotify, Uber, Coca-Cola, etc."
                            fill
                            className="object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Pilares da Founder</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MagicCard className="p-8 flex flex-col items-center text-center gap-4" gradientColor="#D9D9D955">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Paixão</h3>
                            <p className="text-muted-foreground">Amor pelo que faz e dedicação em cada projeto.</p>
                        </MagicCard>
                        <MagicCard className="p-8 flex flex-col items-center text-center gap-4" gradientColor="#D9D9D955">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Estratégia</h3>
                            <p className="text-muted-foreground">Visão clara e passos calculados para o sucesso.</p>
                        </MagicCard>
                        <MagicCard className="p-8 flex flex-col items-center text-center gap-4" gradientColor="#D9D9D955">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Inovação</h3>
                            <p className="text-muted-foreground">Sempre em busca das melhores e mais novas soluções.</p>
                        </MagicCard>
                        <MagicCard className="p-8 flex flex-col items-center text-center gap-4" gradientColor="#D9D9D955">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Excelência</h3>
                            <p className="text-muted-foreground">Entrega de resultados acima da média, sempre.</p>
                        </MagicCard>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Vamos construir sua história de sucesso?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Conte com a expertise da Faella e da Andorinha Digital para levar seu negócio ao próximo nível.
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        <Link href="/contato">
                            Falar com a Founder <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
