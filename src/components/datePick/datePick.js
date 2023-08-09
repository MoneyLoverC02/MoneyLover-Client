import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize'; // Đảm bảo import module này

import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const DatePickerComponent = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div>
      <DateRangePicker
        startDate={dateRange.startDate}
        startDateId="your_unique_start_date_id"
        endDate={dateRange.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
    </div>
  );
};

export default DatePickerComponent;