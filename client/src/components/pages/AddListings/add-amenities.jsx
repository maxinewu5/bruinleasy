import React from "react";
import { useState } from "react";

const AddAmenities = () => {
  const [isChecked, setIsChecked] = useState(Array(5).fill(false));

  const handleCheckboxChange = (i) => {
    setIsChecked(!isChecked[i]);
  };

  return (
    <div>
      <h2>Does the apartment offer any of these amenities? </h2>
      <label>
        <input
          type="checkbox"
          checked={isChecked[0]}
          onChange={() => handleCheckboxChange(0)}
        />
        Air Conditioner
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[1]}
          onChange={() => handleCheckboxChange(1)}
        />
        Parking
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[2]}
          onChange={() => handleCheckboxChange(2)}
        />
        Furnishing
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[2]}
          onChange={() => handleCheckboxChange(2)}
        />
        Rooftop
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[2]}
          onChange={() => handleCheckboxChange(2)}
        />
        Lobby
      </label>
      <br />
      <br />
      <button>Next</button>
    </div>
  );
};

export default AddAmenities;
