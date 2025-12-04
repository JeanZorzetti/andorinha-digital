import prisma from './prisma';
import { unstable_cache } from 'next/cache';

export interface ServiceProcessStep {
    title: string;
    description: string;
    icon?: string;
    duration?: string;
}

export interface ServicePricingTier {
    name: string;
    price: string;
    period?: string;
    features: string[];
    highlighted?: boolean;
    cta?: string;
}

export interface ServiceData {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string | null;
    image: string;
    gallery: string[];
    category: string;
    tags: string[];
    pricing: ServicePricingTier[];
    process: ServiceProcessStep[];
    deliveryTime: string;
    includes: string[];
    excludes: string[];
    requirements: string[];
    status: string;
    featured: boolean;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
}

export const getServiceData = unstable_cache(
    async (slug: string): Promise<ServiceData | undefined> => {
        const service = await prisma.service.findUnique({
            where: {
                slug,
                status: 'PUBLISHED'
            },
        });

        if (!service) return undefined;

        return {
            id: service.id,
            slug: service.slug,
            title: service.title,
            description: service.description,
            content: service.content,
            image: service.image,
            gallery: service.gallery,
            category: service.category,
            tags: service.tags,
            pricing: service.pricing as ServicePricingTier[],
            process: service.process as ServiceProcessStep[],
            deliveryTime: service.deliveryTime,
            includes: service.includes,
            excludes: service.excludes,
            requirements: service.requirements,
            status: service.status,
            featured: service.featured,
            metaTitle: service.metaTitle,
            metaDescription: service.metaDescription,
            metaKeywords: service.metaKeywords,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
            publishedAt: service.publishedAt,
        };
    },
    ['service-data'],
    { revalidate: 3600, tags: ['services'] }
);

export const getAllServices = unstable_cache(
    async (): Promise<ServiceData[]> => {
        const services = await prisma.service.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { createdAt: 'desc' },
        });

        return services.map(service => ({
            id: service.id,
            slug: service.slug,
            title: service.title,
            description: service.description,
            content: service.content,
            image: service.image,
            gallery: service.gallery,
            category: service.category,
            tags: service.tags,
            pricing: service.pricing as ServicePricingTier[],
            process: service.process as ServiceProcessStep[],
            deliveryTime: service.deliveryTime,
            includes: service.includes,
            excludes: service.excludes,
            requirements: service.requirements,
            status: service.status,
            featured: service.featured,
            metaTitle: service.metaTitle,
            metaDescription: service.metaDescription,
            metaKeywords: service.metaKeywords,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
            publishedAt: service.publishedAt,
        }));
    },
    ['all-services'],
    { revalidate: 3600, tags: ['services'] }
);
