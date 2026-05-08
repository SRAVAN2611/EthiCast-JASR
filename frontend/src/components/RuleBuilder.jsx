import React, { useState } from 'react';
import './RuleBuilder.css'; // Assume minimal CSS or inline styling

const RuleBuilder = () => {
  const [keywords, setKeywords] = useState(['violence', 'hate-speech', 'deepfake-celeb']);
  const [newKeyword, setNewKeyword] = useState('');
  const [strictness, setStrictness] = useState('Medium');
  const [requireConsentToken, setRequireConsentToken] = useState(true);

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((kw) => kw !== keywordToRemove));
  };

  const handleSaveRules = () => {
    const payload = { keywords, strictness, requireConsentToken };
    console.log('Saving rules to backend:', payload);
    // TODO: Send to backend API
    alert('Safety rules successfully updated.');
  };

  return (
    <div className="dark-theme-container rule-builder-panel">
      <h2>Ethical Rule Builder</h2>
      <p>Configure the Agentic Guardrails for GenAI Video Synthesis.</p>

      <div className="form-section">
        <h3>Restricted Keywords</h3>
        <form onSubmit={handleAddKeyword} className="keyword-form">
          <input 
            type="text" 
            value={newKeyword} 
            onChange={(e) => setNewKeyword(e.target.value)} 
            placeholder="Add a restricted keyword..." 
            className="dark-input"
          />
          <button type="submit" className="btn-primary">Add</button>
        </form>
        <ul className="keyword-list">
          {keywords.map((kw, index) => (
            <li key={index} className="keyword-item">
              {kw}
              <button onClick={() => handleRemoveKeyword(kw)} className="btn-remove">✖</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-section">
        <h3>Guardrail Strictness</h3>
        <select 
          value={strictness} 
          onChange={(e) => setStrictness(e.target.value)}
          className="dark-select"
        >
          <option value="Low">Low - Basic Profanity Filter</option>
          <option value="Medium">Medium - Contextual Safety Analysis</option>
          <option value="High">High - Aggressive Content Blocking</option>
        </select>
      </div>

      <div className="form-section toggle-section">
        <label>
          <input 
            type="checkbox" 
            checked={requireConsentToken} 
            onChange={(e) => setRequireConsentToken(e.target.checked)} 
          />
          Require Mandatory Digital Consent Token (DCT)
        </label>
      </div>

      <button onClick={handleSaveRules} className="btn-save">Save Configuration</button>
    </div>
  );
};

export default RuleBuilder;
