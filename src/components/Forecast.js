const Forecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((day) => {
          const date = new Date(day.date);
          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          });

          return (
            <div
              key={day.date}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md text-center"
            >
              <p className="font-semibold mb-2">{formattedDate}</p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-16 h-16 mx-auto"
              />
              <p className="mt-2">{day.day.condition.text}</p>
              <p className="mt-1 font-bold">
                {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
