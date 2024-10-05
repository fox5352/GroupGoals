// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const keys = {
  API_KEY: import.meta.env.API_KEY,
  AUTH_DOMAIN: import.meta.env.AUTH_DOMAIN,
  PROJECT_ID: import.meta.env.PROJECT_ID,
  STORAGE_BUCKET: import.meta.env.STORAGE_BUCKET,
  MESSAGIN_SENDER_ID: import.meta.env.MESSAGIN_SENDER_ID,
  APP_ID: import.meta.env.APP_ID,
  MEASUREMENT_ID: import.meta.env.MEASUREMENT_ID
};

for (const [key, value] of Object.entries(keys)) {
  if (value === undefined) {
    throw new Error(`${key} is undefined`);
  }
}


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
