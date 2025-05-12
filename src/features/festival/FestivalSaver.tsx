/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { saveFestival, getSavedFestivals } from '../../utils/saveUtils';

export default function FestivalSaver() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(getSavedFestivals());

  const handleSave = () => {
    if (name.trim()) {
      saveFestival(name.trim());
      setSaved(getSavedFestivals());
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

  const loadFestival = (festival: any) => {
    localStorage.setItem('selected-artists', JSON.stringify(festival.artists));
    localStorage.setItem('selected-stages', JSON.stringify(festival.stages));
    localStorage.setItem('selected-amenities', JSON.stringify(festival.amenities));
    window.location.reload();
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
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
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
    </div>
  );
}
