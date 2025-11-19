import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

const CookieConsentBanner = () => {
  const handleAccept = () => {
    // Ativar Google Analytics, Facebook Pixel, etc.
    // Exemplo: window.gtag('consent', 'update', { analytics_storage: 'granted' });
    console.log("Cookies aceitos - Analytics podem ser ativados");
  };

  const handleDecline = () => {
    // Manter apenas cookies essenciais
    console.log("Cookies recusados - Apenas cookies essenciais");
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceitar"
      declineButtonText="Recusar"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="andorinha-cookie-consent"
      expires={365}
      style={{
        background: "#1A1A1A",
        padding: "16px 24px",
        alignItems: "center",
        fontSize: "14px",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
      buttonStyle={{
        background: "#FF6B35",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        padding: "10px 20px",
        margin: "0 8px 0 0",
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "1px solid #6B7280",
        color: "#9CA3AF",
        fontSize: "14px",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "10px 20px",
        margin: "0",
      }}
      contentStyle={{
        flex: "0 0 auto",
        margin: "8px 16px 8px 0",
        maxWidth: "60%",
      }}
      buttonWrapperClasses="flex gap-2"
    >
      <span className="text-white/90">
        Usamos cookies para melhorar sua experiência e analisar o tráfego do site.{" "}
        <Link
          to="/privacidade"
          className="text-primary hover:text-primary/80 underline"
        >
          Saiba mais
        </Link>
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
