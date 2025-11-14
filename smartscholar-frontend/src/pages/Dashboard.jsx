import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  const userId = user?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH USER PROFILE FROM BACKEND
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:8000/users/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-white text-center text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <p>No Profile Found</p>
          <Link to="/profile" className="start-btn">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  // AUTO GENERATE CGPA ROADMAP
  const generateRoadmap = () => {
    const semLeft = 8 - (profile.semester || 0);
    const curr = profile.cgpa || 0;
    const target = profile.desired_cgpa || 0;
    const diff = target - curr;

    if (semLeft <= 0 || diff <= 0) return [];

    const perSemTarget = diff / semLeft;
    let roadmap = [];
    let temp = curr;

    for (let i = 1; i <= semLeft; i++) {
      temp += perSemTarget;
      roadmap.push({ sem: profile.semester + i, target: temp.toFixed(2) });
    }
    return roadmap;
  };

  const roadmap = generateRoadmap();

  return (
    <div className="dashboard-container">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-card"
      >
        <h1 className="dashboard-title">
          Welcome, <span>{profile.name}</span>
        </h1>

        <p className="dash-subtitle">Your Smart Scholar Overview</p>

        <div className="dash-grid">

          {/* CGPA ROADMAP */}
          <div className="dash-box">
            <h3 className="dash-box-title">CGPA Improvement Roadmap</h3>
            <p>
              Current: <strong>{profile.cgpa || "N/A"}</strong> → Desired:{" "}
              <strong>{profile.desired_cgpa || "N/A"}</strong>
            </p>
            {roadmap.length > 0 ? (
              <ul className="roadmap-list">
                {roadmap.map((r, i) => (
                  <li key={i}>
                    Semester {r.sem}: <span className="text-green-400">{r.target}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No roadmap available.</p>
            )}
          </div>

          {/* DREAM COMPANY */}
          <div className="dash-box">
            <h3 className="dash-box-title">Dream Company</h3>
            <p>
              Company: <strong>{profile.dream_company || "Not Set"}</strong>
            </p>
            <p>
              Role: <strong>{profile.dream_role || "Not Set"}</strong>
            </p>

            <Link to="/company-roadmap" className="view-btn">
              View Roadmap →
            </Link>
          </div>

          {/* SKILLS */}
          <div className="dash-box">
            <h3 className="dash-box-title">Your Skills</h3>
            {profile.skills && profile.skills.length > 0 ? (
              <div className="skill-list">
                {profile.skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No skills added.</p>
            )}

            <Link to="/profile" className="view-btn">Edit Skills</Link>
          </div>

        </div>

        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="card-border"
        />
      </motion.div>
    </div>
  );
}
