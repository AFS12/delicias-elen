// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsAAK1bZulZ7OuapTPG2DrwwywdGmfR1E",
  authDomain: "delicias-elen.firebaseapp.com",
  projectId: "delicias-elen",
  storageBucket: "delicias-elen.appspot.com",
  messagingSenderId: "1051175287772",
  appId: "1:1051175287772:web:84e4afd5ee4b11bd996d19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = app.firestore();