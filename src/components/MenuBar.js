import { useContext } from "react";
import { useDarkMode } from "../context/DarkModeContext";

import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { darkMode, toggleDarkMode } = useContext(useDarkMode);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: App Name */}
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        Smart<span className="text-blue-600 dark:text-blue-400">Business</span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        {/* Dark mode switch */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <i className="fas fa-sun text-lg"></i>
          ) : (
            <i className="fas fa-moon text-lg"></i>
          )}
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default MenuBar;
