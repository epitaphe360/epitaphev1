import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogArticles: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  content: string;
}> = {
  "eviter-le-chaos-dans-les-equipes-interfonctionnelles-en-marketing": {
    title: "Pourquoi les équipes interfonctionnelles en marketing échouent (et comment éviter le chaos)",
    excerpt: "Tout le monde le sait : une équipe interfonctionnelle devrait briser les silos et améliorer l'efficacité.",
    image: "https://epitaphe.ma/wp-content/uploads/2025/03/Pourquoi-les-equipes-interfonctionnelles-en-marketing-echouent.jpg",
    categories: ["Communication globale", "Communication interne", "Stratégie de communication"],
    content: `Les équipes interfonctionnelles en marketing promettent d'améliorer l'efficacité, mais elles échouent souvent à cause du manque d'alignement, de communication et de leadership.

Dans cet article, nous explorons les raisons principales de ces échecs et comment votre entreprise peut éviter ces pièges courants.

## Le problème des silos

Les silos organisationnels sont l'un des plus grands obstacles à la collaboration efficace. Quand les départements travaillent de manière isolée, les informations ne circulent pas et les objectifs peuvent diverger.

## Solutions pratiques

1. **Alignement des objectifs** : Assurez-vous que tous les membres de l'équipe comprennent et partagent les mêmes objectifs.

2. **Communication régulière** : Mettez en place des réunions courtes mais fréquentes pour maintenir tout le monde informé.

3. **Leadership clair** : Désignez un leader qui peut faciliter la collaboration et résoudre les conflits.

4. **Outils adaptés** : Utilisez des outils de collaboration qui permettent à tous de suivre l'avancement des projets.

Chez Epitaphe 360, nous accompagnons les entreprises dans la mise en place de stratégies de communication interne efficaces.`,
  },
  "marketing-strategique-anticipation-concurrents": {
    title: "L'Erreur Stratégique des Marketeurs : Pourquoi l'Anticipation Concurrentielle Change Tout",
    excerpt: "L'Erreur Stratégique que 90% des Marketeurs font. Ils lancent des campagnes sans analyser la concurrence...",
    image: "https://epitaphe.ma/wp-content/uploads/2026/01/pub-et-concurrence.jpg",
    categories: ["Communication globale", "Stratégie de communication"],
    content: `L'Erreur Stratégique que 90% des Marketeurs font : ils lancent des campagnes sans analyser la concurrence.

## Pourquoi c'est un problème ?

Dans un marché saturé, ne pas connaître vos concurrents revient à naviguer à l'aveugle. Vous risquez de :
- Dupliquer des messages déjà utilisés
- Manquer des opportunités de différenciation
- Gaspiller votre budget marketing

## L'anticipation concurrentielle

L'anticipation concurrentielle n'est pas simplement observer ce que font vos concurrents. C'est comprendre :
- Leurs forces et faiblesses
- Leur positionnement
- Leurs prochains mouvements probables

## Comment l'appliquer ?

1. **Veille continue** : Mettez en place un système de veille concurrentielle régulier.
2. **Analyse SWOT** : Évaluez votre position par rapport à vos concurrents.
3. **Différenciation** : Identifiez ce qui vous rend unique.

Epitaphe 360 vous aide à développer une stratégie marketing différenciante et efficace.`,
  },
  "les-secrets-pour-organiser-votre-evenement-avec-plus-de-succes-et-moins-de-stress": {
    title: "Les secrets pour organiser votre événement... avec plus de succès et moins de stress",
    excerpt: "Organiser un événement est loin d'être une mince affaire. Sa réussite dépend de nombreux facteurs.",
    image: "https://epitaphe.ma/wp-content/uploads/2023/05/event.jpg",
    categories: ["Événementiel"],
    content: `Organiser un événement est loin d'être une mince affaire. Sa réussite dépend de nombreux facteurs qu'il faut maîtriser.

## La planification est la clé

Un événement réussi commence par une planification minutieuse. Voici les étapes essentielles :

### 1. Définir vos objectifs
Que souhaitez-vous accomplir avec cet événement ? Lancement de produit ? Team building ? Networking ?

### 2. Établir un budget réaliste
Incluez tous les postes de dépenses : lieu, traiteur, décoration, communication, imprévus.

### 3. Créer un rétroplanning
Établissez un calendrier détaillé avec toutes les tâches et leurs deadlines.

### 4. Choisir les bons partenaires
Entourez-vous de professionnels fiables pour chaque aspect de l'événement.

## Les erreurs à éviter

- Sous-estimer le temps de préparation
- Négliger la communication en amont
- Oublier le plan B
- Ignorer les détails logistiques

Epitaphe 360 est votre partenaire pour des événements mémorables et sans stress.`,
  },
};

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = slug ? blogArticles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-24">
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {article.categories.map((cat) => (
                  <span 
                    key={cat}
                    className="text-sm font-medium bg-primary px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-article-title">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>

          <div className="prose prose-lg dark:prose-invert max-w-none" data-testid="content-article-body">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={idx} className="list-disc pl-6 my-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\. /)) {
                const items = paragraph.split('\n').filter(line => line.match(/^\d\. /));
                return (
                  <ol key={idx} className="list-decimal pl-6 my-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d\. /, '')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={idx} className="text-muted-foreground leading-relaxed my-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </article>

      <ContactSection />
      <Footer />
    </div>
  );
}
