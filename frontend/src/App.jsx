import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import { Shield, Menu } from 'lucide-react';
import './App.css';

const App = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="main-layout">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Shield className="logo-icon" size={28} />
            <span className="logo-text">EthiCast</span>
          </div>
          <div className="nav-links">
            <a href="#hero">Overview</a>
            <a href="#features">Technology</a>
            <a href="#dashboard" className="nav-cta">Launch Terminal</a>
          </div>
          <button className="nav-mobile-toggle">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Main Sections */}
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        <section id="features">
          <Features />
        </section>
        
        <section id="dashboard">
          <Dashboard />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 EthiCast Systems. All Rights Reserved. Deterministic Trust Architecture.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
