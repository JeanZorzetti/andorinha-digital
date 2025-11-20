'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/button';

const CookieConsentBanner = () => {
  const { showBanner, acceptCookies, declineCookies } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] p-4 md:p-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-white/90 flex-1">
          Usamos cookies para melhorar sua experiência e analisar o tráfego do site.{' '}
          <Link
            href="/privacidade"
            className="text-primary hover:text-primary/80 underline"
          >
            Saiba mais
          </Link>
        </p>

        <div className="flex gap-2">
          <Button
            onClick={acceptCookies}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5"
          >
            Aceitar
          </Button>
          <Button
            onClick={declineCookies}
            variant="outline"
            className="border-gray-500 text-gray-400 hover:bg-gray-800 px-5 py-2.5"
          >
            Recusar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
