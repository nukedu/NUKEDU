import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBbCP7ICVS5ZeALYjSF5m1WK5uIpHomU2M",
  authDomain: "mwc-nukedu.firebaseapp.com",
  databaseURL: "https://mwc-nukedu-default-rtdb.firebaseio.com",
  projectId: "mwc-nukedu",
  storageBucket: "mwc-nukedu.firebasestorage.app",
  messagingSenderId: "220921499414",
  appId: "1:220921499414:web:b9d1adaf2404f8c6f7ca37",
  measurementId: "G-V6V9VBL0EY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
