import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { upsert, getById } from '../lib/storage';
import { SYSTEMS, DEFAULT_SYSTEM, ABILITIES, getTemplate, abilityMod, fmtMod, isBlank } from '../lib/systems';
import './entry.css';

// Shared editor for library entries with structured, system-specific stats
// (creatures and items). `kind` is the library item type.
const KIND_META = {
  creature: { title: 'Creature Editor', untitled: 'Untitled Creature', descHint: 'One or two sentences — shown on battlemap tokens and in lists.' },
  item:     { title: 'Item Editor',     untitled: 'Untitled Item',     descHint: 'What it looks like and what it does, in brief.' },
};

const SYSTEM_PREF_KEY = 'hx_entry_system';

function preferredSystem() {
  try {
    const s = localStorage.getItem(SYSTEM_PREF_KEY);
    if (s && SYSTEMS[s]) return s;
  } catch { /* storage unavailable */ }
  return DEFAULT_SYSTEM;
}

function newRow() { return { id: crypto.randomUUID(), name: '', text: '' }; }

export default function EntryEditorPage({ kind }) {
  const meta = KIND_META[kind];
  const [searchParams, setSearchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const [id,          setId]          = useState(() => contentId || crypto.randomUUID());
  const [name,        setName]        = useState(meta.untitled);
  const [system,      setSystem]      = useState(preferredSystem);
  const [description, setDescription] = useState('');
  const [stats,       setStats]       = useState({});
  const [sections,    setSections]    = useState({});
  const [custom,      setCustom]      = useState([]);
  const [notes,       setNotes]       = useState('');
  const [saved,       setSaved]       = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    if (!contentId) return;
    (async () => {
      try {
        const item = await getById(contentId);
        if (!item) return;
        const d = item.data || {};
        setId(item.id);
        setName(item.name || meta.untitled);
        if (d.system && SYSTEMS[d.system]) setSystem(d.system);
        setDescription(d.description || '');
        setStats(d.stats || {});
        setSections(d.sections || {});
        setCustom(d.custom || []);
        setNotes(d.notes || '');
        setSaved(true);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [contentId, meta.untitled]);

  const tpl = getTemplate(system, kind);
  const dirty = () => setSaved(false);

  const save = useCallback(async () => {
    try {
      await upsert({ id, type: kind, name: name.trim() || meta.untitled, data: { system, description, stats, sections, custom, notes } });
      setSaved(true);
      setError(null);
      // Put the id in the URL so a reload reopens this entry
      if (contentId !== id) setSearchParams({ id }, { replace: true });
    } catch (err) {
      setError('Save failed: ' + err.message);
    }
  }, [id, kind, name, meta.untitled, system, description, stats, sections, custom, notes, contentId, setSearchParams]);

  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save]);

  function changeSystem(s) {
    setSystem(s);
    try { localStorage.setItem(SYSTEM_PREF_KEY, s); } catch { /* ignore */ }
    dirty();
  }

  function setStat(key, value) { setStats(s => ({ ...s, [key]: value })); dirty(); }

  function updateSection(key, fn) { setSections(s => ({ ...s, [key]: fn(s[key] || []) })); dirty(); }

  return (
    <div id="entry-root">
      <div className="en-wrap">

        {/* Header */}
        <div className="en-header">
          <h1>{meta.title}</h1>
          <div style={{ flex: 1 }} />
          <label className="en-system">
            System
            <select value={system} onChange={e => changeSystem(e.target.value)}>
              {Object.entries(SYSTEMS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
            </select>
          </label>
          <span className={`en-saved${saved ? '' : ' dirty'}`}>{saved ? 'Saved' : 'Unsaved changes'}</span>
          <button className="en-btn primary" onClick={save}>Save</button>
        </div>
        {error && <div className="en-error">{error}</div>}

        <div className="en-columns">
          {/* ── Form ── */}
          <div className="en-form">
            <label className="en-field">
              <span>Name</span>
              <input type="text" value={name} maxLength={80} onChange={e => { setName(e.target.value); dirty(); }} />
            </label>

            <label className="en-field">
              <span>Description</span>
              <textarea rows={3} value={description} placeholder={meta.descHint}
                onChange={e => { setDescription(e.target.value); dirty(); }} />
            </label>

            <div className="en-grid">
              {tpl.fields.filter(f => !f.showIf || f.showIf(stats)).map(f => (
                <StatField key={f.key} field={f} stats={stats} tpl={tpl} setStat={setStat} />
              ))}
            </div>

            {tpl.sections.map(sec => (
              <div key={sec.key} className="en-section">
                <div className="en-section-head">
                  <span>{sec.label}</span>
                  <button className="en-btn small" onClick={() => updateSection(sec.key, rows => [...rows, newRow()])}>+ Add</button>
                </div>
                {(sections[sec.key] || []).map(row => (
                  <div key={row.id} className="en-row">
                    <div className="en-row-body">
                      <input type="text" placeholder="Name (e.g. Multiattack)" value={row.name}
                        onChange={e => updateSection(sec.key, rows => rows.map(r => r.id === row.id ? { ...r, name: e.target.value } : r))} />
                      <textarea rows={2} placeholder="Description" value={row.text}
                        onChange={e => updateSection(sec.key, rows => rows.map(r => r.id === row.id ? { ...r, text: e.target.value } : r))} />
                    </div>
                    <button className="en-remove" title="Remove"
                      onClick={() => updateSection(sec.key, rows => rows.filter(r => r.id !== row.id))}>×</button>
                  </div>
                ))}
              </div>
            ))}

            {/* Custom fields — anything the template doesn't cover */}
            <div className="en-section">
              <div className="en-section-head">
                <span>Custom Fields <em>— anything the system template doesn’t cover</em></span>
                <button className="en-btn small" onClick={() => { setCustom(c => [...c, { id: crypto.randomUUID(), label: '', value: '' }]); dirty(); }}>+ Add</button>
              </div>
              {custom.map(c => (
                <div key={c.id} className="en-row en-custom">
                  <input type="text" placeholder="Label" value={c.label}
                    onChange={e => { setCustom(cs => cs.map(x => x.id === c.id ? { ...x, label: e.target.value } : x)); dirty(); }} />
                  <input type="text" placeholder="Value" value={c.value}
                    onChange={e => { setCustom(cs => cs.map(x => x.id === c.id ? { ...x, value: e.target.value } : x)); dirty(); }} />
                  <button className="en-remove" title="Remove"
                    onClick={() => { setCustom(cs => cs.filter(x => x.id !== c.id)); dirty(); }}>×</button>
                </div>
              ))}
            </div>

            <label className="en-field">
              <span>Notes <em>— lore, tactics, DM notes (not shown in the stat block)</em></span>
              <textarea rows={6} value={notes} onChange={e => { setNotes(e.target.value); dirty(); }} />
            </label>
          </div>

          {/* ── Preview ── */}
          <div className="en-preview-col">
            <Preview kind={kind} name={name} description={description} stats={stats} sections={sections} custom={custom} tpl={tpl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatField({ field: f, stats, tpl, setStat }) {
  const style = { gridColumn: `span ${f.span || 2}` };
  const v = stats[f.key];

  if (f.kind === 'abilities') {
    const ab = stats.abilities || {};
    const saves = stats.saves || {};
    const d = tpl.derive?.(stats);
    return (
      <div className="en-field" style={style}>
        <span>{f.label}{d && <em> — PB {fmtMod(d.pb)} from CR · tick to add proficiency to the save</em>}</span>
        <div className="en-abilities">
          {ABILITIES.map(([k, label]) => (
            <div key={k} className="en-ability">
              <div className="en-ability-label">{label}</div>
              <input type="number" min={1} max={30} value={ab[k] ?? 10}
                onChange={e => setStat('abilities', { ...ab, [k]: e.target.value === '' ? '' : Number(e.target.value) })} />
              <div className="en-ability-mod">{fmtMod(abilityMod(ab[k] ?? 10))}</div>
              <label className="en-ability-save" title="Proficient in this saving throw">
                <input type="checkbox" checked={!!saves[k]}
                  onChange={e => setStat('saves', { ...saves, [k]: e.target.checked })} />
                save {d ? fmtMod(d.saveVals[k]) : ''}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (f.kind === 'checkbox') {
    return (
      <label className="en-field en-check" style={style}>
        <input type="checkbox" checked={!!v} onChange={e => setStat(f.key, e.target.checked)} />
        <span>{f.label}</span>
      </label>
    );
  }

  return (
    <label className="en-field" style={style}>
      <span>{f.label}</span>
      {f.kind === 'select' ? (
        <select value={v ?? ''} onChange={e => setStat(f.key, e.target.value)}>
          {!f.options.includes('') && <option value="">—</option>}
          {f.options.map(o => <option key={o} value={o}>{f.optionLabels?.[o] ?? (o || '—')}</option>)}
        </select>
      ) : f.kind === 'textarea' ? (
        <textarea rows={3} value={v ?? ''} placeholder={f.placeholder} onChange={e => setStat(f.key, e.target.value)} />
      ) : (
        <input type={f.kind === 'number' ? 'number' : 'text'} value={v ?? ''} placeholder={f.placeholder}
          onChange={e => setStat(f.key, f.kind === 'number' && e.target.value !== '' ? Number(e.target.value) : e.target.value)} />
      )}
    </label>
  );
}

function Lines({ rows }) {
  const shown = rows.filter(([, val]) => !isBlank(val));
  if (!shown.length) return null;
  return (
    <div className="pv-lines">
      {shown.map(([label, val]) => (
        <div key={label}><b>{label}</b> {val}</div>
      ))}
    </div>
  );
}

function Preview({ kind, name, description, stats, sections, custom, tpl }) {
  const subtitle = tpl.subtitle(stats);
  const { top, bottom } = tpl.lines(stats);
  const hasAbilities = tpl.fields.some(f => f.kind === 'abilities');
  const d = tpl.derive?.(stats);
  const ab = stats.abilities || {};
  const customRows = custom.filter(c => !isBlank(c.label) || !isBlank(c.value)).map(c => [c.label || '—', c.value]);

  return (
    <div className={`pv-block pv-${kind}`}>
      <div className="pv-name">{name || 'Untitled'}</div>
      {subtitle && <div className="pv-sub">{subtitle}</div>}
      {description && <div className="pv-desc">{description}</div>}
      <div className="pv-rule" />
      <Lines rows={top} />

      {hasAbilities && (
        <table className="pv-abilities">
          <thead><tr><th /><th /><th>MOD</th><th>SAVE</th><th /><th /><th>MOD</th><th>SAVE</th></tr></thead>
          <tbody>
            {[0, 1, 2].map(row => (
              <tr key={row}>
                {[ABILITIES[row], ABILITIES[row + 3]].map(([k, label]) => [
                  <th key={k + 'l'}>{label}</th>,
                  <td key={k + 's'}>{ab[k] ?? 10}</td>,
                  <td key={k + 'm'}>{fmtMod(d.mods[k])}</td>,
                  <td key={k + 'v'} className={stats.saves?.[k] ? 'prof' : ''}>{fmtMod(d.saveVals[k])}</td>,
                ])}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Lines rows={[...bottom, ...customRows]} />

      {tpl.sections.map(sec => {
        const rows = (sections[sec.key] || []).filter(r => !isBlank(r.name) || !isBlank(r.text));
        if (!rows.length) return null;
        return (
          <div key={sec.key} className="pv-section">
            <div className="pv-section-title">{sec.label}</div>
            {rows.map(r => (
              <p key={r.id}>
                {!isBlank(r.name) && <b><i>{r.name.replace(/\.$/, '')}.</i></b>} {r.text}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
