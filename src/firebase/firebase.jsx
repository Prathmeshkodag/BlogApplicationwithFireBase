// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAwaethGZMi4RsOVwOajdsWnVdGRsyKluo",
  authDomain: "blogapplicationstask.firebaseapp.com",
  projectId: "blogapplicationstask",
  storageBucket: "blogapplicationstask.firebasestorage.app",
  messagingSenderId: "997196283350",
  appId: "1:997196283350:web:764063f94b5c28a932f877",
  measurementId: "G-9C854NNV4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app); 
const db=getFirestore(app);   

export {app,auth,db}