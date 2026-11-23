import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getByType, upsert } from '../lib/storage';
import './battlemap.css';

// Library content that can be dropped onto dungeon squares. Must match
// TOKEN_TYPES / TOKEN_DRAG_MIME in public/editor.js.
const TOKEN_DRAG_MIME = 'application/battlemap-token';
const CONTENT_TYPES = [
  { type: 'creature', label: 'Creatures', single: 'creature', canCreate: true },
  { type: 'item',     label: 'Items',     single: 'item',     canCreate: true },
  { type: 'article',  label: 'Articles',  single: 'article',  canCreate: false },
];
const CONTENT_OPEN_PATHS = { article: '/create/article', creature: '/create/creature', item: '/create/item' };

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const [levels, setLevels]             = useState([{ id: 'init', name: 'Layer 1', height: 10 }]);
  const [activeLevel, setActive]         = useState(0);
  const [ghostAboveOn, setGhostAboveOn]  = useState(false);
  const [ghostBelowOn, setGhostBelowOn]  = useState(false);
  const [sectionOn, setSectionOn]        = useState(false);
  const [activeTool, setActiveTool]      = useState('rect');
  const [markerType, setMarkerType]      = useState('number');
  const [markerColor, setMarkerColor]    = useState('#c9a84c');
  const [rectMode, setRectMode]          = useState('draw');
  const [cornerRadius, setCornerRadius]  = useState(0);
  const [roughOn, setRoughOn]            = useState(false);
  const [snapOn, setSnapOn]              = useState(true);

  const [content, setContent]            = useState({ creature: [], item: [], article: [] });
  const [contentError, setContentError]  = useState(null);
  const [contentFilter, setContentFilter] = useState('');
  const [collapsed, setCollapsed]        = useState({});
  const [newNames, setNewNames]          = useState({});
  const [placed, setPlaced]              = useState([]);
  const [noteEdit, setNoteEdit]          = useState(null); // { id|null, x, y, name, text, screenX, screenY }
  const [noteHover, setNoteHover]        = useState(null);

  const sectionRef = useRef(null);

  const refreshContent = useCallback(async () => {
    try {
      const lists = await Promise.all(CONTENT_TYPES.map(c => getByType(c.type)));
      setContent(Object.fromEntries(CONTENT_TYPES.map((c, i) => [c.type, lists[i]])));
      setContentError(null);
    } catch (err) {
      setContentError(err.message || 'Failed to load library');
    }
  }, []);

  useEffect(() => { refreshContent(); }, [refreshContent]);

  async function handleCreate(type) {
    const name = (newNames[type] || '').trim();
    if (!name) return;
    try {
      await upsert({ id: crypto.randomUUID(), type, name, data: { description: '' } });
      setNewNames(n => ({ ...n, [type]: '' }));
      await refreshContent();
    } catch (err) {
      alert('Could not create: ' + err.message);
    }
  }

  function contentDragStart(e, type, item) {
    e.dataTransfer.setData(TOKEN_DRAG_MIME, JSON.stringify({ type, id: item.id, name: item.name }));
    e.dataTransfer.effectAllowed = 'copy';
  }

  useEffect(() => {
    window.__editorContentId = contentId;
    window.__editorOnTokensChanged = (list) => setPlaced(list);
    window.__editorOnNoteEdit  = (note) => { setNoteHover(null); setNoteEdit(note); };
    window.__editorOnNoteHover = (note) => setNoteHover(note);
    window.__editorOnTokenOpen = (tok) => {
      const path = CONTENT_OPEN_PATHS[tok.type];
      // New tab so unsaved dungeon edits aren't lost
      if (path && tok.refId) window.open(`${path}?id=${tok.refId}`, '_blank');
    };

    window.__editorOnLevelsChanged = (lvs, idx) => {
      setLevels(lvs.map(l => ({ id: l.id, name: l.name, height: l.height ?? 10 })));
      setActive(idx);
    };
    window.__editorOnToolChanged = (tool) => setActiveTool(tool);

    const script = document.createElement('script');
    script.src = '/editor.js?v=' + Date.now();
    script.async = false;
    document.body.appendChild(script);

    return () => {
      if (window.cleanupEditor) window.cleanupEditor();
      window.__editorContentId = null;
      window.__editorOnLevelsChanged = null;
      window.__editorOnToolChanged   = null;
      window.__editorOnTokensChanged = null;
      window.__editorOnTokenOpen     = null;
      window.__editorOnNoteEdit      = null;
      window.__editorOnNoteHover     = null;
      const s = document.querySelector('script[src="/editor.js"]');
      if (s) document.body.removeChild(s);
    };
  }, [contentId]);

  useEffect(() => {
    if (sectionOn && sectionRef.current) {
      window.editorInitSection?.(sectionRef.current);
    } else if (!sectionOn) {
      window.editorInitSection?.(null);
    }
  }, [sectionOn]);

  function handleToggleGhostAbove() {
    const on = window.editorToggleGhostAbove?.();
    if (on !== undefined) setGhostAboveOn(on);
  }
  function handleToggleGhostBelow() {
    const on = window.editorToggleGhostBelow?.();
    if (on !== undefined) setGhostBelowOn(on);
  }
  function handleToggleSection() {
    const on = window.editorToggleSection?.();
    if (on !== undefined) setSectionOn(on);
  }
  function handleRename(i, currentName) {
    const name = prompt('Rename layer:', currentName);
    if (name?.trim()) window.editorRenameLevel?.(i, name.trim());
  }
  function handleEditHeight(i, currentHeight) {
    const val = prompt(`Height for "${levels[i].name}" (feet):`, currentHeight);
    const h = parseInt(val, 10);
    if (!isNaN(h) && h > 0) window.editorSetLayerHeight?.(i, h);
  }

  function handleRectMode(mode) {
    setRectMode(mode);
    window.editorSetRectOptions?.({ mode });
  }
  function handleCornerRadius(r) {
    const v = Math.max(0, Math.min(8, r));
    setCornerRadius(v);
    window.editorSetRectOptions?.({ cornerRadius: v });
  }
  function handleRough(on) {
    setRoughOn(on);
    window.editorSetRectOptions?.({ rough: on });
  }
  function handleSnap(on) {
    setSnapOn(on);
    window.editorSetRectOptions?.({ snapGrid: on });
  }

  const MARKER_COLORS = ['#c9a84c', '#e8e0d0', '#c05050', '#4a80d0', '#50a850'];

  function handleMarkerTypeChange(type) {
    setMarkerType(type);
    window.editorSetMarkerSubTool?.({ type });
  }
  function handleMarkerColorChange(color) {
    setMarkerColor(color);
    window.editorSetMarkerSubTool?.({ color });
  }

  function layerDragHandlers(i) {
    return {
      draggable: true,
      onDragStart: e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(i));
        e.currentTarget.classList.add('lv-dragging');
      },
      onDragOver: e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('lv-dragover');
      },
      onDragLeave: e => e.currentTarget.classList.remove('lv-dragover'),
      onDrop: e => {
        e.preventDefault();
        e.currentTarget.classList.remove('lv-dragover');
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (!isNaN(from) && from !== i) window.editorReorderLevel?.(from, i);
      },
      onDragEnd: e => e.currentTarget.classList.remove('lv-dragging', 'lv-dragover'),
    };
  }

  return (
    <div id="editor-root">

      {/* Header */}
      <div id="header">
        <h1>Dungeon Editor</h1>
        <div className="sep" />
        <span className="hdr-label">Name</span>
        <input type="text" id="input-name" defaultValue="Untitled Dungeon" maxLength={60} spellCheck={false} />
        <div className="sep" />
        <button id="btn-new"    className="hdr-btn warn">New</button>
        <button id="btn-load"   className="hdr-btn">Load JSON</button>
        <button id="btn-save"   className="hdr-btn primary">Save</button>
        <button id="btn-export" className="hdr-btn">Export JSON</button>
        <button id="btn-fit"    className="hdr-btn">Fit View</button>
        <input type="file" id="file-input" accept=".json" style={{ display: 'none' }} />
      </div>

      {/* Toolbar */}
      <div id="toolbar">
        <button className="tool-btn" data-tool="rect">Rect <span className="key">R</span></button>
        <button className="tool-btn" data-tool="paint">Paint <span className="key">B</span></button>
        <button className="tool-btn" data-tool="erase">Erase <span className="key">E</span></button>
        <button className="tool-btn" data-tool="fill">Fill <span className="key">F</span></button>
        <button className="tool-btn" data-tool="pick">Pick <span className="key">P</span></button>
        <button className="tool-btn" data-tool="wall">Wall <span className="key">W</span></button>
        <button className="tool-btn" data-tool="door">Door <span className="key">D</span></button>
        <button className="tool-btn" data-tool="secret">Secret <span className="key">S</span></button>
        <button className="tool-btn" data-tool="marker">Marker <span className="key">M</span></button>
        <button className="tool-btn" data-tool="token">Token <span className="key">T</span></button>
        <button className="tool-btn" data-tool="note">Note <span className="key">N</span></button>
        <div className="tbsep" />
        <button id="btn-undo"    className="icon-btn">↩ Undo</button>
        <button id="btn-redo"    className="icon-btn">↪ Redo</button>
        <div className="tbsep" />
        <button
          id="btn-section"
          className={`icon-btn${sectionOn ? ' active' : ''}`}
          onClick={handleToggleSection}
          title="Toggle cross-section side view"
        >
          ⊟ Section
        </button>
        <div id="selected-info">
          Selected: <span id="selected-tile-swatch" /><span id="selected-tile-name">Floor</span>
        </div>
      </div>

      {/* Rect tool options */}
      {activeTool === 'rect' && (
        <div id="rect-subtoolbar">
          <button className={`mst-btn${rectMode === 'draw'  ? ' active' : ''}`} onClick={() => handleRectMode('draw')}>Draw</button>
          <button className={`mst-btn${rectMode === 'erase' ? ' active' : ''}`} onClick={() => handleRectMode('erase')}>Erase</button>
          <div className="tbsep" />
          <span className="mst-label">Corners</span>
          <button className="mst-step" onClick={() => handleCornerRadius(cornerRadius - 1)} disabled={cornerRadius <= 0}>−</button>
          <span className="mst-val">{cornerRadius}</span>
          <button className="mst-step" onClick={() => handleCornerRadius(cornerRadius + 1)} disabled={cornerRadius >= 8}>+</button>
          <div className="tbsep" />
          <button className={`mst-btn${roughOn ? ' active' : ''}`} onClick={() => handleRough(!roughOn)}>Rough</button>
          <div className="tbsep" />
          <button className={`mst-btn${snapOn ? ' active' : ''}`} onClick={() => handleSnap(!snapOn)}>Snap</button>
        </div>
      )}

      {/* Marker sub-toolbar */}
      {activeTool === 'marker' && (
        <div id="marker-subtoolbar">
          <span className="mst-label">Type</span>
          <button className={`mst-btn${markerType === 'number' ? ' active' : ''}`} onClick={() => handleMarkerTypeChange('number')}>① Num</button>
          <button className={`mst-btn${markerType === 'letter' ? ' active' : ''}`} onClick={() => handleMarkerTypeChange('letter')}>Ⓐ Letter</button>
          <button className={`mst-btn${markerType === 'text'   ? ' active' : ''}`} onClick={() => handleMarkerTypeChange('text')}>T Text</button>
          <div className="tbsep" />
          <span className="mst-label">Color</span>
          {MARKER_COLORS.map(c => (
            <button
              key={c}
              className={`mst-color${markerColor === c ? ' active' : ''}`}
              style={{ '--mc': c }}
              onClick={() => handleMarkerColorChange(c)}
              title={c}
            />
          ))}
          <div className="tbsep" />
          <span className="mst-hint">Click to place · Drag to move · Right-click to delete · Double-click to edit</span>
        </div>
      )}

      {/* Token tool hint */}
      {activeTool === 'token' && (
        <div id="token-subtoolbar">
          <span className="mst-hint">Drag from the Content panel onto a square (any tool) · Drag a token to move · Right-click to remove · Double-click to open in a new tab</span>
        </div>
      )}

      {activeTool === 'note' && (
        <div id="token-subtoolbar">
          <span className="mst-hint">Click a square to add a note · Click a note to edit · Drag to move · Right-click to remove · Hover any note to read it</span>
        </div>
      )}

      {/* Main */}
      <div id="main">

        {/* Vertical layers panel */}
        <div id="layers-panel">
          <div className="layers-header">Layers</div>

          <div className="layers-list">
            {levels.map((lv, i) => (
              <button
                key={lv.id}
                className={`layer-tab${i === activeLevel ? ' active' : ''}`}
                {...layerDragHandlers(i)}
                onClick={() => window.editorSwitchLevel?.(i)}
                onDoubleClick={() => handleRename(i, lv.name)}
                title="Drag to reorder · Double-click to rename"
              >
                <span className="layer-tab-name">{lv.name}</span>
                <span className="layer-tab-actions">
                  {sectionOn && (
                    <span
                      className="level-height"
                      onClick={e => { e.stopPropagation(); handleEditHeight(i, lv.height); }}
                      title="Click to edit layer height"
                    >
                      {lv.height}ft
                    </span>
                  )}
                  {levels.length > 1 && (
                    <span
                      className="layer-tab-close"
                      onClick={e => { e.stopPropagation(); window.editorDeleteLevel?.(i); }}
                    >
                      ×
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="layers-footer">
            <button className="layer-add" onClick={() => window.editorAddLevel?.()}>+ Layer</button>
            {activeLevel > 0 && (
              <button
                className={`layer-ghost${ghostAboveOn ? ' active' : ''}`}
                onClick={handleToggleGhostAbove}
                title="Show all layers above as ghost overlay"
              >
                ▲ Ghost
              </button>
            )}
            {activeLevel < levels.length - 1 && (
              <button
                className={`layer-ghost${ghostBelowOn ? ' active' : ''}`}
                onClick={handleToggleGhostBelow}
                title="Show all layers below as ghost overlay"
              >
                ▼ Ghost
              </button>
            )}
          </div>
        </div>

        {/* Tile palette */}
        <div id="palette" />

        {/* Canvas + section panel */}
        <div id="main-right">
          <div id="canvas-wrap">
            <canvas id="editor-canvas" tabIndex={0} />
          </div>
          {sectionOn && (
            <div id="section-panel">
              <canvas id="section-canvas" ref={sectionRef} />
            </div>
          )}
        </div>

        {/* Content panel — drag library content onto squares */}
        <div id="content-panel">
          <div className="layers-header content-header">
            Content
            <button className="content-refresh" onClick={refreshContent} title="Reload from library">↻</button>
          </div>
          <input
            className="content-filter"
            type="text"
            placeholder="Filter…"
            value={contentFilter}
            onChange={e => setContentFilter(e.target.value)}
            spellCheck={false}
          />

          <div className="content-scroll">
            {contentError && <div className="content-empty content-error">{contentError}</div>}

            {placed.length > 0 && (
              <div className="content-section">
                <div className="content-label">On this layer ({placed.length})</div>
                {placed.map(t => (
                  <div key={t.id} className="content-row placed" onClick={() => window.editorFocusToken?.(t.id)} title="Click to centre view">
                    <span className={`content-badge cb-${t.type}`}>{t.type === 'note' ? '≡' : (t.name || '?')[0].toUpperCase()}</span>
                    <span className="content-name">{t.name || (t.type === 'note' ? (t.text || 'Note').split('\n')[0] : t.type)}</span>
                    <span className="content-coord">{t.x},{t.y}</span>
                    {t.type === 'note' && (
                      <button
                        className="content-remove content-edit"
                        title="Edit note"
                        onClick={e => { e.stopPropagation(); window.editorEditNote?.(t.id); }}
                      >✎</button>
                    )}
                    <button
                      className="content-remove"
                      title="Remove from map"
                      onClick={e => { e.stopPropagation(); window.editorRemoveToken?.(t.id); }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            {CONTENT_TYPES.map(({ type, label, single, canCreate }) => {
              const q = contentFilter.trim().toLowerCase();
              const list = (content[type] || []).filter(it => !q || (it.name || '').toLowerCase().includes(q));
              const isCollapsed = collapsed[type];
              return (
                <div key={type} className="content-section">
                  <button
                    className="content-label content-toggle"
                    onClick={() => setCollapsed(c => ({ ...c, [type]: !c[type] }))}
                  >
                    {isCollapsed ? '▸' : '▾'} {label} <span className="content-count">{list.length}</span>
                  </button>
                  {!isCollapsed && (
                    <>
                      {list.length === 0 && (
                        <div className="content-empty">
                          {q ? 'No matches.' : canCreate ? `No ${label.toLowerCase()} yet.` : `No ${label.toLowerCase()} yet. Create one in the Article Editor.`}
                        </div>
                      )}
                      {list.map(it => (
                        <div
                          key={it.id}
                          className="content-row"
                          draggable
                          onDragStart={e => contentDragStart(e, type, it)}
                          title={`Drag onto a square — ${it.name}`}
                        >
                          <span className={`content-badge cb-${type}`}>{(it.name || '?')[0].toUpperCase()}</span>
                          <span className="content-name">{it.name || 'Untitled'}</span>
                        </div>
                      ))}
                      {canCreate && (
                        <form
                          className="content-create"
                          onSubmit={e => { e.preventDefault(); handleCreate(type); }}
                        >
                          <input
                            type="text"
                            placeholder={`New ${single}…`}
                            value={newNames[type] || ''}
                            onChange={e => setNewNames(n => ({ ...n, [type]: e.target.value }))}
                            maxLength={60}
                            spellCheck={false}
                          />
                          <button type="submit" disabled={!(newNames[type] || '').trim()}>+</button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Note hover preview */}
      {noteHover && !noteEdit && (
        <div className="note-card" style={popoverPos(noteHover, 260, 160)}>
          {noteHover.name && <div className="note-card-title">{noteHover.name}</div>}
          <div className="note-card-text">{noteHover.text || <em>Empty note</em>}</div>
        </div>
      )}

      {/* Note editor */}
      {noteEdit && (
        <NoteEditor
          key={noteEdit.id || `${noteEdit.x},${noteEdit.y}`}
          note={noteEdit}
          onClose={() => setNoteEdit(null)}
        />
      )}

      {/* Status bar */}
      <div id="statusbar">
        <span id="status-pos" />
        <span id="status-tile" />
        <span className="sbsep">|</span>
        <span id="status-tool">Tool: rect</span>
        <span id="status-hint">Space or middle-drag to pan · Scroll to zoom · Ctrl+Z undo</span>
      </div>

    </div>
  );
}

// Place a fixed popover just right of its anchor square, kept inside the viewport.
function popoverPos({ screenX, screenY }, w, h) {
  const left = Math.max(8, Math.min(screenX + 8, window.innerWidth - w - 8));
  const top  = Math.max(8, Math.min(screenY, window.innerHeight - h - 8));
  return { left, top, width: w };
}

function NoteEditor({ note, onClose }) {
  const [title, setTitle] = useState(note.name || '');
  const [text,  setText]  = useState(note.text || '');
  const isNew = !note.id;
  const empty = !title.trim() && !text.trim();

  function save() {
    if (empty) { onClose(); return; }
    window.editorSaveNote?.({ id: note.id, x: note.x, y: note.y, name: title, text });
    onClose();
  }
  function remove() {
    window.editorRemoveToken?.(note.id);
    onClose();
  }
  function onKeyDown(e) {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save(); }
  }

  return (
    <>
      <div className="note-backdrop" onMouseDown={save} />
      <div className="note-editor" style={popoverPos(note, 300, 280)} onKeyDown={onKeyDown}>
        <div className="note-editor-head">
          {isNew ? 'New note' : 'Edit note'} <span className="note-editor-coord">({note.x}, {note.y})</span>
        </div>
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={80}
          autoFocus={isNew || !note.text}
        />
        <textarea
          placeholder="What's here? Traps, read-aloud text, DM reminders…"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={7}
          autoFocus={!isNew && !!note.text}
        />
        <div className="note-editor-actions">
          {!isNew && <button className="note-btn danger" onClick={remove}>Delete</button>}
          <span className="note-editor-hint">Ctrl+Enter save · Esc cancel</span>
          <button className="note-btn" onClick={onClose}>Cancel</button>
          <button className="note-btn primary" onClick={save} disabled={isNew && empty}>Save</button>
        </div>
      </div>
    </>
  );
}
