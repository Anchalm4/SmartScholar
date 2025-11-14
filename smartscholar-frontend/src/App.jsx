import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileForm from "./pages/ProfileForm";
import Dashboard from "./pages/Dashboard";
import RoadmapPages from "./pages/RoadmapPages";
import LandingPage from "./pages/LandingPage";
import AtsChecker from "./pages/AtsChecker";
import LovePage from "./pages/LovePage";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// 🆕 NEW IMPORT
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* GUEST ONLY */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* 🔒 PROTECTED ROUTES WITH SIDEBAR LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/roadmaps" element={<RoadmapPages />} />
          <Route path="/ats-checker" element={<AtsChecker />} />
          <Route path="/love" element={<LovePage />} />

        </Route>

        {/* ANY UNKNOWN ROUTE → REDIRECT */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
