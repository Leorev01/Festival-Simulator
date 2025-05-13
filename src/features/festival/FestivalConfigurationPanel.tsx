/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import TicketPricing from '../../components/TicketPricing';

interface FestivalConfigPanelProps {
  onTicketCategoriesUpdate: (categories: { name: string; price: number; percentage: number }[]) => void;
}

export default function FestivalConfigPanel({ onTicketCategoriesUpdate }: FestivalConfigPanelProps) {
  const [ticketCategories, setTicketCategories] = useState([
    { name: 'General Admission', price: 50, percentage: 70 },
    { name: 'VIP', price: 150, percentage: 20 },
    { name: 'Early Bird', price: 30, percentage: 10 },
  ]);

  const handleTicketPricingUpdate = (categories: any) => {
    setTicketCategories(categories);
    onTicketCategoriesUpdate(categories);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">🎟️ Festival Configuration</h2>
      <p className="text-sm text-gray-600">
        Configure your festival's ticket pricing and attendee distribution.
      </p>

      {/* Ticket Pricing */}
      <TicketPricing onUpdate={handleTicketPricingUpdate} />
    </div>
  );
}