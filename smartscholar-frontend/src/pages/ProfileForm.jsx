import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./ProfileForm.css";

export default function ProfileForm() {
  const [form, setForm] = useState({
    college_name: "",
    current_cgpa: "",
    current_semester: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/profile/", {
        college_name: form.college_name,
        current_cgpa: parseFloat(form.current_cgpa),
        current_semester: parseInt(form.current_semester),
      });
      navigate(`/analysis/${res.data.id}`);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="form-card"
      >
        <h1 className="form-title">
          Smart<span>Scholar</span>
        </h1>
        <p className="form-subtitle">Fill your academic details</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">College Name</label>
            <input
              type="text"
              placeholder="e.g., IIT Delhi, NIT Trichy"
              className="form-input"
              value={form.college_name}
              onChange={(e) => setForm({ ...form, college_name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current CGPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g., 7.85"
              className="form-input"
              value={form.current_cgpa}
              onChange={(e) => setForm({ ...form, current_cgpa: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Semester</label>
            <select
              className="form-select"
              value={form.current_semester}
              onChange={(e) => setForm({ ...form, current_semester: e.target.value })}
              required
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? (
              <>Analyzing...</>
            ) : (
              <>Get Placement Analysis</>
            )}
          </motion.button>
        </form>

        <div className="dashboard-link">
          <Link to="/dashboard">Go to Dashboard</Link>
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