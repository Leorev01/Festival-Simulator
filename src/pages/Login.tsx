import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('festival-user', JSON.stringify({ name }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          🎪 Festival Simulator Login
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border border-gray-300 p-3 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded shadow hover:bg-indigo-700 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
