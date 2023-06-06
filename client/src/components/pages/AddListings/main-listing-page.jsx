import React, { useState } from "react";
import { db } from "../../../Firebase";
import { storage } from "../../../Firebase";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth } from "firebase/auth";
/////////////////////////////////////////////////////////////////////////
import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";
import AddImages from "./add-images";
import AddDescription from "./add-description";
import AddPrice from "./add-price";
import AddDates from "./add-dates";
import Login from "../../Login";

// Function to add listings....obviously
const AddListing = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const PropertiesRef = collection(db, "Properties");

  const [currentPage, setCurrentPage] = useState(0);
  const [address, setAddress] = useState(["", "", "", "", ""]);
  const [amenities, setAmenities] = useState(Array(5).fill(false));
  const [occCounters, setOccCounters] = useState([0, 0]);
  const [images, setImages] = useState([]);
  // const [imageVals, setImageVals] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1200);
  const [dates, setDates] = useState(["", ""]);

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
    // setImageVals(imageVal);
  };

  const handleNextDescription = (desc) => {
    setDescription(desc);
  };

  const handleNextPrice = (price) => {
    setPrice(price);
  };

  const handleNextDates = (updatedDates) => {
    setDates(updatedDates);
  };

  const getImageURLs = async (path) => {
    const imageRef = ref(storage, path);
    try {
      const result = await listAll(imageRef);
      const promises = result.items.map((itemRef) => getDownloadURL(itemRef));
      return Promise.all(promises);
    } catch (error) {
      console.error("Error retrieving image URLs:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    console.log("Address:", address);
    console.log("Amenities:", amenities);
    console.log("Occupation Counters:", occCounters);

    const propertyData = {
      CreatedAt: serverTimestamp(),
      RoomNumber: address[0],
      AptName: address[1],
      City: address[2],
      Zipcode: address[3],
      State: address[4],
      AirConditioner: amenities.includes(0),
      Parking: amenities.includes(1),
      Furnishing: amenities.includes(2),
      Rooftop: amenities.includes(3),
      Lobby: amenities.includes(4),
      Bathrooms: occCounters[0],
      Bedrooms: occCounters[1],
      UserEmail: user.email,
      Description: description,
      Rent: price,
      StartDate: dates[0],
      EndDate: dates[1],
    };

    const addProperty = async () => {
      try {
        const pRef = await addDoc(PropertiesRef, propertyData);
        console.log("Property added successfully");

        const userRef = doc(db, "users", user.email);
        await updateDoc(userRef, {
          properties: arrayUnion(pRef.id),
        });

        console.log("User updated successfully");

        return pRef.id;
      } catch (error) {
        console.error("Error adding property or updating user:", error);
        throw error;
      }
    };

    const uploadImages = async (propertyId) => {
      try {
        const imagePromises = images.map(async (image) => {
          const imageName = image.name + v4();
          const imageRef = ref(
            storage,
            `images/${user.email}/${propertyId}/${imageName}`
          );
          await uploadBytes(imageRef, image);
          console.log(`Image ${imageName} uploaded successfully`);
        });

        await Promise.all(imagePromises);

        const imageURLs = await getImageURLs(
          `images/${user.email}/${propertyId}`
        );
        console.log("Image URLs:", imageURLs);

        return imageURLs;
      } catch (error) {
        console.error(
          "Error uploading images or retrieving image URLs:",
          error
        );
        throw error;
      }
    };

    try {
      const propertyId = await addProperty();
      const imageURLs = await uploadImages(propertyId);

      await updateDoc(doc(PropertiesRef, propertyId), {
        PropertyImageURLs: imageURLs,
      });

      console.log("Property document updated with image URLs");
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (address.includes("")) {
      alert("Please enter a valid address.");
      return;
    }
    if (currentPage == 3 && images.length === 0) {
      alert("You have not added any images");
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return user ? (
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
        <AddDescription
          onNext={handleNextDescription}
          description={description}
        />
      )}
      {currentPage === 5 && <AddDates onNext={handleNextDates} dates={dates} />}
      {currentPage === 6 && <AddPrice onNext={handleNextPrice} price={price} />}

      {currentPage === 7 && (
        <div>
          <h2>Review and Submit</h2>
          <p>
            Address: {address[0]}, {address[1]}, {address[3]}, {address[4]}{" "}
            {address[5]}
          </p>
          <button onClick={() => setCurrentPage(0)}>Edit Address</button>
          <p>Amenities: {amenities.join(", ")}</p>
          <button onClick={() => setCurrentPage(1)}>Edit Amenities</button>
          <p>Bedrooms: {occCounters[1]}</p>
          <button onClick={() => setCurrentPage(2)}>Edit Bedrooms</button>
          <p>Bathrooms: {occCounters[0]}</p>
          <button onClick={() => setCurrentPage(2)}>Edit Bathrooms</button>
          <p>Price: ${price}/month</p>
          <button onClick={() => setCurrentPage(6)}>Edit Price</button>
          <p>
            Dates:{" "}
            {dates[0].toString().substring(4, 15) +
              " - " +
              dates[1].toString().substring(4, 15)}
          </p>
          <button onClick={() => setCurrentPage(5)}>Edit Dates</button>
          <p>Description: {description}</p>
          <button onClick={() => setCurrentPage(4)}>Edit Description</button>
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {currentPage > 0 && <button onClick={handlePrev}>Previous</button>}
      {currentPage < 7 && <button onClick={handleNext}>Next</button>}
    </div>
  ) : (
    <Login />
  );
};

export default AddListing;
