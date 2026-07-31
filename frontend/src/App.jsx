import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LearnPage from './pages/LearnPage';
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
        
        <Header isDark={isDark} setIsDark={setIsDark} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
