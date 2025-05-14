import { useEffect, useState, useMemo } from 'react';
import RevenueTrendChart from '../../components/RevenueTrendCharts';
import CrowdHealthScore from '../../components/CrowdHealthScore';
import RealTimeSimulator from './RealTimeSimulator';

interface SimulationPanelProps {
  ticketCategories: { name: string; price: number; percentage: number }[];
}

export default function SimulationPanel({ ticketCategories }: SimulationPanelProps) {
  const [weather, setWeather] = useState<'Sunny' | 'Rainy' | 'Windy'>('Sunny');
  const [weatherHistory, setWeatherHistory] = useState<string[]>([]);
  const [metrics, setMetrics] = useState({
    attendance: 0,
    revenue: 0,
    energyUsage: 0,
    ticketRevenue: 0,
    vendorRevenue: 0,
    totalRevenue: 0,
  });

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

  useEffect(() => {
  const updatedAttendance = calculateAttendance();
  const updatedEnergyUsage = calculateEnergyUsage();
  const updatedTicketRevenue = calculateTicketRevenue(updatedAttendance);
  const updatedVendorRevenue = calculateVendorRevenue(updatedAttendance);
  const updatedTotalRevenue = updatedTicketRevenue + updatedVendorRevenue;

  // Only update metrics if values have changed
  setMetrics((prevMetrics) => {
    const newMetrics = {
      attendance: updatedAttendance,
      revenue: updatedTotalRevenue,
      energyUsage: updatedEnergyUsage,
      ticketRevenue: updatedTicketRevenue,
      vendorRevenue: updatedVendorRevenue,
      totalRevenue: updatedTotalRevenue,
    };

    // Compare new metrics with previous metrics to avoid unnecessary updates
    if (JSON.stringify(prevMetrics) !== JSON.stringify(newMetrics)) {
      console.log('Metrics updated:', newMetrics);
      return newMetrics;
    }
    return prevMetrics;
  });
}, [weather]); // Only depend on `weather`

// Save metrics to localStorage when they change
useEffect(() => {
  if (metrics.attendance > 0 || metrics.revenue > 0) {
    console.log('Saving metrics to localStorage:', metrics); // Debugging log
    localStorage.setItem('real-time-metrics', JSON.stringify(metrics));
  }
}, [metrics]); // This is fine because it only saves to localStorage

// Debugging logs for weather and metrics
useEffect(() => {
  console.log('Weather changed:', weather);
  console.log('Metrics updated:', metrics);
}, [weather]); // Removed `metrics` from here to avoid unnecessary triggers

  // Calculate attendance based on weather
  const calculateAttendance = () => {
    const baseAttendance = 10000; // Example base attendance
    const attendanceMultiplier = weatherModifiers[weather]?.attendanceMultiplier || 1.0;
    return baseAttendance * attendanceMultiplier;
  };

  // Calculate energy usage based on weather
  const calculateEnergyUsage = () => {
    const baseEnergy = 500; // Example base energy usage
    const energyMultiplier = weatherModifiers[weather]?.energyMultiplier || 1.0;
    return baseEnergy * energyMultiplier;
  };

  // Calculate ticket revenue based on attendance
  const calculateTicketRevenue = (attendance: number) => {
    return ticketCategories.reduce((sum, category) => {
      const attendees = (attendance * category.percentage) / 100;
      return sum + attendees * category.price;
    }, 0);
  };

  // Calculate vendor revenue based on attendance
  const calculateVendorRevenue = (attendance: number) => {
    const foodVendors = amenities.foodVendors || 0; // Use real value from amenities
    const vendorRevenuePerAttendee = 5; // Example revenue per attendee
    return foodVendors * vendorRevenuePerAttendee * attendance;
  };

  // Calculate estimated revenue based on ticket categories and expected attendance
  const calculateEstimatedRevenue = () => {
    const expectedAttendance = 500000; // Default expected attendance
    return ticketCategories.reduce((sum, category) => {
      const attendees = (expectedAttendance * category.percentage) / 100;
      return sum + attendees * category.price;
    }, 0);
  };

  // Retrieve amenities data from localStorage
  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

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
          ticketCategories={ticketCategories}
          onUpdate={(updatedMetrics) => {
            setMetrics((prevMetrics) => {
              // Only update metrics if values have changed
              if (JSON.stringify(prevMetrics) !== JSON.stringify(updatedMetrics)) {
                console.log('Metrics updated from RealTimeSimulator:', updatedMetrics);
                return updatedMetrics;
              }
              return prevMetrics;
            });
          }}
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
        <RevenueTrendChart weather={weather} amenities={{ toilets, foodVendors: food, staff }} />
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