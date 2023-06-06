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

  const getAllProperty = async () => {
    const propertyData = await getDocs(collection(db, "Properties"))
    const propFilteredData = propertyData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setAllProperties(propFilteredData)
  }

  const addPropertyToUserFavorite = async(userEmail) => {
    let usersRef = collection(db, "users")
    const userDat = await getDocs(query(usersRef, where("email", "==", userEmail)));
    const userDataFiltered = userDat.docs.map((doc) => ({...doc.data(), id: doc.id}))
  }

  return (
    <>
      <div className='explore-container'>
        <img class='img-background' src={process.env.PUBLIC_URL + './images/explore.gif'} alt='explore' />
        <img className='img-title' src={process.env.PUBLIC_URL + './images/explore-title.png'} alt='explore' />
      </div>
      
      <SearchBar 
        setFilteredProperties={setAllProperties}
      />

      <Cards 
        properties={allProperties} 
        addPropertyToUserFavorite={addPropertyToUserFavorite} 
      />
    </>
  );
}

export default Explore;
