import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import ScriptRunnerPage from './pages/ScriptRunnerPage';
import LearnPage from './pages/LearnPage';
import PheTKWizardPage from './pages/PheTKWizardPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-brand">
            <img src="/robot.png" alt="RoboCode Logo" style={{ width: '36px', height: '36px', animation: 'spin 10s linear infinite' }} />
            <span className="text-gradient">RoboCode</span>
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/learn" className="nav-link">Learn Python</Link>
            <Link to="/phetk-wizard" className="nav-link" style={{ background: 'var(--accent-gradient)', color: 'white', padding: '0.5rem 1rem', borderRadius: '2rem' }}>PheTK Wizard</Link>
            <Link to="/runner" className="btn btn-primary" style={{ padding: '0.5rem 1rem', marginLeft: '1rem', color: 'white' }}>
              Launch Editor
            </Link>
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
