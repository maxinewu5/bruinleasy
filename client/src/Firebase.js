import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVP7UlOg6sIRMsVOpTwrOI0x2XX0qY6D8",
    authDomain: "bruinlease.firebaseapp.com",
    projectId: "bruinlease",
    storageBucket: "bruinlease.appspot.com",
    messagingSenderId: "411884910727",
    appId: "1:411884910727:web:46570525cde5ea6321a022",
    measurementId: "G-2SEWDY5Y6E"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      refreshPage();

    })
    .catch((error) => {
      console.log(error);
    });
};

function refreshPage() {
  window.location.reload(false);
}