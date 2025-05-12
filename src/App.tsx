import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {useEffect, useState} from 'react';
import LoadingScreen from './components/LoadingScreen';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path='/' element={<Navigate to ='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    /*<div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">🎪 Festival Simulator</h1>
    </div>*/
  );
}

export default App;

