"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { isAdmin } from "@/lib/admin";

export function AdminAuth({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth) { setReady(true); return; }
    const firebaseAuth = auth;
    return onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) { setAllowed(false); setReady(true); return; }
      try {
        const ok = await isAdmin(user.uid);
        if (!ok) { await signOut(firebaseAuth); setError("Ce compte n'a pas accès au dashboard."); setAllowed(false); }
        else { setError(""); setAllowed(true); }
      } catch { setAllowed(false); setError("Impossible de vérifier les droits administrateur."); }
      setReady(true);
    });
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      if (!auth) throw new Error("Firebase n'est pas configuré.");
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!(await isAdmin(result.user.uid))) { await signOut(auth); throw new Error("not-admin"); }
    } catch { setError("Email, mot de passe ou accès administrateur incorrect."); }
    finally { setLoading(false); }
  }

  if (!isFirebaseConfigured) return <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-mist"><div className="max-w-lg rounded-3xl border border-white/10 bg-ink-muted p-8"><p className="text-[10px] uppercase tracking-[0.3em] text-accent">Configuration requise</p><h1 className="mt-4 font-display text-3xl font-semibold">Firebase n'est pas configuré.</h1><p className="mt-4 text-sm leading-relaxed text-mist/45">Copie .env.example vers .env.local puis renseigne les variables Firebase. Active aussi Email/Password dans Firebase Authentication.</p></div></main>;
  if (!ready) return <div className="min-h-screen bg-ink" />;
  if (!allowed) return <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-mist"><form onSubmit={login} className="w-full max-w-md"><p className="text-[10px] uppercase tracking-[0.3em] text-accent">Administration privée</p><h1 className="mt-5 font-display text-5xl font-semibold">Bienvenue.</h1><p className="mt-4 text-sm text-mist/45">Connecte-toi pour gérer ton portfolio.</p><div className="mt-10 space-y-4"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none placeholder:text-mist/20 focus:border-accent/50"/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" required className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none placeholder:text-mist/20 focus:border-accent/50"/></div>{error && <p className="mt-4 text-sm text-red-300">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-full bg-mist px-6 py-4 text-sm font-semibold text-ink transition hover:bg-accent disabled:opacity-50">{loading ? "Connexion..." : "Se connecter"}</button><p className="mt-5 text-center text-[11px] text-mist/25">Accès réservé à ton compte administrateur Firebase.</p></form></main>;
  return <>{children}</>;
}
