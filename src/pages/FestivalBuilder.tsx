import { useState } from 'react';
import ArtistSelector from '../features/festival/ArtistSelector';
import StageSelector from '../features/festival/StageSelector';
import AmenitySelector from '../features/festival/AmenitySelector';
import SimulationPanel from '../features/simulation/SimulationPanel';
import SummaryPanel from '../features/festival/SummaryPanel';
import FestivalSaver from '../features/festival/FestivalSaver';

const tabs = ['Builder', 'Simulation', 'Summary'];

export default function FestivalBuilder() {
  const [activeTab, setActiveTab] = useState('Builder');

  const renderTab = () => {
    switch (activeTab) {
      case 'Builder':
        return (
          <div className="space-y-8">
            <ArtistSelector />
            <StageSelector />
            <AmenitySelector />
          </div>
        );
      case 'Simulation':
        return <SimulationPanel />;
      case 'Summary':
        return (
          <div className="space-y-6">
            <SummaryPanel />
            <FestivalSaver />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎪 Festival Designer</h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}
