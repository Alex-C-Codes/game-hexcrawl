'use strict';

const TILE_SIZE = 24;

const TILES = {
  stone:       { label: 'Wall',       color: '#1e1c19', passable: false, cat: 'Terrain',   sym: null },
  floor:       { label: 'Floor',      color: '#7a6a58', passable: true,  cat: 'Terrain',   sym: null },
  air:         { label: 'Open Air',   color: '#1a2d44', passable: true,  cat: 'Terrain',   sym: '↕'  },
  corridor:    { label: 'Corridor',   color: '#5a4a38', passable: true,  cat: 'Terrain',   sym: null },
  water:       { label: 'Water',      color: '#1a3a5a', passable: false, cat: 'Terrain',   sym: '~'  },
  lava:        { label: 'Lava',       color: '#7a1a0a', passable: false, cat: 'Terrain',   sym: '~'  },
  pit:         { label: 'Pit',        color: '#080706', passable: false, cat: 'Terrain',   sym: 'O'  },
  door:        { label: 'Door',       color: '#8a5525', passable: true,  cat: 'legacy',    sym: 'D'  },
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
const STONE_COLOR = '#1e1c19';

// ── Level system ───────────────────────────────────────────────────────────────
function createLevel(name) {
  return { id: crypto.randomUUID(), name, height: 10, grid: new Map(), doors: new Set(), walls: new Set(), undo: [], redo: [] };
}

let levels = [createLevel('Layer 1')];
let currentLevelIdx = 0;
let showGhostAbove = false;
let showGhostBelow = false;
let showSection    = false;
let sectionSliceY  = 0;
let sectionCanvas  = null;
let sectionCtx     = null;
let sectionResizeObs = null;

// ── State (global vars always reflect the ACTIVE level) ────────────────────────
let mapName = 'Untitled Dungeon';
let grid  = levels[0].grid;
let doors = levels[0].doors;
let walls = levels[0].walls;
let doorHover = null;
let wallHover = null;
let wallPainting = false;
let wallErasing  = false;
const paintedInWallStroke = new Set();
let currentContentId = null;

const view = { ox: 0, oy: 0, scale: 1.0 };
let selectedTile = 'floor';
let activeTool   = 'rect';
// These are re-assigned on level switch; same pattern as grid/doors/walls
let undoStack = levels[0].undo;
let redoStack = levels[0].redo;
const paintedInStroke = new Set();
const mouse = { tx: 0, ty: 0, down: false, btn: -1, onCanvas: false,
                rectX0: -1, rectY0: -1,
                panX: 0, panY: 0, panOX: 0, panOY: 0 };
let spaceDown = false;
let spacePanLast = null;

let canvas, ctx;
let rafPending = false;

// ── Grid helpers ───────────────────────────────────────────────────────────────
function key(x, y) { return x + ',' + y; }
function getTile(x, y) { return grid.get(key(x, y)) ?? 'stone'; }
function setTile(x, y, t) {
  if (!t || t === 'stone') grid.delete(key(x, y));
  else grid.set(key(x, y), t);
}

// ── Level management ───────────────────────────────────────────────────────────

// Commit in-memory global vars back to the level record (needed after undo/redo
// replaces grid/doors/walls references, before any level switch).
function commitLevel() {
  levels[currentLevelIdx].grid  = grid;
  levels[currentLevelIdx].doors = doors;
  levels[currentLevelIdx].walls = walls;
}

function notifyLevelsChanged() {
  window.__editorOnLevelsChanged?.(
    levels.map(l => ({ id: l.id, name: l.name, height: l.height ?? 10 })),
    currentLevelIdx
  );
  syncUndoButtons();
}

function switchLevel(idx) {
  if (idx < 0 || idx >= levels.length || idx === currentLevelIdx) return;
  commitLevel();
  currentLevelIdx = idx;
  const lv = levels[idx];
  grid = lv.grid; doors = lv.doors; walls = lv.walls;
  undoStack = lv.undo; redoStack = lv.redo;
  doorHover = null; wallHover = null;
  notifyLevelsChanged();
  fitView(); scheduleRender();
}

function addLevel() {
  commitLevel();
  const lv = createLevel(`Layer ${levels.length + 1}`);
  const insertAt = currentLevelIdx + 1;
  levels.splice(insertAt, 0, lv);
  currentLevelIdx = insertAt;
  grid = lv.grid; doors = lv.doors; walls = lv.walls;
  undoStack = lv.undo; redoStack = lv.redo;
  doorHover = null; wallHover = null;
  view.ox = canvas?.width / 2 ?? 400; view.oy = canvas?.height / 2 ?? 300;
  notifyLevelsChanged(); scheduleRender();
}

function reorderLevel(fromIdx, toIdx) {
  if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= levels.length || toIdx >= levels.length) return;
  commitLevel();
  const activeId = levels[currentLevelIdx].id;
  const [moved] = levels.splice(fromIdx, 1);
  levels.splice(toIdx > fromIdx ? toIdx - 1 : toIdx, 0, moved);
  currentLevelIdx = levels.findIndex(l => l.id === activeId);
  notifyLevelsChanged();
  scheduleRender();
}

