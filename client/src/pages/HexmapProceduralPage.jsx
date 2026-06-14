import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ---- Biome definitions — matches db/seeds/geography_pillar/hex_types.json ----
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

const DEFAULT_WEIGHTS = { ocean: 5, coast: 8, plains: 30, forest: 22, hills: 15, highland: 10, mountain: 5, desert: 3, swamp: 2 };
const HEX_SIZE = 24;

// ---- Hex math ----
function hexToPixel(q, r, size) {
  return {
    x: size * Math.sqrt(3) * (q + 0.5 * (r & 1)),
    y: size * 1.5 * r,
  };
}

function traceHex(ctx, cx, cy, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i - Math.PI / 6;
    ctx.lineTo(cx + size * Math.cos(a), cy + size * Math.sin(a));
  }
  ctx.closePath();
}

// ---- Biome art — matches worldmap.js ----
function artMountain(ctx) {
  ctx.fillStyle = 'rgba(210,210,230,0.5)';
  ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(4,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(190,190,215,0.82)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(13,6); ctx.lineTo(-7,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(8,-5); ctx.lineTo(-2,-5); ctx.closePath(); ctx.fill();
}
function artHighland(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.17)';
  ctx.beginPath(); ctx.arc(0,9,13,Math.PI,0,true); ctx.closePath(); ctx.fill();
}
function artForest(ctx) {
  ctx.fillStyle = 'rgba(10,60,20,0.78)';
  ctx.beginPath(); ctx.moveTo(-6,-9); ctx.lineTo(1,5); ctx.lineTo(-13,5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(25,105,40,0.88)';
  ctx.beginPath(); ctx.moveTo(5,-9); ctx.lineTo(13,5); ctx.lineTo(-3,5); ctx.closePath(); ctx.fill();
}
function artHills(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath(); ctx.arc(-4,8,8,Math.PI,0,true); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(5,9,6,Math.PI,0,true); ctx.closePath(); ctx.fill();
}
function artPlains(ctx) {
  ctx.strokeStyle = 'rgba(0,60,0,0.55)'; ctx.lineWidth = 1.5;
  [[-5,0],[0,1],[5,0]].forEach(([xo,yo]) => {
    ctx.beginPath(); ctx.moveTo(xo,7+yo); ctx.quadraticCurveTo(xo-2,2+yo,xo,-6+yo); ctx.stroke();
  });
}
function artDesert(ctx) {
  ctx.strokeStyle = 'rgba(160,118,20,0.6)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-10,-3); ctx.quadraticCurveTo(-5,-9,0,-3); ctx.quadraticCurveTo(5,3,10,-3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-9,4); ctx.quadraticCurveTo(-2,-2,4,4); ctx.stroke();
}
function artSwamp(ctx) {
  ctx.strokeStyle = 'rgba(0,45,0,0.72)'; ctx.lineWidth = 1.5;
  [-6,0,6].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x,-4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x,0); ctx.quadraticCurveTo(x+6,-5,x+5,-1); ctx.stroke();
  });
}
function artOcean(ctx) {
  ctx.strokeStyle = 'rgba(130,195,255,0.32)'; ctx.lineWidth = 1.5;
  [-6,0,6].forEach(y => {
    ctx.beginPath(); ctx.moveTo(-9,y); ctx.quadraticCurveTo(-4,y-4,0,y); ctx.quadraticCurveTo(4,y+4,9,y); ctx.stroke();
  });
}
function artCoast(ctx) {
  ctx.strokeStyle = 'rgba(255,255,255,0.38)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-9,2); ctx.quadraticCurveTo(-4,-5,0,2); ctx.quadraticCurveTo(4,9,9,2); ctx.stroke();
}

function drawBiomeArt(ctx, cx, cy, size, biome) {
  ctx.save();
  traceHex(ctx, cx, cy, size);
  ctx.clip();
  ctx.translate(cx, cy);
  ctx.scale(size / 24, size / 24);
  switch (biome) {
    case 'mountain': artMountain(ctx); break;
    case 'highland': artHighland(ctx); break;
    case 'forest':   artForest(ctx);   break;
    case 'hills':    artHills(ctx);    break;
    case 'plains':   artPlains(ctx);   break;
    case 'desert':   artDesert(ctx);   break;
    case 'swamp':    artSwamp(ctx);    break;
    case 'ocean':    artOcean(ctx);    break;
    case 'coast':    artCoast(ctx);    break;
  }
  ctx.restore();
}

