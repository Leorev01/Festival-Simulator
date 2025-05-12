import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueTrendChartProps {
  weather: 'Sunny' | 'Rainy' | 'Windy';
  amenities: Record<number, number>;
}

const attendanceByDay = [50000, 60000, 40000];
const ticketPrice = 100;
const vendorBaseRevenue = 500;

const weatherModifiers = {
  Sunny: { vendorMultiplier: 1.0 },
  Rainy: { vendorMultiplier: 0.7 },
  Windy: { vendorMultiplier: 0.5 },
};

export default function RevenueTrendChart({ weather, amenities }: RevenueTrendChartProps) {
  const foodVendors = amenities[2] || 0;
  const vendorMultiplier = weatherModifiers[weather].vendorMultiplier;

  const data = attendanceByDay.map((attendance, i) => {
    const ticketRevenue = attendance * ticketPrice;
    const vendorRevenue = foodVendors * vendorBaseRevenue * vendorMultiplier;
    return {
      day: `Day ${i + 1}`,
      ticketRevenue,
      vendorRevenue,
      total: ticketRevenue + vendorRevenue,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-10">
      <h3 className="text-xl font-bold text-indigo-700 mb-4">📈 Revenue Trend (3 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ticketRevenue" stroke="#4ade80" name="Ticket Revenue" />
          <Line type="monotone" dataKey="vendorRevenue" stroke="#facc15" name="Vendor Revenue" />
          <Line type="monotone" dataKey="total" stroke="#60a5fa" strokeWidth={2} name="Total Revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
