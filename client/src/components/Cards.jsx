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
                excerpt='This is a great apartment for you!! Try it i w o rd word wrap plz'
                rating='5 star'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt7.png'}
                title='Mowe, Los Angeles'
                author_name='Janie'
                excerpt='Best apartment ever!!!!'
                rating='5 star'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt6.png'}
                title='ajksgd, Los Angeles'
                author_name='Anirudhk'
                excerpt='Great spot hehe'
                rating='5 star'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt4.png'}
                title='agkljkfdjhuie, Los Angeles'
                author_name='srinut'
                excerpt='WE have sooo many rooms'
                rating='5 star'
                />
                       <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                title='Mowe, Los Angeles'
                author_name='Janie'
                excerpt='Best apartment ever!!!!'
                rating='5 star'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt5.png'}
                title='ajksgd, Los Angeles'
                author_name='Anirudhk'
                excerpt='Great spot hehe'
                rating='5 star'
                />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;