import React, { useState, useEffect, useRef } from "react";
import "./Listing.css";
import "../../../App.css";
import "../../Login.css";

const AddImages = ({ onNext, images }) => {
  const handleEvent = (e) => {
    onNext([...images, e.target.files[0]]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onNext(updatedImages);
  };

  useEffect(() => {
    // Clear the file input value when images state changes
    if (images.length === 0) {
      const fileInput = document.getElementById("image-input");
      if (fileInput) {
        fileInput.value = null;
      }
    }
  }, [images]);

  return (
    <div className="listing_page">
      <div className="listing_container_big">
        <img
          className="background_img"
          src={process.env.PUBLIC_URL + "./images/images-back.png"}
          alt="Images Back"
        />
        <div className="listing_page">
          <div className="listing_container">
            <h2 className="heading">Please add images of your apartment</h2>
            <input
              id="image-input"
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
                  <div key={index}>
                    <p>{element.name}</p>
                    <button onClick={() => handleRemoveImage(index)}>x</button>
                  </div>
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
