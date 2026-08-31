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
    tagline: "Salon de coiffure américain avec bookings en ligne développée par Yaniss-Elie Sey.",
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
    slug: "ysedrop",
    title: "YseDrop",
    liveUrl: "https://ysedrop.onrender.com",
    tagline: "Plateforme de transfert et de partage de fichiers rapide et sécurisé développée par Yaniss-Elie Sey.",
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
  {
    slug: "binko",
    title: "Binko",
    liveUrl: "https://binko-assoc.vercel.app/",
    tagline: "Agence Immobilière avec un dashboard de gestion développée par Yaniss-Elie Sey.",
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
  slug: "colonie-ci",
  title: "Colonie CI",
  liveUrl: "https://coloniee-ci.onrender.com",
  tagline: "Plateforme e-commerce dédiée au miel et aux produits de la ruche développée par Yaniss-Elie Sey.",
  year: "2026",
  role: "FullStack Developer",
  cover: "/images/colonie-ci.jpeg",
  coverGradient: "from-amber-500/15 via-yellow-500/10 to-transparent",
  description:
    "Plateforme e-commerce permettant de découvrir et commander des produits de la ruche, avec un système de fidélisation intégré.",
  longDescription: [
    "Conception et développement d'une plateforme e-commerce moderne dédiée à la vente de miel et de produits issus de la ruche. L'expérience permet aux clients de découvrir les produits, consulter leurs informations et effectuer leurs commandes depuis une interface intuitive.",
    "Intégration d'un système de fidélisation baptisé « La Ruche », permettant aux clients de bénéficier d'une expérience plus personnalisée et de suivre leur progression au sein du programme.",
  ],
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
  highlights: [
    {
      title: "E-commerce",
      body: "Catalogue de produits et parcours d'achat pensés pour offrir une expérience simple, fluide et adaptée au mobile.",
    },
    {
      title: "La Ruche",
      body: "Système de fidélisation intégré à la plateforme pour renforcer l'engagement et encourager les clients à revenir.",
    },
  ],
},

  {
    slug: "huinestfood",
    title: "HuinestFood",
    liveUrl: "https://huinestfood.vercel.app",
    tagline: "Plateforme digitale dédiée à la restauration développée par Yaniss-Elie Sey.",
    year: "2026",
    role: "FullStack Developer",
    cover: "/images/huinest.jpeg",
    coverGradient: "from-orange-500/15 via-red-500/10 to-transparent",
    description:
      "Expérience digitale moderne pour découvrir, présenter et gérer une offre de restauration en ligne.",
    longDescription: [
      "Conception et développement d'une plateforme web dédiée à la restauration, avec une interface pensée pour rendre la découverte des produits simple et agréable.",
      "Travail sur l'expérience utilisateur, la présentation des contenus et l'adaptation de l'interface aux différents formats d'écran.",
    ],
    stack: ["Vite.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      {
        title: "Expérience utilisateur",
        body: "Une interface claire et immersive permettant de découvrir rapidement les différentes offres.",
      },
      {
        title: "Responsive",
        body: "Une expérience optimisée pour les smartphones, tablettes et ordinateurs.",
      },
    ],
  },

  {
    slug: "deep-digital",
    title: "Deep Digital",
    liveUrl: "https://deep-digit.vercel.app",
    tagline: "Expérience digitale moderne pour une agence créative développée par Yaniss-Elie Sey.",
    year: "2026",
    role: "Frontend Developer",
    cover: "/images/deep-digit.jpeg",
    coverGradient: "from-indigo-500/15 via-purple-500/10 to-transparent",
    description:
      "Site web moderne conçu pour présenter l'identité, les services et l'univers digital de Deep Digital.",
    longDescription: [
      "Conception d'une expérience web moderne mettant en avant l'identité visuelle et les services de Deep Digital.",
      "Développement d'une interface responsive avec des animations et des interactions pensées pour offrir une navigation fluide et une présentation immersive.",
    ],
    stack: ["Vite.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      {
        title: "Direction artistique",
        body: "Une interface visuelle conçue pour renforcer l'identité digitale et donner une présence forte à la marque.",
      },
      {
        title: "Interactions",
        body: "Animations et micro-interactions utilisées pour rendre la navigation plus dynamique et immersive.",
      },
    ],
  },
];







export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
