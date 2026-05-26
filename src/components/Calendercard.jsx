import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-gray-800 p-3 rounded-2xl text-white shadow-lg max-w-xs mx-auto">
      <h2 className="text-md font-semibold mb-3 text-purple-400 text-center">Calendar</h2>

      <Calendar
        onChange={setDate}
        value={date}
        className="react-calendar"
      />

      <div className="mt-3 text-center text-gray-400 text-sm">
        Selected:{" "}
        <span className="text-purple-300 font-medium">
          {date.toDateString()}
        </span>
      </div>

      <style>{`
        .react-calendar {
          width: 100%;
          background-color: #1f2937; /* bg-gray-800 */
          border-radius: 1rem;
          padding: 0.5rem;
          border: none;
          font-family: 'Inter', sans-serif;
          color: #d1d5db; /* text-gray-300 */
          box-shadow: 0 4px 10px rgb(139 92 246 / 0.4);
          max-height: 320px; /* reduce height */
          overflow: hidden; /* prevent scroll */
          font-size: 0.85rem; /* smaller font */
        }

        .react-calendar__navigation button {
          color: #a78bfa; /* text-purple-400 */
          min-width: 36px;
          background: none;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0.15rem;
          border-radius: 0.375rem;
          border: none;
          padding: 0.15rem 0;
        }
        .react-calendar__navigation button:hover,
        .react-calendar__navigation button:focus {
          background-color: #7c3aed; /* purple-600 */
          color: white;
          outline: none;
        }

        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.65rem;
          color: #a78bfa; /* purple-400 */
          margin-bottom: 0.3rem;
        }

        .react-calendar__tile {
          max-width: 100%;
          padding: 0.35rem 0; /* smaller padding */
          background: none;
          text-align: center;
          line-height: 1.3;
          border-radius: 0.4rem;
          color: #cbd5e1; /* gray-400 */
          transition: background-color 0.3s ease;
          cursor: pointer;
          font-size: 0.85rem;
        }

        .react-calendar__tile:hover,
        .react-calendar__tile:focus {
          background-color: #7c3aed; /* purple-600 */
          color: white;
          outline: none;
        }

        .react-calendar__tile--now {
          background: #5b21b6; /* purple-800 */
          color: #f3f4f6; /* gray-100 */
          font-weight: bold;
        }

        .react-calendar__tile--active {
          background: #8b5cf6; /* purple-500 */
          color: white;
          font-weight: bold;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default CalendarCard;
