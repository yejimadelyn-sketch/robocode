import React, { useState, useEffect } from 'react';
import { Play, Code2, LineChart, Activity, BookOpen, ChevronRight, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { SoundLink } from '../components/SoundButton';
import InteractiveWalkthrough from '../components/InteractiveWalkthrough';

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

const AnimatedBackground = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: -1, pointerEvents: 'none' }}>
    <motion.div
      animate={{ 
        x: [0, 100, -100, 0], 
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.9, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)', borderRadius: '50%'
      }}
    />
    <motion.div
      animate={{ 
        x: [0, -120, 120, 0], 
        y: [0, 120, -120, 0],
        scale: [1, 1.3, 0.8, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)', borderRadius: '50%'
      }}
    />
    <motion.div
      animate={{ 
        x: [0, 80, -80, 0], 
        y: [0, 80, -80, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute', top: '40%', left: '40%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)', borderRadius: '50%'
      }}
    />
  </div>
);

const HowToUseSection = () => (
  <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>How It Works</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ background: 'var(--accent-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>1</div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Learn the Basics</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Start in the Interactive Curriculum to learn Python fundamentals. You'll understand variables, loops, and data science libraries like Pandas.</p>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ background: 'var(--accent-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>2</div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Write Your Code</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Open the powerful RoboCode Editor to write and execute your own Python scripts directly in your browser. Stuck? Ask the AI Assistant for help.</p>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ background: 'var(--accent-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>3</div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Run Advanced Analytics</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Use the no-code PheTK Wizard to upload CSV files, automatically translate ICD codes, and generate professional Manhattan plots instantly.</p>
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div style={{ paddingBottom: '4rem', position: 'relative' }}>
      <AnimatedBackground />
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
        {/* Beginner Explanations Banner */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem', maxWidth: '900px', margin: '0 auto 2.5rem auto', textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💻 What is Python?</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>Python is the most popular programming language for Data Science. It uses plain English words, making it the easiest language for beginners to learn!</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🧬 What is PheWAS?</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>A <i>Phenome-Wide Association Study</i>. It lets scientists analyze if a single variable (like a gene mutation) is connected to thousands of different human illnesses.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <SoundLink to="/runner" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Open Code Editor <ChevronRight size={20} />
          </SoundLink>
          <SoundLink to="/phetk-wizard" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--bg-card)' }}>
            Launch PheTK Wizard
          </SoundLink>
        </div>
      </motion.div>

      <InteractiveWalkthrough />

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

      <HowToUseSection />
    </div>
  );
};

export default LandingPage;
