import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('festival-user', JSON.stringify({ name }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <h1 className="text-2xl">Enter Your Name to Begin</h1>
      <input
        className="border p-2 rounded"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Continue
      </button>
    </div>
  );
}
