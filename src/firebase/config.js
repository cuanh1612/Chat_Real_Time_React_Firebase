import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjiYZyEA4WD0R3FoLmeekyHx0eLszWkio",
  authDomain: "chatrealtime-fa7dd.firebaseapp.com",
  projectId: "chatrealtime-fa7dd",
  storageBucket: "chatrealtime-fa7dd.appspot.com",
  messagingSenderId: "168545937518",
  appId: "1:168545937518:web:2b0e2192f5d2890e0d9e7f",
  measurementId: "G-CJTRW9NPQN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth(app)

export { app, analytics, db, auth };

