import React from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyA6QYSDLO8rarMZye6BI68kN4YAA9o9pxY",
  authDomain: "payskul-2242f.firebaseapp.com",
  projectId: "payskul-2242f",
  storageBucket: "payskul-2242f.firebasestorage.app",
  messagingSenderId: "127420370068",
  appId: "1:127420370068:web:f5fcd2598e6ef8bfdeb881",
  measurementId: "G-QFS68FTGT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
export const auth = getAuth();

// Initialize Storage (for file uploads)
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
