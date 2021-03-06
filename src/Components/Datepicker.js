import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = (props) => {
    const [startDate, setStartDate] = useState(new Date());

    return (
      <DatePicker className={props.className} selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };

export default Datepicker;