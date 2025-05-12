import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {useEffect, useState} from 'react';
import LoadingScreen from './components/LoadingScreen';
import FestivalBuilder from './pages/FestivalBuilder';
import CompareFestivals from './pages/CompareFestivals';

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
      <Route path="/builder" element={<FestivalBuilder />} />
      <Route path='/compare' element={<CompareFestivals />} />
    </Routes>
  );
}

export default App;

