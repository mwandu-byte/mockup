import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HistoricalWeather from './components/HistoricalWeather';
import RecentSearches from './components/RecentSearches';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if (storedSearches) {
      setRecentSearches(storedSearches);
    }
  }, []);

  const handleSearch = async (location) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`;

    try {
      // Fetch current weather
      const weatherResponse = await fetch(currentWeatherUrl);
      const weather = await weatherResponse.json();
      if (weather.error) throw new Error(weather.error.message);
      setWeatherData(weather);

      // Fetch forecast
      const forecastResponse = await fetch(forecastUrl);
      const forecast = await forecastResponse.json();
      if (forecast.error) throw new Error(forecast.error.message);
      setForecastData(forecast.forecast.forecastday);

      // Fetch historical data
      const historicalPromises = [];
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        const historicalUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${formattedDate}`;
        historicalPromises.push(fetch(historicalUrl).then(res => res.json()));
      }
      const historicalResults = await Promise.all(historicalPromises);
      setHistoricalData(historicalResults.map(res => res.forecast.forecastday[0]));

      // Clear errors
      setError(null);

      // Save recent search
      if (!recentSearches.includes(location)) {
        const updatedSearches = [location, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
      setHistoricalData(null);
    }
  };

  return (
    <DarkModeProvider>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <h1 className="text-6xl font-bold text-center my-16">Weather Dashboard</h1>
          <Search onSearch={handleSearch} />
          <RecentSearches searches={recentSearches} onSearch={handleSearch} />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {weatherData && <CurrentWeather data={weatherData} />}
          {forecastData && <Forecast data={forecastData} />}
          {historicalData && <HistoricalWeather data={historicalData} />}
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
