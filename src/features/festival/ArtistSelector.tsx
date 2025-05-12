import { useState, useEffect } from 'react';
import { ARTISTS } from './artists';
import type { Artist } from './types';

export default function ArtistSelector() {
  const [selected, setSelected] = useState<Artist[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selected-artists');
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('selected-artists', JSON.stringify(selected));
  }, [selected]);

  const toggleArtist = (artist: Artist) => {
    setSelected((prev) =>
      prev.find((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  };

  const totalCost = selected.reduce((sum, a) => sum + a.cost, 0);
  const totalEnergy = selected.reduce((sum, a) => sum + a.energy, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Artists</h2>
      <ul className="space-y-2">
        {ARTISTS.map((artist) => (
          <li
            key={artist.id}
            className={`p-3 border rounded cursor-pointer ${
              selected.find((a) => a.id === artist.id)
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white'
            }`}
            onClick={() => toggleArtist(artist)}
          >
            <div className="flex justify-between items-center">
              <span>{artist.name}</span>
              <span className="text-sm text-gray-600">
                ${artist.cost.toLocaleString()} | {artist.energy} kWh
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Energy Use:</strong> {totalEnergy} kWh</p>
      </div>
    </div>
  );
}
