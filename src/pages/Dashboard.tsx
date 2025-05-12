import { Link } from 'react-router-dom';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('festival-user') || '{}');

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Welcome, {user.name || 'Guest'} 🎪</h1>
      <Link
        to="/builder"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        Start Building Your Festival
      </Link>
    </div>
  );
}
