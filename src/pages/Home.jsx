import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      toast.error("All fields are required.");
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

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      toast.error(message);
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-10 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full"
        >
          <div className="md:w-1/2 h-72 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
              alt="Business Illustration"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
              Welcome to <span className="text-blue-600 dark:text-blue-400">Grow Your Business</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Run your shops smarter. Track sales, manage inventory, monitor purchases — all in one place.
            </p>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 sm:p-10 w-full"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
            Login to your account
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                required
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+255..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                name="password"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
