'use client';
import { useState } from 'react';

let sqlCategories: any[] = [];
let sqlTopics: any[] = [];
try {
  const mod = require('@/data/sqlroadmap');
  sqlCategories = mod.sqlCategories ?? [];
  sqlTopics = mod.sqlTopics ?? [];
} catch {}

export default function SqlRoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = sqlTopics.filter((t: any) =>
    selectedCategory === 'all' || t.category === selectedCategory
  );

  const levelColors: Record<string, string> = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
        SQL Mastery Roadmap
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
        From basic SELECT to Window Functions, CTEs, Transactions & Query Optimization. Click any topic to expand.
      </p>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}
        >All</button>
        {sqlCategories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.35rem 0.85rem', fontSize: '0.78rem', fontWeight: 600,
              cursor: 'pointer', borderRadius: '8px',
              border: selectedCategory === cat.id ? 'none' : '1px solid var(--border)',
              background: selectedCategory === cat.id ? cat.color : 'transparent',
              color: selectedCategory === cat.id ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}
          >{cat.icon} {cat.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.map((topic: any) => {
          const cat = sqlCategories.find((c: any) => c.id === topic.category);
          const isExpanded = expandedId === topic.id;
          return (
            <div key={topic.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Header */}
              <div
                style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: `${cat?.color}18`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0,
                }}>
                  {cat?.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{topic.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{topic.description}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>⏱ {topic.estimatedHours}h</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px',
                    background: `${levelColors[topic.level]}18`,
                    color: levelColors[topic.level],
                    border: `1px solid ${levelColors[topic.level]}30`,
                    textTransform: 'capitalize' as const,
                  }}>{topic.level}</span>
                  <span style={{
                    color: 'var(--text-muted)', fontSize: '0.85rem',
                    transform: isExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>▾</span>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '1.25rem 1.5rem', background: 'var(--bg-secondary)' }} className="animate-in">
                  <div style={{ display: 'grid', gridTemplateColumns: topic.codeExample ? '1fr 1fr' : '1fr', gap: '1.25rem' }}>
                    {/* Key points */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Concepts</div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {topic.keyPoints.map((point: string, i: number) => (
                          <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '0.3rem 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '0.05rem' }}>✦</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Code example */}
                    {topic.codeExample && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Code Example</div>
                        <pre style={{ fontSize: '0.78rem', lineHeight: 1.6, maxHeight: '320px', overflowY: 'auto' }}>
                          <code>{topic.codeExample}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
          Data loading... Make sure sqlroadmap.ts is generated.
        </div>
      )}
    </div>
  );
}