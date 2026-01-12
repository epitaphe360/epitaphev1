export interface SolutionItem {
  slug: string;
  label: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  needs: string[];
  content: string;
}

export interface SolutionCategory {
  slug: string;
  label: string;
  image: string;
  items: SolutionItem[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "communication-corporate",
    label: "Communication corporate",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/Com-CORPORATE-1.jpg",
    items: [
      {
        slug: "communication-corporate",
        label: "Communication corporate",
        description: "Gagnez en positionnement !",
        heroTitle: "Gagnez en positionnement !",
        heroSubtitle: "Une communication corporate pertinente requiert une stratégie bien réfléchie et des actions structurées et percutantes.",
        heroImage: "https://epitaphe.ma/wp-content/uploads/2020/05/bg-com-corporate.jpg",
        needs: [
          "Une maîtrise 360° des métiers du Marketing et de la Communication",
          "Une écoute active de vos besoins",
          "Des moyens pour optimiser vos budgets",
          "Des actions pour maximiser votre visibilité",
          "Des outils pour mesurer votre ROI"
        ],
        content: "Confiez cette mission à une agence avec une expertise et une vision 360° qui vous permet de maîtriser votre communication corporate, en vous proposant des solutions globales, intégrées et modernes. De la rédaction de messages au design graphique et print petit et grand formats, de l’événementiel à la communication digitale, en passant par la communication interne ou financière… Epitaphe 360 vous accompagne dans l’élaboration et l’exécution d’actions pertinentes et homogènes qui répondent aux attentes de chacun de vos publics cibles."
      }
    ]
  },
  {
    slug: "communication-produits",
    label: "Communication produits",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/com-produits.jpg",
    items: [
      {
        slug: "communication-produits",
        label: "Communication produits",
        description: "Gagnez des clients et... du temps en plus !",
        heroTitle: "Gagnez des clients et... du temps en plus !",
        heroSubtitle: "Une bonne communication produits (ou services) peut vous aider à mettre en avant votre proposition de valeur et à vous distinguer de vos concurrents.",
        heroImage: "https://epitaphe.ma/wp-content/uploads/2020/05/bg-com-produits.jpg",
        needs: [
          "Un accompagnement tout au long de la vie de votre produit",
          "Des actions complémentaires et homogènes pour plus d’impact",
          "Un seul interlocuteur pour plusieurs prestations"
        ],
        content: "Grâce à nos compétences 360°, nous vous proposons un interlocuteur unique pour trouver le bon mot et le bon format qui capteraient votre marché, et nous vous accompagnons dans l’élaboration et l’exécution d’actions ciblées (digital, événements, PLV…) pour positionner ou promouvoir vos produits et services et activer des leviers de vente adaptés à vos clients."
      }
    ]
  },
  {
    slug: "communication-evenementielle",
    label: "Communication événementielle",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/com-event.jpg",
    items: [
      {
        slug: "communication-evenementielle",
        label: "Communication événementielle",
        description: "Marquez les esprits!",
        heroTitle: "Marquez les esprits!",
        heroSubtitle: "La communication événementielle demeure parmi les techniques de communication à fort impact. Particulièrement si votre événement est intéressant, ciblé, maîtrisé et convenablement organisé.",
        heroImage: "https://epitaphe.ma/wp-content/uploads/2020/05/bg-com-event.jpg",
        needs: [
          "Des idées originales et des concepts d’événements attractifs",
          "Un seul interlocuteur pour la gestion de l’amont à l’aval",
          "Conception des supports de communication (Back drop, photocall, Fonds de scènes)",
          "Digitalisation des événements à la demande"
        ],
        content: "Conceptualisation, rédaction de contenu, création graphique, print, digitalisation, promotion, logistique et mise en place, coordination, suivi et évaluation, goodies… Notre agence de communication Epitaphe360 vous apporte une réelle valeur ajoutée en gérant votre événement de A à Z."
      }
    ]
  },
  {
    slug: "communication-financiere",
    label: "Communication financière",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/com-financiere.jpg",
    items: [
      {
        slug: "communication-financiere",
        label: "Communication financière",
        description: "Gagnez de la notoriété !",
        heroTitle: "Gagnez de la notoriété !",
        heroSubtitle: "Annonce de résultats, rapports d’activité, Introduction en bourse…, la communication financière est importante pour mettre en avant vos résultats financiers.",
        heroImage: "https://epitaphe.ma/wp-content/uploads/2020/05/photobas-comfi.jpg",
        needs: [
          "Un accompagnement de proximité pour définir vos messages",
          "Des experts pour vous aider à écrire vos discours et vous coacher",
          "Un seul interlocuteur pour toutes vos actions : rédaction, mise en page, impression, diffusion"
        ],
        content: "Notre agence de communication, Epitaphe 360 vous accompagne dans toutes les étapes de votre communication financière : de la rédaction de contenus (rapports d’activité annuels, notes d’information…) à sa diffusion (interne et externe), en passant par le design graphique, le print, la digitalisation de vos supports de communication ou l’organisation d’événement."
      }
    ]
  },
  {
    slug: "communication-interne",
    label: "Communication interne",
    image: "https://epitaphe.ma/wp-content/uploads/2020/05/com-interne.jpg",
    items: [
      {
        slug: "communication-interne",
        label: "Communication interne",
        description: "Gagnez en cohésion d'équipe !",
        heroTitle: "Gagnez en cohésion d'équipe !",
        heroSubtitle: "La communication interne peut être un véritable atout pour l’information et la motivation de vos salariés.",
        heroImage: "https://epitaphe.ma/wp-content/uploads/2020/05/bg-com-interne.jpg",
        needs: [
          "Accompagnement dans toutes les étapes de réalisation de vos supports internes",
          "Une équipe expérimentée à l’écoute de vos besoins",
          "Un budget optimisé avec des prestations réalisées en interne",
          "Des outils modernes pour digitaliser votre communication interne"
        ],
        content: "Epitaphe 360 vous accompagne pas à pas aussi bien dans l’élaboration et l’impression de vos journaux et supports, que dans l’organisation de vos événements et la digitalisation de votre communication interne. Grâce à notre expertise, développez une culture d’appartenance forte au sein de votre entreprise."
      }
    ]
  }
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  for (const category of solutionCategories) {
    const solution = category.items.find(item => item.slug === slug);
    if (solution) return solution;
  }
  return undefined;
}

export function getCategoryBySlug(slug: string): SolutionCategory | undefined {
  return solutionCategories.find(cat => cat.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutionCategories.flatMap(cat => cat.items.map(item => item.slug));
}
