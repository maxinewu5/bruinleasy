import React, { useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../Login.css";
import Login from "../Login";
import { useAuthState } from "react-firebase-hooks/auth";

const ReportUser = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [EmailID, setEmailID] = useState("");
  const [Reason, setReason] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const db = getFirestore();
    if (EmailID === "") {
      alert("Enter a valid Email");
      window.location.reload();
    } else if (Reason === "") {
      alert("Enter a valid reason");
      window.location.reload();
    } else {
      if (
        EmailID.slice(-8) === "ucla.edu" &&
        !(EmailID.slice(-10) === "g.ucla.edu")
      ) {
        const email = EmailID.substring(0, EmailID.length - 8) + "g.ucla.edu";
        console.log(email);
        const User_Reference = doc(db, "users", email);
        console.log(User_Reference);
        const userSnapshot = await getDoc(User_Reference);
        if (userSnapshot.exists()) {
          const account_collection = collection(db, "reported-users");
          const newAccount = {
            email: email,
            reason: arrayUnion(Reason),
          };

          await updateDoc(doc(account_collection, email), newAccount);
          navigate("/");
        } else {
          alert("No such user exists!");
          window.location.reload(false);
        }
      } else {
        const User_Reference = doc(db, "users", EmailID);
        console.log(User_Reference);
        const userSnapshot = await getDoc(User_Reference);
        if (userSnapshot.exists()) {
          const account_collection = collection(db, "reported-users");
          const newAccount = {
            email: EmailID,
            reason: arrayUnion(Reason),
          };

          await updateDoc(doc(account_collection, EmailID), newAccount);
          alert("User has been reported.");
          navigate("/");
        } else {
          alert("No such user exists!");
          window.location.reload(false);
        }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while authentication state is being resolved
  }

  return user ? (
    <React.Fragment>
      <div className="login_page">
        <div className="login_container">
          <img
            className="login_house_logo"
            src={process.env.PUBLIC_URL + "./images/report!.gif"}
            alt="Report"
          />
          {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
          {/* <img src= {process.env.PUBLIC_URL + './images/logo.png'} alt = "BruinLeasy logo"/> */}
          <div className="login_submission">
            <form classname="login_form" onSubmit={submit}>
              <img
                class="login_logo_pic"
                src={process.env.PUBLIC_URL + "./images/logo.png"}
                alt="Logo"
              />
              <h4 className="report_text">
                Enter the email ID of the individual you wish to report and why
                you would like to report them
              </h4>
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
              <textarea
                className="login_box_long"
                placeholder="Reason"
                onChange={(event) => {
                  setReason(event.target.value);
                }}
                value={Reason}
              />
              <div className="submit">
                <button className="btn--outline--medium">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Login />
  );
};

export default ReportUser;
