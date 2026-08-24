"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Award, BriefcaseBusiness, ChevronLeft, CircleUserRound, ExternalLink,
  FileText, FolderKanban, Gauge, Globe2, LogOut, Menu, Settings,
  Sparkles, UserRoundCog, X, Layers3,
} from "lucide-react";
import { useState } from "react";

const items = [
  { href: "/admin", label: "Vue d'ensemble", icon: Gauge, exact: true },
  { href: "/admin/profile", label: "Profil & Hero", icon: CircleUserRound },
  { href: "/admin/about", label: "À propos", icon: FileText },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/experiences", label: "Expériences", icon: BriefcaseBusiness },
  { href: "/admin/skills", label: "Compétences", icon: Layers3 },
  { href: "/admin/socials", label: "Réseaux & Contact", icon: Globe2 },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    if (auth) await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-[#080809] text-mist">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/10 bg-[#0b0b0d] p-5 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2 py-2">
          <Link href="/admin" onClick={() => setOpen(false)} className="font-display text-xl font-bold tracking-tight">YE<span className="text-accent">.</span> <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.28em] text-mist/35">CMS</span></Link>
          <button className="rounded-lg p-2 text-mist/45 hover:bg-white/5 lg:hidden" onClick={() => setOpen(false)}><X size={18}/></button>
        </div>

        <div className="mt-8 rounded-2xl border border-accent/15 bg-accent/[0.05] p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-accent/80">Espace privé</p>
          <p className="mt-2 text-sm font-medium text-mist/85">Gestion du portfolio</p>
          <p className="mt-1 text-xs leading-relaxed text-mist/35">Modifie le contenu public sans toucher au code.</p>
        </div>

        <nav className="mt-7 flex-1 space-y-1 overflow-y-auto pr-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-mist text-ink" : "text-mist/50 hover:bg-white/[0.04] hover:text-mist"}`}><Icon size={17} className={active ? "text-ink" : "text-mist/35 group-hover:text-accent"}/><span>{item.label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"/>}</Link>;
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 pt-4">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-mist/45 hover:bg-white/[0.04] hover:text-mist"><ExternalLink size={17}/> Voir le portfolio</Link>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-mist/45 hover:bg-red-500/10 hover:text-red-300"><LogOut size={17}/> Déconnexion</button>
        </div>
      </aside>

      {open && <button aria-label="Fermer le menu" className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}/>}

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#080809]/85 px-5 backdrop-blur-xl md:px-8">
          <button className="rounded-xl border border-white/10 p-2 text-mist/60 lg:hidden" onClick={() => setOpen(true)}><Menu size={20}/></button>
          <div className="hidden lg:block"><p className="text-[10px] uppercase tracking-[0.3em] text-mist/25">Dashboard</p><p className="mt-1 text-sm text-mist/65">Administration du portfolio</p></div>
          <div className="ml-auto flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-mist/40 sm:flex"><Sparkles size={13} className="text-accent"/> En ligne</div><Link href="/" target="_blank" className="rounded-xl border border-white/10 p-2 text-mist/45 hover:text-mist"><ExternalLink size={17}/></Link></div>
        </header>
        <main className="min-h-[calc(100vh-72px)] px-5 py-7 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}

export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-9 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] uppercase tracking-[0.3em] text-accent/80">{eyebrow}</p><h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/40">{description}</p>}</div>{action}</div>;
}

export const fieldClass = "w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-mist outline-none transition placeholder:text-mist/20 focus:border-accent/50 focus:bg-white/[0.04]";
export const textareaClass = `${fieldClass} resize-y leading-relaxed`;
