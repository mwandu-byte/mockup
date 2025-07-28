
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Link for navigation
import Sidebar from '../components/SideBar'; // Import the new Sidebar component
import { useDarkMode } from '../context/DarkModeContext'; // Assuming you have this context

// Icons for demonstration. You might use a library like 'lucide-react' or 'react-icons'
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
);
const ProductsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
);
const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 15h.01"></path></svg>
);
const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

// Placeholder components for dashboard content
const DashboardContent = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Welcome to your dashboard! This is where you'll see a summary of your business operations.
      You can add charts, key metrics, and recent activity here.
    </p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Total Sales</h3>
        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">$12,345</p>
      </div>
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">New Orders</h3>
        <p className="text-3xl font-bold text-green-900 dark:text-green-100">56</p>
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">Pending Items</h3>
        <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">12</p>
      </div>
    </div>
  </div>
);

const ProductsContent = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Products Management</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Manage your product inventory here. Add new products, update existing ones, or remove them.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
      Add New Product
    </button>
  </div>
);

const OrdersContent = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Orders List</h2>
    <p className="text-gray-700 dark:text-gray-300">
      View and manage all customer orders. Process, ship, and track orders efficiently.
    </p>
    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
      View All Orders
    </button>
  </div>
);

const SettingsContent = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Configure your application settings, user profiles, and preferences.
    </p>
    <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
      Update Profile
    </button>
  </div>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Top Bar / Header */}
        <header className={`flex justify-between items-center p-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.582a1 1 0 01-1.393.175 6.993 6.993 0 00-9.112-9.112 1 1 0 01.175-1.393l.04-.04a1 1 0 011.393-.175 8.993 8.993 0 0111.112 11.112 1 1 0 01-.175 1.393l-.04.04zm-4.541-1.582a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm7.071-7.071a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm7.071 4.929a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.536-4.929a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              )}
            </button>
            {/* User Dropdown / Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Area for Routes */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route index element={<DashboardContent />} /> {/* Default content for /dashboard */}
            <Route path="products" element={<ProductsContent />} />
            <Route path="orders" element={<OrdersContent />} />
            <Route path="settings" element={<SettingsContent />} />
            {/* Add more routes for other dashboard sections */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
