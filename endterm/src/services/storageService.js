import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage(app);

export async function uploadProfileImage(userId, file) {
  const storageRef = ref(storage, `profilePictures/${userId}.jpg`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
