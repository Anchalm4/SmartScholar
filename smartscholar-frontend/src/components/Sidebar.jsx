// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, UserPlus, BarChart3, Target, Trophy, Settings, LogOut, Menu, X
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: UserPlus, label: "New Analysis", path: "/profile" },
  { icon: BarChart3, label: "All Analyses", path: "/analyses" },
  { icon: Target, label: "Target Tracker", path: "/target" },
  { icon: Trophy, label: "Placement Prep", path: "/prep" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-2 bg-white/10 backdrop-blur rounded-xl md:hidden"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">
            Smart<span className="text-blue-400">Scholar</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 w-full transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}