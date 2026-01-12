import { Card } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    client: "Qatar Airways",
    category: "Événementiel",
    image: "https://epitaphe.ma/wp-content/uploads/2018/10/eventqatar.jpg",
  },
  {
    id: 2,
    client: "Schneider Electric",
    category: "Communication",
    image: "https://epitaphe.ma/wp-content/uploads/2018/10/LIFE.jpg",
  },
  {
    id: 3,
    client: "Dell",
    category: "Digital",
    image: "https://epitaphe.ma/wp-content/uploads/2018/10/dell-rea.jpg",
  },
  {
    id: 4,
    client: "SNEP",
    category: "Rapport Annuel",
    image: "https://epitaphe.ma/wp-content/uploads/2018/10/REARapport.jpg",
  },
  {
    id: 5,
    client: "Ajial",
    category: "Branding",
    image: "https://epitaphe.ma/wp-content/uploads/2018/10/Ajial2-1.jpg",
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
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer border-0"
              data-testid={`card-project-${project.id}`}
            >
              <img
                src={project.image}
                alt={project.client}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.client}
                </h3>
                <p className="text-sm text-white/80">{project.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
