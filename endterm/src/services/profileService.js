import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadProfilePhoto(uid, file) {
  const storageRef = ref(storage, `profilePhotos/${uid}.jpg`);
  const snapshot = await uploadBytes(storageRef, file);

  const url = await getDownloadURL(snapshot.ref);

  const profileRef = doc(db, "profiles", uid);
  await setDoc(
    profileRef,
    {
      photoUrl: url,
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  return url;
}

export async function getUserProfile(uid) {
  const ref = doc(db, "profiles", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
