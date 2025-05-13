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
  const [weatherHistory, setWeatherHistory] = useState<string[]>([]); // Track weather history
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

  // Simulate random weather changes
  useEffect(() => {
    const weatherOptions: ('Sunny' | 'Rainy' | 'Windy')[] = ['Sunny', 'Rainy', 'Windy'];
    const interval = setInterval(() => {
      const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setWeather(randomWeather);
    }, 10000); // Change weather every 10 seconds (for simulation purposes)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

  // Recalculate revenue whenever ticket categories or attendance changes
  useEffect(() => {
    calculateRevenue();
  }, [ticketCategories, metrics.attendance]);

  // Retrieve amenities data from localStorage
  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const totalEnergy = metrics.energyUsage;

  // Handle weather history updates
  const handleWeatherHistoryUpdate = (isRunning: boolean) => {
    if (isRunning) {
      setWeatherHistory((prev) => [...prev, weather]);
    }
  };

  // Handle weather history reset
  const handleWeatherHistoryReset = () => {
    setWeatherHistory([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">📈 Festival Simulation</h2>

      {/* Weather Section */}
      <div className="bg-gray-100 p-4 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-700">🌤 Current Weather</h3>
        <p className="text-lg font-semibold text-gray-800">{weather}</p>
        <p className="text-sm text-gray-500">
          Weather dynamically affects attendance, energy usage, and revenue.
        </p>
      </div>

      {/* Weather Impact Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-700">🌦️ Weather Impact Summary</h3>
        <p className="text-sm text-gray-600">
          The current weather is affecting the following metrics:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>
            <strong>Attendance Multiplier:</strong> {weatherModifiers[weather].attendanceMultiplier}
          </li>
          <li>
            <strong>Energy Usage Multiplier:</strong> {weatherModifiers[weather].energyMultiplier}
          </li>
        </ul>
      </div>

      {/* Weather History Section */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-700">📜 Weather History</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {weatherHistory.map((w, index) => (
            <li key={index}>
              {index + 1}. {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Real-Time Simulation Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">⏱️ Real-Time Simulation</h3>
        <RealTimeSimulator
          duration={24}
          weather={weather}
          weatherModifiers={weatherModifiers[weather]}
          onUpdate={(updatedMetrics) => setMetrics(updatedMetrics)}
          onWeatherHistoryUpdate={handleWeatherHistoryUpdate}
          onReset={handleWeatherHistoryReset}
        />
      </div>

      {/* Metrics Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">📊 Metrics Overview</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">👥 Attendance</h4>
            <p className="text-2xl font-semibold text-gray-800">
              {metrics.attendance.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">💰 Total Revenue</h4>
            <p className="text-2xl font-semibold text-gray-800">
              ${metrics.revenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">⚡ Energy Usage</h4>
            <p className="text-2xl font-semibold text-gray-800">
              {metrics.energyUsage.toFixed(2)} kWh
            </p>
          </div>
        </div>
      </div>

      {/* Crowd Health Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">✅ Crowd Health Score</h3>
        <CrowdHealthScore
          attendance={metrics.attendance}
          toilets={toilets}
          foodVendors={food}
          staff={staff}
        />
      </div>

      {/* Revenue Trend Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">📈 Revenue Trend</h3>
        <RevenueTrendChart weather={weather} amenities={amenities} />
      </div>

      {/* Environmental Impact Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">🌍 Environmental Impact</h3>
        <EnvironmentalImpactScore totalEnergy={totalEnergy} />
      </div>
    </div>
  );
}