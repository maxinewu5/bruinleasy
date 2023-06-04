import React, { useState, useEffect } from "react";

const AddOcc = ({ onNext, counters }) => {
  // useEffect(() => {
  // }, []);

  const increaseCount = (i) => {
    onNext((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[i] += 1;
      return updatedCounters;
    });
  };

  const decreaseCount = (i) => {
    onNext((prevCounters) => {
      if (prevCounters[i] === 0) return prevCounters;
      const updatedCounters = [...prevCounters];
      updatedCounters[i] -= 1;
      return updatedCounters;
    });
  };

  return (
    <div>
      <h2>What is the apartment's occupation? </h2>
      <div>
        <button onClick={() => decreaseCount(0)}>-</button> Bathrooms:{" "}
        {counters[0]} <button onClick={() => increaseCount(0)}>+</button>
      </div>
      <div>
        <button onClick={() => decreaseCount(1)}>-</button> Bedrooms:{" "}
        {counters[1]} <button onClick={() => increaseCount(1)}>+</button>
      </div>
      <br />
    </div>
  );
};

export default AddOcc;
