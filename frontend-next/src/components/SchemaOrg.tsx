import Script from "next/script";

// Schema Organization - usado globalmente
export const SchemaOrganization = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Andorinha Audiovisual",
        "url": "https://andorinha.roilabs.com.br",
        "logo": "https://andorinha.roilabs.com.br/logo.png",
        "description": "Agência de audiovisual estratégico com projetos pontuais para PMEs. Branding, Sites, Vídeo e Rebranding com transparência total.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR",
            "addressRegion": "SP"
        },
        "telephone": "+55-11-99999-9999",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "areaServed": {
            "@type": "Country",
            "name": "Brazil"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-99999-9999",
            "contactType": "customer service",
            "availableLanguage": ["Portuguese"]
        },
        "sameAs": [
            "https://www.instagram.com/andorinhamarketing",
            "https://www.linkedin.com/company/andorinhamarketing"
        ]
    };

    return (
        <Script
            id="schema-organization"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

// Schema Service - usado nas páginas de serviços
interface SchemaServiceProps {
    name: string;
    description: string;
    price: string;
    priceCurrency?: string;
    url: string;
}

export const SchemaService = ({
    name,
    description,
    price,
    priceCurrency = "BRL",
    url
}: SchemaServiceProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": "Andorinha Audiovisual",
            "url": "https://andorinha.roilabs.com.br"
        },
        "url": url,
        "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": priceCurrency,
            "availability": "https://schema.org/InStock"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Brazil"
        }
    };

    return (
        <Script
            id={`schema-service-${name.replace(/\s+/g, '-').toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

// Schema FAQPage - usado nas páginas com FAQ
interface FAQItem {
    question: string;
    answer: string;
}

interface SchemaFAQPageProps {
    faqs: FAQItem[];
}

export const SchemaFAQPage = ({ faqs }: SchemaFAQPageProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <Script
            id="schema-faq"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

// Schema Article - usado nas páginas de blog
interface SchemaArticleProps {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image: string;
    url: string;
}

export const SchemaArticle = ({
    title,
    description,
    author,
    datePublished,
    dateModified,
    image,
    url
}: SchemaArticleProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Andorinha Audiovisual",
            "logo": {
                "@type": "ImageObject",
                "url": "https://andorinha.roilabs.com.br/logo.png"
            }
        },
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "image": image,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    return (
        <Script
            id={`schema-article-${url.split('/').pop()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

// Schema LocalBusiness - alternativa ao Organization para negócios locais
export const SchemaLocalBusiness = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Andorinha Audiovisual",
        "url": "https://andorinha.roilabs.com.br",
        "logo": "https://andorinha.roilabs.com.br/logo.png",
        "description": "Agência de audiovisual estratégico com projetos pontuais para PMEs.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR",
            "addressRegion": "SP"
        },
        "telephone": "+55-11-99999-9999",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": [
            "https://www.instagram.com/andorinhamarketing",
            "https://www.linkedin.com/company/andorinhamarketing"
        ]
    };

    return (
        <Script
            id="schema-local-business"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaOrganization;
