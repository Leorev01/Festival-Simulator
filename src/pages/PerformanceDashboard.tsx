import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EnvironmentalImpactScore from '../components/EnvironmentalImpactScore';
import CrowdHealthScore from '../components/CrowdHealthScore';

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState({
    attendance: 0,
    ticketRevenue: 0,
    vendorRevenue: 0,
    totalRevenue: 0,
    energyUsage: 0,
  });
  const [amenities, setAmenities] = useState<Record<number, number>>({});
  const [attendance, setAttendance] = useState(5000);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch metrics and amenities from localStorage
    const storedMetrics = JSON.parse(localStorage.getItem('real-time-metrics') || '{}');
    const storedAmenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
    setMetrics({
      attendance: storedMetrics.attendance || 0,
      ticketRevenue: storedMetrics.ticketRevenue || 0,
      vendorRevenue: storedMetrics.vendorRevenue || 0,
      totalRevenue: storedMetrics.totalRevenue || 0,
      energyUsage: storedMetrics.energyUsage || 0,
    });
    setAmenities(storedAmenities);
    setAttendance(Number(localStorage.getItem('expected-attendance')) || 5000);
  }, []);

  const calculateResourceRequirements = () => ({
    toilets: Math.ceil(attendance / 75),
    foodVendors: Math.ceil(attendance / 250),
    staff: Math.ceil(attendance / 100),
  });

  const resourceRequirements = calculateResourceRequirements();

  const chartData = [
    { name: 'Ticket Revenue', value: metrics.ticketRevenue },
    { name: 'Vendor Revenue', value: metrics.vendorRevenue },
    { name: 'Total Revenue', value: metrics.totalRevenue },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer" onClick={() => navigate('/dashboard')}>🎪 Festival Builder</h1>
      <h2 className="text-3xl font-bold text-indigo-700">📊 Festival Performance Dashboard</h2>

      {/* Revenue Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">💰 Revenue Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4ade80" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Resource Utilization */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700">🛠️ Resource Utilization</h2>
        <ul className="space-y-2">
          {['Toilets', 'Food Vendors', 'Staff'].map((resource, index) => {
            const current = amenities[index + 1] || 0;
            const required =
              resource === 'Toilets'
                ? resourceRequirements.toilets
                : resource === 'Food Vendors'
                ? resourceRequirements.foodVendors
                : resourceRequirements.staff;

            return (
              <li key={resource} className="flex justify-between">
                <span>{resource}:</span>
                <span
                  className={`font-medium ${
                    current < required ? 'text-red-600' : current > required ? 'text-yellow-600' : 'text-green-600'
                  }`}
                >
                  {current} / {required} ({current < required ? 'Shortage' : current > required ? 'Excess' : 'Optimal'})
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Environmental Impact */}
      <EnvironmentalImpactScore totalEnergy={metrics.energyUsage} />

      {/* Crowd Health Index */}
      <CrowdHealthScore
        attendance={metrics.attendance}
        toilets={amenities[1] || 0}
        foodVendors={amenities[2] || 0}
        staff={amenities[3] || 0}
      />
    </div>
  );
}