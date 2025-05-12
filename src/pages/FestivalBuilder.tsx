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

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Builder':
        return (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">🎤 Artist Selection</h2>
              <p className="text-sm text-gray-500 mb-4">Choose performers for your festival.</p>
              <ArtistSelector />
            </section>
            <section>
              <h2 className="text-2xl font-bold text-green-700 mb-2">🏟️ Stage Selection</h2>
              <p className="text-sm text-gray-500 mb-4">Select stages based on audience capacity and cost.</p>
              <StageSelector />
            </section>
            <section>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">🛠️ Amenities</h2>
              <p className="text-sm text-gray-500 mb-4">Set how many toilets, food vendors, and staff members you need.</p>
              <AmenitySelector />
            </section>
          </div>
        );
      case 'Simulation':
        return <SimulationPanel />;
      case 'Summary':
        return (
          <div className="space-y-6">
            <SummaryPanel />
            <section>
              <h2 className="text-2xl font-bold text-indigo-700">💾 Save or Export</h2>
              <p className="text-sm text-gray-500 mb-4">Save your setup for later or export it as JSON.</p>
              <FestivalSaver />
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800">🎪 Festival Builder</h1>

      <div className="flex gap-3 mb-10">
        {tabs.map((tab) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={tab}
            className={`px-5 py-2 text-sm font-medium rounded-full transition ${
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

      <div className="flex-grow max-w-screen-xl mx-auto w-full">
        {renderTab()}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between items-center max-w-screen-xl mx-auto w-full">
        {activeTab !== 'Builder' && (
          <button
            onClick={goToPreviousTab}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>
        )}
        {activeTab !== 'Summary' && (
          <button
            onClick={goToNextTab}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition ml-auto"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
