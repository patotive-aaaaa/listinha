// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzviFvidmjWHtTfnolV-Bgf5pmJeYL4dI",
  authDomain: "listinha-cce07.firebaseapp.com",
  projectId: "listinha-cce07",
  storageBucket: "listinha-cce07.firebasestorage.app",
  messagingSenderId: "54644612406",
  appId: "1:54644612406:web:5a6950fae62c44b9902797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
