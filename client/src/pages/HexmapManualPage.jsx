import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './hexmap.css';

export default function HexmapManualPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  useEffect(() => {
    window.__hexmapContentId = contentId;

    const script = document.createElement('script');
    script.src = '/hexmap.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      if (window.cleanupHexmap) window.cleanupHexmap();
      window.__hexmapContentId = null;
      const s = document.querySelector('script[src="/hexmap.js"]');
      if (s) document.body.removeChild(s);
    };
  }, [contentId]);

  return (
    <div id="hexmap-root">
      <div id="hx-header">
        <h1>Hex Map Editor</h1>
        <div className="hx-sep" />
        <span className="hx-label">Name</span>
        <input type="text" id="hx-input-name" defaultValue="Untitled Hex Map" maxLength={60} spellCheck={false} />
        <div className="hx-sep" />
        <button id="btn-hx-save"   className="hx-btn primary">Save</button>
        <button id="btn-hx-export" className="hx-btn">Export JSON</button>
        <button id="btn-hx-fit"    className="hx-btn">Fit View</button>
      </div>

      <div id="hx-toolbar">
        <button className="hx-tool-btn" data-tool="paint">Paint <span className="hx-key">B</span></button>
        <button className="hx-tool-btn" data-tool="erase">Erase <span className="hx-key">E</span></button>
        <button className="hx-tool-btn" data-tool="fill">Fill <span className="hx-key">F</span></button>
        <button className="hx-tool-btn" data-tool="pick">Pick <span className="hx-key">P</span></button>
        <div className="hx-tbsep" />
        <button id="btn-hx-undo" className="hx-tool-btn">↩ Undo</button>
        <button id="btn-hx-redo" className="hx-tool-btn">↪ Redo</button>
        <div id="hx-selected-info">
          Selected: <span id="hx-selected-tile-swatch" /><span id="hx-selected-tile-name">Plains</span>
        </div>
      </div>

      <div id="hx-main">
        <div id="hx-palette" />
        <div id="hx-canvas-wrap">
          <canvas id="hx-canvas" tabIndex={0} />
          <div id="hx-toast" />
        </div>
      </div>

      <div id="hx-statusbar">
        <span id="hx-status-pos" />
        <span id="hx-status-tile" />
        <span className="sbsep">|</span>
        <span id="hx-status-tool">Tool: paint</span>
        <span id="hx-status-hint">Right-click or middle-drag to pan · Scroll to zoom · Ctrl+Z undo</span>
      </div>
    </div>
  );
}
