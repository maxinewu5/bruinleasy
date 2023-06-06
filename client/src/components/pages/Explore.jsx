import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import '../FrontPage.css';
import SearchBar from '../SearchBar'

import { useState, useEffect } from 'react';
import { db } from '../../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

function Explore() {

  const [ allProperties, setAllProperties ] = useState([])

  //get all properties
  const getAllProperty = async () => {
    const propertyData = await getDocs(collection(db, "Properties"))
    const propFilteredData = propertyData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setAllProperties(propFilteredData)
  }

  //add property to user favorite
  const addPropertyToUserFavorite = async(userEmail) => {
    //get the user collection
    let usersRef = collection(db, "users")
    //get the documents where email matches the user email 
    const userDat = await getDocs(query(usersRef, where("email", "==", userEmail)));
    //extract useful info from the documents
    const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
  }

  return (
    <>
      <div className='explore-container'>
        <img class='img-background' src={process.env.PUBLIC_URL + './images/explore.gif'} alt='explore' />
        <h1>Explore</h1>
      </div>
      
      <SearchBar 
        setFilteredProperties={setAllProperties}
      />

      <Cards 
        properties={allProperties} 
      />
    </>
  );
}

export default Explore;
