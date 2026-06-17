"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, staggerItem } from "./Reveal";

const milestones = [
  { year: "2022", label: "Informatique & électronique (Arduino)" },
  { year: "2024", label: "Premiers projets en développement web" },
  { year: "2025", label: "Construction d’applications complètes" },
  { year: "2026", label: "Ingénierie logicielle" },
];

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
            Interfaces réfléchies.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-mist/70 md:text-xl">
              Je suis développeuse front-end, à la croisée du design et de la technique. Je conçois des expériences pensées dans les moindres détails, du premier pixel à la dernière interaction. J’accorde une attention particulière aux micros-interactions, aux animations porteuses de sens et à des performances solides dans des conditions réelles.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-mist/55 md:text-xl">
              Actuellement disponible pour des collaborations sélectionnées et des équipes produit
              qui veulent créer sans compromis.
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
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-mist/45">
            Skills
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-mist/15 bg-ink/60 px-4 py-2 text-sm text-mist/75 backdrop-blur-sm transition hover:border-accent/35 hover:text-mist"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
