import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAboq4CWmesgvRxXM12wgwGZ4d7MQIuHxM",
  authDomain: "portfolio-83122.firebaseapp.com",
  projectId: "portfolio-83122",
  storageBucket: "portfolio-83122.firebasestorage.app",
  messagingSenderId: "481454654701",
  appId: "1:481454654701:web:958713eeeb867810bb78e4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);