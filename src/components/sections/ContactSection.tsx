"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="relative border-t border-mist/10 bg-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
              Contact
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-mist">
              Créons quelque chose d&apos;extraordinaire ensemble.
            </h2>
            <p className="mt-6 text-lg text-mist/60">
              Dites-moi en détail votre produit, votre calendrier et ce à quoi ressemble le produit final. Je
              réponds généralement dans les deux jours ouvrables.
            </p>
            <a
              href="mailto:yanisseliesey@gmail.com"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-mist"
            >
              yanisseliesey@gmail.com
              <span aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {[
                { id: "name", label: "Nom", type: "text", auto: "name" as const },
                { id: "email", label: "Email", type: "email", auto: "email" as const },
              ].map((field) => (
                <div key={field.id} className="relative">
                  <motion.label
                    htmlFor={field.id}
                    className="pointer-events-none absolute left-0 text-xs uppercase tracking-[0.25em] text-mist/45"
                    animate={{
                      y: focused === field.id ? -22 : 4,
                      scale: focused === field.id ? 0.85 : 1,
                      opacity: focused === field.id ? 0.9 : 0.55,
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {field.label}
                  </motion.label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.auto}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className="mt-6 w-full border-b border-mist/20 bg-transparent pb-3 text-mist outline-none transition placeholder:text-transparent focus:border-accent/60"
                    placeholder={field.label}
                  />
                  <motion.span
                    className="pointer-events-none absolute bottom-0 left-0 h-px bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused === field.id ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                  />
                </div>
              ))}

              <div className="relative">
                <motion.label
                  htmlFor="message"
                  className="pointer-events-none absolute left-0 text-xs uppercase tracking-[0.25em] text-mist/45"
                  animate={{
                    y: focused === "message" ? -22 : 4,
                    scale: focused === "message" ? 0.85 : 1,
                    opacity: focused === "message" ? 0.9 : 0.55,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  Message
                </motion.label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="mt-6 w-full resize-none border-b border-mist/20 bg-transparent pb-3 text-mist outline-none transition focus:border-accent/60"
                  placeholder="Message"
                />
                <motion.span
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focused === "message" ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-mist px-10 py-4 font-medium text-ink transition hover:bg-accent"
              >
                Envoyer
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
