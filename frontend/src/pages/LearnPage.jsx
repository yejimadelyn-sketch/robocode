import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import LessonSidebar from '../components/LessonSidebar';
import CodeEditor from '../components/CodeEditor';
import OutputConsole from '../components/OutputConsole';

const LESSONS = [
  {
    title: "1. Hello World",
    starterCode: "# Let's print a message to the console\nprint(\"Hello from RoboCode!\")\n\n# Try changing the message and click Run Code!\n"
  },
  {
    title: "2. Variables & Basic Math",
    starterCode: "# Math is easy in Python\nx = 10\ny = 5\n\n# Variables can be added together\nresult = x + y\nprint(f\"{x} plus {y} is {result}\")\n"
  },
  {
    title: "3. Working with Lists",
    starterCode: "# Create a list of planets\nplanets = [\"Earth\", \"Mars\", \"Jupiter\"]\n\n# Add a new planet\nplanets.append(\"Saturn\")\n\n# Loop through the list\nfor planet in planets:\n    print(f\"Welcome to {planet}!\")\n"
  },
  {
    title: "4. Functions",
    starterCode: "# Define a function to greet a user\ndef greet_user(name):\n    print(f\"Hello, {name}! Welcome to Python programming.\")\n\n# Call the function\ngreet_user(\"Alice\")\ngreet_user(\"Bob\")\n"
  },
  {
    title: "5. Dictionaries",
    starterCode: "# Dictionaries store data in key-value pairs\nstudent = {\n    \"name\": \"Alice\",\n    \"age\": 22,\n    \"major\": \"Computer Science\"\n}\n\nprint(f\"{student['name']} is {student['age']} years old.\")\n"
  }
];

const LearnPage = () => {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [code, setCode] = useState(LESSONS[0].starterCode);
  const [logs, setLogs] = useState('');
  const [errorLogs, setErrorLogs] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load starter code when lesson changes
  useEffect(() => {
    setCode(LESSONS[activeLessonIndex].starterCode);
    setLogs('');
    setErrorLogs('');
  }, [activeLessonIndex]);

  const handleRunScript = async () => {
    setIsLoading(true);
    setLogs('');
    setErrorLogs('');

    try {
      const data = await api.runScript(code);
      
      if (data.stdout) {
        setLogs(data.stdout);
        toast.success('Code executed successfully!');
      }
      if (data.stderr) {
        setErrorLogs(data.stderr);
        toast.error('Code finished with errors');
      }
    } catch (error) {
      setErrorLogs(`Error connecting to the backend: ${error.message}`);
      toast.error('Backend connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Interactive <span className="text-gradient">Python Curriculum</span></h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Select a lesson, write your code, and see the results instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div className="glass-card" style={{ padding: '1rem', overflow: 'hidden' }}>
          <LessonSidebar 
            lessons={LESSONS} 
            activeLessonIndex={activeLessonIndex} 
            onSelectLesson={setActiveLessonIndex} 
          />
        </div>

        {/* Editor */}
        <div style={{ overflow: 'hidden' }}>
          <CodeEditor 
            code={code}
            setCode={setCode}
            onRun={handleRunScript}
            isLoading={isLoading}
          />
        </div>

        {/* Console */}
        <div style={{ overflow: 'hidden' }}>
          <OutputConsole 
            logs={logs}
            errorLogs={errorLogs}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