// ---- Seeded RNG ----
function makeRng(seed) {
  let s = ((Math.abs(seed | 0)) % 2147483647) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ---- Map generation (Voronoi biome seeding) ----
function generateMap(radius, seed, weights) {
  const rng = makeRng(seed);

  // All hexes in radius (axial cube coords)
  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      hexes.push({ aq: q, ar: r });
    }
  }

  // Build weighted biome pool for seed placement
  const activeBiomes = Object.entries(weights).filter(([, w]) => w > 0);
  const totalW = activeBiomes.reduce((s, [, w]) => s + w, 0);

  // Number of Voronoi seeds scales with map size
  const numSeeds = Math.max(8, Math.floor(hexes.length / 6));
  const seeds = Array.from({ length: numSeeds }, () => {
    let roll = rng() * totalW, acc = 0, biome = activeBiomes[0][0];
    for (const [b, w] of activeBiomes) { acc += w; if (roll <= acc) { biome = b; break; } }
    const h = hexes[Math.floor(rng() * hexes.length)];
    return { aq: h.aq, ar: h.ar, biome };
  });

  // Assign each hex to nearest seed (axial distance)
  return hexes.map(({ aq, ar }) => {
    let bestBiome = seeds[0].biome, bestDist = Infinity;
    for (const s of seeds) {
      const dq = aq - s.aq, dr = ar - s.ar;
      const d = (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
      if (d < bestDist) { bestDist = d; bestBiome = s.biome; }
    }
    // Convert axial → odd-r offset
    return { q: aq + (ar - (ar & 1)) / 2, r: ar, biome: bestBiome };
  });
}

// ---- Shared label style ----
const label = (text) => (
  <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4540', marginBottom: 6 }}>
    {text}
  </div>
);

