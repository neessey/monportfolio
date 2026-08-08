"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, staggerItem } from "./Reveal";

const milestones = [
  { year: "2022", label: "Informatique & électronique (Arduino)" },
  { year: "2024", label: "Premiers projets en développement web" },
  { year: "2025", label: "Construction d’applications complètes" },
  { year: "2026", label: "Ingénierie logicielle" },
];

<<<<<<< HEAD
const skills = [
  "TypeScript",
  "React / Next.js",
  "Tailwind CSS",
  "HTML / CSS",
  "MySQL",
  "PHP / Laravel",
  "Node.js",
  "Python",
  "Vercel / Render",
  "Test Logiciel",
  "Visual Code",
  "GitHub / Git",

=======
const skillPanels = [
  {
    title: "Langages & Technologies",
    ref: "RÉF. L",
    items: [
      "HTML5 / CSS3",
      "Next.js / Vite.js / React",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "PHP / Laravel",
      "Node.js",
      "Python (bases)",
    ],
  },
  {
    title: "Outils & Environnement",
    ref: "RÉF. O",
    items: [
      "Visual Studio Code",
      "GitHub",
      "Vercel / Render",
      "Firebase / Supabase",
      "Optimisation UI/UX",
      "Responsive Design",
      "Tests & Recette",
    ],
  },
>>>>>>> 5d07ac2 (update)
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-mist/10 bg-ink-muted/40 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
            About
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-mist">
            Notice Bibliographique.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-mist/70 md:text-xl">
              J&apos;ai fait du développement mon métier à part entière. Devenue développeuse frontend, j&apos;aime tenir les deux bouts : la précision du code et le soin apporté à l&apos;expérience.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-mist/55 md:text-xl">
             Tout a commencé par la curiosité : comprendre comment fonctionnent les sites que je consultais, puis en fabriquer moi-même. Les premières pages en HTML et CSS ont laissé place à des applications plus complètes.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-mist/55 md:text-xl">
            Aujourd&apos;hui, je construis des produits de bout en bout : maquette et identité visuelle, développement front avec React · TypeScript · Tailwind, API et données avec Node.js · Laravel · MySQL, et mise en production sur Vercel ou Render. Je teste, je corrige, je documente.
          </p>
          </Reveal>

          <div>
            <Reveal delay={0.12}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-mist/45">
                Constante évolution
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-6">
              {milestones.map((m) => (
                <motion.div
                  key={m.year}
                  variants={staggerItem}
                  className="flex gap-6 border-b border-mist/10 pb-6 last:border-0"
                >
                  <span className="font-display text-sm text-accent">{m.year}</span>
                  <span className="text-mist/70">{m.label}</span>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>

        <Reveal className="mt-20" delay={0.05}>
<<<<<<< HEAD
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-mist/45">
            Skills
=======
           <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
            Compétences
>>>>>>> 5d07ac2 (update)
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {skillPanels.map((panel, panelIndex) => (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.75,
                  delay: panelIndex * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-mist/10 bg-ink-soft/60 p-8 backdrop-blur-sm md:p-10"
              >
                <div className="flex items-baseline justify-between border-b border-mist/10 pb-6">
                  <h3 className="font-display text-2xl font-semibold text-mist md:text-[1.6rem]">
                    {panel.title}
                  </h3>
                  <span className="shrink-0 pl-4 text-[10px] uppercase tracking-[0.3em] text-accent/80">
                    {panel.ref}
                  </span>
                </div>

                <ul className="mt-2">
                  {panel.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-b border-mist/10 py-5 last:border-0"
                    >
                      <span className="w-6 shrink-0 font-mono text-[10px] text-mist/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-mist/10" />
                      <span className="text-right text-mist/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}