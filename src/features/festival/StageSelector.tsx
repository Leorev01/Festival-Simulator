import { useEffect, useState } from 'react';
import { STAGES } from './stages';
import type { Stage } from './types';

export default function StageSelector() {
  const [selected, setSelected] = useState<Stage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('selected-stages');
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('selected-stages', JSON.stringify(selected));
  }, [selected]);

  const toggleStage = (stage: Stage) => {
    setSelected((prev) =>
      prev.find((s) => s.id === stage.id)
        ? prev.filter((s) => s.id !== stage.id)
        : [...prev, stage]
    );
  };

  const totalCost = selected.reduce((sum, s) => sum + s.cost, 0);
  const totalEnergy = selected.reduce((sum, s) => sum + s.energy, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Stages</h2>
      <ul className="space-y-2">
        {STAGES.map((stage) => (
          <li
            key={stage.id}
            className={`p-3 border rounded cursor-pointer ${
              selected.find((s) => s.id === stage.id)
                ? 'bg-green-100 border-green-500'
                : 'bg-white'
            }`}
            onClick={() => toggleStage(stage)}
          >
            <div className="flex justify-between items-center">
              <span>{stage.name} ({stage.capacity} capacity)</span>
              <span className="text-sm text-gray-600">
                ${stage.cost.toLocaleString()} | {stage.energy} kWh
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Total Stage Cost:</strong> ${totalCost.toLocaleString()}</p>
        <p><strong>Total Stage Energy Use:</strong> {totalEnergy} kWh</p>
      </div>
    </div>
  );
}
