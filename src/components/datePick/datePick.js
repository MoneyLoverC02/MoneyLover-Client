import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <button className='relative pr-28' onClick={onClick}>
      <p className='text-[12px] pb-[3px] text-slate-400 text-start'>Date</p>
      <div className='wrap-text-icon mb-1'>
        <div className='p-1 custom-date-picker'>{value}</div>
        <div className='ml-[120px] mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </button>);
  
  return (
    <DatePicker
      className="p-1 custom-date-picker text-semibold"
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      customInput={
        <CustomDatePickerInput />
      }
    />
  );
}