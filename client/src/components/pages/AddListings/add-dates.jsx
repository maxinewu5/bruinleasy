import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div>
      <h2>Select Start and End Dates</h2>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={dates[0]}
          onChange={(date) => handleStartDateChange(date)}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={dates[1]}
          onChange={(date) => handleEndDateChange(date)}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <br />
    </div>
  );
};

export default AddDates;
