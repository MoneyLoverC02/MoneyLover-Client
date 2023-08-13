// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// export const convertDate = (dateStr) => {
//   // Chuyển chuỗi ngày tháng thành đối tượng Date
//   let dateObject = new Date(dateStr);

//   // Lấy thứ trong tuần
//   // let daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
//   let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   let dayOfWeek = daysOfWeek[dateObject.getDay()];

//   // Lấy ngày và tháng
//   let day = dateObject.getDate();
//   // let month = dateObject.getMonth() + 1;
//   let month = dateObject.toLocaleString('default', { month: 'long' });

//   let year = dateObject.getFullYear();

//   // Tạo định dạng mới
//   let newFormat = {dayOfWeek: `${dayOfWeek}`, day:`${day}`, month: `${month}`, year: `${year}`}

//   return newFormat;
// }

// export default function DatePickerComponent({ getDate }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     let dateString = formatDate(date);
//     getDate(dateString);
//   };

//   const CustomDatePickerInput = ({ value, onClick }) => (
//     <button className='relative' onClick={onClick}>
//       <p className='text-[12px] pb-[3px] text-slate-400 text-start'>Date</p>
//       <div className='wrap-text-icon mb-1'>
//         <div className='p-1 custom-date-picker'>{value}</div>
//         <div className='ml-[120px] mt-2'>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </div>
//       </div>
//     </button>);

//   return (
//     <DatePicker
//       className="p-1 custom-date-picker text-semibold"
//       selected={selectedDate}
//       onChange={handleDateChange}
//       dateFormat="dd/MM/yyyy"
//       customInput={
//         <CustomDatePickerInput />
//       }
//     />
//   );
// }


import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function changeDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const convertDate = (dateStr) => {
  // Chuyển chuỗi ngày tháng thành đối tượng Date
  let dateObject = new Date(dateStr);

  // Lấy thứ trong tuần
  // let daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayOfWeek = daysOfWeek[dateObject.getDay()];

  // Lấy ngày và tháng
  let day = dateObject.getDate();
  // let month = dateObject.getMonth() + 1;
  let month = dateObject.toLocaleString('default', { month: 'long' });

  let year = dateObject.getFullYear();

  // Tạo định dạng mới
  let newFormat = {dayOfWeek: `${dayOfWeek}`, day:`${day}`, month: `${month}`, year: `${year}`}

  return newFormat;
}

export function parseDate(input) {
  var parts = input.split('-');
  // parts[0] is the year, parts[1] is the month, and parts[2] is the day
  return new Date(parts[0], parts[1] - 1, parts[2]); // Note: Month is 0-based
}

export default function DatePickerComponent({ getDate, dateBefore }) {
;
  const [selectedDate, setSelectedDate] = useState(dateBefore ? parseDate(dateBefore) : new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let dateString = formatDate(date);
    getDate(dateString);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <button className='relative' onClick={onClick}>
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