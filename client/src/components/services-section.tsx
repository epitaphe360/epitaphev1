import { Monitor, Megaphone, FileText, Globe, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    id: "digital",
    title: "Digital",
    icon: Monitor,
    description: "Stratégies digitales innovantes pour votre présence en ligne",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: "publicite",
    title: "Industrie publicitaire",
    icon: Megaphone,
    description: "Campagnes publicitaires percutantes et mémorables",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "contents",
    title: "Contents",
    icon: FileText,
    description: "Création de contenus engageants et pertinents",
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    id: "communication",
    title: "Communication globale",
    icon: Globe,
    description: "Stratégies de communication intégrées et cohérentes",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "evenementiel",
    title: "Événementiel",
    icon: Calendar,
    description: "Organisation d'événements marquants et inoubliables",
    color: "from-pink-500/20 to-red-500/20",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 md:py-32 bg-secondary/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-services-title"
          >
            Nos métiers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expertise complète pour accompagner vos projets de A à Z
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-visible p-6 hover-elevate cursor-pointer border-0 bg-card"
              data-testid={`card-service-${service.id}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md`}
              />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
