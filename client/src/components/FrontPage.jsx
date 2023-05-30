import React from 'react';
import '../App.css';
import { Button } from './Button';
import './FrontPage.css';
// import dribbble from '../images/dribbble.gif';

function FrontPage() {
    return (
        <div className='front-container'>
            {/* <img src={dribbble}  /> */}
            <img class='img-background' src={process.env.PUBLIC_URL + './images/house.gif'} alt='house' />
            <h1>WELCOME</h1>
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