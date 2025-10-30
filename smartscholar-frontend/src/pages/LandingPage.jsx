// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Target, Trophy, ArrowRight, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#contact" },
  ];

  const features = [
    { icon: BarChart3, title: "CGPA Analysis", desc: "Know exactly what you need to score" },
    { icon: Target, title: "Target Tracker", desc: "Track progress semester by semester" },
    { icon: Trophy, title: "Placement Prep", desc: "Company cutoffs & resume tips" },
  ];

  const steps = [
    { step: "01", title: "Enter Details", desc: "College, CGPA, Semester" },
    { step: "02", title: "Get Analysis", desc: "Required average in remaining sems" },
    { step: "03", title: "Track & Achieve", desc: "Hit your placement target" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Smart<span className="text-blue-400">Scholar</span>
          </Link>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="hero-content">
          <h1 className="hero-title">
            Secure Your <span className="text-blue-400">Dream Placement</span> with Smart CGPA Planning
          </h1>
          <p className="hero-desc">
            Know exactly what CGPA you need to maintain for top companies. Track progress. Get placed.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="hero-btn-primary">
              Start Free Analysis <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="#how" className="hero-btn-secondary">
              See How It Works
            </a>
          </div>
        </motion.div>
      </section>

      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">About SmartScholar</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="text-lg text-gray-300 leading-relaxed">
                SmartScholar is an <strong>AI-powered CGPA calculator</strong> designed specifically for Indian engineering students. 
                We analyze your current academic performance and tell you <strong>exactly what average you need</strong> in remaining semesters to hit placement cutoffs.
              </p>
              <p className="mt-4 text-gray-300">
                Built by students, for students — trusted by <strong>10,000+</strong> users across IITs, NITs, and top private colleges.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Accurate Predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Real Company Cutoffs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free Forever</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl h-80 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose SmartScholar?</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="feature-card">
                <f.icon className="feature-icon" />
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="how-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{s.step}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Students Say</h2>
          <div className="testimonials-grid">
            {[
              { name: "Rahul Sharma", college: "IIT Delhi", text: "Improved from 6.8 to 8.2 in 2 semesters!" },
              { name: "Priya Patel", college: "NIT Trichy", text: "Got Google internship with perfect CGPA planning." },
              { name: "Aman Verma", college: "VIT Vellore", text: "Best tool for placement prep. Simple & accurate." },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-name">- {t.name}, {t.college}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>support@smartscholar.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Bengaluru, India</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="contact-input" />
                <input type="email" placeholder="Your Email" className="contact-input" />
                <textarea placeholder="Your Message" rows="4" className="contact-input"></textarea>
                <button type="submit" className="contact-btn">
                  Send Message <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container text-center">
          <h2 className="cta-title">Ready to Secure Your Placement?</h2>
          <p className="cta-desc">Join 10,000+ students already tracking their CGPA</p>
          <Link to="/register" className="cta-btn">
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-container">
          <div>
            <h3 className="footer-logo">Smart<span className="text-blue-400">Scholar</span></h3>
            <p className="footer-desc">Your AI-powered placement companion</p>
          </div>
          <div className="footer-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </div>
          <p className="footer-copy">© 2025 SmartScholar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
