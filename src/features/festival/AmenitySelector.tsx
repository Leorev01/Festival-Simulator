import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AMENITIES } from './amenities';

interface Selection {
  [amenityId: number]: number;
}

export default function AmenitySelector() {
  const [selection, setSelection] = useState<Selection>({});

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

  const totalCost = AMENITIES.reduce((sum, a) => (selection[a.id] || 0) * a.costPerUnit + sum, 0);
  const totalEnergy = AMENITIES.reduce((sum, a) => (selection[a.id] || 0) * a.energyPerUnit + sum, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">🛠️ Amenities</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {AMENITIES.map((a) => (
          <motion.div
            key={a.id}
            className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <label className="block font-medium mb-1 text-gray-700">{a.name}</label>
            <input
              type="number"
              min={0}
              className="w-[85%] border border-gray-300 p-2 rounded-md"
              value={selection[a.id] || ''}
              onChange={(e) => handleChange(a.id, parseInt(e.target.value) || 0)}
            />
            <p className="text-sm mt-2 text-gray-500">
              ${a.costPerUnit} • {a.energyPerUnit} kWh
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-sm text-indigo-900 border-t pt-4">
        <p><strong>Total Amenity Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Amenity Energy:</strong> {totalEnergy} kWh</p>
      </div>
    </div>
  );
}
