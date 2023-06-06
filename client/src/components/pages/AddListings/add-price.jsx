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
    <div>
      <h2>
        What would the monthly rent be for one person (including utilities)?
      </h2>
      <div>
        <button onClick={() => decreasePrice()}>-</button> ${price}{" "}
        <button onClick={() => increasePrice()}>+</button>
      </div>
      <br />
    </div>
  );
};

export default AddPrice;
