import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    client: "Qatar Airways",
    category: "Événementiel",
    color: "from-purple-500/30 to-blue-500/30",
  },
  {
    id: 2,
    client: "Schneider Electric",
    category: "Communication",
    color: "from-green-500/30 to-teal-500/30",
  },
  {
    id: 3,
    client: "Dell",
    category: "Digital",
    color: "from-blue-500/30 to-indigo-500/30",
  },
  {
    id: 4,
    client: "SNEP",
    category: "Rapport Annuel",
    color: "from-orange-500/30 to-red-500/30",
  },
  {
    id: 5,
    client: "Ajial",
    category: "Branding",
    color: "from-pink-500/30 to-purple-500/30",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-secondary/30"
      data-testid="section-portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-portfolio-title"
          >
            Nos références
          </h2>
          <p className="text-lg text-muted-foreground">
            Quelques projets qui illustrent notre savoir-faire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-visible aspect-[4/3] cursor-pointer border-0 hover-elevate"
              data-testid={`card-project-${project.id}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-md`}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 dark:group-hover:bg-background/60 transition-colors duration-300 rounded-md" />

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">
                    {project.client.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <h3 className="text-xl font-bold text-background dark:text-foreground text-center">
                  {project.client}
                </h3>
                <p className="text-sm text-background/80 dark:text-foreground/80 mt-1">
                  {project.category}
                </p>
                <div className="mt-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
