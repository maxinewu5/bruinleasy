import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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
            {props.title}<i class='fab fa-typo3' />
          </div>
        </div>

        <div className='card_body'>

          {/*This is the description of the apartment, short two
          to three lines*/}
          <p className='item_body'>{props.excerpt}</p>
          <div className='card_body_bottom'>
            <p className='item_author_txt'>{props.author_name}</p>
            <p className='item_price'>{props.price}</p>

            {/*display heart for like button */}
            <div className='item_heart' onClick={handleLike}>
              <i className={like ? 'far fa-heart' : 'fas fa-heart'}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 
// function CardItem(props) {

// }

export default CardItem;