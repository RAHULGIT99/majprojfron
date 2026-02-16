// components/ResultsPanel.jsx
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { MessageSquare, BarChart, Table, Search } from 'lucide-react';
import './ResultsPanel.css';

const ResultsPanel = ({ isLoading, data, chatHistories, onChatHistoryUpdate }) => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'viz' | 'excel'


  // 1. Loading State
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader-visual">
          <div className="spinner-ring" />
          <div className="spinner-ring-inner" />
        </div>
        <div className="loader-text-group">
          <p className="loading-title">Processing your sources</p>
          <p className="loading-text">Scraping, indexing &amp; analyzing...</p>
        </div>
        <div className="loading-steps">
          <div className="loading-step">
            <div className="loading-step-dot" />
            <span>Scraping</span>
          </div>
          <div className="loading-step">
            <div className="loading-step-dot" />
            <span>Indexing</span>
          </div>
          <div className="loading-step">
            <div className="loading-step-dot" />
            <span>Analyzing</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty State (Before Analysis)
  if (!data) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Search size={32} />
        </div>
        <p className="empty-state-title">No analysis yet</p>
        <p className="empty-state-text">
          Add article or report URLs in the panel on the left and click <strong>Analyze</strong> to get started.
        </p>
      </div>
    );
  }

  // 3. Results State (Tabs)
  return (
    <div className="results-container">
      {/* Tab Header */}
      <div className="tabs-header">
        <TabButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
          icon={<MessageSquare size={16}/>} 
          label="Chat & Summary" 
        />
        <TabButton 
          active={activeTab === 'viz'} 
          onClick={() => setActiveTab('viz')} 
          icon={<BarChart size={16}/>} 
          label="Visualization" 
        />
        <TabButton 
          active={activeTab === 'excel'} 
          onClick={() => setActiveTab('excel')} 
          icon={<Table size={16}/>} 
          label="Excel Data" 
        />
      </div>

      {/* Tab Content Area */}
      <div className="tab-content-area" style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden'}}>
        {activeTab === 'chat' && (
          <div className="tab-pane">
             <ChatInterface 
                indexName={data.index_name} 
                summary={data.summary} 
                messages={chatHistories.chat}
                onMessagesChange={(msgs) => onChatHistoryUpdate('chat', msgs)}
                activeTab={activeTab}
              />
          </div>
        )}
        
        {activeTab === 'viz' && (
           <div className="tab-pane">
              <div style={{flex: 1, minHeight: 0, position: 'relative'}}>
                <ChatInterface 
                    indexName={data.index_name} 
                    summary={null}
                    messages={chatHistories.viz}
                    onMessagesChange={(msgs) => onChatHistoryUpdate('viz', msgs)}
                    activeTab={activeTab}
                />
              </div>
           </div>
        )}
        
        {activeTab === 'excel' && (
           <div className="tab-pane">
              <div style={{flex: 1, minHeight: 0, position: 'relative'}}>
                <ChatInterface 
                    indexName={data.index_name} 
                    summary={null}
                    messages={chatHistories.excel}
                    onMessagesChange={(msgs) => onChatHistoryUpdate('excel', msgs)}
                    activeTab={activeTab}
                />
              </div>
           </div>
        )}
      </div>
    </div>
  );
};


// Tab Button Sub-component
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`tab-button ${active ? 'active' : 'inactive'}`}
  >
    <span className="tab-icon">{icon}</span>
    {label}
  </button>
);

export default ResultsPanel;