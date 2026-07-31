import React from 'react';
import { Play, Code2, LineChart, Activity, BookOpen, ChevronRight, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { SoundLink } from '../components/SoundButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const LandingPage = () => {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} /> Enterprise Grade
          </span>
          <span style={{ padding: '0.5rem 1rem', background: 'rgba(220, 39, 67, 0.1)', color: 'var(--accent-color)', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={16} /> AI Powered
          </span>
        </div>
        <h1 className="hero-title">
          Master Python & <span className="text-gradient">PheWAS Analysis</span>
        </h1>
        <p className="hero-subtitle">
          An all-in-one educational platform and professional data science suite. 
          Learn the fundamentals of Python programming, write scripts in a world-class editor, and execute massive Phenome-Wide Association Studies instantly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <SoundLink to="/runner" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Open Code Editor <ChevronRight size={20} />
          </SoundLink>
          <SoundLink to="/phetk-wizard" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--bg-card)' }}>
            Launch PheTK Wizard
          </SoundLink>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="glass-card feature-card" variants={itemVariants} style={{ borderTop: '4px solid var(--accent-color)' }}>
          <div className="feature-icon" style={{ background: 'var(--accent-gradient)' }}>
            <Activity size={24} />
          </div>
          <h3>The PheTK Wizard</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Execute complex statistical biology algorithms without writing a single line of code. Our visual 4-step wizard connects directly to our Python backend to translate raw ICD codes into standardized Phecodes, perform multithreaded logistic regression, and generate beautiful Manhattan plots.
          </p>
          <SoundLink to="/phetk-wizard" className="btn" style={{ width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            Start Analysis
          </SoundLink>
        </motion.div>

        <motion.div className="glass-card feature-card" variants={itemVariants} style={{ borderTop: '4px solid #3b82f6' }}>
          <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #2563eb, #3b82f6)' }}>
            <Code2 size={24} />
          </div>
          <h3>Educational IDE</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Our web-based Code Editor is powered by the exact same engine as VS Code. It features real-time syntax highlighting, intelligent auto-complete, and a built-in AI debugging assistant to help you learn Python faster and write better scripts.
          </p>
          <SoundLink to="/runner" className="btn" style={{ width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            Launch Editor
          </SoundLink>
        </motion.div>

        <motion.div className="glass-card feature-card" variants={itemVariants} style={{ borderTop: '4px solid #10b981' }}>
          <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #059669, #10b981)' }}>
            <BookOpen size={24} />
          </div>
          <h3>Interactive Curriculum</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Whether you are a complete beginner to variables and loops, or a seasoned researcher looking to learn the `PheTK` Python library programmatically, our Interactive Learning Center provides copy-pasteable lessons to accelerate your learning.
          </p>
          <SoundLink to="/learn" className="btn" style={{ width: '100%', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            View Curriculum
          </SoundLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
