'use strict';

const ST_TILE_SIZE = 24;

const ST_TILES = {
  // Ground
  grass:        { label: 'Grass',         color: '#4a7a3a', cat: 'Ground'    },
  dirt:         { label: 'Dirt',          color: '#8a6840', cat: 'Ground'    },
  mud:          { label: 'Mud',           color: '#6a5030', cat: 'Ground'    },
  sand:         { label: 'Sand',          color: '#c8aa6a', cat: 'Ground'    },
  cobblestone:  { label: 'Cobblestone',   color: '#7a7060', cat: 'Ground'    },
  road:         { label: 'Road',          color: '#9a8868', cat: 'Ground'    },
  path:         { label: 'Path',          color: '#a09060', cat: 'Ground'    },
  // Water
  water:        { label: 'Water',         color: '#1a4a6e', cat: 'Water'     },
  shallow:      { label: 'Shallow Water', color: '#3a7a9a', cat: 'Water'     },
  bridge:       { label: 'Bridge',        color: '#8a7050', cat: 'Water'     },
  // Structure
  wall_wood:    { label: 'Wood Wall',     color: '#5a3a1a', cat: 'Structure' },
  wall_stone:   { label: 'Stone Wall',    color: '#4a4840', cat: 'Structure' },
  fence:        { label: 'Fence',         color: '#7a5a30', cat: 'Structure' },
  gate:         { label: 'Gate',          color: '#6a5020', cat: 'Structure' },
  // Building
  house:        { label: 'House',         color: '#7a5535', cat: 'Building'  },
  house_lg:     { label: 'Large House',   color: '#8a5a38', cat: 'Building'  },
  tavern:       { label: 'Tavern',        color: '#8a4025', cat: 'Building'  },
  inn:          { label: 'Inn',           color: '#804028', cat: 'Building'  },
  blacksmith:   { label: 'Blacksmith',    color: '#484840', cat: 'Building'  },
  general_store:{ label: 'General Store', color: '#5a5530', cat: 'Building'  },
  healer:       { label: 'Healer',        color: '#3a5550', cat: 'Building'  },
  temple:       { label: 'Temple',        color: '#7a6a50', cat: 'Building'  },
  market:       { label: 'Market',        color: '#6a5525', cat: 'Building'  },
  town_hall:    { label: 'Town Hall',     color: '#7a6030', cat: 'Building'  },
  barracks:     { label: 'Barracks',      color: '#504848', cat: 'Building'  },
  stables:      { label: 'Stables',       color: '#6a6030', cat: 'Building'  },
  granary:      { label: 'Granary',       color: '#6a5828', cat: 'Building'  },
  mill:         { label: 'Mill',          color: '#7a6040', cat: 'Building'  },
  // Nature
  tree:         { label: 'Tree',          color: '#2a5a20', cat: 'Nature'    },
  bush:         { label: 'Bush',          color: '#3a5a28', cat: 'Nature'    },
  rock:         { label: 'Rock',          color: '#5a5850', cat: 'Nature'    },
  well:         { label: 'Well',          color: '#5a5055', cat: 'Nature'    },
  fountain:     { label: 'Fountain',      color: '#3a6080', cat: 'Nature'    },
  // Markers
  entry:        { label: 'Entry',         color: '#1a5a1a', cat: 'Markers'   },
  exit_tile:    { label: 'Exit',          color: '#5a1a1a', cat: 'Markers'   },
  spawn:        { label: 'Spawn',         color: '#4a1a4a', cat: 'Markers'   },
};

const ST_TILE_CATS = ['Ground', 'Water', 'Structure', 'Building', 'Nature', 'Markers'];

const ST_SYMBOL = {
  bridge: '=', wall_wood: '#', wall_stone: '#', fence: '-', gate: 'G',
  tree: '♣', bush: '♣', rock: '●', well: 'W', fountain: 'F',
  entry: '>', exit_tile: '<', spawn: 'X',
  town_hall: 'T', temple: '+', blacksmith: 'B', tavern: 'V',
};

// Building labels shown at higher zoom
const ST_LABEL = {
  tavern: 'Tavern', inn: 'Inn', blacksmith: 'Blacksmith', general_store: 'Store',
  healer: 'Healer', temple: 'Temple', market: 'Market', town_hall: 'Town Hall',
  barracks: 'Barracks', stables: 'Stables', granary: 'Granary', mill: 'Mill',
};

