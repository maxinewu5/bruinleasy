import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../Firebase";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import AddListing from "./pages/AddListings/main-listing-page";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        // Check if the user exists in the "users" collection
        const userRef = collection(db, "users");
        const queryRef = where("email", "==", email);
        getDocs(query(userRef, queryRef))
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // User does not exist, create a new user document in the "users" collection
              const newUser = {
                name: name,
                email: email,
                profilePic: profilePic,
                properties: [],
                fav_properties: [],
              };
              setDoc(doc(userRef, email), newUser)
                .then(() => {
                  navigate("/Explore");
                  alert("New user created:", newUser);
                })
                .catch((error) => {
                  console.log("Error creating user:", error);
                });
            } else {
              // alert("User already exists in Firebase");
              navigate("/Explore");
            }
          })
          .catch((error) => {
            console.log("Error checking user existence:", error);
          });

        // refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const [EmailID, setEmailID] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email_end = EmailID.slice(-8);
      if (!(email_end === "ucla.edu")) {
        alert("Please enter a UCLA student email ID");
      }
      //Empty password entered by the user
      else if (Password === "") {
        alert("Please enter a Password");
      } else {
        const auth = getAuth();
        if (
          EmailID.slice(-8) === "ucla.edu" &&
          !(EmailID.slice(-10) === "g.ucla.edu")
        ) {
          const email = EmailID.substring(0, EmailID.length - 8) + "g.ucla.edu";
          await signInWithEmailAndPassword(auth, email, Password);
          navigate("/Explore");
        } else {
          await signInWithEmailAndPassword(auth, EmailID, Password);
          navigate("/Explore");
        }
      }
      // ...
    } catch (error) {
      alert("Invalid login details");
      window.location.reload(false);
    }
  };

  if (loading) {
    return <div></div>; // Display a loading state while authentication state is being resolved
  }

  return !user ? (
    <React.Fragment>
      <div className="login_page">
        <div className="login_container">
          {/*image for half of the login box*/}
          <img
            className="login_house_logo"
            src={process.env.PUBLIC_URL + "./images/login-key.png"}
            alt="Login-House"
          />

        {/*display logo for bruinLeasy */}
          <div className="login_submission">
            <form classname="login_form" onSubmit={handleSubmit}>
              <img
                class="login_logo_pic"
                src={process.env.PUBLIC_URL + "./images/logo.png"}
                alt="Logo"
              />
              {/*the inpits*/}
              <input
                className="login_box"
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmailID(event.target.value);
                }}
                value={EmailID}
              />
              <br />
              <input
                className="login_box"
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={Password}
              />
              <br />
              {/*submit button*/}
              <div className="submit">
                <button className="btn--outline--medium">Submit</button>
              </div>
            </form>
            <div className="login_btns">
              <button
                className="btn--outline--small"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="fcGoogle" /> Sign in with Google
              </button>{" "}
              <br />
              {/*create account button*/}
              <Link to="/CreateAccount">
                <button className="btn--outline--small">
                  New? Create An Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Explore />
  );
  // : (
  //   <div>
  //     {/* <p>User is logged in</p> */}
  //     <Home />
  //     {/* <AddListing user={user} /> */}
  //     {/* <button onClick={handleSignOut}>Sign Out</button> */}
  //   </div>
  // );
};

export default Login;

function refreshPage() {
  window.location.reload(false);
}
