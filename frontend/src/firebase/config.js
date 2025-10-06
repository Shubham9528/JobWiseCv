import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwIt0YSCZXqPRfBtNunBuS6ELa8_62m5s",
  authDomain: "jobwisecv.firebaseapp.com",
  projectId: "jobwisecv",
  storageBucket: "jobwisecv.appspot.com",
  messagingSenderId: "573705387809",
  appId: "1:573705387809:web:e7a9e95cc85e0e0a964860",
  measurementId: "G-16HVJRM8N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
