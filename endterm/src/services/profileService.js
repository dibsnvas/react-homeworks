import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function uploadProfilePhoto(uid, base64) {
  const ref = doc(db, "profiles", uid);

  await setDoc(
    ref,
    {
      photo: base64,
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  return base64;
}

export async function getUserProfile(uid) {
  const ref = doc(db, "profiles", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
