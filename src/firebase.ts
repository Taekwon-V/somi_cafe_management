import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtuS0tTv8X0aZKLEAm2vENgFXU35cw90M",
  authDomain: "somi-cafe-management.firebaseapp.com",
  projectId: "somi-cafe-management",
  storageBucket: "somi-cafe-management.firebasestorage.app",
  messagingSenderId: "332429514474",
  appId: "1:332429514474:web:bb78737ec63ada3231a993",
  measurementId: "G-L45QJ0772D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
