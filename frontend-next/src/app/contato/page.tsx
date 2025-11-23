import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contato | Agende Diagnóstico Gratuito | Andorinha Audiovisual",
  description: "Entre em contato com a Andorinha Audiovisual. Agende seu diagnóstico gratuito e descubra como podemos ajudar seu negócio a crescer.",
  keywords: "contato agência audiovisual, diagnóstico gratuito, orçamento audiovisual, consultoria audiovisual PME",
  openGraph: {
    url: "https://andorinha.roilabs.com.br/contato",
    images: [
      {
        url: "https://andorinha.roilabs.com.br/og/og-contato.png",
        width: 1200,
        height: 630,
        alt: "Contato Andorinha Audiovisual",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
