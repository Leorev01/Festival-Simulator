import { useState } from 'react';
import { AMENITIES } from './amenities';
import type { Festival } from './types';

export default function FestivalComparison() {
  const [leftKey, setLeftKey] = useState<string>('');
  const [rightKey, setRightKey] = useState<string>('');
  const [setups] = useState<Festival[]>(() => {
    const data = localStorage.getItem('saved-festivals');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  });

  const loadSetup = (index: number): Festival | null => {
    if (index < 0 || index >= setups.length) return null;
    return setups[index];
  };

  const setup1 = leftKey ? loadSetup(parseInt(leftKey)) : null;
  const setup2 = rightKey ? loadSetup(parseInt(rightKey)) : null;

  const calculateMetrics = (setup: Festival | null) => {
    if (!setup) return { cost: 0, energy: 0, artists: 0, stages: 0, amenities: 0 };

    const artistCost = setup.artists.reduce((sum, a) => sum + a.cost, 0);
    const artistEnergy = setup.artists.reduce((sum, a) => sum + a.energy, 0);

    const stageCost = setup.stages.reduce((sum, s) => sum + s.cost, 0);
    const stageEnergy = setup.stages.reduce((sum, s) => sum + s.energy, 0);

    const amenityCost = AMENITIES.reduce((sum, a) => sum + (setup.amenities[a.id] || 0) * a.costPerUnit, 0);
    const amenityEnergy = AMENITIES.reduce((sum, a) => sum + (setup.amenities[a.id] || 0) * a.energyPerUnit, 0);

    const totalCost = artistCost + stageCost + amenityCost;
    const totalEnergy = artistEnergy + stageEnergy + amenityEnergy;

    return {
      cost: totalCost,
      energy: totalEnergy,
      artists: setup.artists.length,
      stages: setup.stages.length,
      amenities: Object.values(setup.amenities).reduce((a, b) => a + b, 0),
    };
  };

  const metrics1 = calculateMetrics(setup1);
  const metrics2 = calculateMetrics(setup2);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">📊 Compare Festival Setups</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Select Setup 1</label>
          <select
            className="w-full p-2 mt-1 border rounded"
            value={leftKey}
            onChange={(e) => setLeftKey(e.target.value)}
          >
            <option value="">-- Select --</option>
            {setups.map((festival, index) => (
              <option key={index} value={index}>
                {festival.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Select Setup 2</label>
          <select
            className="w-full p-2 mt-1 border rounded"
            value={rightKey}
            onChange={(e) => setRightKey(e.target.value)}
          >
            <option value="">-- Select --</option>
            {setups.map((festival, index) => (
              <option key={index} value={index}>
                {festival.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(setup1 && setup2) && (
        <div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[metrics1, metrics2].map((m, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg border shadow">
                <h4 className="font-bold text-lg text-indigo-600 mb-2">Setup {i + 1}</h4>
                <p className="text-sm">🎤 Artists: <strong>{m.artists}</strong></p>
                <p className="text-sm">🏟️ Stages: <strong>{m.stages}</strong></p>
                <p className="text-sm">🛠️ Amenities: <strong>{m.amenities}</strong></p>
                <p className="text-sm">💸 Cost: <strong>${m.cost.toLocaleString()}</strong></p>
                <p className="text-sm">⚡ Energy: <strong>{m.energy} kWh</strong></p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-bold text-indigo-700">Comparison Summary</h3>
            <p className="text-sm">
              {metrics1.cost < metrics2.cost ? 'Setup 1 is more cost-effective.' : 'Setup 2 is more cost-effective.'}
            </p>
            <p className="text-sm">
              {metrics1.energy < metrics2.energy ? 'Setup 1 is more energy-efficient.' : 'Setup 2 is more energy-efficient.'}
            </p>
          </div>
        </div>
      )}

      {(!setup1 || !setup2) && (
        <p className="text-sm text-gray-500 pt-2">Please select two setups to compare.</p>
      )}
    </div>
  );
}