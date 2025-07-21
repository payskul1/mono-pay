import { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6QYSDLO8rarMZye6BI68kN4YAA9o9pxY",
  authDomain: "payskul-2242f.firebaseapp.com",
  projectId: "payskul-2242f",
  storageBucket: "payskul-2242f.firebasestorage.app",
  messagingSenderId: "127420370068",
  appId: "1:127420370068:web:20c71cda6235874adeb881",
  measurementId: "G-WQ5X209HYZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const COLLECTION_NAME = 'waitlistIndividualApplication';

export const db = getFirestore(app);

const databaseService = {
  async submitWaitlistForm(formData) {
    try {
      const docRef = await addDoc(collection(db, 'waitlistSubmissions'), {
        ...formData,
        timestamp: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error submitting form: ", error);
      return { success: false, error };
    }
  }
};

export default databaseService;