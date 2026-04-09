"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import Image from "next/image";

type WorkCaseStudyProps = {
  project: Project;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkCaseStudy({ project }: WorkCaseStudyProps) {
  return (
    <article className="min-h-[100dvh] bg-ink pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-mist/50 transition hover:text-accent"
          >
            <span aria-hidden>←</span>
            Retour aux projets
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease }}
          className="mt-12 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent/90">
            {project.year} · {project.role}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-mist">
            {project.title}
          </h1>
          <p className="mt-6 text-xl text-mist/65 md:text-2xl">{project.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, clipPath: "inset(8% 6% 8% 6%)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          className="relative mt-16 aspect-[21/9] overflow-hidden rounded-2xl border border-mist/10 md:mt-20"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient}`}
          />
          {project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover opacity-60 mix-blend-luminosity"
            />
          )}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="space-y-8"
          >
            {project.longDescription.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-mist/70">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="h-fit rounded-2xl border border-mist/10 bg-ink-soft/60 p-8 backdrop-blur-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-mist/45">
              Stack
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-mist/15 px-3 py-1.5 text-sm text-mist/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-8">
              {project.highlights.map((h) => (
                <div key={h.title}>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent/90">
                    {h.title}
                  </p>
                  <p className="mt-2 text-mist/65">{h.body}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 flex flex-wrap items-center justify-between gap-8 border-t border-mist/10 pt-12"
        >
          <p className="max-w-md text-mist/55">
            {project.description}
          </p>
          <Link
            href="/#contact"
            className="rounded-full border border-mist/20 px-8 py-3 text-sm font-medium text-mist transition hover:border-accent/50 hover:text-accent"
          >
            Contactez moi pour en discuter
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
