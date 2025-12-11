import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export function signupWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// логин
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// логаут
export function logoutUser() {
  return signOut(auth);
}

// подписка на изменения авторизации
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
