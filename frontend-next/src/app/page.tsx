import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Andorinha Audiovisual | Audiovisual Estratégico para PMEs',
  description: 'Agência de audiovisual estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total. Diagnóstico gratuito.',
  keywords: ['agência audiovisual', 'branding preço', 'quanto custa criar site', 'audiovisual estratégico PMEs', 'vídeo institucional'],
  openGraph: {
    title: 'Andorinha Audiovisual | Audiovisual Estratégico para PMEs',
    description: 'Agência de audiovisual estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total.',
    images: ['/og/og-home.png'],
  },
};

export default function Home() {
  return <HomePage />;
}
