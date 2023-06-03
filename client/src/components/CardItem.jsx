import React, {useState} from 'react';
// import moment from 'moment';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <div className='card_item'>
      <div className='card_item_bckgrd'>
        <div className='card_item_img'>
          <img src={props.src} 
          alt ={props.title}
          className='card_item_img_inside'/>
        </div>
        <h1 className='heading_post'> 
          <Link href={'/props/${props.slug}'}>
            {props.title}
          </Link>
        </h1>
        <div className='card_body'>
          <p className='item_body'>{props.excerpt}</p>
          <div className='card_body_inside'>
            {/* <img 
              alt = {props.author_name}
              height='30px'
              width='30px'
              className='card-author-img'
              src={props.author_photo}
            /> */}
            <p className='item_author_txt'>{props.author_name}</p>
          </div>
        </div>
        {/* <div className='item_body_center'>
          <Link href={'/props/${props.slug}'}>
            <span className='item_body_inside'>
              More
            </span>
          </Link>
        </div> */}
      </div>
    </div>
  );
} 
// function CardItem(props) {

// }

export default CardItem;