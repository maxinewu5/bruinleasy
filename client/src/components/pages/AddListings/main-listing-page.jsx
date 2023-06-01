import React, { useState } from "react";
import { db } from "../../../Firebase";
import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Function to add listings....obviously
const AddListing = () => {
  const PropertiesRef = collection(db, "Properties");

  const [address, setAddress] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [occCounters, setOccCounters] = useState([0, 0]);

  // Functions to be passed as props so that child components can make changes
  const handleNextAddress = (addressData) => {
    setAddress(addressData);
  };
  const handleNextAmenities = (amenitiesData) => {
    setAmenities(amenitiesData);
  };
  const handleNextOcc = (updatedCounters) => {
    setOccCounters(updatedCounters);
  };

  // Function to submit data in correct form to database
  const handleSubmit = async () => {
    console.log("Address:", address);
    console.log("Amenities:", amenities);
    console.log("Occupation Counters:", occCounters);
    if (address.includes("")) {
      alert("Please enter a valid address");
    }
    // Perform further actions or API calls here
    // await addDoc(PropertiesRef, {
    //   CreatedAt: serverTimestamp(),
    //   RoomNumber: address[0],
    //   AptName: address[1],
    //   City: address[2],
    //   Zipcode: address[3],
    //   State: address[4],
    //   AirConditioner: amenities.includes(0),
    //   Parking: amenities.includes(1),
    //   Furnishing: amenities.includes(2),
    //   Rooftop: amenities.includes(3),
    //   Lobby: amenities.includes(4),
    //   Bathrooms: occCounters[0],
    //   Bedrooms: occCounters[1],
    // });
  };

  return (
    <div>
      <h1>
        To add your property we will take you through a series of steps
        (Placeholder)
      </h1>
      <br />
      <AddAddress onNext={handleNextAddress} />
      <br />
      <AddAmenities onNext={handleNextAmenities} />
      <br />
      <AddOcc onNext={handleNextOcc} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddListing;

// Switch statement encoding amenities string
function getAmenName(number) {
  switch (number) {
    case 0:
      return "Air Conditioner";
    case 1:
      return "Parking";
    case 2:
      return "Furnishing";
    case 3:
      return "Rooftop";
    case 4:
      return "Lobby";
    default:
      return "Unknown";
  }
}
