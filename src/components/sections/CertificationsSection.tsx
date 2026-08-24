"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "./Reveal";
import { motion } from "framer-motion";
import { getCertifications, type Certification } from "@/lib/certifications";
import { isFirebaseConfigured } from "@/lib/firebase";

export function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getCertifications()
      .then((items) => setCertifications(items.filter((item) => item.featured !== false)))
      .catch(() => setCertifications([]));
  }, []);

  return (
    <section id="certifications" className="relative border-t border-mist/10 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent/90">
            Certifications
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight text-mist">
            Preuve de mon
            <span className="block text-mist/25">apprentissage.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist/60">
            Des certifications qui accompagnent mon évolution en programmation,
            développement web et technologies numériques.
          </p>
        </Reveal>

        {certifications.length > 0 ? (
          <Stagger className="mt-20">
            <div className="divide-y divide-mist/10 border-y border-mist/10">
              {certifications.map((cert, index) => (
                <motion.article
                  key={cert.id}
                  variants={staggerItem}
                  className="group grid gap-6 py-8 transition-colors hover:bg-white/[0.015] md:grid-cols-[80px_1fr_auto] md:items-center md:gap-10"
                >
                  <span className="font-mono text-sm text-mist/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-start gap-5">
                    {cert.logoUrl ? (
                      <img
                        src={cert.logoUrl}
                        alt=""
                        className="mt-1 h-12 w-12 rounded-xl border border-mist/10 object-contain bg-white p-2"
                      />
                    ) : (
                      <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl border border-mist/10 text-mist/30">
                        <FileText size={18} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-xl font-semibold text-mist md:text-2xl">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-sm text-mist/45">
                        {cert.issuer} · {cert.date}
                      </p>
                      {cert.category && (
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-accent/70">
                          {cert.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 md:justify-end">
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-mist/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-mist transition hover:border-accent/50 hover:text-accent"
                      >
                        Certificat <FileText size={14} />
                      </a>
                    )}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Vérifier ${cert.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist/15 text-mist transition hover:border-accent/50 hover:text-accent"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </Stagger>
        ) : (
          <Reveal className="mt-20">
            <div className="border-y border-mist/10 py-12 text-sm text-mist/35">
              Les certifications seront bientôt ajoutées.
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
