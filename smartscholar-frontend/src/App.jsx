import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileForm from "./pages/ProfileForm";
import AnalysisResult from "./pages/AnalysisResult";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RoadmapPages from "./pages/RoadmapPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/analysis/:id" element={<AnalysisResult />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmaps" element={<RoadmapPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;