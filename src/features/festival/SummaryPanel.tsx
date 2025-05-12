import { useEffect, useState } from 'react';
import type { Artist, Stage } from './types';
import { AMENITIES } from './amenities';

export default function SummaryPanel() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [amenities, setAmenities] = useState<Record<number, number>>({});

  useEffect(() => {
    setArtists(JSON.parse(localStorage.getItem('selected-artists') || '[]'));
    setStages(JSON.parse(localStorage.getItem('selected-stages') || '[]'));
    setAmenities(JSON.parse(localStorage.getItem('selected-amenities') || '{}'));
  }, []);

  const artistCost = artists.reduce((sum, a) => sum + a.cost, 0);
  const artistEnergy = artists.reduce((sum, a) => sum + a.energy, 0);
  const stageCost = stages.reduce((sum, s) => sum + s.cost, 0);
  const stageEnergy = stages.reduce((sum, s) => sum + s.energy, 0);
  const amenityCost = AMENITIES.reduce((sum, a) => sum + (amenities[a.id] || 0) * a.costPerUnit, 0);
  const amenityEnergy = AMENITIES.reduce((sum, a) => sum + (amenities[a.id] || 0) * a.energyPerUnit, 0);

  const totalCost = artistCost + stageCost + amenityCost;
  const totalEnergy = artistEnergy + stageEnergy + amenityEnergy;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-indigo-700">📊 Festival Summary</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Counts */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl space-y-2">
          <h3 className="text-md font-semibold text-indigo-800">🔢 Selections</h3>
          <p className="text-sm text-gray-700">🎤 Artists Selected: <strong>{artists.length}</strong></p>
          <p className="text-sm text-gray-700">🏟️ Stages Selected: <strong>{stages.length}</strong></p>
          <p className="text-sm text-gray-700">🛠️ Amenities Set: <strong>{Object.values(amenities).reduce((a, b) => a + b, 0)}</strong></p>
        </div>

        {/* Totals */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl space-y-2">
          <h3 className="text-md font-semibold text-green-800">💰 Totals</h3>
          <p className="text-sm text-gray-700">💸 Total Cost: <strong>${totalCost.toLocaleString()}</strong></p>
          <p className="text-sm text-gray-700">⚡ Total Energy Use: <strong>{totalEnergy} kWh</strong></p>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center pt-2">Values calculated from your saved selections in localStorage.</p>
    </div>
  );
}
