import React, { useState } from "react";
import "./App.css"; // <-- App.css sits next to this file inside src/

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const App = () => {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth()); // 0 - 11
  const [year, setYear] = useState(now.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearText, setYearText] = useState(String(now.getFullYear()));

  const today = new Date();
  const isCurrentMonth =
    month === today.getMonth() && year === today.getFullYear();

  // Build the 6 x 7 grid of cells for the selected month/year.
  const firstWeekday = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // ----- Handlers -----------------------------------------------------------
  const goToMonth = (delta) => {
    const total = year * 12 + month + delta;
    setYear(Math.floor(total / 12));
    setMonth(((total % 12) + 12) % 12);
  };

  const handleMonthChange = (event) => {
    const value = event.target.value;
    const index = MONTHS.indexOf(value);
    setMonth(index !== -1 ? index : Number(value));
  };

  const handleYearChange = (event) => {
    setYearText(event.target.value);
    const parsed = parseInt(event.target.value, 10);
    if (!Number.isNaN(parsed)) setYear(parsed);
  };

  const commitYear = () => {
    const parsed = parseInt(yearText, 10);
    if (!Number.isNaN(parsed)) setYear(parsed);
    setIsEditingYear(false);
  };

  // ----- Render -------------------------------------------------------------
  return (
    <div id="main">
      <h1 id="heading">Calendar</h1>

      <div className="calendar-controls">
        <select id="month" value={MONTHS[month]} onChange={handleMonthChange}>
          {MONTHS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year"
            type="text"
            value={yearText}
            onChange={handleYearChange}
            onBlur={commitYear}
            onKeyDown={(event) => {
              if (event.key === "Enter") commitYear();
            }}
            autoFocus
          />
        ) : (
          <span
            id="year"
            onDoubleClick={() => {
              setYearText(String(year));
              setIsEditingYear(true);
            }}
          >
            {year}
          </span>
        )}
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const gridIndex = weekIndex * 7 + dayIndex + 1;

                if (day === null) {
                  return <td key={dayIndex}></td>;
                }

                const isToday = isCurrentMonth && day === today.getDate();

                return (
                  <td key={dayIndex} id={isToday ? "today" : `cell${gridIndex}`}>
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="calendar-nav">
        <button id="previous-year" onClick={() => setYear(year - 1)}>
          &lt;&lt;
        </button>
        <button id="previous-month" onClick={() => goToMonth(-1)}>
          &lt;
        </button>
        <button id="next-month" onClick={() => goToMonth(1)}>
          &gt;
        </button>
        <button id="next-year" onClick={() => setYear(year + 1)}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default App;
