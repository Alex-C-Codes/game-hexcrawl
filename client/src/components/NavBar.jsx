import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const NAV_LINKS = [
  { to: '/',        label: 'Play'    },
  { to: '/create',  label: 'Create'  },
  { to: '/library', label: 'Library' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

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
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
        {user ? (
          <>
            <span style={{ color: '#4a4540', fontSize: '0.72rem', marginLeft: 4 }}>{user.email}</span>
            <button onClick={signOut} style={{
              background: 'transparent', border: '1px solid #3a3a50', borderRadius: 4,
              color: '#6a6050', fontFamily: 'Georgia, serif', fontSize: '0.78rem',
              padding: '4px 12px', cursor: 'pointer',
            }}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            color: '#6a6050', border: '1px solid #3a3a50', borderRadius: 4,
            padding: '4px 12px', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'Georgia, serif',
          }}>
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
