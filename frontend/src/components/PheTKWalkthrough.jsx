import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Play, BarChart2, Image as ImageIcon, CheckCircle2, Loader2, MousePointer2, Activity, FileText } from 'lucide-react';

const phetkStages = [
  {
    id: 'upload',
    title: "1. Upload Patient Data",
    description: "The researcher selects their Phenotype data (hospital ICD billing codes) and Cohort data (patient age, sex, and genetics) using standard CSV spreadsheets.",
    cursorPosition: { top: '30%', left: '40%' },
    cursorClick: true
  },
  {
    id: 'map',
    title: "2. Automatic Mapping",
    description: "With a single click, our Python backend translates thousands of messy hospital diagnostic codes into uniform, standardized research categories called Phecodes.",
    cursorPosition: { top: '85%', left: '70%' },
    cursorClick: true
  },
  {
    id: 'stats',
    title: "3. Statistical Regression",
    description: "The engine runs multithreaded logistic regression across all patients to determine if there is a statistical link between the trait of interest and each disease.",
    cursorPosition: { top: '85%', left: '70%' },
    cursorClick: true
  },
  {
    id: 'plot',
    title: "4. The Manhattan Plot",
    description: "The final analysis generates a publication-ready 'Manhattan Plot'. Each glowing dot represents a disease; dots rising above the threshold line indicate a discovered genetic connection!",
    cursorPosition: { top: '50%', left: '50%' },
    cursorClick: false
  }
];

