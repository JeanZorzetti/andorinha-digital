import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "Blog | Conteúdo Estratégico para PMEs | Andorinha Audiovisual",
    description: "Artigos, dicas e estratégias de audiovisual para pequenas e médias empresas. Aprenda sobre branding, sites, SEO e muito mais.",
    keywords: "blog audiovisual, dicas audiovisual, estratégia audiovisual pme, branding, seo, sites",
    openGraph: {
        url: "https://andorinha.roilabs.com.br/blog",
        images: [
            {
                url: "https://andorinha.roilabs.com.br/og/og-blog.png",
                width: 1200,
                height: 630,
                alt: "Blog Andorinha Audiovisual",
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
