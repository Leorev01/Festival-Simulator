import { useState } from 'react';

export default function SimulationPanel() {
  const [attendance, setAttendance] = useState(500000);
  const ticketPrice = 100;

  const toiletsNeeded = Math.ceil(attendance / 75);
  const staffNeeded = Math.ceil(attendance / 100);
  const foodNeeded = Math.ceil(attendance / 250);

  const amenities = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenities[1] || 0;
  const food = amenities[2] || 0;
  const staff = amenities[3] || 0;

  const ticketRevenue = attendance * ticketPrice;
  const vendorRevenue = food * 500;
  const totalRevenue = ticketRevenue + vendorRevenue;

  const getStatus = (actual: number, required: number) => {
    const ratio = actual / required;
    if (ratio >= 1) return { label: '✅ Sufficient', color: 'text-green-700' };
    if (ratio >= 0.8) return { label: '⚠️ Slightly Under', color: 'text-yellow-600' };
    return { label: '❌ Critically Low', color: 'text-red-600' };
  };

  const resources = [
    {
      name: 'Toilets',
      actual: toilets,
      required: toiletsNeeded,
    },
    {
      name: 'Food Vendors',
      actual: food,
      required: foodNeeded,
    },
    {
      name: 'Staff Members',
      actual: staff,
      required: staffNeeded,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">📈 Simulation Results</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Attendance</label>
        <input
          type="number"
          className="border p-3 rounded w-full text-lg"
          value={attendance}
          onChange={(e) => setAttendance(parseInt(e.target.value))}
          placeholder="Enter number of attendees"
        />
        <p className="text-xs text-gray-400 mt-1">Used to calculate resource requirements and revenue.</p>
      </div>

      {/* Resource Requirements with Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {resources.map((r, i) => {
          const status = getStatus(r.actual, r.required);
          const percent = Math.min((r.actual / r.required) * 100, 100);

          return (
            <div key={i} className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="text-sm font-bold text-gray-700 mb-1">{r.name}</h4>
              <p className="text-sm text-gray-500 mb-2">
                Required: <strong>{r.required}</strong> • Provided: <strong>{r.actual}</strong>
              </p>
              <div className="h-2 w-full bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${status.color} bg-opacity-70`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className={`text-xs mt-2 font-medium ${status.color}`}>{status.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Summary */}
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
    </div>
  );
}
