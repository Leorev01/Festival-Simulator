import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        🎪 Festival Designer
      </h1>

      <div className="flex gap-3 mb-8">
        {tabs.map((tab) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={tab}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}
