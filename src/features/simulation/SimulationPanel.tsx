import { useState } from 'react';
import RevenueTrendChart from '../../components/RevenueTrendCharts';

const weatherModifiers = {
  Sunny: { vendorMultiplier: 1.0, staffBoost: 1.0 },
  Rainy: { vendorMultiplier: 0.7, staffBoost: 1.2 },
  Windy: { vendorMultiplier: 0.5, staffBoost: 1.3 },
};

const dailyAttendance = [150000, 160000, 140000];

export default function SimulationPanel() {
  const [dayIndex, setDayIndex] = useState(0);
  const [weather, setWeather] = useState<'Sunny' | 'Rainy' | 'Windy'>('Sunny');
  const [events, setEvents] = useState<string[]>([]);

  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const attendance = dailyAttendance[dayIndex];
  const modifiers = weatherModifiers[weather];

  const toiletsNeeded = Math.ceil(attendance / 75);
  const baseStaffNeeded = Math.ceil((attendance / 100) * modifiers.staffBoost);
  const foodNeeded = Math.ceil(attendance / 250);

  // Adjusted calculations
  let adjustedStaffNeeded = baseStaffNeeded;
  let ticketRevenue = attendance * 100;
  let vendorRevenue = food * 500 * modifiers.vendorMultiplier;

  events.forEach((event) => {
    if (event.includes('No-Show')) ticketRevenue *= 0.8;
    if (event.includes('Power Outage')) ticketRevenue *= 0.9;
    if (event.includes('Rainstorm')) adjustedStaffNeeded *= 1.15;
    if (event.includes('Vendor Delay')) vendorRevenue *= 0.8;
  });

  const totalRevenue = ticketRevenue + vendorRevenue;

  const getStatus = (actual: number, required: number) => {
    const ratio = actual / required;
    if (ratio >= 1) return { label: '✅ Sufficient', color: 'text-green-700' };
    if (ratio >= 0.8) return { label: '⚠️ Slightly Under', color: 'text-yellow-600' };
    return { label: '❌ Critically Low', color: 'text-red-600' };
  };

  const resources = [
    { name: 'Toilets', actual: toilets, required: toiletsNeeded },
    { name: 'Food Vendors', actual: food, required: foodNeeded },
    { name: 'Staff Members', actual: staff, required: adjustedStaffNeeded },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">📈 Festival Simulation</h2>

      {/* Day Selector */}
      <div className="flex gap-3 mb-4">
        {[0, 1, 2].map((d) => (
          <button
            key={d}
            onClick={() => {
              setDayIndex(d);
              setEvents([]); // Clear events when switching days
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              dayIndex === d
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Day {d + 1}
          </button>
        ))}
      </div>

      {/* Weather Selector */}
      <div>
        <label className="text-sm font-medium text-gray-700">Weather Condition</label>
        <select
          value={weather}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setWeather(e.target.value as any)}
          className="block w-full mt-1 p-2 border rounded"
        >
          <option>Sunny</option>
          <option>Rainy</option>
          <option>Windy</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Weather affects vendor revenue and staff requirements.
        </p>
      </div>

      {/* Random Event Button */}
      <button
        onClick={() => {
          const options = [
            '🎤 Major Artist No-Show (−20% ticket revenue)',
            '⚡ Power Outage (−10% ticket revenue)',
            '🌧 Sudden Rainstorm (+15% staff needed)',
            '🚚 Vendor Delay (−20% vendor revenue)',
          ];
          const randomEvent = options[Math.floor(Math.random() * options.length)];
          setEvents((prev) => [...prev, randomEvent]);
        }}
        className="mt-4 px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 transition text-sm"
      >
        🔀 Simulate Random Event
      </button>

      {/* Resource Indicators */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {resources.map((r, i) => {
          const status = getStatus(r.actual, r.required);
          const percent = Math.min((r.actual / r.required) * 100, 100);
          return (
            <div key={i} className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-700">{r.name}</h4>
              <p className="text-sm text-gray-500 mb-2">
                Required: <strong>{Math.ceil(r.required)}</strong> • You have: <strong>{r.actual}</strong>
              </p>
              <div className="h-2 w-full bg-gray-200 rounded">
                <div className={`h-2 rounded ${status.color}`} style={{ width: `${percent}%` }} />
              </div>
              <p className={`text-xs mt-2 font-medium ${status.color}`}>{status.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-green-800 mb-1">🎟️ Ticket Revenue</h4>
          <p className="text-lg font-bold text-green-900">${ticketRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
          <h4 className="text-sm font-semibold text-yellow-800 mb-1">🍟 Vendor Revenue</h4>
          <p className="text-lg font-bold text-yellow-900">${vendorRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-1">💰 Total Revenue</h4>
          <p className="text-lg font-bold text-blue-900">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Event List with Remove Buttons */}
      {events.length > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded">
          <h4 className="text-md font-semibold text-red-700 mb-2">🛑 Event Impacts</h4>
          <ul className="space-y-2">
            {events.map((event, i) => (
              <li key={i} className="flex justify-between items-center text-sm text-red-800 bg-red-100 px-3 py-2 rounded">
                <span>{event}</span>
                <button
                  onClick={() =>
                    setEvents((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="ml-4 px-2 py-1 text-xs bg-white text-red-600 border border-red-300 rounded hover:bg-red-200 transition"
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Revenue Trend Chart */}
      <RevenueTrendChart weather={weather} amenities={amenities} />
    </div>
  );
}