let stGrid = new Map();
let stUndoStack = [];
let stRedoStack = [];
let stMapName = 'Untitled Settlement';
let stCurrentId = null;
let stSelectedTile = 'grass';
let stActiveTool = 'paint';

const stMouse = { tx: 0, ty: 0, down: false, btn: -1, onCanvas: false, rectX0: 0, rectY0: 0 };
const stView  = { ox: 0, oy: 0, scale: 1.0 };
const stPaintedInStroke = new Set();
let stSpaceDown    = false;
let stPanStart     = null;
let stRectPreview  = null;
let stCanvas, stCtx;
let stRafPending = false;

// ── helpers ───────────────────────────────────────────────────────────────────
function stKey(x, y)    { return x + ',' + y; }
function stTileS()      { return ST_TILE_SIZE * stView.scale; }

function stWorldToTile(sx, sy) {
  const s = stTileS();
  return { x: Math.floor((sx - stView.ox) / s), y: Math.floor((sy - stView.oy) / s) };
}

// ── undo ──────────────────────────────────────────────────────────────────────
function stSaveUndo() {
  stUndoStack.push(new Map(stGrid));
  if (stUndoStack.length > 80) stUndoStack.shift();
  stRedoStack = [];
}
function stUndo() {
  if (!stUndoStack.length) return;
  stRedoStack.push(new Map(stGrid));
  stGrid = stUndoStack.pop();
  stScheduleRender();
}
function stRedo() {
  if (!stRedoStack.length) return;
  stUndoStack.push(new Map(stGrid));
  stGrid = stRedoStack.pop();
  stScheduleRender();
}

// ── paint / erase / fill ──────────────────────────────────────────────────────
function stApplyPaint(tx, ty) {
  const k = stKey(tx, ty);
  if (stGrid.get(k) !== stSelectedTile) { stGrid.set(k, stSelectedTile); stScheduleRender(); }
}
function stApplyErase(tx, ty) {
  const k = stKey(tx, ty);
  if (stGrid.has(k)) { stGrid.delete(k); stScheduleRender(); }
}
function stFloodFill(tx, ty) {
  const src = stGrid.get(stKey(tx, ty)) ?? null;
  if (src === stSelectedTile) return;
  const visited = new Set();
  const queue   = [[tx, ty]];
  while (queue.length) {
    const [x, y] = queue.pop();
    const k = stKey(x, y);
    if (visited.has(k)) continue;
    visited.add(k);
    if ((stGrid.get(k) ?? null) !== src) continue;
    stGrid.set(k, stSelectedTile);
    queue.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    if (visited.size > 8000) break;
  }
  stScheduleRender();
}
function stApplyRect(x0, y0, x1, y1, erase) {
  const mnX = Math.min(x0, x1), mxX = Math.max(x0, x1);
  const mnY = Math.min(y0, y1), mxY = Math.max(y0, y1);
  for (let y = mnY; y <= mxY; y++)
    for (let x = mnX; x <= mxX; x++)
      erase ? stGrid.delete(stKey(x, y)) : stGrid.set(stKey(x, y), stSelectedTile);
}

// ── render ────────────────────────────────────────────────────────────────────
function stScheduleRender() {
  if (stRafPending) return;
  stRafPending = true;
  requestAnimationFrame(stRender);
}

