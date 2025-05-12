import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SimulationPanel() {
  const [attendance, setAttendance] = useState(500000);
  const ticketPrice = 100;

  const toiletsNeeded = Math.ceil(attendance / 75);
  const staffNeeded = Math.ceil(attendance / 100);
  const foodNeeded = Math.ceil(attendance / 250);

  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const ticketRevenue = attendance * ticketPrice;
  const vendorRevenue = food * 500;
  const totalRevenue = ticketRevenue + vendorRevenue;

  const warnings = [];
  if (toilets < toiletsNeeded) warnings.push('🚽 Not enough toilets');
  if (food < foodNeeded) warnings.push('🍔 Too few food vendors');
  if (staff < staffNeeded) warnings.push('👷 Understaffed');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-10 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl p-8 space-y-8 border border-white/40"
      >
        <h2 className="text-4xl font-extrabold text-indigo-800 flex items-center gap-2">
          🎪 Festival Simulation
        </h2>

        {/* Attendance input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Attendance
          </label>
          <input
            type="number"
            className="w-full text-lg p-3 border border-indigo-300 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-400"
            value={attendance}
            onChange={(e) => setAttendance(parseInt(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Adjust to simulate different crowd sizes.
          </p>
        </div>

        {/* Requirement cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: '🚽 Toilets', needed: toiletsNeeded, have: toilets },
            { label: '🍔 Food Vendors', needed: foodNeeded, have: food },
            { label: '👷 Staff', needed: staffNeeded, have: staff }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: 'lightgrey' }}
              className="rounded-xl p-5 bg-white/80 border border-indigo-100 shadow"
            >
              <h4 className="text-sm font-semibold text-indigo-600 mb-1">
                {item.label}
              </h4>
              <p className="text-sm text-gray-700">
                Required: <strong>{item.needed}</strong>
              </p>
              <p className="text-sm text-gray-700">
                You have: <strong>{item.have}</strong>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Revenue cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="bg-green-100 p-4 rounded-xl border border-green-300 shadow-sm">
            <h4 className="text-sm font-semibold text-green-800 mb-1">🎟️ Ticket Revenue</h4>
            <p className="text-xl font-bold text-green-900">${ticketRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-300 shadow-sm">
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">🍟 Vendor Revenue</h4>
            <p className="text-xl font-bold text-yellow-900">${vendorRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl border border-blue-300 shadow-sm">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">💰 Total Revenue</h4>
            <p className="text-xl font-bold text-blue-900">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Warnings */}
        <AnimatePresence>
          {warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-red-100 border border-red-300 text-red-800 p-5 rounded-lg mt-6"
            >
              <h4 className="text-sm font-semibold mb-2">⚠️ Simulation Warnings</h4>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
