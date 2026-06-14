import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',        label: 'Play'    },
  { to: '/create',  label: 'Create'  },
  { to: '/library', label: 'Library' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      padding: '8px 16px',
      background: 'rgba(12,12,20,0.93)',
      borderBottom: '1px solid #3a3a50',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 200,
    }}>
      <div style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.15em' }}>
        Hexcrawl
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {NAV_LINKS.map(({ to, label }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to));
          return (
            <Link key={to} to={to} style={{
              color: active ? '#c9a84c' : '#6a6050',
              background: active ? 'rgba(201,168,76,0.08)' : 'rgba(0,0,0,0.5)',
              border: `1px solid ${active ? '#c9a84c' : '#3a3a50'}`,
              borderRadius: 4,
              padding: '4px 12px',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontFamily: 'Georgia, serif',
              transition: 'color 0.12s, border-color 0.12s',
            }}>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
