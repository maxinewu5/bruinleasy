import React, { useState, useEffect } from "react";

const AddOcc = ({ onNext }) => {
  const [counters, setCounters] = useState([0, 0]);

  useEffect(() => {
    onNext(counters);
  }, []);

  const increaseCount = (i) => {
    setCounters((prevCounters) => {
      const updatedCounters = [...prevCounters];
      updatedCounters[i] += 1;
      return updatedCounters;
    });
  };

  const handleNext = () => {
    onNext(counters);
    setCounters([0, 0]);
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddOcc;
