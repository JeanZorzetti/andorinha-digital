import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchemaService, SchemaFAQPage } from "@/components/SchemaOrg";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceFAQ from "@/components/servicos/ServiceFAQ";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { getServiceData, getAllServices } from "@/lib/services-data";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const services = getAllServices();
    return services.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceData(slug);

    if (!service) {
        return {
            title: "Serviço não encontrado",
        };
    }

    return {
        title: service.seo.title,
        description: service.seo.description,
        keywords: service.seo.keywords,
        openGraph: {
            title: service.seo.title,
            description: service.seo.description,
            url: `https://andorinha.roilabs.com.br/servicos/${service.id}`,
            images: [
                {
                    url: service.seo.image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceData(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <SchemaService
                name={service.schema.name}
                description={service.schema.description}
                price={service.schema.price}
                url={`https://andorinha.roilabs.com.br/servicos/${service.id}`}
            />
            <SchemaFAQPage faqs={service.faqItems} />

            <main>
                <ServiceHero
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    breadcrumb={service.breadcrumb}
                />

                <ServiceIncluded items={service.includedItems} />

                <ServiceProcess
                    title="Processo de Trabalho"
                    subtitle="Como entregamos resultados"
                    steps={service.processSteps}
                />

                <ServicePricing tiers={service.pricingTiers} />

                <ServiceFAQ items={service.faqItems} />

                <ServiceCTA title={service.cta.title} subtitle={service.cta.subtitle} />
            </main>
        </>
    );
}
