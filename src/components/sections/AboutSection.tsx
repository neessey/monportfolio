"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultAbout, defaultSkills, getSingleton, type AboutContent, type SkillPanel } from "@/lib/cms";
import { Reveal, Stagger, staggerItem } from "./Reveal";

export function AboutSection() {
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [skills, setSkills] = useState<SkillPanel[]>(defaultSkills);
  useEffect(() => {
    Promise.all([getSingleton<AboutContent>("site", "about"), getSingleton<{ panels: SkillPanel[] }>("site", "skills")]).then(([a, s]) => {
      if (a) setAbout({ ...defaultAbout, ...a });
      if (s?.panels) setSkills(s.panels);
    }).catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="relative border-t border-mist/10 bg-ink-muted/40 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">{about.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-mist">{about.title}</h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={0.08}>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={`${index === 0 ? "" : "mt-8"} text-lg leading-relaxed ${index === 0 ? "text-mist/70" : "text-mist/55"} md:text-xl`}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div>
            <Reveal delay={0.12}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-mist/45">
                Constante évolution
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-6">
              {about.milestones.map((m) => (
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
           <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
            Compétences
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {skills.map((panel, panelIndex) => (
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