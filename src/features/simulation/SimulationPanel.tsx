import { useEffect, useState, useMemo } from 'react';
import { useFestival } from '../../context/FestivalContext';
import RevenueTrendChart from '../../components/RevenueTrendCharts';
import CrowdHealthScore from '../../components/CrowdHealthScore';
import RealTimeSimulator from './RealTimeSimulator';

export default function SimulationPanel() {
  const [weather, setWeather] = useState<'Sunny' | 'Rainy' | 'Windy'>('Sunny');
  const [weatherHistory, setWeatherHistory] = useState<string[]>([]);
  const { attendance, amenities, ticketCategories, realTimeMetrics, setRealTimeMetrics } = useFestival();

  // Memoize weather modifiers to avoid re-creation on every render
  const weatherModifiers = useMemo(
    () => ({
      Sunny: { attendanceMultiplier: 1.0, energyMultiplier: 1.0 },
      Rainy: { attendanceMultiplier: 0.8, energyMultiplier: 1.3 },
      Windy: { attendanceMultiplier: 0.9, energyMultiplier: 1.1 },
    }),
    []
  );

  // Simulate random weather changes
  useEffect(() => {
    const weatherOptions: ('Sunny' | 'Rainy' | 'Windy')[] = ['Sunny', 'Rainy', 'Windy'];
    const interval = setInterval(() => {
      const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setWeather(randomWeather);
    }, 10000); // Change weather every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

  // Reset real-time metrics when the simulator is reset
  const handleSimulatorReset = () => {
    setRealTimeMetrics({
      attendance: 0,
      ticketRevenue: 0,
      vendorRevenue: 0,
      totalRevenue: 0,
      energyUsage: 0,
    });
    handleWeatherHistoryReset();
  };

  // Calculate estimated revenue based on ticket categories and expected attendance
  const calculateEstimatedRevenue = () => {
    return ticketCategories.reduce((sum, category) => {
      const attendees = (attendance * category.percentage) / 100;
      return sum + attendees * category.price;
    }, 0);
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
          ticketCategories={ticketCategories}
          onWeatherHistoryUpdate={handleWeatherHistoryUpdate}
          onReset={handleSimulatorReset}
        />
      </div>

      {/* Metrics Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">📊 Metrics Overview</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">👥 Attendance</h4>
            <p className="text-2xl font-semibold text-gray-800">
              {realTimeMetrics.attendance.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">💰 Total Revenue</h4>
            <p className="text-2xl font-semibold text-gray-800">
              ${realTimeMetrics.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-700">⚡ Energy Usage</h4>
            <p className="text-2xl font-semibold text-gray-800">
              {realTimeMetrics.energyUsage.toFixed(2)} kWh
            </p>
          </div>
        </div>
      </div>

      {/* Crowd Health Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">✅ Crowd Health Score</h3>
        <CrowdHealthScore
          attendance={realTimeMetrics.attendance}
          toilets={amenities[1] || 0}
          foodVendors={amenities[2] || 0}
          staff={amenities[3] || 0}
        />
      </div>

      {/* Revenue Trend Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-700">📈 Revenue Trend</h3>
        <RevenueTrendChart
          weather={weather}
          amenities={{
            toilets: amenities[1] || 0,
            foodVendors: amenities[2] || 0,
            staff: amenities[3] || 0,
          }}
          ticketRevenue={realTimeMetrics.ticketRevenue}
        />
      </div>

      {/* Expected Revenue Section */}
      <div className="bg-gray-50 p-4 rounded-lg border mt-6">
        <h3 className="text-xl font-bold text-gray-700">💵 Expected Revenue</h3>
        <p className="text-sm text-gray-600">
          Based on your ticket categories and expected attendance, the expected revenue is:
        </p>
        <p className="text-2xl font-semibold text-green-700 mt-2">
          ${calculateEstimatedRevenue().toLocaleString()}
        </p>
      </div>
    </div>
  );
}