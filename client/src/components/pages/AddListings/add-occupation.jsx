import React, { useState } from "react";

const AddOcc = () => {
  const [counters, setCounters] = useState([0, 0]);

  const increaseCount = (i) => {
    setCounters((prevCounters) => {
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
      <button>Next</button>
    </div>
  );
};

export default AddOcc;
