// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseEnvVars = Object.freeze({
  API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

for (const [key, value] of Object.entries(firebaseEnvVars)) {
  if (value === undefined) {
    throw new Error(`${key} is undefined`);
  }
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = Object.freeze({
  apiKey: firebaseEnvVars.API_KEY,
  authDomain: firebaseEnvVars.AUTH_DOMAIN,
  projectId: firebaseEnvVars.PROJECT_ID,
  storageBucket: firebaseEnvVars.STORAGE_BUCKET,
  messagingSenderId: firebaseEnvVars.MESSAGING_SENDER_ID,
  appId: firebaseEnvVars.APP_ID,
  measurementId: firebaseEnvVars.MEASUREMENT_ID,
});

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
