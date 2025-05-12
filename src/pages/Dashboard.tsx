import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('festival-user') || '{}');

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        Welcome, {user.name || 'Guest'} 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Ready to build your music festival? Let’s get started!
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/builder"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Start Festival Builder
        </Link>
      </motion.div>
    </div>
  );
}
