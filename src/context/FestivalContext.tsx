/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TicketCategory {
  name: string;
  price: number;
  percentage: number;
}

interface RealTimeMetrics {
  attendance: number;
  ticketRevenue: number;
  vendorRevenue: number;
  totalRevenue: number;
  energyUsage: number;
}

interface FestivalContextType {
  artists: any[];
  stages: any[];
  amenities: Record<number, number>;
  events: string[];
  attendance: number;
  ticketCategories: TicketCategory[];
  realTimeMetrics: RealTimeMetrics;
  setArtists: React.Dispatch<React.SetStateAction<any[]>>;
  setStages: React.Dispatch<React.SetStateAction<any[]>>;
  setAmenities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setEvents: React.Dispatch<React.SetStateAction<string[]>>;
  setAttendance: React.Dispatch<React.SetStateAction<number>>;
  setTicketCategories: React.Dispatch<React.SetStateAction<TicketCategory[]>>;
  setRealTimeMetrics: React.Dispatch<React.SetStateAction<RealTimeMetrics>>;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export const FestivalProvider = ({ children }: { children: React.ReactNode }) => {
  const [artists, setArtists] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<Record<number, number>>({});
  const [events, setEvents] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<number>(500000); // Default attendance
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>([
    { name: 'General Admission', price: 50, percentage: 70 },
    { name: 'VIP', price: 150, percentage: 20 },
    { name: 'Early Bird', price: 30, percentage: 10 },
  ]);

  // Separate state for real-time simulation metrics
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    attendance: 0,
    ticketRevenue: 0,
    vendorRevenue: 0,
    totalRevenue: 0,
    energyUsage: 0,
  });

  // Load from localStorage on first mount
  useEffect(() => {
    setArtists(JSON.parse(localStorage.getItem('selected-artists') || '[]'));
    setStages(JSON.parse(localStorage.getItem('selected-stages') || '[]'));
    setAmenities(JSON.parse(localStorage.getItem('selected-amenities') || '{}'));
    setEvents(JSON.parse(localStorage.getItem('saved-events') || '[]'));
    setAttendance(JSON.parse(localStorage.getItem('attendance') || '500000'));
    setTicketCategories(
      JSON.parse(localStorage.getItem('ticket-categories') || '[]') || [
        { name: 'General Admission', price: 50, percentage: 70 },
        { name: 'VIP', price: 150, percentage: 20 },
        { name: 'Early Bird', price: 30, percentage: 10 },
      ]
    );
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('selected-artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('selected-stages', JSON.stringify(stages));
  }, [stages]);

  useEffect(() => {
    localStorage.setItem('selected-amenities', JSON.stringify(amenities));
  }, [amenities]);

  useEffect(() => {
    localStorage.setItem('saved-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('ticket-categories', JSON.stringify(ticketCategories));
  }, [ticketCategories]);

  return (
    <FestivalContext.Provider
      value={{
        artists,
        stages,
        amenities,
        events,
        attendance,
        ticketCategories,
        realTimeMetrics,
        setArtists,
        setStages,
        setAmenities,
        setEvents,
        setAttendance,
        setTicketCategories,
        setRealTimeMetrics,
      }}
    >
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
};