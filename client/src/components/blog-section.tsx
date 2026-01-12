import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    id: 1,
    title:
      "Pourquoi les équipes interfonctionnelles en marketing échouent (et comment éviter le chaos)",
    excerpt:
      "Les équipes interfonctionnelles en marketing promettent d'améliorer l'efficacité, mais elles échouent souvent à cause du manque d'alignement.",
    date: "15 Mars 2025",
    category: "Marketing",
    image: "https://epitaphe.ma/wp-content/uploads/2025/03/Pourquoi-les-equipes-interfonctionnelles-en-marketing-echouent.jpg",
  },
  {
    id: 2,
    title: "Safety Day : 3 erreurs fréquentes à éviter pour un événement vraiment impactant",
    excerpt:
      "Découvrez les erreurs courantes lors de l'organisation d'un Safety Day et comment les éviter pour maximiser l'impact.",
    date: "10 Mai 2025",
    category: "Événementiel",
    image: "https://epitaphe.ma/wp-content/uploads/2025/05/Safety-day-1920x1281.jpg",
  },
  {
    id: 3,
    title: "3 règles d'or pour une PLV/ILV réussie",
    excerpt:
      "La PLV et l'ILV sont des outils essentiels pour attirer l'attention en point de vente. Voici nos conseils d'experts.",
    date: "5 Mai 2025",
    category: "Publicité",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/reussir-PLV-ILV.jpg",
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="py-20 md:py-32 relative overflow-hidden"
      data-testid="section-blog"
    >
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-testid="text-blog-title"
          >
            Nous vous proposons de lire
          </h2>
          <p className="text-lg text-muted-foreground">
            Insights et conseils de nos experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group overflow-hidden cursor-pointer border-0 bg-card"
              data-testid={`card-article-${article.id}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-all-articles">
            Tous les articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
