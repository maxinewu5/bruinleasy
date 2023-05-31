import React from "react";
import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";

const AddListing = () => {
  return (
    <div>
      <h1>
        To add your property we will take you through a series of steps
        (Placeholder)
      </h1>
      <br />
      <AddAddress />
      <br />
      <AddAmenities />
      <br />
      <AddOcc />
    </div>
  );
};

export default AddListing;
