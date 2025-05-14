import React, { createContext, useState, useContext } from 'react';

interface Metrics {
  attendance: number;
  revenue: number;
  energyUsage: number;
  ticketRevenue: number;
  vendorRevenue: number;
  totalRevenue: number;
}

interface MetricsContextProps {
  metrics: Metrics;
  setMetrics: React.Dispatch<React.SetStateAction<Metrics>>;
}

const MetricsContext = createContext<MetricsContextProps | undefined>(undefined);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metrics>({
    attendance: 0,
    revenue: 0,
    energyUsage: 0,
    ticketRevenue: 0,
    vendorRevenue: 0,
    totalRevenue: 0,
  });

  return (
    <MetricsContext.Provider value={{ metrics, setMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = (): MetricsContextProps => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};