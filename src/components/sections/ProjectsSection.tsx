"use client";

import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
            Projets
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-mist">
            Des expériences digitales pensées dans les moindres détails.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mist/60">
            Ouvrez un projet pour avoir la narration complète, la pile et les résultats.

          </p>
        </Reveal>

        <div className="mt-20 grid gap-10 md:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
