"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, BriefcaseBusiness, CircleUserRound, FolderKanban, ArrowUpRight, Layers3 } from "lucide-react";
import { getCertifications } from "@/lib/certifications";
import { getCollection, getSingleton, type Experience, type ProfileContent, defaultProfile } from "@/lib/cms";
import { projects } from "@/data/projects";
import { AdminPageHeader } from "@/components/admin/AdminShell";

export default function DashboardOverview() {
  const [counts, setCounts] = useState({ projects: projects.length, certifications: 0, experiences: 0, skills: 0 });
  const [profile, setProfile] = useState<ProfileContent>(defaultProfile);

  useEffect(() => {
    Promise.all([
      getCertifications().catch(() => []),
      getCollection<Experience>("experiences").catch(() => []),
      getSingleton<unknown>("site", "skills").catch(() => null),
      getSingleton<ProfileContent>("site", "profile").catch(() => null),
    ]).then(([certs, experiences, skills, storedProfile]) => {
      const panels = Array.isArray((skills as { panels?: unknown[] } | null)?.panels) ? ((skills as { panels?: unknown[] }).panels?.length ?? 0) : 0;
      setCounts({ projects: projects.length, certifications: certs.length, experiences: experiences.length, skills: panels });
      if (storedProfile) setProfile({ ...defaultProfile, ...storedProfile });
    });
  }, []);

  const cards = [
    { label: "Projets", value: counts.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Certifications", value: counts.certifications, href: "/admin/certifications", icon: Award },
    { label: "Expériences", value: counts.experiences, href: "/admin/experiences", icon: BriefcaseBusiness },
    { label: "Panneaux de compétences", value: counts.skills, href: "/admin/skills", icon: Layers3 },
  ];

  return <div><AdminPageHeader eyebrow="Vue d'ensemble" title="Ton portfolio, en un seul endroit." description="Gère le contenu public depuis ce dashboard. Les modifications sont enregistrées dans Firestore et peuvent être publiées sans redéployer le site." action={<Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-mist px-5 py-3 text-sm font-semibold text-ink hover:bg-accent">Voir le site <ArrowUpRight size={15}/></Link>}/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({label,value,href,icon:Icon})=><Link key={label} href={href} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-accent/30"><div className="flex items-center justify-between"><div className="rounded-xl border border-white/10 p-2.5 text-mist/45 group-hover:text-accent"><Icon size={18}/></div><ArrowUpRight size={15} className="text-mist/20 transition group-hover:text-accent"/></div><p className="mt-8 text-3xl font-semibold">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist/35">{label}</p></Link>)}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.28em] text-accent">Aperçu</p><h2 className="mt-2 font-display text-2xl font-semibold">Profil public</h2></div><Link href="/admin/profile" className="text-xs text-mist/35 hover:text-accent">Modifier ↗</Link></div><div className="mt-8 flex gap-5"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">{profile.imageUrl && <img src={profile.imageUrl} alt="" className="h-full w-full object-cover"/>}</div><div><p className="text-xs uppercase tracking-[0.2em] text-accent/70">{profile.eyebrow}</p><h3 className="mt-2 font-display text-2xl font-semibold">{profile.titleLine1} <span className="text-mist/35">{profile.titleLine2}</span></h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-mist/45">{profile.intro}</p></div></div></section><section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"><p className="text-[10px] uppercase tracking-[0.28em] text-accent">Accès rapides</p><h2 className="mt-2 font-display text-2xl font-semibold">Actions</h2><div className="mt-6 space-y-2"><Link href="/admin/certifications" className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-mist/60 hover:border-accent/30 hover:text-mist">Ajouter une certification <span>→</span></Link><Link href="/admin/projects" className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-mist/60 hover:border-accent/30 hover:text-mist">Modifier un projet <span>→</span></Link><Link href="/admin/about" className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-mist/60 hover:border-accent/30 hover:text-mist">Mettre à jour le parcours <span>→</span></Link><Link href="/admin/socials" className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-mist/60 hover:border-accent/30 hover:text-mist">Modifier les contacts <span>→</span></Link></div></section></div>
  </div>;
}
