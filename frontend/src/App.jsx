import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { SoundLink, SoundButton } from './components/SoundButton';
import LandingPage from './pages/LandingPage';
import ScriptRunnerPage from './pages/ScriptRunnerPage';
import LearnPage from './pages/LearnPage';
import PheTKWizardPage from './pages/PheTKWizardPage';
import './index.css';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className={`app-container ${isDark ? 'dark' : ''}`}>
        <Toaster position="top-right" toastOptions={{ 
          style: { 
            background: isDark ? '#1e293b' : '#fff', 
            color: isDark ? '#f8fafc' : '#0f172a',
            border: '1px solid var(--border-color)'
          } 
        }} />
        <nav className="navbar">
          <SoundLink to="/" className="nav-brand">
            <img src="/robot.png" alt="RoboCode Logo" style={{ width: '36px', height: '36px', animation: 'spin 10s linear infinite' }} />
            <span className="text-gradient">RoboCode</span>
          </SoundLink>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SoundLink to="/">Home</SoundLink>
            <SoundLink to="/learn" className="nav-link">Learn Python</SoundLink>
            <SoundLink to="/phetk-wizard" className="nav-link" style={{ background: 'var(--accent-gradient)', color: 'white', padding: '0.5rem 1rem', borderRadius: '999px' }}>PheTK Wizard</SoundLink>
            
            <SoundButton 
              onClick={() => setIsDark(!isDark)} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', padding: '0.5rem' }}
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </SoundButton>

            <SoundLink to="/runner" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', color: 'white' }}>
              Launch Editor
            </SoundLink>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/runner" element={<ScriptRunnerPage />} />
            <Route path="/phetk-wizard" element={<PheTKWizardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
