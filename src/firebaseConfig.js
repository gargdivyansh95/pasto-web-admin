import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseKey.json";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);      // Firestore
export const database = getDatabase(app); // Realtime Database
export const auth = getAuth(app);  // Authentication
export default app; // Export the initialized app if needed elsewhere