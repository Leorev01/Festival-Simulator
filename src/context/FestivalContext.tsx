/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FestivalContextType {
  artists: any[];
  stages: any[];
  amenities: Record<number, number>;
  events: string[];
  setArtists: React.Dispatch<React.SetStateAction<any[]>>;
  setStages: React.Dispatch<React.SetStateAction<any[]>>;
  setAmenities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setEvents: React.Dispatch<React.SetStateAction<string[]>>;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export const FestivalProvider = ({ children }: { children: React.ReactNode }) => {
  const [artists, setArtists] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<Record<number, number>>({});
  const [events, setEvents] = useState<string[]>([]);

  // Load from localStorage on first mount
  useEffect(() => {
    setArtists(JSON.parse(localStorage.getItem('selected-artists') || '[]'));
    setStages(JSON.parse(localStorage.getItem('selected-stages') || '[]'));
    setAmenities(JSON.parse(localStorage.getItem('selected-amenities') || '{}'));
    setEvents(JSON.parse(localStorage.getItem('saved-events') || '[]'));
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

  return (
    <FestivalContext.Provider
      value={{ artists, stages, amenities, events, setArtists, setStages, setAmenities, setEvents }}
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
