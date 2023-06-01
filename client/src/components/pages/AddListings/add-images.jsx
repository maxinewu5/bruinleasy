import React, { useState, useEffect } from "react";

const AddImages = ({ onNext, images }) => {
  const handleEvent = (e) => {
    onNext([...images, e.target.files[0]]);
  };

  return (
    <div>
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
  );
};

export default AddImages;
