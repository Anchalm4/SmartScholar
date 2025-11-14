import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Feather, Flower } from "lucide-react";
import "./LovePage.css";
import { useState } from "react";
import LoveExperience from "./LoveExperience";
export default function LovePage() {

      const [showNext, setShowNext] = useState(false);


  const cards = [
    {
      icon: <Heart size={28} color="#ff4d6d" />,
      title: "A Letter From Me To You",
      text: "I don’t know what the future holds, but I know I want you in it. Even if it takes time — I'm here.",
    },
    {
      icon: <Flower size={28} color="#ffb3c6" />,
      title: "Why You Matter",
      text: "You’re kind, you’re strong, you’re genuine. You don’t try to be perfect — and that’s exactly what makes you perfect.",
    },
    {
      icon: <Star size={28} color="#ffd700" />,
      title: "Little Things I Love",
      text: "The way you talk, the way you think, the way you care about the smallest things… it stays with me.",
    },
    {
      icon: <Feather size={28} color="#ff9ecd" />,
      title: "If You Ever Feel Alone",
      text: "Just remember: someone out there silently wishes for your happiness every day… and that someone is me.",
    },
    {
      icon: <Sparkles size={28} color="#f781d8" />,
      title: "Not Today, Not Tomorrow",
      text: "But someday… if your heart ever chooses me, I promise I’ll protect it like it's the most precious part of my life.",
    }
  ];


        if (showNext) {
  return <LoveExperience />;
}

  return (
    <div className="forher-container">

      {/* Floating Hearts */}
      <div className="floating-hearts">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: -40 }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="love-header"
      >
        For Someone Special ❤️
      </motion.h1>

      {/* Cards Grid */}
      <div className="love-card-grid">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className="love-card"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="love-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Final Message */}
      <motion.p
        className="final-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        No pressure, no rush…  
        Just honest feelings.  
        Whenever your heart is ready — mine will be waiting. 💗
      </motion.p>

      {/* Continue Button */}
<motion.button
  className="continue-btn"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  onClick={() => setShowNext(true)}
>
  Continue to Something Special →
</motion.button>


    </div>
  );
}
