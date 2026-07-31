import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Copy, CheckCircle2, Play, Activity, SquareTerminal, Loader2, MousePointer2 } from 'lucide-react';

const stages = [
  {
    id: 'learn',
    title: "1. The Viewer Learns",
    description: "The viewer browses the Interactive Curriculum. Here, they are reading about data science fundamentals and preparing to copy a Python code snippet.",
    cursorPosition: { top: '35%', left: '75%' },
    cursorClick: false
  },
  {
    id: 'copy',
    title: "2. The Viewer Copies",
    description: "The viewer finds an interesting algorithm and clicks 'Copy'. All code snippets are fully copy-pasteable so users can learn quickly by experimenting.",
    cursorPosition: { top: '35%', left: '75%' },
    cursorClick: true
  },
  {
    id: 'editor',
    title: "3. Launching the Editor",
    description: "The viewer opens the powerful RoboCode Editor and pastes the code. This world-class, VS-Code powered editor features syntax highlighting and an AI assistant.",
    cursorPosition: { top: '15%', left: '85%' },
    cursorClick: false
  },
  {
    id: 'execution',
    title: "4. Executing the Script",
    description: "The viewer executes the script directly in their browser. The code runs securely on our backend servers, delivering real-time terminal output.",
    cursorPosition: { top: '15%', left: '85%' },
    cursorClick: true
  }
];

const InteractiveWalkthrough = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const stageDuration = 4000; // 4 seconds per stage
    
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % stages.length);
    }, stageDuration);
    
    return () => clearInterval(interval);
  }, []);

  // Sync cursor click animation with stage definition
  useEffect(() => {
    if (stages[currentStageIndex].cursorClick) {
      const clickTimer = setTimeout(() => setIsClicking(true), 1000);
      const unclickTimer = setTimeout(() => setIsClicking(false), 1500);
      return () => { clearTimeout(clickTimer); clearTimeout(unclickTimer); }
    } else {
      setIsClicking(false);
    }
  }, [currentStageIndex]);

  const currentStage = stages[currentStageIndex];

  return (
    <div style={{ maxWidth: '1200px', margin: '6rem auto', padding: '0 2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>See It In Action</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: Dynamic Text Description */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-gradient)', color: 'white', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  Step {currentStageIndex + 1} of 4
                </span>
              </div>
              <h3 style={{ fontSize: '2rem', margin: '0' }}>{currentStage.title}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {currentStage.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
            {stages.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  height: '4px', 
                  flex: 1, 
                  background: idx === currentStageIndex ? 'var(--accent-color)' : 'var(--border-color)',
                  borderRadius: '2px',
                  transition: 'background 0.3s ease'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: Simulated Screen Recording */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
          <div className="glass-card" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            {/* Fake macOS Header */}
            <div style={{ background: '#1e293b', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottom: '1px solid #334155' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>robocode-app.local</div>
            </div>

            {/* Fake Screen Content */}
            <div style={{ flex: 1, position: 'relative', background: 'var(--bg-primary)' }}>
              <AnimatePresence mode="wait">
                
                {/* Learn / Copy State */}
                {(currentStage.id === 'learn' || currentStage.id === 'copy') && (
                  <motion.div 
                    key="learn-view"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}><BookOpen /> <h2>Interactive Curriculum</h2></div>
                    <div style={{ background: '#334155', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', borderRadius: '0.5rem 0.5rem 0 0' }}>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pandas DataFrame</span>
                      <div style={{ color: currentStage.id === 'copy' ? '#10b981' : '#94a3b8', fontSize: '0.8rem', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                        {currentStage.id === 'copy' ? <CheckCircle2 size={14}/> : <Copy size={14}/>} 
                        {currentStage.id === 'copy' ? 'Copied!' : 'Copy'}
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', flex: 1, padding: '1rem', borderRadius: '0 0 0.5rem 0.5rem', fontFamily: 'monospace', color: '#38bdf8', fontSize: '0.85rem' }}>
                      import pandas as pd<br/>
                      data = {'{'} 'Name': ['Alice', 'Bob'] {'}'}<br/>
                      df = pd.DataFrame(data)<br/>
                      df
                    </div>
                  </motion.div>
                )}

                {/* Editor / Execution State */}
                {(currentStage.id === 'editor' || currentStage.id === 'execution') && (
                  <motion.div 
                    key="editor-view"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}><SquareTerminal /> <h2>Editor</h2></div>
                      <div style={{ padding: '0.5rem 1rem', background: 'var(--accent-gradient)', borderRadius: '999px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {currentStage.id === 'execution' && isClicking ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} Run Script
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', flex: 1, padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: '#38bdf8', fontSize: '0.85rem' }}>
                      import pandas as pd<br/>
                      data = {'{'} 'Name': ['Alice', 'Bob'] {'}'}<br/>
                      df = pd.DataFrame(data)<br/>
                      df
                    </div>
                    {currentStage.id === 'execution' && !isClicking && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} style={{ background: '#020617', padding: '1rem', color: '#a7f3d0', fontFamily: 'monospace', fontSize: '0.8rem', borderTop: '1px solid #334155' }}>
                        &gt; Executing Script...<br/>
                        &gt; HTML Render Output: Successful<br/>
                        &gt; Process exited with code 0.
                      </motion.div>
                    )}
                  </motion.div>
                )}

                
              </AnimatePresence>
            </div>

            {/* Fake Cursor Overlay */}
            <motion.div
              animate={{ 
                top: currentStage.cursorPosition.top, 
                left: currentStage.cursorPosition.left,
                scale: isClicking ? 0.8 : 1
              }}
              transition={{ 
                top: { duration: 1.5, ease: "easeInOut" },
                left: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 0.1 }
              }}
              style={{ position: 'absolute', zIndex: 50, pointerEvents: 'none' }}
            >
              <MousePointer2 size={28} fill="black" color="white" strokeWidth={1.5} />
              {isClicking && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}
                />
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWalkthrough;
