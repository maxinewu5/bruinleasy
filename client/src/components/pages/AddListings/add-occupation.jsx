import React, { useState, useEffect } from "react";

const AddOcc = ({ onNext, counters }) => {
  useEffect(() => {
    // Code that previously used onNext should be placed here if needed
  }, []);

  const increaseCount = (i) => {
    onNext((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[i] += 1;
      return updatedCounters;
    });
  };

  return (
    <div>
      <h2>What is the apartment's occupation? </h2>
      <div>
        Bathrooms: {counters[0]}{" "}
        <button onClick={() => increaseCount(0)}>Increase</button>
      </div>
      <div>
        Bedrooms: {counters[1]}{" "}
        <button onClick={() => increaseCount(1)}>Increase</button>
      </div>
      <br />
    </div>
  );
};

export default AddOcc;
