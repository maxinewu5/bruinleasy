import React, { useState } from "react";

const AddAmenities = ({ onNext, isChecked }) => {
  const handleCheckboxChange = (i) => {
    const updatedChecked = [...isChecked];
    updatedChecked[i] = !updatedChecked[i];
    onNext(updatedChecked);
  };

  return (
    <div>
      <h2>Does the apartment offer any of these amenities? </h2>
      <label>
        <input
          type="checkbox"
          checked={isChecked[0]}
          onChange={() => handleCheckboxChange(0)}
          value={isChecked[0]}
        />
        Air Conditioner
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[1]}
          onChange={() => handleCheckboxChange(1)}
          value={isChecked[1]}
        />
        Parking
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[2]}
          onChange={() => handleCheckboxChange(2)}
          value={isChecked[2]}
        />
        Furnishing
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[3]}
          onChange={() => handleCheckboxChange(3)}
          value={isChecked[3]}
        />
        Rooftop
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isChecked[4]}
          onChange={() => handleCheckboxChange(4)}
          value={isChecked[4]}
        />
        Lobby
      </label>
      <br />
      <br />
    </div>
  );
};

export default AddAmenities;
