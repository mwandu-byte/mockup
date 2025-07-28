
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios here

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import { DarkModeProvider } from './context/DarkModeContext';

// Configure Axios to include the Authorization header for all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to home page
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <DarkModeProvider>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Fallback route for any undefined paths, redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
