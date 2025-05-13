/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import RevenueTrendChart from '../../components/RevenueTrendCharts';
import CrowdHealthScore from '../../components/CrowdHealthScore';
import EnvironmentalImpactScore from '../../components/EnvironmentalImpactScore';
import RealTimeSimulator from './RealTimeSimulator';
export default function SimulationPanel() {
  const [weather, setWeather] = useState<'Sunny' | 'Rainy' | 'Windy'>('Sunny');
  const [metrics, setMetrics] = useState({
    attendance: 0,
    revenue: 0,
    energyUsage: 0,
  });

  const handleUpdate = (updatedMetrics: any) => {
    setMetrics(updatedMetrics);
  };

  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const totalEnergy = metrics.energyUsage;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">📈 Festival Simulation</h2>

      {/* Weather Selector */}
      <div>
        <label className="text-sm font-medium text-gray-700">Weather Condition</label>
        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value as any)}
          className="block w-full mt-1 p-2 border rounded"
        >
          <option>Sunny</option>
          <option>Rainy</option>
          <option>Windy</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Weather affects vendor revenue and staff requirements.
        </p>
      </div>

      {/* Real-Time Simulator */}
      <RealTimeSimulator duration={24} onUpdate={handleUpdate} />

      {/* Metrics Display */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-bold text-gray-700">👥 Attendance</h4>
          <p className="text-2xl font-semibold text-gray-800">{metrics.attendance.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-bold text-gray-700">💰 Revenue</h4>
          <p className="text-2xl font-semibold text-gray-800">${metrics.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-bold text-gray-700">⚡ Energy Usage</h4>
          <p className="text-2xl font-semibold text-gray-800">{metrics.energyUsage.toFixed(2)} kWh</p>
        </div>
      </div>

      {/* ✅ Crowd Health Score */}
      <CrowdHealthScore
        attendance={metrics.attendance}
        toilets={toilets}
        foodVendors={food}
        staff={staff}
      />

      {/* Revenue Trend Chart */}
      <RevenueTrendChart weather={weather} amenities={amenities} />

      {/* Environmental Impact */}
      <EnvironmentalImpactScore totalEnergy={totalEnergy} />
    </div>
  );
}