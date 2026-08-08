"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/#about", label: "À propos" },
  { href: "/#work", label: "Projets" },
  { href: "/#contact", label: "Contact" },
];

const MARQUEE_ITEMS = Array(8).fill("YANISS-ELIE SEY");

export function Navigation() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col">

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-b border-white/10 bg-ink/80 py-3 backdrop-blur-sm">
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0" aria-hidden={set === 1}>
              {MARQUEE_ITEMS.map((name, i) => (
                <span
                  key={i}
                  className="mx-10 font-black uppercase tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 1 }}
                >
                  {name}
                  <span className="mx-10 font-thin text-white/25">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .marquee-track {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      {/* ── Nav ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mix-blend-difference"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-mist md:text-xl"
          >
            YE<span className="text-accent">.</span>
          </Link>
          <ul className="flex max-w-[72vw] flex-nowrap items-center gap-4 overflow-x-auto py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-mist/90 scrollbar-none sm:max-w-none sm:gap-8 sm:text-sm sm:tracking-[0.2em]">
            {links.map((l) => (
              <li key={l.href} className="shrink-0">
                <Link href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}

          </ul>
        </nav>
      </motion.header>

    </div>
  );
}