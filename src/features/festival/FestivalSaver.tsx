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
    window.location.reload(); // reload app to reflect changes
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-bold">💾 Save, Load & Export Festival</h2>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Festival Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Setup
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Saved Festivals</h3>
        <ul className="text-sm space-y-1">
          {saved.map((f: any, i: number) => (
            <li key={i} className="flex justify-between items-center border p-2 rounded">
              <span>{f.name}</span>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => exportToFile(f)}
                >
                  Export
                </button>
                <button
                  className="text-purple-600 underline"
                  onClick={() => loadFestival(f)}
                >
                  Load
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
