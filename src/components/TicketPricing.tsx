import { useState } from 'react';
import { useFestival } from '../context/FestivalContext';

interface TicketCategory {
  name: string;
  price: number;
  percentage: number; // Percentage of attendees in this category
}
export default function TicketPricing() {
  const { ticketCategories, setTicketCategories } = useFestival();
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (index: number, field: keyof TicketCategory, value: number | string) => {
    const updatedCategories = [...ticketCategories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setTicketCategories(updatedCategories);

    // Validate total percentage
    const totalPercentage = updatedCategories.reduce((sum, category) => sum + category.percentage, 0);
    if (totalPercentage > 100) {
      setError('The total percentage of attendees cannot exceed 100%.');
    } else {
      setError(null);
    }
  };

  const addCategory = () => {
    setTicketCategories([...ticketCategories, { name: 'New Category', price: 0, percentage: 0 }]);
  };

  const removeCategory = (index: number) => {
    const updatedCategories = ticketCategories.filter((_, i) => i !== index);
    setTicketCategories(updatedCategories);

    // Validate total percentage after removal
    const totalPercentage = updatedCategories.reduce((sum, category) => sum + category.percentage, 0);
    if (totalPercentage > 100) {
      setError('The total percentage of attendees cannot exceed 100%.');
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h3 className="text-xl font-bold text-indigo-700">🎟️ Ticket Pricing</h3>
      <p className="text-sm text-gray-600">
        Configure ticket categories, prices, and the percentage of attendees for each category.
      </p>

      {ticketCategories.map((category, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-center border-b pb-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g., General Admission"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              value={category.price}
              onChange={(e) => handleCategoryChange(index, 'price', parseFloat(e.target.value))}
              className="border p-2 rounded w-full"
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">% of Attendees</label>
            <input
              type="number"
              value={category.percentage}
              onChange={(e) => handleCategoryChange(index, 'percentage', parseFloat(e.target.value))}
              className="border p-2 rounded w-full"
              placeholder="e.g., 70"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => removeCategory(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={addCategory}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Add Category
      </button>
    </div>
  );
}