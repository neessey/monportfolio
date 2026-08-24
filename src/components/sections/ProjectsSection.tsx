"use client";

import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects as fallbackProjects, type Project } from "@/data/projects";
import { getCollection, type ProjectContent } from "@/lib/cms";
import { useEffect, useState } from "react";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    getCollection<ProjectContent>("projects").then((items) => {
      const visible = items.filter((item) => item.visible !== false).sort((a,b) => a.order - b.order);
      if (visible.length) setProjects(visible);
    }).catch(() => {});
  }, []);

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">Projets</p>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-mist">Des expériences digitales pensées dans les moindres détails.</h2>
          <p className="mt-6 max-w-xl text-lg text-mist/60">Ouvrez un projet pour avoir la narration complète, la pile et les résultats.</p>
        </Reveal>
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} />)}
        </div>
        <div className="mt-16 flex justify-center">
          <a href="https://github.com/neessey" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-mist/20 px-8 py-3 text-sm font-medium text-mist transition hover:border-accent/50 hover:text-accent">Voir plus de projets sur GitHub <span className="transition group-hover:translate-x-1">↗</span></a>
        </div>
      </div>
    </section>
  );
}
