import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Register.css"; 

export default function Register() {
  return (
    <div className="register-container">
      {/* Background glows */}
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="register-card"
      >
        <h1 className="title">
          Smart<span className="title-blue">Scholar</span>
        </h1>

        <form className="form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="register-btn"
          >
            Create Account
          </motion.button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>

        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="card-border"
        />
      </motion.div>
    </div>
  );
}