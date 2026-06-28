'use client';
import { useState } from 'react';
import { systemDesignScenarios } from '@/data/systemdesign';

export default function SystemDesignPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'approach' | 'diagram'>('overview');

  const hld = systemDesignScenarios.filter(s => s.category === 'hld' || s.category === 'scenario');
  const active = hld.find(s => s.id === activeId) || hld[0];

  const tabBtn = (tab: typeof activeTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
        border: 'none', borderRadius: '6px',
        background: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
        color: activeTab === tab ? 'white' : 'var(--text-secondary)',
        transition: 'all 0.15s',
      }}
    >{label}</button>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left panel: scenario list */}
      <div style={{ width: '280px', minWidth: '280px', borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '1.25rem 0.75rem', background: 'var(--bg-secondary)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem', marginBottom: '0.75rem' }}>
          System Design Scenarios
        </div>
        {hld.map(s => (
          <div
            key={s.id}
            onClick={() => { setActiveId(s.id); setActiveTab('overview'); }}
            className={`sidebar-item ${(activeId === s.id || (!activeId && s === hld[0])) ? 'active' : ''}`}
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem', marginBottom: '0.25rem' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.title}</span>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {s.tags.slice(0, 2).map(tag => (
                <span key={tag} style={{ fontSize: '0.67rem', background: 'var(--bg-hover)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--text-muted)' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right panel: content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>
        {active && (
          <div className="animate-in">
            {/* Header */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span className={`badge badge-${active.difficulty}`}>{active.difficulty}</span>
                {active.tags.map(t => <span key={t} className="badge badge-concept">{t}</span>)}
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {active.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{active.problem}</p>
            </div>

            {/* Tab nav */}
            <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-card)', borderRadius: '8px', padding: '0.3rem', marginBottom: '1.5rem', width: 'fit-content', border: '1px solid var(--border)' }}>
              {tabBtn('overview', '📋 Requirements')}
              {tabBtn('components', '🧩 Components')}
              {tabBtn('approach', '🏗 Approach')}
              {active.diagram && tabBtn('diagram', '📊 Architecture')}
            </div>

            {/* Requirements */}
            {activeTab === 'overview' && (
              <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Functional Requirements</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {active.requirements.functional.map((r, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Non-Functional Requirements</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {active.requirements.nonFunctional.map((r, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: '#f59e0b', flexShrink: 0 }}>⚡</span>{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {active.estimations && (
                    <div className="card" style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scale Estimations</h3>
                      {active.estimations.map((e, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{e.label}</span>
                          <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{e.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Components */}
            {activeTab === 'components' && active.hldComponents && (
              <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {active.hldComponents.map((c, i) => (
                  <div key={i} className="card" style={{ padding: '1rem 1.15rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem', lineHeight: 1.5 }}>{c.description}</div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {c.tech.split(' / ').map(t => (
                        <span key={t} className="badge badge-design">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Approach */}
            {activeTab === 'approach' && (
              <div className="animate-in">
                <div className="card" style={{ padding: '1.5rem' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, background: 'transparent', border: 'none', padding: 0 }}>
                    {active.approach}
                  </pre>
                </div>
                <div className="card" style={{ padding: '1.25rem', marginTop: '1rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Design Decisions</h3>
                  {active.keyDecisions.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{d}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diagram */}
            {activeTab === 'diagram' && active.diagram && (
              <div className="animate-in">
                <div className="card" style={{ padding: '1.5rem' }}>
                  <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9d1d9', background: 'transparent', border: 'none', padding: 0, whiteSpace: 'pre', lineHeight: 1.6, overflowX: 'auto' }}>
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
