import React, { useState } from "react";
import './Listing.css';
import '../../../App.css';

const AddAddress = ({ onNext, address }) => {
  const handleChange = (i, e) => {
    const { value } = e.target;
    const newAddress = [...address];
    newAddress[i] = value;
    onNext(newAddress);
  };

  return (
    <div className='listing_page'>
      <div className='listing_container_big'>
        <img
            className='background_img'
            src={process.env.PUBLIC_URL + "./images/location-back.png"}
            alt="Location Back"
          />
        <div className='listing_page'>
          <div className='listing_container'>
            <h2 className='heading'>First add your address below</h2>
            <div className='info_contain_address'>
              <input
                className='info_box'
                type="text"
                name="room"
                placeholder="Room No."
                value={address[0]}
                onChange={(e) => handleChange(0, e)}
              />
              <br />
              <input
                className='info_box'
                type="text"
                name="apartment"
                placeholder="Apartment Name"
                value={address[1]}
                onChange={(e) => handleChange(1, e)}
              />
              <br />
              <input
                className='info_box'
                type="text"
                name="city"
                placeholder="City"
                value={address[2]}
                onChange={(e) => handleChange(2, e)}
              />
              <br />
              <input
                className='info_box'
                type="number"
                name="zipcode"
                placeholder="Zipcode"
                value={address[3]}
                onChange={(e) => handleChange(3, e)}
              />
              <br />
              <input
                className='info_box'
                type="text"
                name="state"
                placeholder="State"
                value={address[4]}
                onChange={(e) => handleChange(4, e)}
              />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
