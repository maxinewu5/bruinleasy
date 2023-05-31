import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
        <h1>Check out these EPCI retnals</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                        text='Pretty Apartment hehe'
                        label='5 star'
                        path='/services'/>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                        text='Another one'
                        label='4 star'
                        path='/services'/>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                        text='Pic 2'
                        label='5 star'
                        path='/services'/>
                </ul>
                <ul className='cards__items'>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/apartment.jpeg'}
                        text='Pretty Apartment hehe'
                        label='5 star'
                        path='/services'/>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                        text='Another one'
                        label='4 star'
                        path='/services'/>
                    <CardItem 
                        src={process.env.PUBLIC_URL + './images/aprt3.jpeg'}
                        text='Pic 2'
                        label='5 star'
                        path='/services'/>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Cards;