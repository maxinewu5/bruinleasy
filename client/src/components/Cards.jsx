import React from 'react';
import { useState } from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Rentals!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
                src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                title='Kelton, LA'
                author_name='Maxine'
                author_photo={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                excerpt='This is a great apartment for you!! Try it i w o rd word wrap plz'
                rating='5 star'
                date='3/4-5/6'
                price='$$$'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt7.png'}
                title='Mowe, LA'
                author_name='Janie'
                excerpt='Best apartment ever!!!! /nWe have aircon /nWe are gret'
                rating='5 star'
                date='7/8-9/9'
                price='$$$$$'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt6.png'}
                title='ajksgd, LA'
                author_name='Anirudhk'
                excerpt='Great spot hehe /nFour bedroom /Big kitchen come try why does it not wrp'
                rating='5 star'
                date='5/7-8/9'
                price='$$$'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt4.png'}
                title='agkuie, LA'
                author_name='srinut'
                excerpt='WE have sooo many rooms js v more interesting facts, some sizes'
                rating='5 star'
                date='3/1-9/1'
                price='$$'
                />
                       <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                title='Mowe, LA'
                author_name='Janie'
                excerpt='Best apartment ever!!!! really great experiences from over 10 students'
                rating='5 star'
                date='1/1-12/1'
                price='$'
                />
            <CardItem 
                src={process.env.PUBLIC_URL + './images/aprt5.png'}
                title='ajksgd, LA'
                author_name='Anirudhk'
                excerpt='Great spot hehe, very clean, relatively new, good place to live'
                rating='5 star'
                date='5/10-7/10'
                price='$$$$'
                />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;