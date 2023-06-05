import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import CardItem from "./CardItem";
import { getAdditionalUserInfo } from "firebase/auth";
import { Link } from "react-router-dom";

function UserProfile() {
  //useEffect -- hook which handles side effects
  //called whenever the page renders, can be used for API calls to firebase
  //asyncronous function -- because API call returns promise -- either success/failure

  const [userData, setUserData] = useState();
  const [userProperties, setUserProperties] = useState([]);
  const [favProperties, setFavProperties] = useState([]);

  const getUserData = async (userEmail) => {
    let usersRef = collection(db, "users");
    const userDat = await getDocs(
      query(usersRef, where("email", "==", userEmail))
    );
    const userDataFiltered = userDat.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUserData(userDataFiltered[0]);
  };

  const getUserProperties = async () => {
    let userPropertiesData = [];
    userData?.properties.map(async (property) => {
      let docRef = doc(db, "Properties", property);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      userPropertiesData.push(docSnap.data());
      console.log(userPropertiesData);
      setUserProperties(userPropertiesData);
    });

    //setUserProperties(userPropertiesData)
  };

  useEffect(() => {
    const fetchData = async () => {
      let propertiesRef = collection(db, "properties");
      const propertyData = await getDocs(propertiesRef);

      //get user properties
      //bug: small delay for the properties to actually show up, looks weird
      getUserProperties();

      //temp code: for favorite properties, needs to sync with the explore page like
      console.log("user id:" + userData?.id);
      if (!userData) return;
      const q = query(propertiesRef, where("user_id", "==", userData?.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("doc " + doc.id, " => ", doc.data());
      });
      const propFilteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavProperties(propFilteredData);

      //note: additional code for processing getDocs return
      //const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    };

    const executeFunctions = async () => {
      console.log("executing funcs");
      await fetchData();
      console.log("userdata");
      console.log(userData);

      console.log("fav properties");
      console.log(favProperties);
      console.log("finish executing funcs");
    };

    executeFunctions();
  }, [userData]);

  useEffect(() => {
    //get user data
    //temp code: to be replaced with login auth code
    let email = "maxinewu5@gmail.com";
    getUserData(email);
  }, []);

  const starRating = 4.89;

  return (
    <>
      <h2>
        {localStorage.name} ({starRating})
      </h2>
      <Link to="/AddListing">
        <button>Add Listing</button>
      </Link>
      <button>Edit Profile</button>

      <h3>My Listings</h3>
      {userProperties?.map((listing) => {
        return <CardItem text={listing.AptName}></CardItem>;
      })}

      <h3>Favorite Listings</h3>
      {favProperties?.map((listing) => {
        return <CardItem></CardItem>;
      })}
    </>
  );
}

export default UserProfile;
