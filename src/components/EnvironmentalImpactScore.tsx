interface EnvironmentalImpactScoreProps {
  totalEnergy: number; // in kWh
}

const getImpactLabel = (kgCO2: number) => {
  if (kgCO2 < 5000) return { label: '♻️ Low Impact', color: 'text-green-700' };
  if (kgCO2 < 15000) return { label: '⚠️ Moderate Impact', color: 'text-yellow-600' };
  return { label: '🔥 High Impact', color: 'text-red-600' };
};

export default function EnvironmentalImpactScore({ totalEnergy }: EnvironmentalImpactScoreProps) {
  const kgCO2 = totalEnergy * 0.4; // average 0.4 kg CO₂ per kWh
  const { label, color } = getImpactLabel(kgCO2);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border mt-6 space-y-2">
      <h3 className="text-xl font-bold text-indigo-700">🌍 Environmental Impact</h3>
      <p className={`text-3xl font-extrabold ${color}`}>{kgCO2.toFixed(0)} kg CO₂</p>
      <p className="text-sm text-gray-500">{label} — Estimated based on total energy usage</p>
      <p className="text-xs text-gray-400">
        Based on 0.4 kg CO₂ per kWh (EPA average for electricity)
      </p>
    </div>
  );
}
