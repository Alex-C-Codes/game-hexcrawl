import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VoxelEditor, BLOCKS, BLOCK_CATS, SCALE_FT } from '../lib/voxelEditor';
import { upsert, getById } from '../lib/storage';
import './voxel3d.css';

const MAX_Y = 7;

export default function Voxel3DPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const containerRef = useRef(null);
  const editorRef    = useRef(null);
  const nameRef      = useRef(null);

  const [tool,    setTool]    = useState('rect');
  const [block,   setBlock]   = useState('floor');
  const [paintY,  setPaintY]  = useState(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const ed = new VoxelEditor(containerRef.current, {
      onHistory: ({ canUndo, canRedo }) => {
        setCanUndo(canUndo);
        setCanRedo(canRedo);
      },
    });
    editorRef.current = ed;

    if (contentId) {
      const saved = getById(contentId);
      if (saved) {
        if (nameRef.current) nameRef.current.value = saved.name || 'Untitled Map';
        ed.fromJSON(saved.data || {});
      }
    }

    const onKey = e => {
      if (e.target.tagName === 'INPUT') return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'z') { e.preventDefault(); ed.undo(); }
      if (ctrl && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) { e.preventDefault(); ed.redo(); }
      if (!ctrl) {
        if (e.key === 'p' || e.key === 'P') { setTool('paint'); ed.setTool('paint'); }
        if (e.key === 'e' || e.key === 'E') { setTool('erase'); ed.setTool('erase'); }
        if (e.key === 'r' || e.key === 'R') { setTool('rect');  ed.setTool('rect');  }
        if (e.key === 'h' || e.key === 'H') { setTool('pan');   ed.setTool('pan');   }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      ed.destroy();
      editorRef.current = null;
    };
  }, [contentId]);

  function handleTool(t) {
    setTool(t);
    editorRef.current?.setTool(t);
  }

  function handleBlock(b) {
    setBlock(b);
    editorRef.current?.setBlock(b);
  }

  function handlePaintY(y) {
    setPaintY(y);
    editorRef.current?.setPaintY(y);
  }

  function handleSave() {
    const ed = editorRef.current;
    if (!ed) return;
    const name = nameRef.current?.value.trim() || 'Untitled Map';
    upsert({
      id:   contentId || crypto.randomUUID(),
      type: 'voxel3d',
      name,
      data: ed.toJSON(),
    });
  }

  function handleExport() {
    const ed = editorRef.current;
    if (!ed) return;
    const name = nameRef.current?.value.trim() || 'Untitled Map';
    const json = JSON.stringify({ name, ...ed.toJSON() }, null, 2);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = `${name.replace(/\s+/g, '_')}.json`;
    a.click();
  }

  function handleLoad() {
    const input = document.createElement('input');
    input.type   = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.name && nameRef.current) nameRef.current.value = data.name;
          editorRef.current?.fromJSON(data);
        } catch { alert('Invalid JSON file'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function handleNew() {
    if (!confirm('Start a new map? Unsaved changes will be lost.')) return;
    if (nameRef.current) nameRef.current.value = 'Untitled Map';
    editorRef.current?.clear();
  }

  return (
    <div id="v3d-root">

      {/* Header */}
      <div id="v3d-header">
        <h1>3D Battlemap</h1>
        <div className="v3d-sep" />
        <span className="v3d-label">Name</span>
        <input ref={nameRef} type="text" defaultValue="Untitled Map" maxLength={60} spellCheck={false} />
        <div className="v3d-sep" />
        <button className="v3d-btn warn"    onClick={handleNew}>New</button>
        <button className="v3d-btn"         onClick={handleLoad}>Load JSON</button>
        <button className="v3d-btn primary" onClick={handleSave}>Save</button>
        <button className="v3d-btn"         onClick={handleExport}>Export JSON</button>
      </div>

      {/* Toolbar */}
      <div id="v3d-toolbar">
        <button className={`v3d-tool${tool === 'pan' ? ' active' : ''}`} onClick={() => handleTool('pan')}>
          Pan <span className="v3d-key">H</span>
        </button>
        <div className="v3d-tbsep" />
        <button className={`v3d-tool${tool === 'paint' ? ' active' : ''}`} onClick={() => handleTool('paint')}>
          Paint <span className="v3d-key">P</span>
        </button>
        <button className={`v3d-tool${tool === 'rect' ? ' active' : ''}`} onClick={() => handleTool('rect')}>
          Rect <span className="v3d-key">R</span>
        </button>
        <button className={`v3d-tool${tool === 'erase' ? ' active' : ''}`} onClick={() => handleTool('erase')}>
          Erase <span className="v3d-key">E</span>
        </button>
        <div className="v3d-tbsep" />
        <button className="v3d-icon-btn" disabled={!canUndo} onClick={() => editorRef.current?.undo()}>↩ Undo</button>
        <button className="v3d-icon-btn" disabled={!canRedo} onClick={() => editorRef.current?.redo()}>↪ Redo</button>
        <div className="v3d-tbsep" />
        <span className="v3d-label">Height:</span>
        {Array.from({ length: MAX_Y + 1 }, (_, i) => (
          <button
            key={i}
            className={`v3d-ylevel${paintY === i ? ' active' : ''}`}
            onClick={() => handlePaintY(i)}
            title={`Place blocks at ${i * SCALE_FT}ft`}
          >{i * SCALE_FT}ft</button>
        ))}
        <span className="v3d-scale-note">1 block = {SCALE_FT}ft</span>
        <div className="v3d-tbsep" />
        <span className="v3d-selected-block">
          <span className="v3d-selected-swatch" style={{ background: BLOCKS[block]?.color }} />
          {BLOCKS[block]?.label}
        </span>
        <div id="v3d-hint">
          Space · Pan &nbsp;|&nbsp; Right-drag · Rotate &nbsp;|&nbsp; Scroll · Zoom
        </div>
      </div>

      {/* Main */}
      <div id="v3d-main">

        {/* Palette */}
        <div id="v3d-palette">
          {BLOCK_CATS.map(cat => {
            const items = Object.entries(BLOCKS).filter(([, d]) => d.cat === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="v3d-cat">{cat}</div>
                {items.map(([key, def]) => (
                  <button
                    key={key}
                    className={`v3d-tile${block === key ? ' selected' : ''}`}
                    onClick={() => handleBlock(key)}
                  >
                    <span className="v3d-swatch" style={{ background: def.color }} />
                    <span className="v3d-tile-label">{def.label}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Three.js canvas container */}
        <div id="v3d-canvas-wrap" ref={containerRef} />

      </div>
    </div>
  );
}
