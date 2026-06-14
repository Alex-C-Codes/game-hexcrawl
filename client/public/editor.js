'use strict';

const TILE_SIZE = 24;

const TILES = {
  stone:       { label: 'Wall',       color: '#1e1c19', passable: false, cat: 'Terrain',   sym: null },
  floor:       { label: 'Floor',      color: '#7a6a58', passable: true,  cat: 'Terrain',   sym: null },
  corridor:    { label: 'Corridor',   color: '#5a4a38', passable: true,  cat: 'Terrain',   sym: null },
  water:       { label: 'Water',      color: '#1a3a5a', passable: false, cat: 'Terrain',   sym: '~'  },
  lava:        { label: 'Lava',       color: '#7a1a0a', passable: false, cat: 'Terrain',   sym: '~'  },
  pit:         { label: 'Pit',        color: '#080706', passable: false, cat: 'Terrain',   sym: 'O'  },
  door:        { label: 'Door',       color: '#8a5525', passable: true,  cat: 'Structure', sym: 'D'  },
  bars:        { label: 'Iron Bars',  color: '#3a3838', passable: false, cat: 'Structure', sym: '|'  },
  pillar:      { label: 'Pillar',     color: '#2a2820', passable: false, cat: 'Structure', sym: '#'  },
  stairs_up:   { label: 'Stairs Up',  color: '#7a6850', passable: true,  cat: 'Structure', sym: '^'  },
  stairs_down: { label: 'Stairs Dn',  color: '#5a4838', passable: true,  cat: 'Structure', sym: 'v'  },
  altar:       { label: 'Altar',      color: '#4a2a6a', passable: false, cat: 'Feature',   sym: 'A'  },
  chest:       { label: 'Chest',      color: '#7a6018', passable: true,  cat: 'Feature',   sym: 'C'  },
  trap:        { label: 'Trap',       color: '#6a1a1a', passable: true,  cat: 'Feature',   sym: '!'  },
  entry:       { label: 'Entry',      color: '#1a5a1a', passable: true,  cat: 'Markers',   sym: '>'  },
  exit_tile:   { label: 'Exit',       color: '#5a1a1a', passable: true,  cat: 'Markers',   sym: '<'  },
  spawn:       { label: 'Spawn',      color: '#4a1a4a', passable: true,  cat: 'Markers',   sym: 'X'  },
};

const TILE_CATS = ['Terrain', 'Structure', 'Feature', 'Markers'];

// ---- State ----
let mapName = 'Untitled Dungeon';
let mapW = 40, mapH = 30;
let grid = [];
let currentContentId = null;

const view = { ox: 0, oy: 0, scale: 1.0 };
let selectedTile = 'stone';
let activeTool = 'paint';
const undoStack = [];
const redoStack = [];
const paintedInStroke = new Set();
const mouse = { tx: -1, ty: -1, down: false, btn: -1, rectX0: -1, rectY0: -1, panX: 0, panY: 0, panOX: 0, panOY: 0 };

let canvas, ctx;
let rafPending = false;

// ---- Grid ----
function newGrid(w, h) {
  mapW = w; mapH = h;
  grid = new Array(w * h).fill('stone');
}

function resizeGrid(nw, nh) {
  const og = grid.slice(), ow = mapW, oh = mapH;
  grid = new Array(nw * nh).fill('stone');
  const cw = Math.min(ow, nw), ch = Math.min(oh, nh);
  for (let y = 0; y < ch; y++)
    for (let x = 0; x < cw; x++)
      grid[y * nw + x] = og[y * ow + x];
  mapW = nw; mapH = nh;
}

function getTile(x, y) {
  return (x >= 0 && x < mapW && y >= 0 && y < mapH) ? grid[y * mapW + x] : null;
}

function setTile(x, y, t) {
  if (x >= 0 && x < mapW && y >= 0 && y < mapH) grid[y * mapW + x] = t;
}

// ---- Undo/Redo ----
function saveUndo() {
  undoStack.push({ grid: grid.slice(), w: mapW, h: mapH });
  if (undoStack.length > 60) undoStack.shift();
  redoStack.length = 0;
  syncUndoButtons();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push({ grid: grid.slice(), w: mapW, h: mapH });
  applySnapshot(undoStack.pop());
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push({ grid: grid.slice(), w: mapW, h: mapH });
  applySnapshot(redoStack.pop());
}