function stRender() {
  stRafPending = false;
  if (!stCanvas) return;
  const W = stCanvas.width, H = stCanvas.height;
  const s = stTileS();

  stCtx.clearRect(0, 0, W, H);
  stCtx.fillStyle = '#191914';
  stCtx.fillRect(0, 0, W, H);

  // Grid dots
  if (s > 8) {
    stCtx.fillStyle = 'rgba(60,58,48,0.35)';
    const x0 = Math.floor(-stView.ox / s), x1 = x0 + Math.ceil(W / s) + 2;
    const y0 = Math.floor(-stView.oy / s), y1 = y0 + Math.ceil(H / s) + 2;
    for (let gy = y0; gy <= y1; gy++)
      for (let gx = x0; gx <= x1; gx++)
        stCtx.fillRect(gx * s + stView.ox - 0.5, gy * s + stView.oy - 0.5, 1, 1);
  }

  // Tiles
  for (const [k, tile] of stGrid) {
    const [tx, ty] = k.split(',').map(Number);
    const px = tx * s + stView.ox, py = ty * s + stView.oy;
    if (px + s < 0 || px > W || py + s < 0 || py > H) continue;
    const def = ST_TILES[tile];
    if (!def) continue;
    stCtx.fillStyle = def.color;
    stCtx.fillRect(px, py, s, s);
    stCtx.strokeStyle = 'rgba(0,0,0,0.22)';
    stCtx.lineWidth = 0.5;
    stCtx.strokeRect(px, py, s, s);
    const sym = ST_SYMBOL[tile];
    if (sym && s > 12) {
      stCtx.font = `${Math.max(7, Math.round(s * 0.52))}px monospace`;
      stCtx.textAlign = 'center'; stCtx.textBaseline = 'middle';
      stCtx.fillStyle = 'rgba(255,255,255,0.5)';
      stCtx.fillText(sym, px + s / 2, py + s / 2);
    }
  }

  // Building labels at high zoom
  if (s > 28) {
    stCtx.textAlign = 'center'; stCtx.textBaseline = 'middle';
    const done = new Set();
    for (const [k, tile] of stGrid) {
      const lbl = ST_LABEL[tile];
      if (!lbl || done.has(k)) continue;
      // find bounding box of this contiguous building region
      const [sx, sy] = k.split(',').map(Number);
      let mnX = sx, mxX = sx, mnY = sy, mxY = sy;
      for (const [k2, t2] of stGrid) {
        if (t2 !== tile) continue;
        const [bx, by] = k2.split(',').map(Number);
        if (mnX > bx) mnX = bx; if (mxX < bx) mxX = bx;
        if (mnY > by) mnY = by; if (mxY < by) mxY = by;
        done.add(k2);
      }
      const cx2 = ((mnX + mxX) / 2 + 0.5) * s + stView.ox;
      const cy2 = ((mnY + mxY) / 2 + 0.5) * s + stView.oy;
      stCtx.font = `${Math.max(8, Math.round(s * 0.38))}px Georgia, serif`;
      stCtx.fillStyle = 'rgba(220,195,130,0.9)';
      stCtx.fillText(lbl, cx2, cy2);
    }
  }

  // Rect preview
  if (stRectPreview) {
    const { x0, y0, x1, y1 } = stRectPreview;
    const mnX = Math.min(x0, x1), mxX = Math.max(x0, x1);
    const mnY = Math.min(y0, y1), mxY = Math.max(y0, y1);
    const px = mnX * s + stView.ox, py = mnY * s + stView.oy;
    const pw = (mxX - mnX + 1) * s, ph = (mxY - mnY + 1) * s;
    const def = ST_TILES[stSelectedTile];
    stCtx.fillStyle = (def?.color ?? '#c9a84c') + '44';
    stCtx.fillRect(px, py, pw, ph);
    stCtx.strokeStyle = '#c9a84c';
    stCtx.lineWidth = 1.5;
    stCtx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);
  }

  // Cursor highlight
  if (stMouse.onCanvas) {
    const px = stMouse.tx * s + stView.ox, py = stMouse.ty * s + stView.oy;
    stCtx.strokeStyle = 'rgba(201,168,76,0.75)';
    stCtx.lineWidth = 1.5;
    stCtx.strokeRect(px + 0.5, py + 0.5, s - 1, s - 1);
  }
}

// ── view ──────────────────────────────────────────────────────────────────────
function stFitView() {
  if (!stGrid.size) {
    stView.scale = 1; stView.ox = stCanvas.width / 2; stView.oy = stCanvas.height / 2;
    stScheduleRender(); return;
  }
  let mnX = Infinity, mxX = -Infinity, mnY = Infinity, mxY = -Infinity;
  for (const k of stGrid.keys()) {
    const [x, y] = k.split(',').map(Number);
    if (x < mnX) mnX = x; if (x > mxX) mxX = x;
    if (y < mnY) mnY = y; if (y > mxY) mxY = y;
  }
  const tw = (mxX - mnX + 1) * ST_TILE_SIZE, th = (mxY - mnY + 1) * ST_TILE_SIZE;
  stView.scale = Math.min((stCanvas.width - 40) / tw, (stCanvas.height - 40) / th, 4);
  const s = stTileS();
  stView.ox = (stCanvas.width  - (mxX - mnX + 1) * s) / 2 - mnX * s;
  stView.oy = (stCanvas.height - (mxY - mnY + 1) * s) / 2 - mnY * s;
  stScheduleRender();
}

