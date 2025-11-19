import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTier {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

interface ServicePricingProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
}

const ServicePricing = ({
  title = "Faixas de Investimento",
  subtitle = "Escolha o pacote ideal para sua necessidade",
  tiers,
}: ServicePricingProps) => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-4">
            {title}
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                tier.highlighted
                  ? "border-primary shadow-lg scale-105 z-10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {tier.badge && (
                <div className="absolute top-0 right-0">
                  <Badge
                    className={`rounded-none rounded-bl-lg font-body ${
                      tier.highlighted
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tier.highlighted && <Star className="w-3 h-3 mr-1" />}
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold font-heading text-primary-dark">
                  {tier.name}
                </h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold font-display text-primary">
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm font-body text-muted-foreground mt-2">
                  {tier.duration}
                </p>
              </CardHeader>

              <CardContent>
                <p className="text-sm font-body text-muted-foreground text-center mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contato" className="block">
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-primary-dark hover:bg-primary-dark/90"
                    }`}
                  >
                    Solicitar Proposta
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Todos os pacotes incluem 3 rodadas de revisão | Pagamento parcelado
          disponível
        </p>
      </div>
    </section>
  );
};

export default ServicePricing;
