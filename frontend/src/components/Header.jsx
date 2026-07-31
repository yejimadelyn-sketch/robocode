import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { SoundLink, SoundButton } from './SoundButton';

const Header = ({ isDark, setIsDark }) => {
  return (
    <nav className="navbar">
      <SoundLink to="/" className="nav-brand">
        <img src="/robot.png" alt="RoboCode Logo" style={{ width: '36px', height: '36px', animation: 'spin 10s linear infinite' }} />
        <span className="text-gradient">RoboCode</span>
      </SoundLink>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <SoundLink to="/">Home</SoundLink>
        <SoundLink to="/learn" className="nav-link">Learn Python</SoundLink>
        
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
  );
};

export default Header;
