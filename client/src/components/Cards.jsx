import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs, setDoc, updateDoc, get } from "firebase/firestore";
import './Cards.css';
import { prodErrorMap } from 'firebase/auth';

function Cards(props) {

  const [ userData, setUserData ] = useState()
  const [ favProperties, setFavProperties ] = useState()
  const [ favUpdate , setFavUpdate ] = useState()

  //get the user data! 
  const getUserData = async(userEmail) => {
    let usersRef = collection(db, "users")
    const userDat = await getDocs(query(usersRef, where("email", "==", userEmail)));
    const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setUserData(userDataFiltered[0])
  }

  useEffect(()=> {
    //temp code: to be replaced with login auth code 
    let userEmail = "maxinewu5@gmail.com"
    getUserData(userEmail)
  }, [ favUpdate ])

  const handleLike = async (propertyID) => {

    let userEmail = localStorage.email

    let userRef = doc(db, "users", userEmail);
    let new_favorite_properties = [...userData.fav_properties]

    if (new_favorite_properties.includes(propertyID)) {
      console.log("removed")
      new_favorite_properties.splice(new_favorite_properties.indexOf(propertyID), 1)
    } else {
      new_favorite_properties.push(propertyID)
    }
    await updateDoc(userRef, {
      fav_properties: new_favorite_properties
    })

    console.log(new_favorite_properties)
  }

  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {props.properties?.map((listing) => {
              return <CardItem 
                key={listing.id}
                src={listing.PropertyImageURLs[0]}
                title={listing.AptName}
                author_name={listing.OwnerEmail}
                excerpt={listing.Description}
                date={listing.StartDate?.toDate().toDateString() + " - " + listing.EndDate?.toDate().toDateString()}
                price={"$" + listing?.Rent + "/mo"}
                liked={userData?.fav_properties.includes(listing.id)}
                onLike={()=>{ handleLike(listing.id) }}
                setLikeState={()=>{setFavUpdate()}}
              ></CardItem>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;