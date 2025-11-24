"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = [
        "Todos",
        "Branding",
        "Sites",
        "SEO",
        "Estratégia",
        "Design",
    ];

    const filteredPosts = posts.filter((post) => {
        const matchesCategory =
            activeFilter === "Todos" || post.category === activeFilter;
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-8 bg-gradient-to-b from-background to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Conteúdo que Agrega
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Dicas, estratégias e insights de marketing para PMEs que querem
                            crescer de forma inteligente.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Buscar artigos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
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

            {/* Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group hover:shadow-md transition-shadow"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                                    >
                                        Ler Artigo
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                Nenhum artigo encontrado para sua busca.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Receba Conteúdo Exclusivo
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Cadastre-se para receber dicas estratégicas, novos artigos e
                            ofertas especiais diretamente no seu email.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Seu melhor email"
                                className="flex-1"
                            />
                            <Button className="bg-primary hover:bg-primary/90">
                                Cadastrar
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                            Sem spam. Cancele quando quiser.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Precisa de Ajuda com Audiovisual?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Agende um diagnóstico gratuito e descubra como podemos ajudar seu
                        negócio a crescer.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-white text-primary hover:bg-muted"
                    >
                        <Link href="/contato">Agendar Diagnóstico</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
