import { useState, useEffect } from 'react';
import { useFestival } from '../../context/FestivalContext';

interface RealTimeSimulatorProps {
  duration: number; // Duration of the festival in hours
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
  weather,
  weatherModifiers,
  onWeatherHistoryUpdate,
  onReset,
  ticketCategories,
}: RealTimeSimulatorProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastWeather, setLastWeather] = useState<string | null>(null); // Track the last recorded weather

  // Use the FestivalContext for real-time metrics and attendance
  const { attendance, setRealTimeMetrics } = useFestival();

  // Simulate time progression
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

  // Update real-time metrics when time changes
  useEffect(() => {
    if (isRunning) {
      const metrics = calculateMetrics(time, duration, weatherModifiers, ticketCategories);
      console.log('RealTimeSimulator: Metrics updated:', metrics);

      // Update the real-time metrics in the context
      setRealTimeMetrics((prevMetrics) => ({
        ...prevMetrics,
        ...metrics,
      }));
    }
  }, [time, isRunning, duration, weatherModifiers, ticketCategories, setRealTimeMetrics]);

  // Update weather history when weather changes
  useEffect(() => {
    if (isRunning && weather !== lastWeather) {
      onWeatherHistoryUpdate(isRunning, weather);
      setLastWeather(weather); // Update the last recorded weather
    }
  }, [isRunning, weather, lastWeather, onWeatherHistoryUpdate]);

  // Calculate metrics based on time, weather, and ticket categories
  const calculateMetrics = (
    currentTime: number,
    totalDuration: number,
    modifiers: { attendanceMultiplier: number; energyMultiplier: number },
    ticketCategories: { name: string; price: number; percentage: number }[]
  ) => {
    // Simulate attendance growth based on the expected attendance
    const baseAttendance = Math.min(
      attendance,
      Math.floor((currentTime / totalDuration) * attendance * 2)
    ); // Simulate up to double the expected attendance over time
    const adjustedAttendance = Math.floor(baseAttendance * modifiers.attendanceMultiplier); // Adjust based on weather

    // Calculate revenue based on ticket categories
    const ticketRevenue = ticketCategories.reduce((sum, category) => {
      const attendees = (adjustedAttendance * category.percentage) / 100; // Calculate attendees for this category
      return sum + attendees * category.price; // Add revenue for this category
    }, 0);

    // Calculate energy usage
    const energyUsage = adjustedAttendance * 0.1 * modifiers.energyMultiplier; // Adjust energy usage based on weather

    // Calculate vendor revenue (optional, if needed)
    const vendorRevenue = adjustedAttendance * 5; // Example: $5 per attendee

    // Calculate total revenue
    const totalRevenue = ticketRevenue + vendorRevenue;

    return { attendance: adjustedAttendance, ticketRevenue, vendorRevenue, totalRevenue, energyUsage };
  };

  // Handle reset
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLastWeather(null); // Reset the last recorded weather
    onReset(); // Notify parent component to reset weather history

    // Reset real-time metrics in the context
    setRealTimeMetrics({
      attendance: 0,
      ticketRevenue: 0,
      vendorRevenue: 0,
      totalRevenue: 0,
      energyUsage: 0,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-indigo-700">🎡 Real-Time Simulation</h3>
      <p className="text-sm text-gray-600">
        Time: {time} / {duration} hours
      </p>
      <p className="text-sm text-gray-600">Current Weather: {weather}</p>
      <p className="text-sm text-gray-600">
        Simulation based on an expected attendance of <strong>{attendance.toLocaleString()}</strong> people.
      </p>
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