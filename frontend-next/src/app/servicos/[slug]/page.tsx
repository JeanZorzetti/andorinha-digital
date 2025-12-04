import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchemaService } from "@/components/SchemaOrg";
import ServiceHero from "@/components/servicos/ServiceHero";
import ServiceIncluded from "@/components/servicos/ServiceIncluded";
import ServiceProcess from "@/components/servicos/ServiceProcess";
import ServicePricing from "@/components/servicos/ServicePricing";
import ServiceCTA from "@/components/servicos/ServiceCTA";
import { getServiceData, getAllServices } from "@/lib/services-data";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceData(slug);

    if (!service) {
        return {
            title: "Serviço não encontrado",
        };
    }

    return {
        title: service.metaTitle || service.title,
        description: service.metaDescription || service.description,
        keywords: service.metaKeywords?.join(', '),
        openGraph: {
            title: service.metaTitle || service.title,
            description: service.metaDescription || service.description,
            url: `https://andorinha.roilabs.com.br/servicos/${service.slug}`,
            images: [
                {
                    url: service.image,
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
    const service = await getServiceData(slug);

    if (!service) {
        notFound();
    }

    // Extract first pricing tier for hero display
    const mainPricing = service.pricing[0];

    return (
        <>
            <SchemaService
                name={service.title}
                description={service.description}
                price={mainPricing?.price || ''}
                url={`https://andorinha.roilabs.com.br/servicos/${service.slug}`}
            />

            <main>
                <ServiceHero
                    title={service.title}
                    subtitle={service.category}
                    description={service.description}
                    price={mainPricing?.price || ''}
                    duration={service.deliveryTime}
                    breadcrumb={service.category}
                />

                <ServiceIncluded items={service.includes} />

                <ServiceProcess
                    title="Processo de Trabalho"
                    subtitle="Como entregamos resultados"
                    steps={service.process}
                />

                <ServicePricing tiers={service.pricing} />

                <ServiceCTA title={`Interessado em ${service.title}?`} subtitle="Entre em contato conosco" />
            </main>
        </>
    );
}