function applySnapshot(snap) {
  grid = snap.grid; mapW = snap.w; mapH = snap.h;
  syncSizeInputs(); syncUndoButtons(); scheduleRender();
}

function syncUndoButtons() {
  document.getElementById('btn-undo').disabled = !undoStack.length;
  document.getElementById('btn-redo').disabled = !redoStack.length;
}

function syncSizeInputs() {
  document.getElementById('input-width').value  = mapW;
  document.getElementById('input-height').value = mapH;
}

// ---- Flood fill ----
function floodFill(sx, sy, newT) {
  const oldT = getTile(sx, sy);
  if (oldT === null || oldT === newT) return;
  const q = [[sx, sy]];
  const seen = new Set([`${sx},${sy}`]);
  while (q.length) {
    const [x, y] = q.shift();
    setTile(x, y, newT);
    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
      if (!seen.has(k) && getTile(nx, ny) === oldT) { seen.add(k); q.push([nx, ny]); }
    }
  }
}

// ---- Coordinate transforms ----
function tileS() { return TILE_SIZE * view.scale; }

function toTile(cx, cy) {
  const s = tileS();
  return { x: Math.floor((cx - view.ox) / s), y: Math.floor((cy - view.oy) / s) };
}

function toScreen(tx, ty) {
  const s = tileS();
  return { x: view.ox + tx * s, y: view.oy + ty * s };
}

// ---- Render ----
function scheduleRender() {
  if (!rafPending) { rafPending = true; requestAnimationFrame(() => { rafPending = false; render(); }); }
}

