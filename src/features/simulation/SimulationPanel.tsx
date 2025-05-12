import { useState } from 'react';

export default function SimulationPanel() {
  const [attendance, setAttendance] = useState(50000); // default attendees
  const ticketPrice = 100;

  // Requirements
  const toiletsNeeded = Math.ceil(attendance / 75);
  const staffNeeded = Math.ceil(attendance / 100);
  const foodVendorsNeeded = Math.ceil(attendance / 250);

  // Load actual amenities
  const amenityData = JSON.parse(localStorage.getItem('selected-amenities') || '{}');
  const toilets = amenityData[1] || 0;
  const food = amenityData[2] || 0;
  const staff = amenityData[3] || 0;

  const ticketRevenue = attendance * ticketPrice;
  const vendorRevenue = food * 500; // assume each vendor sells $500 worth
  const totalRevenue = ticketRevenue + vendorRevenue;

  const overloads = [];
  if (toilets < toiletsNeeded) overloads.push('🚽 Not enough toilets');
  if (food < foodVendorsNeeded) overloads.push('🍔 Too few food vendors');
  if (staff < staffNeeded) overloads.push('👷 Understaffed');

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">🎯 Festival Simulation</h2>

      <div className="space-y-2">
        <label className="block font-semibold">Expected Attendance</label>
        <input
          type="number"
          className="border p-2 rounded w-full max-w-xs"
          value={attendance}
          onChange={(e) => setAttendance(parseInt(e.target.value))}
        />
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Required Toilets:</strong> {toiletsNeeded} (You have {toilets})</p>
        <p><strong>Required Food Vendors:</strong> {foodVendorsNeeded} (You have {food})</p>
        <p><strong>Required Staff:</strong> {staffNeeded} (You have {staff})</p>
      </div>

      <div className="text-sm mt-4">
        <p><strong>💵 Revenue from Tickets:</strong> ${ticketRevenue.toLocaleString()}</p>
        <p><strong>🍟 Food Vendor Revenue:</strong> ${vendorRevenue.toLocaleString()}</p>
        <p><strong>🎉 Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
      </div>

      {overloads.length > 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-700">
          <strong>⚠️ Warnings:</strong>
          <ul className="list-disc ml-5">
            {overloads.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
