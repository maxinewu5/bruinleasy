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
import Cards from "./Cards";
import { getAuth } from "firebase/auth";
import Login from "./Login"; 
import { useNavigate } from "react-router-dom";
import "./Button.css"

function UserProfile() {
  const navigate = useNavigate();

  //useAuthState hook
  const [user, loading, error] = useAuthState(auth);
  //not working auth code--
  //const auth = getAuth();
  //const user = auth.currentUser;

  //track state of userData, user owned properties, and fav properties
  const [userData, setUserData] = useState();
  const [userProperties, setUserProperties] = useState([]);
  const [favProperties, setFavProperties] = useState([]);

  //gets user data given userEmail
  const getUserData = async (userEmail) => {
    let userRef = doc(db, "users", userEmail)
    const userSnap = await getDoc(userRef)
    const userProc = {...userSnap.data(), id:userSnap.id}
    setUserData(userProc);
  };

  // old code:
  // const getUserData = async (userEmail) => {
  //   let usersRef = collection(db, "users");
  //   const userDat = await getDocs(
  //     query(usersRef, where("email", "==", userEmail))
  //   );
  //   const userDataFiltered = userDat.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setUserData(userDataFiltered[0]);
  // };

  //fixed code

  //gets data for userProperties and favProperties for the user in userData
  const getsProperties = async () => {

    //checks if the user is null
    if (user == null) return; 

    //get user data
    let userRef = doc(db, "users", user.email)
    const userSnap = await getDoc(userRef)
    const userProc = {...userSnap.data(), id:userSnap.id}
    setUserData(userProc)

    //stores user properties
    let userPropertiesData = []
    //stores user favorite properties
    let favPropertiesData = []

    //if (userData == undefined) return;

    //use a promise to only continue when async function has finished calling
    console.log(userData)
    if (userProc.properties != undefined) {
      console.log(userProc?.properties)
      await Promise.all(
        userProc?.properties?.map(async (property) => {
          //get the doc reference with the specified propertyid
          let docRef = doc(db, "Properties", property);
          //get the doc snapshot at this point in time
          const docSnap = await getDoc(docRef);
          //process the snapshot with .data() to pull the actual object date
          //push to user properties
          userPropertiesData.push({ ...docSnap.data(), id: docRef.id });
          //note: syntax for extracting the actual data out of the firebase doc object
          //{...doc.data(), id: doc.id})
        })
      )
      setUserProperties(userPropertiesData)
    }

    if (userProc.fav_properties != undefined) {
      await Promise.all(
        userProc.fav_properties?.map(async (property) => {
          let docRef = doc(db, "Properties", property);
          const docSnap = await getDoc(docRef);
          favPropertiesData.push({ ...docSnap.data(), id: docRef.id });
        })
      )
      setFavProperties(favPropertiesData)
    }
  };

  // broken code

  // const getUserProperties = async() => {
  //     let userPropertiesData = []
  //     userData?.properties.map(async (property) => {
  //         let docRef = doc(db, "Properties", property)
  //         const docSnap = await getDoc(docRef)
  //         //console.log(docSnap.data())
  //         userPropertiesData.push(docSnap.data())
  //         //console.log(userPropertiesData)
  //         setUserProperties(userPropertiesData)
  //     })

  //     let favPropertiesData = []
  //     console.log("user data fav property")
  //     console.log(userData?.fav_properties)
  //     userData?.fav_properties?.map(async (property) => {
  //         console.log("fav property")
  //         let docRef = doc(db, "Properties", property)
  //         const docSnap = await getDoc(docRef)
  //         //console.log(docSnap.data())
  //         favPropertiesData.push(docSnap.data())
  //         //console.log(favPropertiesData)
  //         setFavProperties(favPropertiesData)
  //     })
  // }

  //useEffect -- hook which handles side effects
  //- called whenever the page renders, can be used for API calls to firebase
  //- calls asyncronous function because API call returns promise (either success/failure)
  //get properties upon user data update

  useEffect(() => {

    getsProperties()  

    //broken code:
    // if (user != null) {
    //   getUserData(user.email).then( ()=> {
    //     getsProperties()  
    //   })
    // }
  }, [user]);

  //className="btn--outline--medium"

  return (user) ? (
    <>

      <br></br><br></br><br></br><br></br>
      <img height="48px" src={user?.photoURL}></img>
      <h3>{user?.displayName}</h3>
  
      <button className="btn--outline--medium"
        onClick={() => {
          navigate("/AddListing");
        }}
      >
        Add Listing
      </button>
      <button className="btn--outline--medium" >Edit Profile</button>

      <h3>My Listings</h3>

      <Cards properties={userProperties} />
 
      <h3>Favorite Listings</h3>
    
      <Cards properties={favProperties} />
    </>
  ) :  ( loading ? <></> : <Login />) 
}

export default UserProfile;

