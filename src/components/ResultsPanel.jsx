// components/ResultsPanel.jsx
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { MessageSquare, BarChart, Table } from 'lucide-react';
import './ResultsPanel.css';

const ResultsPanel = ({ isLoading, data, chatHistories, onChatHistoryUpdate }) => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'viz' | 'excel'


  // 1. Loading State
  if (isLoading) {
    return (
      <div className="loader-container">
        {/* Simple CSS Loader */}
        <div className="spinner"></div>
        <p className="loading-text">Scraping, Indexing & Analyzing...</p>
      </div>
    );
  }

  // 2. Empty State (Before Analysis)
  if (!data) {
    return (
      <div className="empty-state">
        <p>Add URLs on the left and click Analyze to start.</p>
      </div>
    );
  }

  // 3. Results State (Tabs)
  return (
    <div className="results-container">
      {/* Chrome-like Tabs Header */}
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
      {/* Changed height: '100%' to flex: 1 to properly fill remaining space without overflow */}
      <div className="tab-content-area" style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden'}}>
        {/* ChatInterface sits in all tabs but its mode changes or additional content is shown above it */}
        
        {/* For "Chat & Summary" tab, it's JUST the chat interface. */}
        {activeTab === 'chat' && (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
             <ChatInterface 
                indexName={data.index_name} 
                summary={data.summary} 
                messages={chatHistories.chat}
                onMessagesChange={(msgs) => onChatHistoryUpdate('chat', msgs)}
                activeTab={activeTab}
              />
          </div>
        )}
        
        {/* For Viz and Excel, we might want to show Viz/Excel content AND the chat below or to the side. 
            The user requested "page in chat mode". I will interpret this as maintaining the chat interface 
            but maybe changing the endpoint it hits, as implemented in ChatInterface.
        */}
        {activeTab === 'viz' && (
           <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
              {/* Chat Interface takes remaining space */}
              <div style={{flex: 1, minHeight: 0, position: 'relative'}}>
                <ChatInterface 
                    indexName={data.index_name} 
                    summary={null} // Don't re-summarize in this mode
                    messages={chatHistories.viz}
                    onMessagesChange={(msgs) => onChatHistoryUpdate('viz', msgs)}
                    activeTab={activeTab}
                />
              </div>
           </div>
        )}
        
        {activeTab === 'excel' && (
           <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
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


// Simple Tab Button Sub-component
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`tab-button ${active ? 'active' : 'inactive'}`}
  >
    {icon}
    {label}
  </button>
);

export default ResultsPanel;