const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { location, current } = data;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-2">
        {location.name}, {location.country}
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center my-4 gap-4">
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="w-20 h-20"
        />
        <div className="text-5xl font-bold">{current.temp_c}°C</div>
      </div>

      <p className="text-xl mb-4">{current.condition.text}</p>

      <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <p className="font-semibold">Humidity</p>
          <p>{current.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <p className="font-semibold">Wind Speed</p>
          <p>{current.wind_kph} kph</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
