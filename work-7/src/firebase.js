import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcz6NLmPfmJaEZQphNnUCV-AXcR1acb48",
  authDomain: "work-7-30373.firebaseapp.com",
  projectId: "work-7-30373",
  storageBucket: "work-7-30373.firebasestorage.app",
  messagingSenderId: "286940837772",
  appId: "1:286940837772:web:7ac346511261ce7ede08a9",
  measurementId: "G-S9QQJ3M83Q"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
