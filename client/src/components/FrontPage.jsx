import React from 'react';
import '../App.css';
import { Button } from './Button';
import './FrontPage.css';

function FrontPage() {
    return (
        <div className='front-container'>
            <img className='img-background' src={process.env.PUBLIC_URL + './images/house.gif'} alt='house' />
            <img className='img-title' src={process.env.PUBLIC_URL + './images/welcome1.png'} alt='welcome' />
            <div className='front-btns'>
                <Button 
                className='btns' 
                buttonStyle='btn--outline'
                buttonSize='btn--large'>EXPLORE</Button>
                <Button 
                className='btns' 
                buttonStyle='btn--primary'
                buttonSize='btn--large'>VIEW LISTINGS 
                </Button>
            </div>
        </div>
    );
}

export default FrontPage;