const PheTKWalkthrough = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const stageDuration = 4500; // 4.5 seconds per stage
    
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % phetkStages.length);
    }, stageDuration);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phetkStages[currentStageIndex].cursorClick) {
      const clickTimer = setTimeout(() => setIsClicking(true), 1200);
      const unclickTimer = setTimeout(() => setIsClicking(false), 1700);
      return () => { clearTimeout(clickTimer); clearTimeout(unclickTimer); }
    } else {
      setIsClicking(false);
    }
  }, [currentStageIndex]);

  const currentStage = phetkStages[currentStageIndex];

  return (
    <div style={{ margin: '5rem auto', padding: '0 1rem', maxWidth: '1100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>
        Interactive <span className="text-gradient">Wizard Demo</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>
        Watch this simulated screen recording of a user completing a full Phenome-Wide Association Study inside our no-code wizard.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left Side: Dynamic Text Description */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ padding: '0.3rem 0.8rem', background: 'var(--accent-gradient)', color: 'white', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={14} /> Stage {currentStageIndex + 1} of 4
                </span>
              </div>
              <h3 style={{ fontSize: '1.8rem', margin: '0', color: 'var(--text-primary)' }}>{currentStage.title}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {currentStage.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem' }}>
            {phetkStages.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentStageIndex(idx)}
                style={{ 
                  height: '6px', 
                  flex: 1, 
                  background: idx === currentStageIndex ? 'var(--accent-color)' : 'var(--border-color)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: Simulated Screen Recording */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11' }}>
          <div className="glass-card" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            
            {/* Fake OS Header */}
            <div style={{ background: '#1e293b', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottom: '1px solid #334155' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>phetk-pipeline.robocode.app</div>
            </div>

            {/* Fake Wizard Content */}
            <div style={{ flex: 1, position: 'relative', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              
              {/* Fake Mini Progress Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {['1. Upload', '2. Map', '3. Stats', '4. Plot'].map((txt, i) => (
                  <span key={i} style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: i === currentStageIndex ? 'bold' : 'normal',
                    color: i === currentStageIndex ? 'var(--accent-color)' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: '0.3rem'
                  }}>
                    {i < currentStageIndex && <CheckCircle2 size={12} color="#10b981" />}
                    {txt}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Upload State */}
                {currentStage.id === 'upload' && (
                  <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText color="#3b82f6" /> <strong style={{ color: 'var(--text-primary)' }}>Select Input Files</strong></div>
                    <div style={{ padding: '0.75rem', border: '2px dashed #3b82f6', borderRadius: '0.5rem', background: 'rgba(59,130,246,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>phenotypes_hospital.csv</span>
                      <CheckCircle2 size={16} color="#10b981" />
                    </div>
                    <div style={{ padding: '0.75rem', border: '2px dashed #10b981', borderRadius: '0.5rem', background: 'rgba(16,185,129,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>patient_genetics_cohort.csv</span>
                      <CheckCircle2 size={16} color="#10b981" />
                    </div>
                  </motion.div>
                )}

                {/* Map & Stats State */}
                {(currentStage.id === 'map' || currentStage.id === 'stats') && (
                  <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ background: '#020617', flex: 1, borderRadius: '0.5rem', padding: '1rem', fontFamily: 'monospace', color: '#10b981', fontSize: '0.8rem', overflow: 'hidden' }}>
                      &gt; [SYSTEM] Reading cohort file (5,000 patients)...<br/>
                      &gt; [PHETK] Translating ICD-10 to Phecodes (Version X)...<br/>
                      {currentStage.id === 'stats' && (
                        <>
                          &gt; [STATS] Initializing logistic regressions...<br/>
                          &gt; [STATS] Multiprocessing cores active (8/8)...<br/>
                          &gt; [STATS] Association p-values computed successfully.
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Plot State */}
                {currentStage.id === 'plot' && (
                  <motion.div key="plt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <span style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>Output: manhattan_plot.png</span>
                    {/* Simulated visual plot dots */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', paddingBottom: '10px', borderBottom: '1px solid #475569', width: '90%', justifyContent: 'center' }}>
                      {[15, 35, 20, 40, 95, 110, 25, 30, 85, 20, 15, 45, 60, 25, 20, 15].map((h, index) => (
                        <div key={index} style={{
                          width: '8px',
                          height: `${h}%`,
                          background: h > 80 ? 'var(--accent-color)' : h > 40 ? '#3b82f6' : '#64748b',
                          borderRadius: '4px',
                          boxShadow: h > 80 ? '0 0 8px rgba(244,63,94,0.8)' : 'none',
                          transition: 'height 0.5s ease'
                        }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#e2e8f0' }}>
                      <span>🔴 Peak Significant Association (p &lt; 0.001)</span>
                      <span>🔵 Moderate Link</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fake Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                <div style={{ 
                  padding: '0.5rem 1.25rem', 
                  background: currentStage.id === 'plot' ? '#10b981' : 'var(--accent-gradient)', 
                  color: 'white', 
                  borderRadius: '0.5rem', 
                  fontSize: '0.85rem', 
                  fontWeight: '600',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  boxShadow: isClicking ? 'none' : '0 4px 10px rgba(0,0,0,0.3)',
                  transform: isClicking ? 'scale(0.96)' : 'scale(1)',
                  transition: 'all 0.2s ease'
                }}>
                  {currentStage.id === 'upload' && 'Upload & Map Data →'}
                  {currentStage.id === 'map' && 'Run PheWAS Stats →'}
                  {currentStage.id === 'stats' && 'Generate Manhattan Plot →'}
                  {currentStage.id === 'plot' && '✓ Analysis Complete'}
                </div>
              </div>

            </div>

            {/* Simulated Mouse Cursor */}
            <motion.div
              animate={{ 
                top: currentStage.cursorPosition.top, 
                left: currentStage.cursorPosition.left,
                scale: isClicking ? 0.8 : 1
              }}
              transition={{ 
                top: { duration: 1.4, ease: "easeInOut" },
                left: { duration: 1.4, ease: "easeInOut" },
                scale: { duration: 0.1 }
              }}
              style={{ position: 'absolute', zIndex: 50, pointerEvents: 'none' }}
            >
              <MousePointer2 size={26} fill="black" color="white" strokeWidth={1.5} />
              {isClicking && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }}
                />
              )}
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PheTKWalkthrough;
