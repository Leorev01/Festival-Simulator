/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface RealTimeSimulatorProps {
  duration: number; // Duration of the festival in hours
  onUpdate: (metrics: any) => void; // Callback to update metrics
}

export default function RealTimeSimulator({ duration, onUpdate }: RealTimeSimulatorProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    // Update metrics based on the current time
    const metrics = calculateMetrics(time, duration);
    onUpdate(metrics);
  }, [time, duration, onUpdate]);

  const calculateMetrics = (currentTime: number, totalDuration: number) => {
    // Example logic for dynamic metrics
    const attendance = Math.min(5000, Math.floor((currentTime / totalDuration) * 10000)); // Simulate attendance growth
    const revenue = attendance * 50; // Assume $50 per attendee
    const energyUsage = attendance * 0.1; // Assume 0.1 kWh per attendee
    return { attendance, revenue, energyUsage };
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-indigo-700">🎡 Real-Time Simulation</h3>
      <p className="text-sm text-gray-600">Time: {time} / {duration} hours</p>
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
          onClick={() => setTime(0)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}