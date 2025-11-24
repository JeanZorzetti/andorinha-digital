import prisma from './prisma';
import { unstable_cache } from 'next/cache';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
    author: string;
    content?: string;
}

export const getBlogPost = unstable_cache(
    async (id: string): Promise<BlogPost | undefined> => {
        const post = await prisma.blogPost.findUnique({
            where: { id },
        });

        if (!post) return undefined;

        return {
            ...post,
            content: post.content || undefined,
        };
    },
    ['blog-post'],
    { revalidate: 3600, tags: ['blog-posts'] }
);

export const getAllBlogPosts = unstable_cache(
    async (): Promise<BlogPost[]> => {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }, // Assuming you want latest first, or add a specific date field for ordering if needed
        });

        return posts.map((post: any) => ({
            ...post,
            content: post.content || undefined,
        }));
    },
    ['all-blog-posts'],
    { revalidate: 3600, tags: ['blog-posts'] }
);
