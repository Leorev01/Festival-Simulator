const user = JSON.parse(localStorage.getItem('festival-user') || '{}');

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome, {user.name || 'Guest'}</h1>
    </div>
  );
}
