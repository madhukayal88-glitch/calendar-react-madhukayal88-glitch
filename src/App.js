import React, { useState } from 'react';
import './App.css';

function App() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);
  const [isEditing, setIsEditing] = useState(false);
  const [yearInput, setYearInput] = useState('2023');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDay = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDay(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateDays();

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearDoubleClick = () => {
    setIsEditing(true);
    setYearInput(year.toString());
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const handleYearInputBlur = () => {
    const newYear = parseInt(yearInput);
    if (!isNaN(newYear) && newYear > 0) {
      setYear(newYear);
    }
    setIsEditing(false);
  };

  const handleYearInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleYearInputBlur();
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevYear = () => {
    setYear(year - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
  };

  const buildRows = () => {
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

  const rows = buildRows();

  return (
    <div className="App">
      <h1 id="calendar-heading">Calendar</h1>
      
      <div>
        <select id="month-select" value={month} onChange={handleMonthChange}>
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
        
        <span style={{ marginLeft: '10px', fontSize: '18px' }}>
          {isEditing ? (
            <input
              id="year-input"
              type="number"
              value={yearInput}
              onChange={handleYearInputChange}
              onBlur={handleYearInputBlur}
              onKeyDown={handleYearInputKeyDown}
              autoFocus
            />
          ) : (
            <span id="year-text" onDoubleClick={handleYearDoubleClick}>
              {year}
            </span>
          )}
        </span>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button id="prev-month" onClick={handlePrevMonth}>← Month</button>
        <button id="next-month" onClick={handleNextMonth}>Month →</button>
        <button id="prev-year" onClick={handlePrevYear}>← Year</button>
        <button id="next-year" onClick={handleNextYear}>Year →</button>
      </div>

      <table id="calendar-table" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((day, colIndex) => (
                <td key={colIndex} style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {day !== null ? day : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;