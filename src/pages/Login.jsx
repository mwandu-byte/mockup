
// src/pages/Login.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/lookup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Username" className="w-full p-2 rounded bg-gray-700 text-white" required />
          <input type="password" placeholder="Password" className="w-full p-2 rounded bg-gray-700 text-white" required />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white">Login</button>
        </form>
      </motion.div>
    </div>
  );
}