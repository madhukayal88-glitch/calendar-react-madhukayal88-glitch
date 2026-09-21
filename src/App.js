import React, { useState } from 'react';
import './App.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState('2023');

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      const newYear = selectedYear - 1;
      setSelectedYear(newYear);
      setYearInput(newYear.toString());
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      const newYear = selectedYear + 1;
      setSelectedYear(newYear);
      setYearInput(newYear.toString());
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    setSelectedYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    setSelectedYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInput(selectedYear.toString());
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const saveYear = () => {
    const parsedYear = parseInt(yearInput, 10);
    if (!isNaN(parsedYear) && parsedYear > 0) {
      setSelectedYear(parsedYear);
    } else {
      setYearInput(selectedYear.toString());
    }
    setIsEditingYear(false);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveYear();
    }
  };

  const renderCalendarMatrix = () => {
    const totalDays = getDaysInMonth(selectedYear, selectedMonth);
    const startDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    const rows = [];
    let currentDay = 1;

    for (let row = 0; row < 6; row++) {
      const cells = [];
      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < startDay) || currentDay > totalDays) {
          cells.push(<td key={`${row}-${col}`}></td>);
        } else {
          cells.push(
            <td key={`${row}-${col}`} id={`day-${currentDay}`}>
              {currentDay}
            </td>
          );
          currentDay++;
        }
      }
      rows.push(<tr key={row}>{cells}</tr>);
      if (currentDay > totalDays) break;
    }
    return rows;
  };

  return (
    <div className="calendar-container">
      <h1 id="heading">Calendar</h1>

      <div className="controls">
        <select id="month-dropdown" value={selectedMonth} onChange={handleMonthChange}>
          {MONTHS.map((monthName, index) => (
            <option key={monthName} value={index}>
              {monthName}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={yearInput}
            onChange={handleYearInputChange}
            onBlur={saveYear}
            onKeyDown={handleYearKeyDown}
            autoFocus
          />
        ) : (
          <span id="year-text" onDoubleClick={handleYearDoubleClick}>
            {selectedYear}
          </span>
        )}
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {DAYS_OF_WEEK.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendarMatrix()}</tbody>
      </table>

      <div className="controls">
        <button id="prev-year" onClick={handlePrevYear}>&lt;&lt;</button>
        <button id="prev-month" onClick={handlePrevMonth}>&lt;</button>
        <button id="next-month" onClick={handleNextMonth}>&gt;</button>
        <button id="next-year" onClick={handleNextYear}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default App;