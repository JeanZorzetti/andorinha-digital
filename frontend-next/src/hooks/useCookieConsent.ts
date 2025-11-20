'use client';

import { useState, useEffect } from 'react';

const COOKIE_NAME = 'andorinha-cookie-consent';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_NAME);
    if (stored === 'accepted') {
      setConsentStatus('accepted');
    } else if (stored === 'declined') {
      setConsentStatus('declined');
    }
    setIsLoaded(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_NAME, 'accepted');
    setConsentStatus('accepted');
    // Ativar Google Analytics, Facebook Pixel, etc.
    console.log('Cookies aceitos - Analytics podem ser ativados');
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_NAME, 'declined');
    setConsentStatus('declined');
    // Manter apenas cookies essenciais
    console.log('Cookies recusados - Apenas cookies essenciais');
  };

  return {
    consentStatus,
    isLoaded,
    acceptCookies,
    declineCookies,
    showBanner: isLoaded && consentStatus === 'pending',
  };
}
