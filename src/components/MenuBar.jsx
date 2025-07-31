import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from "../context/DarkModeContext";
import { Sun, Moon, Menu, X, LogOut, MoreVertical, Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import useDeviceDetect from '../hooks/useDeviceDetect'; // Import the new hook

const MenuBar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDeviceDetect(); // Use the new hook
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.header
      className={`sticky top-0 z-30 transition-colors duration-300
        ${isDarkMode
          ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/50'
          : 'bg-white text-gray-900 shadow-lg shadow-gray-900/20'
        } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Mobile Menu Toggle & Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle - visible on md and smaller */}
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300
                ${isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Title - Responsive */}
            <div className="flex items-center gap-3">
              <h1 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}
                text-lg sm:text-xl lg:text-2xl`}>
                Dashboard
              </h1>
              {/* Separator and Welcome message - hidden on mobile, block on sm+ */}
              <div className={`hidden sm:block w-px h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <p className={`hidden sm:block text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Welcome back
              </p>
            </div>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar - hidden on mobile, flex on md+ */}
            <div className="hidden md:flex items-center gap-2">
              <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl px-4 py-2`}>
                <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`bg-transparent outline-none text-sm w-48 pl-8 ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
            </div>

            {/* Notifications - hidden on mobile, flex on md+ */}
            <button className="hidden md:flex p-2 rounded-xl transition-all duration-300
              hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>

            {/* Desktop-specific controls (lg and up) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300
                  ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                title="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700
                  hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl
                  text-sm font-medium transition-all duration-300 shadow-lg shadow-red-600/25"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Tablet-specific controls (md to lg) */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all duration-300
                  ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700
                  text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile-specific controls (sm and smaller) */}
            <div className="flex md:hidden items-center gap-2">
              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all duration-300
                  ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Dropdown Toggle */}
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className={`p-2 rounded-xl transition-all duration-300
                  ${isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (isMobile || isTablet) && ( // Only show dropdown if open and on mobile/tablet
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full right-4 mt-2 rounded-xl shadow-lg border z-50 md:hidden
              ${isDarkMode
                ? 'bg-gray-800 border-gray-700 shadow-gray-900/50'
                : 'bg-white border-gray-200 shadow-gray-900/20'
              } w-56`}
          >
            <div className="p-2">
              {/* Search for Mobile */}
              <div className={`relative mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
                <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`bg-transparent outline-none text-sm w-full pl-8 ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>

              {/* Notifications for Mobile */}
              <button className={`w-full flex items-center gap-3 text-sm py-3 px-3 rounded-lg transition-colors
                ${isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                <Bell size={18} />
                <span>Notifications</span>
              </button>

              {/* Logout for Mobile */}
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 text-sm py-3 px-3 rounded-lg transition-colors
                  text-red-600 hover:text-red-700 ${isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'}`}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (isMobile || isTablet) && ( // Only show backdrop if open and on mobile/tablet
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default MenuBar;