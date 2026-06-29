import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './settlement.css';

export default function SettlementPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  useEffect(() => {
    window.__settlementContentId = contentId;

    const script = document.createElement('script');
    script.src = '/settlement.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      if (window.cleanupSettlement) window.cleanupSettlement();
      window.__settlementContentId = null;
      const s = document.querySelector('script[src="/settlement.js"]');
      if (s) document.body.removeChild(s);
    };
  }, [contentId]);

  return (
    <div id="settlement-root">

      {/* Header */}
      <div id="st-header">
        <h1>Settlement Editor</h1>
        <div className="st-sep" />
        <span className="st-hdr-label">Name</span>
        <input type="text" id="st-input-name" defaultValue="Untitled Settlement" maxLength={60} spellCheck={false} />
        <div className="st-sep" />
        <button id="btn-st-new"    className="st-hdr-btn warn">New</button>
        <button id="btn-st-load"   className="st-hdr-btn">Load JSON</button>
        <button id="btn-st-save"   className="st-hdr-btn primary">Save</button>
        <button id="btn-st-export" className="st-hdr-btn">Export JSON</button>
        <button id="btn-st-fit"    className="st-hdr-btn">Fit View</button>
        <input type="file" id="st-file-input" accept=".json" style={{ display: 'none' }} />
      </div>

      {/* Toolbar */}
      <div id="st-toolbar">
        <button className="st-tool-btn" data-tool="rect">Rect <span className="st-key">R</span></button>
        <button className="st-tool-btn" data-tool="paint">Paint <span className="st-key">B</span></button>
        <button className="st-tool-btn" data-tool="erase">Erase <span className="st-key">E</span></button>
        <button className="st-tool-btn" data-tool="fill">Fill <span className="st-key">F</span></button>
        <button className="st-tool-btn" data-tool="pick">Pick <span className="st-key">P</span></button>
        <button className="st-tool-btn" data-tool="pan">Pan <span className="st-key">H</span></button>
        <div className="st-tbsep" />
        <button id="btn-st-undo" className="st-icon-btn">↩ Undo</button>
        <button id="btn-st-redo" className="st-icon-btn">↪ Redo</button>
        <div id="st-selected-info">
          Selected: <span id="st-selected-swatch" /><span id="st-selected-name">Grass</span>
        </div>
      </div>

      {/* Main */}
      <div id="st-main">
        <div id="st-palette" />
        <div id="st-canvas-wrap">
          <canvas id="st-canvas" tabIndex={0} />
        </div>
      </div>

      {/* Status bar */}
      <div id="st-statusbar">
        <span id="st-status-pos" />
        <span id="st-status-tile" />
        <span className="st-sbsep">|</span>
        <span id="st-status-tool">Tool: paint</span>
        <span id="st-status-hint">Space or middle-drag to pan · Scroll to zoom · Ctrl+Z undo · Right-click to erase</span>
      </div>

    </div>
  );
}
