import { useFestival } from "../context/FestivalContext";

const calculateScore = (
  toilets: number,
  requiredToilets: number,
  food: number,
  requiredFood: number,
  staff: number,
  requiredStaff: number,
  speakers: number,
  requiredSpeakers: number,
  parking: number,
  requiredParking: number,
  security: number,
  requiredSecurity: number
) => {
  // Check if each amenity meets or exceeds the required amount
  const meetsRequirements = [
    toilets >= requiredToilets,
    food >= requiredFood,
    staff >= requiredStaff,
    speakers >= requiredSpeakers,
    parking >= requiredParking,
    security >= requiredSecurity,
  ];

  // Calculate the percentage of amenities that meet the requirements
  const score = (meetsRequirements.filter(Boolean).length / meetsRequirements.length) * 100;

  return Math.round(score); // Return a fixed score between 0–100
};

const getColor = (score: number) => {
  if (score >= 85) return 'text-green-600';
  if (score >= 65) return 'text-yellow-600';
  return 'text-red-600';
};

const getLabel = (score: number) => {
  if (score >= 85) return 'Excellent 👏';
  if (score >= 65) return 'Fair 👍';
  return 'Poor ⚠️';
};

export default function CrowdHealthScore() {

  const {attendance, amenities} = useFestival();
  const toilets = amenities[1] || 0;
  const foodVendors = amenities[2] || 0;
  const staff = amenities[3] || 0;
  const speakers = amenities[4] || 0;
  const parking = amenities[5] || 0;
  const security = amenities[6] || 0;

  // Calculate the required amounts for each amenity
  const requiredToilets = Math.ceil(attendance / 75);
  const requiredFood = Math.ceil(attendance / 250);
  const requiredStaff = Math.ceil(attendance / 100);
  const requiredSpeakers = Math.ceil(attendance / 500);
  const requiredParking = Math.ceil(attendance / 300);
  const requiredSecurity = Math.ceil(attendance / 200);

  // Calculate the fixed score based on requirements
  const score = calculateScore(
    toilets,
    requiredToilets,
    foodVendors,
    requiredFood,
    staff,
    requiredStaff,
    speakers,
    requiredSpeakers,
    parking,
    requiredParking,
    security,
    requiredSecurity
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6 space-y-2">
      <h3 className="text-xl font-bold text-indigo-700">🧠 Crowd Health Index</h3>
      <p className={`text-4xl font-extrabold ${getColor(score)}`}>{score}/100</p>
      <p className="text-sm text-gray-500">{getLabel(score)} — Based on crowd-to-resource requirements</p>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm text-gray-600">
        <div>
          <strong>Toilets</strong>
          <p>
            {toilets} / {requiredToilets} req
          </p>
        </div>
        <div>
          <strong>Food</strong>
          <p>
            {foodVendors} / {requiredFood} req
          </p>
        </div>
        <div>
          <strong>Staff</strong>
          <p>
            {staff} / {requiredStaff} req
          </p>
        </div>
        <div>
          <strong>Speakers</strong>
          <p>
            {speakers} / {requiredSpeakers} req
          </p>
        </div>
        <div>
          <strong>Parking</strong>
          <p>
            {parking} / {requiredParking} req
          </p>
        </div>
        <div>
          <strong>Security</strong>
          <p>
            {security} / {requiredSecurity} req
          </p>
        </div>
      </div>
    </div>
  );
}