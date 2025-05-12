import { useEffect, useState } from 'react';
import type { Artist, Stage } from './types';

export default function SummaryPanel() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);

  useEffect(() => {
    const savedArtists = localStorage.getItem('selected-artists');
    const savedStages = localStorage.getItem('selected-stages');

    if (savedArtists) setArtists(JSON.parse(savedArtists));
    if (savedStages) setStages(JSON.parse(savedStages));
  }, []);

  const artistCost = artists.reduce((sum, a) => sum + a.cost, 0);
  const artistEnergy = artists.reduce((sum, a) => sum + a.energy, 0);

  const stageCost = stages.reduce((sum, s) => sum + s.cost, 0);
  const stageEnergy = stages.reduce((sum, s) => sum + s.energy, 0);

  const totalCost = artistCost + stageCost;
  const totalEnergy = artistEnergy + stageEnergy;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm">
      <h2 className="text-lg font-bold mb-2">Festival Summary</h2>

      <div className="text-sm space-y-1">
        <p><strong>Selected Artists:</strong> {artists.length}</p>
        <p><strong>Selected Stages:</strong> {stages.length}</p>
        <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Energy:</strong> {totalEnergy} kWh</p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        * This summary updates when the page reloads (reads from localStorage).
      </div>
    </div>
  );
}
