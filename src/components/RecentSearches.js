const RecentSearches = ({ searches, onSearch }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
        Recent Searches
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearch(search)}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
