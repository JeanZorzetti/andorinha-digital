import type { Metadata } from "next";
import { CaseList } from "@/components/cases/CaseList";
import { getAllCaseStudies } from "@/lib/cases-data";

export const metadata: Metadata = {
  title: "Cases de Sucesso | Projetos que Transformam | Andorinha Audiovisual",
  description: "Conheça nossos cases de sucesso em branding, sites, vídeos e design. Resultados reais de clientes reais com métricas comprovadas.",
  keywords: "cases de sucesso, portfolio, projetos de audiovisual, resultados, branding cases, cases sites",
  openGraph: {
    url: "https://andorinha.roilabs.com.br/cases",
    images: [
      {
        url: "https://andorinha.roilabs.com.br/og/og-cases.png",
        width: 1200,
        height: 630,
        alt: "Cases de Sucesso Andorinha Audiovisual",
      },
    ],
  },
};

export default function CasesPage() {
  const cases = getAllCaseStudies();

  return (
    <main>
      <CaseList cases={cases} />
    </main>
  );
}
