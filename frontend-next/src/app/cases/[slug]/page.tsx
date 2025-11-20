import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCaseStudy, getAllCaseStudies } from "@/lib/cases-data";

interface CaseDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const cases = getAllCaseStudies();
    return cases.map((c) => ({
        slug: c.id,
    }));
}

export async function generateMetadata({
    params,
}: CaseDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const caseData = getCaseStudy(slug);

    if (!caseData) {
        return {
            title: "Case não encontrado",
        };
    }

    return {
        title: `${caseData.title} | Case de Sucesso Andorinha Marketing`,
        description: caseData.challenge,
        keywords: `case ${caseData.category.toLowerCase()}, ${caseData.client}, projeto de marketing`,
        openGraph: {
            title: caseData.title,
            description: caseData.challenge,
            url: `https://andorinha.roilabs.com.br/cases/${caseData.id}`,
            images: [
                {
                    url: caseData.image,
                    width: 1200,
                    height: 630,
                    alt: caseData.title,
                },
            ],
            type: "article",
        },
    };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
    const { slug } = await params;
    const caseData = getCaseStudy(slug);

    if (!caseData) {
        notFound();
    }

    return (
        <main>
            {/* Hero */}
            <section className="pt-32 pb-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/cases"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para Cases
                    </Link>

                    <div className="max-w-4xl">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {caseData.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                            {caseData.title}
                        </h1>
                        <p className="text-xl text-muted-foreground">{caseData.client}</p>
                    </div>
                </div>
            </section>

            {/* Image */}
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                        <Image
                            src={caseData.image}
                            alt={caseData.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
                        <div className="bg-muted/30 p-4 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                            <p className="font-semibold text-foreground">{caseData.client}</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Duração</p>
                            <p className="font-semibold text-foreground">{caseData.duration}</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Investimento</p>
                            <p className="font-semibold text-foreground">
                                {caseData.investment}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                O Desafio
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseData.challenge}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Nossa Solução
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseData.solution}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results */}
            {caseData.results && (
                <section className="py-12 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Resultados
                            </h2>
                            <ul className="space-y-3">
                                {caseData.results.map((result, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonial */}
            {caseData.testimonial && (
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl bg-muted/30 p-8 rounded-2xl">
                            <p className="text-xl text-foreground italic mb-6">
                                &quot;{caseData.testimonial.quote}&quot;
                            </p>
                            <div>
                                <p className="font-semibold text-foreground">
                                    {caseData.testimonial.author}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {caseData.testimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables */}
            {caseData.deliverables && (
                <section className="pb-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                O Que Entregamos
                            </h2>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {caseData.deliverables.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Quer Resultados Como Esses?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Agende um diagnóstico gratuito e descubra como podemos transformar
                        seu negócio.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-muted"
                        >
                            <Link href="/contato">Agendar Diagnóstico</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10"
                        >
                            <Link href="/cases">Ver Mais Cases</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
