import React, { useReducer, useState, useEffect } from "react";
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
import Home from "./pages/Home";
import AddListing from "./pages/AddListings/main-listing-page";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "./Button";
import CreateAccount from "./pages/AccountCreation";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        // cookies.set("auth-token", result.user.refreshToken);
        // setIsAuth(true);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);

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
                })
                .catch((error) => {
                  console.log("Error creating user:", error);
                });
            } else {
              alert("User already exists in Firebase");
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
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    console.log(user);

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => {
      console.log("Error signing out:", error);
    });
    refreshPage();
  };

  const [EmailID, setEmailID] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  /*
  -Username and Password taken in from the input 
  -DEFAULT VALUES: Username = '', Password = ''. 
  -If nothing is entered into a particular field, Example - the user only enters a username and no password, 
  then Username stores the inputted value, and password is set to null. 
  -Use either Username = null or Password = null to check for incorrectly formatted Username/Password input
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, EmailID, Password);
      navigate("/");
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
          {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
          {/* <img src= {process.env.PUBLIC_URL + './images/logo.png'} alt = "BruinLeasy logo"/> */}
          <div className="login_submission">
            <form classname="login_form" onSubmit={handleSubmit}>
              {/*
              -onChange is a pre-defined prop that defines what is to be done when changes are made to the corresponding
              input field. 
              -In this case, it calls a funcion defined in-line with an event object. 
              -The event object stores the information corresponding to the change, and is automatically created whenever
              such changes are made by the user. 
              -One of the properties of the event is 'target' which is an object that corresponds to the specific field 
              that was changed(i.e. the specific input field that was modified)
              -'Value' is a property of target that stores the changes made to the input fields value. 
              */}
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
              {/*
              -Whenever a button is defined by default within a form tag, it is automatically treated as a submit button.
              -Clicking on this button will submit the form.
            */}
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
      {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
      <img
        src={process.env.PUBLIC_URL + "./images/logo.png"}
        alt="BruinLeasy logo"
      />
      <form classname="Login-Form" onSubmit={handleSubmit}>
        {/*
      -onChange is a pre-defined prop that defines what is to be done when changes are made to the corresponding
      input field. 
      -In this case, it calls a funcion defined in-line with an event object. 
      -The event object stores the information corresponding to the change, and is automatically created whenever
      such changes are made by the user. 
      -One of the properties of the event is 'target' which is an object that corresponds to the specific field 
      that was changed(i.e. the specific input field that was modified)
      -'Value' is a property of target that stores the changes made to the input fields value. 
       */}
        <input
          placeholder="Email"
          onChange={(event) => {
            setEmailID(event.target.value);
          }}
          value={EmailID}
        />
        <br />
        <input
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={Password}
        />
        <br />
        {/*
      -Whenever a button is defined by default within a form tag, it is automatically treated as a submit button.
      -Clicking on this button will submit the form.
    */}
        <button>Submit</button>
        <br></br>
        <br />
      </form>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </React.Fragment>
  ) : (
    <div>
      <p>User is logged in</p>
      <AddListing user={user} />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Login;

function refreshPage() {
  window.location.reload(false);
}
