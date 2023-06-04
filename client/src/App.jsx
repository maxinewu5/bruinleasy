import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import AddListing from "./components/pages/AddListings/main-listing-page";

function App() {
  // const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  // console.log(isAuth);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AddListing" element={<AddListing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
