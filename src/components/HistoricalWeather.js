import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalWeather = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Prepare data for chart
  const chartData = {
    labels: data
      .map(day =>
        new Date(day.date).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
        })
      )
      .reverse(),
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: data.map(day => day.day.maxtemp_c).reverse(),
        borderColor: 'rgba(255, 99, 132, 1)', // Red
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Min Temperature (°C)',
        data: data.map(day => day.day.mintemp_c).reverse(),
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#333', // default light mode
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Past 7 Days Temperature Trend',
        color: '#333',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
      },
      y: {
        ticks: {
          color: '#666',
        },
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
        Historical Weather
      </h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-[400px]">
        <Line
          data={chartData}
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              legend: {
                ...options.plugins.legend,
                labels: {
                  color: '#111', // fallback
                  // Auto-detect dark mode
                  generateLabels: chart => {
                    const isDark =
                      document.documentElement.classList.contains('dark');
                    return ChartJS.defaults.plugins.legend.labels.generateLabels(
                      chart
                    ).map(label => ({
                      ...label,
                      fontColor: isDark ? '#eee' : '#333',
                    }));
                  },
                },
              },
              title: {
                ...options.plugins.title,
                color: document.documentElement.classList.contains('dark')
                  ? '#eee'
                  : '#111',
              },
            },
            scales: {
              x: {
                ticks: {
                  color: document.documentElement.classList.contains('dark')
                    ? '#ccc'
                    : '#444',
                },
              },
              y: {
                ticks: {
                  color: document.documentElement.classList.contains('dark')
                    ? '#ccc'
                    : '#444',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HistoricalWeather;
