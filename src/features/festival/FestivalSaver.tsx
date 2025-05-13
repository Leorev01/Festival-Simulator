/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { saveFestival, getSavedFestivals } from '../../utils/saveUtils';
import type {Festival} from './types';
export default function FestivalSaver() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(getSavedFestivals());
  const [currentFestival, setCurrentFestival] = useState<Festival | null>(null);

  const handleSave = () => {
    if (name.trim()) {
      const artists = JSON.parse(localStorage.getItem('selected-artists') || '[]');
      const stages = JSON.parse(localStorage.getItem('selected-stages') || '[]');
      const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
      const events = JSON.parse(localStorage.getItem('saved-events') || '[]');

      const newFestival = {
        name: name.trim(),
        artists,
        stages,
        amenities,
        events,
      };

      const updated = [...saved, newFestival];
      localStorage.setItem('saved-festivals', JSON.stringify(updated));
      setSaved(updated);
      setName('');
    }
  };

  const handleDelete = (index: number) => {
    const updated = saved.filter((_: any, i: number) => i !== index);
    setSaved(updated);
    localStorage.setItem('saved-festivals', JSON.stringify(updated));
  };

  const exportToFile = (festival: any) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(festival, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${festival.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

const loadFestival = (festival: Festival) => {
  const defaultFestival = {
    name: '',
    artists: [],
    stages: [],
    amenities: {},
    events: [],
  };

  const loadedFestival = { ...defaultFestival, ...festival };

  localStorage.setItem('selected-artists', JSON.stringify(loadedFestival.artists));
  localStorage.setItem('selected-stages', JSON.stringify(loadedFestival.stages));
  localStorage.setItem('selected-amenities', JSON.stringify(loadedFestival.amenities));
  localStorage.setItem('saved-events', JSON.stringify(loadedFestival.events));

  setCurrentFestival(loadedFestival);
};

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-indigo-700">💾 Save, Load & Export</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Festival Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <ul className="divide-y text-sm border-t pt-3">
        {saved.map((f: any, i: number) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <span>{f.name}</span>
            <div className="flex gap-3 text-xs">
              <button className="text-blue-600 hover:underline" onClick={() => exportToFile(f)}>Export</button>
              <button className="text-green-600 hover:underline" onClick={() => loadFestival(f)}>Load</button>
              <button className="text-red-600 hover:underline" onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {currentFestival && (
        <div className="bg-gray-100 p-4 rounded-lg shadow mt-4">
          <h3 className="text-lg font-bold text-indigo-700">🎪 Loaded Festival: {currentFestival.name}</h3>
          <p className="text-sm text-gray-600">Artists: {currentFestival.artists?.length || 0}</p>
          <p className="text-sm text-gray-600">Stages: {currentFestival.stages?.length || 0}</p>
          <p className="text-sm text-gray-600">
            Amenities: {Object.values(currentFestival.amenities || {}).reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-sm text-gray-600">Events: {currentFestival.events?.length || 0}</p>
        </div>
      )}
    </div>
  );
}
