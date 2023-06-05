import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import CardItem from './CardItem'
import Cards from './Cards'
import { getAdditionalUserInfo } from 'firebase/auth';

function UserProfile() {

    //useEffect -- hook which handles side effects
    //called whenever the page renders, can be used for API calls to firebase
    //asyncronous function -- because API call returns promise -- either success/failure 

    const [ userData, setUserData ] = useState()
    const [ userProperties, setUserProperties ] = useState([])
    const [ favProperties, setFavProperties ] = useState([])

    const getUserData = async(userEmail) => {
        let usersRef = collection(db, "users")
        const userDat = await getDocs(query(usersRef, where("email", "==", userEmail)));
        const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setUserData(userDataFiltered[0])
    }

    //fixed code
    const getsProperties = async () => {
        
        //gets user properties

        let userPropertiesData = [];

        if (userData == undefined) return
        console.log("not null!")

        await Promise.all(
          userData.properties.map(async (property) => {
            let docRef = doc(db, "Properties", property);
            const docSnap = await getDoc(docRef);
            userPropertiesData.push({...docSnap.data(), id: docRef.id});
            //{...doc.data(), id: doc.id})
          })
        );
        setUserProperties(userPropertiesData);

        //gets user favorite properties
      
        let favPropertiesData = [];
        await Promise.all(
          userData.fav_properties.map(async (property) => {
            let docRef = doc(db, "Properties", property);
            const docSnap = await getDoc(docRef);
            favPropertiesData.push({...docSnap.data(), id: docRef.id});
          })
        );
        setFavProperties(favPropertiesData);
    };

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

    //get properties upon user data update
    useEffect(()=> {

        getsProperties()

    }, [ userData ])

    //get user data upon load
    useEffect(()=> {
        //get user data
        //temp code: to be replaced with login auth code 
        let email = "maxinewu5@gmail.com"
        getUserData(email)
    }, [])

    // console.log("user properties")
    // console.log(userProperties)   
    // console.log("fav properties")
    // console.log(favProperties)  

    return (
        <>
            <h2>{localStorage.name}</h2>   
    
            <button>Add Listing</button>
            <button>Edit Profile</button>

            <h3>My Listings</h3> 
            
            <Cards 
                properties={userProperties}
            />

            <h3>Favorite Listings</h3>

            <Cards 
                properties={favProperties}
            />

        </>
        );
}

export default UserProfile;
