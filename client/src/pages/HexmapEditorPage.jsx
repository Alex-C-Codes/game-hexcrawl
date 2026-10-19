import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { getByType } from '../lib/storage';
import './hexmap.css';

const LINK_OPEN_PATHS = { article: '/create/article', battlemap: '/create/battlemap' };
const LINK_TYPE_LABELS = { article: 'Article', battlemap: 'Battlemap' };
const LINK_TYPE_BADGES = { article: 'A', battlemap: 'B' };

// Paintable attribute layers — zone-of-influence style overlays. Mirrors the
// ATTRIBUTE_TYPES registry in hexmap.js; adding a new paintable attribute
// means adding an entry here too (label + where to send "create a new one").
const ATTRIBUTE_TYPES = {
  faction: { label: 'Faction', createPath: '/create/faction' },
};

// ---- Biomes, grouped by setting — Classic matches db/seeds/geography_pillar/hex_types.json ----
const BIOME_CATEGORIES = [
  {
    id: 'classic', label: 'Classic',
    biomes: {
      ocean:      { label: 'Ocean',      color: '#1a4a6e', weight: 5 },
      coast:      { label: 'Coast',      color: '#3a8abf', weight: 8 },
      plains:     { label: 'Plains',     color: '#7eb05a', weight: 30 },
      grassland:  { label: 'Grassland',  color: '#9bc25c', weight: 20 },
      farm:       { label: 'Farm',       color: '#b8a852', weight: 0 },
      forest:     { label: 'Forest',     color: '#2d6a4f', weight: 22 },
      jungle:     { label: 'Jungle',     color: '#1f5c38', weight: 10 },
      mushroomforest: { label: 'Mushroom Forest', color: '#3a6a4a', weight: 0 },
      worldtree:      { label: 'World Tree',      color: '#4a5a3a', weight: 0 },
      hills:      { label: 'Hills',      color: '#7a9c52', weight: 15 },
      highland:   { label: 'Highland',   color: '#8a9e72', weight: 10 },
      mountain:   { label: 'Mountain',   color: '#7a7a8a', weight: 5 },
      tundra:     { label: 'Tundra',     color: '#a8c4d4', weight: 4 },
      desert:     { label: 'Desert',     color: '#c9a84c', weight: 3 },
      swamp:      { label: 'Swamp',      color: '#4a6741', weight: 2 },
      settlement: { label: 'Settlement', color: '#8a6030', weight: 0 },
      beacon:     { label: 'Beacon',     color: '#b23a2e', weight: 0 },
      fort:       { label: 'Fort',       color: '#6a6a78', weight: 0 },
      tower:        { label: 'Tower',        color: '#8a8078', weight: 0 },
      ancientruins: { label: 'Ruins',        color: '#7a8070', weight: 0 },
      temple:       { label: 'Temple',       color: '#d4c896', weight: 0 },
    },
  },
  {
    id: 'undead', label: 'Undead',
    biomes: {
      graveyard:      { label: 'Graveyard',       color: '#5a5a52', weight: 0 },
      hauntedforest:  { label: 'Haunted Forest',  color: '#2a3a30', weight: 0 },
      necropolis:     { label: 'Necropolis',      color: '#8a8a92', weight: 0 },
      bonefields:     { label: 'Bone Fields',     color: '#c9c0a0', weight: 0 },
      cursedswamp:    { label: 'Cursed Swamp',    color: '#3a4a42', weight: 0 },
      crypt:          { label: 'Crypt',           color: '#2a2a30', weight: 0 },
      witheredwastes: { label: 'Withered Wastes', color: '#6a6050', weight: 0 },
    },
  },
  {
    id: 'sky', label: 'Sky Islands',
    biomes: {
      void:     { label: 'Void',           color: '#0d0d1f', weight: 0 },
      cloudsea: { label: 'Cloud Sea',       color: '#8ec9ee', weight: 0 },
      skyreef:  { label: 'Sky Reef',        color: '#5c8a6f', weight: 0 },
      storm:    { label: 'Storm Front',     color: '#453a5e', weight: 0 },
      crystal:  { label: 'Crystal Spire',   color: '#8f6fd1', weight: 0 },
      ashfall:  { label: 'Ashfall Isle',    color: '#4a3d38', weight: 0 },
      ruins:    { label: 'Ruined Isle',     color: '#a99872', weight: 0 },
      skydock:  { label: 'Skydock',         color: '#c98a4c', weight: 0 },
      airship:        { label: 'Airship',        color: '#7a8ba0', weight: 0 },
      flyingfortress: { label: 'Flying Fortress', color: '#5a5a68', weight: 0 },
      crackedland:    { label: 'Cracked Land',   color: '#8a7860', weight: 0 },
    },
  },
  {
    id: 'wasteland', label: 'Wasteland',
    biomes: {
      wastes:      { label: 'Irradiated Wastes', color: '#8a8a4a', weight: 0 },
      ruinfield:   { label: 'Ruined City',       color: '#5a5650', weight: 0 },
      craterzone:  { label: 'Blast Crater',      color: '#3a4a2e', weight: 0 },
      deadforest:  { label: 'Dead Forest',       color: '#554d40', weight: 0 },
      toxicswamp:  { label: 'Toxic Sludge',      color: '#5a6b3a', weight: 0 },
      dunefield:   { label: 'Ashen Dunes',       color: '#a89f88', weight: 0 },
      junkyard:    { label: 'Scrapyard',         color: '#7a5236', weight: 0 },
      bunker:      { label: 'Bunker Outpost',    color: '#4a5240', weight: 0 },
    },
  },
  {
    id: 'steampunk', label: 'Steampunk',
    biomes: {
      factoryland:  { label: 'Factory District', color: '#4a4038', weight: 0 },
      clockwork:    { label: 'Clockwork Hills',  color: '#8a7040', weight: 0 },
      railway:      { label: 'Rail Yards',       color: '#6a5a4a', weight: 0 },
      aetherfield:  { label: 'Aether Fields',    color: '#5a7a9c', weight: 0 },
      smogmarsh:    { label: 'Smog Marsh',       color: '#5a5a3a', weight: 0 },
      slagmountain: { label: 'Slag Peaks',       color: '#6a4a42', weight: 0 },
      airdock:      { label: 'Airship Yard',     color: '#b5793f', weight: 0 },
      quarry:       { label: 'Coal Quarry',      color: '#3a352f', weight: 0 },
    },
  },
  {
    id: 'underdark', label: 'Underdark',
    biomes: {
      cavern:           { label: 'Cavern',           color: '#3a3038', weight: 0 },
      chasm:            { label: 'Chasm',             color: '#0a0a12', weight: 0 },
      fungalforest:     { label: 'Fungal Forest',     color: '#4a6b5c', weight: 0 },
      undergroundlake:  { label: 'Underground Lake',  color: '#1a2a3a', weight: 0 },
      crystalcave:      { label: 'Crystal Cave',      color: '#3a6a6e', weight: 0 },
      lavatube:         { label: 'Lava Tube',         color: '#4a2a20', weight: 0 },
      deeproad:         { label: 'Deep Road',         color: '#6a6258', weight: 0 },
      drowoutpost:      { label: 'Drow Outpost',      color: '#3a2a4a', weight: 0 },
    },
  },
];

