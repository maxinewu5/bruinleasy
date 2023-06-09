import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Property.css"
import ImageSlider from "./ImageSlider.jsx"
const PropertyDisplay = () => {
  const [imageArray, setImageArray] = useState([]);
  const { state } = useLocation();
  const Property_ID = state && state.data;
  const [propertyData, setPropertyData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const Property_Reference = doc(db, "Properties", Property_ID);
      const Property = await getDoc(Property_Reference);
      if (Property.exists()) {
        setPropertyData(Property.data());
      }
    };
  
    if (Property_ID) {
      fetchData();
    }
  }, [Property_ID]);
  
  useEffect(() => {
    if (propertyData) {
      const imageURLs = propertyData.PropertyImageURLs;
      setImageArray(imageURLs);
      console.log(imageURLs);
    }
  }, [propertyData]);
  
  if (!propertyData) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className='property'>
        <div className="property_background">
        <div className="property_img_inside">
          <ImageSlider slides = {imageArray} />
          </div>
          </div>
          <div className="heading_post">
          <div className="card_header">{propertyData.AptName}</div>
        </div>
        <div className='body'>
          <p className="property_body">
            Location: {propertyData.City}, {propertyData.State}, {propertyData.Zipcode}<br />
            Bedrooms: {propertyData.Bedrooms}<br />
            Bathrooms: {propertyData.Bathrooms}<br />
            Start Date: {propertyData.StartDate.toDate().toLocaleDateString()}<br />
            End Date: {propertyData.EndDate.toDate().toLocaleDateString()}<br />
            <br />
            Amenities:
            <ul className='property_body'>
              <li>Air Conditioner: {propertyData.AirConditioner ? "Yes" : "No"}</li>
              <li>Furnishing: {propertyData.Furnishing ? "Yes" : "No"}</li>
              <li>Lobby: {propertyData.Lobby ? "Yes" : "No"}</li>
              <li>Parking: {propertyData.Parking ? "Yes" : "No"}</li>
              <li>Rooftop: {propertyData.Rooftop ? "Yes" : "No"}</li>
            </ul>
            <br />
            <span className="card_date">Description: {propertyData.Description}</span>
          </p>
        <div className="card_author_wrap">
          <p className="card_author_txt">Owner Email: {propertyData.UserEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDisplay;