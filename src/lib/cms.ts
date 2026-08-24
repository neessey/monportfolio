import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/data/projects";

export type ProfileContent = {
  name: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  imageUrl: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  milestones: { year: string; label: string }[];
};

export type SkillPanel = { title: string; ref: string; items: string[] };

export type Experience = {
  id?: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  description: string;
  stack: string[];
  order: number;
  visible: boolean;
};

export type ProjectContent = Project & { id?: string; visible: boolean; featured: boolean; order: number };

export type SocialsContent = {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
};

export type SettingsContent = {
  siteTitle: string;
  siteDescription: string;
  availability: string;
  location: string;
  footerText: string;
};

function requireDb() {
  if (!db) throw new Error("Firebase n'est pas configuré.");
  return db;
}

export async function getSingleton<T>(collectionName: string, id: string): Promise<T | null> {
  const database = requireDb();
  const snapshot = await getDoc(doc(database, collectionName, id));
  return snapshot.exists() ? (snapshot.data() as T) : null;
}

export async function saveSingleton<T extends object>(collectionName: string, id: string, data: T) {
  const database = requireDb();
  await setDoc(doc(database, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getCollection<T>(collectionName: string): Promise<(T & { id: string })[]> {
  const database = requireDb();
  const snapshot = await getDocs(query(collection(database, collectionName), orderBy("order", "asc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as T) }));
}

export async function createItem<T extends object>(collectionName: string, data: T) {
  const database = requireDb();
  const ref = await addDoc(collection(database, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateItem<T extends object>(collectionName: string, id: string, data: Partial<T>) {
  const database = requireDb();
  await updateDoc(doc(database, collectionName, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteItem(collectionName: string, id: string) {
  const database = requireDb();
  await deleteDoc(doc(database, collectionName, id));
}

export const defaultProfile: ProfileContent = {
  name: "Yaniss-Elie Sey",
  eyebrow: "Portfolio · 2026",
  titleLine1: "Frontend",
  titleLine2: "Développeuse",
  intro: "Développeuse web. J’aime construire des interfaces rapides, claires et immersives, du concept au déploiement.",
  imageUrl: "/me.png",
};

export const defaultAbout: AboutContent = {
  eyebrow: "About",
  title: "Notice Bibliographique.",
  paragraphs: [
    "J'ai fait du développement mon métier à part entière. Devenue développeuse frontend, j'aime tenir les deux bouts : la précision du code et le soin apporté à l'expérience.",
    "Tout a commencé par la curiosité : comprendre comment fonctionnent les sites que je consultais, puis en fabriquer moi-même. Les premières pages en HTML et CSS ont laissé place à des applications plus complètes.",
    "Aujourd'hui, je construis des produits de bout en bout : maquette et identité visuelle, développement front avec React · TypeScript · Tailwind, API et données avec Node.js · Laravel · MySQL, et mise en production sur Vercel ou Render. Je teste, je corrige, je documente.",
  ],
  milestones: [
    { year: "2022", label: "Bureautique & Arduino" },
    { year: "2024", label: "Html & CSS" },
    { year: "2025", label: "Next.js & TypeScript" },
    { year: "2026", label: "Performance & Accessibilité" },
  ],
};

export const defaultSkills: SkillPanel[] = [
  { title: "Langages & Technologies", ref: "RÉF. L", items: ["HTML5 / CSS3", "Next.js / Vite.js / React", "TypeScript", "Tailwind CSS", "MySQL", "PHP / Laravel", "Node.js", "Python (bases)"] },
  { title: "Outils & Environnement", ref: "RÉF. O", items: ["Visual Studio Code", "GitHub", "Vercel / Render", "Firebase / Supabase", "Optimisation UI/UX", "Responsive Design", "Tests & Recette"] },
];

export const defaultSocials: SocialsContent = {
  email: "yanisseliesey@gmail.com",
  github: "https://github.com/neessey",
  linkedin: "",
  instagram: "",
  whatsapp: "",
};

export const defaultSettings: SettingsContent = {
  siteTitle: "Yaniss-Elie Sey — Frontend Developer",
  siteDescription: "Portfolio de Yaniss-Elie Sey — développeuse frontend et fullstack.",
  availability: "Disponible pour de nouveaux projets",
  location: "Côte d'Ivoire",
  footerText: "Portfolio made by Yaniss-Elie Sey.",
};
