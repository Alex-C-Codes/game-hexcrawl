import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAll, remove } from '../lib/storage';

const TYPE_LABELS = { battlemap: 'Battlemap', article: 'Article', hexmap: 'Hex Map' };
const TYPE_ICONS  = { battlemap: '⚔️', article: '📜', hexmap: '🗺️' };
const EDIT_PATHS  = { battlemap: '/create/battlemap', article: '/create/article', hexmap: '/create/hexmap' };

const FILTERS = ['All', 'Battlemap', 'Article', 'Hex Map'];
const TYPE_KEYS = { 'All': null, 'Battlemap': 'battlemap', 'Article': 'article', 'Hex Map': 'hexmap' };

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => { setItems(getAll()); }, []);

  function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    remove(id);
    setItems(getAll());
  }

  const typeKey = TYPE_KEYS[filter];
  const visible = typeKey ? items.filter(i => i.type === typeKey) : items;

  return (
    <div style={{ background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif', paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <h1 style={{ color: '#c9a84c', fontSize: '1.3rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Library
          </h1>
          <Link to="/create" style={{ color: '#c9a84c', fontSize: '0.78rem', border: '1px solid #3a3020', borderRadius: 4, padding: '4px 14px', textDecoration: 'none' }}>
            + Create
          </Link>
        </div>
        <p style={{ color: '#3a3830', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 32 }}>
          {items.length} item{items.length !== 1 ? 's' : ''} saved
        </p>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? '#1e1a0c' : 'transparent',
              border: `1px solid ${filter === f ? '#c9a84c' : '#2a2a3a'}`,
              borderRadius: 4,
              color: filter === f ? '#c9a84c' : '#4a4540',
              fontFamily: 'Georgia, serif',
              fontSize: '0.76rem',
              padding: '4px 14px',
              cursor: 'pointer',
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ color: '#2a2a2a', textAlign: 'center', paddingTop: 80, fontSize: '0.85rem' }}>
            {items.length === 0
              ? <><p style={{ marginBottom: 16 }}>Nothing saved yet.</p><Link to="/create" style={{ color: '#c9a84c', fontSize: '0.78rem' }}>Start creating →</Link></>
              : <p>No {filter.toLowerCase()} items yet.</p>
            }
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {visible.map(item => (
            <div key={item.id} style={{
              background: '#0d0d18',
              border: '1px solid #2a2a3a',
              borderRadius: 8,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {/* Type badge + icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.1rem' }}>{TYPE_ICONS[item.type] ?? '📄'}</span>
                <span style={{
                  fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#5a5040', border: '1px solid #2a2520', borderRadius: 3, padding: '1px 6px',
                }}>
                  {TYPE_LABELS[item.type] ?? item.type}
                </span>
              </div>

              {/* Name */}
              <div style={{ color: '#e0d8c8', fontSize: '0.92rem', fontWeight: 'bold', lineHeight: 1.3 }}>
                {item.name || 'Untitled'}
              </div>

              {/* Date */}
              <div style={{ color: '#3a3830', fontSize: '0.7rem', flex: 1 }}>
                Updated {formatDate(item.updatedAt)}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button
                  onClick={() => navigate(`${EDIT_PATHS[item.type] ?? '/create'}?id=${item.id}`)}
                  style={{
                    flex: 1, background: '#181510', border: '1px solid #3a3020', borderRadius: 4,
                    color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.74rem',
                    padding: '5px 0', cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  style={{
                    background: 'transparent', border: '1px solid #2a1a1a', borderRadius: 4,
                    color: '#5a3030', fontFamily: 'Georgia, serif', fontSize: '0.74rem',
                    padding: '5px 12px', cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
