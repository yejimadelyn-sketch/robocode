import React from 'react';
import Editor from '@monaco-editor/react';
import { SquareTerminal, Play, Loader2 } from 'lucide-react';
import { SoundButton } from './SoundButton';

const CodeEditor = ({ code, setCode, onRun, isLoading }) => {
  return (
    <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <SquareTerminal size={18} /> Python Editor
        </h2>
        <SoundButton 
          className="btn btn-primary" 
          onClick={onRun}
          disabled={isLoading}
          style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.5rem' }}
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {isLoading ? 'Running...' : 'Run Code'}
        </SoundButton>
      </div>
      <div className="panel-body" style={{ padding: 0, flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            padding: { top: 16 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
