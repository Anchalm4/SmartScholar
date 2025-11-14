import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-header">
        <span className="logo">{expanded ? "Smart Scholar" : "SS"}</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
          📊 <span className="text">Dashboard</span>
        </Link>

        <Link to="/profile" className={pathname === "/profile" ? "active" : ""}>
          👤 <span className="text">Edit Profile</span>
        </Link>

        <Link to="/roadmaps" className={pathname === "/roadmaps" ? "active" : ""}>
          🛣️ <span className="text">Roadmaps</span>
        </Link>

<Link to="/ats-checker" className={pathname === "/ats-checker" ? "active" : ""}>
          📄 <span className="text">ATS Score</span>
        </Link>

        <Link to="/resume" className={pathname === "/resume" ? "active" : ""}>
          📝 <span className="text">Resume Builder</span>
        </Link>
        <Link to="/love" className={pathname === "/love" ? "active" : ""}>
  ❤️ <span className="text">Surprise</span>
</Link>

      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 <span className="text">Logout</span>
        </button>
      </div>
    </div>
  );
}
