import { Link } from 'react-router-dom';
import { getByType } from '../lib/storage';

const TYPES = [
  {
    key: 'battlemap',
    title: 'Battlemap',
    icon: '⚔️',
    href: '/create/battlemap',
    desc: 'Design dungeon encounters tile by tile. Place walls, doors, traps, and features for your players to discover.',
  },
  {
    key: 'voxel3d',
    title: '3D Battlemap',
    icon: '🧱',
    href: '/create/voxel3d',
    desc: 'Build dungeons in three dimensions. Stack voxel blocks to sculpt multi-level rooms, towers, and caverns.',
  },
  {
    key: 'article',
    title: 'Article',
    icon: '📜',
    href: '/create/article',
    desc: 'Write lore, campaign notes, faction histories, and world-building entries for your setting.',
  },
  {
    key: 'hexmap',
    title: 'Hex Map',
    icon: '🗺️',
    href: '/create/hexmap',
    desc: 'Chart the wilds. Place biomes, settlements, dungeons, and points of interest across your world.',
  },
  {
    key: 'settlement',
    title: 'Settlement',
    icon: '🏘️',
    href: '/create/settlement',
    desc: 'Design villages, towns, and cities tile by tile. Place roads, buildings, and landmarks.',
  },
];

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: '#0d0d18',
  border: '1px solid #2a2a3a',
  borderRadius: 10,
  padding: '36px 28px',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s',
  textDecoration: 'none',
  gap: 10,
};

export default function CreateHubPage() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif', paddingTop: 80 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ color: '#c9a84c', fontSize: '1.3rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
          Create
        </h1>
        <p style={{ color: '#3a3830', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 40 }}>
          What would you like to build?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {TYPES.map(t => {
            const count = getByType(t.key).length;
            return (
              <Link key={t.key} to={t.href} style={cardStyle}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.background = '#181828'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a3a'; e.currentTarget.style.background = '#0d0d18'; }}
              >
                <span style={{ fontSize: '2.4rem' }}>{t.icon}</span>
                <span style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '0.95rem', letterSpacing: '0.06em' }}>{t.title}</span>
                <span style={{ color: '#4a4540', fontSize: '0.74rem', lineHeight: 1.6, flex: 1 }}>{t.desc}</span>
                {count > 0 && (
                  <span style={{ color: '#5a5040', fontSize: '0.68rem', marginTop: 8 }}>
                    {count} saved
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