// ── save / export ─────────────────────────────────────────────────────────────
function stCurrentData() {
  return { name: stMapName, tiles: [...stGrid.entries()] };
}

function stSaveToLibrary() {
  try {
    if (!stCurrentId) stCurrentId = crypto.randomUUID();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    const now = new Date().toISOString();
    const idx = all.findIndex(i => i.id === stCurrentId);
    const record = { id: stCurrentId, type: 'settlement', name: stMapName,
      data: stCurrentData(), createdAt: all[idx]?.createdAt ?? now, updatedAt: now };
    if (idx >= 0) all[idx] = record; else all.unshift(record);
    localStorage.setItem('hx_content', JSON.stringify(all));
    stShowToast('Saved to library');
  } catch (err) { alert('Save failed: ' + err.message); }
}

function stExportMap() {
  const blob = new Blob([JSON.stringify(stCurrentData(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (stMapName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'settlement') + '.json';
  a.click();
}

function stLoadData(d) {
  stGrid = new Map(d.tiles || []);
  stUndoStack = []; stRedoStack = [];
  stScheduleRender();
}

function stImportMap(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const d = JSON.parse(ev.target.result);
      stSaveUndo();
      stMapName = d.name || 'Imported Settlement';
      stLoadData(d);
      document.getElementById('st-input-name').value = stMapName;
      stFitView();
    } catch (err) { alert('Failed to load: ' + err.message); }
  };
  reader.readAsText(file);
}

function stShowToast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:40px;right:20px;background:#1e1a0c;border:1px solid #c9a84c;color:#c9a84c;font-family:Georgia,serif;font-size:0.78rem;padding:8px 16px;border-radius:4px;z-index:9999;pointer-events:none;transition:opacity 0.4s';
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 1600);
}

