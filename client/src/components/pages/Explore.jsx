import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import '../FrontPage.css';

function Explore() {
  return (
    <>
      <div className='explore-container'>
        <img class='img-background' src={process.env.PUBLIC_URL + './images/explore.gif'} alt='explore' />
        <img className='img-title' src={process.env.PUBLIC_URL + './images/explore-title.png'} alt='explore' />
      </div>
        <Cards />
    </>
  );
}

export default Explore;
