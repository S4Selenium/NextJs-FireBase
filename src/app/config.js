import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
if (location.hostname === "127.0.0.1:9099") {
  console.log("127.0.0.1:9099 detected!!");
  auth.useEmulator(" http://127.0.0.1:4000/auth");
  db.useEmulator("127.0.0.1:9099");
} else if (location.hostname === "127.0.0.1:5001") {
  console.log("127.0.0.1:5001 detected!!");
  auth.useEmulator(" http://127.0.0.1:4000/functions");
  db.useEmulator("127.0.0.1:5001");
} else if (location.hostname === " 127.0.0.1:8080") {
  console.log(" 127.0.0.1:8080 detected!!");
  auth.useEmulator(" http://127.0.0.1:4000/firestore");
  db.useEmulator("127.0.0.1:8080");

// Initialize Firebas
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
