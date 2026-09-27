import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ChiniotSynergy from './components/ChiniotSynergy';
import Rewards from './components/Rewards';
import AboutUs from './components/AboutUs';
import Partners from './components/Partners';
import CompostingProcess from './components/CompostingProcess';
import ContactUs from './components/ContactUs';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/process" element={<CompostingProcess />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/chiniot-synergy" element={<ChiniotSynergy />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}