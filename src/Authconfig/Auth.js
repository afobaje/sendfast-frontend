// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiTAmaw2Ybu6uFdPyowK9Qz1tYbte21ow",
  authDomain: "tims-ec28b.firebaseapp.com",
  projectId: "tims-ec28b",
  storageBucket: "tims-ec28b.appspot.com",
  messagingSenderId: "291958069378",
  appId: "1:291958069378:web:1138d73d97ff362e623c9b",
  measurementId: "G-CS9KW9HLV0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseApp = getAuth(app);
