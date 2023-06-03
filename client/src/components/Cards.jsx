import React from 'react';
import Reac, { useState } from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
                src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                title='Kelton, Los Angeles'
                author_name='Maxine'
                author_photo={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                excerpt='This is a great apartment for you!! \nTry it'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                title='Mowe, Los Angeles'
                author_name='Janie'
                author_photo={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                excerpt='Best apartment ever!!!!'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                title='ajksgd, Los Angeles'
                author_name='Anirudhk'
                author_photo={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                excerpt='Great spot hehe'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                title='agkljkfdjhuie, Los Angeles'
                author_name='srinut'
                author_photo={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                excerpt='WE have sooo many rooms'
                />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;