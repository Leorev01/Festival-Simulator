interface CrowdHealthScoreProps {
  attendance: number;
  toilets: number;
  foodVendors: number;
  staff: number;
}

const calculateScore = (attendance: number, toilets: number, food: number, staff: number) => {
  const toiletRatio = toilets / (attendance / 75);
  const foodRatio = food / (attendance / 250);
  const staffRatio = staff / (attendance / 100);

  const ratios = [toiletRatio, foodRatio, staffRatio];
  const average = ratios.reduce((a, b) => a + Math.min(b, 1), 0) / ratios.length;

  return Math.round(average * 100); // 0–100 score
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

export default function CrowdHealthScore({
  attendance,
  toilets,
  foodVendors,
  staff,
}: CrowdHealthScoreProps) {
  const score = calculateScore(attendance, toilets, foodVendors, staff);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border mt-6 space-y-2">
      <h3 className="text-xl font-bold text-indigo-700">🧠 Crowd Health Index</h3>
      <p className={`text-4xl font-extrabold ${getColor(score)}`}>{score}/100</p>
      <p className="text-sm text-gray-500">{getLabel(score)} — Based on crowd-to-resource ratios</p>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm text-gray-600">
        <div>
          <strong>Toilets</strong>
          <p>{toilets} / {Math.ceil(attendance / 75)} req</p>
        </div>
        <div>
          <strong>Food</strong>
          <p>{foodVendors} / {Math.ceil(attendance / 250)} req</p>
        </div>
        <div>
          <strong>Staff</strong>
          <p>{staff} / {Math.ceil(attendance / 100)} req</p>
        </div>
      </div>
    </div>
  );
}