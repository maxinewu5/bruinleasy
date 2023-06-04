//firebase-config.js: Connection to firebase database

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVP7UlOg6sIRMsVOpTwrOI0x2XX0qY6D8",
  authDomain: "bruinlease.firebaseapp.com",
  projectId: "bruinlease",
  storageBucket: "bruinlease.appspot.com",
  messagingSenderId: "411884910727",
  appId: "1:411884910727:web:a63b79b97af1b2c421a022",
  measurementId: "G-JM651T1REV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;