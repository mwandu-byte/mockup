import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import { getPhrase } from '../utils/GetPhrase';
import {
  X,
  LayoutDashboard,
  Store,
  LineChart,
  ShoppingCart,
  Boxes,
  Settings,
  Menu,
  ChevronDown, // For submenu toggle
  Scale, Package, Warehouse, // Inventories submenus
  FileText, Receipt, // Sales submenus
  ClipboardList, ShoppingBag, // Purchases submenus
  Users, Key, UserCheck, Activity, // Settings submenus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useDeviceDetect from '../hooks/useDeviceDetect'; // Import the new hook

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDarkMode } = useDarkMode();
  const { user } = useAuth();
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useDeviceDetect(); // Use the new hook

  // State for hover expansion on desktop
  const [isExpanded, setIsExpanded] = useState(false);
  // State to manage which submenus are open (key: parentName, value: boolean)
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Define menu items with nested submenus
  const menus = useMemo(() => [
    { name: 'dashboard', icon: LayoutDashboard },
    { name: 'shops', icon: Store },
    {
      name: 'sales',
      icon: LineChart,
      submenu: [
        { name: 'salesinvoice', icon: FileText, path: 'sales/invoice' },
        { name: 'salesorder', icon: Receipt, path: 'sales/order' },
      ]
    },
    {
      name: 'purchases',
      icon: ShoppingCart,
      submenu: [
        { name: 'purchaseinvoice', icon: ClipboardList, path: 'purchases/invoice' },
        { name: 'purchaseorder', icon: ShoppingBag, path: 'purchases/order' },
      ]
    },
    {
      name: 'inventories',
      icon: Boxes,
      submenu: [
        { name: 'unitsofmeasure', icon: Scale, path: 'inventories/units-of-measure' },
        { name: 'products', icon: Package, path: 'inventories/products' },
        { name: 'stocks', icon: Boxes, path: 'inventories/stocks' },
        { name: 'stores', icon: Warehouse, path: 'inventories/stores' },
      ]
    },
    {
      name: 'settings',
      icon: Settings,
      submenu: [
        { name: 'roles', icon: Users, path: 'settings/roles' },
        { name: 'permissions', icon: Key, path: 'settings/permissions' },
        { name: 'users', icon: UserCheck, path: 'settings/users' },
        { name: 'activitylogs', icon: Activity, path: 'settings/activity-logs' },
      ]
    }
  ], []);

  // Effect to automatically open submenus if a child route is active
  useEffect(() => {
    const newOpenSubmenus = {};
    menus.forEach(menu => {
      if (menu.submenu) {
        const isParentActive = location.pathname.startsWith(`/dashboard/${menu.name}`);
        const isAnySubmenuActive = menu.submenu.some(sub => location.pathname === `/dashboard/${sub.path}`);
        if (isParentActive || isAnySubmenuActive) {
          newOpenSubmenus[menu.name] = true;
        }
      }
    });
    setOpenSubmenus(newOpenSubmenus);
  }, [location.pathname, menus]); // Re-run when location changes

  // Desktop hover handlers
  const handleMouseEnter = () => {
    if (isDesktop) { // Only expand on desktop
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) { // Only collapse on desktop
      setIsExpanded(false);
      // Optionally close all submenus when sidebar collapses on desktop
      setOpenSubmenus({});
    }
  };

  // Toggle submenu state
  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Determine sidebar width for framer-motion based on device and state
  const sidebarWidth = () => {
    if (isMobile || isTablet) {
      return sidebarOpen ? 320 : 0; // Mobile/Tablet: 320px when open, 0 when closed
    }
    return isExpanded ? 320 : 80; // Desktop: 320px when expanded, 80px when collapsed
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)} // Always open on click for mobile/tablet
        className={`md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl transition-all duration-300
          ${isDarkMode
            ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg shadow-gray-900/50'
            : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-gray-900/20'
          } border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile/tablet when sidebar is open */}
      <AnimatePresence>
        {sidebarOpen && (isMobile || isTablet) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar itself */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-colors duration-300 ease-in-out
          ${isDarkMode
            ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/50'
            : 'bg-white text-gray-900 shadow-xl shadow-gray-900/20'
          }
          border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
          ${(isMobile || isTablet) ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{ width: sidebarWidth() }} // Animate width based on calculated value
        transition={{ type: "tween", duration: 0.3 }} // Smooth transition for width
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <AnimatePresence mode="wait">
              {isExpanded || isMobile || isTablet || sidebarOpen ? ( // Show expanded header if expanded or on mobile/tablet when open
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex flex-col overflow-hidden" // Add overflow-hidden to prevent content overflow during animation
                >
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                    Manage<span className="capitalize font-bold text-blue-600 dark:text-blue-400">Business</span>
                  </p>
                </motion.div>
              ) : ( // Collapsed header for desktop when not expanded
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <span className="text-white text-sm font-bold">
                    {user?.role?.charAt(0)?.toUpperCase() || 'M'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close button for mobile/tablet */}
            {(isMobile || isTablet) && sidebarOpen && ( // Only show when sidebar is open on mobile/tablet
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                <X size={24} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {menus.map((item, index) => {
              // Corrected path for dashboard
              const parentUrl = item.name === 'dashboard' ? '/dashboard' : `/dashboard/${item.name}`;
              // Check if the current path starts with the parent URL (for parent active state)
              const isParentActive = location.pathname.startsWith(parentUrl);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              // Submenu is open if explicitly toggled, or if any of its children are active
              const isSubmenuOpen = openSubmenus[item.name] || isParentActive;

              const ParentMenuItemContent = (
                <>
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {(isExpanded || isMobile || isTablet || sidebarOpen) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden text-base font-medium flex-grow"
                      >
                        {getPhrase(item.name)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {hasSubmenu && (isExpanded || isMobile || isTablet || sidebarOpen) && (
                    <motion.div
                      initial={false}
                      animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  )}
                </>
              );

              return (
                <div key={index}>
                  {hasSubmenu ? (
                    // Render as a div/button if it has submenus (to toggle)
                    <div
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                        ${isParentActive // Highlight parent if any of its children are active
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
                          : `${isDarkMode
                            ? 'hover:bg-gray-800 text-gray-300 hover:text-white hover:shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:shadow-lg'
                          }`
                        }
                        ${!(isExpanded || isMobile || isTablet || sidebarOpen) ? 'justify-center' : ''}`}
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      {ParentMenuItemContent}
                    </div>
                  ) : (
                    // Render as a Link if it's a direct menu item
                    <Link
                      to={parentUrl}
                      onClick={() => (isMobile || isTablet) && setSidebarOpen(false)} // Close sidebar on link click on mobile/tablet
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                        ${isParentActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
                          : `${isDarkMode
                            ? 'hover:bg-gray-800 text-gray-300 hover:text-white hover:shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:shadow-lg'
                          }`
                        }
                        ${!(isExpanded || isMobile || isTablet || sidebarOpen) ? 'justify-center' : ''}`}
                    >
                      {ParentMenuItemContent}
                    </Link>
                  )}

                  {/* Submenu Items */}
                  <AnimatePresence>
                    {hasSubmenu && isSubmenuOpen && (isExpanded || isMobile || isTablet || sidebarOpen) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 pl-8 space-y-1"> {/* Indent submenus */}
                          {item.submenu.map((subItem, subIndex) => {
                            const subUrl = `/dashboard/${subItem.path}`;
                            const isSubActive = location.pathname === subUrl;
                            return (
                              <Link
                                key={subIndex}
                                to={subUrl}
                                onClick={() => (isMobile || isTablet) && setSidebarOpen(false)} // Close sidebar on link click on mobile/tablet
                                className={`flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 text-sm
                                  ${isSubActive
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : `${isDarkMode
                                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                    }`
                                  }
                                  ${!(isExpanded || isMobile || isTablet || sidebarOpen) ? 'justify-center' : ''}`}
                              >
                                <subItem.icon className="w-5 h-5 flex-shrink-0" />
                                <AnimatePresence mode="wait">
                                  {(isExpanded || isMobile || isTablet || sidebarOpen) && (
                                    <motion.span
                                      initial={{ opacity: 0, width: 0 }}
                                      animate={{ opacity: 1, width: 'auto' }}
                                      exit={{ opacity: 0, width: 0 }}
                                      className="whitespace-nowrap overflow-hidden flex-grow"
                                    >
                                      {getPhrase(subItem.name)}
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
