import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import '../FrontPage.css';

function Explore() {
  return (
    <>
      <div className='front-container'>
        <img class='img-background' src={process.env.PUBLIC_URL + './images/explore.gif'} alt='explore' />
        <h1>Explore</h1>
        <Cards />
      </div>
    </>
  );
}

export default Explore;