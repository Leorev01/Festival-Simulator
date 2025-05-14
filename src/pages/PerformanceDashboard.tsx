import { useFestival } from '../context/FestivalContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CrowdHealthScore from '../components/CrowdHealthScore';
import EnvironmentalImpactScore from '../components/EnvironmentalImpactScore';

interface TicketCategory {
  percentage: number;
  price: number;
}

export default function PerformanceDashboard() {
  const { amenities, attendance, ticketCategories } = useFestival();
  const navigate = useNavigate();

  // Attendance and amenities
  const foodVendors = amenities[2] || 0;
  const parkingSpots = amenities[5] || 0; // New
  const securityStaff = amenities[6] || 0; // New

  // Ticket Revenue Calculation
  const ticketRevenue = ticketCategories.reduce((sum: number, category: TicketCategory): number => {
    const attendees = (attendance * category.percentage) / 100;
    return sum + attendees * category.price;
  }, 0);

  // Vendor Revenue Calculation
  const vendorBaseRevenue = 500; // Base revenue per vendor per day
  const vendorRevenue = foodVendors * vendorBaseRevenue;

  // Parking Revenue Calculation
  const parkingBaseRevenue = 200; // Base revenue per parking spot per day
  const parkingRevenue = parkingSpots * parkingBaseRevenue;

  // Security Revenue Calculation
  const securityBaseRevenue = 100; // Base revenue per security staff per day
  const securityRevenue = securityStaff * securityBaseRevenue;

  // Total Revenue Calculation
  const totalRevenue = ticketRevenue + vendorRevenue + parkingRevenue + securityRevenue;

  // Energy Usage Calculation
  const totalEnergy = amenities[3] * 500; // Example: Energy usage per staff

  // Chart Data
  const chartData = [
    { name: 'Ticket Revenue', value: ticketRevenue },
    { name: 'Vendor Revenue', value: vendorRevenue },
    { name: 'Parking Revenue', value: parkingRevenue }, // New
    { name: 'Security Revenue', value: securityRevenue }, // New
    { name: 'Total Revenue', value: totalRevenue },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1
        className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        🎪 Festival Builder
      </h1>
      <h2 className="text-3xl font-bold text-indigo-700">📊 Festival Performance Dashboard</h2>

      {/* Back Button */}
      <button
        onClick={() => navigate('/builder')}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition w-fit"
      >
        ← Back to Festival Builder
      </button>

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
      <EnvironmentalImpactScore totalEnergy={totalEnergy} />

      {/* Crowd Health */}
      <CrowdHealthScore />
    </div>
  );
}