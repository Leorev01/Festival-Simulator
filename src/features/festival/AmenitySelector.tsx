import { useEffect, useState } from 'react';
import { AMENITIES } from './amenities';
import type { Amenity } from './types';

interface Selection {
  [amenityId: number]: number;
}

export default function AmenitySelector() {
  const [selection, setSelection] = useState<Selection>({});
  const [attendance, setAttendance] = useState(500000);

  useEffect(() => {
    const saved = localStorage.getItem('selected-amenities');
    if (saved) setSelection(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('selected-amenities', JSON.stringify(selection));
  }, [selection]);

  const handleChange = (id: number, value: number) => {
    setSelection((prev) => ({ ...prev, [id]: value }));
  };

  const applySuggestions = () => {
    const suggested = {
      1: Math.ceil(attendance / 75),   // Toilets
      2: Math.ceil(attendance / 250),  // Food Vendors
      3: Math.ceil(attendance / 100),  // Staff
    };
    setSelection((prev) => ({ ...prev, ...suggested }));
  };

  const totalCost = AMENITIES.reduce((sum, a) => (selection[a.id] || 0) * a.costPerUnit + sum, 0);
  const totalEnergy = AMENITIES.reduce((sum, a) => (selection[a.id] || 0) * a.energyPerUnit + sum, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-purple-700">🛠️ Amenities</h2>

      {/* Smart Optimizer Panel */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 space-y-2">
        <h3 className="text-lg font-semibold text-purple-800">🧠 Smart Suggestions</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Attendance</label>
        <input
          type="number"
          className="w-40 border p-2 rounded text-sm"
          value={attendance}
          onChange={(e) => setAttendance(Number(e.target.value))}
        />
        <p className="text-sm text-gray-600 mt-2">Click below to auto-fill recommended amenities:</p>
        <button
          onClick={applySuggestions}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          📥 Apply Recommendations
        </button>
      </div>

      {/* Amenity Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {AMENITIES.map((a: Amenity) => (
          <div key={a.id} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <label className="block font-medium mb-1 text-gray-700">{a.name}</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 p-2 rounded-md"
              value={selection[a.id] || ''}
              onChange={(e) => handleChange(a.id, parseInt(e.target.value) || 0)}
            />
            <p className="text-sm mt-2 text-gray-500">
              ${a.costPerUnit} • {a.energyPerUnit} kWh
            </p>
          </div>
        ))}
      </div>

      <div className="text-sm text-purple-900 border-t pt-4">
        <p><strong>Total Amenity Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Amenity Energy:</strong> {totalEnergy} kWh</p>
      </div>
    </div>
  );
}
