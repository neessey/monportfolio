import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function isAdmin(uid: string) {
  if (!db) return false;
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists();
}
