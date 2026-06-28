'use client';
import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { problems, dsaTopics } from '@/data/dsa';
import CodeRunner from '@/components/CodeRunner';

export default function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const problem = problems.find(p => p.id === id);
  if (!problem) notFound();

  const topic = dsaTopics.find(t => t.id === problem.topic);
  const [activeSection, setActiveSection] = useState<'problem' | 'approach' | 'code'>('problem');

  const tabBtn = (section: typeof activeSection, label: string) => (
    <button
      onClick={() => setActiveSection(section)}
      style={{
        padding: '0.55rem 1.1rem', fontSize: '0.85rem', fontWeight: 600,
        cursor: 'pointer', border: 'none', borderRadius: '8px',
        background: activeSection === section ? 'var(--accent-primary)' : 'transparent',
        color: activeSection === section ? 'white' : 'var(--text-secondary)',
        transition: 'all 0.15s',
      }}
    >{label}</button>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Link href="/dsa" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>DSA Problems</Link>
        <span>›</span>
        <span>{topic?.name}</span>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{problem.title}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            {problem.title}
          </h1>
          <span className={`badge badge-${problem.difficulty}`}>{problem.difficulty}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge badge-concept">{problem.pattern}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱ {problem.timeComplexity}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>💾 {problem.spaceComplexity}</span>
          {problem.companies.map(c => (
            <span key={c} style={{ fontSize: '0.72rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.15rem 0.5rem', color: 'var(--text-muted)' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.35rem', marginBottom: '1.5rem', width: 'fit-content' }}>
        {tabBtn('problem', '📋 Problem')}
        {tabBtn('approach', '🧠 Approach')}
        {tabBtn('code', '💻 Code')}
      </div>

      {/* Problem tab */}
      {activeSection === 'problem' && (
        <div className="animate-in">
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Problem Statement</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{problem.description}</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Examples</h2>
            {problem.examples.map((ex, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '0.75rem', borderLeft: '3px solid var(--accent-primary)' }}>
                <div style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                  <code style={{ color: 'var(--accent-secondary)' }}>{ex.input}</code>
                </div>
                <div style={{ fontSize: '0.82rem', marginBottom: ex.explanation ? '0.4rem' : 0 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Output: </span>
                  <code style={{ color: 'var(--accent-success)' }}>{ex.output}</code>
                </div>
                {ex.explanation && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    💬 {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approach tab */}
      {activeSection === 'approach' && (
        <div className="animate-in">
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>{problem.timeComplexity}</div>
              </div>
              <div style={{ background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.25)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Space</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{problem.spaceComplexity}</div>
              </div>
            </div>
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9rem' }}>
              {problem.approach}
            </div>
          </div>
        </div>
      )}

      {/* Code tab */}
      {activeSection === 'code' && (
        <div className="animate-in">
          <CodeRunner
            initialCode={problem.starterCode}
            solution={problem.solution}
            testCases={problem.testCases}
          />
        </div>
      )}
    </div>
  );
}
