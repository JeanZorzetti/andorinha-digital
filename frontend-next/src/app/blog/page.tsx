import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "Blog | Conteúdo de Marketing para PMEs | Andorinha Marketing",
    description: "Artigos, dicas e estratégias de marketing para pequenas e médias empresas. Aprenda sobre branding, sites, SEO e muito mais.",
    keywords: "blog marketing, dicas marketing, estratégia marketing pme, branding, seo, sites",
    openGraph: {
        url: "https://andorinha.roilabs.com.br/blog",
        images: [
            {
                url: "https://andorinha.roilabs.com.br/og/og-blog.png",
                width: 1200,
                height: 630,
                alt: "Blog Andorinha Marketing",
            },
        ],
    },
};

export default function BlogPage() {
    const posts = getAllBlogPosts();

    return (
        <main>
            <BlogList posts={posts} />
        </main>
    );
}
