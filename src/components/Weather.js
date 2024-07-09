// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'e4ba114c98a6914a33ed7206615e19aa'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Location not found.');
      setWeatherData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>
      <form onSubmit={fetchWeather} className="w-full max-w-lg">
        <div className="flex items-center  border-b-2 border-white py-2">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-white placeholder-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-white hover:bg-gray-200 text-blue-500 hover:text-blue-700 text-sm border-4 border-white py-1 px-2 rounded"
          >
            Get Weather
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weatherData && (
        <div className="mt-10 p-8 bg-white bg-opacity-50 rounded-lg shadow-lg w-full max-w-lg text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{weatherData.name}</h2>
          <p className="text-3xl text-gray-700">{weatherData.main.temp}°C</p>
          <p className="text-xl text-gray-600">{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
