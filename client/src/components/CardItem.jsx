import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PropertyDisplay from './pages/Property';

function CardItem(props) {
  const [like, setLike] = useState(false);

  const handleLike = () => setLike(!like);

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
          <span className='card_heart' onClick={handleLike}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>
        </div>
        <div className='heading_post'>
          <Link className='card_header'>
            <span onClick={() => PropertyDisplay("4Igbs9zIFcJAW1k8CZDS")}>{props.title}</span>
          </Link>
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
