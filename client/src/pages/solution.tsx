import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { StatsSection } from "@/components/stats-section";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const solutions: Record<string, {
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  ctaText: string;
  needs: string[];
  needsTitle: string;
  needsSubtitle: string;
  realizations: string[];
  relatedArticles: { title: string; slug: string; image: string }[];
}> = {
  "objets-et-cadeaux-publicitaires": {
    title: "Objets et cadeaux publicitaires",
    heroTitle: "Give to get !",
    heroSubtitle: "Objets et cadeaux publicitaires",
    description: "Les objets et cadeaux publicitaires sont devenus de véritables outils de communication qui peuvent contribuer à la réussite de vos événements, à la motivation de vos employés ou à marquer vos clients. Du stylo à la clé USB, en passant par le notebook, les produits textiles, écologiques ou de dinanderie... Gadget Pro, filiale de l'agence de communication Epitaphe 360 vous propose non seulement un large choix d'objets et de cadeaux publicitaires de qualité, mais aussi des conseils précieux sur les techniques de marquage (sérigraphie, gravure laser, transfert...) pour vous assurer d'un fort impact et optimiser vos coûts. Rappelez élégamment votre marque. Faites appel à Epitaphe 360 !",
    ctaText: "PARLEZ-NOUS DE VOTRE PROJET",
    needsTitle: "Quels sont vos besoins",
    needsSubtitle: "en matière de goodies ?",
    needs: [
      "Des Stylos, Clés USB, Power bank, Mug...",
      "Des Porte document, Note books...",
      "Des cadeaux de fin d'année, Coffrets VIP...",
      "Des produits textiles : tee-shirt, polos, casquettes, gilets, serviettes de plage, combinaisons, blouses...",
      "De la Dinanderie et des produits d'artisanat...",
    ],
    realizations: [
      "https://epitaphe.ma/wp-content/uploads/2020/02/2-5.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/3-5.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/5-5.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/6-5.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/7-4.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/8-4.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/9-3.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/10-3.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/11-3.jpg",
      "https://epitaphe.ma/wp-content/uploads/2020/02/12-1.jpg",
    ],
    relatedArticles: [
      {
        title: "3 conseils pour maximiser l'impact de vos objets publicitaires",
        slug: "3-conseils-pour-maximiser-limpact-de-vos-objets-publicitaires",
        image: "https://epitaphe.ma/wp-content/uploads/2020/05/maximiser-impact-objet-publicitaire.jpg",
      },
      {
        title: "Pourquoi les équipes interfonctionnelles en marketing échouent",
        slug: "eviter-le-chaos-dans-les-equipes-interfonctionnelles-en-marketing",
        image: "https://epitaphe.ma/wp-content/uploads/2025/03/Pourquoi-les-equipes-interfonctionnelles-en-marketing-echouent.jpg",
      },
      {
        title: "Les secrets pour organiser votre événement avec succès",
        slug: "les-secrets-pour-organiser-votre-evenement-avec-plus-de-succes-et-moins-de-stress",
        image: "https://epitaphe.ma/wp-content/uploads/2023/05/event.jpg",
      },
    ],
  },
  "signaletique": {
    title: "Signalétique",
    heroTitle: "Guidez. Informez. Marquez.",
    heroSubtitle: "Signalétique",
    description: "La signalétique est un élément essentiel de votre communication visuelle. Elle guide vos visiteurs, renforce votre image de marque et optimise l'expérience utilisateur dans vos espaces. Epitaphe 360 conçoit et réalise tous types de signalétique : intérieure, extérieure, directionnelle, événementielle. Notre expertise couvre la conception graphique, la fabrication et la pose.",
    ctaText: "PARLEZ-NOUS DE VOTRE PROJET",
    needsTitle: "Quels sont vos besoins",
    needsSubtitle: "en matière de signalétique ?",
    needs: [
      "Signalétique intérieure et extérieure",
      "Enseignes lumineuses et non lumineuses",
      "Totems et pylônes",
      "Panneaux directionnels",
      "Habillage de véhicules",
    ],
    realizations: [],
    relatedArticles: [],
  },
  "evenementiel": {
    title: "Événementiel",
    heroTitle: "Créez l'inoubliable",
    heroSubtitle: "Événementiel",
    description: "L'événementiel est un levier puissant pour créer des connexions authentiques avec vos publics. Chez Epitaphe 360, nous concevons et orchestrons des événements qui marquent les esprits : lancements de produits, séminaires, team buildings, conventions, inaugurations. Notre approche créative et notre rigueur organisationnelle garantissent le succès de vos événements.",
    ctaText: "PARLEZ-NOUS DE VOTRE PROJET",
    needsTitle: "Quels sont vos besoins",
    needsSubtitle: "en matière d'événementiel ?",
    needs: [
      "Lancements de produits",
      "Séminaires et conventions",
      "Team buildings",
      "Inaugurations",
      "Soirées d'entreprise",
    ],
    realizations: [],
    relatedArticles: [],
  },
  "digital": {
    title: "Digital",
    heroTitle: "Connectez. Engagez. Convertissez.",
    heroSubtitle: "Digital",
    description: "Le digital est au cœur de toute stratégie de communication moderne. Epitaphe 360 vous accompagne dans votre transformation digitale : création de sites web, stratégie social media, campagnes digitales, référencement. Notre expertise vous permet d'optimiser votre présence en ligne et d'atteindre vos objectifs commerciaux.",
    ctaText: "PARLEZ-NOUS DE VOTRE PROJET",
    needsTitle: "Quels sont vos besoins",
    needsSubtitle: "en matière de digital ?",
    needs: [
      "Création de sites web",
      "Stratégie social media",
      "Campagnes publicitaires digitales",
      "Référencement SEO/SEA",
      "E-mailing et automation",
    ],
    realizations: [],
    relatedArticles: [],
  },
  "production-audiovisuelle": {
    title: "Production audiovisuelle",
    heroTitle: "Racontez votre histoire",
    heroSubtitle: "Production audiovisuelle",
    description: "La vidéo est le format le plus engageant aujourd'hui. Epitaphe 360 produit des contenus audiovisuels de qualité professionnelle : films corporate, spots publicitaires, vidéos promotionnelles, captations d'événements. De la conception à la post-production, nous donnons vie à vos messages.",
    ctaText: "PARLEZ-NOUS DE VOTRE PROJET",
    needsTitle: "Quels sont vos besoins",
    needsSubtitle: "en matière de production audiovisuelle ?",
    needs: [
      "Films corporate",
      "Spots publicitaires",
      "Vidéos promotionnelles",
      "Captation d'événements",
      "Motion design",
    ],
    realizations: [],
    relatedArticles: [],
  },
};

