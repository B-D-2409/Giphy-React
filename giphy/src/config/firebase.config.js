// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXoCveKpscBFJSfTgI06Yu_PgVggQG3UI",
  authDomain: "giphy-web.firebaseapp.com",
  projectId: "giphy-fb665",
  storageBucket: "giphy-fb665.appspot.com",
  messagingSenderId: "1090480313179",
  appId: "1:1090480313179:web:ec26a913120a132024c07e",
  databaseURL: "https://giphy-fb665-default-rtdb.europe-west1.firebasedatabase.app/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

