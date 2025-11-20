'use client';

import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        const phoneNumber = "5511999999999"; // Substituir pelo número real
        const message = encodeURIComponent(
            "Olá! Vim pelo site e gostaria de mais informações."
        );
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        // Track analytics event (quando implementado)
        // trackEvent('whatsapp', 'click', 'floating_button');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:w-16 md:h-16 group"
            aria-label="Chamar no WhatsApp"
            title="Fale conosco no WhatsApp"
        >
            <MessageCircle
                className={`w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 ${isHovered ? 'scale-110' : ''
                    }`}
            />

            {/* Pulse animation */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>

            {/* Tooltip on hover (desktop only) */}
            <span className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-primary-dark text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Fale conosco
            </span>
        </button>
    );
};

export default WhatsAppButton;
