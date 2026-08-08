"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { stiffness: 80, damping: 28 });
  const smoothY = useSpring(my, { stiffness: 80, damping: 28 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothX}% ${smoothY}%, rgba(196,165,116,0.16), transparent 55%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  function onLeave() {
    mx.set(50);
    my.set(50);
  }

  const category = project.role.replace(" Developer", "").trim().toUpperCase();
  const visibleStack = project.stack.slice(0, 3);
  const extraCount = project.stack.length - visibleStack.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist/10 bg-ink-soft/80 transition-colors duration-300 hover:border-accent/25"
      >
        {/* Bloc image */}
        <motion.div
          className="relative aspect-[16/11] overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient}`} />

          {project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover opacity-60 mix-blend-luminosity"
            />
          )}

          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/10" />

          <div className="relative z-10 flex items-center justify-between p-6 text-[10px] uppercase tracking-[0.25em] text-mist/60">
            <span>Fiche {String(index + 1).padStart(2, "0")}</span>
            <span className="text-accent/90">{project.year}</span>
          </div>
        </motion.div>

        {/* Contenu */}
        <div className="relative flex flex-1 flex-col p-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent/90">
            {category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-mist md:text-[1.7rem]">
            {project.title}
          </h3>
          <p className="mt-3 text-mist/60">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {visibleStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-mist/15 px-3 py-1 text-xs text-mist/70"
              >
                {tech}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-full border border-mist/15 px-3 py-1 text-xs text-mist/50">
                +{extraCount}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-mist/10 pt-6 mt-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-mist/45 transition group-hover:text-accent">
              Consulter la fiche
            </span>
            <span className="text-mist/40 transition group-hover:translate-x-1 group-hover:text-accent">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}