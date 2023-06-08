import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Property.css"
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
    <div className="cards_Property">
  <div className="card_item_bckgrd">
    <div className="card_item_img">
      {imageArray.map((imageURL, index) => (
        <img
          key={index}
          src={imageURL}
          alt={`Image ${index + 1}`}
          className="card_item_img_inside"
        />
      ))}
      <h5 className="cards_item_rating" data-category={propertyData.Rent} />
  </div>
  </div>
        <div className="card_body_wrap">
          <p className="card_body">
          <div className="heading_post">
        <div className="card_header">{propertyData.AptName}</div>
          </div>
          <br /> <br />
            Location: {propertyData.City}, {propertyData.State}, {propertyData.Zipcode}
            Bedrooms: {propertyData.Bedrooms}
            Bathrooms: {propertyData.Bathrooms}
            Start Date: {propertyData.StartDate.toDate().toLocaleDateString()}
            End Date: {propertyData.EndDate.toDate().toLocaleDateString()}
            <br />
            Amenities:
            <ul>
              <li>Air Conditioner: {propertyData.AirConditioner ? "Yes" : "No"}</li>
              <li>Furnishing: {propertyData.Furnishing ? "Yes" : "No"}</li>
              <li>Lobby: {propertyData.Lobby ? "Yes" : "No"}</li>
              <li>Parking: {propertyData.Parking ? "Yes" : "No"}</li>
              <li>Rooftop: {propertyData.Rooftop ? "Yes" : "No"}</li>
       </ul>
            <br />
            <br />
            <span className="card_date">Description: {propertyData.Description}</span>
          </p>
        </div>
        
        <div className="card_author_wrap">
          <p className="card_author_txt">Owner Email: {propertyData.UserEmail}</p>
        </div>
      </div>
  );
};

export default PropertyDisplay;