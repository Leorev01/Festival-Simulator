import { useFestival } from '../context/FestivalContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PerformanceDashboard() {
  const { amenities } = useFestival();
  const navigate = useNavigate();

  // Example: Calculate metrics based on amenities
  const ticketRevenue = amenities[1] * 100; // Example calculation
  const vendorRevenue = amenities[2] * 50; // Example calculation
  const totalRevenue = ticketRevenue + vendorRevenue;

  const chartData = [
    { name: 'Ticket Revenue', value: ticketRevenue },
    { name: 'Vendor Revenue', value: vendorRevenue },
    { name: 'Total Revenue', value: totalRevenue },
  ];

  // Environmental Impact Calculation
  const energyUsage = amenities[3] * 500; // Example: Energy usage per staff
  const carbonFootprint = energyUsage * 0.5; // Example: Carbon footprint per kWh

  // Crowd Health Calculation
  const toilets = amenities[1] || 0;
  const foodVendors = amenities[2] || 0;
  const staff = amenities[3] || 0;
  const attendance = 10000; // Example attendance
  const crowdHealthScore = Math.min(
    100,
    Math.round((toilets * 10 + foodVendors * 5 + staff * 2) / (attendance / 100))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer" onClick={() => navigate('/dashboard')}>🎪 Festival Builder</h1>
      <h2 className="text-3xl font-bold text-indigo-700">📊 Festival Performance Dashboard</h2>

      {/* Revenue Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">💰 Revenue Breakdown</h2>
        {chartData.every((data) => data.value === 0) ? (
          <p className="text-sm text-gray-500 mt-4">
            No data available. Please configure the festival to generate metrics.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4ade80" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Environmental Impact */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">🌱 Environmental Impact</h2>
        <p className="text-sm text-gray-600">
          The festival's energy usage and carbon footprint are calculated based on the amenities and staff.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>
            <strong>Energy Usage:</strong> {energyUsage.toLocaleString()} kWh
          </li>
          <li>
            <strong>Carbon Footprint:</strong> {carbonFootprint.toFixed(2)} kg CO₂
          </li>
        </ul>
      </div>

      {/* Crowd Health */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">✅ Crowd Health</h2>
        <p className="text-sm text-gray-600">
          The crowd health score is based on the number of toilets, food vendors, and staff relative to attendance.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>
            <strong>Toilets:</strong> {toilets}
          </li>
          <li>
            <strong>Food Vendors:</strong> {foodVendors}
          </li>
          <li>
            <strong>Staff:</strong> {staff}
          </li>
          <li>
            <strong>Attendance:</strong> {attendance.toLocaleString()}
          </li>
          <li>
            <strong>Crowd Health Score:</strong> {crowdHealthScore} / 100
          </li>
        </ul>
      </div>
    </div>
  );
}