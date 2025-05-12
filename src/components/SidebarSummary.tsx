import { useEffect, useState } from 'react';
import type { Artist, Stage } from '../features/festival/types';
import { AMENITIES } from '../features/festival/amenities';

export default function SidebarSummary() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [amenities, setAmenities] = useState<Record<number, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setArtists(JSON.parse(localStorage.getItem('selected-artists') || '[]'));
      setStages(JSON.parse(localStorage.getItem('selected-stages') || '[]'));
      setAmenities(JSON.parse(localStorage.getItem('selected-amenities') || '{}'));
    }, 500); // auto-refresh every 0.5s
    return () => clearInterval(interval);
  }, []);

  const artistCost = artists.reduce((sum, a) => sum + a.cost, 0);
  const stageCost = stages.reduce((sum, s) => sum + s.cost, 0);
  const amenityCost = AMENITIES.reduce((sum, a) => (amenities[a.id] || 0) * a.costPerUnit + sum, 0);

  const artistEnergy = artists.reduce((sum, a) => sum + a.energy, 0);
  const stageEnergy = stages.reduce((sum, s) => sum + s.energy, 0);
  const amenityEnergy = AMENITIES.reduce((sum, a) => (amenities[a.id] || 0) * a.energyPerUnit + sum, 0);

  return (
    <aside className="bg-white shadow-md p-4 rounded-lg border border-gray-100 w-full md:w-72 sticky top-6 md:self-start">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">📋 Festival Summary</h3>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>🎤 <strong>Artists:</strong> {artists.length}</li>
        <li>🏟️ <strong>Stages:</strong> {stages.length}</li>
        <li>🛠️ <strong>Amenities:</strong> {Object.values(amenities).reduce((a, b) => a + b, 0)}</li>
        <li className="pt-2 border-t border-gray-200">💰 <strong>Total Cost:</strong> ${artistCost + stageCost + amenityCost}</li>
        <li>⚡ <strong>Total Energy:</strong> {artistEnergy + stageEnergy + amenityEnergy} kWh</li>
      </ul>
    </aside>
  );
}
