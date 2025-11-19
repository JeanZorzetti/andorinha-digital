import { Check } from "lucide-react";

interface ServiceIncludedProps {
  title?: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2;
}

const ServiceIncluded = ({
  title = "O Que Está Incluído",
  subtitle = "Tudo que você recebe neste serviço",
  items,
  columns = 2,
}: ServiceIncludedProps) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-4">
            {title}
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div
          className={`grid gap-4 max-w-4xl mx-auto ${
            columns === 2 ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="font-body text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIncluded;
