import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import CardItem from './CardItem'
import { getAdditionalUserInfo } from 'firebase/auth';

function UserProfile() {

    const [ userData, setUserData ] = useState()
    const [ userProperties, setUserProperties ] = useState()
    const [ favProperties, setFavProperties ] = useState()


    const getUserData = async(userEmail) => {
        let usersRef = collection(db, "users")
        const userDat = await getDocs(query(usersRef, where("email", "==", userEmail)));
        const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setUserData(userDataFiltered[0])

        console.log("user data gotten")
    }

    const getUserProperties = async() => {

        console.log("user data")
        console.log(userData)

        let userPropertiesData = []
        userData?.properties.map(async (property) => {
            let docRef = doc(db, "Properties", property)
            const docSnap = await getDoc(docRef)
            console.log(docSnap.data())
            userPropertiesData.push(docSnap.data())
            console.log(userPropertiesData)
            setUserProperties(userPropertiesData)
        })
        
        //setUserProperties(userPropertiesData)
        console.log("user properties again")
        console.log(userPropertiesData)
    }

    useEffect(()=> {
        console.log("effect ran")
        let user_email = "maxinewu5@gmail.com";
        getUserData(user_email)
    }, [])

    useEffect(()=> {
        getUserProperties()
    }, [userData])

    const starRating = 4.89;

    console.log("userprops")
    console.log(userProperties)

    return (
        <>
            <h2>{localStorage.name} ({starRating})</h2>   
    
            <button>Add Listing</button>
            <button>Edit Profile</button>

            <h3>My Listings</h3>    
            {userProperties?.map((listing) => {
                return <CardItem
                    text={listing.AptName}
                ></CardItem>
            })}

            <h3>Favorite Listings</h3>
            {favProperties?.map((listing) => {
                return <CardItem></CardItem>
            })}

        </>
        );
}

export default UserProfile;
