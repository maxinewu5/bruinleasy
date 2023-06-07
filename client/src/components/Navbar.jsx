//navigation bar for website
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import { getAuth } from "firebase/auth";
import { auth } from "../Firebase"
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user, loading] = useAuthState(auth);

  const handleSignOut = () => {
    auth.signOut().catch((error) => {
      console.log("Error signing out:", error);
    });
    // refreshPage();
  };
  
  /*make navbar fixed*/
  const [fixed, setFixed] = useState(false);
  const [height, setHeight] = useState(false);

  const navbar = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setFixed(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    // setHeight(navbar.current.clientHeight);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const [click, setClick] = useState(false); /* check if has been clicked or not*/
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);  /*check if menu open or not*/

  return (
    <nav className={'${sticky ? "sticky" : ""}'}>
      {/*wraps the navbar in a large flex box*/}
      <nav className="navbar">
        {/*wraps the items in the navbar and sets a boundary*/}
        <div className="navbar-container">

          {/*top of navigation bar, contains the logo and the menu icon*/}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              class="navbar-pic"
              src={process.env.PUBLIC_URL + "./images/logo.png"}
              alt="Logo"
            />
          </Link>
          {/*menu icon*/}
          <div className="menu-icon" onClick={handleClick}>
            <img
              style={{ width: 30, height: 30 }}
              src={process.env.PUBLIC_URL + "./images/menubar2.png"}
              alt="MenuBar"
            />
          </div>

          {/*when menu icon has been clicked on, use style nav-menu.active which
          displays the navigation bar, else display nothing*/}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/Home" className="nav-links" onClick={closeMobileMenu}>
                {/*for the images which represent each page(home explore report etc)
                show image only if click is true*/}
                {click ? (
                  <img
                    class="navbar-icons"
                    src={process.env.PUBLIC_URL + "./images/home.png"}
                    alt="Home"/> ) : (
                  <img
                    class="display-none"
                    src={process.env.PUBLIC_URL + "./images/home.png"}
                    alt="Home"/>)}
              </Link>
            </li>
            
            {/*Explore icon*/}
            <li className="nav-item">
              <Link
                to="/Explore"
                className="nav-links"
                onClick={closeMobileMenu}>
                {click ? (
                  <img
                    class="navbar-icons"
                    src={process.env.PUBLIC_URL + "./images/explore.png"}
                    alt="Explore"/> ) : (
                  <img
                    class="display-none"
                    src={process.env.PUBLIC_URL + "./images/explore.png"}
                    alt="Explore"/> )}
              </Link>
            </li>

            {/*Login icon, not displayed when signed in, is instead replaced by logout*/}
            <li className="nav-item">
              <Link
                to="/Login"
                className="nav-links"
                onClick={ user ? () => {closeMobileMenu(); handleSignOut(); } : closeMobileMenu}>
                {!user ? (
                  click ? (
                    <img
                      className="navbar-icons"
                      src={process.env.PUBLIC_URL + "./images/login.png"}
                      alt="Login"/>) : (
                    <img
                      className="display-none"
                      src={process.env.PUBLIC_URL + "./images/login.png"}
                      alt="Login"/> ) ) : 
                  click ? (
                  <img
                    className="navbar-icons"
                    src={process.env.PUBLIC_URL + "./images/logout.png"}
                    alt="Logout"
                  /> ) : (
                  <img
                    className="display-none"
                    src={process.env.PUBLIC_URL + "./images/logout.png"}
                    alt="Logout"/>)}
              </Link>
            </li>

            {/*My Profile icon, not displayed when not signed in*/}
            <li className="nav-item">
              <Link to="/User" className="nav-links" onClick={closeMobileMenu}>
                {user ? (
                  (click) ? (
                    <img
                      class="navbar-icons"
                      src={process.env.PUBLIC_URL + "./images/myprofile.png"}
                      alt="My Profile"/> ) : (
                    <img
                      class="display-none"
                      src={process.env.PUBLIC_URL + "./images/myprofile.png"}
                      alt="My Profile"/> ) ) : 
                  <img
                    className="display-none"
                    src={process.env.PUBLIC_URL + "./images/myprofile.jpg"}
                    alt="My Profile" />}
              </Link>
            </li>

            {/*Report User icon*/}
            <li className="nav-item">
              <Link
                to="/ReportUser"
                className="nav-links"
                onClick={closeMobileMenu}>
                {click ? (
                  <img
                    class="navbar-icons"
                    src={process.env.PUBLIC_URL + "./images/report.png"}
                    alt="Report User"/>) : (
                  <img
                    class="display-none"
                    src={process.env.PUBLIC_URL + "./images/report.png"}
                    alt="Report User"/> )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </nav>
  );
}

function refreshPage() {
  window.location.reload(false);
}

export default Navbar;
