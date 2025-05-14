import { useNavigate } from 'react-router-dom';
import FestivalComparison from '../features/festival/FestivalComparison';

const CompareFestivals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 flex flex-col">
      <h1
        className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        🎪 Festival Builder
      </h1>

      {/* Back to Summary Panel Button */}
      <button
        onClick={() => navigate('/builder')}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition mb-6 w- self-center"
      >
        ← Back to Festival Builder
      </button>

      <FestivalComparison />
    </div>
  );
};

export default CompareFestivals;