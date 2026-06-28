'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '⌂' },
  { href: '/python', label: 'Python Roadmap', icon: '🐍' },
  { href: '/api-design', label: 'API Design', icon: '📡' },
  { href: '/sql', label: 'SQL Mastery', icon: '🗄' },
  { href: '/dsa', label: 'DSA Problems', icon: '⬡' },
  { href: '/company-problems', label: 'Company Problems', icon: '🏢' },
  { href: '/system-design', label: 'System Design', icon: '⚙' },
  { href: '/hld-lld', label: 'HLD / LLD', icon: '🏗' },
  { href: '/uml', label: 'UML Diagrams', icon: '📐' },
  { href: '/scenarios', label: 'Design Scenarios', icon: '🎯' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem 0.75rem',
      gap: '0.25rem',
    }}>
      {/* Logo */}
      <div style={{ padding: '0.5rem 0.85rem 1.25rem', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          Dev<span style={{ color: 'var(--accent-primary)' }}>Master</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
          Python → Senior Dev
        </div>
      </div>

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Bottom label */}
      <div style={{ marginTop: 'auto', padding: '0.75rem 0.85rem', fontSize: '0.7rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        Crack TCS → Google → MNC
      </div>
    </aside>
  );
}