function deleteLevel(idx) {
  if (levels.length <= 1) return;
  if (!confirm(`Delete "${levels[idx].name}"? This cannot be undone.`)) return;
  commitLevel();
  levels.splice(idx, 1);
  const newIdx = Math.min(currentLevelIdx, levels.length - 1);
  currentLevelIdx = newIdx;
  const lv = levels[newIdx];
  grid = lv.grid; doors = lv.doors; walls = lv.walls;
  undoStack = lv.undo; redoStack = lv.redo;
  doorHover = null; wallHover = null;
  notifyLevelsChanged(); fitView(); scheduleRender();
}

function renameLevel(idx, name) {
  if (!name?.trim()) return;
  levels[idx].name = name.trim();
  notifyLevelsChanged();
}

function toggleGhostAbove() {
  showGhostAbove = !showGhostAbove;
  scheduleRender();
  return showGhostAbove;
}
function toggleGhostBelow() {
  showGhostBelow = !showGhostBelow;
  scheduleRender();
  return showGhostBelow;
}

function setLayerHeight(idx, h) {
  if (idx < 0 || idx >= levels.length) return;
  levels[idx].height = Math.max(1, Math.min(1000, Math.round(h)));
  notifyLevelsChanged();
  renderSection();
}

function toggleSection() {
  showSection = !showSection;
  if (!showSection) {
    if (sectionResizeObs) { sectionResizeObs.disconnect(); sectionResizeObs = null; }
    sectionCanvas = null; sectionCtx = null;
  }
  scheduleRender();
  return showSection;
}

function initSection(el) {
  if (sectionResizeObs) { sectionResizeObs.disconnect(); sectionResizeObs = null; }
  sectionCanvas = el;
  sectionCtx    = el ? el.getContext('2d') : null;
  if (!el) return;
  const wrap = el.parentElement;
  function resize() {
    sectionCanvas.width  = wrap.clientWidth;
    sectionCanvas.height = wrap.clientHeight;
    renderSection();
  }
  sectionResizeObs = new ResizeObserver(resize);
  sectionResizeObs.observe(wrap);
  resize();
}

function renderSection() {
  if (!sectionCanvas || !sectionCtx) return;
  const sc = sectionCtx;
  const W = sectionCanvas.width, H = sectionCanvas.height;
  if (!W || !H) return;

  sc.clearRect(0, 0, W, H);
  sc.fillStyle = '#0c0b09';
  sc.fillRect(0, 0, W, H);

  const totalFt = levels.reduce((sum, lv) => sum + (lv.height ?? 10), 0);
  if (totalFt === 0) return;

  const yOf = [];
  let cumFt = 0;
  for (let i = 0; i < levels.length; i++) {
    yOf.push(Math.round(H * cumFt / totalFt));
    cumFt += (levels[i].height ?? 10);
  }
  yOf.push(H);

  const sw = Math.max(1, tileS());
  const x0 = Math.floor(-view.ox / sw) - 1;
  const x1 = Math.ceil((W - view.ox) / sw) + 1;

  for (let i = 0; i < levels.length; i++) {
    const bandY0 = yOf[i], bandH = yOf[i + 1] - bandY0;
    if (bandH <= 0) continue;
    const g = (i === currentLevelIdx) ? grid : levels[i].grid;
    const floorLineH = Math.max(2, Math.min(5, Math.round(bandH * 0.1)));

    // ── 1. Stone fill + diagonal hatch for entire band ──────────────────────
    sc.fillStyle = STONE_COLOR;
    sc.fillRect(0, bandY0, W, bandH);

    if (bandH >= 5) {
      sc.save();
      sc.beginPath(); sc.rect(0, bandY0, W, bandH); sc.clip();
      sc.strokeStyle = 'rgba(255,255,255,0.05)';
      sc.lineWidth = 0.8;
      sc.beginPath();
      const step = 8;
      for (let d = -bandH; d < W + bandH; d += step) {
        sc.moveTo(d,          bandY0);
        sc.lineTo(d + bandH,  bandY0 + bandH);
      }
      sc.stroke();
      sc.restore();
    }

    // ── 2. Open-space tile fills ─────────────────────────────────────────────
    for (let tx = x0; tx <= x1; tx++) {
      const tileKey = g.get(`${tx},${sectionSliceY}`);
      if (!tileKey) continue;
      const def = TILES[tileKey];
      if (!def) continue;
      const px  = Math.round(view.ox + tx * sw);
      const cw  = Math.max(1, Math.ceil(sw));

      sc.fillStyle = def.color;
      sc.fillRect(px, bandY0, cw, bandH);

      // Floor line at base of walkable tiles
      if (tileKey !== 'air' && bandH >= 4) {
        // Warm highlight just above the floor
        if (bandH >= 10) {
          sc.fillStyle = 'rgba(180,148,90,0.22)';
          sc.fillRect(px, bandY0 + bandH - floorLineH - 1, cw, 1);
        }
        // Floor line itself
        sc.fillStyle = '#0c0a08';
        sc.fillRect(px, bandY0 + bandH - floorLineH, cw, floorLineH);
      }

      // Ceiling line at top of open tiles (underside of stone above)
      if (bandH >= 8) {
        sc.fillStyle = 'rgba(0,0,0,0.45)';
        sc.fillRect(px, bandY0, cw, 2);
      }
    }

    // ── 3. Vertical wall edge lines where stone meets open space ────────────
    if (sw >= 3) {
      sc.fillStyle = '#080604';
      for (let tx = x0; tx <= x1; tx++) {
        const tileKey = g.get(`${tx},${sectionSliceY}`);
        if (!tileKey) continue;
        const px = Math.round(view.ox + tx * sw);
        const cw = Math.max(1, Math.ceil(sw));
        if (!g.get(`${tx - 1},${sectionSliceY}`)) sc.fillRect(px,      bandY0, 1, bandH);
        if (!g.get(`${tx + 1},${sectionSliceY}`)) sc.fillRect(px + cw - 1, bandY0, 1, bandH);
      }
    }

    // ── 4. Active layer tint ─────────────────────────────────────────────────
    if (i === currentLevelIdx) {
      sc.fillStyle = 'rgba(201,168,76,0.04)';
      sc.fillRect(0, bandY0, W, bandH);
    }

    // ── 5. Band separator ────────────────────────────────────────────────────
    if (i > 0) {
      sc.fillStyle = 'rgba(255,255,255,0.08)';
      sc.fillRect(0, bandY0, W, 1);
    }

    // ── 6. Layer label ───────────────────────────────────────────────────────
    if (bandH >= 11) {
      const fontSize = Math.min(10, bandH - 3);
      sc.font = `${fontSize}px Georgia, serif`;
      sc.textAlign = 'left';
      sc.textBaseline = 'middle';
      const labelY = bandY0 + bandH / 2;
      const label  = `${levels[i].name}  ${levels[i].height ?? 10}ft`;
      // Dim backdrop so label reads over any tile
      sc.fillStyle = 'rgba(0,0,0,0.45)';
      sc.fillRect(3, labelY - fontSize / 2 - 1, sc.measureText(label).width + 8, fontSize + 2);
      sc.fillStyle = (i === currentLevelIdx) ? '#c9a84c' : '#4a4540';
      sc.fillText(label, 7, labelY);
    }
  }

  // ── Active layer border ──────────────────────────────────────────────────
  const aY0 = yOf[currentLevelIdx], aH = yOf[currentLevelIdx + 1] - aY0;
  sc.strokeStyle = 'rgba(201,168,76,0.4)';
  sc.lineWidth = 1;
  sc.strokeRect(0.5, aY0 + 0.5, W - 1, aH - 1);

  // ── Slice row watermark ──────────────────────────────────────────────────
  sc.fillStyle = '#252018';
  sc.font = '9px monospace';
  sc.textAlign = 'right';
  sc.textBaseline = 'top';
  sc.fillText(`row ${sectionSliceY}`, W - 4, 2);
}

