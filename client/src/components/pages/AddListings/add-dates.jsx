import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Listing.css';
import '../../../App.css';
import '../../Login.css';

const AddDates = ({ onNext, dates }) => {
  const handleStartDateChange = (date) => {
    onNext((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[0] = date;
      return updatedDates;
    });
  };

  const handleEndDateChange = (date) => {
    onNext((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[1] = date;
      return updatedDates;
    });
  };

  return (
    <div className='listing_page'>
      <div className='listing_container_big'>
        <img
            className='background_img'
            src={process.env.PUBLIC_URL + "./images/dates-back.png"}
            alt="Location Back"
          />
        <div className='listing_page'>
          <div className='listing_container'>
            <h2 className='heading'>Select Start and End Dates</h2>
            <div className='info_contain_amenities'>
            <div className='body'>
              <label className='text'>Start Date:</label>
              <DatePicker
                className='datepicker'
                selected={dates[0]}
                onChange={(date) => handleStartDateChange(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div> <br />
            <div className='body'>
              <label className='text'>End Date:</label>
              <DatePicker
                className='datepicker'
                selected={dates[1]}
                onChange={(date) => handleEndDateChange(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div>
          </div>
          <img
            className='calendar_img'
            src={process.env.PUBLIC_URL + "./images/calendar.gif"}
            alt="Calendar"
          />
        </div>
       </div>
      </div>
    </div>
  );
};

export default AddDates;
