import React from 'react';

// This is the correct named import that solves the error
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx';

// Placeholder for the dashboard page
const Dashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Dashboard</h1>
    <p>You have successfully logged in!</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
