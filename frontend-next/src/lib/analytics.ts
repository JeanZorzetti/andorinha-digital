// Google Analytics 4 Helper
// Substitua 'G-XXXXXXXXXX' pelo seu ID de medição do GA4

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

// ID do GA4 - substitua pelo seu ID real ou use variável de ambiente
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Track page view
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

// Track event
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Eventos pré-definidos para o site
export const analytics = {
    // CTAs
    clickCTA: (ctaName: string, location: string) => {
        trackEvent('click', 'CTA', `${ctaName} - ${location}`);
    },

    // Formulários
    formSubmit: (formName: string, success: boolean) => {
        trackEvent('submit', 'Form', formName, success ? 1 : 0);
    },

    // WhatsApp
    clickWhatsApp: (location: string) => {
        trackEvent('click', 'WhatsApp', location);
    },

    // Serviços
    viewService: (serviceName: string) => {
        trackEvent('view', 'Service', serviceName);
    },

    // Cases
    viewCase: (caseName: string) => {
        trackEvent('view', 'Case', caseName);
    },

    // Blog
    viewPost: (postTitle: string) => {
        trackEvent('view', 'Blog Post', postTitle);
    },

    // Filtros
    useFilter: (filterType: string, filterValue: string) => {
        trackEvent('filter', filterType, filterValue);
    },

    // Scroll depth
    scrollDepth: (percentage: number) => {
        trackEvent('scroll', 'Depth', `${percentage}%`, percentage);
    },

    // Downloads
    download: (fileName: string) => {
        trackEvent('download', 'File', fileName);
    },

    // External links
    externalLink: (url: string) => {
        trackEvent('click', 'External Link', url);
    },

    // Newsletter
    newsletterSignup: (success: boolean) => {
        trackEvent('signup', 'Newsletter', success ? 'success' : 'error', success ? 1 : 0);
    },
};

export default analytics;
