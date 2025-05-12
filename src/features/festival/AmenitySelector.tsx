import { useEffect, useState } from 'react';
import { AMENITIES } from './amenities';
//import type { Amenity } from './types';

interface Selection {
  [amenityId: number]: number; // unit count
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

  const totalCost = AMENITIES.reduce((sum, a) => {
    const count = selection[a.id] || 0;
    return sum + count * a.costPerUnit;
  }, 0);

  const totalEnergy = AMENITIES.reduce((sum, a) => {
    const count = selection[a.id] || 0;
    return sum + count * a.energyPerUnit;
  }, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Amenities</h2>
      <ul className="space-y-3">
        {AMENITIES.map((a) => (
          <li key={a.id} className="flex items-center gap-4">
            <label className="w-32">{a.name}</label>
            <input
              type="number"
              className="border rounded p-1 w-20"
              min={0}
              value={selection[a.id] || ''}
              onChange={(e) => handleChange(a.id, parseInt(e.target.value) || 0)}
            />
            <span className="text-sm text-gray-500">
              ${a.costPerUnit} each | {a.energyPerUnit} kWh
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Total Amenity Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Amenity Energy:</strong> {totalEnergy} kWh</p>
      </div>
    </div>
  );
}
