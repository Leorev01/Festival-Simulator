import { useNavigate } from 'react-router-dom'
import FestivalComparison from '../features/festival/FestivalComparison'

const CompareFestivals = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 cursor-pointer" onClick={() => navigate('/dashboard')}>🎪 Festival Builder</h1>

      <FestivalComparison />
    </div>
  )
}

export default CompareFestivals