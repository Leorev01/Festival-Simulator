/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface RealTimeSimulatorProps {
  duration: number; // Duration of the festival in hours
  onUpdate: (metrics: any) => void; // Callback to update metrics
  weather: 'Sunny' | 'Rainy' | 'Windy'; // Current weather
  weatherModifiers: {
    attendanceMultiplier: number;
    energyMultiplier: number;
  }; // Weather modifiers
  onWeatherHistoryUpdate: (isRunning: boolean, weather: string) => void; // Callback to update weather history
  onReset: () => void; // Callback to reset weather history
  ticketCategories: { name: string; price: number; percentage: number }[]; // Ticket categories
}

export default function RealTimeSimulator({
  duration,
  onUpdate,
  weather,
  weatherModifiers,
  onWeatherHistoryUpdate,
  onReset,
  ticketCategories,
}: RealTimeSimulatorProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastWeather, setLastWeather] = useState<string | null>(null); // Track the last recorded weather

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const nextTime = prev + 1;
          if (nextTime > duration) {
            setIsRunning(false);
            clearInterval(interval!);
            return prev;
          }
          return nextTime;
        });
      }, 1000); // Simulate 1 hour per second
    }

    return () => clearInterval(interval!);
  }, [isRunning, duration]);

  useEffect(() => {
    // Update metrics based on the current time, weather, and ticket categories
    const metrics = calculateMetrics(time, duration, weatherModifiers, ticketCategories);
    onUpdate(metrics);
  }, [time, duration, weatherModifiers, ticketCategories, onUpdate]);

  useEffect(() => {
    // Add to weather history only if the weather changes and the simulator is running
    if (isRunning && weather !== lastWeather) {
      onWeatherHistoryUpdate(isRunning, weather);
      setLastWeather(weather); // Update the last recorded weather
    }
  }, [isRunning, weather, lastWeather, onWeatherHistoryUpdate]);

  const calculateMetrics = (
    currentTime: number,
    totalDuration: number,
    modifiers: { attendanceMultiplier: number; energyMultiplier: number },
    ticketCategories: { name: string; price: number; percentage: number }[]
  ) => {
    // Simulate attendance growth
    const baseAttendance = Math.min(500000, Math.floor((currentTime / totalDuration) * 1000000));
    const adjustedAttendance = Math.floor(baseAttendance * modifiers.attendanceMultiplier); // Adjust based on weather

    // Calculate revenue based on ticket categories
    const revenue = ticketCategories.reduce((sum, category) => {
      const attendees = (adjustedAttendance * category.percentage) / 100; // Calculate attendees for this category
      return sum + attendees * category.price; // Add revenue for this category
    }, 0);

    // Calculate energy usage
    const energyUsage = adjustedAttendance * 0.1 * modifiers.energyMultiplier; // Adjust energy usage based on weather

    return { attendance: adjustedAttendance, revenue, energyUsage };
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLastWeather(null); // Reset the last recorded weather
    onReset(); // Notify parent component to reset weather history
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-indigo-700">🎡 Real-Time Simulation</h3>
      <p className="text-sm text-gray-600">Time: {time} / {duration} hours</p>
      <p className="text-sm text-gray-600">Current Weather: {weather}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ▶ Play
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ⏸ Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}