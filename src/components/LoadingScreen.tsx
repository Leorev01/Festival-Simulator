import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 text-white text-center space-y-4">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h1 className="text-2xl font-semibold">Loading 🎪 Festival Simulator...</h1>
      <p className="text-sm opacity-80">Preparing your experience...</p>
    </div>
  );
}
