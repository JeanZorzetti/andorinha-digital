import type { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";

export const metadata: Metadata = {
    title: "Serviços de Audiovisual e Estratégia | Andorinha Audiovisual",
    description: "Conheça nossas soluções em Branding, Sites, Vídeo Institucional e Rebranding. Audiovisual estratégico para PMEs crescerem.",
    keywords: "serviços audiovisual, produtora de vídeo, criação de sites, branding, rebranding, design gráfico",
    openGraph: {
        title: "Serviços de Audiovisual e Estratégia | Andorinha Audiovisual",
        description: "Conheça nossas soluções em Branding, Sites, Vídeo Institucional e Rebranding.",
        images: ["/og/og-services.png"],
    },
};

export default function ServicesPage() {
    return <ServicesList />;
}
