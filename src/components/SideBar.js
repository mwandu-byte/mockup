
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDarkMode } from '../context/DarkModeContext';

// Placeholder icons - replace with actual icons from a library like lucide-react or react-icons
const DefaultIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
  </svg>
);

// Map icon names from API to actual React components (or inline SVGs)
const iconMap = {
  dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
  ),
  products: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
  ),
  orders: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 15h.01"></path></svg>
  ),
  settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  ),
  // Add more icon mappings as needed
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({}); // State to manage open/closed submenus
  const { isDarkMode } = useDarkMode();
  const location = useLocation(); // Hook to get current URL location

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        // Ensure this is the correct API endpoint for your nested menus
        const response = await axios.get('http://127.0.0.1:8008/api/v1/menus');
        setMenuItems(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch sidebar menu.');
        console.error('Error fetching sidebar menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to toggle submenu state
  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Determine if a submenu should be initially open if one of its children is active
  useEffect(() => {
    const initialOpenState = {};
    menuItems.forEach(item => {
      if (item.children && item.children.length > 0) {
        const hasActiveChild = item.children.some(child => location.pathname === `/dashboard${child.path}`);
        if (hasActiveChild) {
          initialOpenState[item.name] = true;
        }
      }
    });
    setOpenSubmenus(initialOpenState);
  }, [menuItems, location.pathname]);


  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-500">Admin Panel</h2>
          {/* Close button for mobile */}
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="mt-5">
          {loading && (
            <div className="px-4 py-2 text-gray-400">Loading menu...</div>
          )}
          {error && (
            <div className="px-4 py-2 text-red-400">Error: {error}</div>
          )}
          {!loading && !error && menuItems.length === 0 && (
            <div className="px-4 py-2 text-gray-400">No menu items found.</div>
          )}
          {!loading && !error && menuItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || DefaultIcon;
            const isParentActive = item.children && item.children.some(child => location.pathname === `/dashboard${child.path}`);
            const isDirectlyActive = location.pathname === `/dashboard${item.path}`;
            const isActive = isDirectlyActive || isParentActive;

            if (item.children && item.children.length > 0) {
              // Render as parent menu with submenu
              return (
                <div key={index}>
                  <button
                    className={`flex items-center justify-between w-full px-4 py-2 my-2 rounded-md mx-3 transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
                      }`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <div className="flex items-center">
                      <IconComponent />
                      <span className="ml-3 text-lg font-medium">{item.name}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        openSubmenus[item.name] ? 'rotate-90' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  {openSubmenus[item.name] && (
                    <div className="pl-8"> {/* Indent submenus */}
                      {item.children.map((subItem, subIndex) => {
                        const isSubActive = location.pathname === `/dashboard${subItem.path}`;
                        return (
                          <Link
                            key={subIndex}
                            to={`/dashboard${subItem.path}`}
                            className={`flex items-center px-4 py-2 my-1 rounded-md transition-colors duration-200
                              ${isSubActive
                                ? 'bg-blue-500 text-white'
                                : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`
                              }`}
                            onClick={() => setSidebarOpen(false)} // Close sidebar on click for mobile
                          >
                            <span className="ml-2 text-md">{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              // Render as a single menu item
              return (
                <Link
                  key={index}
                  to={`/dashboard${item.path}`}
                  className={`flex items-center px-4 py-2 my-2 rounded-md mx-3 transition-colors duration-200
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
                    }`}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on click for mobile
                >
                  <IconComponent />
                  <span className="ml-3 text-lg font-medium">{item.name}</span>
                </Link>
              );
            }
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
