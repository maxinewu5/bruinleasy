import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import CardItem from './CardItem'
import { getAdditionalUserInfo } from 'firebase/auth';

function UserProfile() {

    //useEffect -- hook which handles side effects
    //called whenever the page renders, can be used for API calls to firebase
    //     //asyncronous function 
    //     //why? b/c API call returns promise -- either success/failure 

    const [user, loading, error] = useAuthState(auth); 

    const [ userData, setUserData ] = useState()
    const [ userProperties, setUserProperties ] = useState()
    const [ favProperties, setFavProperties ] = useState()

    const [ isLoading, setIsLoading ] = useState(true)

    let userListingsElement = []
    let favListingsElement = []

    useEffect(()=> {

        console.log("effect ran")

        const fetchData = async () => {
            console.log("get user info called")
            if (loading || error || !user) return

            let usersRef = collection(db, "users")
            console.log("user email: " + user.email)
            const userDat = await getDocs(query(usersRef, where("email", "==", user.email)));
            const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUserData(userDataFiltered[0])
            console.log(userDat)
            console.log("set user info, finish user call")


            console.log("get property info called")
            let propertiesRef = collection(db, "properties")
            const propertyData = await getDocs(propertiesRef)

            //should we use a backend!! 
            //console.log("user data!!")
            //console.log(userData)
            console.log("user id:" + userData?.id)
            const q = query(propertiesRef, where("user_id", "==", userData?.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {console.log("doc " + doc.id, " => ", doc.data());});
            const propFilteredData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setFavProperties(propFilteredData[0])
            //const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            console.log("favprops")
            console.log(favProperties)

            setIsLoading(false)
        }

        const postHandling = async () => {

            console.log("userdata")
            console.log(userData)
        
            console.log("fav properties")
            console.log(favProperties)

        }

        const executeFunctions = async () => {
            console.log("executing funcs")
            await fetchData()
            await postHandling()
            console.log("finish executing funcs")
        }

        executeFunctions()
    }, [])

    const starRating = 4.89;

    return (
        <>
            <h2>{localStorage.name} ({starRating})</h2>   
    
            <button>Add Listing</button>
            <button>Edit Profile</button>
    
            <h3>Favorite Listings</h3>
            {userData?.properties.map((listing) => {
                return <CardItem></CardItem>
            })}
    
            <h3>My Listings</h3>    
            {userData?.properties.map((listing) => {
                return <CardItem></CardItem>
            })}
        </>
        );

    
}

export default UserProfile;
