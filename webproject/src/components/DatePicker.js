import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ startDate, setStartDate }) => {
  return (
    <div>
      <label>Date:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DatePickerComponent;