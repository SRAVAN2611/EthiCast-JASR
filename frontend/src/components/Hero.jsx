import React from 'react';
import { ChevronDown, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-glow-top"></div>
      
      <div className="hero-content">
        <div className="badge-wrapper">
          <span className="hero-badge">PHASE 2 DEPLOYED</span>
        </div>
        
        <h1 className="hero-title">
          EthiCast: <br />
          <span className="gradient-text">Secure-by-Design</span> <br />
          GenAI Synthesis
        </h1>
        
        <p className="hero-subtitle">
          Cryptographic guardrails and deterministic consent for the next <br />
          generation of synthetic media. Enterprise-grade deepfake governance.
        </p>
        
        <div className="hero-actions">
          <a href="#dashboard" className="btn-primary">
            <PlayCircle size={20} />
            <span>Initiate Synthesis</span>
          </a>
          <a href="#features" className="btn-secondary">
            Explore Architecture
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <ChevronDown className="bounce" size={32} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container {
          position: relative;
          text-align: center;
          padding: 0 20px;
          max-width: 1200px;
        }

        .hero-glow-top {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 100px;
          color: var(--accent-blue);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -3px;
          margin-bottom: 32px;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-blue) 0%, #7000FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .btn-primary {
          background: white;
          color: black;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid var(--glass-border);
          transition: background 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-dim);
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}} />
    </div>
  );
};

export default Hero;
