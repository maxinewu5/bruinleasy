import React from "react";
import './Listing.css';
import '../../../App.css';
import '../../Login.css';

const AddDescription = ({ onNext, description }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onNext(value);
  };

  return (
    <div className='listing_page'>
      <div className='listing_container_big'>
        <img
            className='background_img'
            src={process.env.PUBLIC_URL + "./images/description-back.png"}
            alt="Location Back"
          />
        <div className='listing_page'>
          <div className='listing_container'>
          <h2 className='heading' >Please write a short description for your place</h2>
          <input 
            className='description_box_long' 
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddDescription;
