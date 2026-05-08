# EthiCast: Secure-by-Design GenAI Synthesis

![EthiCast Banner](https://img.shields.io/badge/Status-Phase_2_Deployed-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/Architecture-Deterministic_Trust-00f0ff?style=for-the-badge)

EthiCast is a next-generation orchestration platform for secure AI video synthesis. Built with a "Security-by-Design" philosophy, it implements cryptographic guardrails, agentic safety audits, and frequency-domain watermarking to ensure ethical transparency in synthetic media.

---

## 🚀 Key Technological Pillars

### 1. Agentic Safety Guardrails
Before any synthesis occurs, a Python-based **Agentic Safety Agent** performs a contextual analysis of the prompt. It evaluates ethical violations using variable strictness levels (Permissive to Restricted), blocking harmful content before it reaches the generative models.

### 2. DCT Frequency-Domain Watermarking
Every generated artifact is embedded with an invisible **Discrete Cosine Transform (DCT)** watermark. Unlike traditional overlays, this watermark exists in the frequency domain of the pixel stream, making it resilient to compression and tampering while ensuring provenance tracking.

### 3. Deterministic Pipeline Visualization
A real-time terminal interface allows operators to track the lifecycle of a synthesis job through four critical phases:
- **Safety Audit:** LLM-driven content verification.
- **Consent Token:** Verification of digital authorization.
- **AI Generation:** High-fidelity synthesis via Stable Video Diffusion (SVD).
- **DCT Watermarking:** Cryptographic provenance embedding.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Lucide-React, CSS3 (Bento-grid Architecture)
- **Backend:** Node.js (Express), Multer, Mongoose
- **AI/ML Layer:** Python 3.x, Replicate API (Stable Video Diffusion)
- **Database:** MongoDB (Audit Logging & Job Provenance)

---

## 📂 Project Structure

```text
├── ai/                 # Python Safety Agent & Watermarking Engine
├── backend/            # Express Orchestration Layer
│   ├── models/         # MongoDB Schema (Audit Logs)
│   ├── routes/         # Pipeline & Status Endpoints
│   └── uploads/        # Local Media Storage
├── frontend/           # React Terminal Interface
│   ├── src/components/ # Dashboard, RuleBuilder, Bento Features
│   └── public/outputs/ # Watermarked Video Storage
└── mock_data/          # Development Media Artifacts
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- MongoDB (Running locally or via Atlas)
- Replicate API Token (Optional, system falls back to mock generation if missing)

### 1. Clone the Repository
```bash
git clone https://github.com/SRAVAN2611/EthiCast-JASR.git
cd EthiCast-JASR
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file (optional)
# REPLICATE_API_TOKEN=your_token
# MONGO_URI=mongodb://localhost:27017/ethicast
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 🛡 Security Mandate
EthiCast is designed for institutional trust. All biometric artifacts and prompt vectors are processed through a strictly governed orchestration layer. The **Audit Log** system ensures every synthesis attempt is cryptographically hashed and indexed for accountability.

---

## 📜 License
© 2026 EthiCast Systems. All Rights Reserved. **Deterministic Trust Architecture.**
