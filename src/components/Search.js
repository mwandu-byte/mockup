import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
      setLocation('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center my-8 px-4">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location..."
        className="p-2 w-64 sm:w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!location.trim()}
        className={`p-2 px-4 font-medium rounded-r-md transition-colors duration-200
          ${location.trim()
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}
        `}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
