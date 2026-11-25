import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { upsert, getById } from '../lib/storage';
import { SYSTEMS, DEFAULT_SYSTEM, ABILITIES, getTemplate, abilityMod, fmtMod, isBlank } from '../lib/systems';
import './entry.css';

// Shared editor for library entries with structured, system-specific stats
// (creatures and items). `kind` is the library item type.
const KIND_META = {
  creature: { title: 'Creature Editor', untitled: 'Untitled Creature', descHint: 'One or two sentences — shown on battlemap tokens and in lists.' },
  item:     { title: 'Item Editor',     untitled: 'Untitled Item',     descHint: 'What it looks like and what it does, in brief.' },
  spell:    { title: 'Spell Editor',    untitled: 'Untitled Spell',    descHint: 'A one-line summary — shown in lists and previews.' },
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

  // ── Reordering ── Lists are the template's section keys plus 'custom'.
  // Section entries can move between sections (e.g. Action → Bonus Action);
  // custom fields have a different shape, so they only reorder among themselves.
  const dragRef = useRef(null);            // { key, id } of the row being dragged
  const [dropAt, setDropAt] = useState(null); // { key, index } insertion point

  const canDrop = toKey => dragRef.current && ((dragRef.current.key === 'custom') === (toKey === 'custom'));

  function moveItem(fromKey, id, toKey, toIndex) {
    const reorder = (list) => {
      const arr = [...list];
      const i = arr.findIndex(r => r.id === id);
      if (i < 0) return list;
      const [item] = arr.splice(i, 1);
      arr.splice(i < toIndex ? toIndex - 1 : toIndex, 0, item);
      return arr;
    };
    if (fromKey === 'custom' || toKey === 'custom') {
      if (fromKey !== toKey) return;
      setCustom(reorder);
    } else if (fromKey === toKey) {
      setSections(s => ({ ...s, [fromKey]: reorder(s[fromKey] || []) }));
    } else {
      setSections(s => {
        const from = [...(s[fromKey] || [])];
        const i = from.findIndex(r => r.id === id);
        if (i < 0) return s;
        const [item] = from.splice(i, 1);
        const to = [...(s[toKey] || [])];
        to.splice(toIndex, 0, item);
        return { ...s, [fromKey]: from, [toKey]: to };
      });
    }
    dirty();
  }

  const dnd = { dragRef, dropAt, setDropAt, canDrop, moveItem };

  // Dragging over a list's empty space appends to the end of it
  function listDropProps(key, count) {
    return {
      onDragOver: e => {
        if (!canDrop(key)) return;
        e.preventDefault();
        if (dropAt?.key !== key || dropAt?.index !== count) setDropAt({ key, index: count });
      },
      onDrop: e => {
        if (!canDrop(key)) return;
        e.preventDefault();
        const { key: from, id } = dragRef.current;
        moveItem(from, id, key, dropAt?.key === key ? dropAt.index : count);
        dragRef.current = null; setDropAt(null);
      },
    };
  }

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
                <StatField key={f.key} field={f} stats={stats} sections={sections} tpl={tpl} setStat={setStat} />
              ))}
            </div>

            {tpl.derive && <CRBreakdown derived={tpl.derive(stats, sections)} />}

            {tpl.sections.map(sec => {
              const rows = sections[sec.key] || [];
              const emptyTarget = dropAt?.key === sec.key && rows.length === 0;
              return (
                <div key={sec.key} className={`en-section${emptyTarget ? ' drop-into' : ''}`} {...listDropProps(sec.key, rows.length)}>
                  <div className="en-section-head">
                    <span>{sec.label}</span>
                    <button className="en-btn small" onClick={() => updateSection(sec.key, r => [...r, newRow()])}>+ Add</button>
                  </div>
                  {rows.length === 0 && <div className="en-drop-hint">Drag entries here</div>}
                  {rows.map((row, i) => (
                    <DragRow key={row.id} listKey={sec.key} id={row.id} index={i} count={rows.length} dnd={dnd}
                      onRemove={() => updateSection(sec.key, r => r.filter(x => x.id !== row.id))}>
                      <div className="en-row-body">
                        <input type="text" placeholder="Name (e.g. Multiattack)" value={row.name}
                          onChange={e => updateSection(sec.key, r => r.map(x => x.id === row.id ? { ...x, name: e.target.value } : x))} />
                        <textarea rows={2} placeholder="Description" value={row.text}
                          onChange={e => updateSection(sec.key, r => r.map(x => x.id === row.id ? { ...x, text: e.target.value } : x))} />
                      </div>
                    </DragRow>
                  ))}
                </div>
              );
            })}

            {/* Custom fields — anything the template doesn't cover */}
            <div className="en-section" {...listDropProps('custom', custom.length)}>
              <div className="en-section-head">
                <span>Custom Fields <em>— anything the system template doesn’t cover</em></span>
                <button className="en-btn small" onClick={() => { setCustom(c => [...c, { id: crypto.randomUUID(), label: '', value: '' }]); dirty(); }}>+ Add</button>
              </div>
              {custom.map((c, i) => (
                <DragRow key={c.id} listKey="custom" id={c.id} index={i} count={custom.length} dnd={dnd} className="en-custom"
                  onRemove={() => { setCustom(cs => cs.filter(x => x.id !== c.id)); dirty(); }}>
                  <input type="text" placeholder="Label" value={c.label}
                    onChange={e => { setCustom(cs => cs.map(x => x.id === c.id ? { ...x, label: e.target.value } : x)); dirty(); }} />
                  <input type="text" placeholder="Value" value={c.value}
                    onChange={e => { setCustom(cs => cs.map(x => x.id === c.id ? { ...x, value: e.target.value } : x)); dirty(); }} />
                </DragRow>
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

function StatField({ field: f, stats, sections, tpl, setStat }) {
  const style = { gridColumn: `span ${f.span || 2}` };
  const v = stats[f.key];
  const d = tpl.derive?.(stats, sections);

  if (f.kind === 'abilities') {
    const ab = stats.abilities || {};
    const saves = stats.saves || {};
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

  if (f.kind === 'multi') {
    const selected = Array.isArray(v) ? v : [];
    const toggle = o => setStat(f.key, selected.includes(o)
      ? selected.filter(x => x !== o)
      : f.options.filter(x => x === o || selected.includes(x))); // keep option order
    return (
      <div className="en-field" style={style}>
        <span>{f.label}</span>
        <div className="en-chips">
          {f.options.map(o => (
            <button key={o} type="button" className={`en-chip${selected.includes(o) ? ' on' : ''}`} onClick={() => toggle(o)}>{o}</button>
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

  const optionLabel = o => {
    if (f.autoCR && o === '') return `Auto (${d?.calc?.cr ?? '—'})`;
    return f.optionLabels?.[o] ?? (o || '—');
  };
  // Blank override fields show what was read from the Actions section
  const placeholder = f.auto
    ? `auto: ${d?.calc?.parsed?.[f.auto] ?? '—'}`
    : f.placeholder;

  return (
    <label className="en-field" style={style}>
      <span>{f.label}{f.hint && <em> — {f.hint}</em>}</span>
      {f.kind === 'select' ? (
        <select value={v ?? ''} onChange={e => setStat(f.key, e.target.value)}>
          {!f.options.includes('') && <option value="">—</option>}
          {f.options.map(o => <option key={o} value={o}>{optionLabel(o)}</option>)}
        </select>
      ) : f.kind === 'textarea' ? (
        <textarea rows={f.rows || 3} value={v ?? ''} placeholder={placeholder} onChange={e => setStat(f.key, e.target.value)} />
      ) : (
        <input type={f.kind === 'number' ? 'number' : 'text'} value={v ?? ''} placeholder={placeholder}
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
  const { top, bottom } = tpl.lines(stats, sections);
  const hasAbilities = tpl.fields.some(f => f.kind === 'abilities');
  const d = tpl.derive?.(stats, sections);
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

      {(tpl.body?.(stats) || []).map((p, i) => {
        if (p.quickRef !== undefined) {
          return isBlank(p.quickRef) ? null : <div key={i} className="pv-quickref">{p.quickRef}</div>;
        }
        if (isBlank(p.text)) return null;
        return (
          <div key={i} className="pv-body">
            {String(p.text).split(/\n+/).map((para, j) => (
              <p key={j}>
                {j === 0 && p.title && <b><i>{p.title}. </i></b>}
                {para}
              </p>
            ))}
          </div>
        );
      })}

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

// Shows the DMG working behind the calculated CR, so it can be checked or
// overridden with confidence.
function CRBreakdown({ derived }) {
  const [open, setOpen] = useState(false);
  const c = derived?.calc;
  if (!c) return null;
  const mode = derived.crIsAuto ? 'Auto' : `Manual (calculated: ${c.cr ?? '—'})`;

  return (
    <div className="en-crcalc">
      <button className="en-crcalc-head" onClick={() => setOpen(o => !o)}>
        {open ? '▾' : '▸'} CR {derived.effectiveCR || '—'} <em>— {mode} · how it was calculated</em>
      </button>
      {open && (c.cr === null ? (
        <div className="en-crcalc-body">{c.missing}</div>
      ) : (
        <div className="en-crcalc-body">
          <div className="en-crcalc-cols">
            <div>
              <div className="en-crcalc-title">Defensive CR {c.defensive.cr}</div>
              <div>Effective HP {c.defensive.effHP}{c.defensive.effHP !== c.defensive.hp && ` (base ${c.defensive.hp})`} → CR {c.defensive.hpCR}</div>
              {c.defensive.effAC === null
                ? <div>No AC entered — no adjustment</div>
                : <div>Effective AC {c.defensive.effAC} vs expected {c.defensive.expectedAC} → {fmtSteps(c.defensive.acSteps)}</div>}
            </div>
            <div>
              <div className="en-crcalc-title">Offensive CR {c.offensive.cr}</div>
              <div>Damage/round {c.offensive.dpr} ({c.offensive.dprSource}) → CR {c.offensive.dmgCR}</div>
              {c.offensive.using === null
                ? <div>No attack bonus or save DC found — no adjustment</div>
                : <div>{c.offensive.using === 'attack' ? `Attack bonus ${fmtMod(c.offensive.value)}` : `Save DC ${c.offensive.value}`} vs expected {c.offensive.using === 'attack' ? fmtMod(c.offensive.expected) : c.offensive.expected} → {fmtSteps(c.offensive.steps)}</div>}
            </div>
          </div>
          <div className="en-crcalc-final">Average of {c.defensive.cr} and {c.offensive.cr} → <b>CR {c.cr}</b></div>
          {[...c.steps, ...c.parsed.notes].length > 0 && (
            <ul className="en-crcalc-notes">
              {[...c.steps, ...c.parsed.notes].map(s => <li key={s}>{s}</li>)}
            </ul>
          )}
          <div className="en-crcalc-foot">
            Method: 2014 Dungeon Master’s Guide, “Creating a Monster”. Legendary-action damage isn’t read automatically — add it to Damage / Round if it matters. Pick a CR in the dropdown to override.
          </div>
        </div>
      ))}
    </div>
  );
}

function fmtSteps(n) {
  if (!n) return 'no change';
  return `${n > 0 ? '+' : '−'}${Math.abs(n)} CR step${Math.abs(n) === 1 ? '' : 's'}`;
}

// A list row with a drag handle, ↑/↓ buttons and remove. Dragging only starts
// from the handle so text in the row's inputs can still be selected normally.
function DragRow({ listKey, id, index, count, dnd, onRemove, className = '', children }) {
  const { dragRef, dropAt, setDropAt, canDrop, moveItem } = dnd;
  const rowRef = useRef(null);
  const dragging = dragRef.current?.id === id;
  const before = dropAt?.key === listKey && dropAt.index === index;
  const after  = dropAt?.key === listKey && dropAt.index === count && index === count - 1;

  return (
    <div
      ref={rowRef}
      className={`en-row ${className}${dragging ? ' dragging' : ''}${before ? ' drop-before' : ''}${after ? ' drop-after' : ''}`}
      onDragOver={e => {
        if (!canDrop(listKey)) return;
        e.preventDefault();
        e.stopPropagation();
        const r = rowRef.current.getBoundingClientRect();
        const idx = e.clientY < r.top + r.height / 2 ? index : index + 1;
        if (dropAt?.key !== listKey || dropAt.index !== idx) setDropAt({ key: listKey, index: idx });
      }}
      onDrop={e => {
        if (!canDrop(listKey)) return;
        e.preventDefault();
        e.stopPropagation();
        const { key: from, id: dragId } = dragRef.current;
        moveItem(from, dragId, listKey, dropAt?.key === listKey ? dropAt.index : index);
        dragRef.current = null; setDropAt(null);
      }}
    >
      <div className="en-row-tools">
        <span
          className="en-handle"
          draggable
          title="Drag to reorder"
          onDragStart={e => {
            dragRef.current = { key: listKey, id };
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id); // Firefox needs data to start a drag
            if (rowRef.current) e.dataTransfer.setDragImage(rowRef.current, 16, 16);
          }}
          onDragEnd={() => { dragRef.current = null; setDropAt(null); }}
        >⋮⋮</span>
        <button className="en-move" title="Move up" disabled={index === 0}
          onClick={() => moveItem(listKey, id, listKey, index - 1)}>↑</button>
        <button className="en-move" title="Move down" disabled={index === count - 1}
          onClick={() => moveItem(listKey, id, listKey, index + 2)}>↓</button>
      </div>
      {children}
      <button className="en-remove" title="Remove" onClick={onRemove}>×</button>
    </div>
  );
}
