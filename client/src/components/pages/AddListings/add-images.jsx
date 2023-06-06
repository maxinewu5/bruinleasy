import React, { useState, useEffect } from "react";

const AddImages = ({ onNext, images }) => {
  const handleEvent = (e) => {
    onNext([...images, e.target.files[0]]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onNext(updatedImages);
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
            <div key={index}>
              <p>{element.name}</p>
              <button onClick={() => handleRemoveImage(index)}>x</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddImages;
