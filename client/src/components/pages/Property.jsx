import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

const PropertyDisplay = () => {
  const { state } = useLocation();
  const Property_ID = state && state.data;
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const Property_Reference = doc(db, "Properties", Property_ID);
      const Property = await getDoc(Property_Reference);
      setPropertyData(Property.data());
    };

    if (Property_ID) {
      fetchData();
    }
  }, [Property_ID]);

  if (!propertyData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{propertyData.AptName}</h2>
      <p>
        Location: {propertyData.City}, {propertyData.State},{" "}
        {propertyData.Zipcode}
      </p>
      <p>Description: {propertyData.Description}</p>
      <p>Bedrooms: {propertyData.Bedrooms}</p>
      <p>Bathrooms: {propertyData.Bathrooms}</p>
      <p>Rent: ${propertyData.Rent}</p>
      <p>Start Date: {propertyData.StartDate.toDate().toLocaleDateString()}</p>
      <p>End Date: {propertyData.EndDate.toDate().toLocaleDateString()}</p>
      <p>Amenities:</p>
      <ul>
        <li>Air Conditioner: {propertyData.AirConditioner ? "Yes" : "No"}</li>
        <li>Furnishing: {propertyData.Furnishing ? "Yes" : "No"}</li>
        <li>Lobby: {propertyData.Lobby ? "Yes" : "No"}</li>
        <li>Parking: {propertyData.Parking ? "Yes" : "No"}</li>
        <li>Rooftop: {propertyData.Rooftop ? "Yes" : "No"}</li>
      </ul>
      <p>Owner Email: {propertyData.UserEmail}</p>
      <p>Property Images:</p>
      {propertyData.PropertyImageURLs.map((imageURL, index) => (
        <img key={index} src={imageURL} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default PropertyDisplay;
