import { useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX, Heart, Gift, Sparkles } from "lucide-react";
import "./LoveExperience.css";

export default function LoveExperience() {
  const [musicOn, setMusicOn] = useState(false);

  const [showTyping, setShowTyping] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [showAskOut, setShowAskOut] = useState(false);

  const [showGift, setShowGift] = useState(false);

  // ---------- MUSIC ----------
  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;
    musicOn ? audio.pause() : audio.play();
    setMusicOn(!musicOn);
  };

  return (
    <div className="experience-container">

      {/* Background Stars */}
      <div className="stars"></div>
      <div className="stars2"></div>

      {/* Background Music */}
      <audio id="bg-music" loop>
        <source src="/love-music.mp3" type="audio/mp3" />
      </audio>

      {/* Music Toggle Button */}
      <button className="music-btn" onClick={toggleMusic}>
        {musicOn ? <VolumeX size={22} /> : <Music size={22} />}
      </button>

      {/* MAIN LOVE LETTER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="love-letter"
      >
        <h2>💌 A Letter From My Heart</h2>
        <p>
          I’m not here to rush anything.  
          I just want you to know—your presence changed something in me.  
          And whenever you're ready…  
          I'll be right here.
        </p>
      </motion.div>

      {/* MEMORY GALLERY */}
      <div className="gallery">
        {[1, 2, 3].map((n, i) => (
          <motion.div
            key={i}
            className="photo"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.3 }}
          >
            <img src={`/mem${n}.jpg`} alt="Memory" />
            <Sparkles className="spark" size={22} />
          </motion.div>
        ))}
      </div>
      {/* ❤️ CONFESSION BUTTON */}
<motion.button
  className="confess-btn"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
  onClick={() => {
    setShowTyping(true);
    setTimeout(() => setShowPetals(true), 3500);
    setTimeout(() => setShowAskOut(true), 6500);
  }}
>
  Something I Want To Tell You 💗
</motion.button>


      {/* 💬 TYPING ANIMATION */}
      {showTyping && (
        <div className="typing-popup">
          <div className="chat-bubble">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>

          <motion.p
            className="typed-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            I know you said you need time…  
            and I respect that with all my heart. 💗
          </motion.p>
        </div>
      )}

      {/* 🌸 FALLING PETALS */}
      {showPetals && (
        <div className="petals">
          {[...Array(20)].map((_, i) => (
            <div className="petal" style={{ "--i": i }} key={i}>🌸</div>
          ))}
        </div>
      )}

      {/* 💕 ASK OUT CARD */}
      {showAskOut && (
        <motion.div
          className="askout-card"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Heart size={40} color="#ff4d6d" />
          <h2>I Want To Take You On a Date…</h2>

          <p>
            Not to impress you,  
            not to force anything,  
            but just to spend time with the person  
            who has unknowingly made my days softer.
          </p>

          <button
            className="yes-btn"
            onClick={() => setShowGift(true)}
          >
            Yes, I’d Love To ❤️
          </button>
        </motion.div>
      )}

      {/* 🎁 GIFT POPUP */}
      {showGift && (
        <motion.div className="gift-popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="gift-box">
            <Gift size={40} color="#ffd700" />
            <h3>A Small Wish…</h3>
            <p>
              I hope one day you look back and smile,  
              knowing someone cared for you  
              more than words could ever express.
            </p>

            <p className="signature">– From Someone Who Truly Likes You ❤️</p>

            <button className="close-btn" onClick={() => setShowGift(false)}>
              Close
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
