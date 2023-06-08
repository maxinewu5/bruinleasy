import React from "react";
import "../App.css";
import "./FrontPage.css";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import './Login.css';

function FrontPage() {
  const navigate = useNavigate();
  return (
    <div className="front-container">
      {/*display opening image*/}
      <img
        className="img-background"
        src={process.env.PUBLIC_URL + "./images/house.gif"}
        alt="house"
      />
      {/*display Welcome message*/}
      <div className='welcome_front'>
        <h1 className='EXPLORE'>WELC
          <span className='yellow_explore'>O</span>
          <span className='blue_explore'>M</span>
          E</h1>
      </div>
      {/*button which leads to explore if logged in and log in if not*/}
      <div className="front-btns"><br />
      <button className='btn--outline--small--half' 
          onClick={() => {
            navigate("/Explore");
          }}>
          EXPLORE</button>
      </div>
    </div>
  );
}

export default FrontPage;
