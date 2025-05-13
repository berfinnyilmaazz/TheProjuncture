// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "projuncture.firebaseapp.com",
  projectId: "projuncture",
  storageBucket: "projuncture.firebasestorage.app",
  messagingSenderId: "642827200697",
  appId: "1:642827200697:web:3a2aa68b42c4ef8255d368"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);