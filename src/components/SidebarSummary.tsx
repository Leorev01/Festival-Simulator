import { useEffect, useState } from 'react';
import { useFestival } from '../context/FestivalContext';
import { AMENITIES } from '../features/festival/amenities';

export default function SidebarSummary() {
  const { artists, stages, amenities, attendance } = useFestival();
  const [weather, setWeather] = useState<string>('Sunny'); // Current weather

  // Fetch current weather from localStorage and auto-refresh every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(localStorage.getItem('current-weather') || 'Sunny');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Calculate costs
  const artistCost = artists.reduce((sum, artist) => sum + artist.cost, 0);
  const stageCost = stages.reduce((sum, stage) => sum + stage.cost, 0);
  const amenityCost = AMENITIES.reduce(
    (sum, amenity) => (amenities[amenity.id] || 0) * amenity.costPerUnit + sum,
    0
  );

  // Calculate energy usage
  const artistEnergy = artists.reduce((sum, artist) => sum + artist.energy, 0);
  const stageEnergy = stages.reduce((sum, stage) => sum + stage.energy, 0);
  const amenityEnergy = AMENITIES.reduce(
    (sum, amenity) => (amenities[amenity.id] || 0) * amenity.energyPerUnit + sum,
    0
  );

  const totalCost = artistCost + stageCost + amenityCost;
  const totalEnergy = artistEnergy + stageEnergy + amenityEnergy;

  // Calculate Popularity Score
  const calculatePopularityScore = () => {
    const artistPopularity = artists.length * 10; // Each artist adds 10 points
    const stagePopularity = stages.reduce((sum, stage) => sum + stage.capacity / 1000, 0); // Larger stages add more points
    const amenityPopularity = Object.values(amenities).reduce(
      (sum, count) => sum + count * 5,
      0
    ); // Each amenity adds 5 points per unit
    return Math.min(100, Math.round(artistPopularity + stagePopularity + amenityPopularity)); // Cap at 100
  };

  const popularityScore = calculatePopularityScore();

  // Calculate Recommended Resources
  const calculateRecommendedResources = () => ({
    toilets: Math.ceil(attendance / 75), // 1 toilet per 75 attendees
    foodVendors: Math.ceil(attendance / 250), // 1 food vendor per 250 attendees
    staff: Math.ceil(attendance / 100), // 1 staff member per 100 attendees
    speakers: Math.ceil(attendance / 500), // 1 speaker per 500 attendees
    parking: Math.ceil(attendance / 300), // 1 parking spot per 300 attendees
    security: Math.ceil(attendance / 200), // 1 security staff per 200 attendees
  });

  const recommendedResources = calculateRecommendedResources();

  // Compare Current and Recommended Resources
  const resourceInsights = AMENITIES.map((amenity) => {
    const current = amenities[amenity.id] || 0;
    const recommended =
      amenity.name === 'Toilets'
        ? recommendedResources.toilets
        : amenity.name === 'Food Vendors'
        ? recommendedResources.foodVendors
        : amenity.name === 'Staff Members'
        ? recommendedResources.staff
        : amenity.name === 'Speakers'
        ? recommendedResources.speakers
        : amenity.name === 'Parking'
        ? recommendedResources.parking
        : amenity.name === 'Security'
        ? recommendedResources.security
        : 0;

    return {
      name: amenity.name,
      current,
      recommended,
      status: current < recommended ? 'shortage' : current > recommended ? 'excess' : 'optimal',
    };
  });

  return (
    <aside className="bg-white shadow-md p-4 rounded-lg border border-gray-100 w-full md:w-72 sticky top-6 md:self-start">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">📋 Festival Summary</h3>
      <ul className="text-sm text-gray-700 space-y-2">
        {/* General Counts */}
        <li>🎤 <strong>Artists:</strong> {artists.length}</li>
        <li>🏟️ <strong>Stages:</strong> {stages.length}</li>
        <li>🛠️ <strong>Amenities:</strong> {Object.values(amenities).reduce((a, b) => a + b, 0)}</li>

        {/* Financials */}
        <li className="pt-2 border-t border-gray-200">💰 <strong>Total Cost:</strong> ${totalCost.toLocaleString()}</li>
        <li>⚡ <strong>Total Energy:</strong> {totalEnergy.toFixed(2)} kWh</li>

        {/* Popularity Score */}
        <li className="pt-2 border-t border-gray-200">🌟 <strong>Popularity Score:</strong> {popularityScore} / 100</li>

        {/* Weather Impact */}
        <li className="pt-2 border-t border-gray-200">🌤 <strong>Current Weather:</strong> {weather}</li>

        {/* Resource Optimization */}
        <li className="pt-2 border-t border-gray-200">
          🛠️ <strong>Resource Optimization:</strong>
          <ul className="mt-2 space-y-1">
            {resourceInsights.map((insight, index) => (
              <li key={index} className="flex justify-between">
                <span>{insight.name}:</span>
                <span
                  className={`font-medium ${
                    insight.status === 'shortage'
                      ? 'text-red-600'
                      : insight.status === 'excess'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {insight.current} / {insight.recommended} ({insight.status})
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}