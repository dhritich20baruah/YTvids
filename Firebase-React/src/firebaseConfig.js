import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhiO3BElVvGfxZv2I49XR7su81vFwcSWQ",
    authDomain: "project2-65f11.firebaseapp.com",
    projectId: "project2-65f11",
    storageBucket: "project2-65f11.firebasestorage.app",
    messagingSenderId: "1022917011089",
    appId: "1:1022917011089:web:267bf9b750cad191fe4130"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };