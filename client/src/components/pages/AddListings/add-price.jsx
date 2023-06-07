import React from "react";
import "./Listing.css";
import "../../../App.css";
import "../../Login.css";

const AddPrice = ({ onNext, price }) => {
  const increasePrice = () => {
    price += 50;
    onNext(price);
  };

  const decreasePrice = () => {
    price -= 50;
    onNext(price);
  };

  return (
    <div className="listing_page">
      <div className="listing_container_big">
        <img
          className="background_img"
          src={process.env.PUBLIC_URL + "./images/rent-back.png"}
          alt="Rent Back"
        />
        <div className="listing_page">
          <div className="listing_container">
            <h2 className="heading">
              What would the monthly rent be for one room (including utilities)?
            </h2>
            <div className="info_contain_price">
              <button className="inde" onClick={() => decreasePrice()}>
                -
              </button>{" "}
              ${price}{" "}
              <button className="inde" onClick={() => increasePrice()}>
                +
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrice;
