
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8008/api/v1/login", {
        phone: formData.phone,
        password: formData.password,
      });

    
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log('Login successful, token saved:', token); // Confirm token save

      // Use navigate for redirection
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      console.error('Login error:', err.response?.data || err.message); // Log full error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-stretch">

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full"
        >
          {/* Image */}
          <div className="md:w-1/2 h-72 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="People doing business"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
              Welcome to <span className="text-blue-600 dark:text-blue-400">Grow Your Business</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Run your shops smarter. Track sales, manage inventory, monitor purchases — everything you need to succeed in one place.
            </p>
          </div>
        </motion.div>

          {/* Login Card */}
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-10 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Login to your account
          </h2>

          {error && (
            <div className="text-red-500 bg-red-100 dark:bg-red-800 dark:text-white px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                name="phone"
                required
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="+255..."
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Password</label>
              <input
                name="password"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default Home;
