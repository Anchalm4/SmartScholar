import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      { id: 1, college_name: "IIT Delhi", current_cgpa: 7.2, required_average: 8.5, target_cgpa: 8.0 },
      { id: 2, college_name: "NIT Trichy", current_cgpa: 6.8, required_average: 7.6, target_cgpa: 7.5 },
    ];
    setSavedProfiles(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-white text-center text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-card"
      >
        <h1 className="dashboard-title">
          Your <span>Dashboard</span>
        </h1>

        {savedProfiles.length === 0 ? (
          <div className="empty-state">
            <p>No analysis yet</p>
            <Link to="/profile" className="start-btn">
              Start First Analysis
            </Link>
          </div>
        ) : (
          <div className="profile-list">
            {savedProfiles.map((p) => (
              <div key={p.id} className="profile-item">
                <div className="profile-info">
                  <h3>{p.college_name}</h3>
                  <p>
                    CGPA: <strong className="text-yellow-400">{p.current_cgpa}</strong> → Need{" "}
                    <strong className="text-green-400">{p.required_average}</strong> avg
                  </p>
                </div>
                <Link to={`/analysis/${p.id}`} className="view-link">
                  View
                </Link>
              </div>
            ))}
          </div>
        )}

        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="card-border"
        />
      </motion.div>
    </div>
  );
}
