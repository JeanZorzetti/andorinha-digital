import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SchemaArticle } from "@/components/SchemaOrg";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);

    if (!post) {
        return {
            title: "Artigo não encontrado",
        };
    }

    return {
        title: `${post.title} | Blog Andorinha Marketing`,
        description: post.excerpt,
        keywords: `${post.category.toLowerCase()}, marketing, pme`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://andorinha.roilabs.com.br/blog/${post.id}`,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <SchemaArticle
                title={post.title}
                description={post.excerpt}
                author={post.author}
                datePublished={post.date} // Note: Should ideally be ISO format for Schema
                image={post.image}
                url={`https://andorinha.roilabs.com.br/blog/${post.id}`}
            />

            <main>
                {/* Header */}
                <section className="pt-32 pb-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar para Blog
                            </Link>

                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {post.category}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime} de leitura
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {post.author}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                <section className="pb-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                                {post.content?.split("\n").map((paragraph, index) => {
                                    if (paragraph.startsWith("## ")) {
                                        return (
                                            <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                                                {paragraph.replace("## ", "")}
                                            </h2>
                                        );
                                    }
                                    if (paragraph.startsWith("### ")) {
                                        return (
                                            <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                                                {paragraph.replace("### ", "")}
                                            </h3>
                                        );
                                    }
                                    if (paragraph.startsWith("- ")) {
                                        return (
                                            <li key={index} className="ml-4">
                                                {paragraph.replace("- ", "")}
                                            </li>
                                        );
                                    }
                                    if (paragraph.trim()) {
                                        return (
                                            <p key={index} className="mb-4">
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Share */}
                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Compartilhar:
                                    </span>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                            `https://andorinha.roilabs.com.br/blog/${post.id}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-[#0077B5]"
                                    >
                                        LinkedIn
                                    </a>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(
                                            `${post.title} - https://andorinha.roilabs.com.br/blog/${post.id}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-[#25D366]"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Precisa de Ajuda com {post.category}?
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Agende um diagnóstico gratuito e descubra como podemos ajudar
                                seu negócio a crescer.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button asChild className="bg-primary hover:bg-primary/90">
                                    <Link href="/contato">Agendar Diagnóstico</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/blog">Ver Mais Artigos</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
