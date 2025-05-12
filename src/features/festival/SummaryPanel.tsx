import { useEffect, useState } from 'react';
import type { Artist, Stage } from './types';
import { AMENITIES } from './amenities';

export default function SummaryPanel() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [amenities, setAmenities] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedArtists = localStorage.getItem('selected-artists');
    const savedStages = localStorage.getItem('selected-stages');
    const savedAmenities = localStorage.getItem('selected-amenities');

    if (savedArtists) setArtists(JSON.parse(savedArtists));
    if (savedStages) setStages(JSON.parse(savedStages));
    if (savedAmenities) setAmenities(JSON.parse(savedAmenities));
  }, []);

  const artistCost = artists.reduce((sum, a) => sum + a.cost, 0);
  const artistEnergy = artists.reduce((sum, a) => sum + a.energy, 0);

  const stageCost = stages.reduce((sum, s) => sum + s.cost, 0);
  const stageEnergy = stages.reduce((sum, s) => sum + s.energy, 0);

  const amenityCost = AMENITIES.reduce((sum, a) => {
    const count = amenities[a.id] || 0;
    return sum + count * a.costPerUnit;
  }, 0);

  const amenityEnergy = AMENITIES.reduce((sum, a) => {
    const count = amenities[a.id] || 0;
    return sum + count * a.energyPerUnit;
  }, 0);

  const totalCost = artistCost + stageCost + amenityCost;
  const totalEnergy = artistEnergy + stageEnergy + amenityEnergy;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm">
      <h2 className="text-lg font-bold mb-2">Festival Summary</h2>

      <div className="text-sm space-y-1">
        <p><strong>Selected Artists:</strong> {artists.length}</p>
        <p><strong>Selected Stages:</strong> {stages.length}</p>
        <p><strong>Amenities:</strong> {Object.keys(amenities).length}</p>
        <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Energy:</strong> {totalEnergy} kWh</p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        * This summary updates on reload (reads from localStorage).
      </div>
    </div>
  );
}
