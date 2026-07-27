import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Code2, LineChart, Zap, BookOpen, Activity } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="hero-section" style={{ maxWidth: '1200px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Left text content */}
        <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
          <h1 className="hero-title" style={{ textAlign: 'left', fontSize: '4.5rem' }}>
            Welcome to <br />
            <span className="text-gradient">RoboCode</span>
          </h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: '100%' }}>
            A powerful, beautiful AI-themed environment to execute your Python scripts, view terminal logs, and visualize plots all in one place. No setup required.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/runner" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              <Play size={20} />
              Start Coding
            </Link>
            <a href="#features" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Learn More
            </a>
          </div>
        </div>

        {/* Right robot image */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/robot.png" 
            alt="AI Robot Character" 
            style={{ 
              width: '100%', 
              maxWidth: '450px', 
              animation: 'fadeIn 1.5s ease-out, float 6s ease-in-out infinite',
              filter: 'drop-shadow(var(--glow))',
              transform: 'scale(1.05)'
            }} 
          />
        </div>

      </div>

      <div id="features" className="features-grid">
        <div className="glass-card feature-card">
          <div className="feature-icon">
            <Code2 size={24} />
          </div>
          <h3>Powerful Editor</h3>
          <p>Write or paste your Python code into our clean, syntax-aware editor designed for focus.</p>
        </div>
        <div className="glass-card feature-card">
          <div className="feature-icon">
            <LineChart size={24} />
          </div>
          <h3>Instant Visualization</h3>
          <p>Generate plots using matplotlib and see them rendered directly in your dashboard.</p>
        </div>
        <div className="glass-card feature-card">
          <div className="feature-icon">
            <Zap size={24} />
          </div>
          <h3>Lightning Fast</h3>
          <p>Powered by a Node.js backend to execute your scripts with minimal latency.</p>
        </div>
        <div className="glass-card feature-card" style={{ border: '1px solid var(--accent-color)' }}>
          <div className="feature-icon">
            <BookOpen size={24} />
          </div>
          <h3>New to Python?</h3>
          <p>Our interactive tutorials will get you up and running in minutes.</p>
          <Link to="/learn" className="btn" style={{ background: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)', marginTop: '1rem' }}>
            Start Learning
          </Link>
        </div>
        <div className="glass-card feature-card" style={{ border: '1px solid var(--accent-color)' }}>
          <div className="feature-icon">
            <Activity size={24} />
          </div>
          <h3>PheWAS Pipeline</h3>
          <p>Run massive Phenome-Wide Association Studies with our step-by-step visual wizard.</p>
          <Link to="/phetk-wizard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Launch Wizard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