// ── Undo / redo ────────────────────────────────────────────────────────────────
function snapshot() { return { g: new Map(grid), d: new Set(doors), w: new Set(walls) }; }

function saveUndo() {
  undoStack.push(snapshot());
  if (undoStack.length > 60) undoStack.shift();
  redoStack.length = 0;
  syncUndoButtons();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(snapshot());
  const snap = undoStack.pop();
  grid = snap.g; doors = snap.d; walls = snap.w;
  commitLevel(); // resync level record after reference replacement
  syncUndoButtons(); scheduleRender();
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(snapshot());
  const snap = redoStack.pop();
  grid = snap.g; doors = snap.d; walls = snap.w;
  commitLevel();
  syncUndoButtons(); scheduleRender();
}

function syncUndoButtons() {
  document.getElementById('btn-undo').disabled = !undoStack.length;
  document.getElementById('btn-redo').disabled = !redoStack.length;
}

// ── Flood fill ─────────────────────────────────────────────────────────────────
function floodFill(sx, sy, newT) {
  const oldT = grid.get(key(sx, sy));
  if (oldT === undefined || oldT === newT) return;
  const q = [[sx, sy]];
  const seen = new Set([key(sx, sy)]);
  while (q.length) {
    const [x, y] = q.shift();
    setTile(x, y, newT);
    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (!seen.has(k) && grid.get(k) === oldT) { seen.add(k); q.push([nx, ny]); }
    }
  }
}

// ── Coordinate transforms ──────────────────────────────────────────────────────
function tileS() { return TILE_SIZE * view.scale; }
function toTile(cx, cy) {
  const s = tileS();
  return { x: Math.floor((cx - view.ox) / s), y: Math.floor((cy - view.oy) / s) };
}
function toScreen(tx, ty) {
  const s = tileS();
  return { x: view.ox + tx * s, y: view.oy + ty * s };
}

// ── Edge door system ───────────────────────────────────────────────────────────
function dKey(type, x, y) { return type + ':' + x + ',' + y; }

function edgeFromCanvas(cx, cy) {
  const s = tileS();
  const fx = (cx - view.ox) / s, fy = (cy - view.oy) / s;
  const tx = Math.floor(fx), ty = Math.floor(fy);
  const lx = fx - tx, ly = fy - ty;
  const dH = Math.min(ly, 1 - ly) * s, dV = Math.min(lx, 1 - lx) * s;
  const threshold = Math.min(s * 0.32, 14);
  if (dH > threshold && dV > threshold) return null;
  if (dH <= dV) return { type: 'h', x: tx, y: ly < 0.5 ? ty : ty + 1 };
  return { type: 'v', x: lx < 0.5 ? tx : tx + 1, y: ty };
}

