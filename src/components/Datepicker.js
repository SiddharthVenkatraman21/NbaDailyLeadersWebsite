import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DatePicker.css';
import '../css/GameCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);






const DateSelector = ({ getGames }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Set the user's time zone on component mount
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDateInUserTimeZone = new Date().toLocaleString('en-US', { timeZone: userTimeZone });
    setSelectedDate(new Date(currentDateInUserTimeZone));
  }, []);

    function convertDateFormat(inputDate) {
    // Parse the input date string
    const parsedDate = new Date(inputDate);
  
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date format');
      return null; // Return null or handle the error as needed
    }
  
    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
  }


  const handleDateChange = (date) => {
    console.log("Local string test: " + date)
    setSelectedDate(date)
    const localdate = date.toLocaleDateString('en-US');
    const newDate = convertDateFormat(localdate)
    getGames(newDate);
  };

  const handleNavigation = (amount, unit) => {
    const newDate= new Date(selectedDate);
   
    if (unit === 'day') {
      newDate.setDate(newDate.getDate() + amount);
    } else if (unit === 'month') {
      newDate.setMonth(newDate.getMonth() + amount);
    } else if (unit === 'year') {
      newDate.setFullYear(newDate.getFullYear() + amount);
    }

    setSelectedDate(newDate);
    getGames(newDate.toLocaleDateString('en-US'));
  };

  return (
    <div className="date-selector-container">
      <div className = "Labels-Container">
        <h1 className="Date-Label">DAILY NBA STATS</h1>
      </div>
      <div className="date-navigation">
        <div className = "Backward-buttons">
          <button onClick={() => handleNavigation(-1, 'year')}>   <FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Year </button>
          <button onClick={() => handleNavigation(-1, 'month')}><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Month</button>
          <button onClick={() => handleNavigation(-1, 'day')}><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Day</button>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM-dd-yyy"
          className="custom-datepicker"
          style={{ margin: '0 auto', textAlign: 'center' }}
        />
        <div className = "Forward-buttons">
          <button onClick={() => handleNavigation(1, 'day')}> Day <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>
          <button onClick={() => handleNavigation(1, 'month')}>Month <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>
          <button onClick={() => handleNavigation(1, 'year')}> Year <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