// ── tool / tile selection ─────────────────────────────────────────────────────
function stSelectTool(tool) {
  stActiveTool = tool;
  document.querySelectorAll('#st-toolbar .st-tool-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tool === tool));
  stCanvas.style.cursor = (tool === 'pan' || stSpaceDown) ? 'grab' : 'crosshair';
  const el = document.getElementById('st-status-tool');
  if (el) el.textContent = 'Tool: ' + tool;
}

function stSelectTile(tile) {
  stSelectedTile = tile;
  document.querySelectorAll('#st-palette .st-palette-tile').forEach(b =>
    b.classList.toggle('selected', b.dataset.tile === tile));
  const def = ST_TILES[tile];
  const sw = document.getElementById('st-selected-swatch');
  const nm = document.getElementById('st-selected-name');
  if (sw) sw.style.background = def?.color ?? '';
  if (nm) nm.textContent = def?.label ?? tile;
  const st = document.getElementById('st-status-tile');
  if (st) st.textContent = def?.label ?? tile;
}

// ── palette ───────────────────────────────────────────────────────────────────
function stBuildPalette() {
  const container = document.getElementById('st-palette');
  if (!container) return;
  container.innerHTML = '';
  for (const cat of ST_TILE_CATS) {
    const h = document.createElement('div');
    h.className = 'st-palette-cat'; h.textContent = cat;
    container.appendChild(h);
    for (const [k, def] of Object.entries(ST_TILES)) {
      if (def.cat !== cat) continue;
      const btn = document.createElement('button');
      btn.className = 'st-palette-tile'; btn.dataset.tile = k; btn.title = def.label;
      btn.onclick = () => stSelectTile(k);
      const sw = document.createElement('span');
      sw.className = 'st-palette-swatch'; sw.style.background = def.color;
      const sym = ST_SYMBOL[k];
      if (sym) sw.textContent = sym;
      const lb = document.createElement('span');
      lb.className = 'st-palette-label'; lb.textContent = def.label;
      btn.appendChild(sw); btn.appendChild(lb);
      container.appendChild(btn);
    }
  }
}

// ── mouse ─────────────────────────────────────────────────────────────────────
function stGetCanvasPos(e) {
  const r = stCanvas.getBoundingClientRect();
  return { cx: e.clientX - r.left, cy: e.clientY - r.top };
}

function stOnMouseDown(e) {
  stCanvas.focus();
  const { cx, cy } = stGetCanvasPos(e);
  stMouse.btn  = e.button;
  stMouse.down = true;

  if (e.button === 1 || stSpaceDown) {
    stPanStart = { ox: stView.ox, oy: stView.oy, mx: cx, my: cy };
    e.preventDefault(); return;
  }

  const { x, y } = stWorldToTile(cx, cy);
  stMouse.tx = x; stMouse.ty = y;

  if (e.button === 2) {
    stSaveUndo(); stPaintedInStroke.clear(); stApplyErase(x, y); return;
  }

  if      (stActiveTool === 'paint') { stSaveUndo(); stPaintedInStroke.clear(); stApplyPaint(x, y); }
  else if (stActiveTool === 'erase') { stSaveUndo(); stPaintedInStroke.clear(); stApplyErase(x, y); }
  else if (stActiveTool === 'fill')  { stSaveUndo(); stFloodFill(x, y); }
  else if (stActiveTool === 'pick')  { const t = stGrid.get(stKey(x, y)); if (t) stSelectTile(t); }
  else if (stActiveTool === 'rect')  {
    stMouse.rectX0 = x; stMouse.rectY0 = y;
    stRectPreview = { x0: x, y0: y, x1: x, y1: y };
  }
}

function stOnMouseMove(e) {
  const { cx, cy } = stGetCanvasPos(e);
  stMouse.onCanvas = true;

  if (stPanStart) {
    stView.ox = stPanStart.ox + (cx - stPanStart.mx);
    stView.oy = stPanStart.oy + (cy - stPanStart.my);
    stScheduleRender(); return;
  }

  const { x, y } = stWorldToTile(cx, cy);
  const moved = x !== stMouse.tx || y !== stMouse.ty;
  stMouse.tx = x; stMouse.ty = y;

  if (stMouse.down) {
    if (stMouse.btn === 2) {
      if (moved) stApplyErase(x, y);
    } else if (stActiveTool === 'paint' && moved) {
      const k = stKey(x, y);
      if (!stPaintedInStroke.has(k)) { stPaintedInStroke.add(k); stApplyPaint(x, y); }
    } else if (stActiveTool === 'erase' && moved) {
      stApplyErase(x, y);
    } else if (stActiveTool === 'rect') {
      stRectPreview = { x0: stMouse.rectX0, y0: stMouse.rectY0, x1: x, y1: y };
      stScheduleRender();
    }
  } else {
    stScheduleRender();
  }

  const pos = document.getElementById('st-status-pos');
  if (pos) pos.textContent = `${x}, ${y}`;
}

function stOnMouseUp(e) {
  if (stPanStart) { stPanStart = null; stMouse.down = false; stMouse.btn = -1; return; }

  if (stActiveTool === 'rect' && stRectPreview && stMouse.down) {
    stSaveUndo();
    const { x0, y0, x1, y1 } = stRectPreview;
    stApplyRect(x0, y0, x1, y1, stMouse.btn === 2);
    stRectPreview = null;
    stScheduleRender();
  }
  stMouse.down = false; stMouse.btn = -1;
}

function stOnMouseLeave() {
  stMouse.onCanvas = false;
  if (!stMouse.down) stPanStart = null;
  stScheduleRender();
}

function stOnWheel(e) {
  e.preventDefault();
  const { cx, cy } = stGetCanvasPos(e);
  const factor   = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  const newScale = Math.min(Math.max(stView.scale * factor, 0.12), 10);
  stView.ox = cx - (cx - stView.ox) * (newScale / stView.scale);
  stView.oy = cy - (cy - stView.oy) * (newScale / stView.scale);
  stView.scale = newScale;
  stScheduleRender();
}

// ── keyboard ──────────────────────────────────────────────────────────────────
function stOnKeyDown(e) {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === ' ') { stSpaceDown = true; stCanvas.style.cursor = 'grab'; e.preventDefault(); return; }
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') { e.shiftKey ? stRedo() : stUndo(); e.preventDefault(); return; }
    if (e.key === 'y') { stRedo(); e.preventDefault(); return; }
    if (e.key === 's') { stSaveToLibrary(); e.preventDefault(); return; }
  }
  const map = { b: 'paint', r: 'rect', e: 'erase', f: 'fill', p: 'pick', h: 'pan' };
  const tool = map[e.key.toLowerCase()];
  if (tool) stSelectTool(tool);
}

