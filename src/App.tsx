import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {useEffect, useState} from 'react';
import LoadingScreen from './components/LoadingScreen';
import FestivalBuilder from './pages/FestivalBuilder';
import CompareFestivals from './pages/CompareFestivals';
import PerformanceDashboard from './pages/PerformanceDashboard';


function App() {

  const [loading, setLoading] = useState(true);
  const [ticketCategories, setTicketCategories] = useState([
    { name: 'General Admission', price: 50, percentage: 70 },
    { name: 'VIP', price: 150, percentage: 20 },
    { name: 'Early Bird', price: 30, percentage: 10 },
  ]);

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
      <Route path="/builder" element={<FestivalBuilder
        ticketCategories={ticketCategories}
        onTicketCategoriesUpdate={setTicketCategories}
      />} />
      <Route path="/dashboard/performance" element={<PerformanceDashboard />} />
      <Route path='/compare' element={<CompareFestivals />} />
    </Routes>
  );
}

export default App;