const BIOMES = Object.assign({}, ...BIOME_CATEGORIES.map(c => c.biomes));
const DEFAULT_WEIGHTS = Object.fromEntries(Object.entries(BIOMES).map(([k, b]) => [k, b.weight]));

// ---- Map layers — mirror of [{id,name}] managed live by public/hexmap.js ----
const DEFAULT_LAYERS = [
  { id: '_sky',       name: 'Sky Islands' },
  { id: '_realm',     name: 'Realm' },
  { id: '_underdark', name: 'Underdark' },
];

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
  const navigate = useNavigate();

  const [tab,      setTab]     = useState('biomes');
  const [layers,   setLayers]  = useState(DEFAULT_LAYERS);
  const [activeLayerIdx, setActiveLayerIdx] = useState(1);
  const [dragLayerIdx,   setDragLayerIdx]   = useState(null);
  const [dragOverIdx,    setDragOverIdx]    = useState(null);
  const [ghostAbove, setGhostAbove] = useState(false);
  const [ghostBelow, setGhostBelow] = useState(false);
  const [radiusToolValue, setRadiusToolValue] = useState(3);
  const [radiusToolMode,  setRadiusToolMode]  = useState('ring');
  const [radius,   setRadius]  = useState(8);
  const [seed,     setSeed]    = useState(() => Math.floor(Math.random() * 99999) + 1);
  const [weights,  setWeights] = useState(DEFAULT_WEIGHTS);
  const [center,   setCenter]  = useState(null);
  const [picking,  setPicking] = useState(false);
  const [articles,   setArticles]   = useState([]);
  const [battlemaps, setBattlemaps] = useState([]);
  const [links,      setLinks]      = useState([]);
  const [attributeType, setAttributeType] = useState('faction');
  const [selectedHex, setSelectedHex] = useState(null); // hexmap.js's buildHexInfo() result
  const [hoverCard,  setHoverCard]  = useState(null); // { links: [{name,type,preview}], x, y, size }
  const articlesMapRef   = useRef(new Map());
  const battlemapsMapRef = useRef(new Map());

  const refreshLinkables = useCallback(async () => {
    const [articleList, battlemapList] = await Promise.all([
      getByType('article'),
      getByType('battlemap'),
    ]);
    setArticles(articleList);
    setBattlemaps(battlemapList);
    articlesMapRef.current   = new Map(articleList.map(a => [a.id, a]));
    battlemapsMapRef.current = new Map(battlemapList.map(b => [b.id, b]));
  }, []);

  useEffect(() => {
    window.__hexmapContentId = contentId;
    window.__hexmapOnLinksChanged = () => {
      if (window.hexmapGetAllLinks) setLinks(window.hexmapGetAllLinks());
    };

    window.__hexmapOnLayersChanged = (list, activeIdx) => {
      setLayers(list);
      setActiveLayerIdx(activeIdx);
    };

    window.__hexmapOnGhostChanged = (above, below) => {
      setGhostAbove(above);
      setGhostBelow(below);
    };

    window.__hexmapOnHexHover = (q, r, hexLinks) => {
      if (!hexLinks || !hexLinks.length || q === null) { setHoverCard(null); return; }
      const pos = window.hexmapGetHexScreenPos?.(q, r);
      if (!pos) { setHoverCard(null); return; }
      const enriched = hexLinks.map(link => {
        const item = link.type === 'battlemap'
          ? battlemapsMapRef.current.get(link.id)
          : articlesMapRef.current.get(link.id);
        const preview = link.type === 'article'
          ? (item?.data?.text || '').replace(/\s+/g, ' ').trim().slice(0, 200)
          : '';
        return { ...link, preview };
      });
      setHoverCard({ links: enriched, q, r, x: pos.x, y: pos.y, size: pos.size });
    };

    window.__hexmapOnLinkClick = (link) => {
      const path = LINK_OPEN_PATHS[link.type];
      if (path) navigate(`${path}?id=${link.id}`);
    };

    window.__hexmapOnHexSelect = (q, r, info) => {
      setSelectedHex(info);
    };

    refreshLinkables();

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
  }, [contentId, refreshLinkables, navigate]);

  // Refresh article list and links when the Links tab is opened, or the active layer changes
  useEffect(() => {
    if (tab === 'links') {
      refreshLinkables();
      if (window.hexmapGetAllLinks) setLinks(window.hexmapGetAllLinks());
    }
  }, [tab, activeLayerIdx, refreshLinkables]);

  // Attributes tab: point paint/erase/fill/radius/pick at the selected
  // attribute layer (e.g. faction) instead of the biome grid, and back again on exit.
  useEffect(() => {
    if (tab === 'attributes') {
      window.hexmapEnterAttributeMode?.(attributeType);
    } else {
      window.hexmapExitAttributeMode?.();
    }
  }, [tab, attributeType]);

  const switchLayer = useCallback((idx) => {
    window.hexmapSwitchLayer?.(idx);
  }, []);

  const addLayer = useCallback(() => {
    window.hexmapAddLayer?.();
  }, []);

  const renameLayer = useCallback((idx, currentName) => {
    const name = window.prompt('Rename layer:', currentName);
    if (name && name.trim()) window.hexmapRenameLayer?.(idx, name.trim());
  }, []);

  const deleteLayer = useCallback((idx, name) => {
    if (!window.confirm(`Delete layer "${name}"? This cannot be undone.`)) return;
    window.hexmapDeleteLayer?.(idx);
  }, []);

  const toggleGhostAbove = useCallback(() => window.hexmapToggleGhostAbove?.(), []);
  const toggleGhostBelow = useCallback(() => window.hexmapToggleGhostBelow?.(), []);

  const changeRadiusToolValue = useCallback((n) => {
    setRadiusToolValue(n);
    window.hexmapSetRadiusValue?.(n);
  }, []);

  const changeRadiusToolMode = useCallback((mode) => {
    setRadiusToolMode(mode);
    window.hexmapSetRadiusMode?.(mode);
  }, []);

  const exportPdf = useCallback(async () => {
    const pages = window.hexmapExportPdfPages?.();
    if (!pages || !pages.length) {
      window.hexmapShowToast?.('Nothing drawn yet — paint some hexes first.');
      return;
    }
    const { jsPDF } = await import('jspdf');
    // jsPDF's 'px' unit distorts page size vs. image size when width/height are passed
    // as a raw format array — 'pt' with 1 image-pixel == 1 point avoids that entirely.
    // Orientation must be passed explicitly too, or jsPDF silently swaps w/h to force portrait.
    const orientationOf = (page) => (page.width >= page.height ? 'landscape' : 'portrait');
    const doc = new jsPDF({ unit: 'pt', format: [pages[0].width, pages[0].height], orientation: orientationOf(pages[0]), compress: true });
    pages.forEach((page, i) => {
      if (i > 0) doc.addPage([page.width, page.height], orientationOf(page));
      doc.addImage(page.dataUrl, 'PNG', 0, 0, page.width, page.height);
      // Label each page with its layer name so a multi-layer export stays legible
      doc.setFillColor(10, 8, 6);
      doc.rect(0, 0, Math.min(240, page.width), 34, 'F');
      doc.setTextColor(201, 168, 76);
      doc.setFontSize(18);
      doc.text(page.name, 12, 23);
    });
    const name = document.getElementById('hx-input-name')?.value || 'Untitled Hex Map';
    doc.save(`${name}.pdf`);
  }, []);

  const exportJpg = useCallback(() => {
    const pages = window.hexmapExportImages?.('image/jpeg');
    if (!pages || !pages.length) {
      window.hexmapShowToast?.('Nothing drawn yet — paint some hexes first.');
      return;
    }
    const mapName = document.getElementById('hx-input-name')?.value || 'Untitled Hex Map';
    // One file per non-empty layer — a single image can't hold multiple layers the way a PDF can.
    pages.forEach(page => {
      const suffix = pages.length > 1 ? ` - ${page.name}` : '';
      const a = document.createElement('a');
      a.href = page.dataUrl;
      a.download = `${mapName}${suffix}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, []);

  const layerDragHandlers = useCallback((idx) => ({
    draggable: true,
    onDragStart: (e) => {
      setDragLayerIdx(idx);
      e.dataTransfer.effectAllowed = 'move';
    },
    onDragOver: (e) => {
      e.preventDefault();
      if (dragOverIdx !== idx) setDragOverIdx(idx);
    },
    onDragLeave: () => {
      setDragOverIdx(o => (o === idx ? null : o));
    },
    onDrop: (e) => {
      e.preventDefault();
      setDragOverIdx(null);
      const from = dragLayerIdx;
      setDragLayerIdx(null);
      if (from === null || from === idx) return;
      window.hexmapReorderLayer?.(from, idx);
    },
    onDragEnd: () => {
      setDragLayerIdx(null);
      setDragOverIdx(null);
    },
  }), [dragLayerIdx, dragOverIdx]);

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
        <button className="hx-btn" onClick={exportPdf}>Export PDF</button>
        <button className="hx-btn" onClick={exportJpg}>Export JPG</button>
        <button id="btn-hx-fit"    className="hx-btn">Fit View</button>
      </div>

      <div id="hx-layerbar">
        <span className="hx-layerbar-label">Layers</span>
        <div id="hx-layer-tabs">
          {layers.map((l, i) => (
            <div
              key={l.id}
              className={
                'hx-layer-tab'
                + (i === activeLayerIdx ? ' active' : '')
                + (dragLayerIdx === i ? ' dragging' : '')
                + (dragOverIdx === i && dragLayerIdx !== i ? ' dragover' : '')
              }
              title="Drag to reorder · Double-click to rename"
              onClick={() => switchLayer(i)}
              onDoubleClick={() => renameLayer(i, l.name)}
              {...layerDragHandlers(i)}
            >
              <span className="hx-layer-tab-name">{l.name}</span>
              {layers.length > 1 && (
                <button
                  className="hx-layer-tab-close"
                  title="Delete layer"
                  onClick={e => { e.stopPropagation(); deleteLayer(i, l.name); }}
                >×</button>
              )}
            </div>
          ))}
        </div>
        <button className="hx-layer-add" onClick={addLayer}>+ Layer</button>
        <div className="hx-tbsep" />
        {activeLayerIdx > 0 && (
          <button
            className={`hx-layer-ghost${ghostAbove ? ' active' : ''}`}
            title={`Faintly show "${layers[activeLayerIdx - 1]?.name}" above`}
            onClick={toggleGhostAbove}
          >▲ Ghost</button>
        )}
        {activeLayerIdx < layers.length - 1 && (
          <button
            className={`hx-layer-ghost${ghostBelow ? ' active' : ''}`}
            title={`Faintly show "${layers[activeLayerIdx + 1]?.name}" below`}
            onClick={toggleGhostBelow}
          >▼ Ghost</button>
        )}
      </div>

      <div id="hx-toolbar">
        <button className="hx-tool-btn" data-tool="paint">Paint <span className="hx-key">B</span></button>
        <button className="hx-tool-btn" data-tool="erase">Erase <span className="hx-key">E</span></button>
        <button className="hx-tool-btn" data-tool="fill">Fill <span className="hx-key">F</span></button>
        <button className="hx-tool-btn" data-tool="pick">Pick <span className="hx-key">P</span></button>
        <button className="hx-tool-btn" data-tool="route">Route <span className="hx-key">R</span></button>
        <button className="hx-tool-btn" data-tool="radius">Radius</button>
        <input
          type="number" min={0} max={30} value={radiusToolValue}
          onChange={e => changeRadiusToolValue(Math.max(0, Math.min(30, +e.target.value || 0)))}
          className="hx-gen-input" title="Radius (hexes)"
          style={{ width: 40, padding: '4px 5px' }}
        />
        <select
          value={radiusToolMode}
          onChange={e => changeRadiusToolMode(e.target.value)}
          className="hx-gen-input" title="Ring: just the outer edge · Fill: solid disk"
          style={{ width: 62, padding: '4px 5px' }}
        >
          <option value="ring">Ring</option>
          <option value="fill">Fill</option>
        </select>
        <button className="hx-tool-btn" data-tool="pan">Pan <span className="hx-key">H</span></button>
        <button className="hx-tool-btn" data-tool="select">Select <span className="hx-key">S</span></button>
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
            <button className={`hx-stab${tab === 'routes'   ? ' active' : ''}`} onClick={() => setTab('routes')}>Routes</button>
            <button className={`hx-stab${tab === 'generate' ? ' active' : ''}`} onClick={() => setTab('generate')}>Generate</button>
            <button className={`hx-stab${tab === 'links'    ? ' active' : ''}`} onClick={() => setTab('links')}>Links</button>
            <button className={`hx-stab${tab === 'attributes' ? ' active' : ''}`} onClick={() => setTab('attributes')}>Attributes</button>
          </div>

          {/* Palette — always in DOM so hexmap.js can populate it */}
          <div id="hx-palette" style={{ display: tab === 'biomes' ? 'flex' : 'none' }} />

          {/* Route palette — always in DOM so hexmap.js can populate it */}
          <div id="hx-route-palette" style={{ display: tab === 'routes' ? 'flex' : 'none' }} />

          {/* Attributes panel */}
          {tab === 'attributes' && (
            <div id="hx-attributes-panel">
              <label className="hx-links-label" style={{ display: 'block', marginBottom: 6 }}>
                Painting
                <select
                  value={attributeType}
                  onChange={e => setAttributeType(e.target.value)}
                  className="hx-gen-input"
                  style={{ display: 'block', width: '100%', marginTop: 4 }}
                >
                  {Object.entries(ATTRIBUTE_TYPES).map(([key, def]) => (
                    <option key={key} value={key}>{def.label}</option>
                  ))}
                </select>
              </label>
              <div className="hx-links-label" style={{ marginBottom: 4 }}>
                Click a {ATTRIBUTE_TYPES[attributeType].label.toLowerCase()} below, then paint/erase/fill/radius onto the map
              </div>
              {/* Populated live by hexmap.js from saved library items of this attribute's type */}
              <div id="hx-attribute-palette" />
              <Link to={ATTRIBUTE_TYPES[attributeType].createPath} className="hx-attr-create-link">
                + New {ATTRIBUTE_TYPES[attributeType].label}
              </Link>
            </div>
          )}

          {/* Links panel */}
          {tab === 'links' && (
            <div id="hx-links-panel">
              {/* Linked hexes */}
              {links.length > 0 && (
                <div className="hx-links-section">
                  <div className="hx-links-label">On this map</div>
                  {links.map(l => (
                    <div key={`${l.q},${l.r},${l.type},${l.id}`} className="hx-link-row">
                      <span className="hx-link-badge" title={LINK_TYPE_LABELS[l.type]}>{LINK_TYPE_BADGES[l.type]}</span>
                      <span className="hx-link-name" title={l.name}>{l.name}</span>
                      <span className="hx-link-coord">({l.q},{l.r})</span>
                      <button
                        className="hx-link-unlink"
                        title="Remove link"
                        onClick={() => {
                          if (window.hexmapUnlinkLink) window.hexmapUnlinkLink(l.q, l.r, l.id, l.type);
                        }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Available articles */}
              <div className="hx-links-section">
                <div className="hx-links-label">Drag an article to a hex</div>
                {articles.length === 0 ? (
                  <div className="hx-links-empty">No articles saved yet.<br />Create one in the Article Editor.</div>
                ) : (
                  articles.map(a => (
                    <div
                      key={a.id}
                      className="hx-draggable-article"
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.setData('application/hexmap-link', JSON.stringify({ id: a.id, name: a.name, type: 'article' }));
                        e.dataTransfer.effectAllowed = 'link';
                      }}
                    >
                      <span className="hx-link-badge">A</span>
                      <span className="hx-link-name" title={a.name}>{a.name}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Available battlemaps */}
              <div className="hx-links-section">
                <div className="hx-links-label">Drag a battlemap to a hex</div>
                {battlemaps.length === 0 ? (
                  <div className="hx-links-empty">No battlemaps saved yet.<br />Create one in the Battlemap Editor.</div>
                ) : (
                  battlemaps.map(b => (
                    <div
                      key={b.id}
                      className="hx-draggable-article"
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.setData('application/hexmap-link', JSON.stringify({ id: b.id, name: b.name, type: 'battlemap' }));
                        e.dataTransfer.effectAllowed = 'link';
                      }}
                    >
                      <span className="hx-link-badge hx-link-badge-battlemap">B</span>
                      <span className="hx-link-name" title={b.name}>{b.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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
              {BIOME_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5040', marginBottom: 5 }}>
                    {cat.label}
                  </div>
                  {Object.entries(cat.biomes).map(([key, { label, color }]) => (
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

        {/* Inspect panel — Select tool (S). Shows everything known about the
            clicked hex: biome, route, attributes (faction, etc.), and links. */}
        {selectedHex && (
          <div id="hx-inspect-panel">
            <div className="hx-inspect-header">
              <span>Hex ({selectedHex.q}, {selectedHex.r})</span>
              <button className="hx-link-unlink" onClick={() => setSelectedHex(null)} title="Close">×</button>
            </div>

            <div className="hx-inspect-section">
              <div className="hx-links-label">Biome</div>
              {selectedHex.biome ? (
                <div className="hx-inspect-row">
                  <span className="hx-pal-swatch" style={{ background: selectedHex.biome.color }} />
                  {selectedHex.biome.label}
                </div>
              ) : (
                <div className="hx-links-empty">No terrain painted here.</div>
              )}
            </div>

            {selectedHex.route && (
              <div className="hx-inspect-section">
                <div className="hx-links-label">Route</div>
                <div className="hx-inspect-row">
                  <span className="hx-pal-swatch" style={{ background: selectedHex.route.color }} />
                  {selectedHex.route.label}
                </div>
              </div>
            )}

            <div className="hx-inspect-section">
              <div className="hx-links-label">Attributes</div>
              {selectedHex.attributes.length === 0 ? (
                <div className="hx-links-empty">None painted here.</div>
              ) : (
                selectedHex.attributes.map(a => (
                  <div key={a.attrKey} className="hx-inspect-row">
                    <span className="hx-pal-swatch" style={{ background: a.value.color }} />
                    {a.label}: {a.value.name}
                  </div>
                ))
              )}
            </div>

            <div className="hx-inspect-section">
              <div className="hx-links-label">Links</div>
              {selectedHex.links.length === 0 ? (
                <div className="hx-links-empty">No article or battlemap linked.</div>
              ) : (
                selectedHex.links.map(l => (
                  <div
                    key={`${l.type},${l.id}`}
                    className="hx-link-row hx-inspect-link"
                    onClick={() => {
                      const path = LINK_OPEN_PATHS[l.type];
                      if (path) navigate(`${path}?id=${l.id}`);
                    }}
                  >
                    <span className="hx-link-badge">{LINK_TYPE_BADGES[l.type]}</span>
                    <span className="hx-link-name" title={l.name}>{l.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Link hover card — mirrors the settlement card in the play tab. One row per
            link on the hex; click a row (or its badge on the canvas) to open it. */}
        {hoverCard && (
          <div id="hx-article-card" style={{
            left: Math.max(8, Math.min(hoverCard.x - 120, window.innerWidth - 264)),
            top:  hoverCard.y - hoverCard.size * 1.4,
            transform: 'translateY(-100%)',
          }}>
            {hoverCard.links.map((link, i) => (
              <div
                key={`${link.type},${link.id}`}
                className="hx-ac-row"
                style={{ borderTop: i > 0 ? '1px solid #25180a' : 'none', marginTop: i > 0 ? 8 : 0, paddingTop: i > 0 ? 8 : 0 }}
                onClick={() => {
                  const path = LINK_OPEN_PATHS[link.type];
                  if (path) navigate(`${path}?id=${link.id}`);
                }}
              >
                <div className="hx-ac-header">
                  <span className="hx-ac-name">{link.name}</span>
                  <span className="hx-ac-tag">{LINK_TYPE_LABELS[link.type]}</span>
                </div>
                {link.preview && (
                  <p className="hx-ac-preview">
                    {link.preview}{link.preview.length >= 200 ? '…' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="hx-statusbar">
        <span id="hx-status-pos" />
        <span id="hx-status-tile" />
        <span id="hx-status-article" style={{ color: '#c9a84c' }} />
        <span className="sbsep">|</span>
        <span id="hx-status-tool">Tool: paint</span>
        <span id="hx-status-hint">Hold Space to pan · Scroll to zoom · Ctrl+Z undo · Drag links from Links tab · Click a link badge to open it</span>
      </div>
    </div>
  );
}
