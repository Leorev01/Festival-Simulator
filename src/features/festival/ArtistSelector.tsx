import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ARTISTS } from './artists';
import type { Artist } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function ArtistSelector() {
  const [selected, setSelected] = useState<Artist[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('selected-artists');
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('selected-artists', JSON.stringify(selected));
  }, [selected]);

  const toggleArtist = (artist: Artist) => {
    setSelected((prev) =>
      prev.some((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  };

  const totalCost = selected.reduce((sum, a) => sum + a.cost, 0);
  const totalEnergy = selected.reduce((sum, a) => sum + a.energy, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          🎤 Artists Lineup
        </h2>
        <span className="text-sm text-gray-400">Click to select/deselect</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {ARTISTS.map((artist) => {
          const isSelected = selected.some((a) => a.id === artist.id);
          return (
            <motion.div
              key={artist.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleArtist(artist)}
              className={`relative cursor-pointer transition duration-300 rounded-2xl p-5 shadow-sm hover:shadow-md ${
                isSelected ? 'bg-gradient-to-br from-indigo-100 to-indigo-50' : 'bg-gray-50'
              }`}
            >
              {isSelected && (
                <CheckCircle2
                  className="absolute top-3 right-3 text-indigo-600"
                  size={20}
                />
              )}
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Energy Use: <strong>{artist.energy} kWh</strong>
                </p>
              </div>
              <div className="mt-3 text-right text-indigo-600 font-semibold text-sm">
                ${artist.cost.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.div
          className="mt-8 bg-indigo-50 rounded-xl p-4 shadow-inner space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-indigo-800">✅ Selected Artists</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {selected.map((artist) => (
              <li
                key={artist.id}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow-sm"
              >
                <span>{artist.name}</span>
                <span className="text-xs text-gray-500">${artist.cost}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-sm text-indigo-900 pt-2 border-t border-indigo-200 mt-4">
            <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
            <p><strong>Total Energy:</strong> {totalEnergy} kWh</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
