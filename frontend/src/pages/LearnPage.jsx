import React from 'react';
import { BookOpen, Code, Lightbulb, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeSnippet = ({ title, code }) => (
  <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <h3 style={{ margin: 0, color: 'var(--accent-color)' }}>{title}</h3>
      <button 
        className="btn btn-secondary" 
        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        onClick={() => navigator.clipboard.writeText(code)}
      >
        <Code size={14} /> Copy
      </button>
    </div>
    <div className="code-editor" style={{ background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px', minHeight: 'auto', pointerEvents: 'none' }}>
      <pre style={{ margin: 0 }}>{code}</pre>
    </div>
  </div>
);

const LearnPage = () => {
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb color="var(--accent-color)" />
          <h2 style={{ margin: 0 }}>1. Hello World & Math</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Python is great for simple math and printing text to the screen.
        </p>
        <CodeSnippet 
          title="Print and Math" 
          code={`# Let's print a message
print("Hello from RoboCode!")

# Math is easy in Python
x = 10
y = 5
print(f"10 plus 5 is {x + y}")`}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb color="var(--accent-color)" />
          <h2 style={{ margin: 0 }}>2. Variables and Lists</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          You can store data in variables and create lists of items.
        </p>
        <CodeSnippet 
          title="Working with Lists" 
          code={`# Create a list of planets
planets = ["Earth", "Mars", "Jupiter"]

# Add a new planet
planets.append("Saturn")

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