function stOnKeyUp(e) {
  if (e.key === ' ') {
    stSpaceDown = false;
    stCanvas.style.cursor = stActiveTool === 'pan' ? 'grab' : 'crosshair';
  }
}

// ── init ──────────────────────────────────────────────────────────────────────
function stInit() {
  stCanvas = document.getElementById('st-canvas');
  if (!stCanvas) return;
  stCtx = stCanvas.getContext('2d');

  const wrap = document.getElementById('st-canvas-wrap');
  function resizeCanvas() {
    stCanvas.width  = wrap.clientWidth;
    stCanvas.height = wrap.clientHeight;
    stScheduleRender();
  }
  const ro = new ResizeObserver(resizeCanvas);
  ro.observe(wrap);
  stCanvas._stRo = ro;

  // Load existing content
  const incomingId = window.__settlementContentId || null;
  if (incomingId) {
    try {
      const all  = JSON.parse(localStorage.getItem('hx_content') || '[]');
      const item = all.find(i => i.id === incomingId);
      if (item?.data) {
        stCurrentId = incomingId;
        stMapName   = item.name || 'Untitled Settlement';
        stLoadData(item.data);
        const nameEl = document.getElementById('st-input-name');
        if (nameEl) nameEl.value = stMapName;
        setTimeout(stFitView, 60);
      }
    } catch { /**/ }
  }

  stView.ox = 0; stView.oy = 0;
  stBuildPalette();
  stSelectTile('grass');
  stSelectTool('paint');
  resizeCanvas();

  // Header wiring
  const nameEl = document.getElementById('st-input-name');
  if (nameEl) nameEl.addEventListener('input', e => { stMapName = e.target.value; });
  document.getElementById('btn-st-save').addEventListener('click', stSaveToLibrary);
  document.getElementById('btn-st-export').addEventListener('click', stExportMap);
  document.getElementById('btn-st-fit').addEventListener('click', stFitView);
  document.getElementById('btn-st-new').addEventListener('click', () => {
    if (stGrid.size && !confirm('Clear the map and start over?')) return;
    stSaveUndo();
    stGrid      = new Map();
    stCurrentId = null;
    stMapName   = 'Untitled Settlement';
    if (nameEl) nameEl.value = stMapName;
    stScheduleRender();
  });
  document.getElementById('btn-st-load').addEventListener('click', () =>
    document.getElementById('st-file-input').click());
  document.getElementById('st-file-input').addEventListener('change', e => {
    if (e.target.files[0]) stImportMap(e.target.files[0]);
    e.target.value = '';
  });

  // Toolbar wiring
  document.getElementById('btn-st-undo').addEventListener('click', stUndo);
  document.getElementById('btn-st-redo').addEventListener('click', stRedo);
  document.querySelectorAll('#st-toolbar .st-tool-btn').forEach(btn =>
    btn.addEventListener('click', () => stSelectTool(btn.dataset.tool)));

  // Canvas events
  stCanvas.addEventListener('mousedown',   stOnMouseDown);
  stCanvas.addEventListener('mousemove',   stOnMouseMove);
  stCanvas.addEventListener('mouseup',     stOnMouseUp);
  stCanvas.addEventListener('mouseleave',  stOnMouseLeave);
  stCanvas.addEventListener('wheel',       stOnWheel, { passive: false });
  stCanvas.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('mouseup', stOnMouseUp);
  document.addEventListener('keydown', stOnKeyDown);
  document.addEventListener('keyup',   stOnKeyUp);
}

// ── cleanup ───────────────────────────────────────────────────────────────────
window.cleanupSettlement = function () {
  document.removeEventListener('keydown', stOnKeyDown);
  document.removeEventListener('keyup',   stOnKeyUp);
  window.removeEventListener('mouseup', stOnMouseUp);
  if (stCanvas?._stRo) stCanvas._stRo.disconnect();
  stCanvas = null; stCtx = null;
};

window.settlementFitView = stFitView;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', stInit);
} else {
  stInit();
}
