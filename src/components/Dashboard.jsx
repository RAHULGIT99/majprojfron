import React, { useState, useEffect } from 'react';
import UrlInputPanel from './UrlInputPanel';
import ResultsPanel from './ResultsPanel';

const Dashboard = () => {
  // Load initial state from localStorage if available
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem('dashboard_urls');
    return saved ? JSON.parse(saved) : [""];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [analysisData, setAnalysisData] = useState(() => {
    const saved = localStorage.getItem('dashboard_analysisData');
    return saved ? JSON.parse(saved) : null;
  });

  const [chatHistories, setChatHistories] = useState(() => {
    const saved = localStorage.getItem('dashboard_chatHistories');
    // Ensure structure is correct even if loaded from old state format or empty
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      chat: parsed.chat || [],
      viz: parsed.viz || [],
      excel: parsed.excel || []
    };
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard_urls', JSON.stringify(urls));
  }, [urls]);

  useEffect(() => {
    if (analysisData) {
      localStorage.setItem('dashboard_analysisData', JSON.stringify(analysisData));
    } else {
      localStorage.removeItem('dashboard_analysisData');
    }
  }, [analysisData]);

  useEffect(() => {
    localStorage.setItem('dashboard_chatHistories', JSON.stringify(chatHistories));
  }, [chatHistories]);

  // Migration helper: clear old single-chat storage if it exists to avoid confusion
  useEffect(() => {
    localStorage.removeItem('dashboard_chatMessages');
  }, []);

  const handleAnalysisResult = (data) => {
    if (data && data.success) {
      setAnalysisData({
        index_name: data.index_name,
        summary: data.summary
      });
      setChatHistories({ chat: [], viz: [], excel: [] }); 
    }
  };

  const handleNewAnalysis = () => {
      setUrls([""]);
      setAnalysisData(null);
      setChatHistories({ chat: [], viz: [], excel: [] });
      localStorage.removeItem('dashboard_urls');
      localStorage.removeItem('dashboard_analysisData');
      localStorage.removeItem('dashboard_chatHistories');
  };

  return (
    <div className="app-container" style={{display: 'flex', height: 'calc(100vh - 60px)'}}> 
      {/* 60px is approx navbar height */}
      
      {/* LHS: Control Panel (30%) */}
      <div className="control-panel" style={{ width: '30%', borderRight: '1px solid #ddd', padding: '1rem', overflow: 'hidden' }}>
        <UrlInputPanel 
          urls={urls} 
          setUrls={setUrls} 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAnalysisData={(data) => {
             setAnalysisData(data);
             if (data) setChatHistories({ chat: [], viz: [], excel: [] });
          }}
          onNewAnalysis={handleNewAnalysis}
        />
      </div>

      {/* RHS: Workspace (70%) */}
      <div className="workspace" style={{ width: '70%', padding: '1rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ResultsPanel 
          isLoading={isLoading} 
          data={analysisData}
          chatHistories={chatHistories}
          onChatHistoryUpdate={(tab, msgs) => {
            setChatHistories(prev => ({
              ...prev,
              [tab]: msgs
            }));
          }} 
        />
      </div>
    </div>
  );
};


export default Dashboard;
