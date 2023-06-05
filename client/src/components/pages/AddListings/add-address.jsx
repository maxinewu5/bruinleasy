import React, { useState } from "react";

const AddAddress = ({ onNext, address }) => {
  const handleChange = (i, e) => {
    const { value } = e.target;
    const newAddress = [...address];
    newAddress[i] = value;
    onNext(newAddress);
  };

  return (
    <div>
      <h2>First add your address below</h2>
      <input
        type="text"
        name="room"
        placeholder="Room No."
        value={address[0]}
        onChange={(e) => handleChange(0, e)}
      />
      <br />
      <input
        type="text"
        name="apartment"
        placeholder="Apartment Name"
        value={address[1]}
        onChange={(e) => handleChange(1, e)}
      />
      <br />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address[2]}
        onChange={(e) => handleChange(2, e)}
      />
      <br />
      <input
        type="text"
        name="zipcode"
        placeholder="Zipcode"
        value={address[3]}
        onChange={(e) => handleChange(3, e)}
      />
      <br />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={address[4]}
        onChange={(e) => handleChange(4, e)}
      />
      <br />
      <br />
    </div>
  );
};

export default AddAddress;
