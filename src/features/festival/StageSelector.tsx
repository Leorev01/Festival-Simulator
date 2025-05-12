import { motion } from 'framer-motion';
import { STAGES } from './stages';
import type { Stage } from './types';
import { CheckCircle2 } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

export default function StageSelector() {
  const { stages: selected, setStages: setSelected } = useFestival();

  const toggleStage = (stage: Stage) => {
    setSelected((prev: Stage[]) =>
      prev.find((s) => s.id === stage.id)
        ? prev.filter((s) => s.id !== stage.id)
        : [...prev, stage]
    );
  };

  const totalCost = selected.reduce((sum, s) => sum + s.cost, 0);
  const totalEnergy = selected.reduce((sum, s) => sum + s.energy, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">🏟️ Stage Selection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {STAGES.map((stage) => {
          const isSelected = selected.some((s) => s.id === stage.id);
          return (
            <motion.div
              key={stage.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleStage(stage)}
              className={`relative cursor-pointer transition duration-300 rounded-2xl p-5 shadow-sm hover:shadow-md ${
                isSelected ? 'bg-gradient-to-br from-green-100 to-green-50' : 'bg-gray-50'
              }`}
            >
              {isSelected && (
                <CheckCircle2
                  className="absolute top-3 right-3 text-green-600"
                  size={20}
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{stage.name}</h3>
              <p className="text-sm text-gray-500">
                Capacity: <strong>{stage.capacity.toLocaleString()}</strong>
              </p>
              <div className="mt-2 text-right text-green-700 font-medium text-sm">
                ${stage.cost.toLocaleString()} • {stage.energy} kWh
              </div>
            </motion.div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.div
          className="mt-8 bg-green-50 rounded-xl p-4 shadow-inner space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-green-800">✅ Selected Stages</h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {selected.map((stage) => (
              <li
                key={stage.id}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow-sm"
              >
                <span>{stage.name}</span>
                <span className="text-xs text-gray-500">${stage.cost}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-sm text-green-900 pt-2 border-t border-green-200 mt-4">
            <p><strong>Total Cost:</strong> ${totalCost.toLocaleString()}</p>
            <p><strong>Total Energy:</strong> {totalEnergy} kWh</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
