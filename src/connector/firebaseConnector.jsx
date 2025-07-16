import React from 'react'
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';


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
export const db = getFirestore(app);
