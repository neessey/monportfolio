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
  highlights: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "harlem-hair-braiding",
    title: "Harlem Hair Braiding",
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
        title: "Latency",
        body: "Sub-100ms updates on streaming channels with graceful degradation offline.",
      },
      {
        title: "A11y",
        body: "Keyboard-first navigation across charts and incident timelines.",
      },
    ],
  },
  {
    slug: "airPublic",
    title: "AirPublic",
    tagline: "Gestion de l'air pour les espaces publics",
    year: "2024",
    role: "Frontend Developer",
    cover: "/images/air.jpg",
    coverGradient: "from-amber-500/15 via-rose-500/10 to-transparent",
    description:
      "Dashboard de monitoring de la qualité de l'air pour les villes, avec des visualisations claires et des alertes en temps réel.",
    longDescription: [
      "Création d'un dashboard de monitoring de la qualité de l'air pour les villes, avec des visualisations claires et des alertes en temps réel. Les données sont présentées de manière accessible pour les décideurs et le grand public, avec des recommandations d'action basées sur les niveaux de pollution.",
    ],
    stack: ["Next.js", "Framer Motion", "Sanity", "Tailwind CSS"],
    highlights: [
      {
        title: "Systeme de design",
        body: "Un design system robuste avec des composants réutilisables et une documentation complète pour assurer la cohérence à travers le dashboard.",
      },
      {
        title: "Intégration CMS",
        body: "Intégration de Sanity pour permettre aux équipes non techniques de mettre à jour les contenus et les alertes sans intervention du développement.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
