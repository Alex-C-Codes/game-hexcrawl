import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { upsert, getById } from '../lib/storage';

const EVENT_TYPES = ['creature', 'item', 'aberration'];

function emptyEvent() {
  return { id: crypto.randomUUID(), type: 'creature', title: '', desc: '' };
}

export default function FactionPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const [id,          setId]          = useState(contentId || crypto.randomUUID());
  const [name,         setName]        = useState('Untitled Faction');
  const [color,        setColor]       = useState('#b05a4a');
  const [description,  setDescription] = useState('');
  const [events,       setEvents]      = useState([]);
  const [saved,        setSaved]       = useState(true);

  useEffect(() => {
    if (!contentId) return;
    (async () => {
      const item = await getById(contentId);
      if (!item) return;
      setId(item.id);
      setName(item.name || 'Untitled Faction');
      setColor(item.data?.color || '#b05a4a');
      setDescription(item.data?.description || '');
      setEvents(item.data?.events || []);
    })();
  }, [contentId]);

  async function save() {
    await upsert({ id, type: 'faction', name, data: { color, description, events } });
    setSaved(true);
  }

  function addEvent() {
    setEvents(e => [...e, emptyEvent()]);
    setSaved(false);
  }

  function updateEvent(eid, patch) {
    setEvents(e => e.map(ev => ev.id === eid ? { ...ev, ...patch } : ev));
    setSaved(false);
  }

  function removeEvent(eid) {
    setEvents(e => e.filter(ev => ev.id !== eid));
    setSaved(false);
  }

  return (
    <div style={{ background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif', paddingTop: 80 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 60px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <h1 style={{ color: '#c9a84c', fontSize: '1.2rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
            Faction Editor
          </h1>
          <div style={{ flex: 1 }} />
          <span style={{ color: saved ? '#3a3830' : '#c9a84c', fontSize: '0.74rem' }}>
            {saved ? 'Saved' : 'Unsaved changes'}
          </span>
          <button onClick={save} style={{
            background: '#1e1a0c', border: '1px solid #c9a84c', borderRadius: 4,
            color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.78rem',
            padding: '6px 18px', cursor: 'pointer',
          }}>
            Save
          </button>
        </div>

        {/* Name + color */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <label style={{ flex: 1, color: '#8a8070', fontSize: '0.75rem' }}>
            Name
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setSaved(false); }}
              maxLength={80}
              style={inputStyle}
            />
          </label>
          <label style={{ color: '#8a8070', fontSize: '0.75rem' }}>
            Overlay Color
            <input
              type="color"
              value={color}
              onChange={e => { setColor(e.target.value); setSaved(false); }}
              style={{ display: 'block', marginTop: 4, width: 60, height: 34, background: 'none', border: '1px solid #3a3020', borderRadius: 4, cursor: 'pointer' }}
            />
          </label>
        </div>

        {/* Description */}
        <label style={{ display: 'block', color: '#8a8070', fontSize: '0.75rem', marginBottom: 20 }}>
          Description
          <textarea
            value={description}
            onChange={e => { setDescription(e.target.value); setSaved(false); }}
            rows={5}
            placeholder="Who are they? What do they want? How do they hold this territory?"
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Georgia, serif' }}
          />
        </label>

        {/* Encounter events — added to a hex's random-encounter pool while under this faction's influence */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#8a8070', fontSize: '0.75rem' }}>
              Encounters <span style={{ color: '#4a4540' }}>— added to the biome's encounter pool on influenced hexes</span>
            </span>
            <button onClick={addEvent} style={{
              background: 'none', border: '1px solid #3a3020', borderRadius: 4,
              color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.7rem',
              padding: '3px 10px', cursor: 'pointer',
            }}>
              + Add
            </button>
          </div>

          {events.length === 0 && (
            <div style={{ color: '#2a2a2a', fontSize: '0.74rem', padding: '8px 2px' }}>
              No encounters yet — purely cosmetic influence until you add some.
            </div>
          )}

          {events.map(ev => (
            <div key={ev.id} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8,
              background: '#0d0d18', border: '1px solid #2a2a3a', borderRadius: 6, padding: 10,
            }}>
              <select
                value={ev.type}
                onChange={e => updateEvent(ev.id, { type: e.target.value })}
                style={{ ...inputStyle, width: 110, marginTop: 0 }}
              >
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={ev.title}
                  onChange={e => updateEvent(ev.id, { title: e.target.value })}
                  placeholder="Title"
                  style={{ ...inputStyle, marginTop: 0, marginBottom: 6 }}
                />
                <textarea
                  value={ev.desc}
                  onChange={e => updateEvent(ev.id, { desc: e.target.value })}
                  placeholder="Description"
                  rows={2}
                  style={{ ...inputStyle, marginTop: 0, resize: 'vertical', fontFamily: 'Georgia, serif' }}
                />
              </div>
              <button
                onClick={() => removeEvent(ev.id)}
                title="Remove"
                style={{ background: 'none', border: 'none', color: '#5a3030', fontSize: '0.9rem', cursor: 'pointer', padding: '4px 2px' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginTop: 4,
  background: '#181510',
  border: '1px solid #3a3020',
  borderRadius: 4,
  color: '#e0d8c8',
  fontFamily: 'Georgia, serif',
  fontSize: '0.85rem',
  padding: '7px 10px',
  boxSizing: 'border-box',
};
