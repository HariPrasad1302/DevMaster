'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeRunnerProps {
  initialCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
}

export default function CodeRunner({ initialCode, solution, testCases }: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'solution'>('editor');

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are a Python code evaluator. The user will give you Python code.
Simulate running it and show what the output would be.
If there are errors, show them like a real Python traceback.
Also briefly explain if the logic is correct.
Format: First show the output block, then a brief 1-2 line analysis.
Output block format:
--- Output ---
[actual output here]
--- Analysis ---
[brief analysis]`,
          messages: [{ role: 'user', content: `Run this Python code and show the output:\n\n\`\`\`python\n${code}\n\`\`\`` }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || 'No response';
      setOutput(text);
    } catch {
      setOutput('Error connecting to evaluator. Check your connection.');
    } finally {
      setIsRunning(false);
    }
  };

  const tabStyle = (active: boolean) => ({
    padding: '0.45rem 1rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    background: active ? 'var(--accent-primary)' : 'transparent',
    color: active ? 'white' : 'var(--text-muted)',
    transition: 'all 0.15s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button style={tabStyle(activeTab === 'editor')} onClick={() => setActiveTab('editor')}>
            ✏ Your Code
          </button>
          <button style={tabStyle(activeTab === 'solution')} onClick={() => setActiveTab('solution')}>
            💡 Solution
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setCode(initialCode)}
            className="btn-ghost"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
          >
            ↺ Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="btn-primary"
            style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem', opacity: isRunning ? 0.7 : 1 }}
          >
            {isRunning ? '⟳ Running...' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
        <MonacoEditor
          height="280px"
          language="python"
          theme="vs-dark"
          value={activeTab === 'editor' ? code : solution}
          onChange={(val) => { if (activeTab === 'editor') setCode(val || ''); }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineHeight: 1.7,
            padding: { top: 12, bottom: 12 },
            scrollBeyondLastLine: false,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            readOnly: activeTab === 'solution',
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Test Cases */}
      {testCases.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {testCases.map((tc, i) => (
            <div key={i} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Input: </span>
              <code style={{ color: 'var(--accent-secondary)' }}>{tc.input}</code>
              <span style={{ color: 'var(--text-muted)', margin: '0 0.4rem' }}>→</span>
              <span style={{ color: 'var(--text-muted)' }}>Expected: </span>
              <code style={{ color: 'var(--accent-success)' }}>{tc.expected}</code>
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      {output && (
        <div style={{
          background: '#0a0a0d',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '0.83rem',
          color: '#c9d1d9',
          whiteSpace: 'pre-wrap',
          maxHeight: '200px',
          overflowY: 'auto',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Output
          </div>
          {output}
        </div>
      )}
    </div>
  );
}
