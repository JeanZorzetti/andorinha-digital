import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, DollarSign } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  ctaText?: string;
  ctaLink?: string;
  breadcrumb: string;
}

const ServiceHero = ({
  title,
  subtitle,
  description,
  price,
  duration,
  ctaText = "Solicitar Proposta",
  ctaLink = "/contato",
  breadcrumb,
}: ServiceHeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary-blue to-accent-blue text-white py-20 lg:py-28">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-andorinha opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-white/70 mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/#servicos" className="hover:text-white transition-colors">
            Serviços
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">{breadcrumb}</span>
        </nav>

        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-primary font-medium mb-4">{subtitle}</p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Price and Duration badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-semibold">{price}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">{duration}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link to={ctaLink}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
