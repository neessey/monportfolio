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

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smoothX}% ${smoothY}%, rgba(196,165,116,0.14), transparent 55%)`;

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
        className="group relative block overflow-hidden rounded-2xl border border-mist/10 bg-ink-soft/80"
      >
        <motion.div
          className="relative aspect-[16/10] overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient}`}
          />{project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover opacity-60 mix-blend-luminosity"
            />
          )}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          <div className="absolute bottom-6 left-6 font-display text-6xl font-semibold text-mist/10 md:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>

        <div className="relative p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-mist/45">
                {project.year} · {project.role}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-mist md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-prose text-mist/60">{project.tagline}</p>
            </div>
            <span className="mt-1 hidden shrink-0 rounded-full border border-mist/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-mist/50 transition group-hover:border-accent/40 group-hover:text-accent md:inline-block">
              Voir
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
