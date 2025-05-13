/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import RevenueTrendChart from '../../components/RevenueTrendCharts';
import CrowdHealthScore from '../../components/CrowdHealthScore';
import EnvironmentalImpactScore from '../../components/EnvironmentalImpactScore';
import RealTimeSimulator from './RealTimeSimulator';

interface SimulationPanelProps {
  ticketCategories: { name: string; price: number; percentage: number }[];
}

export default function SimulationPanel({ ticketCategories }: SimulationPanelProps) {
  const [weather, setWeather] = useState<'Sunny' | 'Rainy' | 'Windy'>('Sunny');
  const [metrics, setMetrics] = useState({
    attendance: 0,
    revenue: 0,
    energyUsage: 0,
  });

  // Weather modifiers
  const weatherModifiers = {
    Sunny: { attendanceMultiplier: 1.0, energyMultiplier: 1.0 },
    Rainy: { attendanceMultiplier: 0.8, energyMultiplier: 1.3 },
    Windy: { attendanceMultiplier: 0.9, energyMultiplier: 1.1 },
  };

  // Calculate attendance based on weather
  const calculateAttendance = () => {
    const baseAttendance = 10000; // Example base attendance
    const attendanceMultiplier = weatherModifiers[weather].attendanceMultiplier;
    return baseAttendance * attendanceMultiplier;
  };

  // Calculate energy usage based on weather
  const calculateEnergyUsage = () => {
    const baseEnergy = 500; // Example base energy usage
    const energyMultiplier = weatherModifiers[weather].energyMultiplier;
    return baseEnergy * energyMultiplier;
  };

  // Calculate revenue based on ticket categories and attendance
  const calculateRevenue = () => {
    const totalRevenue = ticketCategories.reduce((sum, category) => {
      const attendees = (metrics.attendance * category.percentage) / 100;
      return sum + attendees * category.price;
    }, 0);
    setMetrics((prev) => ({ ...prev, revenue: totalRevenue }));
  };

  // Update metrics whenever weather changes
  useEffect(() => {
    const updatedAttendance = calculateAttendance();
    const updatedEnergyUsage = calculateEnergyUsage();
    setMetrics((prev) => ({
      ...prev,
      attendance: updatedAttendance,
      energyUsage: updatedEnergyUsage,
    }));
  }, [weather]);

  // Recalculate revenue whenever ticket categories or attendance changes
  useEffect(() => {
    calculateRevenue();
  }, [ticketCategories, metrics.attendance]);

  // Handle updates from the RealTimeSimulator
  const handleUpdate = (updatedMetrics: any) => {
    setMetrics(updatedMetrics);
  };

  // Retrieve amenities data from localStorage
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
          Weather affects attendance, energy usage, and vendor revenue.
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

      {/* Crowd Health Score */}
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