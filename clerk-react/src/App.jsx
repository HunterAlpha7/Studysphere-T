import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-groups"
          element={
            <ProtectedRoute>
              <div>Study Groups (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/focus-mode"
          element={
            <ProtectedRoute>
              <div>Focus Mode (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <div>Contact Us (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}