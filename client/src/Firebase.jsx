//Firebase.js: connection to firebase database
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVP7UlOg6sIRMsVOpTwrOI0x2XX0qY6D8",
  authDomain: "bruinlease.firebaseapp.com",
  projectId: "bruinlease",
  storageBucket: "bruinlease.appspot.com",
  messagingSenderId: "411884910727",
  appId: "1:411884910727:web:46570525cde5ea6321a022",
  measurementId: "G-2SEWDY5Y6E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
