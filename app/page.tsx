import Link from 'next/link';

const sections = [
  {
    href: '/python',
    icon: '🐍',
    title: 'Python Roadmap',
    desc: 'Core → Advanced → OOP → Concurrency → FastAPI. Structured learning path with code examples.',
    color: '#3b82f6',
    stats: '14 categories · 55+ topics',
  },
  {
    href: '/api-design',
    icon: '📡',
    title: 'API Design',
    desc: 'HTTP fundamentals → REST → GraphQL → gRPC → OAuth2 → Security → Performance & Real-time APIs.',
    color: '#8b5cf6',
    stats: '10 categories · 53 topics',
  },
  {
    href: '/sql',
    icon: '🗄',
    title: 'SQL Mastery',
    desc: 'Basic SQL → JOINs → Subqueries → Window Functions → CTEs → Transactions & Query Optimization.',
    color: '#06b6d4',
    stats: '12 categories · 48 topics',
  },
  {
    href: '/dsa',
    icon: '⬡',
    title: 'DSA Problems',
    desc: 'Easy to Hard problems with solutions, approach explanations, and an AI-powered code runner.',
    color: '#7c6af7',
    stats: '12 topics · 45+ problems',
  },
  {
    href: '/company-problems',
    icon: '🏢',
    title: 'Company Problems',
    desc: 'Master 80 DSA patterns asked at Google, Amazon, Microsoft, Meta — Easy to Hard with code runner.',
    color: '#f97316',
    stats: '80 patterns · 12 categories',
  },
  {
    href: '/system-design',
    icon: '⚙',
    title: 'System Design',
    desc: 'HLD scenarios: URL shortener, chat system, recommendation engine, and more.',
    color: '#10b981',
    stats: '10+ scenarios',
  },
  {
    href: '/hld-lld',
    icon: '🏗',
    title: 'HLD / LLD',
    desc: 'High-level architecture and low-level object-oriented design with class diagrams.',
    color: '#f59e0b',
    stats: 'Parking lot · Elevator · More',
  },
  {
    href: '/uml',
    icon: '📐',
    title: 'UML Diagrams',
    desc: 'Class diagrams, sequence diagrams, all notations explained with real examples.',
    color: '#ef4444',
    stats: 'Class · Sequence · State',
  },
  {
    href: '/scenarios',
    icon: '🎯',
    title: 'Scenario Questions',
    desc: 'Interview-style: "Design a recommendation system". Full walkthrough with diagrams.',
    color: '#5eead4',
    stats: 'Google · Amazon · Microsoft',
  },
];

const companies = ['TCS', 'ZOHO', 'Infosys', 'Wipro', 'Cognizant', 'Adobe', 'Microsoft', 'Amazon', 'Google'];

export default function Home() {
  return (
    <div style={{ padding: '2.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(124,106,247,0.12)', border: '1px solid rgba(124,106,247,0.25)',
          borderRadius: '999px', padding: '0.3rem 0.85rem', marginBottom: '1.25rem',
          fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600,
        }}>
          ✦ Complete Dev Mastery Platform
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1rem',
          color: 'var(--text-primary)',
        }}>
          Python → Django → FastAPI<br />
          <span style={{ color: 'var(--accent-primary)' }}>DSA · HLD · LLD · Crack Any MNC</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.7 }}>
          Everything you need to go from knowing Python to cracking interviews at Google, Microsoft, Amazon, and product-based MNCs. Structured roadmap, real problems, real solutions.
        </p>

        {/* Company badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
          {companies.map(c => (
            <span key={c} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '6px', padding: '0.25rem 0.6rem',
              fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500,
            }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Sections grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.4rem', cursor: 'pointer', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
                  background: `${s.color}18`, border: `1px solid ${s.color}30`,
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {s.desc}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: s.color, fontWeight: 600, letterSpacing: '0.02em' }}>
                    {s.stats}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Progress reminder */}
      <div style={{
        marginTop: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <span style={{ fontSize: '1.5rem' }}>💡</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Recommended Learning Order
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Python Core → OOP → DSA (Arrays → Trees → Graphs → DP) → Django/FastAPI → System Design → HLD/LLD → Mock Interviews
          </div>
        </div>
      </div>
    </div>
  );
}
