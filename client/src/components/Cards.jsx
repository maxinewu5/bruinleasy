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

  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {props.properties?.map((listing) => {
              return <CardItem 
                propertyId={listing.id}
                src={listing.PropertyImageURLs[0]}
                title={listing.AptName}
                author_name={listing.OwnerEmail}
                excerpt={listing.Description}
                date={listing.StartDate?.toDate().toLocaleDateString('en-US') + " - " + listing.EndDate?.toDate().toLocaleDateString('en-US')}
                price={"$" + listing?.Rent + "/mo"}
                // liked={userData?.fav_properties.includes(listing.id)}
                // onLike={()=>{ handleLike(listing.id) }}
                // setLikeState={()=>{setFavUpdate()}}
              ></CardItem>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;