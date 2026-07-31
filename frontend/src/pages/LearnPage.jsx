import React, { useState } from 'react';
import { BookOpen, Copy, CheckCircle2, ChevronRight, Play, Lightbulb, Code } from 'lucide-react';
import { SoundButton, SoundLink } from '../components/SoundButton';

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
    { title: "1. Python Dictionary (Keywords)" },
    { title: "2. Hello World & Math" },
    { title: "3. Variables and Lists" },
    { title: "4. Control Flow (If / Else)" },
    { title: "5. Loops (For / While)" },
    { title: "6. Functions" },
    { title: "7. Dictionaries & Sets" },
    { title: "8. Data Science with Pandas" }
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
          Welcome to your first steps in Python! Explore the dictionary and examples below, and copy the code to try in the Editor.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
        <SoundLink to="/runner" className="btn btn-primary">
          <Play size={18} /> Open Editor to Practice
        </SoundLink>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem', marginBottom: '3rem' }}>
        {lessons.map((lesson, index) => (
          <SoundButton
            key={index}
            onClick={() => setActiveLesson(index)}
            style={{
              padding: '1rem',
              textAlign: 'left',
              background: activeLesson === index ? 'var(--bg-secondary)' : 'transparent',
              border: '1px solid',
              borderColor: activeLesson === index ? 'var(--accent-color)' : 'var(--border-color)',
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
        
        {activeLesson === 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Code color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Python Keyword Dictionary</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>A quick reference guide for common Python keywords and syntax.</p>
            <ul style={{ color: 'var(--text-primary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li><strong>print()</strong>: Outputs text or variables to the console.</li>
              <li><strong>def</strong>: Used to define a function.</li>
              <li><strong>return</strong>: Exits a function and returns a value.</li>
              <li><strong>if / elif / else</strong>: Used for conditional logic and decision making.</li>
              <li><strong>for / while</strong>: Used to create loops that repeat code.</li>
              <li><strong>import</strong>: Imports an external module or library (like <i>pandas</i> or <i>math</i>).</li>
              <li><strong>list</strong>: A mutable array of items, created using brackets <code>[]</code>.</li>
              <li><strong>dict</strong>: A key-value map, created using curly braces <code>{}</code>.</li>
            </ul>
          </div>
        )}

        {activeLesson === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Hello World & Math</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Python is great for simple math and printing text to the screen.</p>
            <CodeSnippet 
              title="Print and Math" 
              code={`# Let's print a message\nprint("Hello from RoboCode!")\n\n# Math is easy in Python\nx = 10\ny = 5\nprint(f"10 plus 5 is {x + y}")`}
            />
          </div>
        )}

        {activeLesson === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Variables and Lists</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>You can store data in variables and create lists of items.</p>
            <CodeSnippet 
              title="Working with Lists" 
              code={`# Create a list of planets\nplanets = ["Earth", "Mars", "Jupiter"]\n\n# Add a new planet\nplanets.append("Saturn")\n\n# Access items by index\nprint("The first planet is:", planets[0])`}
            />
          </div>
        )}

        {activeLesson === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Control Flow (If / Else)</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Use conditions to execute different blocks of code.</p>
            <CodeSnippet 
              title="Conditional Logic" 
              code={`temperature = 75\n\nif temperature > 80:\n    print("It's a hot day!")\nelif temperature > 60:\n    print("It's a perfect day!")\nelse:\n    print("It's a bit chilly.")`}
            />
          </div>
        )}

        {activeLesson === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Loops (For / While)</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Loops let you repeat code efficiently.</p>
            <CodeSnippet 
              title="For and While Loops" 
              code={`# For loop through a range of numbers\nfor i in range(3):\n    print(f"Iteration {i}")\n\n# While loop\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Liftoff!")`}
            />
          </div>
        )}

        {activeLesson === 5 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Functions</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Functions are reusable blocks of code.</p>
            <CodeSnippet 
              title="Defining Functions" 
              code={`def calculate_area(width, height):\n    """Returns the area of a rectangle"""\n    return width * height\n\narea = calculate_area(5, 10)\nprint(f"The area is {area}")`}
            />
          </div>
        )}

        {activeLesson === 6 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Dictionaries & Sets</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Dictionaries hold key-value pairs, while Sets hold unique items.</p>
            <CodeSnippet 
              title="Dicts and Sets" 
              code={`# Dictionary\nstudent = {"name": "Alice", "grade": "A"}\nprint(f"{student['name']} got an {student['grade']}")\n\n# Set\nunique_numbers = {1, 2, 2, 3}\nprint("Unique numbers:", unique_numbers) # Notice the 2 is only printed once`}
            />
          </div>
        )}

        {activeLesson === 7 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Lightbulb color="var(--accent-color)" />
              <h2 style={{ margin: 0 }}>Data Science with Pandas</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>RoboCode supports rich HTML rendering for Pandas tables. Try this out!</p>
            <CodeSnippet 
              title="Pandas DataFrame" 
              code={`import pandas as pd\n\n# Create a dictionary of data\ndata = {\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35],\n    'City': ['New York', 'London', 'Paris']\n}\n\n# Create a DataFrame\ndf = pd.DataFrame(data)\n\n# Put the variable at the end to render it beautifully!\ndf`}
            />
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem' }}>
        <img src="/robot.png" alt="Robot" style={{ width: '80px', animation: 'floatSmall 4s ease-in-out infinite', filter: 'drop-shadow(var(--glow))' }} />
        <h3>Ready to build amazing things?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Head over to the Script Runner and let your imagination run wild.</p>
      </div>
    </div>
  );
};

export default LearnPage;
