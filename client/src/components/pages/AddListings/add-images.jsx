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
            <div className="info_contain_images">
              <input
                id="image-input"
                type="file"
                onChange={(e) => {
                  handleEvent(e);
                }}
              />
              {images.length === 0 && <p className="text">No Images Added</p>}
              {images.length !== 0 && (
                <div>
                  <p className="text">You have added the following images:</p>
                  {images.map((element, index) => (
                    <div key={index}>
                      <div className="img_name">
                        <p className="text">{element.name}</p>
                      </div>
                      <div className="cross_btn">
                        <button
                          className="inde"
                          onClick={() => handleRemoveImage(index)}
                        >
                          x
                        </button>
                      </div>
                      {/*can someone style the button x for me i cant see it so i don't know whats going on here */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
