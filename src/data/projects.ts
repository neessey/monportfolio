export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  cover: string;
  coverGradient: string;
  description: string;
  longDescription: string[];
  stack: string[];
  liveUrl?: string;
  highlights: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "harlem-hair-braiding",
    title: "Harlem Hair Braiding",
    liveUrl: "https://harlem-hair-braiding.vercel.app/",
    tagline: "Salon de coiffure américain avec bookings en ligne",
    year: "2025",
    role: " Frontend Developer",
    cover: "/images/harlem.jpg",
    coverGradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    description:
      "Le parcours de réservation est repensé pour être plus visuel et intuitif, avec des médias immersifs, une recherche prédictive et un checkout fluide.",

    longDescription: ["Reimagination du parcours de réservation avec des médias immersifs, une recherche prédictive et un checkout fluide. Les budgets de performance sont traités comme des contraintes de conception, pas des réflexions après coup.",
      "Des animations fluides et naturelles inspirées de la physique réelle, avec des micro-interactions pour le feedback utilisateur. Les médias sont optimisés pour le web avec des placeholders artistiques et un chargement progressif."

    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    highlights: [
      {
        title: "Performance",
        body: "Media optimisés pour le web avec des placeholders artistiques et un chargement progressif.",
      },
      {
        title: "Interactions",
        body: "Transitions fluides et naturelles inspirées de la physique réelle, avec des micro-interactions pour le feedback utilisateur.",
      },
    ],
  },
  {
    slug: "binko",
    title: "Binko",
    liveUrl: "https://binko-assoc.vercel.app/",
    tagline: "Agence Immobilière avec un dashboard de gestion",
    year: "2026",
    role: "Frontend Developer",
    cover: "/images/binko.jpg",
    coverGradient: "from-cyan-500/15 via-blue-500/10 to-transparent",
    description:
      "Solution de gestion immobilière avec des visualisations des biens en temps réel, et un dashboard admin interactif.",
    longDescription: [
      "Développement d'une solution de gestion immobilière avec des visualisations des biens en temps réel, et un dashboard admin interactif. Les agents peuvent voir les performances de leurs annonces, gérer les visites et traiter efficacement grâce à un dashboard.",
      "Intégration de technologies modernes pour assurer une expérience utilisateur optimale et des performances élevées.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      {
        title: "Mises à jour en temps réel",
        body: "Visualisations des biens et des performances en temps réel pour permettre aux agents de prendre des décisions éclairées rapidement.",
      },
      {
        title: "Dashboard interactif",
        body: "Un dashboard admin intuitif pour gérer les annonces, les visites et les interactions avec les clients de manière efficace.",
      },
    ],
  },
  {
    slug: "ysedrop",
    title: "YseDrop",
    liveUrl: "https://ysedrop.onrender.com",
    tagline: "Gestion de l'air pour les espaces publics",
    year: "2026",
    role: "FullStack Developer",
    cover: "/images/yse.jpg",
    coverGradient: "from-amber-500/15 via-rose-500/10 to-transparent",
    description:
      "Plateforme de transfert et de partage de fichiers rapide et sécurisé, permettant d’envoyer et recevoir des fichiers entre appareils en temps réel.",
    longDescription: [
      "Développement d'une plateforme de transfert et de partage de fichiers rapide et sécurisé, permettant d’envoyer et recevoir des fichiers entre appareils en temps réel. L'application utilise des technologies modernes pour assurer une expérience utilisateur fluide et des performances élevées.",
      "Mise en place de fonctionnalités avancées telles que le chiffrement de bout en bout, la gestion des permissions et une interface utilisateur intuitive pour faciliter le partage de fichiers entre utilisateurs.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    highlights: [
      {
        title: "Systeme de design",
        body: "Création d'un système de design complet pour assurer la cohérence visuelle et faciliter le développement de nouvelles fonctionnalités.",
      },
      {
        title: "Fonctionnalités avancées",
        body: "Mise en place de fonctionnalités avancées telles que le chiffrement de bout en bout, la gestion des permissions et une interface utilisateur intuitive pour faciliter le partage de fichiers entre utilisateurs.",
      },
    ],

  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
