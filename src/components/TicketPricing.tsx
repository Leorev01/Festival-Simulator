import { useState } from 'react';

interface TicketCategory {
  name: string;
  price: number;
  percentage: number; // Percentage of attendees in this category
}

export default function TicketPricing({ onUpdate }: { onUpdate: (categories: TicketCategory[]) => void }) {
  const [categories, setCategories] = useState<TicketCategory[]>([
    { name: 'General Admission', price: 50, percentage: 70 },
    { name: 'VIP', price: 150, percentage: 20 },
    { name: 'Early Bird', price: 30, percentage: 10 },
  ]);

  const handleCategoryChange = (index: number, field: keyof TicketCategory, value: number | string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setCategories(updatedCategories);
    onUpdate(updatedCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: 'New Category', price: 0, percentage: 0 }]);
  };

  const removeCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    onUpdate(updatedCategories);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h3 className="text-xl font-bold text-indigo-700">🎟️ Ticket Pricing</h3>
      <p className="text-sm text-gray-600">
        Configure ticket categories, prices, and the percentage of attendees for each category.
      </p>

      {categories.map((category, index) => (
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

      <button
        onClick={addCategory}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Add Category
      </button>
    </div>
  );
}