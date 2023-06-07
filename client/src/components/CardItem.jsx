import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { auth, db } from "../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import PropertyDisplay from "./pages/Property";

function CardItem(props) {
  const [like, setLike] = useState(props.liked);
  /*this controls the like button, if clicked useState is set to true, and 
  the styling changes so that the heart changes color to indicate the post
  has been liked. */

  if (props.canDelete) {
    console.log(props.propertyID + "can delete")
  }

  const getUserData = async (userEmail) => {
    let userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    const userProc = { ...userSnap.data(), id: userSnap.id };
    console.log(userProc);
    if(userProc.fav_properties)
      setLike(userProc.fav_properties.includes(props.PropertyID));
      
    //setUserData(userProc);
  };

  //set the like to the input props.liked passed in from Cards.jsx
  useEffect(() => {
    getUserData(auth.currentUser.email);
    setLike(props.liked);
  }, []);
  useEffect(() => {
    setLike(props.liked);
  }, [props.liked]);

  const handleLike = () => {
    setLike(!like);
    updateLikeOnFirebase(props.PropertyID);
    // props.setLikeState(!like);
    // props.onLike();
  };

  const updateLikeOnFirebase = async (PropertyID) => {
    let userEmail = auth.currentUser.email;
    let userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    let new_favorite_properties = [...userSnap.data().fav_properties];
    console.log("original fav props");
    console.log(new_favorite_properties);

    if (new_favorite_properties.includes(PropertyID)) {
      console.log("removing " + PropertyID);
      new_favorite_properties.splice(
        new_favorite_properties.indexOf(PropertyID),
        1
      );
    } else {
      console.log("adding " + PropertyID);
      new_favorite_properties.push(PropertyID);
    }
    await updateDoc(userRef, {
      fav_properties: new_favorite_properties,
    });
    console.log("after!");
    console.log(new_favorite_properties);
  };

  const handleTitleClick = () => {
    // Perform actions when title is clicked
    console.log("Title clicked!");
  };

  const deleteProperty = async () => {
    console.log("deleted " + props.propertyID)

    //remove property from property db by id
    await deleteDoc(doc(db, "Properties", props.PropertyID));   

    //TODO: implement an archive property feature

    //get the current logged in user
    let userEmail = auth.currentUser.email;
    let userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    let new_properties = [...userSnap.data().properties];

    //remove property from user's list of properties
    console.log("removing " + props.PropertyID);
    new_properties.splice(new_properties.indexOf(props.PropertyID), 1);
    await updateDoc(userRef, {
      properties: new_properties,
    });
    console.log("after!");



    //remove from user properties 
  };

  return (
    <div className="card_item">
      <div className="card_item_bckgrd">
        <div className="card_item_img">
          {/*card image which is the picture for the listing*/}
          {props.canDelete ? 
            <span className="delete_button" onClick={deleteProperty}> 
              {props.canDelete ? <AiOutlineClose /> : "" }
            </span>
          : <></>}
          <img
            src={props.src}
            alt={props.title}
            className="card_item_img_inside"
          />
          {/* the price component goes on the bottom left corner in a blue box*/}
          <h5 className="cards_item_rating" data-category={props.price} />
          <span className="card_heart_box"></span>
          <span className="card_heart" onClick={handleLike}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>
          {/* </div> */}
        </div>

        {/*Heading, which displays the location of the apartment*/}
        <div className="heading_post">
          <div className="card_header">
            <Link
              to="/Property"
              state={{ data: `${props.PropertyID}` }}
              className="card_header"
            >
              <span
                onClick={() => {
                  // PropertyDisplay(props.PropertyID);
                  // console.log(props.PropertyID);
                }}
              >
                {props.title}
              </span>
            </Link>
          </div>
        </div>
        {/*the body of the card*/}
        <div className="card_body_wrap">
          <p className="card_body">
            {props.excerpt}
            <br />
            <br />
            <span className="card_date">Available: {props.date}</span>
          </p>
        </div>
        <div className="card_author_wrap">
          <p className="card_author_txt">{props.author_name}</p>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
