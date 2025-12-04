import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundador | Jean Zonta | Andorinha Audiovisual",
  description: "Conheça Jean Zonta, fundador da Andorinha Audiovisual. Estrategista de marcas com mais de 15 anos de experiência em audiovisual estratégico para PMEs.",
  keywords: "Jean Zonta, fundador andorinha, estrategista de marcas, audiovisual PMEs, palestrante audiovisual",
  openGraph: {
    url: "https://andorinha.roilabs.com.br/founder",
    images: [
      {
        url: "https://andorinha.roilabs.com.br/og/og-founder.png",
        width: 1200,
        height: 630,
        alt: "Jean Zonta - Fundador Andorinha Audiovisual",
      },
    ],
  },
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
