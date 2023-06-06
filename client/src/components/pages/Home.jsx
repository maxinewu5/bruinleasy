import React from "react";
import "../../App.css";
import FrontPage from "../FrontPage";
import Login from "../Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <FrontPage />
    </>
  );
}

export default Home;

function refreshPage() {
  window.location.reload(false);
}
