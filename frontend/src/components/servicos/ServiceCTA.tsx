import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

interface ServiceCTAProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  primaryLink?: string;
  secondaryCTA?: string;
  secondaryLink?: string;
}

const ServiceCTA = ({
  title = "Pronto para Começar?",
  subtitle = "Agende um diagnóstico gratuito e descubra como podemos ajudar seu negócio",
  primaryCTA = "Agendar Diagnóstico Gratuito",
  primaryLink = "/contato",
  secondaryCTA = "Ver Preços",
  secondaryLink = "/precos",
}: ServiceCTAProps) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            {title}
          </h2>
          <p className="text-lg font-body text-white/90 mb-8">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryLink}>
              <Button
                size="lg"
                className="bg-primary-dark hover:bg-primary-dark/90 text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {primaryCTA}
              </Button>
            </Link>
            <Link to={secondaryLink}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg w-full sm:w-auto"
              >
                {secondaryCTA}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="text-sm font-body text-white/70 mt-6">
            Sem compromisso | Sem custo | Apenas estratégia
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
