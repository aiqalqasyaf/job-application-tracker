// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAoygH-QatwMGV-6YKYt54rLtUKIEWxNWU",
    authDomain: "jobtracker-9da4f.firebaseapp.com",
    projectId: "jobtracker-9da4f",
    storageBucket: "jobtracker-9da4f.firebasestorage.app",
    messagingSenderId: "735490492515",
    appId: "1:735490492515:web:110e365574a4c1ff799056",
    measurementId: "G-CZ01HDJMP0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
