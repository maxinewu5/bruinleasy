import React from "react";

const AddAddress = () => {
  return (
    <div>
      <h2>First add your address below</h2>
      <input type="text" placeholder="Address Line 1" />
      <br />
      <input type="text" placeholder="Address Line 2" />
      <br />
      <input type="text" placeholder="City" />
      <br />
      <input type="text" placeholder="Zipcode" />
      <br />
      <input type="text" placeholder="State" />
      <br />
      <br />
      <button>Next</button>
    </div>
  );
};

export default AddAddress;
