import React from 'react';

const Weathercard = ({ weatherdata }) => {
  if (!weatherdata || !weatherdata.main || !weatherdata.weather) {
    return (
      <div className="text-gray-400 mt-4 text-sm">
        Search a city to see weather.
      </div>
    );
  }

  const { temp } = weatherdata.main;
  const iconCode = weatherdata.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="flex flex-col items-center justify-center bg-purple-800/30 backdrop-blur-lg rounded-2xl p-4 shadow-md mt-4">
      <img
        src={iconUrl}
        alt="Weather Icon"
        className="w-16 h-16"
      />
      <div className="text-2xl font-bold text-white mt-2">
        {Math.round(temp)}°C
      </div>
    </div>
  );
};

export default Weathercard;
