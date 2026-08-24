"use client";

import type { FormEvent, ChangeEvent } from "react";
import { useEffect, useState } from "react";
import {
  createCertification,
  deleteCertification,
  getCertifications,
  updateCertification,
  type Certification,
} from "@/lib/certifications";
import { ExternalLink, Plus, Save, Trash2, Upload, X } from "lucide-react";
import {
  AdminPageHeader,
  fieldClass,
  textareaClass,
} from "@/components/admin/AdminShell";

const empty: Omit<Certification, "id"> = {
  title: "",
  issuer: "",
  date: "",
  category: "",
  description: "",
  logoUrl: "",
  certificateUrl: "",
  verificationUrl: "",
  featured: true,
  order: 0,
};

async function uploadToCloudinary(file: File, folder: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary n'est pas configuré.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", `portfolio/${folder}`);

  const resourceType = file.type === "application/pdf" ? "raw" : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Cloudinary error:", error);
    throw new Error("Échec de l'envoi vers Cloudinary.");
  }

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary n'a pas retourné d'URL.");
  }

  return data.secure_url as string;
}

export function CertificationManager() {
  const [items, setItems] = useState<Certification[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setItems(await getCertifications());
  }

  useEffect(() => {
    load().catch(() =>
      setMessage("Impossible de charger les certifications.")
    );
  }, []);

  function change<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleFile(
    e: ChangeEvent<HTMLInputElement>,
    key: "logoUrl" | "certificateUrl",
    folder: string
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (key === "logoUrl" && !file.type.startsWith("image/")) {
      setMessage("Le logo doit être une image.");
      return;
    }

    if (
      key === "certificateUrl" &&
      file.type !== "application/pdf" &&
      !file.type.startsWith("image/")
    ) {
      setMessage("Le certificat doit être un PDF ou une image.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const url = await uploadToCloudinary(file, folder);

      change(key, url);

      setMessage("Fichier envoyé avec succès.");
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Échec de l'envoi du fichier."
      );
    } finally {
      setBusy(false);

      e.target.value = "";
    }
  }

  function edit(item: Certification) {
    setEditingId(item.id ?? null);

    setForm({
      title: item.title,
      issuer: item.issuer,
      date: item.date,
      category: item.category,
      description: item.description,
      logoUrl: item.logoUrl,
      certificateUrl: item.certificateUrl,
      verificationUrl: item.verificationUrl,
      featured: item.featured,
      order: item.order,
    });

    setMessage("");
  }

  function reset() {
    setEditingId(null);

    setForm({
      ...empty,
      order: items.length,
    });

    setMessage("");
  }

  async function save(e: FormEvent) {
    e.preventDefault();

    setBusy(true);
    setMessage("");

    try {
      if (editingId) {
        await updateCertification(editingId, form);
      } else {
        await createCertification(form);
      }

      await load();

      reset();

      setMessage("Certification enregistrée.");
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Erreur d'enregistrement."
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Supprimer cette certification ?")) return;

    try {
      await deleteCertification(id);
      await load();

      if (editingId === id) {
        reset();
      }
    } catch {
      setMessage("Impossible de supprimer la certification.");
    }
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Contenu · Portfolio"
        title="Certifications"
        description="Ajoute tes certificats, leurs preuves et leurs liens de vérification. Seules les certifications publiées apparaissent sur le site."
        action={
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-mist px-5 py-3 text-sm font-semibold text-ink hover:bg-accent"
          >
            <Plus size={16} />
            Nouvelle
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="divide-y divide-white/10">
            {items.length === 0 && (
              <div className="p-8 text-sm text-mist/35">
                Aucune certification. Ajoute la première.
              </div>
            )}

            {items.map((item, i) => (
              <div
                key={item.id}
                className="flex gap-4 p-5 md:p-6"
              >
                <span className="font-mono text-xs text-mist/20">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex min-w-0 flex-1 gap-4">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt=""
                      className="h-12 w-12 rounded-xl border border-white/10 object-contain bg-white/5 p-2"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5" />
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-mist/40">
                      {item.issuer} · {item.date}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-accent/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-accent/70">
                        {item.category || "Certification"}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                          item.featured
                            ? "border-emerald-400/20 text-emerald-300/70"
                            : "border-white/10 text-mist/30"
                        }`}
                      >
                        {item.featured ? "Publié" : "Masqué"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    onClick={() => edit(item)}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs text-mist/55 hover:border-accent/40 hover:text-mist"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => item.id && remove(item.id)}
                    className="rounded-full border border-white/10 p-2 text-mist/35 hover:border-red-400/30 hover:text-red-300"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={save}
          className="h-fit rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                Éditeur
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold">
                {editingId
                  ? "Modifier"
                  : "Nouvelle certification"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={reset}
                className="text-mist/35 hover:text-mist"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="mt-7 space-y-4">
            <label className="block text-xs text-mist/45">
              Nom

              <input
                value={form.title}
                onChange={(e) =>
                  change("title", e.target.value)
                }
                required
                className={fieldClass}
              />
            </label>

            <label className="block text-xs text-mist/45">
              Organisme

              <input
                value={form.issuer}
                onChange={(e) =>
                  change("issuer", e.target.value)
                }
                required
                className={fieldClass}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-mist/45">
                Date

                <input
                  value={form.date}
                  onChange={(e) =>
                    change("date", e.target.value)
                  }
                  placeholder="2026"
                  className={fieldClass}
                />
              </label>

              <label className="block text-xs text-mist/45">
                Catégorie

                <input
                  value={form.category}
                  onChange={(e) =>
                    change("category", e.target.value)
                  }
                  placeholder="Python"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block text-xs text-mist/45">
              Description

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  change("description", e.target.value)
                }
                className={textareaClass}
              />
            </label>

            <label className="block text-xs text-mist/45">
              Lien de vérification

              <input
                type="url"
                value={form.verificationUrl}
                onChange={(e) =>
                  change("verificationUrl", e.target.value)
                }
                placeholder="https://..."
                className={fieldClass}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="cursor-pointer rounded-xl border border-dashed border-white/15 p-4 text-center text-xs text-mist/40 hover:border-accent/40">
                <Upload
                  className="mx-auto mb-2"
                  size={17}
                />

                Logo

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFile(
                      e,
                      "logoUrl",
                      "logos"
                    )
                  }
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer rounded-xl border border-dashed border-white/15 p-4 text-center text-xs text-mist/40 hover:border-accent/40">
                <Upload
                  className="mx-auto mb-2"
                  size={17}
                />

                Certificat

                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) =>
                    handleFile(
                      e,
                      "certificateUrl",
                      "certificates"
                    )
                  }
                  className="hidden"
                />
              </label>
            </div>

            {(form.certificateUrl ||
              form.verificationUrl) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {form.certificateUrl && (
                  <a
                    href={form.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-mist/45 hover:text-mist"
                  >
                    Certificat
                    <ExternalLink size={12} />
                  </a>
                )}

                {form.verificationUrl && (
                  <a
                    href={form.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-mist/45 hover:text-mist"
                  >
                    Vérification
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-mist/45">
                Ordre

                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    change(
                      "order",
                      Number(e.target.value)
                    )
                  }
                  className={fieldClass}
                />
              </label>

              <label className="flex items-end gap-2 pb-3 text-xs text-mist/55">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    change(
                      "featured",
                      e.target.checked
                    )
                  }
                />

                Visible
              </label>
            </div>
          </div>

          {message && (
            <p className="mt-4 text-xs text-mist/45">
              {message}
            </p>
          )}

          <button
            disabled={busy}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mist px-5 py-3 text-sm font-semibold text-ink disabled:opacity-50"
          >
            <Save size={16} />

            {busy
              ? "Enregistrement..."
              : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
}