import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./AnalysisResult.css";

export default function AnalysisResult() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/profile/${id}`)
      .then(res => {
        setResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load analysis");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="analysis-container">
        <div className="text-white text-center text-xl">Loading Analysis...</div>
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="analysis-card"
      >
        <h1 className="analysis-title">
          Analysis <span>Result</span>
        </h1>

        <div>
          <div className="analysis-info">
            <p>College</p>
            <p className="text-white text-xl font-bold">{result.college_name}</p>
          </div>

          <div className="analysis-info">
            <p>Current CGPA</p>
            <p className="text-yellow-400 text-xl font-bold">{result.current_cgpa}</p>
          </div>

          <div className="analysis-info">
            <p>Required Avg (Remaining Sem)</p>
            <p className="analysis-highlight text-green-400">{result.required_average}</p>
          </div>

          <div className="analysis-info">
            <p>Final CGPA (if achieved)</p>
            <p className="analysis-highlight text-blue-400">{result.required_total_cgpa}</p>
          </div>
        </div>

        <div className="target-box">
          <p>
            Target CGPA for placements in your college: <strong>{result.target_cgpa}</strong>
          </p>
        </div>

        <div className="analysis-buttons">
          <Link to="/profile" className="analysis-btn analysis-btn-secondary">
            New Analysis
          </Link>
          <Link to="/dashboard" className="analysis-btn analysis-btn-primary">
            View Dashboard
          </Link>
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
