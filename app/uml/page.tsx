'use client';
import { useState } from 'react';
import { systemDesignScenarios } from '@/data/systemdesign';

export default function UMLPage() {
  const umls = systemDesignScenarios.filter(s => s.category === 'uml');
  const [activeId, setActiveId] = useState(umls[0]?.id);
  const active = umls.find(s => s.id === activeId) || umls[0];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '240px', minWidth: '240px', borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '1.25rem 0.75rem', background: 'var(--bg-secondary)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem', marginBottom: '0.75rem' }}>UML Guides</div>
        {umls.map(s => (
          <div key={s.id} onClick={() => setActiveId(s.id)}
            className={`sidebar-item ${activeId === s.id ? 'active' : ''}`}
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.title}</span>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {s.tags.slice(0, 2).map(t => <span key={t} style={{ fontSize: '0.67rem', background: 'var(--bg-hover)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--text-muted)' }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>
        {active && (
          <div className="animate-in">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{active.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{active.problem}</p>
            <div className="card" style={{ padding: '1.5rem' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#c9d1d9', background: 'transparent', border: 'none', padding: 0, lineHeight: 1.75 }}>
                {active.approach}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
