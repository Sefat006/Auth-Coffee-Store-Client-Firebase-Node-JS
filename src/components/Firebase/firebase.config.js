// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeAgXll6gaYQHExFImIGLaa8UfhJHBKLE",
  authDomain: "coffee-store-77c38.firebaseapp.com",
  projectId: "coffee-store-77c38",
  storageBucket: "coffee-store-77c38.firebasestorage.app",
  messagingSenderId: "867309444236",
  appId: "1:867309444236:web:9afeb8b820dbfabd72efa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);