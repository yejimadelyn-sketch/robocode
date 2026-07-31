import React from 'react';
import { SquareTerminal } from 'lucide-react';

const OutputConsole = ({ logs, errorLogs, isLoading }) => {
  return (
    <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.4)', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <SquareTerminal size={18} /> Terminal Output
        </h2>
      </div>
      
      <div className="panel-body" style={{ flex: 1, padding: 0, background: '#020617', overflowY: 'auto' }}>
        <div className="tab-content" style={{ display: 'block', height: '100%', padding: '1rem' }}>
          {(!logs && !errorLogs && !isLoading) ? (
            <div className="empty-state" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/robot.png" alt="RoboCode Ready" style={{ width: '80px', animation: 'floatSmall 4s ease-in-out infinite', filter: 'drop-shadow(var(--glow))', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
                Run your code to see the output here.
              </p>
            </div>
          ) : (
            <>
              {logs && <div className="log-output" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#a7f3d0', fontSize: '0.9rem' }}>{logs}</div>}
              {errorLogs && <div className="log-output log-error" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#f87171', fontSize: '0.9rem', marginTop: logs ? '1rem' : '0' }}>{errorLogs}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputConsole;
