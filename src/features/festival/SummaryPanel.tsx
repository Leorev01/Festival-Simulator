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
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-2">📊 Festival Summary</h2>
      <div className="space-y-1 text-sm text-gray-700">
        <p><strong>Artists Selected:</strong> {artists.length}</p>
        <p><strong>Stages Selected:</strong> {stages.length}</p>
        <p><strong>Amenities Set:</strong> {Object.keys(amenities).length}</p>
        <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Energy Use:</strong> {totalEnergy} kWh</p>
      </div>
      <p className="text-xs text-gray-400 pt-2">These values are calculated live based on saved selections.</p>
    </div>
  );
}
