import React, { useState, useEffect } from "react";
import './Listing.css';
import '../../../App.css';
import '../../Login.css';

const AddImages = ({ onNext, images }) => {
  const handleEvent = (e) => {
    onNext([...images, e.target.files[0]]);
  };

  return (
    <div className='listing_page'>
      <div className='listing_container_big'>
        <img
            className='background_img'
            src={process.env.PUBLIC_URL + "./images/image-back.png"}
            alt="Location Back"
          />
        <div className='listing_page'>
          <div className='listing_container'>
          <h2>Please add images of your apartment</h2>
          <input
            type="file"
            onChange={(e) => {
              handleEvent(e);
            }}
          />
          {images.length === 0 && <p>No Images Added</p>}
          {images.length !== 0 && (
            <div>
              <p>You have added the following images:</p>
              {images.map((element, index) => (
                <p key={index}>{element.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddImages;
