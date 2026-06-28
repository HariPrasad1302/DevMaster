'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const CodeRunner = dynamic(() => import('@/components/CodeRunner'), { ssr: false });

interface PatternCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  order: number;
}

interface PatternProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  companies: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solution: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}

interface DSAPattern {
  id: string;
  number: number;
  name: string;
  categoryId: string;
  identify: string;
  sampleProblem: PatternProblem;
}

let patternCategories: PatternCategory[] = [];
let dsaPatterns: DSAPattern[] = [];
try {
  const mod = require('@/data/patterns');
  patternCategories = mod.patternCategories ?? [];
  dsaPatterns = mod.dsaPatterns ?? [];
} catch {
  // data file not yet available
}

const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Bloomberg', 'Adobe'];
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

const diffColor: Record<string, string> = {
  easy: 'var(--accent-success)',
  medium: 'var(--accent-warning)',
  hard: 'var(--accent-danger)',
};

export default function CompanyProblemsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<DSAPattern | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatterns = useMemo(() => {
    return dsaPatterns.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || p.sampleProblem.difficulty === selectedDifficulty;
      const matchComp = selectedCompany === 'all' || p.sampleProblem.companies.includes(selectedCompany);
      const matchSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sampleProblem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.identify.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDiff && matchComp && matchSearch;
    });
  }, [selectedCategory, selectedDifficulty, selectedCompany, searchQuery]);

  const categoryMap = useMemo(() => {
    const map: Record<string, PatternCategory> = {};
    patternCategories.forEach(c => { map[c.id] = c; });
    return map;
  }, []);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, DSAPattern[]> = {};
    filteredPatterns.forEach(p => {
      if (!groups[p.categoryId]) groups[p.categoryId] = [];
      groups[p.categoryId].push(p);
    });
    return groups;
  }, [filteredPatterns]);

  const orderedCategories = useMemo(() => {
    return [...patternCategories]
      .sort((a, b) => a.order - b.order)
      .filter(c => groupedByCategory[c.id]?.length > 0);
  }, [groupedByCategory, patternCategories]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* LEFT PANEL */}
      <div style={{
        width: selectedPattern ? '400px' : '100%',
        minWidth: '320px',
        borderRight: selectedPattern ? '1px solid var(--border)' : 'none',
        overflowY: 'auto',
        padding: '1.5rem',
        transition: 'width 0.2s ease',
        flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            🏢 Company Problems
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
            80 patterns asked in Google, Amazon, Microsoft & top MNC interviews
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--accent-success)' }}>● {dsaPatterns.filter(p => p.sampleProblem.difficulty === 'easy').length} Easy</span>
            <span style={{ color: 'var(--accent-warning)' }}>● {dsaPatterns.filter(p => p.sampleProblem.difficulty === 'medium').length} Medium</span>
            <span style={{ color: 'var(--accent-danger)' }}>● {dsaPatterns.filter(p => p.sampleProblem.difficulty === 'hard').length} Hard</span>
            <span style={{ color: 'var(--text-muted)' }}>· {dsaPatterns.length}/80 patterns</span>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search patterns or problems..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: '100%', padding: '0.6rem 0.85rem',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.85rem',
            marginBottom: '0.85rem', outline: 'none', boxSizing: 'border-box',
          }}
        />

        {/* Difficulty filter */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          {['all', ...DIFFICULTIES].map(d => (
            <button key={d} onClick={() => setSelectedDifficulty(d)} style={{
              padding: '0.25rem 0.7rem', borderRadius: '6px', fontSize: '0.72rem',
              fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
              background: selectedDifficulty === d
                ? (d === 'easy' ? 'rgba(16,185,129,0.2)' : d === 'medium' ? 'rgba(245,158,11,0.2)' : d === 'hard' ? 'rgba(239,68,68,0.2)' : 'rgba(124,106,247,0.2)')
                : 'var(--bg-card)',
              color: selectedDifficulty === d
                ? (d === 'easy' ? 'var(--accent-success)' : d === 'medium' ? 'var(--accent-warning)' : d === 'hard' ? 'var(--accent-danger)' : 'var(--accent-primary)')
                : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>
              {d === 'all' ? 'All Levels' : d}
            </button>
          ))}
        </div>

        {/* Company filter */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          {['all', ...COMPANIES].map(c => (
            <button key={c} onClick={() => setSelectedCompany(c)} style={{
              padding: '0.2rem 0.6rem', borderRadius: '5px', fontSize: '0.68rem',
              fontWeight: 600, cursor: 'pointer',
              background: selectedCompany === c ? 'var(--accent-primary)' : 'var(--bg-hover)',
              color: selectedCompany === c ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${selectedCompany === c ? 'var(--accent-primary)' : 'var(--border)'}`,
            }}>
              {c === 'all' ? 'All Companies' : c}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <button onClick={() => setSelectedCategory('all')} style={{
            padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.73rem',
            fontWeight: 600, cursor: 'pointer',
            background: selectedCategory === 'all' ? 'var(--accent-primary)' : 'var(--bg-card)',
            color: selectedCategory === 'all' ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}>All</button>
          {[...patternCategories].sort((a,b) => a.order - b.order).map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
              padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.73rem',
              fontWeight: 600, cursor: 'pointer',
              background: selectedCategory === cat.id ? cat.color : 'var(--bg-card)',
              color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${selectedCategory === cat.id ? cat.color : 'var(--border)'}`,
            }}>
              {cat.icon} {cat.name.replace(' Patterns','').replace(' & Backtracking','').replace('Dynamic ','DP')}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {dsaPatterns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⏳</div>
            <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Generating 80 Patterns...</div>
            <div style={{ fontSize: '0.8rem' }}>Restart the dev server once data/patterns.ts is ready.</div>
          </div>
        )}

        {/* Pattern groups */}
        {orderedCategories.map(cat => (
          <div key={cat.id} style={{ marginBottom: '1.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              marginBottom: '0.65rem', paddingBottom: '0.4rem',
              borderBottom: `2px solid ${cat.color}33`,
            }}>
              <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
              <span style={{ fontWeight: 700, color: cat.color, fontSize: '0.85rem' }}>{cat.name}</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                {groupedByCategory[cat.id]?.length ?? 0} patterns
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {(groupedByCategory[cat.id] ?? []).map(pattern => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  catColor={cat.color}
                  isSelected={selectedPattern?.id === pattern.id}
                  onClick={() => setSelectedPattern(selectedPattern?.id === pattern.id ? null : pattern)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL — Detail */}
      {selectedPattern && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', minWidth: 0 }}>
          <ProblemDetail
            pattern={selectedPattern}
            catColor={categoryMap[selectedPattern.categoryId]?.color ?? 'var(--accent-primary)'}
            onClose={() => setSelectedPattern(null)}
          />
        </div>
      )}
    </div>
  );
}

function PatternCard({ pattern, catColor, isSelected, onClick }: {
  pattern: DSAPattern; catColor: string; isSelected: boolean; onClick: () => void;
}) {
  const prob = pattern.sampleProblem;
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', padding: '0.7rem 0.9rem',
      borderRadius: '10px',
      border: isSelected ? `1.5px solid ${catColor}` : '1px solid var(--border)',
      background: isSelected ? `${catColor}12` : 'var(--bg-card)',
      cursor: 'pointer', transition: 'all 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, color: catColor,
          background: `${catColor}22`, padding: '0.1rem 0.4rem',
          borderRadius: '4px', minWidth: '26px', textAlign: 'center',
        }}>#{pattern.number}</span>
        <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)', flex: 1 }}>
          {pattern.name}
        </span>
        <span style={{
          fontSize: '0.65rem', fontWeight: 600,
          color: diffColor[prob.difficulty],
          background: `${diffColor[prob.difficulty]}22`,
          padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'capitalize',
        }}>{prob.difficulty}</span>
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
        🔍 {pattern.identify}
      </div>
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{prob.title}</span>
        {prob.companies.slice(0, 3).map(c => (
          <span key={c} style={{
            fontSize: '0.62rem', color: 'var(--text-muted)',
            background: 'var(--bg-hover)', padding: '0.05rem 0.35rem', borderRadius: '3px',
          }}>{c}</span>
        ))}
      </div>
    </button>
  );
}

function ProblemDetail({ pattern, catColor, onClose }: {
  pattern: DSAPattern; catColor: string; onClose: () => void;
}) {
  const prob = pattern.sampleProblem;
  const [activeTab, setActiveTab] = useState<'problem' | 'approach' | 'code'>('problem');

  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, color: catColor,
              background: `${catColor}22`, padding: '0.15rem 0.5rem', borderRadius: '5px',
            }}>Pattern #{pattern.number}</span>
            <span style={{
              fontSize: '0.7rem', fontWeight: 600,
              color: diffColor[prob.difficulty],
              background: `${diffColor[prob.difficulty]}22`,
              padding: '0.15rem 0.5rem', borderRadius: '5px', textTransform: 'capitalize',
            }}>{prob.difficulty}</span>
            {prob.companies.map(c => (
              <span key={c} className="badge badge-design" style={{ fontSize: '0.62rem' }}>{c}</span>
            ))}
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            {pattern.name}
          </h2>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            🔍 Identify: {pattern.identify}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'var(--bg-hover)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', borderRadius: '6px',
          padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0,
        }}>✕</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        {(['problem', 'approach', 'code'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '0.6rem 1.1rem', background: 'none', border: 'none',
            borderBottom: activeTab === tab ? `2px solid ${catColor}` : '2px solid transparent',
            color: activeTab === tab ? catColor : 'var(--text-secondary)',
            fontWeight: activeTab === tab ? 700 : 400,
            fontSize: '0.83rem', cursor: 'pointer', textTransform: 'capitalize',
            marginBottom: '-1px',
          }}>
            {tab === 'problem' ? '📋 Problem' : tab === 'approach' ? '💡 Approach' : '💻 Code'}
          </button>
        ))}
      </div>

      {activeTab === 'problem' && (
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            {prob.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-wrap', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {prob.description}
          </p>

          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Examples</h4>
          {prob.examples.map((ex, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '0.65rem',
            }}>
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>Input: </span>
                <code style={{ color: 'var(--accent-secondary)', fontSize: '0.82rem' }}>{ex.input}</code>
              </div>
              <div style={{ marginBottom: ex.explanation ? '0.3rem' : 0 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>Output: </span>
                <code style={{ color: 'var(--accent-success)', fontSize: '0.82rem' }}>{ex.output}</code>
              </div>
              {ex.explanation && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', marginTop: '0.25rem' }}>
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 1rem' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Time Complexity</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{prob.timeComplexity}</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 1rem' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Space Complexity</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-warning)' }}>{prob.spaceComplexity}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approach' && (
        <div className="prose-content" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '0.88rem' }}>
          {prob.approach}
        </div>
      )}

      {activeTab === 'code' && (
        <CodeRunner
          initialCode={prob.starterCode}
          solution={prob.solution}
          testCases={prob.testCases}
        />
      )}
    </div>
  );
}