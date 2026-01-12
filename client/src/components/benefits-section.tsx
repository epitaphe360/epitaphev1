import {
  CheckCircle,
  Clock,
  Users,
  Wrench,
  Heart,
  BarChart3,
  Wallet,
} from "lucide-react";

const benefits = [
  {
    icon: CheckCircle,
    title: "Une maitrise totale",
    description:
      "de l'idée à l'exécution, nous gérons vos projets de A à Z pour assurer cohérence, qualité et réactivité",
  },
  {
    icon: Users,
    title: "Une approche personnalisée",
    description:
      "Nos solutions sont adaptées à vos besoins uniques, avec des formules sur-mesure.",
  },
  {
    icon: Wrench,
    title: "Un atelier interne",
    description: "Rapidité, flexibilité et réactivité sont nos garanties.",
  },
  {
    icon: Heart,
    title: "Une équipe passionnée",
    description: "sur laquelle vous pouvez vraiment compter",
  },
  {
    icon: BarChart3,
    title: "KPI et suivi",
    description: "Nous mesurons l'impact de nos solutions pour optimiser votre ROI.",
  },
  {
    icon: Wallet,
    title: "Un partenaire",
    description: "qui optimise votre temps et vos budgets",
  },
];

export function BenefitsSection() {
  return (
    <section id="about" className="py-20 md:py-32" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-md overflow-hidden">
              <img
                src="https://epitaphe.ma/wp-content/uploads/2020/05/bg-agence-de-com-360-800x450.jpg"
                alt="Agence de communication 360"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </div>

          <div className="order-1 lg:order-2">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
              data-testid="text-benefits-title"
            >
              Une agence de communication 360, c'est:
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-md bg-card/50 hover:bg-card transition-colors"
                  data-testid={`benefit-item-${index}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
