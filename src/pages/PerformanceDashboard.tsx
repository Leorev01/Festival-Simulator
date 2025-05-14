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
  const toilets = amenities[1] || 0;
  const foodVendors = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const ticketRevenue = ticketCategories.reduce((sum: number, category: TicketCategory): number => {
    const attendees = (attendance * category.percentage) / 100;
    return sum + attendees * category.price;
  }, 0);

  // Vendor Revenue Calculation
  const revenuePerAttendee = 5; // Example revenue per attendee
  const vendorRevenue = foodVendors * (attendance / foodVendors) * revenuePerAttendee;

  // Total Revenue
  const totalRevenue = ticketRevenue + vendorRevenue;

  // Energy Usage Calculation
  const totalEnergy = amenities[3] * 500; // Example: Energy usage per staff
  const energyUsagePerStaff = staff > 0 ? totalEnergy / staff : 0;

  const chartData = [
    { name: 'Ticket Revenue', value: ticketRevenue },
    { name: 'Vendor Revenue', value: vendorRevenue },
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
      <CrowdHealthScore
        attendance={attendance}
        toilets={toilets}
        foodVendors={foodVendors}
        staff={staff}
      />

      {/* Energy Usage Per Staff */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">⚡ Energy Usage Per Staff</h2>
        <p className="text-2xl font-semibold text-gray-800">
          {energyUsagePerStaff.toFixed(2)} kWh
        </p>
      </div>
    </div>
  );
}