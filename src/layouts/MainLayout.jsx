import React, { useState } from "react";
import MenuBar from "../components/MenuBar";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔹 Add this

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      {/* Top MenuBar */}
      <MenuBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} /> {/* Pass props */}

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> {/* Pass props */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