// ---- Component ----
export default function HexmapProceduralPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const viewRef   = useRef({ ox: 0, oy: 0, scale: 1 });
  const hexesRef  = useRef([]);
  const panRef    = useRef(null);
  const rafRef    = useRef(null);

  const [radius,  setRadius]  = useState(8);
  const [seed,    setSeed]    = useState(() => Math.floor(Math.random() * 99999) + 1);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [hexes,   setHexes]   = useState([]);
  const [mapName, setMapName] = useState('Untitled World');
  const [toast,   setToast]   = useState('');

  // ---- Rendering ----
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { ox, oy, scale } = viewRef.current;
    const size = HEX_SIZE * scale;
    const cx = canvas.width / 2 + ox;
    const cy = canvas.height / 2 + oy;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#080706';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const { q, r, biome } of hexesRef.current) {
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cx, sy = y + cy;
      if (sx + size * 2 < 0 || sx - size * 2 > canvas.width) continue;
      if (sy + size * 2 < 0 || sy - size * 2 > canvas.height) continue;
      const hexSize = size - 0.5;
      traceHex(ctx, sx, sy, hexSize);
      ctx.fillStyle = BIOMES[biome]?.color ?? BIOMES.ocean.color;
      ctx.fill();
      drawBiomeArt(ctx, sx, sy, hexSize, biome);
      traceHex(ctx, sx, sy, hexSize);
      ctx.strokeStyle = 'rgba(0,0,0,0.28)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }, []);

  const scheduleRender = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => { rafRef.current = null; render(); });
  }, [render]);

  // Sync hexes to ref and re-render
  useEffect(() => { hexesRef.current = hexes; scheduleRender(); }, [hexes, scheduleRender]);

  // ---- Canvas resize ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    const ro = new ResizeObserver(() => {
      canvas.width  = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
      scheduleRender();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [scheduleRender]);

  // ---- Canvas events ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - canvas.width / 2;
      const my = e.clientY - rect.top  - canvas.height / 2;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const ns = Math.max(0.3, Math.min(6, viewRef.current.scale * factor));
      viewRef.current = {
        ox: mx - (mx - viewRef.current.ox) * (ns / viewRef.current.scale),
        oy: my - (my - viewRef.current.oy) * (ns / viewRef.current.scale),
        scale: ns,
      };
      scheduleRender();
    };

    const onDown = (e) => {
      if (e.button === 1 || e.button === 2)
        panRef.current = { x: e.clientX, y: e.clientY, ox: viewRef.current.ox, oy: viewRef.current.oy };
    };
    const onMove = (e) => {
      if (!panRef.current) return;
      viewRef.current.ox = panRef.current.ox + (e.clientX - panRef.current.x);
      viewRef.current.oy = panRef.current.oy + (e.clientY - panRef.current.y);
      scheduleRender();
    };
    const onUp   = ()  => { panRef.current = null; };
    const onMenu = (e) => e.preventDefault();

    canvas.addEventListener('wheel',       onWheel, { passive: false });
    canvas.addEventListener('mousedown',   onDown);
    canvas.addEventListener('mousemove',   onMove);
    canvas.addEventListener('mouseup',     onUp);
    canvas.addEventListener('contextmenu', onMenu);
    return () => {
      canvas.removeEventListener('wheel',       onWheel);
      canvas.removeEventListener('mousedown',   onDown);
      canvas.removeEventListener('mousemove',   onMove);
      canvas.removeEventListener('mouseup',     onUp);
      canvas.removeEventListener('contextmenu', onMenu);
    };
  }, [scheduleRender]);

  // ---- Actions ----
  function generate() {
    viewRef.current = { ox: 0, oy: 0, scale: 1 };
    setHexes(generateMap(radius, seed, weights));
  }

  function randomSeed() {
    const s = Math.floor(Math.random() * 99999) + 1;
    setSeed(s);
    viewRef.current = { ox: 0, oy: 0, scale: 1 };
    setHexes(generateMap(radius, s, weights));
  }

  function saveToLibrary() {
    if (!hexes.length) { setToast('Generate a map first.'); setTimeout(() => setToast(''), 2000); return; }
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    all.unshift({ id, type: 'hexmap', name: mapName, data: { radius, hexes }, createdAt: now, updatedAt: now });
    localStorage.setItem('hx_content', JSON.stringify(all));
    setToast('Saved to library!');
    setTimeout(() => setToast(''), 2000);
  }

  function editManually() {
    if (!hexes.length) return;
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    all.unshift({ id, type: 'hexmap', name: mapName, data: { radius, hexes }, createdAt: now, updatedAt: now });
    localStorage.setItem('hx_content', JSON.stringify(all));
    navigate(`/create/hexmap/manual?id=${id}`);
  }

  // ---- Styles ----
  const S = {
    page:    { display: 'flex', height: 'calc(100vh - 44px)', background: '#111', fontFamily: 'Georgia, serif', overflow: 'hidden' },
    sidebar: { width: 220, flexShrink: 0, background: '#0d0d0d', borderRight: '1px solid #1a1a1a', overflowY: 'auto', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 18 },
    section: { display: 'flex', flexDirection: 'column' },
    input:   { background: '#181510', border: '1px solid #2a2520', borderRadius: 4, color: '#e0d8c8', fontFamily: 'Georgia, serif', fontSize: '0.85rem', padding: '5px 9px', outline: 'none', width: '100%' },
    slider:  { width: '100%', accentColor: '#c9a84c' },
    btn:     { background: '#181510', border: '1px solid #2a2520', borderRadius: 4, color: '#a09060', fontFamily: 'Georgia, serif', fontSize: '0.76rem', padding: '6px 0', cursor: 'pointer', width: '100%', letterSpacing: '0.05em' },
    btnPrimary: { background: '#1e1a0c', border: '1px solid #c9a84c', borderRadius: 4, color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.76rem', padding: '7px 0', cursor: 'pointer', width: '100%', letterSpacing: '0.05em' },
    canvas:  { flex: 1, position: 'relative', overflow: 'hidden' },
  };

  return (
    <div style={S.page}>
      {/* Sidebar */}
      <div style={S.sidebar}>
        <div style={{ color: '#c9a84c', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', paddingBottom: 10, borderBottom: '1px solid #1a1a1a' }}>
          Procedural
        </div>

        {/* Map name */}
        <div style={S.section}>
          {label('Map Name')}
          <input style={S.input} value={mapName} onChange={e => setMapName(e.target.value)} />
        </div>

        {/* Radius */}
        <div style={S.section}>
          {label(`Radius — ${radius}`)}
          <input type="range" min={3} max={16} value={radius} onChange={e => setRadius(+e.target.value)} style={S.slider} />
        </div>

        {/* Seed */}
        <div style={S.section}>
          {label('Seed')}
          <input style={S.input} type="number" value={seed} onChange={e => setSeed(+e.target.value || 1)} />
        </div>

        {/* Generate buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button style={S.btnPrimary} onClick={generate}>Generate</button>
          <button style={S.btn} onClick={randomSeed}>Random Seed</button>
        </div>

        {/* Biome weights */}
        <div style={S.section}>
          {label('Biome Weights')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(BIOMES).map(([key, { label: name, color }]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#7a7060' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block', flexShrink: 0 }} />
                    {name}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#4a4540' }}>{weights[key]}</span>
                </div>
                <input type="range" min={0} max={60} value={weights[key]}
                  onChange={e => setWeights(w => ({ ...w, [key]: +e.target.value }))}
                  style={S.slider} />
              </div>
            ))}
          </div>
        </div>

        {/* Save / Edit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto', paddingTop: 12 }}>
          <button style={S.btnPrimary} onClick={saveToLibrary} disabled={!hexes.length}>Save to Library</button>
          <button style={S.btn}        onClick={editManually}  disabled={!hexes.length}>Edit Manually →</button>
        </div>

        {toast && (
          <div style={{ color: '#c9a84c', fontSize: '0.72rem', textAlign: 'center', padding: '6px 0' }}>{toast}</div>
        )}
      </div>

      {/* Canvas */}
      <div style={S.canvas}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab' }} />
        {!hexes.length && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a2a2a', fontSize: '0.85rem', fontFamily: 'Georgia, serif', pointerEvents: 'none' }}>
            Set parameters and click Generate
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 10, right: 14, color: '#252520', fontSize: '0.65rem', fontFamily: 'Georgia, serif' }}>
          Right-click drag to pan · Scroll to zoom
        </div>
      </div>
    </div>
  );
}
