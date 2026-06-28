'use client';
import { useState } from 'react';
import { systemDesignScenarios } from '@/data/systemdesign';

export default function HLDLLDPage() {
  const lld = systemDesignScenarios.filter(s => s.category === 'lld');
  const [activeId, setActiveId] = useState(lld[0]?.id);
  const active = lld.find(s => s.id === activeId) || lld[0];
  const [tab, setTab] = useState<'problem' | 'approach' | 'diagram'>('problem');

  const tabBtn = (t: typeof tab, label: string) => (
    <button onClick={() => setTab(t)} style={{
      padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
      border: 'none', borderRadius: '6px',
      background: tab === t ? 'var(--accent-primary)' : 'transparent',
      color: tab === t ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s',
    }}>{label}</button>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '260px', minWidth: '260px', borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '1.25rem 0.75rem', background: 'var(--bg-secondary)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem', marginBottom: '0.75rem' }}>LLD Problems</div>
        {lld.map(s => (
          <div key={s.id} onClick={() => { setActiveId(s.id); setTab('problem'); }}
            className={`sidebar-item ${activeId === s.id ? 'active' : ''}`}
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.title}</span>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <span className={`badge badge-${s.difficulty}`}>{s.difficulty}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>
        {active && (
          <div className="animate-in">
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span className={`badge badge-${active.difficulty}`}>{active.difficulty}</span>
                {active.tags.map(t => <span key={t} className="badge badge-concept">{t}</span>)}
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{active.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{active.problem}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-card)', borderRadius: '8px', padding: '0.3rem', marginBottom: '1.5rem', width: 'fit-content', border: '1px solid var(--border)' }}>
              {tabBtn('problem', '📋 Requirements')}
              {tabBtn('approach', '🧠 Design')}
              {active.diagram && tabBtn('diagram', '📐 Class Diagram')}
            </div>

            {tab === 'problem' && (
              <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Functional</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {active.requirements.functional.map((r, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Non-Functional</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {active.requirements.nonFunctional.map((r, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: '#f59e0b', flexShrink: 0 }}>⚡</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === 'approach' && (
              <div className="animate-in">
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, background: 'transparent', border: 'none', padding: 0 }}>
                    {active.approach}
                  </pre>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Design Decisions</h3>
                  {active.keyDecisions.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{d}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'diagram' && active.diagram && (
              <div className="animate-in">
                <div className="card" style={{ padding: '1.5rem' }}>
                  <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9d1d9', background: 'transparent', border: 'none', padding: 0, whiteSpace: 'pre', lineHeight: 1.7, overflowX: 'auto' }}>
                    {active.diagram}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
