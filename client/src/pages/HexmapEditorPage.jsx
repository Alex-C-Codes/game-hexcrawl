import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import './hexmap.css';

// ---- Biomes — matches db/seeds/geography_pillar/hex_types.json ----
const BIOMES = {
  ocean:    { label: 'Ocean',    color: '#1a4a6e' },
  coast:    { label: 'Coast',    color: '#3a8abf' },
  plains:   { label: 'Plains',   color: '#7eb05a' },
  forest:   { label: 'Forest',   color: '#2d6a4f' },
  hills:    { label: 'Hills',    color: '#7a9c52' },
  highland: { label: 'Highland', color: '#8a9e72' },
  mountain: { label: 'Mountain', color: '#7a7a8a' },
  desert:   { label: 'Desert',   color: '#c9a84c' },
  swamp:    { label: 'Swamp',    color: '#4a6741' },
};

const DEFAULT_WEIGHTS = {
  ocean: 5, coast: 8, plains: 30, forest: 22,
  hills: 15, highland: 10, mountain: 5, desert: 3, swamp: 2,
};

// ---- Seeded RNG ----
function makeRng(seed) {
  let s = ((Math.abs(seed | 0)) % 2147483647) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ---- Voronoi hex generation around a center point ----
// center is in odd-r offset coords; radius is in hex steps
function generateMap(radius, seed, weights, center) {
  const rng = makeRng(seed);

  // Convert center from odd-r offset → axial
  const cAq = center.q - (center.r - (center.r & 1)) / 2;
  const cAr = center.r;

  // All hexes within radius of center (axial cube coords)
  const hexes = [];
  for (let dq = -radius; dq <= radius; dq++) {
    for (let dr = Math.max(-radius, -dq - radius); dr <= Math.min(radius, -dq + radius); dr++) {
      hexes.push({ aq: cAq + dq, ar: cAr + dr });
    }
  }

  const active = Object.entries(weights).filter(([, w]) => w > 0);
  const totalW = active.reduce((s, [, w]) => s + w, 0);
  if (totalW === 0) {
    return hexes.map(({ aq, ar }) => ({ q: aq + (ar - (ar & 1)) / 2, r: ar, biome: 'plains' }));
  }

  const numSeeds = Math.max(6, Math.floor(hexes.length / 6));
  const seeds = Array.from({ length: numSeeds }, () => {
    let roll = rng() * totalW, acc = 0, biome = active[0][0];
    for (const [b, w] of active) { acc += w; if (roll <= acc) { biome = b; break; } }
    const h = hexes[Math.floor(rng() * hexes.length)];
    return { aq: h.aq, ar: h.ar, biome };
  });

  return hexes.map(({ aq, ar }) => {
    let bestBiome = seeds[0].biome, bestDist = Infinity;
    for (const s of seeds) {
      const dq = aq - s.aq, dr = ar - s.ar;
      const d = (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
      if (d < bestDist) { bestDist = d; bestBiome = s.biome; }
    }
    return { q: aq + (ar - (ar & 1)) / 2, r: ar, biome: bestBiome };
  });
}

// ---- Sidebar label ----
function SLabel({ children }) {
  return (
    <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3a3530', marginBottom: 5 }}>
      {children}
    </div>
  );
}

// ---- Component ----
export default function HexmapEditorPage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const [tab,     setTab]     = useState('biomes');
  const [radius,  setRadius]  = useState(8);
  const [seed,    setSeed]    = useState(() => Math.floor(Math.random() * 99999) + 1);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [center,  setCenter]  = useState(null);   // { q, r } in odd-r offset, or null
  const [picking, setPicking] = useState(false);  // waiting for canvas click

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

  // Cancel pick mode if user switches away from generate tab
  useEffect(() => {
    if (tab !== 'generate' && picking) {
      setPicking(false);
      if (window.hexmapCancelPickCenter) window.hexmapCancelPickCenter();
    }
  }, [tab, picking]);

  const startPick = useCallback(() => {
    if (!window.hexmapStartPickCenter) return;
    setPicking(true);
    window.hexmapStartPickCenter(({ q, r }) => {
      setCenter({ q, r });
      setPicking(false);
    });
  }, []);

  const cancelPick = useCallback(() => {
    setPicking(false);
    if (window.hexmapCancelPickCenter) window.hexmapCancelPickCenter();
  }, []);

  function apply(overrideSeed) {
    if (!center) return;
    const s = overrideSeed ?? seed;
    const hexes = generateMap(radius, s, weights, center);
    if (window.hexmapLoadHexes) window.hexmapLoadHexes(hexes);
  }

  function applyRandom() {
    const s = Math.floor(Math.random() * 99999) + 1;
    setSeed(s);
    apply(s);
  }

  const centerLabel = center ? `(${center.q}, ${center.r})` : 'None';

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
        {/* Sidebar */}
        <div id="hx-sidebar">
          <div id="hx-sidebar-tabs">
            <button className={`hx-stab${tab === 'biomes'   ? ' active' : ''}`} onClick={() => setTab('biomes')}>Biomes</button>
            <button className={`hx-stab${tab === 'generate' ? ' active' : ''}`} onClick={() => setTab('generate')}>Generate</button>
          </div>

          {/* Palette — always in DOM so hexmap.js can populate it */}
          <div id="hx-palette" style={{ display: tab === 'biomes' ? 'flex' : 'none' }} />

          {/* Generate panel */}
          <div id="hx-gen-panel" style={{ display: tab === 'generate' ? 'flex' : 'none' }}>

            {/* Center */}
            <div>
              <SLabel>Center hex</SLabel>
              {picking ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: '0.66rem', color: '#c9a84c', lineHeight: 1.5 }}>
                    Click any hex on the canvas. Esc to cancel.
                  </div>
                  <button className="hx-gen-btn" onClick={cancelPick}>Cancel</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: '0.72rem', color: center ? '#a09060' : '#3a3530', fontFamily: 'Georgia, serif' }}>
                    {centerLabel}
                  </div>
                  <button className="hx-gen-btn" onClick={startPick}>
                    {center ? 'Change center' : 'Pick on map'}
                  </button>
                </div>
              )}
            </div>

            {/* Radius */}
            <div>
              <SLabel>Radius — {radius} hexes</SLabel>
              <input type="range" min={1} max={20} value={radius}
                onChange={e => setRadius(+e.target.value)} className="hx-gen-slider" />
            </div>

            {/* Seed */}
            <div>
              <SLabel>Seed</SLabel>
              <input type="number" className="hx-gen-input" value={seed}
                onChange={e => setSeed(+e.target.value || 1)} />
            </div>

            {/* Biome weights */}
            <div>
              <SLabel>Biome Weights</SLabel>
              {Object.entries(BIOMES).map(([key, { label, color }]) => (
                <div key={key} style={{ marginBottom: 6 }}>
                  <div className="hx-gen-biome-row">
                    <span className="hx-gen-biome-swatch" style={{ background: color }} />
                    <span className="hx-gen-biome-name">{label}</span>
                    <span className="hx-gen-biome-val">{weights[key]}</span>
                  </div>
                  <input type="range" min={0} max={60} value={weights[key]}
                    onChange={e => setWeights(w => ({ ...w, [key]: +e.target.value }))}
                    className="hx-gen-slider" />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hx-gen-actions">
              {!center && (
                <div style={{ fontSize: '0.64rem', color: '#3a3530', textAlign: 'center', marginBottom: 4 }}>
                  Pick a center hex first
                </div>
              )}
              <button className="hx-gen-btn primary" onClick={() => apply()} disabled={!center || picking}>
                Apply to canvas
              </button>
              <button className="hx-gen-btn" onClick={applyRandom} disabled={!center || picking}>
                Random seed + apply
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div id="hx-canvas-wrap">
          <canvas id="hx-canvas" tabIndex={0} />
          <div id="hx-toast" />
          {picking && (
            <div style={{
              position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(10,8,6,0.9)', border: '1px solid #c9a84c',
              borderRadius: 6, color: '#c9a84c', fontSize: '0.75rem',
              padding: '6px 16px', pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>
              Click a hex to set the generation center · Esc to cancel
            </div>
          )}
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
