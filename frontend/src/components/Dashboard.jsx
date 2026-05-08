import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Cpu, 
  Waves, 
  Settings, 
  Upload, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [safetyStrictness, setSafetyStrictness] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobStatus, setJobStatus] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef(null);
  const pollIntervalRef = useRef(null);

  const steps = [
    { id: 'Safety Audit', icon: <ShieldCheck size={18} />, label: 'Safety Audit' },
    { id: 'Consent Token', icon: <Key size={18} />, label: 'Consent' },
    { id: 'AI Generation', icon: <Cpu size={18} />, label: 'Generation' },
    { id: 'DCT Watermarking', icon: <Waves size={18} />, label: 'Watermark' }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const startSynthesis = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setErrorMessage('');
    setOutputVideo(null);
    setJobStatus({ status: 'processing', step: 'Safety Audit', progress: 10 });

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('safetyStrictness', safetyStrictness);
      if (file) formData.append('media', file);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData
      });

      const { jobId } = await response.json();
      startPolling(jobId);

    } catch (err) {
      setErrorMessage('Failed to initiate pipeline.');
      setIsProcessing(false);
    }
  };

  const startPolling = (jobId) => {
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${jobId}`);
        const data = await res.json();
        
        setJobStatus(data);

        if (data.status === 'completed') {
          clearInterval(pollIntervalRef.current);
          setOutputVideo(data.result);
          setIsProcessing(false);
        } else if (data.status === 'failed') {
          clearInterval(pollIntervalRef.current);
          setErrorMessage(data.error || 'Synthesis failed.');
          setIsProcessing(false);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => { if (pollIntervalRef.current) clearInterval(pollIntervalRef.current); };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Toggle */}
      <button 
        className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Settings size={20} />
      </button>

      {/* Rule Builder Panel */}
      <aside className={`rule-builder ${isSidebarOpen ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <h3>Governance Rules</h3>
          <p>Adjust LangChain safety parameters</p>
        </div>
        
        <div className="setting-group">
          <label>Safety Strictness</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={safetyStrictness}
            onChange={(e) => setSafetyStrictness(parseFloat(e.target.value))}
            className="custom-slider"
          />
          <div className="slider-labels">
            <span>Permissive</span>
            <span>{safetyStrictness}</span>
            <span>Restricted</span>
          </div>
        </div>

        <div className="governance-info">
          <div className="info-card">
            <ShieldCheck size={16} className="text-blue" />
            <span>Agentic Audit Enabled</span>
          </div>
          <div className="info-card">
            <Key size={16} className="text-green" />
            <span>Deterministic Consent</span>
          </div>
        </div>
      </aside>

      {/* Main Terminal */}
      <div className="terminal-core">
        <header className="terminal-header">
          <div className="terminal-status">
            <div className="status-dot pulse"></div>
            <span>SYSTEM READY</span>
          </div>
          <h2>Synthesis Terminal v2.4</h2>
        </header>

        <div className="terminal-grid">
          {/* Input Section */}
          <div className="input-pane">
            <div className="pane-header">Pipeline Configuration</div>
            
            <div className="input-group">
              <label>Prompt Vector</label>
              <textarea 
                placeholder="Describe target synthesis with ethical context..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <div className="input-group">
              <label>Local Media Artifacts</label>
              <div 
                className="dropzone"
                onClick={() => fileInputRef.current.click()}
              >
                <Upload size={24} />
                <p>{file ? file.name : 'Upload Base Media / Token'}</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  hidden 
                  onChange={handleFileChange} 
                />
              </div>
            </div>

            <button 
              className={`action-btn ${isProcessing ? 'loading' : ''}`}
              onClick={startSynthesis}
              disabled={isProcessing || !prompt}
            >
              {isProcessing ? 'Synthesizing...' : 'Initiate Secure Generation'}
            </button>
            
            {errorMessage && (
              <div className="error-toast">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Visualizer & Player Section */}
          <div className="output-pane">
            <div className="pane-header">Real-time Pipeline Status</div>
            
            {/* Pipeline Visualizer */}
            <div className="pipeline-visualizer">
              {steps.map((step, idx) => {
                const isActive = jobStatus?.step === step.id;
                const isCompleted = jobStatus?.progress > (idx + 1) * 25 || jobStatus?.status === 'completed';
                
                return (
                  <div key={step.id} className={`pipeline-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                    <div className="node-icon">{step.icon}</div>
                    <span>{step.label}</span>
                    {idx < steps.length - 1 && <div className="node-connector"></div>}
                  </div>
                );
              })}
            </div>

            {/* Video Player Display */}
            <div className="player-canvas">
              {isProcessing ? (
                <div className="rendering-state">
                  <div className="loader-ring">
                    <Loader2 size={48} className="spin" />
                  </div>
                  <h3>Rendering AI Media</h3>
                  <p>Executing neural synthesis on remote cluster...</p>
                  <div className="loading-progress">
                    <div className="progress-bar" style={{ width: `${jobStatus?.progress}%` }}></div>
                  </div>
                </div>
              ) : outputVideo ? (
                <div className="video-wrapper">
                  <video src={outputVideo} autoPlay loop muted controls />
                  <div className="player-watermark">
                    <ShieldCheck size={14} />
                    <span>EthiCast Protected Artifact</span>
                  </div>
                </div>
              ) : (
                <div className="idle-state">
                  <Cpu size={48} className="text-dim" />
                  <p>Awaiting Pipeline Initiation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
