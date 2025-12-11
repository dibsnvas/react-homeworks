import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LOCAL_KEY = "favorites";


export function getLocalFavorites() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalFavorites(ids) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}


export async function getServerFavorites(userId) {
  const ref = doc(db, "favorites", userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return [];
  const data = snap.data();
  return Array.isArray(data.ids) ? data.ids : [];
}

export async function saveServerFavorites(userId, ids) {
  const ref = doc(db, "favorites", userId);
  await setDoc(ref, { ids }, { merge: true });
}


export async function mergeFavoritesOnLogin(userId) {
  const local = getLocalFavorites();
  const server = await getServerFavorites(userId); 

  const merged = Array.from(new Set([...(server || []), ...(local || [])]));

  await saveServerFavorites(userId, merged);

  saveLocalFavorites(merged);

  const wasMerged = local.length > 0 && server.length > 0;

  return { merged, wasMerged };
}
