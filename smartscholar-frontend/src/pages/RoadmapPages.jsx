import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, Rocket, Target, ArrowUpRight } from "lucide-react";
import "./RoadmapPages.css";

export default function RoadmapPages() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const userId = user?.id;

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:8000/roadmaps/generate/${userId}`)
      .then((res) => {
        setRoadmap(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) 
    return <div className="loading">Generating your personalized roadmap...</div>;

  if (!roadmap)
    return <p className="no-data">No roadmap generated yet.</p>;

  return (
    <div className="roadmap-page">

      {/* PAGE HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="roadmap-header"
      >
        <h1>
          <Rocket size={32} /> Your Roadmap to  
          <span> {roadmap.dream_company} </span>
        </h1>

        <p className="role-tag">
          <Target size={18} /> Role: {roadmap.dream_role}
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="timeline-container">

        {roadmap.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.13 }}
            className="timeline-step"
          >
            <div className="step-icon">
              <CheckCircle size={26} />
            </div>

            <div className="step-content">
              <h3>Step {i + 1}</h3>
              <p>{step}</p>
            </div>
          </motion.div>
        ))}

      </div>

      {/* CTA */}
      <motion.a
        href="#"
        className="cta-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Start Your Journey <ArrowUpRight size={18} />
      </motion.a>
    </div>
  );
}
