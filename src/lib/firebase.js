import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5XDs_y7Bl-zn08ZJEh4Gup4mXaZHctD8",
  authDomain: "finance-tracker-30070.firebaseapp.com",
  projectId: "finance-tracker-30070",
  storageBucket: "finance-tracker-30070.firebasestorage.app",
  messagingSenderId: "248187683150",
  appId: "1:248187683150:web:c5fd46f89b2c357fc3de1f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);