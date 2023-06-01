import React, { useState } from "react";
import { db } from "../../../Firebase";
import { storage } from "../../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
/////////////////////////////////////////////////////////////////////////
import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";
import AddImages from "./add-images";

// Function to add listings....obviously
const AddListing = () => {
  const PropertiesRef = collection(db, "Properties");

  const [currentPage, setCurrentPage] = useState(0);
  const [address, setAddress] = useState(["", "", "", "", ""]);
  const [amenities, setAmenities] = useState(Array(5).fill(false));
  const [occCounters, setOccCounters] = useState([0, 0]);
  const [images, setImages] = useState([]);

  const uploadImage = (image) => {
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(() => {
      alert("Image Uploaded");
    });
  };

  const handleNextAddress = (addressData) => {
    setAddress(addressData);
    // setCurrentPage(currentPage + 1);
  };

  const handleNextAmenities = (amenitiesData) => {
    setAmenities(amenitiesData);
    // setCurrentPage(currentPage + 1);
  };

  const handleNextOcc = (updatedCounters) => {
    setOccCounters(updatedCounters);
    // setCurrentPage(currentPage + 1);
  };

  const handleNextImages = (image) => {
    setImages(image);
  };

  const handleSubmit = async () => {
    console.log("Address:", address);
    console.log("Amenities:", amenities);
    console.log("Occupation Counters:", occCounters);
    images.forEach((image) => {
      console.log("Image:", image);
      uploadImage(image);
    });
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

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    // if (address.includes("")) {
    //   alert("Please enter a valid address.");
    //   return;
    // }
    if (currentPage == 3 && images.length === 0) {
      alert("You have not added any images");
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>
        To add your property we will take you through a series of steps
        (Placeholder)
      </h1>
      {currentPage === 0 && (
        <AddAddress onNext={handleNextAddress} address={address} />
      )}
      {currentPage === 1 && (
        <AddAmenities onNext={handleNextAmenities} isChecked={amenities} />
      )}
      {currentPage === 2 && (
        <AddOcc onNext={handleNextOcc} counters={occCounters} />
      )}
      {currentPage === 3 && (
        <AddImages onNext={handleNextImages} images={images} />
      )}
      {currentPage === 4 && (
        <div>
          <h2>Review and Submit</h2>
          {/* <p>Address:</p>
          <p>
            {address[0]}, {address[1]}
          </p>
          <p>
            {address[3]}, {address[4]}, {address[5]}
          </p>

          <p>Amenities: {amenities.join(", ")}</p>
          <p>Occupation Counters: {occCounters.join(", ")}</p> */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {currentPage > 0 && <button onClick={handlePrev}>Previous</button>}
      {currentPage < 4 && <button onClick={handleNext}>Next</button>}
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
