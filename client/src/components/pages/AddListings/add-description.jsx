import React from "react";

const AddDescription = ({ onNext, description }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onNext(value);
  };

  return (
    <div>
      <h2>Please write a short description for your place 😘</h2>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <br />
    </div>
  );
};

export default AddDescription;
