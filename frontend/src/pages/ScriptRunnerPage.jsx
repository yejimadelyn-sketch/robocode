import React, { useState } from 'react';
import { Play, SquareTerminal, Image as ImageIcon, Loader2, Bot, X, Send } from 'lucide-react';

const ScriptRunnerPage = () => {
  const [code, setCode] = useState('# Write or paste your Python code here\nprint("Hello from Python!")\n');
  const [logs, setLogs] = useState('');
  const [errorLogs, setErrorLogs] = useState('');
  const [images, setImages] = useState([]);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // AI Helper State
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hi there! I am your AI assistant. Paste any errors you get here, and I will help you fix them!' }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message
    const newHistory = [...chatHistory, { role: 'user', content: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatMessage,
          chatHistory: chatHistory, // Send previous history without the new message
          code: code,
          errorLogs: errorLogs
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', content: 'Oops! Something went wrong: ' + (data.error || 'Unknown error') }]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Failed to connect to the AI backend.' }]);
    }
  };

  const handleRunScript = async () => {
    setIsLoading(true);
    setLogs('');
    setErrorLogs('');
    setImages([]);
    setHtmlOutput('');

    try {
      const response = await fetch('http://localhost:3001/api/run-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.stdout) setLogs(data.stdout);
      if (data.stderr) setErrorLogs(data.stderr);
      if (data.html) setHtmlOutput(data.html);
      if (data.images && data.images.length > 0) {
        setImages(data.images);
      }
    } catch (error) {
      setErrorLogs(`Error connecting to the backend: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="runner-layout">
      {/* Editor Panel */}
      <div className="panel">
        <div className="panel-header">
          <h2><SquareTerminal size={20} /> Python Editor</h2>
          <button 
            className="btn btn-primary" 
            onClick={handleRunScript}
            disabled={isLoading}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {isLoading ? 'Running...' : 'Run Script'}
          </button>
        </div>
        <div className="panel-body">
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="print('Hello World')"
          />
        </div>
      </div>

      {/* Terminal Panel */}
      <div className="panel">
        <div className="panel-header" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
          <h2><SquareTerminal size={20} /> Terminal Output</h2>
        </div>
        
        <div className="panel-body">
          <div className="tab-content" style={{ display: 'block', height: '100%' }}>
            {(!logs && !errorLogs && !htmlOutput && !isLoading) ? (
              <div className="empty-state">
                <img src="/robot.png" alt="RoboCode Ready" style={{ width: '120px', animation: 'floatSmall 4s ease-in-out infinite', filter: 'drop-shadow(var(--glow))', marginBottom: '1rem' }} />
                <p>Hello! I am RoboCode.<br/>Run a script to see the output here.</p>
              </div>
            ) : (
              <>
                {logs && <div className="log-output">{logs}</div>}
                {errorLogs && <div className="log-output log-error">{errorLogs}</div>}
                {htmlOutput && <div className="rich-output" dangerouslySetInnerHTML={{ __html: htmlOutput }} />}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Plots Panel */}
      <div className="panel">
        <div className="panel-header" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
          <h2>
            <ImageIcon size={20} /> Plots & Animations
            {images.length > 0 && (
              <span style={{ 
                background: 'var(--accent-color)', 
                color: 'white', 
                borderRadius: '50%', 
                padding: '2px 6px', 
                fontSize: '12px', 
                marginLeft: '8px' 
              }}>
                {images.length}
              </span>
            )}
          </h2>
        </div>
        
        <div className="panel-body">
          <div className="tab-content" style={{ display: 'block', height: '100%' }}>
            {images.length === 0 ? (
              <div className="empty-state">
                <img src="/robot.png" alt="No Plots" style={{ width: '100px', opacity: 0.8, animation: 'floatSmall 4s ease-in-out infinite', filter: 'grayscale(0.3)', marginBottom: '1rem' }} />
                <p>No plots generated yet.<br/>Save a .png or .gif in your python script to see it here.</p>
              </div>
            ) : (
              <div className="plot-container">
                {images.map((imgUrl, index) => (
                  <img key={index} src={imgUrl} alt={`Plot ${index}`} className="plot-image" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Helper Floating Button & Chat */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {showChat && (
          <div className="glass-card" style={{ 
            width: '350px', 
            height: '400px', 
            marginBottom: '1rem', 
            display: 'flex', 
            flexDirection: 'column',
            padding: '0',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ padding: '1rem', background: 'var(--accent-gradient)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={20} />
                <span style={{ fontWeight: 600 }}>AI Assistant</span>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.8)' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#e2e8f0' : 'rgba(220, 39, 67, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  borderBottomRightRadius: msg.role === 'user' ? '0' : '0.75rem',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '0' : '0.75rem',
                }}>
                  {msg.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: 'white', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask for help..." 
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        <button 
          onClick={() => setShowChat(!showChat)}
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'var(--accent-gradient)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 39, 67, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
            transform: showChat ? 'scale(0.9)' : 'scale(1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = showChat ? 'scale(0.9)' : 'scale(1)'}
        >
          {showChat ? <X size={28} /> : <Bot size={28} />}
        </button>
      </div>
    </div>
  );
};

export default ScriptRunnerPage;
