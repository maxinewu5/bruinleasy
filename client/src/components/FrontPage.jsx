import React from "react";
import "../App.css";
import { Button1, Button2 } from "./Button";
import "./FrontPage.css";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';

function FrontPage() {
  const navigate = useNavigate();
  return (
    <div className="front-container">
      <img
        className="img-background"
        src={process.env.PUBLIC_URL + "./images/house.gif"}
        alt="house"
      />
      <div className='welcome_front'>
        <h1 className='EXPLORE'>WELC
          <span className='yellow_explore'>O</span>
          <span className='blue_explore'>M</span>
          E</h1>
      </div>
      <div className="front-btns"><br />
        <Button1
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          EXPLORE
        </Button1>
      </div>
    </div>
  );
}

export default FrontPage;
