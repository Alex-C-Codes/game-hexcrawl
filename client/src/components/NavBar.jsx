import { Link } from 'react-router-dom';

const linkStyle = {
  color: '#c9a84c',
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid #3a3a50',
  borderRadius: 4,
  padding: '4px 12px',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontFamily: 'Georgia, serif',
};

export default function Navbar() {
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
        <Link to="/"          style={linkStyle}>Game</Link>
        <Link to="/battlemap" style={linkStyle}>Battlemap</Link>
        <Link to="/article"   style={linkStyle}>Article</Link>
      </div>
    </nav>
  );
}
