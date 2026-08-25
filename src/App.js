import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInputValue, setYearInputValue] = useState('2023');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInputValue(selectedYear.toString());
  };

  const handleYearInputChange = (event) => {
    setYearInputValue(event.target.value);
  };

  const handleYearInputBlur = () => {
    const newYear = parseInt(yearInputValue);
    if (!isNaN(newYear) && newYear > 0) {
      setSelectedYear(newYear);
    }
    setIsEditingYear(false);
  };

  const handleYearInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleYearInputBlur();
    }
  };

  const handlePrevMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const buildCalendarRows = () => {
    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const row = calendarDays.slice(i, i + 7);
      while (row.length < 7) {
        row.push(null);
      }
      rows.push(row);
    }
    return rows;
  };

  const calendarRows = buildCalendarRows();

  return (
    <div className="App">
      <h1 id="calendar-heading">Calendar</h1>
      
      <div>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        
        <span>
          {isEditingYear ? (
            <input
              id="year-input"
              type="number"
              value={yearInputValue}
              onChange={handleYearInputChange}
              onBlur={handleYearInputBlur}
              onKeyDown={handleYearInputKeyDown}
              autoFocus
            />
          ) : (
            <span id="year-text" onDoubleClick={handleYearDoubleClick}>
              {selectedYear}
            </span>
          )}
        </span>
      </div>

      <div>
        <button id="prev-month" onClick={handlePrevMonth}>← Month</button>
        <button id="next-month" onClick={handleNextMonth}>Month →</button>
        <button id="prev-year" onClick={handlePrevYear}>← Year</button>
        <button id="next-year" onClick={handleNextYear}>Year →</button>
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((day, colIndex) => (
                <td key={colIndex}>{day !== null ? day : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;