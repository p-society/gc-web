import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from "react";
import './page.css'
import SwiperOnboard from "./pages/onboarding/onboard";
import Dashboard from "./pages/dashboard/dashboard";
import OnboardingLast from './pages/onboarding/onboard_last';
import LoginApp from './pages/auth/login';
import RegisterApp from './pages/auth/register';
import { ProtectedRoute }  from './components/protectedRoute';
import { AuthProvider } from "./hooks/useAuth";

const App: React.FC = () => {
  return (
      <div className="canvas_mobile">
        <div className="mobile_view">
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<SwiperOnboard />} />
                <Route path="/onboarding-last" element={<OnboardingLast />} />
                <Route
                  path="/dashboard"
                  element={
                  <ProtectedRoute element={<Dashboard />} />
                  }/>
                <Route path="/login" element={<LoginApp />} />
                <Route path="/register" element={<RegisterApp />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>
  );
};

export default App;
