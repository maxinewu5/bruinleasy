import React, { useState } from "react";

const AddAmenities = ({ onNext }) => {
  const [isChecked, setIsChecked] = useState(Array(5).fill(false));

  const handleCheckboxChange = (i) => {
    const updatedChecked = [...isChecked];
    updatedChecked[i] = !updatedChecked[i];
    setIsChecked(updatedChecked);
  };

  const handleNext = () => {
    const selectedAmenities = isChecked
      .map((checked, index) => (checked ? index : null))
      .filter((index) => index !== null);
    onNext(selectedAmenities);
    setIsChecked(Array(5).fill(false));
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddAmenities;
