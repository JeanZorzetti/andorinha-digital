import prisma from './prisma';
import { unstable_cache } from 'next/cache';

export interface ServiceSeo {
    title: string;
    description: string;
    keywords: string;
    image: string;
}

export interface ServiceSchema {
    name: string;
    description: string;
    price: string;
}

export interface ServiceProcessStep {
    iconName?: string; // Stored in DB
    title: string;
    description: string;
    duration: string;
}

// Interface for the raw data from DB
interface ServiceProcessStepRaw {
    iconName?: string;
    title: string;
    description: string;
    duration: string;
}

export interface ServicePricingTier {
    name: string;
    price: string;
    duration: string;
    description: string;
    badge: string;
    highlighted?: boolean;
    features: string[];
}

export interface ServiceFaqItem {
    question: string;
    answer: string;
}

export interface ServiceCta {
    title: string;
    subtitle: string;
    description?: string;
}

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    duration: string;
    breadcrumb: string;
    seo: ServiceSeo;
    schema: ServiceSchema;
    includedItems: string[];
    processSteps: ServiceProcessStep[];
    pricingTiers: ServicePricingTier[];
    faqItems: ServiceFaqItem[];
    cta: ServiceCta;
}

export const getServiceData = unstable_cache(
    async (id: string): Promise<ServiceData | undefined> => {
        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) return undefined;

        // Cast JSON fields to their respective interfaces with safety checks
        const rawProcessSteps = (service.processSteps as unknown as ServiceProcessStepRaw[]) || [];

        // Map raw steps to public interface (no hydration needed for icons now)
        const processSteps: ServiceProcessStep[] = Array.isArray(rawProcessSteps)
            ? rawProcessSteps.map(step => ({
                iconName: step.iconName,
                title: step.title,
                description: step.description,
                duration: step.duration
            }))
            : [];

        return {
            ...service,
            seo: (service.seo as unknown as ServiceSeo) || {},
            schema: (service.schema as unknown as ServiceSchema) || {},
            processSteps: processSteps,
            pricingTiers: (service.pricingTiers as unknown as ServicePricingTier[]) || [],
            faqItems: (service.faqItems as unknown as ServiceFaqItem[]) || [],
            cta: (service.cta as unknown as ServiceCta) || { title: '', subtitle: '' },
        };
    },
    ['service-data'],
    { revalidate: 3600, tags: ['services'] }
);

export const getAllServices = unstable_cache(
    async (): Promise<ServiceData[]> => {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return services.map(service => {
            // Cast JSON fields to their respective interfaces with safety checks
            const rawProcessSteps = (service.processSteps as unknown as ServiceProcessStepRaw[]) || [];

            // Map raw steps to public interface
            const processSteps: ServiceProcessStep[] = Array.isArray(rawProcessSteps)
                ? rawProcessSteps.map(step => ({
                    iconName: step.iconName,
                    title: step.title,
                    description: step.description,
                    duration: step.duration
                }))
                : [];

            return {
                ...service,
                seo: (service.seo as unknown as ServiceSeo) || {},
                schema: (service.schema as unknown as ServiceSchema) || {},
                processSteps: processSteps,
                pricingTiers: (service.pricingTiers as unknown as ServicePricingTier[]) || [],
                faqItems: (service.faqItems as unknown as ServiceFaqItem[]) || [],
                cta: (service.cta as unknown as ServiceCta) || { title: '', subtitle: '' },
            };
        });
    },
    ['all-services'],
    { revalidate: 3600, tags: ['services'] }
);
