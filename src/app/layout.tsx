import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yanisselie.com"),

  title: {
    default: "Yaniss Elie — Développeur Full-Stack",
    template: "%s | Yaniss Elie",
  },

  description:
    "Yaniss Elie est un développeur Full-Stack basé à Abidjan, Côte d'Ivoire. Découvrez son parcours, ses projets, ses compétences et ses certifications.",

  keywords: [
    "Yaniss Elie",
    "Yaniss-Elie Sey",
    "Yaniss Elie développeur",
    "Yaniss Elie cybersécurité",
    "développeur Abidjan",
    "développeur Côte d'Ivoire",
    "Full-Stack Developer",
    "Cybersecurity",
  ],

  authors: [
    {
      name: "Yaniss Elie",
      url: "https://yanisselie.com",
    },
  ],

  creator: "Yaniss Elie",

  alternates: {
    canonical: "https://yanisselie.com",
  },

  openGraph: {
    type: "website",
    url: "https://yanisselie.com",
    title: "Yaniss Elie — Développeur Full-Stack",
    description:
      "Portfolio officiel de Yaniss Elie — Développeur Full-Stack basé à Abidjan.",
    siteName: "Yaniss Elie",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Yaniss Elie",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans grain">
        <SmoothScroll>
          <Navigation />
          <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Yaniss Elie",
      alternateName: "Yaniss-Elie Sey",
      url: "https://yanisselie.com",
      image: "https://yanisselie.com/me.png",
      jobTitle: "Développeur Full-Stack",
      description:
        "Développeur Full-Stack basé à Abidjan, Côte d'Ivoire.",
      sameAs: [
        // Mets ici tes vrais liens
        "https://www.linkedin.com/in/yaniss-elie-sey-4241563ab/",
        "https://www.github.com/neessey"
      ],
    }),
  }}
/>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
