// components/UrlInputPanel.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Minus, Search, Trash2 } from 'lucide-react'; 
import ConfirmationModal from './ConfirmationModal';
import './UrlInputPanel.css';

const UrlInputPanel = ({ urls, setUrls, isLoading, setIsLoading, setAnalysisData, onNewAnalysis }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddInput = () => {
    setUrls([...urls, ""]);
  };

  const handleRemoveInput = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls.length ? newUrls : [""]); // Keep at least one
  };

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAnalyze = async () => {
    // Filter out empty URLs
    const validUrls = urls.filter(u => u.trim() !== "");
    if (validUrls.length === 0) return alert("Please enter at least one URL");

    setIsLoading(true);
    // setAnalysisData(null); // Do NOT reset immediately if we want to preserve old state in case of failure, 
    // but typically a new analysis *should* replace the old one. 
    // However, Dashboard.jsx logic handles the wiping of previous analysisData generally.

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {}
      };
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post('https://majprojback-hdj8.onrender.com/analyze', {
        urls: validUrls
      }, config);

      if (response.data && response.data.success) {
        setAnalysisData({
          index_name: response.data.index_name,
          summary: response.data.summary
        });
      }
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Error analyzing URLs. Check console.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const requestNewAnalysis = () => {
      setShowModal(true);
  };

  const confirmNewAnalysis = () => {
      onNewAnalysis();
      setShowModal(false);
  };

  return (
    <div className="input-panel-container">
      <div className="panel-header">
          <div>
            <h2 className="panel-title">Source URLs</h2>
            <p className="panel-subtitle">Add article or report URLs to analyze</p>
          </div>
          <button onClick={requestNewAnalysis} className="new-analysis-btn" title="Start New Analysis">
              <Trash2 size={14} /> Clear
          </button>
      </div>
      
      <div className="url-list">
        {urls.map((url, index) => (
          <div key={index} className="url-item">
            <span className="index-number">{index + 1}</span>
            <input
              type="text"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => handleChange(index, e.target.value)}
              className="url-input"
            />
            
            <div className="action-buttons">
              {urls.length > 1 && (
                <button 
                  onClick={() => handleRemoveInput(index)}
                  className="icon-btn remove"
                >
                  <Minus size={16} />
                </button>
              )}
              {index === urls.length - 1 && (
                <button 
                  onClick={handleAddInput}
                  className="icon-btn add"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="action-footer">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className={`analyze-btn ${isLoading ? 'disabled' : 'active'}`}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Analyze URLs</span>
            </>
          )}
        </button>
      </div>

      <ConfirmationModal 
        isOpen={showModal}
        title="Start New Analysis?"
        message="Are you sure you want to start a new analysis? This will clear your current chats and analysis data."
        onConfirm={confirmNewAnalysis}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default UrlInputPanel;