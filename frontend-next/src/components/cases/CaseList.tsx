"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudy } from "@/lib/cases-data";

interface CaseListProps {
    cases: CaseStudy[];
}

export function CaseList({ cases }: CaseListProps) {
    const [activeFilter, setActiveFilter] = useState("Todos");

    const categories = [
        "Todos",
        "Branding",
        "Sites",
        "Vídeo",
        "Rebranding",
        "Design",
    ];

    const filteredCases =
        activeFilter === "Todos"
            ? cases
            : cases.filter((c) => c.category === activeFilter);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-background to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Projetos que Transformam Negócios
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Resultados reais de clientes reais. Cada projeto é uma história de
                            transformação com métricas que comprovam o impacto.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === category
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cases Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCases.map((caseItem) => (
                            <div
                                key={caseItem.id}
                                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group hover:shadow-md transition-shadow"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={caseItem.image}
                                        alt={caseItem.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                                            {caseItem.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {caseItem.client}
                                    </p>
                                    <h3 className="font-bold text-foreground mb-3 line-clamp-2">
                                        {caseItem.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {caseItem.challenge}
                                    </p>

                                    {/* Results */}
                                    {caseItem.results && caseItem.results.length > 0 && (
                                        <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-semibold text-foreground">
                                                {caseItem.results[0]}
                                            </span>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Link
                                        href={`/cases/${caseItem.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                                    >
                                        Ver Case Completo
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCases.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                Nenhum case encontrado para esta categoria.
                            </p>
                        </div>
                    )}
                </div>
            </section>

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
                            className="bg-transparent border-white text-white hover:bg-white/10"
                        >
                            <Link href="/precos">Ver Investimentos</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
