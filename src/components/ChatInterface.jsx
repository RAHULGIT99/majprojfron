// components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import './ChatInterface.css';

const ChatInterface = ({ indexName, summary, messages, onMessagesChange, activeTab }) => {
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), role: 'user', text: question };
    const updatedMessages = [...messages, userMsg];
    onMessagesChange(updatedMessages);

    setQuestion("");
    setIsAsking(true);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: {} };
      if (token) config.headers['Authorization'] = `Bearer ${token}`;

      let endpoint = 'http://localhost:8000/ask';
      let payload = {};
      let aiMsg = { id: Date.now() + 1, role: 'ai', text: "" };

      // --- LOGIC PER TAB ---
      if (activeTab === 'viz') {
          endpoint = 'http://localhost:8000/visuals';
          payload = {
              query: userMsg.text,
              index: indexName // Matches Backend 'index' field
          };

          // Call API
          const response = await axios.post(endpoint, payload, config);
          
          // Handle Visualization Response
          // Expected: { task: "...", visualization_type: "...", images: ["base64..."] }
          aiMsg.text = `Generated ${response.data.visualization_type}: ${response.data.task}`;
          aiMsg.images = response.data.images; // Store images in the message object
          aiMsg.isVisual = true;

      } else if (activeTab === 'excel') {
          // Placeholder for future Excel logic
          endpoint = 'http://localhost:8000/excel';
          payload = { query: userMsg.text, index: indexName };
          const response = await axios.post(endpoint, payload, config);
          aiMsg.text = response.data.message || JSON.stringify(response.data);

      } else {
          // Default: Chat / Summary
          endpoint = 'http://localhost:8000/ask';
          payload = { index_name: indexName, question: userMsg.text };
          const response = await axios.post(endpoint, payload, config);
          aiMsg.text = response.data.answer;
      }

      // Update state with the new AI message
      onMessagesChange([...updatedMessages, aiMsg]);

    } catch (error) {
      console.error("Chat Error", error);
      onMessagesChange([...updatedMessages, { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: "Error: Could not fetch result. Please try again." 
      }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Messages Area */}
      <div className="messages-area">
        
        {/* Render Summary ONLY for Chat Tab */}
        {activeTab === 'chat' && summary && (
          <div className="message-wrapper ai">
            <div className="message-bubble ai">
              <div style={{whiteSpace: 'pre-wrap'}}>
                <strong>Analysis Complete.</strong>
                <br /><br />
                Here is the summary:
                <br />
                {summary}
              </div>
            </div>
          </div>
        )}

        {/* Message Loop */}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}
          >
            <div className={`message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              
              {/* Text Content */}
              <div style={{whiteSpace: 'pre-wrap'}}>{msg.text}</div>

              {/* Visualization Images (Only if present) */}
              {msg.isVisual && msg.images && (
                <div className="viz-images-container" style={{ marginTop: '10px' }}>
                  {msg.images.map((imgStr, idx) => (
                    <img 
                      key={idx}
                      src={`data:image/png;base64,${imgStr}`} 
                      alt={`Visualization ${idx}`}
                      style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}

        {isAsking && (
           <div className="thinking-indicator-wrapper">
             <div className="thinking-indicator">
               Processing...
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleAsk} className="input-area">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={activeTab === 'viz' ? "Describe the chart you want..." : "Ask a question..."}
          disabled={isAsking}
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={isAsking || !question.trim()}
          className="send-btn"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;