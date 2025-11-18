import { LucideIcon } from "lucide-react";

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  duration?: string;
}

interface ServiceProcessProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

const ServiceProcess = ({
  title = "Como Funciona",
  subtitle = "Nosso processo para este serviço",
  steps,
}: ServiceProcessProps) => {
  return (
    <section className="py-16 lg:py-24 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{step.description}</p>

                  {step.duration && (
                    <span className="text-xs text-primary font-medium">
                      {step.duration}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
