import prisma from './prisma';
import { unstable_cache } from 'next/cache';

export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    category: string;
    duration?: string;
    investment?: string;
    image: string;
    challenge: string;
    solution?: string; // Used in detail
    results?: string[]; // Used in detail (replaced result and metric)
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    deliverables?: string[];
}

export const getCaseStudy = unstable_cache(
    async (id: string): Promise<CaseStudy | undefined> => {
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { id },
        });

        if (!caseStudy) return undefined;

        return {
            ...caseStudy,
            duration: caseStudy.duration || undefined,
            investment: caseStudy.investment || undefined,
            solution: caseStudy.solution || undefined,
            results: caseStudy.results || undefined,
            testimonial: (caseStudy.testimonial as unknown as CaseStudy['testimonial']) || undefined,
            deliverables: caseStudy.deliverables || undefined,
        };
    },
    ['case-study'],
    { revalidate: 3600, tags: ['case-studies'] }
);

export const getAllCaseStudies = unstable_cache(
    async (): Promise<CaseStudy[]> => {
        const cases = await prisma.caseStudy.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return cases.map(c => ({
            ...c,
            duration: c.duration || undefined,
            investment: c.investment || undefined,
            solution: c.solution || undefined,
            results: c.results || undefined,
            testimonial: (c.testimonial as unknown as CaseStudy['testimonial']) || undefined,
            deliverables: c.deliverables || undefined,
        }));
    },
    ['all-case-studies'],
    { revalidate: 3600, tags: ['case-studies'] }
);
