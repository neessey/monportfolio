"use client";

import { useEffect, useState } from "react";
import { getCollection, type ProjectContent } from "@/lib/cms";
import { getProjectBySlug, type Project } from "@/data/projects";
import { WorkCaseStudy } from "@/components/work/WorkCaseStudy";

export function WorkPageClient({ slug }: { slug: string }) {
  const fallback = getProjectBySlug(slug);
  const [project, setProject] = useState<Project | null | undefined>(fallback);

  useEffect(() => {
    getCollection<ProjectContent>("projects").then((items) => {
      const found = items.find((item) => item.slug === slug && item.visible !== false);
      if (found) setProject(found);
      else if (!fallback) setProject(null);
    }).catch(() => {});
  }, [slug, fallback]);

  if (project === undefined) return <div className="min-h-screen bg-ink" />;
  if (!project) return <div className="flex min-h-screen items-center justify-center bg-ink text-mist"><p>Projet introuvable.</p></div>;
  return <WorkCaseStudy project={project} />;
}
