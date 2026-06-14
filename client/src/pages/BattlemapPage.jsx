import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './battlemap.css';

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  useEffect(() => {
    window.__editorContentId = contentId;

    const script = document.createElement('script');
    script.src = '/editor.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      if (window.cleanupEditor) window.cleanupEditor();
      window.__editorContentId = null;
      const s = document.querySelector('script[src="/editor.js"]');
      if (s) document.body.removeChild(s);
    };
  }, [contentId]);

  return (
    <div id="editor-root">
      <div id="header">
        <h1>Dungeon Editor</h1>
        <div className="sep" />
        <span className="hdr-label">Name</span>
        <input type="text" id="input-name" defaultValue="Untitled Dungeon" maxLength={60} spellCheck={false} />
        <div className="sep" />
        <span className="hdr-label">Size</span>
        <input type="number" id="input-width"  className="size-input" defaultValue={40} min={5} max={100} />
        <span className="hdr-x">×</span>
        <input type="number" id="input-height" className="size-input" defaultValue={30} min={5} max={100} />
        <button id="btn-resize" className="hdr-btn">Resize</button>
        <div className="sep" />
        <button id="btn-new"    className="hdr-btn warn">New</button>
        <button id="btn-load"   className="hdr-btn">Load JSON</button>
        <button id="btn-save"   className="hdr-btn primary">Save</button>
        <button id="btn-export" className="hdr-btn">Export JSON</button>
        <button id="btn-fit"    className="hdr-btn">Fit View</button>
        <input type="file" id="file-input" accept=".json" style={{ display: 'none' }} />
      </div>

      <div id="toolbar">
        <button className="tool-btn" data-tool="paint">Paint <span className="key">B</span></button>
        <button className="tool-btn" data-tool="erase">Erase <span className="key">E</span></button>
        <button className="tool-btn" data-tool="fill">Fill <span className="key">F</span></button>
        <button className="tool-btn" data-tool="rect">Rect <span className="key">R</span></button>
        <button className="tool-btn" data-tool="pick">Pick <span className="key">P</span></button>
        <div className="tbsep" />
        <button id="btn-undo" className="icon-btn">↩ Undo</button>
        <button id="btn-redo" className="icon-btn">↪ Redo</button>
        <div id="selected-info">
          Selected: <span id="selected-tile-swatch" /><span id="selected-tile-name">Wall</span>
        </div>
      </div>

      <div id="main">
        <div id="palette" />
        <div id="canvas-wrap">
          <canvas id="editor-canvas" tabIndex={0} />
        </div>
      </div>

      <div id="statusbar">
        <span id="status-pos" />
        <span id="status-tile" />
        <span className="sbsep">|</span>
        <span id="status-tool">Tool: rect</span>
        <span className="sbsep">|</span>
        <span id="status-size">40 × 30</span>
        <span id="status-hint">Right-click or middle-drag to pan · Scroll to zoom · Ctrl+Z undo</span>
      </div>
    </div>
  );
}
