import React from "react";
import "../../App.css";
import FrontPage from "../FrontPage";
import Login from "../Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div></div>; // Display a loading state while authentication state is being resolved
  }

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
