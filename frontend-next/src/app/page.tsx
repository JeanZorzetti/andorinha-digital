import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Andorinha Marketing | Marketing Estratégico para PMEs',
  description: 'Agência de marketing estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total. Diagnóstico gratuito.',
  keywords: ['agência marketing digital', 'branding preço', 'quanto custa criar site', 'marketing estratégico PMEs', 'vídeo institucional'],
  openGraph: {
    title: 'Andorinha Marketing | Marketing Estratégico para PMEs',
    description: 'Agência de marketing estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total.',
    images: ['/og/og-home.png'],
  },
};

export default function Home() {
  return <HomePage />;
}
