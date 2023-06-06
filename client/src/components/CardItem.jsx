import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

function CardItem(props) {
  const[like, setLike] = useState(props.liked);
  /*this controls the like button, if clicked useState is set to true, and 
  the styling changes so that the heart changes color to indicate the post
  has been liked. */

  //set the like to the input props.liked passed in from Cards.jsx
  useEffect(()=> {  
    setLike(props.liked)
  }, []) 
  useEffect(() => {
    setLike(props.liked)
  }, [props.liked]);  

  const handleLike = () => {
    setLike(!like);
    props.setLikeState(!like)
    props.onLike()
  }
  
  const handleTitleClick = () => {
    // Perform actions when title is clicked
    console.log('Title clicked!');
  };

  return (
    <div className='card_item'>
      <div className='card_item_bckgrd'>
        <div className='card_item_img'>
          <img src={props.src} alt={props.title} className='card_item_img_inside' />
          <h5 className='cards_item_rating' data-category={props.price}></h5>
          <span className='card_heart_box'></span>
          <span className='card_heart' onClick={handleLike} > 
          {(like) ? <AiFillHeart /> : <AiOutlineHeart/>}</span>
          {/* </div> */}
        </div>

        {/*Heading, which displays the location of the apartment*/}
        <div className='heading_post'> 
          <div className='card_header'>
            <Link className='card_header'>
              <span onClick={() => PropertyDisplay("4Igbs9zIFcJAW1k8CZDS")}>{props.title}</span>
            </Link>
            {/* <span className='card_heart' onClick={handleLike}>
            {like ? <AiFillHeart /> : <AiOutlineHeart/>}
            </span> */}
          </div>
          {/*display heart for like button */}
          <span className='card_heart' onClick={handleLike}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>
        </div>

        <div className='card_body_wrap'>
          <p className='card_body'>
            {props.excerpt}
            <br /><br />
            <span className='card_date'>Available: {props.date}</span>
          </p>
        </div>
        <div className='card_author_wrap'>
          <p className='card_author_txt'>{props.author_name}</p>
        </div>
      </div>
    </div>
  );
} 

export default CardItem;
