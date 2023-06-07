import AddAddress from "./add-address";
import AddAmenities from "./add-amenities";
import AddOcc from "./add-occupation";
import AddImages from "./add-images";
import AddDescription from "./add-description";
import AddPrice from "./add-price";
import AddDates from "./add-dates";

const ReviewAndSubmit = ({ setCurrentPage, handleSubmit, address, amenities, occCounters, price, dates, description }) => {
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
          <h2 className='heading'>Review and Submit</h2>
            <div className='submit_grid'>
                <div className='flex_right'>
                    <p>
                    Address: {address[0]}, {address[1]}, {address[3]}, {address[4]}{" "}
                    {address[5]}
                    </p>
                <button className='btn--outline--small-review' onClick={() => setCurrentPage(0)}>Edit Address</button>
                    <p>Amenities: {amenities.join(", ")}</p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(1)}>Edit Amenities</button>
                    <p>Bedrooms: {occCounters[1]}</p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(2)}>Edit Bedrooms</button>
                </div> 
                <div className='flex_left'>
                    <p>Bathrooms: {occCounters[0]}</p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(2)}>Edit Bathrooms</button>
                    <p>Price: ${price}/month</p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(6)}>Edit Price</button>
                    <p>
                        Dates:{" "}
                    {dates[0].toString().substring(4, 15) +
                        " - " +
                        dates[1].toString().substring(4, 15)}
                    </p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(5)}>Edit Dates</button>
                    <p>Description: {description}</p>
                    <button className='btn--outline--small-review' onClick={() => setCurrentPage(4)}>Edit Description</button>
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>
    );
      
}

export default ReviewAndSubmit;