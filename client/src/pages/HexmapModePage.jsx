import { Link } from 'react-router-dom';

const MODES = [
  {
    title: 'Procedural',
    icon: '✦',
    href: '/create/hexmap/procedural',
    desc: 'Set parameters — radius, biome weights, seed — and let the algorithm generate a world. Tweak and regenerate until it feels right, then save or hand off to manual editing.',
  },
  {
    title: 'Manual',
    icon: '✎',
    href: '/create/hexmap/manual',
    desc: 'Paint every hex by hand. Full control over biome placement, settlements, and points of interest. Best for small, highly specific regions.',
  },
];

export default function HexmapModePage() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif', paddingTop: 80 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ color: '#c9a84c', fontSize: '1.3rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
          Hex Map
        </h1>
        <p style={{ color: '#3a3830', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 40 }}>
          Choose how to build your world.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {MODES.map(m => (
            <Link key={m.title} to={m.href} style={{ textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.firstChild.style.borderColor = '#c9a84c'; e.currentTarget.firstChild.style.background = '#181828'; }}
              onMouseLeave={e => { e.currentTarget.firstChild.style.borderColor = '#2a2a3a'; e.currentTarget.firstChild.style.background = '#0d0d18'; }}
            >
              <div style={{
                background: '#0d0d18', border: '1px solid #2a2a3a', borderRadius: 10,
                padding: '40px 32px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center', gap: 14,
                transition: 'border-color 0.15s, background 0.15s',
              }}>
                <span style={{ fontSize: '2rem', color: '#c9a84c' }}>{m.icon}</span>
                <span style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '1.05rem', letterSpacing: '0.08em' }}>
                  {m.title}
                </span>
                <span style={{ color: '#4a4540', fontSize: '0.76rem', lineHeight: 1.65 }}>
                  {m.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
