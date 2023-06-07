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

const Login = () => {
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
              };
              setDoc(doc(userRef, email), newUser)
                .then(() => {
                  alert("New user created:", newUser);
                  navigate("/");
                })
                .catch((error) => {
                  console.log("Error creating user:", error);
                });
            } else {
              // alert("User already exists in Firebase");
              navigate("/");
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
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
          navigate("/");
        } else {
          await signInWithEmailAndPassword(auth, EmailID, Password);
          navigate("/");
        }
      }
      // ...
    } catch (error) {
      alert("Invalid login details");
      window.location.reload(false);
    }
  };

  return !user ? (
    <React.Fragment>
      <div className="login_page">
        <div className="login_container">
          <img
            className="login_house_logo"
            src={process.env.PUBLIC_URL + "./images/login-key.png"}
            alt="Login-House"
          />

          <div className="login_submission">
            <form classname="login_form" onSubmit={handleSubmit}>
              <img
                class="login_logo_pic"
                src={process.env.PUBLIC_URL + "./images/logo.png"}
                alt="Logo"
              />
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
    <Home />
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
