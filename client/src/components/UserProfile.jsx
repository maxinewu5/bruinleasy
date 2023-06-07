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
import './FrontPage.css';
import './UserProfile.css';
import './Login.css';
import { useDocumentData } from 'react-firebase-hooks/firestore';
function UserProfile() {
  const navigate = useNavigate();

  //useAuthState hook
  const [user, loading, error] = useAuthState(auth);

  //not working auth code--
  //const auth = getAuth();
  //const user = auth.currentUser;

  //console.log(user)
  //const userRef = doc(db, 'users', user ? user.email : "maxinewu5@gmail.com");

  //track state of userData, user owned properties, and fav properties
  const [userData, setUserData] = useState();
  const [userProperties, setUserProperties] = useState([]);
  const [favProperties, setFavProperties] = useState([]);

  //TODO: clean up this implementation
  //using a temp test@g.ucla.edu placeholder email while the user loads 
  const [userDocData, userLoading, userError, userSnapshot] = useDocumentData(doc(db, 'users', user ? user.email : "test@g.ucla.edu"));

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
  }, [user, userDocData]);

  //className="btn--outline--medium"

  return (user) ? (
    <>
    <div className='profile_page' >
      <br></br><br></br><br></br><br></br>
      <div class="profile_header">
        <img
          className="profile-background"
          src={process.env.PUBLIC_URL + "./images/bcgrd.png"}
          alt="background"
        />
      </div>
      <img className='pfp' src={user?.photoURL}></img>
      <h3 className='welcome'>WELCOME</h3>
      <h3 className='name'> {user?.displayName}</h3>
      
      <div className='buttons_profile'>
        <button className="btn--outline--profile"
          onClick={() => {
            navigate("/AddListing");
          }}
        >
          Add Listing
        </button>
        <button className="btn--outline--profile" 
          onClick={()=>{navigate("/ReportUser")}}
          >Report User</button>
      </div>
      <div className='profile_body'>
      <h3 className='my_listing'>MY LISTINGS</h3>
        <Cards 
          canDelete={true}
          properties={userProperties} 
        />

        { userProperties.length == 0 ? <p>No listings.</p> : <></>}
  
      <h3 className='my_listing'>FAVORITE LISTINGS</h3>
      
        <Cards 
          properties={favProperties} 
        />

      { favProperties.length == 0 ? <p className='nofavwarning'>No favorited properties.</p> : <></>}

      </div>
    </div>
    </>
  ) :  ( loading ? <></> : <Login />) 
}

export default UserProfile;

