import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";
import AddImages from "./add-images";
import AddDescription from "./add-description";
import AddPrice from "./add-price";
import AddDates from "./add-dates";

const ReviewAndSubmit = ({ setCurrentPage, handleSubmit, address, amenities, occCounters, price, dates, description }) => {
    return (
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
          <button className='btn--outline--small--half' onClick={handleSubmit}>Submit</button>
        </div>
    );
      
}

export default ReviewAndSubmit;