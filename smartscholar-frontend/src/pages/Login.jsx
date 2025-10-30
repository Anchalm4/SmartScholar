import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="login-card"
      >
        <h1 className="title">
          Smart<span className="title-blue">Scholar</span>
        </h1>

        <form className="form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="login-btn"
          >
            Login
          </motion.button>
        </form>

        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
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