export default function SolutionPage() {
  const { slug } = useParams();
  const solution = slug ? solutions[slug] : null;

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Solution non trouvée</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium mb-4" data-testid="text-solution-subtitle">
            {solution.heroSubtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8" data-testid="text-solution-title">
            {solution.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {solution.description}
          </p>
          <Button size="lg" className="font-semibold" data-testid="button-solution-cta">
            {solution.ctaText}
          </Button>
        </div>
      </section>

      <StatsSection />

      <section className="py-16 md:py-24 px-4 relative">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-5"
          style={{
            backgroundImage: "url('https://epitaphe.ma/wp-content/uploads/2018/10/particle-02.png')"
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-needs-title">
              {solution.needsTitle}
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-primary">
              {solution.needsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {solution.needs.map((need, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-card rounded-md"
                  data-testid={`card-need-${idx}`}
                >
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{need}</span>
                </div>
              ))}
              <div className="pt-4">
                <Link href="#contact">
                  <Button size="lg">Contactez-nous</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://epitaphe.ma/wp-content/uploads/2018/09/Milieu2-scaled.jpg"
                alt="Goodies et cadeaux publicitaires"
                className="rounded-md shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {solution.realizations.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-realizations-title">
              Nos réalisations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {solution.realizations.map((img, idx) => (
                <div 
                  key={idx}
                  className="aspect-[16/9] overflow-hidden rounded-md hover-elevate transition-all"
                  data-testid={`card-realization-${idx}`}
                >
                  <img
                    src={img}
                    alt={`Réalisation ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {solution.relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-related-articles-title">
              Nous vous proposons de lire
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {solution.relatedArticles.map((article) => (
                <Link 
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group"
                  data-testid={`link-related-${article.slug}`}
                >
                  <article className="bg-card rounded-md overflow-hidden hover-elevate transition-all">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="outline">Tous les articles</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <ContactSection />
      <Footer />
    </div>
  );
}
