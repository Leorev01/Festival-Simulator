/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import ArtistSelector from '../features/festival/ArtistSelector';
import StageSelector from '../features/festival/StageSelector';
import AmenitySelector from '../features/festival/AmenitySelector';
import SimulationPanel from '../features/simulation/SimulationPanel';
import SummaryPanel from '../features/festival/SummaryPanel';
import FestivalSaver from '../features/festival/FestivalSaver';
import SidebarSummary from '../components/SidebarSummary';
import TicketPricing from '../components/TicketPricing';

const tabs = ['Builder', 'Simulation', 'Summary'];

export default function FestivalBuilder() {
  const [activeTab, setActiveTab] = useState('Builder');
  const navigate = useNavigate();

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
        <motion.div className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">🎪 Ticket Categories</h2>
                <p className="text-sm text-gray-500 mb-4">Set ticket prices and percentages for each category.</p>
                <TicketPricing />
              </section>
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
          <SidebarSummary />
        </motion.div>
      );

      case 'Simulation':
        return <SimulationPanel />;
     case 'Summary':
      return (
        <motion.div className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummaryPanel />
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/compare')}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
            >
              Compare Setups
            </button>
            <button
              onClick={() => navigate('/dashboard/performance')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              View Performance Dashboard
            </button>
          </div>
          <section>
            <h2 className="text-2xl font-bold text-indigo-700">💾 Save or Export</h2>
            <p className="text-sm text-gray-500 mb-4">Save your setup for later or export it as JSON.</p>
            <FestivalSaver />
          </section>
        </motion.div>
      );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer" onClick={() => navigate('/dashboard')}>🎪 Festival Builder</h1>

      <div className="flex gap-3 mb-10">
        {tabs.map((tab) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={tab}
            className={`px-5 py-2 text-sm font-medium rounded-md transition hover:cursor-pointer ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow hover:bg-indigo-800'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
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
