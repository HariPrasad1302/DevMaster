'use client';
import { useState } from 'react';
import Link from 'next/link';
import { problems, dsaTopics } from '@/data/dsa';

export default function DSAPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDiff, setSelectedDiff] = useState<string>('all');

  const filtered = problems.filter(p => {
    const topicMatch = selectedTopic === 'all' || p.topic === selectedTopic;
    const diffMatch = selectedDiff === 'all' || p.difficulty === selectedDiff;
    return topicMatch && diffMatch;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
        DSA Problems
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
        Curated problems from Easy → Hard. Each with pattern explanation, solution, and AI code runner.
      </p>

      {/* Topic filter */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => setSelectedTopic('all')}
          className={selectedTopic === 'all' ? 'btn-primary' : 'btn-ghost'}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}
        >All Topics</button>
        {dsaTopics.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={selectedTopic === t.id ? 'btn-primary' : 'btn-ghost'}
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}
          >{t.icon} {t.name}</button>
        ))}
      </div>

      {/* Difficulty filter */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.75rem' }}>
        {['all', 'easy', 'medium', 'hard'].map(d => (
          <button
            key={d}
            onClick={() => setSelectedDiff(d)}
            style={{
              padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600,
              borderRadius: '6px', cursor: 'pointer', border: 'none', textTransform: 'capitalize',
              background: selectedDiff === d ? (d === 'easy' ? '#10b981' : d === 'medium' ? '#f59e0b' : d === 'hard' ? '#ef4444' : 'var(--accent-primary)') : 'var(--bg-card)',
              color: selectedDiff === d ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}
          >{d}</button>
        ))}
      </div>

      {/* Problem list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.map((p, idx) => (
          <Link key={p.id} href={`/dsa/${p.id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {p.title}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="badge badge-concept">{p.pattern}</span>
                  {p.companies.slice(0, 3).map(c => (
                    <span key={c} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-hover)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {dsaTopics.find(t => t.id === p.topic)?.name}
                </div>
                <span className={`badge badge-${p.difficulty}`}>{p.difficulty}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