function render() {
  const s = tileS();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#080706';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tiles
  for (let ty = 0; ty < mapH; ty++) {
    for (let tx = 0; tx < mapW; tx++) {
      const { x: sx, y: sy } = toScreen(tx, ty);
      if (sx + s < 0 || sx > canvas.width || sy + s < 0 || sy > canvas.height) continue;
      const def = TILES[grid[ty * mapW + tx]] || TILES.stone;
      ctx.fillStyle = def.color;
      ctx.fillRect(sx, sy, s, s);
      if (def.sym && s >= 14) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = `bold ${Math.max(8, Math.floor(s * 0.44))}px monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(def.sym, sx + s / 2, sy + s / 2);
      }
    }
  }

  // Grid lines
  if (s >= 7) {
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';
    ctx.lineWidth = 0.5;
    for (let ty = 0; ty <= mapH; ty++) {
      const y = view.oy + ty * s;
      if (y < -1 || y > canvas.height + 1) continue;
      ctx.beginPath();
      ctx.moveTo(Math.max(0, view.ox), y);
      ctx.lineTo(Math.min(canvas.width, view.ox + mapW * s), y);
      ctx.stroke();
    }
    for (let tx = 0; tx <= mapW; tx++) {
      const x = view.ox + tx * s;
      if (x < -1 || x > canvas.width + 1) continue;
      ctx.beginPath();
      ctx.moveTo(x, Math.max(0, view.oy));
      ctx.lineTo(x, Math.min(canvas.height, view.oy + mapH * s));
      ctx.stroke();
    }
  }

  // Rect preview
  if (activeTool === 'rect' && mouse.down && mouse.btn === 0 && mouse.rectX0 >= 0) {
    const x1 = Math.max(0, Math.min(mouse.rectX0, mouse.tx));
    const y1 = Math.max(0, Math.min(mouse.rectY0, mouse.ty));
    const x2 = Math.min(mapW - 1, Math.max(mouse.rectX0, mouse.tx));
    const y2 = Math.min(mapH - 1, Math.max(mouse.rectY0, mouse.ty));
    const { x: px1, y: py1 } = toScreen(x1, y1);
    const { x: px2, y: py2 } = toScreen(x2 + 1, y2 + 1);
    ctx.fillStyle = 'rgba(255,215,0,0.12)';
    ctx.fillRect(px1, py1, px2 - px1, py2 - py1);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px1, py1, px2 - px1, py2 - py1);
  }

  // Hover highlight
  const { tx: hx, ty: hy } = mouse;
  if (hx >= 0 && hx < mapW && hy >= 0 && hy < mapH) {
    const { x: sx, y: sy } = toScreen(hx, hy);
    ctx.strokeStyle = 'rgba(255,215,0,0.75)';
    ctx.lineWidth = Math.max(1, s * 0.06);
    ctx.strokeRect(sx + 1, sy + 1, s - 2, s - 2);
  }

  // Map border
  const { x: bx, y: by } = toScreen(0, 0);
  ctx.strokeStyle = 'rgba(100,80,40,0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(bx, by, mapW * s, mapH * s);

  updateStatus();
}

function updateStatus() {
  const { tx: hx, ty: hy } = mouse;
  const inMap = hx >= 0 && hx < mapW && hy >= 0 && hy < mapH;
  const key = inMap ? grid[hy * mapW + hx] : null;
  document.getElementById('status-pos').textContent  = inMap ? `(${hx}, ${hy})` : '';
  document.getElementById('status-tile').textContent = key ? `Tile: ${TILES[key]?.label ?? key}` : '';
  document.getElementById('status-tool').textContent = `Tool: ${activeTool}`;
  document.getElementById('status-size').textContent = `${mapW} × ${mapH}`;
}

// ---- Mouse events ----
function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { cx: e.clientX - r.left, cy: e.clientY - r.top };
}

function onMouseDown(e) {
  e.preventDefault(); canvas.focus();
  const { cx, cy } = getPos(e);
  const { x: tx, y: ty } = toTile(cx, cy);
  mouse.down = true; mouse.btn = e.button; mouse.tx = tx; mouse.ty = ty;

  if (e.button === 1 || e.button === 2) {
    mouse.panX = e.clientX; mouse.panY = e.clientY;
    mouse.panOX = view.ox;  mouse.panOY = view.oy;
    return;
  }

  const inMap = tx >= 0 && tx < mapW && ty >= 0 && ty < mapH;
  if (!inMap) return;

  if (activeTool === 'paint') {
    saveUndo(); paintedInStroke.clear(); applyPaint(tx, ty);
  } else if (activeTool === 'erase') {
    saveUndo(); paintedInStroke.clear(); applyErase(tx, ty);
  } else if (activeTool === 'fill') {
    saveUndo(); floodFill(tx, ty, selectedTile);
  } else if (activeTool === 'rect') {
    mouse.rectX0 = tx; mouse.rectY0 = ty;
  } else if (activeTool === 'pick') {
    const t = getTile(tx, ty);
    if (t) selectTile(t);
  }
  scheduleRender();
}

function onMouseMove(e) {
  const { cx, cy } = getPos(e);
  const { x: tx, y: ty } = toTile(cx, cy);
  const moved = tx !== mouse.tx || ty !== mouse.ty;
  mouse.tx = tx; mouse.ty = ty;

  if (mouse.down && (mouse.btn === 1 || mouse.btn === 2)) {
    view.ox = mouse.panOX + (e.clientX - mouse.panX);
    view.oy = mouse.panOY + (e.clientY - mouse.panY);
    scheduleRender(); return;
  }

  if (mouse.down && mouse.btn === 0 && moved) {
    const inMap = tx >= 0 && tx < mapW && ty >= 0 && ty < mapH;
    if (inMap) {
      if (activeTool === 'paint')  applyPaint(tx, ty);
      if (activeTool === 'erase')  applyErase(tx, ty);
    }
  }
  scheduleRender();
}

function onMouseUp(e) {
  if (!mouse.down) return;
  if (e.button === 0 && activeTool === 'rect' && mouse.rectX0 >= 0) {
    const x1 = Math.max(0, Math.min(mouse.rectX0, mouse.tx));
    const y1 = Math.max(0, Math.min(mouse.rectY0, mouse.ty));
    const x2 = Math.min(mapW - 1, Math.max(mouse.rectX0, mouse.tx));
    const y2 = Math.min(mapH - 1, Math.max(mouse.rectY0, mouse.ty));
    saveUndo();
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        setTile(x, y, selectedTile);
    mouse.rectX0 = -1; mouse.rectY0 = -1;
    scheduleRender();
  }
  if (e.button === mouse.btn) { mouse.down = false; mouse.btn = -1; }
}

function applyPaint(tx, ty) {
  const k = `${tx},${ty}`;
  if (!paintedInStroke.has(k)) { setTile(tx, ty, selectedTile); paintedInStroke.add(k); }
}

function applyErase(tx, ty) {
  const k = `${tx},${ty}`;
  if (!paintedInStroke.has(k)) { setTile(tx, ty, 'floor'); paintedInStroke.add(k); }
}

function onWheel(e) {
  e.preventDefault();
  const { cx, cy } = getPos(e);
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  const ns = Math.max(0.25, Math.min(6, view.scale * factor));
  view.ox = cx - (cx - view.ox) * (ns / view.scale);
  view.oy = cy - (cy - view.oy) * (ns / view.scale);
  view.scale = ns;
  scheduleRender();
}

// ---- UI ----
function selectTile(key) {
  selectedTile = key;
  document.querySelectorAll('.palette-tile').forEach(el => el.classList.toggle('selected', el.dataset.tile === key));
  const def = TILES[key];
  const sw = document.getElementById('selected-tile-swatch');
  sw.style.background = def?.color ?? '#555';
  sw.textContent = def?.sym ?? '';
  document.getElementById('selected-tile-name').textContent = def?.label ?? key;
}

function selectTool(tool) {
  activeTool = tool;
  document.querySelectorAll('.tool-btn').forEach(el => el.classList.toggle('active', el.dataset.tool === tool));
  scheduleRender();
}

// ---- Save / Load ----
function mapData() {
  return { name: mapName, width: mapW, height: mapH, grid: grid.slice(), buildings: [], entryX: 0, entryY: 0, tierTitle: 'Dungeon' };
}

function saveToLibrary() {
  try {
    if (!currentContentId) currentContentId = crypto.randomUUID();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    const now = new Date().toISOString();
    const idx = all.findIndex(i => i.id === currentContentId);
    const record = { id: currentContentId, type: 'battlemap', name: mapName, data: mapData(), createdAt: all[idx]?.createdAt ?? now, updatedAt: now };
    if (idx >= 0) all[idx] = record; else all.unshift(record);
    localStorage.setItem('hx_content', JSON.stringify(all));
    showToast('Saved to library');
  } catch (e) { alert('Save failed: ' + e.message); }
}

function exportMap() {
  const blob = new Blob([JSON.stringify(mapData(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (mapName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'dungeon') + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function showToast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:40px;right:20px;background:#1e1a0c;border:1px solid #c9a84c;color:#c9a84c;font-family:Georgia,serif;font-size:0.78rem;padding:8px 16px;border-radius:4px;z-index:9999;pointer-events:none;opacity:1;transition:opacity 0.4s';
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 1600);
}

function importMap(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const d = JSON.parse(ev.target.result);
      if (!d.grid || !d.width || !d.height) throw new Error('Invalid map file');
      saveUndo();
      mapName = d.name || 'Imported Dungeon';
      mapW = d.width; mapH = d.height;
      grid = d.grid.map(t => TILES[t] ? t : 'stone');
      document.getElementById('input-name').value = mapName;
      syncSizeInputs(); fitView(); render();
    } catch (err) { alert('Failed to load: ' + err.message); }
  };
  reader.readAsText(file);
}

// ---- View ----
function fitView() {
  const scX = (canvas.width  - 40) / (mapW * TILE_SIZE);
  const scY = (canvas.height - 40) / (mapH * TILE_SIZE);
  view.scale = Math.min(scX, scY, 3);
  const s = tileS();
  view.ox = (canvas.width  - mapW * s) / 2;
  view.oy = (canvas.height - mapH * s) / 2;
}

// ---- Keyboard ----
function onKeyDown(e) {
  if (e.target.tagName === 'INPUT') return;
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); return; }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); return; }
  const toolKeys = { b: 'paint', e: 'erase', f: 'fill', r: 'rect', p: 'pick' };
  const t = toolKeys[e.key.toLowerCase()];
  if (t) selectTool(t);
}

// ---- Build palette ----
function buildPalette() {
  const container = document.getElementById('palette');
  for (const cat of TILE_CATS) {
    const h = document.createElement('div');
    h.className = 'palette-cat';
    h.textContent = cat;
    container.appendChild(h);
    for (const [key, def] of Object.entries(TILES)) {
      if (def.cat !== cat) continue;
      const btn = document.createElement('button');
      btn.className = 'palette-tile'; btn.dataset.tile = key; btn.title = def.label;
      btn.onclick = () => selectTile(key);
      const sw = document.createElement('span');
      sw.className = 'palette-swatch'; sw.style.background = def.color;
      if (def.sym) sw.textContent = def.sym;
      const lb = document.createElement('span');
      lb.className = 'palette-label'; lb.textContent = def.label;
      btn.appendChild(sw); btn.appendChild(lb);
      container.appendChild(btn);
    }
  }
}

// ---- Init ----
function init() {
  canvas = document.getElementById('editor-canvas');
  ctx = canvas.getContext('2d');

  const wrap = document.getElementById('canvas-wrap');
  function resizeCanvas() {
    canvas.width = wrap.clientWidth; canvas.height = wrap.clientHeight; scheduleRender();
  }
  new ResizeObserver(resizeCanvas).observe(wrap);

  // Load existing content if an ID was passed in from React
  const incomingId = window.__editorContentId || null;
  if (incomingId) {
    try {
      const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
      const item = all.find(i => i.id === incomingId);
      if (item?.data) {
        currentContentId = incomingId;
        mapName = item.name || 'Untitled Dungeon';
        mapW = item.data.width;
        mapH = item.data.height;
        grid = item.data.grid.map(t => TILES[t] ? t : 'stone');
        document.getElementById('input-name').value = mapName;
        syncSizeInputs();
      }
    } catch (e) { /* start fresh if load fails */ }
  }
  if (!grid.length) newGrid(40, 30);

  buildPalette();
  selectTile('stone');
  selectTool('rect');
  syncUndoButtons();

  setTimeout(() => { resizeCanvas(); fitView(); scheduleRender(); }, 50);

  canvas.addEventListener('mousedown',   onMouseDown);
  canvas.addEventListener('mousemove',   onMouseMove);
  window.addEventListener('mouseup',     onMouseUp);
  canvas.addEventListener('mouseleave',  () => { mouse.tx = -1; mouse.ty = -1; scheduleRender(); });
  canvas.addEventListener('wheel',       onWheel, { passive: false });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown',   onKeyDown);

  document.querySelectorAll('.tool-btn').forEach(b => b.addEventListener('click', () => selectTool(b.dataset.tool)));
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);
  document.getElementById('input-name').addEventListener('input', e => { mapName = e.target.value; });

  document.getElementById('btn-resize').addEventListener('click', () => {
    const w = Math.max(5, Math.min(100, +document.getElementById('input-width').value  || 40));
    const h = Math.max(5, Math.min(100, +document.getElementById('input-height').value || 30));
    saveUndo(); resizeGrid(w, h); syncSizeInputs(); fitView(); scheduleRender();
  });

  document.getElementById('btn-new').addEventListener('click', () => {
    if (!confirm('Create a new dungeon? Unsaved changes will be lost.')) return;
    const w = Math.max(5, Math.min(100, +document.getElementById('input-width').value  || 40));
    const h = Math.max(5, Math.min(100, +document.getElementById('input-height').value || 30));
    saveUndo(); newGrid(w, h);
    mapName = 'Untitled Dungeon';
    document.getElementById('input-name').value = mapName;
    fitView(); scheduleRender();
  });

  document.getElementById('btn-save').addEventListener('click', saveToLibrary);
  document.getElementById('btn-export').addEventListener('click', exportMap);

  const fileInput = document.getElementById('file-input');
  document.getElementById('btn-load').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => { if (e.target.files[0]) { importMap(e.target.files[0]); fileInput.value = ''; } });
  document.getElementById('btn-fit').addEventListener('click', () => { fitView(); scheduleRender(); });
}

window.cleanupEditor = function () {
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('mouseup', onMouseUp);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
