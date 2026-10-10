Calendar React — AccioJob MERN Assignment

A simple React calendar that lets the user navigate through months and years, pick a month from a dropdown, and edit the year by double-clicking it.

Files

 File Purpose

 src/components/App.js The complete solution (single functional component).

 src/styles/App.css Light styling (functionality is the priority).

 src/index.js React entry point (unchanged boilerplate).

 src/index.html HTML shell with <div id="root"> (unchanged boilerplate).

 src/__tests__/App.test.js Local test suite that mirrors the 9 official tests.

ID scheme (from the official id-nomenclature-chart.png)

 Element ID Notes

 Heading heading Text is exactly Calendar.

 Month dropdown month <select> with the 12 month names as option values.

 Year (display) year <span> showing the year.

 Year (editor) year On double-click the span is replaced by an <input id="year">.

 Day cells cell1 … cellN N is the 1-based position in the 6×7 grid (leading blanks are counted).

 Today's cell today Replaces its cellN id (so there is no cellN for that slot).

 Previous year previous-year Button (<<).

 Previous month previous-month Button (<).

 Next month next-month Button (>).

 Next year next-year Button (>>).

Why cell6/cell7 in the chart?

The chart's example month starts on a Friday, so the first five grid slots (Sun–Thu) are blank and the first real day (1) lands on the 6th slot → cell6. The numbering therefore follows the grid position, not the day-of-month.

Behaviour

- The grid is built from new Date(year, month, 1).getDay() (first weekday) and new Date(year, month + 1, 0).getDate() (days in month), padded to 6 full weeks.

- previous-month / next-month move one month and roll the year over at January/December boundaries.

- previous-year / next-year move one year.

- Double-clicking the year swaps the <span> for an <input>; typing updates the table immediately and Enter/blur commits the value.

- The cell whose date equals today's date (and only when the displayed month/year is the current one) receives id="today".

Run locally

npm install
npm test          # runs the local suite (9 tests)
npm start         # dev server
npm run build     # production bundle into ./dist

Note: the assignment targets Node 16. On newer Node versions webpack 4 needs NODE_OPTIONS=--openssl-legacy-provider to build (tests run fine without it).

Assumptions

Because the "detailed problem statement" (with the exact test assertions) was not included, two choices were inferred from the chart and the official blueprint:

- The month <select> uses the month name as its option value (so document.getElementById('month').value === 'January').

- The year editor reuses id="year" (the span is swapped for the input), so document.getElementById('year') resolves to the input after a double-click.