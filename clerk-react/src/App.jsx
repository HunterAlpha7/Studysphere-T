import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study-groups" element={<div>Study Groups (Coming Soon)</div>} />
        <Route path="/focus-mode" element={<div>Focus Mode (Coming Soon)</div>} />
        <Route path="/contact" element={<div>Contact Us (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}