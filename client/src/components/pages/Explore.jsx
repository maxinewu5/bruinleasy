import React from "react";
import "../../App.css";
import Cards from "../Cards";
import "../FrontPage.css";
import SearchBar from "../SearchBar";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Login from "../Login";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Explore.css"

function Explore() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [allProperties, setAllProperties] = useState([]);

  //get all properties
  const getAllProperty = async () => {
    const propertyData = await getDocs(collection(db, "Properties"));
    const propFilteredData = propertyData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAllProperties(propFilteredData);
  };

  //add property to user favorite
  const addPropertyToUserFavorite = async (userEmail) => {
    //get the user collection
    let usersRef = collection(db, "users");
    //get the documents where email matches the user email
    const userDat = await getDocs(
      query(usersRef, where("email", "==", userEmail))
    );
    //extract useful info from the documents
    const userDataFiltered = userDat.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  };

  if (loading) {
    return <div></div>; // Display a loading state while authentication state is being resolved
  }

  return user ? (
    <>
      {/* <div className="explore-container">
        <img
          className="img-background"
          src={process.env.PUBLIC_URL + "./images/explore.gif"}
          alt="explore"
        />
        <img
          className="img-title"
          src={process.env.PUBLIC_URL + "./images/explore-title.png"}
          alt="explore"
        />
      </div> */}
    
      <SearchBar setFilteredProperties={setAllProperties} />
      {allProperties.length === 0 ? (
        <>
          <div classname="explore_text">No Properties Found!!!!</div>
        </>
      ) : (
        <Cards properties={allProperties} />
      )}
    </>
  ) : (
    <Login />
  );
}

export default Explore;
