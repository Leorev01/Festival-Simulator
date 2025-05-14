import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueTrendChartProps {
  weather: 'Sunny' | 'Rainy' | 'Windy';
  amenities: {
    toilets: number;
    foodVendors: number;
    staff: number;
    speakers: number; // New
    parking: number; // New
    security: number; // New
  };
  ticketRevenue: number; // Pre-calculated ticket revenue value
}

const vendorBaseRevenue = 500; // Base revenue per vendor per day
const parkingBaseRevenue = 200; // Base revenue per parking spot per day
const securityBaseRevenue = 100; // Base revenue per security staff per day

const weatherModifiers = {
  Sunny: { vendorMultiplier: 1.0 },
  Rainy: { vendorMultiplier: 0.7 },
  Windy: { vendorMultiplier: 0.5 },
};

export default function RevenueTrendChart({ weather, amenities, ticketRevenue }: RevenueTrendChartProps) {
  const foodVendors = amenities.foodVendors || 0;
  const parkingSpots = amenities.parking || 0; // New
  const securityStaff = amenities.security || 0; // New
  const vendorMultiplier = weatherModifiers[weather]?.vendorMultiplier || 1.0;

  // Generate revenue data for 3 days using the provided ticketRevenue
  const data = Array.from({ length: 3 }, (_, i) => {
    const vendorRevenue = foodVendors * vendorBaseRevenue * vendorMultiplier;
    const parkingRevenue = parkingSpots * parkingBaseRevenue; // New
    const securityRevenue = securityStaff * securityBaseRevenue; // New
    const totalRevenue = (ticketRevenue || 0) + vendorRevenue + parkingRevenue + securityRevenue;

    return {
      day: `Day ${i + 1}`,
      ticketRevenue: ticketRevenue || 0, // Default to 0 if undefined
      vendorRevenue: vendorRevenue || 0, // Default to 0 if undefined
      parkingRevenue: parkingRevenue || 0, // New
      securityRevenue: securityRevenue || 0, // New
      total: totalRevenue || 0, // Default to 0 if undefined
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ticketRevenue" stroke="#4ade80" name="Ticket Revenue" />
        <Line type="monotone" dataKey="vendorRevenue" stroke="#facc15" name="Vendor Revenue" />
        <Line type="monotone" dataKey="parkingRevenue" stroke="#34d399" name="Parking Revenue" /> {/* New */}
        <Line type="monotone" dataKey="securityRevenue" stroke="#818cf8" name="Security Revenue" /> {/* New */}
        <Line type="monotone" dataKey="total" stroke="#60a5fa" strokeWidth={2} name="Total Revenue" />
      </LineChart>
    </ResponsiveContainer>
  );
}