function renderDoorEdge(type, x, y, barColor, jamColor, s) {
  const barLen   = Math.max(6, s * 0.72);
  const barThick = Math.max(2, s * 0.11);
  const jamLen   = Math.max(3, s * 0.2);
  const jamThick = Math.max(1.5, s * 0.065);
  ctx.lineCap = 'butt';
  if (type === 'h') {
    const ly = view.oy + y * s, cx = view.ox + x * s + s / 2;
    ctx.strokeStyle = barColor; ctx.lineWidth = barThick;
    ctx.beginPath(); ctx.moveTo(cx - barLen / 2, ly); ctx.lineTo(cx + barLen / 2, ly); ctx.stroke();
    ctx.strokeStyle = jamColor; ctx.lineWidth = jamThick;
    ctx.beginPath();
    ctx.moveTo(cx - barLen / 2, ly - jamLen / 2); ctx.lineTo(cx - barLen / 2, ly + jamLen / 2);
    ctx.moveTo(cx + barLen / 2, ly - jamLen / 2); ctx.lineTo(cx + barLen / 2, ly + jamLen / 2);
    ctx.stroke();
  } else {
    const lx = view.ox + x * s, cy = view.oy + y * s + s / 2;
    ctx.strokeStyle = barColor; ctx.lineWidth = barThick;
    ctx.beginPath(); ctx.moveTo(lx, cy - barLen / 2); ctx.lineTo(lx, cy + barLen / 2); ctx.stroke();
    ctx.strokeStyle = jamColor; ctx.lineWidth = jamThick;
    ctx.beginPath();
    ctx.moveTo(lx - jamLen / 2, cy - barLen / 2); ctx.lineTo(lx + jamLen / 2, cy - barLen / 2);
    ctx.moveTo(lx - jamLen / 2, cy + barLen / 2); ctx.lineTo(lx + jamLen / 2, cy + barLen / 2);
    ctx.stroke();
  }
}

function renderDoors(s) {
  for (const dk of doors) {
    const [type, coords] = dk.split(':');
    const [x, y] = coords.split(',').map(Number);
    renderDoorEdge(type, x, y, '#d4a44c', '#7a4820', s);
  }
  if (doorHover && activeTool === 'door') {
    const dk = dKey(doorHover.type, doorHover.x, doorHover.y);
    const exists = doors.has(dk);
    renderDoorEdge(doorHover.type, doorHover.x, doorHover.y,
      exists ? 'rgba(220,80,60,0.8)' : 'rgba(212,164,76,0.55)',
      exists ? 'rgba(160,50,30,0.6)' : 'rgba(140,90,30,0.45)', s);
  }
}

// ── Edge wall system ───────────────────────────────────────────────────────────
function wKey(type, x, y) { return type + ':' + x + ',' + y; }

function renderWallEdge(type, x, y, color, s) {
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(2.5, s * 0.16); ctx.lineCap = 'square';
  ctx.beginPath();
  if (type === 'h') {
    const ly = view.oy + y * s;
    ctx.moveTo(view.ox + x * s, ly); ctx.lineTo(view.ox + (x + 1) * s, ly);
  } else {
    const lx = view.ox + x * s;
    ctx.moveTo(lx, view.oy + y * s); ctx.lineTo(lx, view.oy + (y + 1) * s);
  }
  ctx.stroke();
}

function renderWalls(s) {
  for (const wk of walls) {
    const [type, coords] = wk.split(':');
    const [x, y] = coords.split(',').map(Number);
    renderWallEdge(type, x, y, '#c8b898', s);
  }
  if (wallHover && activeTool === 'wall') {
    const wk = wKey(wallHover.type, wallHover.x, wallHover.y);
    const exists = walls.has(wk);
    renderWallEdge(wallHover.type, wallHover.x, wallHover.y,
      exists ? 'rgba(220,80,60,0.75)' : 'rgba(200,184,152,0.45)', s);
  }
}

// ── Render ─────────────────────────────────────────────────────────────────────
function scheduleRender() {
  if (!rafPending) { rafPending = true; requestAnimationFrame(() => { rafPending = false; render(); }); }
}

