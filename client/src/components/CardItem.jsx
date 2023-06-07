import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { auth, db } from "../Firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import PropertyDisplay from "./pages/Property";

function CardItem(props) {
  const [like, setLike] = useState(props.liked);
  /*this controls the like button, if clicked useState is set to true, and 
  the styling changes so that the heart changes color to indicate the post
  has been liked. */

  const getUserData = async (userEmail) => {
    let userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    const userProc = { ...userSnap.data(), id: userSnap.id };
    console.log(userProc);
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

  return (
    <div className="card_item">
      <div className="card_item_bckgrd">
        <div className="card_item_img">
          <img
            src={props.src}
            alt={props.title}
            className="card_item_img_inside"
          />
          <h5 className="cards_item_rating" data-category={props.price}></h5>
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
