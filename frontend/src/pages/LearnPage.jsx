import React, { useState } from 'react';
import { BookOpen, Copy, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { SoundButton } from '../components/SoundButton';
import { Link } from 'react-router-dom';

const CodeSnippet = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{ padding: 0, marginBottom: '2rem', overflow: 'hidden' }}>
      <div style={{ padding: '0.5rem 1rem', background: '#334155', borderBottom: '1px solid #475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9' }}>{title}</h3>
        <SoundButton 
          onClick={copyToClipboard}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
        >
          {copied ? <CheckCircle2 size={14} color="#10b981" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </SoundButton>
      </div>
      <div className="code-editor" style={{ background: 'rgba(255,255,255,0.8)', padding: '1rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: 'monospace' }}>{code}</pre>
      </div>
    </div>
  );
};

const LearnPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    { title: "1. Hello World & Math" },
    { title: "2. Variables and Lists" },
    { title: "3. Data Science with Pandas" },
    { title: "4. Advanced: PheWAS Analysis (PheTK)" }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="feature-icon" style={{ margin: '0 auto 1.5rem auto' }}>
          <BookOpen size={28} />
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          Learn <span className="text-gradient">Python Basics</span>
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
          Welcome to your first steps in Python! Here are some basic concepts you can try right now in RoboCode.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
        <Link to="/runner" className="btn btn-primary">
          <Play size={18} /> Open Editor to Practice
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
        {lessons.map((lesson, index) => (
          <SoundButton
            key={index}
            onClick={() => setActiveLesson(index)}
            style={{
              padding: '1rem',
              textAlign: 'left',
              background: activeLesson === index ? 'var(--bg-secondary)' : 'transparent',
              border: '1px solid',
              borderColor: activeLesson === index ? 'var(--accent-color)' : 'transparent',
              borderRadius: '0.5rem',
              color: activeLesson === index ? 'var(--accent-color)' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontWeight: activeLesson === index ? 600 : 400 }}>{lesson.title}</span>
            {activeLesson === index && <ChevronRight size={16} />}
          </SoundButton>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
# Loop through the list
for planet in planets:
    print(f"Welcome to {planet}!")`}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb color="var(--accent-color)" />
          <h2 style={{ margin: 0 }}>3. Data Science with Pandas</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          RoboCode supports rich HTML rendering for Pandas tables. Try this out!
        </p>
        <CodeSnippet 
          title="Pandas DataFrame" 
          code={`import pandas as pd

# Create a dictionary of data
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Paris']
}

# Create a DataFrame
df = pd.DataFrame(data)

# Put the variable at the end to render it beautifully!
df`}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb color="var(--accent-color)" />
          <h2 style={{ margin: 0 }}>4. Advanced: PheWAS Analysis (PheTK)</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Run Phenome Wide Association Studies directly in the browser! Copy and run these cells one by one.
        </p>
        <CodeSnippet 
          title="Cell 1: Create Demo Input" 
          code={`from PheTK.Demo import generate_examples

# Create demo input files for analysis
print("Generating demo data...")
generate_examples(var_type="binary", data_has_both_sexes=True)
print("Data generation complete!")`}
        />
        <CodeSnippet 
          title="Cell 2: Run PheWAS Analysis" 
          code={`from PheTK.PheWAS import PheWAS

print("Starting PheWAS analysis...")
phewas = PheWAS(
    cohort_csv_path="example_cohort.csv",
    phecode_count_csv_path="example_phecode_counts.csv",
    phecode_version="X",
    sex_at_birth_col="sex",
    covariate_cols=["age", "sex", "pc1", "pc2", "pc3"],
    independent_variable_of_interest="independent_variable_of_interest",
    min_cases=50,
    min_phecode_count=2,
    output_file_name="example_phewas_results.csv",
    verbose=True
)

phewas.run()
print("Analysis complete!")`}
        />
        <CodeSnippet 
          title="Cell 3: Show the Results" 
          code={`import polars as pl

# Load the results and display the top 10 most significant associations
results = pl.read_csv("example_phewas_results.csv", dtypes={"phecode": str})
top_results = results.sort(by="p_value").head(10)

# Render it beautifully
top_results`}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.5)', borderRadius: '1rem' }}>
        <img src="/robot.png" alt="Robot" style={{ width: '80px', animation: 'floatSmall 4s ease-in-out infinite', filter: 'drop-shadow(var(--glow))' }} />
        <h3>Ready to build amazing things?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Head over to the Script Runner and let your imagination run wild.</p>
      </div>
    </div>
  );
};

export default LearnPage;
