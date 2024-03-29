import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import Login from "./components/Login";
import CreateAccount from "../src/components/pages/AccountCreation";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import ReportUser from "./components/pages/ReportAUser";
import AddListing from "./components/pages/AddListings/main-listing-page";
import PropertyDisplay from "./components/pages/Property";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Search" element={<SearchBar />} />
          <Route path="/User" element={<UserProfile />} />
          <Route path="/ReportUser" element={<ReportUser />} />
          <Route path="/AddListing" element={<AddListing />} />
          <Route path="/Property" element={<PropertyDisplay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
