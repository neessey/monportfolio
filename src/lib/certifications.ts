import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Certification = {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  logoUrl: string;
  certificateUrl: string;
  verificationUrl: string;
  featured: boolean;
  order: number;
};

const collectionName = "certifications";

function requireDb() {
  if (!db) throw new Error("Firebase n'est pas configuré. Ajoutez les variables NEXT_PUBLIC_FIREBASE_*.");
  return db;
}

export async function getCertifications() {
  const database = requireDb();
  const snapshot = await getDocs(
    query(collection(database, collectionName), orderBy("order", "asc"))
  );
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Certification, "id">),
  }));
}

export async function createCertification(
  data: Omit<Certification, "id">
) {
  const database = requireDb();
  const ref = await addDoc(collection(database, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCertification(
  id: string,
  data: Partial<Omit<Certification, "id">>
) {
  const database = requireDb();
  await updateDoc(doc(database, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCertification(id: string) {
  const database = requireDb();
  await deleteDoc(doc(database, collectionName, id));
}