function renderTileGrid(tileGrid, s, alpha) {
  if (alpha !== undefined) ctx.globalAlpha = alpha;
  for (const [k, tileKey] of tileGrid) {
    const [tx, ty] = k.split(',').map(Number);
    const { x: sx, y: sy } = toScreen(tx, ty);
    if (sx + s < 0 || sx > canvas.width || sy + s < 0 || sy > canvas.height) continue;
    const def = TILES[tileKey] || TILES.floor;
    ctx.fillStyle = def.color;
    ctx.fillRect(sx, sy, s, s);
    if (def.sym && s >= 14) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = `bold ${Math.max(8, Math.floor(s * 0.44))}px monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(def.sym, sx + s / 2, sy + s / 2);
    }
  }
  if (alpha !== undefined) ctx.globalAlpha = 1;
}

function render() {
  const s = tileS();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = STONE_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ghost: layers below (deeper, drawn first so active sits on top)
  if (showGhostBelow) {
    for (let i = currentLevelIdx + 1; i < levels.length; i++) {
      const dist = i - currentLevelIdx;
      renderTileGrid(levels[i].grid, s, Math.max(0.05, 0.17 / dist));
    }
  }

  // Active layer tiles
  renderTileGrid(grid, s);

  // Ghost: layers above (shallower, drawn on top so they feel physically above)
  if (showGhostAbove) {
    for (let i = currentLevelIdx - 1; i >= 0; i--) {
      const dist = currentLevelIdx - i;
      renderTileGrid(levels[i].grid, s, Math.max(0.05, 0.17 / dist));
    }
  }

  // Infinite grid lines
  if (s >= 6) {
    const x0 = Math.floor(-view.ox / s) - 1, x1 = Math.ceil((canvas.width  - view.ox) / s) + 1;
    const y0 = Math.floor(-view.oy / s) - 1, y1 = Math.ceil((canvas.height - view.oy) / s) + 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let tx = x0; tx <= x1; tx++) { const x = view.ox + tx * s; ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
    for (let ty = y0; ty <= y1; ty++) { const y = view.oy + ty * s; ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
    ctx.stroke();
  }

  renderWalls(s);
  renderDoors(s);

  // Rect preview
  if (activeTool === 'rect' && mouse.down && mouse.btn === 0 && mouse.rectX0 !== -1) {
    const rx1 = Math.min(mouse.rectX0, mouse.tx), ry1 = Math.min(mouse.rectY0, mouse.ty);
    const rx2 = Math.max(mouse.rectX0, mouse.tx), ry2 = Math.max(mouse.rectY0, mouse.ty);
    const { x: px1, y: py1 } = toScreen(rx1, ry1);
    const { x: px2, y: py2 } = toScreen(rx2 + 1, ry2 + 1);
    ctx.fillStyle = 'rgba(255,215,0,0.12)'; ctx.fillRect(px1, py1, px2 - px1, py2 - py1);
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5;
    ctx.strokeRect(px1, py1, px2 - px1, py2 - py1);
  }

  if (mouse.onCanvas && activeTool !== 'door' && activeTool !== 'wall') {
    const { x: sx, y: sy } = toScreen(mouse.tx, mouse.ty);
    ctx.strokeStyle = 'rgba(255,215,0,0.75)';
    ctx.lineWidth = Math.max(1, s * 0.06);
    ctx.strokeRect(sx + 1, sy + 1, s - 2, s - 2);
  }

  // Slice indicator when section panel is open
  if (showSection) {
    const sliceScreenY = view.oy + sectionSliceY * s;
    ctx.fillStyle = 'rgba(80,180,255,0.07)';
    ctx.fillRect(0, sliceScreenY, canvas.width, s);
    ctx.strokeStyle = 'rgba(80,180,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, sliceScreenY);     ctx.lineTo(canvas.width, sliceScreenY);
    ctx.moveTo(0, sliceScreenY + s); ctx.lineTo(canvas.width, sliceScreenY + s);
    ctx.stroke();
    renderSection();
  }

  updateStatus();
}

function updateStatus() {
  const t = mouse.onCanvas ? getTile(mouse.tx, mouse.ty) : null;
  document.getElementById('status-pos').textContent  = mouse.onCanvas ? `(${mouse.tx}, ${mouse.ty})` : '';
  document.getElementById('status-tile').textContent = t ? `Tile: ${TILES[t]?.label ?? t}` : '';
  document.getElementById('status-tool').textContent =
    spaceDown ? 'Tool: pan (space)' : `Tool: ${activeTool}`;
}

// ── Mouse ──────────────────────────────────────────────────────────────────────
function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { cx: e.clientX - r.left, cy: e.clientY - r.top };
}

function onMouseDown(e) {
  e.preventDefault(); canvas.focus();
  const { cx, cy } = getPos(e);
  const { x: tx, y: ty } = toTile(cx, cy);
  mouse.down = true; mouse.btn = e.button; mouse.tx = tx; mouse.ty = ty;

  // Wall tool intercepts L+R before the pan block
  if (activeTool === 'wall' && (e.button === 0 || e.button === 2)) {
    const edge = edgeFromCanvas(cx, cy);
    if (edge) {
      const wk = wKey(edge.type, edge.x, edge.y);
      const exists = walls.has(wk);
      saveUndo(); paintedInWallStroke.clear();
      if (e.button === 2 || exists) { wallErasing = true; wallPainting = false; walls.delete(wk); }
      else { wallPainting = true; wallErasing = false; walls.add(wk); }
      paintedInWallStroke.add(wk);
    }
    scheduleRender(); return;
  }

  if (e.button === 1 || e.button === 2 || (e.button === 0 && (spaceDown || activeTool === 'pan'))) {
    mouse.panX = e.clientX; mouse.panY = e.clientY;
    mouse.panOX = view.ox;  mouse.panOY = view.oy;
    return;
  }
  if (e.button !== 0) return;

  if (activeTool === 'door') {
    const edge = edgeFromCanvas(cx, cy);
    if (edge) {
      saveUndo();
      const dk = dKey(edge.type, edge.x, edge.y);
      if (doors.has(dk)) doors.delete(dk); else doors.add(dk);
    }
    scheduleRender(); return;
  }

  if      (activeTool === 'paint') { saveUndo(); paintedInStroke.clear(); applyPaint(tx, ty); }
  else if (activeTool === 'erase') { saveUndo(); paintedInStroke.clear(); applyErase(tx, ty); }
  else if (activeTool === 'fill')  { saveUndo(); floodFill(tx, ty, selectedTile); scheduleRender(); }
  else if (activeTool === 'rect')  { mouse.rectX0 = tx; mouse.rectY0 = ty; }
  else if (activeTool === 'pick')  { const t = grid.get(key(tx, ty)); if (t) selectTile(t); }
  scheduleRender();
}

function onPanMove(e) {
  if (activeTool === 'wall' && (mouse.btn === 0 || mouse.btn === 2)) return;
  if (!mouse.down || (mouse.btn !== 1 && mouse.btn !== 2 && !(mouse.btn === 0 && (spaceDown || activeTool === 'pan')))) return;
  view.ox = mouse.panOX + (e.clientX - mouse.panX);
  view.oy = mouse.panOY + (e.clientY - mouse.panY);
  scheduleRender();
}

function onSpacePanMove(e) {
  if (mouse.down) { spacePanLast = null; return; }
  if (spacePanLast) { view.ox += e.clientX - spacePanLast.x; view.oy += e.clientY - spacePanLast.y; scheduleRender(); }
  spacePanLast = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
  const { cx, cy } = getPos(e);
  const { x: tx, y: ty } = toTile(cx, cy);
  const moved = tx !== mouse.tx || ty !== mouse.ty;
  mouse.tx = tx; mouse.ty = ty; mouse.onCanvas = true;
  if (showSection && ty !== sectionSliceY) sectionSliceY = ty;

  if (activeTool === 'door') doorHover = edgeFromCanvas(cx, cy);

  if (activeTool === 'wall') {
    wallHover = edgeFromCanvas(cx, cy);
    if (mouse.down && (mouse.btn === 0 || mouse.btn === 2) && wallHover) {
      const wk = wKey(wallHover.type, wallHover.x, wallHover.y);
      if (!paintedInWallStroke.has(wk)) {
        if (wallPainting) walls.add(wk); else walls.delete(wk);
        paintedInWallStroke.add(wk);
      }
    }
  }

  if (mouse.down && mouse.btn === 0 && moved && !spaceDown && activeTool !== 'pan' && activeTool !== 'door' && activeTool !== 'wall') {
    if (activeTool === 'paint') applyPaint(tx, ty);
    if (activeTool === 'erase') applyErase(tx, ty);
  }
  scheduleRender();
}

function onMouseUp(e) {
  if (!mouse.down) return;
  if (activeTool === 'wall' && (e.button === 0 || e.button === 2)) {
    wallPainting = false; wallErasing = false; paintedInWallStroke.clear();
  }
  if (e.button === 0 && activeTool === 'rect' && mouse.rectX0 !== -1) {
    const x1 = Math.min(mouse.rectX0, mouse.tx), y1 = Math.min(mouse.rectY0, mouse.ty);
    const x2 = Math.max(mouse.rectX0, mouse.tx), y2 = Math.max(mouse.rectY0, mouse.ty);
    saveUndo();
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) setTile(x, y, selectedTile);
    mouse.rectX0 = -1; mouse.rectY0 = -1; scheduleRender();
  }
  if (e.button === mouse.btn) { mouse.down = false; mouse.btn = -1; }
}

function applyPaint(tx, ty) {
  const k = key(tx, ty);
  if (!paintedInStroke.has(k)) { setTile(tx, ty, selectedTile); paintedInStroke.add(k); scheduleRender(); }
}

function applyErase(tx, ty) {
  const k = key(tx, ty);
  if (!paintedInStroke.has(k)) { grid.delete(k); paintedInStroke.add(k); scheduleRender(); }
}

function onWheel(e) {
  e.preventDefault();
  const { cx, cy } = getPos(e);
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  const ns = Math.max(0.15, Math.min(8, view.scale * factor));
  view.ox = cx - (cx - view.ox) * (ns / view.scale);
  view.oy = cy - (cy - view.oy) * (ns / view.scale);
  view.scale = ns; scheduleRender();
}

// ── Keyboard ───────────────────────────────────────────────────────────────────
function onKeyDown(e) {
  if (e.key === ' ') {
    if (e.target.tagName !== 'INPUT') {
      e.preventDefault();
      if (!spaceDown) { spaceDown = true; spacePanLast = null; window.addEventListener('mousemove', onSpacePanMove); scheduleRender(); }
    }
    return;
  }
  if (e.target.tagName === 'INPUT') return;
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); return; }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); return; }
  const toolKeys = { b: 'paint', e: 'erase', f: 'fill', r: 'rect', p: 'pick', d: 'door', w: 'wall' };
  const t = toolKeys[e.key.toLowerCase()];
  if (t) selectTool(t);
}

function onKeyUp(e) {
  if (e.key === ' ') {
    spaceDown = false; spacePanLast = null;
    window.removeEventListener('mousemove', onSpacePanMove); scheduleRender();
  }
}

// ── UI ─────────────────────────────────────────────────────────────────────────
function selectTile(k) {
  selectedTile = k;
  document.querySelectorAll('.palette-tile').forEach(el => el.classList.toggle('selected', el.dataset.tile === k));
  const def = TILES[k];
  const sw = document.getElementById('selected-tile-swatch');
  sw.style.background = def?.color ?? '#555'; sw.textContent = def?.sym ?? '';
  document.getElementById('selected-tile-name').textContent = def?.label ?? k;
}

function selectTool(tool) {
  activeTool = tool;
  document.querySelectorAll('.tool-btn').forEach(el => el.classList.toggle('active', el.dataset.tool === tool));
  scheduleRender();
}

// ── Save / Load ────────────────────────────────────────────────────────────────
function levelToRecord(lv) {
  return {
    id:     lv.id,
    name:   lv.name,
    height: lv.height ?? 10,
    tiles:  Array.from(lv.grid, ([k, t]) => { const [x, y] = k.split(',').map(Number); return { x, y, tile: t }; }),
    doors:  Array.from(lv.doors),
    walls:  Array.from(lv.walls),
  };
}

function recordToLevel(rec) {
  const lv = createLevel(rec.name || 'Layer');
  lv.id     = rec.id || lv.id;
  lv.height = (typeof rec.height === 'number' && rec.height > 0) ? rec.height : 10;
  for (const { x, y, tile } of (rec.tiles || [])) {
    if (tile && tile !== 'stone' && TILES[tile]) lv.grid.set(key(x, y), tile);
  }
  for (const dk of (rec.doors || [])) lv.doors.add(dk);
  for (const wk of (rec.walls || [])) lv.walls.add(wk);
  return lv;
}

function legacyToLevel(d) {
  const lv = createLevel('Level 1');
  if (d.tiles) {
    for (const { x, y, tile } of (d.tiles || [])) {
      if (tile && tile !== 'stone' && TILES[tile]) lv.grid.set(key(x, y), tile);
    }
  } else if (d.grid && d.width && d.height) {
    for (let ty = 0; ty < d.height; ty++)
      for (let tx = 0; tx < d.width; tx++) {
        const t = d.grid[ty * d.width + tx];
        if (t && t !== 'stone' && TILES[t]) lv.grid.set(key(tx, ty), t);
      }
  }
  for (const dk of (d.doors || [])) lv.doors.add(dk);
  for (const wk of (d.walls || [])) lv.walls.add(wk);
  return lv;
}

function applyLoadedLevels(loadedLevels, activeIdx) {
  levels = loadedLevels;
  currentLevelIdx = Math.min(activeIdx ?? 0, levels.length - 1);
  const lv = levels[currentLevelIdx];
  grid = lv.grid; doors = lv.doors; walls = lv.walls;
  undoStack = lv.undo; redoStack = lv.redo;
  doorHover = null; wallHover = null;
  notifyLevelsChanged();
}

function currentData() {
  commitLevel();
  return {
    name: mapName,
    levels: levels.map(levelToRecord),
    activeLevel: currentLevelIdx,
    // Legacy fields kept so play-tab renderer isn't broken
    buildings: [], entryX: 0, entryY: 0, tierTitle: 'Dungeon',
  };
}

function saveToLibrary() {
  try {
    if (!currentContentId) currentContentId = crypto.randomUUID();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    const now = new Date().toISOString();
    const idx = all.findIndex(i => i.id === currentContentId);
    const record = { id: currentContentId, type: 'battlemap', name: mapName, data: currentData(), createdAt: all[idx]?.createdAt ?? now, updatedAt: now };
    if (idx >= 0) all[idx] = record; else all.unshift(record);
    localStorage.setItem('hx_content', JSON.stringify(all));
    showToast('Saved to library');
  } catch (err) { alert('Save failed: ' + err.message); }
}

function exportMap() {
  const blob = new Blob([JSON.stringify(currentData(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (mapName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'dungeon') + '.json';
  a.click();
}

function importMap(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const d = JSON.parse(ev.target.result);
      saveUndo();
      mapName = d.name || 'Imported Dungeon';
      if (d.levels && Array.isArray(d.levels)) {
        applyLoadedLevels(d.levels.map(recordToLevel), d.activeLevel ?? 0);
      } else {
        applyLoadedLevels([legacyToLevel(d)], 0);
      }
      document.getElementById('input-name').value = mapName;
      fitView(); scheduleRender();
    } catch (err) { alert('Failed to load: ' + err.message); }
  };
  reader.readAsText(file);
}

function showToast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:40px;right:20px;background:#1e1a0c;border:1px solid #c9a84c;color:#c9a84c;font-family:Georgia,serif;font-size:0.78rem;padding:8px 16px;border-radius:4px;z-index:9999;pointer-events:none;transition:opacity 0.4s';
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 1600);
}

// ── View ───────────────────────────────────────────────────────────────────────
function fitView() {
  if (!grid.size) { view.scale = 1; view.ox = canvas.width / 2; view.oy = canvas.height / 2; return; }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const k of grid.keys()) {
    const [x, y] = k.split(',').map(Number);
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  const tw = (maxX - minX + 1) * TILE_SIZE, th = (maxY - minY + 1) * TILE_SIZE;
  view.scale = Math.min((canvas.width - 40) / tw, (canvas.height - 40) / th, 3);
  const s = tileS();
  view.ox = (canvas.width  - (maxX - minX + 1) * s) / 2 - minX * s;
  view.oy = (canvas.height - (maxY - minY + 1) * s) / 2 - minY * s;
}

// ── Palette ────────────────────────────────────────────────────────────────────
function buildPalette() {
  const container = document.getElementById('palette');
  for (const cat of TILE_CATS) {
    const h = document.createElement('div');
    h.className = 'palette-cat'; h.textContent = cat;
    container.appendChild(h);
    for (const [k, def] of Object.entries(TILES)) {
      if (def.cat !== cat) continue;
      const btn = document.createElement('button');
      btn.className = 'palette-tile'; btn.dataset.tile = k; btn.title = def.label;
      btn.onclick = () => selectTile(k);
      const sw = document.createElement('span'); sw.className = 'palette-swatch'; sw.style.background = def.color;
      if (def.sym) sw.textContent = def.sym;
      const lb = document.createElement('span'); lb.className = 'palette-label'; lb.textContent = def.label;
      btn.appendChild(sw); btn.appendChild(lb); container.appendChild(btn);
    }
  }
}

// ── Init ───────────────────────────────────────────────────────────────────────
function init() {
  canvas = document.getElementById('editor-canvas');
  ctx = canvas.getContext('2d');

  const wrap = document.getElementById('canvas-wrap');
  function resizeCanvas() { canvas.width = wrap.clientWidth; canvas.height = wrap.clientHeight; scheduleRender(); }
  new ResizeObserver(resizeCanvas).observe(wrap);

  // Load existing content
  const incomingId = window.__editorContentId || null;
  if (incomingId) {
    try {
      const all  = JSON.parse(localStorage.getItem('hx_content') || '[]');
      const item = all.find(i => i.id === incomingId);
      if (item?.data) {
        currentContentId = incomingId;
        mapName = item.name || 'Untitled Dungeon';
        document.getElementById('input-name').value = mapName;
        const d = item.data;
        if (d.levels && Array.isArray(d.levels)) {
          applyLoadedLevels(d.levels.map(recordToLevel), d.activeLevel ?? 0);
        } else {
          applyLoadedLevels([legacyToLevel(d)], 0);
        }
      }
    } catch { /* start fresh */ }
  }

  buildPalette();
  selectTile('floor');
  selectTool('rect');
  syncUndoButtons();
  notifyLevelsChanged();

  setTimeout(() => { resizeCanvas(); fitView(); scheduleRender(); }, 50);

  canvas.addEventListener('mousedown',   onMouseDown);
  canvas.addEventListener('mousemove',   onMouseMove);
  canvas.addEventListener('mouseleave',  () => { mouse.onCanvas = false; doorHover = null; wallHover = null; scheduleRender(); });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('wheel',       onWheel, { passive: false });
  window.addEventListener('mouseup',     onMouseUp);
  window.addEventListener('mousemove',   onPanMove);
  document.addEventListener('keydown',   onKeyDown);
  document.addEventListener('keyup',     onKeyUp);
  window.addEventListener('blur', () => {
    if (spaceDown) { spaceDown = false; spacePanLast = null; window.removeEventListener('mousemove', onSpacePanMove); scheduleRender(); }
  });

  document.querySelectorAll('.tool-btn').forEach(b => b.addEventListener('click', () => selectTool(b.dataset.tool)));
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);
  document.getElementById('input-name').addEventListener('input', e => { mapName = e.target.value; });
  document.getElementById('btn-save').addEventListener('click', saveToLibrary);
  document.getElementById('btn-export').addEventListener('click', exportMap);
  document.getElementById('btn-fit').addEventListener('click', () => { fitView(); scheduleRender(); });
  document.getElementById('btn-new')?.addEventListener('click', () => {
    if (!grid.size || confirm('Clear all levels and start fresh?')) {
      levels = [createLevel('Level 1')];
      currentLevelIdx = 0;
      grid = levels[0].grid; doors = levels[0].doors; walls = levels[0].walls;
      undoStack = levels[0].undo; redoStack = levels[0].redo;
      view.ox = canvas.width / 2; view.oy = canvas.height / 2; view.scale = 1;
      notifyLevelsChanged(); scheduleRender();
    }
  });

  const fileInput = document.getElementById('file-input');
  document.getElementById('btn-load').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => { if (e.target.files[0]) { importMap(e.target.files[0]); fileInput.value = ''; } });
}

// ── Exposed API (called from React) ───────────────────────────────────────────
window.editorSwitchLevel  = switchLevel;
window.editorAddLevel     = addLevel;
window.editorDeleteLevel  = deleteLevel;
window.editorRenameLevel  = renameLevel;
window.editorReorderLevel = reorderLevel;
window.editorToggleGhostAbove = toggleGhostAbove;
window.editorToggleGhostBelow = toggleGhostBelow;
window.editorToggleSection    = toggleSection;
window.editorInitSection      = initSection;
window.editorSetLayerHeight   = setLayerHeight;

window.cleanupEditor = function () {
  document.removeEventListener('keydown',   onKeyDown);
  document.removeEventListener('keyup',     onKeyUp);
  window.removeEventListener('mouseup',     onMouseUp);
  window.removeEventListener('mousemove',   onPanMove);
  window.removeEventListener('mousemove',   onSpacePanMove);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
