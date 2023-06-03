import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const[like, setLike] = useState(false);
  /*this controls the like button, if clicked useState is set to true, and 
  the styling changes so that the heart changes color to indicate the post
  has been liked. */

  return (
    <div className='card_item'>
      <div className='card_item_bckgrd'>
        <div className='card_item_img'>
          {/*image of apartment*/}
          <img src={props.src} 
          alt ={props.title}
          className='card_item_img_inside'/>
          {/* <div className='cards_item_rating_box'> */}
              <h5 className='cards_item_rating' data-category={props.rating}></h5>
        {/* </div> */}
        </div>
        <h1 className='heading_post'> 
        {/*Heading, which displays the location of the apartment*/}
          <Link className='card_header' href={'/props/${props.slug}'}>
            {props.title}
          </Link>
        </h1>
        <div className='card_body'>
          {/*This is the description of the apartment, short two
          to three lines*/}
          <p className='item_body'>{props.excerpt}</p>
          <div className='card_body_inside'>
            <p className='item_author_txt'>{props.author_name}</p>
            {/* <div className='cards_heart' onClick={() => setLike((prevLike)=>
              !prevLike)}>{like ? 
            <div id='heart'></div> : '<3'}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
} 
// function CardItem(props) {

// }

export default CardItem;