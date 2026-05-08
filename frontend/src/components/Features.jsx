import React from 'react';
import { ShieldAlert, Fingerprint, Waves, Brain, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Agentic Guardrails",
      desc: "Real-time LLM safety analysis prevents unethical prompt vectors before they enter the pipeline.",
      icon: <ShieldAlert size={32} />,
      size: "large",
      color: "var(--accent-blue)"
    },
    {
      title: "Consent Verification",
      desc: "Deterministic ID-linked consent tokens ensure legitimate actor authorization.",
      icon: <Fingerprint size={32} />,
      size: "small",
      color: "var(--accent-green)"
    },
    {
      title: "DCT Watermarking",
      desc: "Invisible frequency-domain artifacts embedded directly into the pixel-stream.",
      icon: <Waves size={32} />,
      size: "medium",
      color: "#7000FF"
    },
    {
      title: "Neural Synthesis",
      desc: "High-fidelity SVD models for photorealistic temporal consistency.",
      icon: <Brain size={32} />,
      size: "small",
      color: "#FF007A"
    },
    {
      title: "Edge Governance",
      desc: "Local orchestration ensures sensitive biometric data never leaves your infrastructure.",
      icon: <Lock size={32} />,
      size: "medium",
      color: "#FFA800"
    }
  ];

  return (
    <div className="features-section">
      <div className="section-header">
        <h2 className="section-title">Technological Foundation</h2>
        <p className="section-desc">Modular architecture designed for institutional trust.</p>
      </div>

      <div className="bento-grid">
        {features.map((f, i) => (
          <div key={i} className={`bento-item ${f.size}`} style={{ '--accent': f.color }}>
            <div className="bento-icon">{f.icon}</div>
            <h3 className="bento-title">{f.title}</h3>
            <p className="bento-desc">{f.desc}</p>
            <div className="bento-glow"></div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .features-section {
          max-width: 1400px;
          width: 100%;
          padding: 100px 40px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .section-desc {
          font-size: 1.2rem;
          color: var(--text-dim);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 300px);
          gap: 24px;
        }

        .bento-item {
          position: relative;
          background: var(--bg-dark);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 40px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .bento-item:hover {
          transform: scale(1.02);
          border-color: var(--accent);
          z-index: 10;
        }

        .bento-item.large {
          grid-column: span 2;
          grid-row: span 2;
          justify-content: center;
        }

        .bento-item.medium {
          grid-column: span 2;
        }

        .bento-icon {
          color: var(--accent);
          margin-bottom: 24px;
          filter: drop-shadow(0 0 8px var(--accent));
        }

        .bento-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .bento-desc {
          color: var(--text-dim);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .bento-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 0%, var(--accent), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .bento-item:hover .bento-glow {
          opacity: 0.05;
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          .bento-item.large { grid-row: span 1; }
        }

        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-item.medium, .bento-item.large { grid-column: span 1; }
        }
      `}} />
    </div>
  );
};

export default Features;
