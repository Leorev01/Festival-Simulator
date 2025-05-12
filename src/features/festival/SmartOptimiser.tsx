import { useState } from 'react';

export default function SmartOptimiser() {
  const [attendance, setAttendance] = useState(50000);

  const suggested = {
    toilets: Math.ceil(attendance / 75),
    food: Math.ceil(attendance / 250),
    staff: Math.ceil(attendance / 100),
  };

  const applySuggestions = () => {
    const current = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
    const updated = {
      ...current,
      1: suggested.toilets, // Toilets (ID 1)
      2: suggested.food,    // Food vendors (ID 2)
      3: suggested.staff,   // Staff (ID 3)
    };
    localStorage.setItem('selected-amenities', JSON.stringify(updated));
    window.location.reload(); // refresh to show updated values
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8 space-y-4 border border-indigo-100">
      <h2 className="text-xl font-bold text-indigo-700">🧠 Smart Optimizer</h2>
      <p className="text-sm text-gray-500">
        Get suggested minimum resources for a safe festival.
      </p>

      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">Expected Attendance:</label>
        <input
          type="number"
          className="border p-2 rounded w-32"
          value={attendance}
          onChange={(e) => setAttendance(Number(e.target.value))}
        />
      </div>

      <div className="text-sm text-gray-700">
        <p>🧻 Toilets: <strong>{suggested.toilets}</strong></p>
        <p>🍔 Food Vendors: <strong>{suggested.food}</strong></p>
        <p>👷 Staff Members: <strong>{suggested.staff}</strong></p>
      </div>

      <button
        onClick={applySuggestions}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Apply Suggestions
      </button>
    </div>
  );
}
