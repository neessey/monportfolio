/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSingleton, defaultProfile, type ProfileContent } from "@/lib/cms";
import gsap from "gsap";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [profile, setProfile] = useState<ProfileContent>(defaultProfile);

  useEffect(() => {
    getSingleton<ProfileContent>("site", "profile").then((value) => value && setProfile({ ...defaultProfile, ...value })).catch(() => {});
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".hero-scroll-hint",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-ink pb-8 pt-36 md:pt-0 md:pb-12">
      <div className="absolute inset-0 opacity-90">
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* TEXTE */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={item}
              className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-mist/60"
            >
              {profile.eyebrow}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-mist"
            >
              {profile.titleLine1}
              <br />
              <span className="text-mist/40">{profile.titleLine2}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-lg leading-relaxed text-mist/65 md:text-xl"
            >
              {profile.intro}
            </motion.p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] sm:w-[340px] md:w-[420px] lg:w-[480px]">

              {/* glow subtil */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/20 via-transparent to-cyan-500/20 blur-2xl" />

              <img
                src={profile.imageUrl || "/me.png"}
                alt="Portrait"
                className="relative z-10 w-full rounded-2xl object-cover shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
