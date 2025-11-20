import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import { siteConfig } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsentBanner from '@/components/layout/CookieConsentBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';


import { FloatingDock } from '@/components/layout/FloatingDock';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'marketing digital',
    'agência de marketing',
    'social media',
    'gestão de redes sociais',
    'tráfego pago',
    'SEO',
    'criação de sites',
    'branding',
    'marketing estratégico',
    'consultoria de marketing',
    'inbound marketing',
    'marketing de conteúdo'
  ],
  authors: [{ name: 'Andorinha Digital' }],
  creator: 'Andorinha Digital',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#ec7d22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />

        <FloatingDock />
        <CookieConsentBanner />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
