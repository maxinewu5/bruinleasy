import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function CardItem(props) {
  const[like, setLike] = useState(false);
  /*this controls the like button, if clicked useState is set to true, and 
  the styling changes so that the heart changes color to indicate the post
  has been liked. */

  const handleLike = () => setLike(!like);

  
  return (
    <div className='card_item'>
      <div className='card_item_bckgrd'>
        
        {/*image of apartment*/}
        <Link className='card_item_img' href={props.post}>
          <img src={props.src} 
          alt ={props.title}
          className='card_item_img_inside'/>
        <h5 className='cards_item_rating' data-category={props.rating}></h5>
        </Link>

        {/*Heading, which displays the location of the apartment*/}
        <div className='heading_post'> 
          <div className='card_header'>
            {props.title}
            <span className='card_heart' onClick={handleLike}>
            {like ? <AiFillHeart /> : <AiOutlineHeart/>}
            </span>
          </div>
          {/*display heart for like button */}
        </div>

        {/*This is the description of the apartment, short two
        to three lines*/}
        <p className='card_body'>{props.excerpt}</p>

        <div className='card_author_wrap'>
          <p className='card_author_txt'>{props.author_name}</p>
        </div>
        <div className='card_price_wrap'>
          <p className='card_price'>{props.price}</p>
        </div>
      </div>
    </div>
  );
} 
// function CardItem(props) {

// }

export default CardItem;