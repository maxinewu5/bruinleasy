import React from "react";

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
    <div className='listing_page'>
      <div className='listing_container_big'>
        <img
            className='background_img'
            src={process.env.PUBLIC_URL + "./images/location-back.png"}
            alt="Location Back"
          />
        <div className='listing_page'>
          <div className='listing_container'>
          <h2>
            What would the monthly rent be for one person (including utilities)?
          </h2>
          <div>
            <button onClick={() => decreasePrice()}>-</button> ${price}{" "}
            <button onClick={() => increasePrice()}>+</button>
          </div>
          <br />
        </div>
      </div>
    </div>
   </div>
  );
};

export default AddPrice;
