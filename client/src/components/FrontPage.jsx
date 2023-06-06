import React from "react";
import "../App.css";
import { Button1, Button2 } from "./Button";
import "./FrontPage.css";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();
  return (
    <div className="front-container">
      <img
        className="img-background"
        src={process.env.PUBLIC_URL + "./images/house.gif"}
        alt="house"
      />
      <img
        className="img-title"
        src={process.env.PUBLIC_URL + "./images/welcome1.png"}
        alt="welcome"
      />
      <div className="front-btns">
        <Button1
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          EXPLORE
        </Button1>
        <Button2
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          VIEW LISTINGS
        </Button2>
      </div>
    </div>
  );
}

export default FrontPage;
