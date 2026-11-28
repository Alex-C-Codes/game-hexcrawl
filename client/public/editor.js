'use strict';

const TILE_SIZE = 24;

const TILES = {
  stone:       { label: 'Wall',       color: '#1e1c19', passable: false, cat: 'Terrain',   sym: null },
  air:         { label: 'Open Air',   color: '#8a9ec0', passable: true,  cat: 'Terrain',   sym: null, pattern: 'air' },
  water:       { label: 'Water',      color: '#1a3a5a', passable: false, cat: 'Terrain',   sym: null, pattern: 'water' },
  lava:        { label: 'Lava',       color: '#7a1a0a', passable: false, cat: 'Terrain',   sym: null, pattern: 'lava' },
  pit:         { label: 'Pit',        color: '#080706', passable: false, cat: 'Terrain',   sym: null, pattern: 'pit' },
  // Floors — `pattern` picks a texture in drawTilePattern(); `difficult` adds a corner flag
  floor:       { label: 'Floor',         color: '#7a6a58', passable: true, cat: 'Floors', sym: null },
  corridor:    { label: 'Corridor',      color: '#5a4a38', passable: true, cat: 'Floors', sym: null },
  flagstone:   { label: 'Flagstone',     color: '#6e665a', passable: true, cat: 'Floors', sym: null, pattern: 'flagstone' },
  cobblestone: { label: 'Cobblestone',   color: '#5e5850', passable: true, cat: 'Floors', sym: null, pattern: 'cobble' },
  wood:        { label: 'Wood Planks',   color: '#7a5634', passable: true, cat: 'Floors', sym: null, pattern: 'planks' },
  marble:      { label: 'Marble',        color: '#a8a296', passable: true, cat: 'Floors', sym: null, pattern: 'marble' },
  checker:     { label: 'Checker Tile',  color: '#6a6258', passable: true, cat: 'Floors', sym: null, pattern: 'checker' },
  carpet:      { label: 'Carpet',        color: '#6a2228', passable: true, cat: 'Floors', sym: null, pattern: 'carpet' },
  arcane:      { label: 'Arcane Floor',  color: '#1c2036', passable: true, cat: 'Floors', sym: null, pattern: 'arcane' },
  grate:       { label: 'Iron Grate',    color: '#3c3c3a', passable: true, cat: 'Floors', sym: null, pattern: 'grate' },
  dirt:        { label: 'Dirt',          color: '#5e4a32', passable: true, cat: 'Floors', sym: null, pattern: 'speckle' },
  sand:        { label: 'Sand',          color: '#a08a5c', passable: true, cat: 'Floors', sym: null, pattern: 'speckle' },
  moss:        { label: 'Moss',          color: '#3e5232', passable: true, cat: 'Floors', sym: null, pattern: 'tufts' },
  rubble:      { label: 'Rubble',        color: '#58524a', passable: true, cat: 'Floors', sym: null, pattern: 'rubble',  difficult: true },
  mud:         { label: 'Mud',           color: '#3e3022', passable: true, cat: 'Floors', sym: null, pattern: 'speckle', difficult: true },
  ice:         { label: 'Ice',           color: '#7a9cac', passable: true, cat: 'Floors', sym: null, pattern: 'cracks',  difficult: true },
  shallows:    { label: 'Shallow Water', color: '#2e5a6a', passable: true, cat: 'Floors', sym: null, pattern: 'ripples', difficult: true },
  // Nature — outdoor ground cover and vegetation
  canopy:      { label: 'Tree Canopy',   color: '#2e5a2a', passable: true,  cat: 'Nature', sym: null, pattern: 'canopy' },
  pine:        { label: 'Pine Canopy',   color: '#1e4030', passable: true,  cat: 'Nature', sym: null, pattern: 'pine' },
  trunk:       { label: 'Tree Trunk',    color: '#3e5232', passable: false, cat: 'Nature', sym: null, pattern: 'trunk' },
  bush:        { label: 'Bush',          color: '#3e5232', passable: true,  cat: 'Nature', sym: null, pattern: 'bush', difficult: true },
  boulder:     { label: 'Boulder',       color: '#5e5444', passable: false, cat: 'Nature', sym: null, pattern: 'boulder' },
  tallgrass:   { label: 'Tall Grass',    color: '#4a6a32', passable: true,  cat: 'Nature', sym: null, pattern: 'tallgrass' },
  flowers:     { label: 'Flowers',       color: '#3e5a30', passable: true,  cat: 'Nature', sym: null, pattern: 'flowers' },
  crops:       { label: 'Crops',         color: '#6a5a30', passable: true,  cat: 'Nature', sym: null, pattern: 'crops' },
  snow:        { label: 'Snow',          color: '#cfd6dc', passable: true,  cat: 'Nature', sym: null, pattern: 'snow', difficult: true },
  // Roofs — overhead cover; tip: put them on their own layer and use Ghost to show/hide
  roof_tile:   { label: 'Clay Tile Roof', color: '#9a4a2e', passable: false, cat: 'Roofs', sym: null, pattern: 'roofTile' },
  thatch:      { label: 'Thatch Roof',    color: '#a8884a', passable: false, cat: 'Roofs', sym: null, pattern: 'thatch' },
  shingle:     { label: 'Wood Shingles',  color: '#6a4a2e', passable: false, cat: 'Roofs', sym: null, pattern: 'shingle' },
  slate:       { label: 'Slate Roof',     color: '#4a5058', passable: false, cat: 'Roofs', sym: null, pattern: 'slate' },
  canvas:      { label: 'Tent Canvas',    color: '#b8a888', passable: false, cat: 'Roofs', sym: null, pattern: 'canvas' },
  door:        { label: 'Door',       color: '#8a5525', passable: true,  cat: 'legacy',    sym: 'D'  },
  bars:        { label: 'Iron Bars',  color: '#55504a', passable: false, cat: 'Structure', sym: null, pattern: 'bars' },
  pillar:      { label: 'Pillar',     color: '#6e665a', passable: false, cat: 'Structure', sym: null, pattern: 'pillar' },
  stairs_up:   { label: 'Stairs Up',  color: '#857a68', passable: true,  cat: 'Structure', sym: null, pattern: 'stairsUp' },
  stairs_down: { label: 'Stairs Down', color: '#6a5e4e', passable: true, cat: 'Structure', sym: null, pattern: 'stairsDown' },
  altar:       { label: 'Altar',      color: '#4e4650', passable: false, cat: 'Feature',   sym: null, pattern: 'altarTile' },
  chest:       { label: 'Chest',      color: '#5e5850', passable: true,  cat: 'Feature',   sym: null, pattern: 'chestTile' },
  trap:        { label: 'Trap',       color: '#5e5850', passable: true,  cat: 'Feature',   sym: null, pattern: 'trapTile' },
  entry:       { label: 'Entry',      color: '#3e5a3e', passable: true,  cat: 'Markers',   sym: null, pattern: 'marker', mark: 'entry' },
  exit_tile:   { label: 'Exit',       color: '#5a3e3e', passable: true,  cat: 'Markers',   sym: null, pattern: 'marker', mark: 'exit' },
  spawn:       { label: 'Spawn',      color: '#4e3e5a', passable: true,  cat: 'Markers',   sym: null, pattern: 'marker', mark: 'spawn' },
};

// Fortifications: wall tops seen from above. Neighbouring `fort` squares join
// into one wall; battlements (and the outline) appear only on outside edges.
Object.assign(TILES, {
  castle_wall: { label: 'Castle Wall',      color: '#6e6a62', passable: false, cat: 'Fortifications', sym: null, pattern: 'ashlar', fort: true, crenel: true },
  dark_wall:   { label: 'Fortress Wall',    color: '#4a4844', passable: false, cat: 'Fortifications', sym: null, pattern: 'ashlar', fort: true, crenel: true },
  brick_wall:  { label: 'Brick Wall',       color: '#7a4a38', passable: false, cat: 'Fortifications', sym: null, pattern: 'brick',  fort: true, crenel: true },
  field_wall:  { label: 'Fieldstone Wall',  color: '#6a6458', passable: false, cat: 'Fortifications', sym: null, pattern: 'fieldstone', fort: true },
  palisade:    { label: 'Wooden Palisade',  color: '#3e2e1e', passable: false, cat: 'Fortifications', sym: null, pattern: 'palisade', fort: true },
  wall_walk:   { label: 'Wall Walk',        color: '#7a746a', passable: true,  cat: 'Fortifications', sym: null, pattern: 'ashlar', fort: true },
  ruined_wall: { label: 'Ruined Wall',      color: '#6a665e', passable: true,  cat: 'Fortifications', sym: null, pattern: 'ruin',   fort: true, difficult: true },
});
const TILE_CATS = ['Floors', 'Nature', 'Roofs', 'Fortifications', 'Terrain', 'Structure', 'Feature', 'Markers'];
const STONE_COLOR = '#1e1c19';

// ── Level system ───────────────────────────────────────────────────────────────
function createLevel(name) {
  return { id: crypto.randomUUID(), name, height: 10, grid: new Map(), doors: new Set(), secretDoors: new Set(), walls: new Set(), markers: [], tokens: [], textboxes: [], props: [], undo: [], redo: [] };
}

// ── Content tokens — library articles / items / creatures dropped onto squares ──
// Each token: { id, x, y, type, refId, name } in tile coords. `refId` is the
// library item's id; `name` is a snapshot so the map still reads if it's deleted.
const TOKEN_TYPES = {
  article:  { label: 'Article',  color: '#c9a84c', shape: 'square'  },
  item:     { label: 'Item',     color: '#4a9ad0', shape: 'diamond' },
  creature: { label: 'Creature', color: '#c05050', shape: 'circle'  },
  // Notes live only on the map: no refId, and they carry their own `text`
  note:     { label: 'Note',     color: '#d8c47a', shape: 'note'    },
};
const TOKEN_DRAG_MIME = 'application/battlemap-token';

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
let grid        = levels[0].grid;
let doors       = levels[0].doors;
let secretDoors = levels[0].secretDoors;
let walls       = levels[0].walls;
let markers     = levels[0].markers;
const markerTool = { type: 'number', color: '#c9a84c' };
let selectedMarkerId = null;
let markerDragState  = null; // { mode:'move'|'resize', startCx, startCy, origX?, origY?, mPx?, mPy?, origSize?, origDist?, undoSaved }
let tokens           = levels[0].tokens;
let tokenDragState   = null; // { id, undoSaved } — undoSaved doubles as "has moved"
let hoverNoteId      = null;

// Text boxes: { id, x, y, w, text, size, color, bg } — x/y/w in tile units
// (fractional, free placement); height grows to fit the wrapped text.
const TEXTBOX_SIZES = { s: 0.38, m: 0.55, l: 0.8, xl: 1.15 }; // font size as a fraction of a tile
let textboxes         = levels[0].textboxes;
let selectedTextboxId = null;
let textboxDrag       = null; // { mode:'move'|'resize'|'create', startCx, startCy, origX, origY, origW, x0, y0, x1, y1, undoSaved }
let editingTextboxId  = null;
let editingIsNew      = false;
let textEditorEl      = null;
const textboxStyle    = { size: 'm', color: '#e8e0d0', bg: 'dark' }; // defaults for new boxes

// Props: objects that sit on top of floor tiles without replacing them.
// { id, kind, x, y, rot } — x/y is the top-left square of the (rotated)
// footprint, rot is quarter turns clockwise (0–3).
let props          = levels[0].props;
let selectedProp   = 'coffin';   // palette choice for new props
let propRot        = 0;          // rotation for new props
let selectedPropId = null;
let propDrag       = null;       // { mode, id, startWx, startWy, origX, origY, ... undoSaved }
// How a prop's centre snaps: 'half' = square centres, grid lines and corners;
// 'tile' = square centres only (footprint fills whole squares); 'free' = none.
let propSnap       = 'half';
let dropHoverTile    = null; // tile under an in-progress drag from the content panel
let doorHover = null;
let wallHover = null;
let wallPainting = false;
let wallErasing  = false;
const paintedInWallStroke = new Set();
const rectOptions = { mode: 'draw', cornerRadius: 0, rough: false, snapGrid: true };
let currentContentId = null;

const view = { ox: 0, oy: 0, scale: 1.0 };
let selectedTile = 'floor';
let activeTool   = 'rect';
// These are re-assigned on level switch; same pattern as grid/doors/walls
let undoStack = levels[0].undo;
let redoStack = levels[0].redo;
const paintedInStroke = new Set();
const mouse = { tx: 0, ty: 0, rawX: 0, rawY: 0, down: false, btn: -1, onCanvas: false,
                // rectActive marks a drag in progress — rectX0/Y0 can be any tile, including -1
                rectActive: false, rectX0: 0, rectY0: 0, rectRawX0: 0, rectRawY0: 0,
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
  levels[currentLevelIdx].grid        = grid;
  levels[currentLevelIdx].doors       = doors;
  levels[currentLevelIdx].secretDoors = secretDoors;
  levels[currentLevelIdx].walls       = walls;
  levels[currentLevelIdx].markers     = markers;
  levels[currentLevelIdx].tokens      = tokens;
  levels[currentLevelIdx].textboxes   = textboxes;
  levels[currentLevelIdx].props       = props;
}

// Tell React the active layer's token list changed (for the "On this layer" list).
function notifyTokensChanged() {
  window.__editorOnTokensChanged?.(tokens.map(t => ({ ...t })));
}

// Shared by every place that swaps the active level in (switch/add/delete/load/new).
function loadLevelRefs(lv) {
  commitTextEdit(); // finishes on the outgoing level's array, in place
  textboxes = lv.textboxes ?? (lv.textboxes = []);
  props     = lv.props ?? (lv.props = []);
  selectedTextboxId = null; textboxDrag = null;
  selectedPropId = null; propDrag = null;
  window.__editorOnPropSelect?.(null);
  notifyTextboxSelect();
  grid = lv.grid; doors = lv.doors; secretDoors = lv.secretDoors; walls = lv.walls;
  markers = lv.markers ?? [];
  tokens  = lv.tokens  ?? (lv.tokens = []);
  undoStack = lv.undo; redoStack = lv.redo;
  doorHover = null; wallHover = null;
  selectedMarkerId = null; markerDragState = null; tokenDragState = null;
  setNoteHover(null);
  notifyTokensChanged();
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
  loadLevelRefs(levels[idx]);
  notifyLevelsChanged();
  fitView(); scheduleRender();
}

function addLevel() {
  commitLevel();
  const lv = createLevel(`Layer ${levels.length + 1}`);
  const insertAt = currentLevelIdx + 1;
  levels.splice(insertAt, 0, lv);
  currentLevelIdx = insertAt;
  loadLevelRefs(lv);
  view.ox = canvas?.width / 2 ?? 400; view.oy = canvas?.height / 2 ?? 300;
  notifyLevelsChanged(); scheduleRender();
}

// Copy a layer (everything on it) and insert the copy just after it.
// Objects on the copy get fresh ids so the two layers never share anything.
function duplicateLevel(idx = currentLevelIdx) {
  if (idx < 0 || idx >= levels.length) return;
  commitTextEdit();
  commitLevel();
  const src = levels[idx];
  const copy = createLevel(`${src.name} copy`);
  copy.height      = src.height ?? 10;
  copy.grid        = new Map(src.grid);
  copy.doors       = new Set(src.doors);
  copy.secretDoors = new Set(src.secretDoors);
  copy.walls       = new Set(src.walls);
  const fresh = list => (list || []).map(o => ({ ...structuredClone(o), id: crypto.randomUUID() }));
  copy.markers   = fresh(src.markers);
  copy.tokens    = fresh(src.tokens);
  copy.textboxes = fresh(src.textboxes);
  copy.props     = fresh(src.props);
  levels.splice(idx + 1, 0, copy);
  currentLevelIdx = idx + 1;
  loadLevelRefs(copy);
  notifyLevelsChanged();
  scheduleRender();
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
  loadLevelRefs(levels[newIdx]);
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
function snapshot() { return { g: new Map(grid), d: new Set(doors), sd: new Set(secretDoors), w: new Set(walls), mk: markers.map(m => ({...m})), tk: tokens.map(t => ({...t})), tb: textboxes.map(t => ({...t})), pr: props.map(p => ({...p})) }; }

function saveUndo() {
  undoStack.push(snapshot());
  if (undoStack.length > 60) undoStack.shift();
  redoStack.length = 0;
  syncUndoButtons();
}

function undo() {
  commitTextEdit();
  if (!undoStack.length) return;
  redoStack.push(snapshot());
  const snap = undoStack.pop();
  grid = snap.g; doors = snap.d; secretDoors = snap.sd ?? new Set(); walls = snap.w;
  markers = snap.mk ?? [];
  tokens  = snap.tk ?? [];
  textboxes = snap.tb ?? [];
  props     = snap.pr ?? [];
  propDrag  = null;
  if (selectedPropId && !props.some(p => p.id === selectedPropId)) selectedPropId = null;
  notifyPropSelect();
  tokenDragState = null; textboxDrag = null;
  if (selectedTextboxId && !textboxes.some(t => t.id === selectedTextboxId)) selectedTextboxId = null;
  notifyTextboxSelect();
  commitLevel(); // resync level record after reference replacement
  notifyTokensChanged();
  syncUndoButtons(); scheduleRender();
}

function redo() {
  commitTextEdit();
  if (!redoStack.length) return;
  undoStack.push(snapshot());
  const snap = redoStack.pop();
  grid = snap.g; doors = snap.d; secretDoors = snap.sd ?? new Set(); walls = snap.w;
  markers = snap.mk ?? [];
  tokens  = snap.tk ?? [];
  textboxes = snap.tb ?? [];
  props     = snap.pr ?? [];
  propDrag  = null;
  if (selectedPropId && !props.some(p => p.id === selectedPropId)) selectedPropId = null;
  notifyPropSelect();
  tokenDragState = null; textboxDrag = null;
  if (selectedTextboxId && !textboxes.some(t => t.id === selectedTextboxId)) selectedTextboxId = null;
  notifyTextboxSelect();
  commitLevel();
  notifyTokensChanged();
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

function renderSecretDoorEdge(type, x, y, s, alpha) {
  ctx.globalAlpha = alpha ?? 1;
  // Drawn as a full stretch of ordinary wall (so players' eyes read "wall"),
  // with the DM's red dot on top
  const barLen   = s;
  const barThick = wallWidth(s);
  const dotR     = Math.max(2, s * 0.09);
  ctx.lineCap = 'butt';

  let midX, midY;
  if (type === 'h') {
    midY = view.oy + y * s;
    midX = view.ox + x * s + s / 2;
    ctx.strokeStyle = wallColor(); ctx.lineWidth = barThick;
    ctx.beginPath(); ctx.moveTo(midX - barLen / 2, midY); ctx.lineTo(midX + barLen / 2, midY); ctx.stroke();
  } else {
    midX = view.ox + x * s;
    midY = view.oy + y * s + s / 2;
    ctx.strokeStyle = wallColor(); ctx.lineWidth = barThick;
    ctx.beginPath(); ctx.moveTo(midX, midY - barLen / 2); ctx.lineTo(midX, midY + barLen / 2); ctx.stroke();
  }

  // Red dot — the DM's secret indicator
  ctx.fillStyle = '#b83030';
  ctx.beginPath(); ctx.arc(midX, midY, dotR, 0, Math.PI * 2); ctx.fill();
  // Subtle outer ring
  ctx.strokeStyle = 'rgba(220,120,120,0.4)';
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.arc(midX, midY, dotR + 1.5, 0, Math.PI * 2); ctx.stroke();

  ctx.globalAlpha = 1;
}

function renderSecretDoors(s) {
  for (const dk of secretDoors) {
    const [type, coords] = dk.split(':');
    const [x, y] = coords.split(',').map(Number);
    renderSecretDoorEdge(type, x, y, s, 1);
  }
  if (doorHover && activeTool === 'secret') {
    const dk = dKey(doorHover.type, doorHover.x, doorHover.y);
    const exists = secretDoors.has(dk);
    renderSecretDoorEdge(doorHover.type, doorHover.x, doorHover.y, s, exists ? 0.5 : 0.4);
  }
}

// ── Edge wall system ───────────────────────────────────────────────────────────
// One wall look for everything: edges drawn with the Wall tool AND the outline
// of every room (wherever a floor square meets empty space / Wall tiles) are
// collected into one set and stroked together, so they're identical and their
// corners join cleanly. Doors cut openings in either kind.
function wKey(type, x, y) { return type + ':' + x + ',' + y; }

const WALL_COLORS  = { ink: '#0d0b09', bone: '#c8b898' };
const WALL_WEIGHTS = { s: 0.1, m: 0.16, l: 0.24 };
const WALL_STYLE_DEFAULTS = { auto: true, hatch: true, color: 'ink', weight: 'm' };
const wallStyle = { ...WALL_STYLE_DEFAULTS }; // saved with the map

function wallColor() { return WALL_COLORS[wallStyle.color] || WALL_COLORS.ink; }
function wallWidth(s) { return Math.max(2, s * (WALL_WEIGHTS[wallStyle.weight] || WALL_WEIGHTS.m)); }

function setWallStyle(opts, { notify = true } = {}) {
  if (typeof opts?.auto  === 'boolean') wallStyle.auto  = opts.auto;
  if (typeof opts?.hatch === 'boolean') wallStyle.hatch = opts.hatch;
  if (WALL_COLORS[opts?.color])   wallStyle.color  = opts.color;
  if (WALL_WEIGHTS[opts?.weight]) wallStyle.weight = opts.weight;
  if (notify) window.__editorOnWallStyle?.({ ...wallStyle });
  scheduleRender();
}

// Every wall edge to draw on the active layer
function collectWallEdges() {
  const edges = new Set(walls);
  if (wallStyle.auto) {
    for (const k of grid.keys()) {
      const [x, y] = k.split(',').map(Number);
      if (!grid.has(key(x, y - 1))) edges.add(`h:${x},${y}`);
      if (!grid.has(key(x, y + 1))) edges.add(`h:${x},${y + 1}`);
      if (!grid.has(key(x - 1, y))) edges.add(`v:${x},${y}`);
      if (!grid.has(key(x + 1, y))) edges.add(`v:${x + 1},${y}`);
    }
  }
  for (const d of doors) edges.delete(d);
  for (const d of secretDoors) edges.delete(d);
  return edges;
}

// Sketchy cross-hatching in a one-square band around the outside of rooms
// (the Dungeon Scrawl look). Each square gets a small cluster of parallel
// strokes at its own angle.
function renderHatching(s) {
  if (!wallStyle.auto || !wallStyle.hatch || s < 6 || !grid.size) return;
  const band = new Set();
  for (const k of grid.keys()) {
    const [x, y] = k.split(',').map(Number);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nk = key(x + dx, y + dy);
      if (!grid.has(nk)) band.add(nk);
    }
  }
  ctx.strokeStyle = wallStyle.color === 'bone' ? 'rgba(200,184,152,0.28)' : 'rgba(190,175,140,0.2)';
  ctx.lineWidth = Math.max(0.6, s * 0.035);
  ctx.lineCap = 'round';
  for (const k of band) {
    const [x, y] = k.split(',').map(Number);
    const { x: sx, y: sy } = toScreen(x, y);
    if (sx + s < 0 || sx > canvas.width || sy + s < 0 || sy > canvas.height) continue;
    ctx.save();
    ctx.beginPath(); ctx.rect(sx, sy, s, s); ctx.clip();
    const a = tileNoise(x, y, 913) * Math.PI;
    const dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx;
    const cx = sx + s / 2, cy = sy + s / 2, gap = s / 4.5, len = s * 0.75;
    ctx.beginPath();
    for (let i = -2; i <= 2; i++) {
      const ox = cx + nx * gap * i, oy = cy + ny * gap * i;
      ctx.moveTo(ox - dx * len, oy - dy * len); ctx.lineTo(ox + dx * len, oy + dy * len);
    }
    ctx.stroke();
    ctx.restore();
  }
  ctx.lineCap = 'butt';
}

function renderWallEdge(type, x, y, color, s) {
  ctx.strokeStyle = color; ctx.lineWidth = wallWidth(s); ctx.lineCap = 'square';
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
  // One path, one stroke: square caps fill the corners where segments meet
  ctx.strokeStyle = wallColor(); ctx.lineWidth = wallWidth(s); ctx.lineCap = 'square';
  ctx.beginPath();
  for (const wk of collectWallEdges()) {
    const [type, coords] = wk.split(':');
    const [x, y] = coords.split(',').map(Number);
    const px = view.ox + x * s, py = view.oy + y * s;
    if (px < -s * 2 || px > canvas.width + s * 2 || py < -s * 2 || py > canvas.height + s * 2) continue;
    if (type === 'h') { ctx.moveTo(px, py); ctx.lineTo(px + s, py); }
    else              { ctx.moveTo(px, py); ctx.lineTo(px, py + s); }
  }
  ctx.stroke();
  ctx.lineCap = 'butt';
  if (wallHover && activeTool === 'wall') {
    const wk = wKey(wallHover.type, wallHover.x, wallHover.y);
    const exists = walls.has(wk);
    renderWallEdge(wallHover.type, wallHover.x, wallHover.y,
      exists ? 'rgba(220,80,60,0.75)' : 'rgba(200,184,152,0.45)', s);
  }
}

// ── Shape helpers ──────────────────────────────────────────────────────────────
// Returns true if tile (tx,ty) is inside a rounded rect with integer corner radius R.
// Formula: tiles within R of a corner are tested against a circle of radius (R-0.5).
function tileInRoundedRect(tx, ty, x1, y1, x2, y2, R) {
  if (R <= 0) return true;
  const edx = Math.min(tx - x1, x2 - tx);
  const edy = Math.min(ty - y1, y2 - ty);
  if (edx >= R || edy >= R) return true; // not in a corner zone
  const d = R - 0.5;
  return (d - edx) * (d - edx) + (d - edy) * (d - edy) <= d * d;
}

// Deterministic per-tile noise in [0,1] based on position + seed.
function tileNoise(tx, ty, seed) {
  let h = (seed ^ Math.imul(tx, 2654435761) ^ Math.imul(ty, 40503)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Continuous SDF rounded-rect inclusion for snap-off mode.
// Tests tile center (tx+0.5, ty+0.5) against a fractional rect with corner radius R (in tile units).
function tileInFractionalRoundedRect(tx, ty, frx1, fry1, frx2, fry2, R) {
  const W = frx2 - frx1, H = fry2 - fry1;
  const cx = (tx + 0.5) - frx1, cy = (ty + 0.5) - fry1;
  if (cx < 0 || cx > W || cy < 0 || cy > H) return false;
  if (R <= 0) return true;
  const safeR = Math.min(R, W / 2, H / 2);
  if (safeR <= 0) return true;
  const dx = Math.max(0, Math.max(safeR - cx, cx - (W - safeR)));
  const dy = Math.max(0, Math.max(safeR - cy, cy - (H - safeR)));
  return dx * dx + dy * dy <= safeR * safeR;
}

// The squares the Rect tool would fill for the current drag. Used by both the
// live preview and the final apply so they can never disagree.
// Pass withTiles=false to get just the bounds (huge previews skip the tile list).
function rectSelection(withTiles = true) {
  let frx1, fry1, frx2, fry2, rx1, ry1, rx2, ry2;
  if (rectOptions.snapGrid) {
    rx1 = Math.min(mouse.rectX0, mouse.tx); ry1 = Math.min(mouse.rectY0, mouse.ty);
    rx2 = Math.max(mouse.rectX0, mouse.tx); ry2 = Math.max(mouse.rectY0, mouse.ty);
    frx1 = rx1; fry1 = ry1; frx2 = rx2 + 1; fry2 = ry2 + 1;
  } else {
    frx1 = Math.min(mouse.rectRawX0, mouse.rawX); fry1 = Math.min(mouse.rectRawY0, mouse.rawY);
    frx2 = Math.max(mouse.rectRawX0, mouse.rawX); fry2 = Math.max(mouse.rectRawY0, mouse.rawY);
    rx1 = Math.floor(frx1); ry1 = Math.floor(fry1);
    rx2 = Math.max(rx1, Math.ceil(frx2) - 1); ry2 = Math.max(ry1, Math.ceil(fry2) - 1);
  }
  const wTiles = rx2 - rx1 + 1, hTiles = ry2 - ry1 + 1;
  const R = Math.min(rectOptions.cornerRadius, Math.floor(Math.min(wTiles, hTiles) / 2));
  const out = { frx1, fry1, frx2, fry2, rx1, ry1, rx2, ry2, R, tiles: null, fallback: false };
  if (!withTiles) return out;

  // Rough only erodes edges when there's an interior to keep (3×3 or bigger) —
  // otherwise a 1×1 or thin rect would randomly lose squares entirely.
  const rough = rectOptions.rough && wTiles >= 3 && hTiles >= 3;
  const seed = (rx1 * 23 ^ ry1 * 47 ^ rx2 * 89 ^ ry2 * 113) | 0;
  const tiles = [];
  for (let y = ry1; y <= ry2; y++) {
    for (let x = rx1; x <= rx2; x++) {
      const ok = rectOptions.snapGrid
        ? tileInRoundedRect(x, y, rx1, ry1, rx2, ry2, R)
        : tileInFractionalRoundedRect(x, y, frx1, fry1, frx2, fry2, R);
      if (!ok) continue;
      if (rough) {
        let isEdge;
        if (rectOptions.snapGrid) {
          isEdge = Math.min(x - rx1, rx2 - x) === 0 || Math.min(y - ry1, ry2 - y) === 0;
        } else {
          isEdge = Math.min((x + 0.5) - frx1, frx2 - (x + 0.5), (y + 0.5) - fry1, fry2 - (y + 0.5)) < 1;
        }
        if (isEdge && tileNoise(x, y, seed) < 0.28) continue;
      }
      tiles.push([x, y]);
    }
  }
  // Snap off: a click or a drag that doesn't cross any square's centre would
  // otherwise fill nothing — fall back to the squares it touches.
  if (!tiles.length && !rectOptions.snapGrid) {
    out.fallback = true;
    for (let y = ry1; y <= ry2; y++) for (let x = rx1; x <= rx2; x++) tiles.push([x, y]);
  }
  out.tiles = tiles;
  return out;
}

// ── Markers ────────────────────────────────────────────────────────────────────
function markerAtPoint(cx, cy) {
  const s = tileS();
  const BASE = Math.max(12, s * 0.45);
  for (let i = markers.length - 1; i >= 0; i--) {
    const m = markers[i];
    const px = view.ox + m.x * s;
    const py = view.oy + m.y * s;
    const r  = BASE * m.size;
    if (m.type === 'text') {
      const fontSize = Math.max(9, r * 1.4);
      const approxW  = m.value.length * fontSize * 0.55;
      const approxH  = fontSize * 1.1;
      if (cx >= px - approxW / 2 - 4 && cx <= px + approxW / 2 + 4 &&
          cy >= py - approxH / 2 - 3 && cy <= py + approxH / 2 + 3) return m;
    } else {
      if ((cx - px) * (cx - px) + (cy - py) * (cy - py) <= (r + 3) * (r + 3)) return m;
    }
  }
  return null;
}

function resizeHandleAtPoint(cx, cy) {
  if (!selectedMarkerId) return false;
  const m = markers.find(mk => mk.id === selectedMarkerId);
  if (!m || m.type === 'text') return false;
  const s  = tileS();
  const r  = Math.max(12, s * 0.45) * m.size;
  const hx = view.ox + m.x * s + r * 0.75;
  const hy = view.oy + m.y * s + r * 0.75;
  return (cx - hx) * (cx - hx) + (cy - hy) * (cy - hy) <= 64;
}

function renderMarkers(s) {
  const BASE = Math.max(12, s * 0.45);
  for (const m of markers) {
    const px = view.ox + m.x * s;
    const py = view.oy + m.y * s;
    if (px < -80 || px > canvas.width + 80 || py < -80 || py > canvas.height + 80) continue;
    const r          = BASE * m.size;
    const isSelected = activeTool === 'marker' && m.id === selectedMarkerId;
    const col        = m.color || '#c9a84c';

    if (m.type === 'text') {
      const fontSize = Math.max(9, r * 1.4);
      ctx.font = `bold ${Math.round(fontSize)}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 4;
      ctx.fillStyle = col;
      ctx.fillText(m.value, px, py);
      ctx.shadowBlur = 0;
      if (isSelected) {
        const tw = ctx.measureText(m.value).width;
        const th = fontSize;
        ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1;
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(px - tw / 2 - 4, py - th / 2 - 3, tw + 8, th + 6);
        ctx.setLineDash([]);
      }
    } else {
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = '#100e0b'; ctx.fill();
      ctx.strokeStyle = isSelected ? '#ffd700' : col;
      ctx.lineWidth = Math.max(1.5, r * 0.13); ctx.stroke();

      const label    = m.value;
      const fontSize = label.length > 2 ? Math.max(6, r * 0.82) : Math.max(8, r * 1.08);
      ctx.font = `bold ${Math.round(fontSize)}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = isSelected ? '#ffd700' : col;
      ctx.fillText(label, px, py);

      if (isSelected) {
        const hx = px + r * 0.75, hy = py + r * 0.75;
        ctx.beginPath(); ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd700'; ctx.fill();
        ctx.strokeStyle = '#0a0908'; ctx.lineWidth = 0.8; ctx.stroke();
      }
    }
  }
}

// ── Tokens ─────────────────────────────────────────────────────────────────────
function tokensByTile() {
  const m = new Map();
  for (const t of tokens) {
    const k = key(t.x, t.y);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(t);
  }
  return m;
}

// Screen-space slots for the tokens on one tile, in draw order. One token sits
// centred; 2+ share a 2×2 grid, and past 4 the last slot becomes a "+N" chip.
// Shared by rendering and hit-testing so the clickable area always matches.
function tokenSlots(tx, ty, list, s) {
  const { x: sx, y: sy } = toScreen(tx, ty);
  if (list.length === 1) {
    return [{ x: sx + s / 2, y: sy + s / 2, r: Math.max(5, s * 0.32), token: list[0] }];
  }
  const r = Math.max(4, s * 0.19);
  const cells = [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]];
  const out = [];
  for (let i = 0; i < Math.min(list.length, 4); i++) {
    const overflow = i === 3 && list.length > 4 ? list.length - 3 : 0;
    out.push({ x: sx + cells[i][0] * s, y: sy + cells[i][1] * s, r, token: list[i], overflow });
  }
  return out;
}

function tokenAtPoint(cx, cy) {
  const s = tileS();
  const { x: tx, y: ty } = toTile(cx, cy);
  const list = tokens.filter(t => t.x === tx && t.y === ty);
  if (!list.length) return null;
  const slots = tokenSlots(tx, ty, list, s);
  for (let i = slots.length - 1; i >= 0; i--) {
    const { x, y, r, token } = slots[i];
    if ((cx - x) ** 2 + (cy - y) ** 2 <= (r + 2) ** 2) return token;
  }
  return null;
}

function traceTokenShape(shape, x, y, r) {
  ctx.beginPath();
  if (shape === 'diamond') {
    ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath();
  } else if (shape === 'note') {
    // Page with a folded top-right corner
    const h = r * 0.9, f = r * 0.45;
    ctx.moveTo(x - h, y - h); ctx.lineTo(x + h - f, y - h); ctx.lineTo(x + h, y - h + f);
    ctx.lineTo(x + h, y + h); ctx.lineTo(x - h, y + h); ctx.closePath();
  } else if (shape === 'square') {
    const h = r * 0.86;
    ctx.rect(x - h, y - h, h * 2, h * 2);
  } else {
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
}

function renderTokens(s) {
  for (const [k, list] of tokensByTile()) {
    const [tx, ty] = k.split(',').map(Number);
    const { x: sx, y: sy } = toScreen(tx, ty);
    if (sx + s < 0 || sx > canvas.width || sy + s < 0 || sy > canvas.height) continue;
    for (const { x, y, r, token, overflow } of tokenSlots(tx, ty, list, s)) {
      const def = TOKEN_TYPES[token.type] || TOKEN_TYPES.article;
      const dragging = tokenDragState?.id === token.id;
      traceTokenShape(overflow ? 'circle' : def.shape, x, y, r);
      ctx.fillStyle = 'rgba(14,12,9,0.94)'; ctx.fill();
      ctx.strokeStyle = dragging ? '#ffd700' : (overflow ? '#8a8070' : def.color);
      ctx.lineWidth = Math.max(1.2, r * 0.2); ctx.stroke();
      ctx.fillStyle = dragging ? '#ffd700' : (overflow ? '#c8b898' : def.color);
      if (token.type === 'note' && !overflow) {
        // Text lines instead of a letter
        const w = r * 0.9;
        for (let i = 0; i < 3; i++) {
          const ly = y - r * 0.38 + i * r * 0.38;
          ctx.fillRect(x - w * 0.6, ly - r * 0.05, (i === 2 ? w * 0.7 : w * 1.2), Math.max(1, r * 0.1));
        }
        continue;
      }
      const label = overflow ? `+${overflow}` : ((token.name || def.label).trim()[0] || '?').toUpperCase();
      ctx.font = `bold ${Math.max(6, Math.round(r * (overflow ? 0.8 : 1.05)))}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + r * 0.06);
    }
  }

  // Highlight the square a content-panel drag would land on
  if (dropHoverTile) {
    const { x: sx, y: sy } = toScreen(dropHoverTile.x, dropHoverTile.y);
    ctx.fillStyle = 'rgba(255,215,0,0.14)';
    ctx.fillRect(sx, sy, s, s);
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
    ctx.strokeRect(sx + 1, sy + 1, s - 2, s - 2);
  }
}

function hasDuplicateToken(tok, x, y, ignoreId) {
  if (tok.type === 'note') return false; // several notes may share a square
  return tokens.some(t => t.id !== ignoreId && t.x === x && t.y === y && t.type === tok.type && t.refId === tok.refId);
}

function removeToken(id) {
  if (!tokens.some(t => t.id === id)) return;
  saveUndo();
  tokens = tokens.filter(t => t.id !== id);
  commitLevel();
  notifyTokensChanged(); scheduleRender();
}

// ── Props ──────────────────────────────────────────────────────────────────────
// Each prop draws itself centred on (0,0) in an unrotated W×H pixel box
// (w×h squares). Drawn on top of tiles, so the floor underneath is kept.
function rr(c, x, y, w, h, r) { // rounded rect path
  c.beginPath();
  c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r);
  c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r);
  c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r);
  c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r); c.closePath();
}
const INK = 'rgba(15,10,5,0.75)';

// Stalagmites (rising from the floor) and stalactites (hanging from the
// ceiling) look alike from above, so stalactites follow the usual map
// convention for overhead features: faded, with a dashed outline.
function drawSpireCluster(c, W, overhead) {
  const spires = [[-0.12, -0.08, 0.3], [0.22, 0.16, 0.18], [-0.24, 0.24, 0.13], [0.22, -0.24, 0.11]];
  if (overhead) { c.globalAlpha *= 0.6; c.shadowBlur = 0; c.shadowOffsetY = 0; }
  for (const [x, y, r] of spires) {
    const cx = x * W, cy = y * W, R = r * W;
    c.beginPath();
    for (let k = 0; k < 9; k++) {
      const a = k * Math.PI * 2 / 9, rr = R * (0.85 + 0.15 * ((k * 7 + Math.round(r * 100)) % 3) / 2);
      k ? c.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : c.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    c.closePath();
    const g = c.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R);
    g.addColorStop(0, overhead ? '#b8b2a4' : '#d8d0bc'); g.addColorStop(0.35, overhead ? '#7a7468' : '#9a907c'); g.addColorStop(1, overhead ? '#3a3630' : '#4a4236');
    c.fillStyle = g; c.fill();
    c.strokeStyle = overhead ? 'rgba(220,215,200,0.85)' : INK;
    c.lineWidth = Math.max(0.8, W * 0.025);
    if (overhead) c.setLineDash([W * 0.05, W * 0.04]);
    c.stroke();
    c.setLineDash([]);
    // Tip
    c.fillStyle = overhead ? 'rgba(230,225,210,0.7)' : '#efe8d6';
    c.beginPath(); c.arc(cx - R * 0.1, cy - R * 0.1, Math.max(0.8, R * 0.12), 0, Math.PI * 2); c.fill();
  }
}

// Deterministic 0–1 noise for prop art (same look every render)
function pn(i, seed = 0) { const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453; return x - Math.floor(x); }
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16), ch = [n >> 16, (n >> 8) & 255, n & 255];
  const m = v => Math.max(0, Math.min(255, Math.round(f >= 1 ? v + (255 - v) * (f - 1) : v * f)));
  return `rgb(${ch.map(m).join(',')})`;
}
function propShadow(c, s) { c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = Math.max(2, s * 0.15); c.shadowOffsetY = s * 0.05; }
function noShadow(c) { c.shadowBlur = 0; c.shadowOffsetY = 0; }
const LIGHT = 0.7071; // light comes from the top-left

// ── Cliffs ──
// A rock face strip between an edge curve E(t) (top of the cliff) and a base
// curve B(t) (foot of the cliff). Ends are never jittered so pieces join up.
const CLIFF_EDGE = '#9a907c', CLIFF_BASE = '#3a342c';
function cliffFace(c, E, B, n, s, fill, seed = 0) {
  noShadow(c);
  const e = [], b = [];
  for (let i = 0; i <= n; i++) {
    const [ex, ey] = E(i / n), [bx, by] = B(i / n);
    let dx = bx - ex, dy = by - ey; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
    const end = i === 0 || i === n;
    const je = end ? 0 : (pn(i, seed) - 0.5) * 0.09 * s, jb = end ? 0 : (pn(i, seed + 7) - 0.5) * 0.06 * s;
    e.push([ex + dx * je, ey + dy * je, dx, dy, len]); b.push([bx + dx * jb, by + dy * jb]);
  }
  const line = pts => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); };
  line(e); for (let i = n; i >= 0; i--) c.lineTo(b[i][0], b[i][1]); c.closePath();
  c.fillStyle = fill; c.fill();
  // Shadowed clefts hanging off the lip
  c.fillStyle = 'rgba(25,20,15,0.4)';
  for (let i = 0; i < n; i++) {
    if (pn(i, seed + 3) < 0.35) continue;
    const [x1, y1, dx, dy, len] = e[i], [x2, y2] = e[i + 1], d = len * (0.25 + pn(i, seed + 5) * 0.4);
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineTo((x1 + x2) / 2 + dx * d, (y1 + y2) / 2 + dy * d); c.closePath(); c.fill();
  }
  // Vertical striations down the face
  c.strokeStyle = 'rgba(20,15,10,0.35)'; c.lineWidth = Math.max(0.6, s * 0.018); c.beginPath();
  for (let i = 1; i < n; i++) {
    const [x, y, dx, dy, len] = e[i], a = len * (0.2 + pn(i, seed + 9) * 0.2), z = len * (0.6 + pn(i, seed + 11) * 0.35);
    c.moveTo(x + dx * a, y + dy * a); c.lineTo(x + dx * z, y + dy * z);
  }
  c.stroke();
  c.strokeStyle = 'rgba(15,10,5,0.55)'; c.lineWidth = Math.max(0.6, s * 0.02); line(b); c.stroke();
  c.strokeStyle = 'rgba(235,225,205,0.3)'; c.lineWidth = Math.max(0.6, s * 0.03);
  c.beginPath(); e.forEach(([x, y, dx, dy], i) => { const o = s * 0.04; i ? c.lineTo(x - dx * o, y - dy * o) : c.moveTo(x - dx * o, y - dy * o); }); c.stroke();
  c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.lineJoin = 'round'; line(e); c.stroke(); c.lineJoin = 'miter';
}
// Straight cliffs and corners share these offsets (fractions of a square,
// measured from the high side) so they line up when placed next to each other.
const CLIFF_A = 0.2, CLIFF_B = 0.85;
function drawCliffEnd(c, W, H, s, mirror) {
  if (mirror) c.scale(-1, 1);
  const x0 = -W / 2, ea = -H / 2 + CLIFF_A * s, eb = -H / 2 + CLIFF_B * s;
  const g = c.createLinearGradient(0, ea, 0, eb); g.addColorStop(0, CLIFF_EDGE); g.addColorStop(1, CLIFF_BASE);
  cliffFace(c, t => [x0 + W * 0.8 * t, ea], t => [x0 + W * 0.8 * t, ea + (eb - ea) * (1 - Math.pow(t, 1.6))], 5, s, g, 21);
}

// ── Stairs ── (top of the prop is the upper landing; steps darken going down)
function drawStairs(c, W, H, s, o) {
  const rail = o.rails ? s * 0.09 : 0;
  propShadow(c, s); c.fillStyle = shade(o.base, 0.5); c.fillRect(-W / 2, -H / 2, W, H); noShadow(c);
  const n = Math.max(2, Math.round(H / s * 4)), sh = H / n, x0 = -W / 2 + rail, iw = W - 2 * rail;
  for (let i = 0; i < n; i++) {
    const y = -H / 2 + i * sh;
    c.fillStyle = shade(o.base, 1.3 - 0.75 * i / (n - 1)); c.fillRect(x0, y, iw, sh + 0.5);
    if (!i) continue;
    const seg = o.rough ? 4 : 1, jit = k => (o.rough && k && k < seg) ? (pn(i * 5 + k, 4) - 0.5) * sh * 0.5 : 0;
    c.strokeStyle = 'rgba(15,10,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025); c.beginPath();
    for (let k = 0; k <= seg; k++) { const x = x0 + iw * k / seg; k ? c.lineTo(x, y + jit(k)) : c.moveTo(x, y + jit(k)); }
    c.stroke();
    c.strokeStyle = 'rgba(255,250,230,0.18)'; c.beginPath(); c.moveTo(x0, y + s * 0.03); c.lineTo(x0 + iw, y + s * 0.03); c.stroke();
  }
  if (o.rails) {
    c.fillStyle = o.rails; c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.025);
    for (const x of [-W / 2, W / 2 - rail]) { c.fillRect(x, -H / 2, rail, H); c.strokeRect(x, -H / 2, rail, H); }
  }
  // Arrow pointing down the stairs
  c.strokeStyle = 'rgba(15,10,5,0.4)'; c.lineWidth = Math.max(0.8, s * 0.03); c.lineCap = 'round';
  const ay = H / 2 - s * 0.28, aw = Math.min(iw * 0.25, s * 0.14);
  c.beginPath(); c.moveTo(0, -H / 2 + s * 0.25); c.lineTo(0, ay); c.moveTo(-aw, ay - aw); c.lineTo(0, ay); c.lineTo(aw, ay - aw); c.stroke();
  c.lineCap = 'butt';
  c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.04); c.strokeRect(-W / 2, -H / 2, W, H);
}

// ── Roofs ── Gable (ridge along the long side) or hip (sloped on all four sides).
// Each plane: polygon, an eave point p, and n pointing from the eave up to the ridge.
function roofPlanes(W, H, hip) {
  if (W < H) {
    const sw = ([x, y]) => [y, x], r = roofPlanes(H, W, hip);
    return { planes: r.planes.map(p => ({ ...p, poly: p.poly.map(sw), p: sw(p.p), n: sw(p.n) })), ridge: r.ridge.map(sw) };
  }
  const hw = W / 2, hh = H / 2, ins = hip ? hh : 0, R1 = [-hw + ins, 0], R2 = [hw - ins, 0];
  const planes = [
    { poly: [[-hw, -hh], [hw, -hh], R2, R1], p: [0, -hh], n: [0, 1], depth: hh, span: hw },
    { poly: [[-hw, hh], [hw, hh], R2, R1], p: [0, hh], n: [0, -1], depth: hh, span: hw },
  ];
  if (hip) planes.push(
    { poly: [[-hw, -hh], R1, [-hw, hh]], p: [-hw, 0], n: [1, 0], depth: hh, span: hh },
    { poly: [[hw, -hh], R2, [hw, hh]], p: [hw, 0], n: [-1, 0], depth: hh, span: hh });
  return { planes, ridge: [R1, R2] };
}
const ROOF_PATTERNS = { // row spacing, tick spacing, staggered?
  shingle: [0.14, 0.17, true], slate: [0.12, 0.22, true], tile: [0.1, 0.08, false], thatch: [0.09, 0, false], canvas: [0, 0, false],
};
function drawRoofPlane(c, pl, color, pattern, s) {
  const f = 1 + 0.2 * (pl.n[0] + pl.n[1]) * LIGHT; // planes facing the light are brighter
  c.beginPath(); pl.poly.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath();
  c.fillStyle = shade(color, f); c.fill();
  c.save(); c.clip();
  const [spF, twF, stagger] = ROOF_PATTERNS[pattern] || ROOF_PATTERNS.shingle, sp = spF * s, tw = twF * s;
  const [px, py] = pl.p, [nx, ny] = pl.n, tx = -ny, ty = nx, ext = pl.span + s;
  if (sp) {
    c.lineWidth = Math.max(0.5, s * 0.018);
    for (let k = 0, d = 0; d < pl.depth; k++, d += sp) {
      const qx = px + nx * d, qy = py + ny * d;
      c.strokeStyle = pattern === 'thatch' ? 'rgba(60,40,10,0.5)' : 'rgba(0,0,0,0.4)';
      c.beginPath(); c.moveTo(qx - tx * ext, qy - ty * ext); c.lineTo(qx + tx * ext, qy + ty * ext); c.stroke();
      c.beginPath();
      if (pattern === 'thatch') {
        c.strokeStyle = 'rgba(255,235,170,0.25)';
        for (let j = -ext; j < ext; j += s * 0.05) {
          const L = sp * (0.6 + pn(k * 97 + Math.round(j), 2) * 0.6);
          c.moveTo(qx + tx * j, qy + ty * j); c.lineTo(qx + tx * j + nx * L, qy + ty * j + ny * L);
        }
      } else {
        c.strokeStyle = 'rgba(0,0,0,0.3)';
        for (let j = -ext + (stagger && k % 2 ? tw / 2 : 0); j < ext; j += tw) {
          c.moveTo(qx + tx * j, qy + ty * j); c.lineTo(qx + tx * j + nx * sp, qy + ty * j + ny * sp);
        }
      }
      c.stroke();
    }
  }
  c.restore();
  c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = Math.max(0.5, s * 0.02); c.stroke();
}
// o: { color, pattern, hip, chimneys: [[fx, fy], ...] as fractions of W/H }
function drawHouse(c, W, H, s, o, cast = true) {
  if (cast) propShadow(c, s);
  c.fillStyle = shade(o.color, 0.6); c.fillRect(-W / 2, -H / 2, W, H); noShadow(c);
  const { planes, ridge } = roofPlanes(W, H, o.hip);
  for (const pl of planes) drawRoofPlane(c, pl, o.color, o.pattern, s);
  c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = Math.max(0.8, s * 0.04);
  c.beginPath(); c.moveTo(...ridge[0]); c.lineTo(...ridge[1]); c.stroke();
  c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.045); c.strokeRect(-W / 2, -H / 2, W, H);
  for (const [fx, fy] of o.chimneys || []) {
    const cw = s * 0.26, x = fx * W - cw / 2, y = fy * H - cw / 2;
    propShadow(c, s * 0.6); c.fillStyle = '#6a5a4e'; c.fillRect(x, y, cw, cw); noShadow(c);
    c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03); c.strokeRect(x, y, cw, cw);
    c.fillStyle = '#1a1612'; c.fillRect(x + cw * 0.28, y + cw * 0.28, cw * 0.44, cw * 0.44);
  }
}
// Conical roof (towers, round huts)
function drawCone(c, W, s, color, pattern) {
  const R = W * 0.46, N = 16;
  propShadow(c, s); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fillStyle = shade(color, 0.6); c.fill(); noShadow(c);
  for (let k = 0; k < N; k++) {
    const a0 = k * Math.PI * 2 / N, a1 = a0 + Math.PI * 2 / N, m = (a0 + a1) / 2;
    c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, a0, a1); c.closePath();
    c.fillStyle = shade(color, 1 - 0.24 * (Math.cos(m) + Math.sin(m)) * LIGHT); c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.15)'; c.lineWidth = Math.max(0.5, s * 0.015); c.stroke();
  }
  const step = W * (pattern === 'thatch' ? 0.05 : 0.07);
  c.strokeStyle = pattern === 'thatch' ? 'rgba(60,40,10,0.35)' : 'rgba(0,0,0,0.25)'; c.lineWidth = Math.max(0.5, s * 0.018);
  for (let r = step; r < R; r += step) { c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.stroke(); }
  c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.045); c.stroke();
  c.beginPath(); c.arc(0, 0, W * 0.05, 0, Math.PI * 2); c.fillStyle = '#4a3a2a'; c.fill();
}

// ── Fortification helpers ──
// Coursed stone paving clipped to a rect (tower tops, gate passages)
function stoneFloor(c, x, y, w, h, s, color) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.fillStyle = color; c.fillRect(x, y, w, h);
  const rh = s * 0.25, bw = s * 0.36;
  c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = Math.max(0.5, s * 0.02);
  for (let r = 0; r * rh < h; r++) {
    const yy = y + r * rh, off = (r % 2) * bw / 2;
    for (let i = -1; i * bw < w + bw; i++) {
      const xx = x + i * bw + off, v = pn(r * 31 + i, 77) - 0.5;
      c.fillStyle = v > 0 ? `rgba(255,245,225,${v * 0.16})` : `rgba(0,0,0,${-v * 0.22})`;
      c.fillRect(xx, yy, bw, rh); c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx, yy + rh); c.stroke();
    }
    c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke();
  }
  c.restore();
}
// Battlements around a rectangle: odd merlon counts so every corner gets one
function crenelRect(c, x, y, w, h, s) {
  const band = s * 0.2, seg = s * 0.22, sh = s * 0.07;
  c.fillStyle = 'rgba(0,0,0,0.28)';
  c.fillRect(x + band, y + band, w - 2 * band, sh); c.fillRect(x + band, y + h - band - sh, w - 2 * band, sh);
  c.fillRect(x + band, y + band, sh, h - 2 * band); c.fillRect(x + w - band - sh, y + band, sh, h - 2 * band);
  c.fillStyle = 'rgba(0,0,0,0.25)';
  c.fillRect(x, y, w, band); c.fillRect(x, y + h - band, w, band); c.fillRect(x, y + band, band, h - 2 * band); c.fillRect(x + w - band, y + band, band, h - 2 * band);
  c.strokeStyle = 'rgba(10,8,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025);
  const side = (x0, y0, len, horiz) => {
    let n = Math.max(3, Math.round(len / seg)); if (n % 2 === 0) n++;
    const L = len / n;
    for (let k = 0; k < n; k += 2) {
      const r = horiz ? [x0 + k * L, y0, L, band] : [x0, y0 + k * L, band, L];
      c.fillStyle = 'rgba(255,250,235,0.3)'; c.fillRect(...r); c.strokeRect(...r);
    }
  };
  side(x, y, w, true); side(x, y + h - band, w, true); side(x, y, h, false); side(x + w - band, y, h, false);
  c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.06); c.strokeRect(x, y, w, h);
}
// Battlements around a circle of radius R centred on (0,0)
function crenelRing(c, R, s) {
  const band = s * 0.2, sh = s * 0.07;
  let n = Math.max(8, Math.round(2 * Math.PI * R / (s * 0.22))); if (n % 2) n++;
  const ring = (r0, r1, a0 = 0, a1 = Math.PI * 2) => { c.beginPath(); c.arc(0, 0, r1, a0, a1); c.arc(0, 0, r0, a1, a0, true); c.closePath(); };
  c.fillStyle = 'rgba(0,0,0,0.28)'; ring(R - band - sh, R - band); c.fill();
  c.fillStyle = 'rgba(0,0,0,0.25)'; ring(R - band, R); c.fill();
  c.strokeStyle = 'rgba(10,8,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025);
  for (let k = 0; k < n; k += 2) {
    ring(R - band, R, k * Math.PI * 2 / n, (k + 1) * Math.PI * 2 / n);
    c.fillStyle = 'rgba(255,250,235,0.3)'; c.fill(); c.stroke();
  }
  c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.06); c.stroke();
}
const FORT_STONE = '#6e6a62';
function squareTower(c, x, y, w, h, s, color = FORT_STONE) {
  propShadow(c, s); c.fillStyle = color; c.fillRect(x, y, w, h); noShadow(c);
  stoneFloor(c, x, y, w, h, s, color);
  crenelRect(c, x, y, w, h, s);
}
// Stone jambs at both ends of a gate opening; returns the inner span
function gateJambs(c, W, H, s) {
  const j = Math.min(s * 0.3, W * 0.2), jh = Math.min(H, s) * 0.9;
  propShadow(c, s); c.fillStyle = FORT_STONE;
  for (const x of [-W / 2, W / 2 - j]) c.fillRect(x, -jh / 2, j, jh);
  noShadow(c); c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.045);
  for (const x of [-W / 2, W / 2 - j]) { stoneFloor(c, x, -jh / 2, j, jh, s * 0.6, FORT_STONE); c.strokeRect(x, -jh / 2, j, jh); }
  return [-W / 2 + j, W / 2 - j];
}
function fourStar(c, x, y, r) {
  c.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? r * 0.35 : r; i ? c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : c.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  c.closePath(); c.fill();
}

// ── Shop signs ── A round hanging sign with a pictogram, drawn on a roof
function emblem(c, x, y, r, kind, s) {
  c.save(); c.translate(x, y);
  propShadow(c, s * 0.5); c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fillStyle = '#e8dcc0'; c.fill(); noShadow(c);
  c.strokeStyle = '#8a6a2a'; c.lineWidth = r * 0.14; c.stroke();
  c.beginPath(); c.arc(0, 0, r * 1.07, 0, Math.PI * 2); c.strokeStyle = INK; c.lineWidth = Math.max(0.6, r * 0.06); c.stroke();
  const k = r * 0.6, ink = '#2a2218';
  c.fillStyle = ink; c.strokeStyle = ink; c.lineWidth = Math.max(0.6, r * 0.1); c.lineCap = 'round'; c.lineJoin = 'round';
  switch (kind) {
    case 'sack':
      c.beginPath(); c.ellipse(0, k * 0.25, k * 0.68, k * 0.68, 0, 0, Math.PI * 2); c.fillStyle = '#9a7a44'; c.fill(); c.stroke();
      c.beginPath(); c.moveTo(-k * 0.3, -k * 0.4); c.lineTo(-k * 0.45, -k * 0.85); c.lineTo(k * 0.45, -k * 0.85); c.lineTo(k * 0.3, -k * 0.4); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(-k * 0.35, -k * 0.38); c.lineTo(k * 0.35, -k * 0.38); c.strokeStyle = '#c9a84c'; c.stroke();
      break;
    case 'flask':
      c.fillStyle = '#a0c8c0'; c.fillRect(-k * 0.2, -k * 0.85, k * 0.4, k * 0.6); c.strokeRect(-k * 0.2, -k * 0.85, k * 0.4, k * 0.6);
      c.beginPath(); c.arc(0, k * 0.3, k * 0.62, 0, Math.PI * 2); c.fillStyle = '#4ac06a'; c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,255,255,0.7)'; c.beginPath(); c.arc(-k * 0.2, k * 0.1, k * 0.12, 0, Math.PI * 2); c.fill();
      break;
    case 'anvil':
      c.beginPath(); c.moveTo(-k, -k * 0.35); c.lineTo(k * 0.8, -k * 0.35); c.lineTo(k * 0.5, k * 0.05); c.lineTo(k * 0.3, k * 0.05);
      c.lineTo(k * 0.45, k * 0.6); c.lineTo(-k * 0.45, k * 0.6); c.lineTo(-k * 0.3, k * 0.05); c.quadraticCurveTo(-k * 0.8, k * 0.05, -k, -k * 0.35); c.closePath(); c.fill();
      break;
    case 'book':
      c.fillStyle = '#f4ecd8';
      for (const d of [-1, 1]) { c.beginPath(); c.moveTo(0, -k * 0.5); c.lineTo(d * k * 0.9, -k * 0.7); c.lineTo(d * k * 0.9, k * 0.6); c.lineTo(0, k * 0.8); c.closePath(); c.fill(); c.stroke(); }
      c.lineWidth = Math.max(0.5, r * 0.05); c.beginPath();
      for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { const yy = -k * 0.3 + i * k * 0.3; c.moveTo(d * k * 0.18, yy); c.lineTo(d * k * 0.7, yy - k * 0.1); }
      c.stroke();
      break;
    case 'coins':
      for (const [cx, cy] of [[-k * 0.35, k * 0.3], [k * 0.35, k * 0.3], [0, -k * 0.3]]) {
        c.beginPath(); c.arc(cx, cy, k * 0.45, 0, Math.PI * 2); c.fillStyle = '#d8b040'; c.fill(); c.stroke();
        c.beginPath(); c.arc(cx, cy, k * 0.25, 0, Math.PI * 2); c.lineWidth = Math.max(0.5, r * 0.05); c.stroke(); c.lineWidth = Math.max(0.6, r * 0.1);
      }
      break;
    case 'star': c.fillStyle = '#6a3ac8'; fourStar(c, 0, 0, k); c.fillStyle = '#d8b040'; fourStar(c, k * 0.55, -k * 0.55, k * 0.3); break;
    case 'horseshoe':
      c.strokeStyle = '#5a5a60'; c.lineWidth = r * 0.26; c.lineCap = 'butt';
      c.beginPath(); c.arc(0, -k * 0.05, k * 0.62, Math.PI * 0.85, Math.PI * 2.15); c.stroke();
      break;
    case 'crate':
      c.fillStyle = '#9a7444'; c.fillRect(-k * 0.7, -k * 0.7, k * 1.4, k * 1.4); c.strokeRect(-k * 0.7, -k * 0.7, k * 1.4, k * 1.4);
      c.beginPath(); c.moveTo(-k * 0.7, -k * 0.7); c.lineTo(k * 0.7, k * 0.7); c.moveTo(k * 0.7, -k * 0.7); c.lineTo(-k * 0.7, k * 0.7); c.stroke();
      break;
    case 'shield':
      c.beginPath(); c.moveTo(-k * 0.75, -k * 0.75); c.lineTo(k * 0.75, -k * 0.75); c.lineTo(k * 0.75, 0); c.quadraticCurveTo(k * 0.6, k * 0.65, 0, k * 0.95);
      c.quadraticCurveTo(-k * 0.6, k * 0.65, -k * 0.75, 0); c.closePath(); c.fillStyle = '#a83232'; c.fill(); c.stroke();
      c.strokeStyle = '#d8b040'; c.beginPath(); c.moveTo(0, -k * 0.55); c.lineTo(0, k * 0.6); c.moveTo(-k * 0.5, -k * 0.1); c.lineTo(k * 0.5, -k * 0.1); c.stroke();
      break;
    case 'clock':
      c.lineWidth = Math.max(0.5, r * 0.06); c.beginPath();
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.moveTo(Math.cos(a) * k * 1.05, Math.sin(a) * k * 1.05); c.lineTo(Math.cos(a) * k * 1.25, Math.sin(a) * k * 1.25); }
      c.stroke(); c.lineWidth = Math.max(0.6, r * 0.12);
      c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -k * 0.9); c.moveTo(0, 0); c.lineTo(k * 0.55, k * 0.2); c.stroke();
      break;
  }
  c.restore();
}
// Coloured glow above a chimney (alchemist fumes, forge heat)
function chimneyGlow(c, x, y, r, rgb) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${rgb},0.75)`); g.addColorStop(1, `rgba(${rgb},0)`);
  c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
}
function shop(o, sign) {
  return { tile: true, draw(c, W, H, s) {
    drawHouse(c, W, H, s, o);
    if (o.glow) for (const [fx, fy] of o.chimneys) chimneyGlow(c, fx * W, fy * H, s * 0.4, o.glow);
    emblem(c, 0, 0, s * 0.32, sign, s);
  } };
}

// ── Vehicles ── (all face the top edge)
function hullPath(c, W, H) {
  const hw = W / 2, top = -H / 2, bot = H / 2, bow = H * 0.28;
  c.beginPath(); c.moveTo(0, top);
  c.bezierCurveTo(hw * 0.55, top + bow * 0.15, hw, top + bow * 0.55, hw, top + bow);
  c.lineTo(hw * 0.96, bot - H * 0.08); c.quadraticCurveTo(hw * 0.9, bot, hw * 0.55, bot);
  c.lineTo(-hw * 0.55, bot); c.quadraticCurveTo(-hw * 0.9, bot, -hw * 0.96, bot - H * 0.08);
  c.lineTo(-hw, top + bow); c.bezierCurveTo(-hw, top + bow * 0.55, -hw * 0.55, top + bow * 0.15, 0, top);
  c.closePath();
}
// Planked deck inside a bulwark; leaves the deck as the clip region until restore
function drawDeck(c, W, H, s, hull, deck) {
  propShadow(c, s); hullPath(c, W, H); c.fillStyle = hull; c.fill(); noShadow(c);
  c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.stroke();
  c.save(); c.scale(0.86, 0.94); hullPath(c, W, H); c.restore();
  c.fillStyle = deck; c.fill();
  c.strokeStyle = 'rgba(30,15,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025); c.stroke();
  c.save(); c.clip();
  c.strokeStyle = 'rgba(40,20,5,0.3)'; c.lineWidth = Math.max(0.5, s * 0.015); c.beginPath();
  for (let x = -W / 2; x < W / 2; x += s * 0.16) { c.moveTo(x, -H / 2); c.lineTo(x, H / 2); }
  c.stroke();
}
function grate(c, x, y, w, h, s) {
  c.fillStyle = '#3a2814'; c.fillRect(x, y, w, h);
  c.strokeStyle = '#7a5632'; c.lineWidth = Math.max(0.5, s * 0.025); c.beginPath();
  for (let i = 1; i < 4; i++) { c.moveTo(x + w * i / 4, y); c.lineTo(x + w * i / 4, y + h); c.moveTo(x, y + h * i / 4); c.lineTo(x + w, y + h * i / 4); }
  c.stroke(); c.strokeStyle = INK; c.strokeRect(x, y, w, h);
}
function shipWheel(c, x, y, r) {
  c.strokeStyle = '#5a3e22'; c.lineWidth = Math.max(0.8, r * 0.25);
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke(); c.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * 1.35, y + Math.sin(a) * r * 1.35); }
  c.lineWidth = Math.max(0.5, r * 0.15); c.stroke();
}
function sail(c, y, span, belly, s) {
  c.beginPath(); c.moveTo(-span / 2, y); c.quadraticCurveTo(0, y - belly * 2, span / 2, y); c.closePath();
  c.fillStyle = 'rgba(238,228,205,0.82)'; c.fill(); c.strokeStyle = 'rgba(60,45,25,0.7)'; c.lineWidth = Math.max(0.6, s * 0.025); c.stroke();
  c.strokeStyle = 'rgba(60,45,25,0.25)'; c.beginPath();
  for (const f of [-0.25, 0, 0.25]) { c.moveTo(span * f, y); c.lineTo(span * f, y - belly * (1 - f * f * 3)); } c.stroke();
  c.strokeStyle = '#4a3220'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.moveTo(-span / 2, y); c.lineTo(span / 2, y); c.stroke();
}
function propeller(c, x, y, r, blades = 3) {
  c.fillStyle = '#b08a3a'; c.strokeStyle = INK; c.lineWidth = Math.max(0.5, r * 0.08);
  for (let i = 0; i < blades; i++) {
    c.save(); c.translate(x, y); c.rotate(i * Math.PI * 2 / blades + 0.3);
    c.beginPath(); c.ellipse(0, -r * 0.55, r * 0.22, r * 0.5, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore();
  }
  c.beginPath(); c.arc(x, y, r * 0.18, 0, Math.PI * 2); c.fillStyle = '#5a4a2a'; c.fill();
}
// Straight track centred on x = 0, running the full height
function railTrack(c, H, s) {
  c.fillStyle = '#6a6458'; c.fillRect(-s * 0.42, -H / 2, s * 0.84, H);
  c.fillStyle = 'rgba(0,0,0,0.25)';
  for (let i = 0; i < H / s * 14; i++) c.fillRect((pn(i, 81) - 0.5) * s * 0.8, -H / 2 + pn(i, 82) * H, s * 0.04, s * 0.04);
  c.fillStyle = '#5a3e22'; c.strokeStyle = 'rgba(20,10,5,0.6)'; c.lineWidth = Math.max(0.5, s * 0.015);
  for (let y = -H / 2 + s * 0.08; y < H / 2; y += s * 0.3) { c.fillRect(-s * 0.36, y, s * 0.72, s * 0.11); c.strokeRect(-s * 0.36, y, s * 0.72, s * 0.11); }
  for (const x of [-s * 0.22, s * 0.22]) {
    c.strokeStyle = '#2a2a2e'; c.lineWidth = Math.max(1, s * 0.08); c.beginPath(); c.moveTo(x, -H / 2); c.lineTo(x, H / 2); c.stroke();
    c.strokeStyle = '#b8bcc4'; c.lineWidth = Math.max(0.6, s * 0.035); c.beginPath(); c.moveTo(x, -H / 2); c.lineTo(x, H / 2); c.stroke();
  }
}

// Palette groups (any prop not listed lands in "Other")
const PROP_CATS = {
  'Shops & Guilds': ['general_store', 'alchemist', 'blacksmith', 'magic_shop', 'bookshop', 'bank', 'guild_hall', 'stable', 'warehouse'],
  'Transport':      ['ship', 'rowboat', 'airship', 'airship_dock', 'submersible', 'rail', 'rail_curve', 'locomotive', 'rail_wagon', 'minecart', 'station'],
  'Fortifications': ['gate_wood', 'portcullis', 'drawbridge', 'gatehouse', 'guard_tower', 'round_watchtower', 'watchtower_wood', 'sorcerer_tower', 'arcane_spire',
                     'ballista', 'catapult', 'barricade', 'banner', 'archery_target', 'training_dummy'],
  'Stairs & Cliffs': ['stairs', 'stairs_wide', 'stairs_wood', 'stairs_cave', 'spiral_stairs', 'cliff', 'cliff_outer', 'cliff_inner', 'cliff_end_r', 'cliff_end_l'],
  'Buildings':     ['cottage', 'house', 'townhouse', 'longhouse', 'inn', 'manor', 'house_l', 'temple', 'tower', 'hut', 'tent'],
  'Town':          ['market_stall', 'fountain', 'cart', 'lamp_post', 'signpost', 'bench', 'hay_bale', 'woodpile', 'garden', 'fence', 'bridge'],
  'Furniture':     ['chair', 'table', 'bed', 'bookshelf', 'chest', 'crate', 'barrel', 'throne', 'rug', 'weapon_rack', 'anvil'],
  'Dungeon':       ['coffin', 'sarcophagus', 'bones', 'cage', 'trapdoor', 'ladder', 'statue', 'column', 'web'],
  'Cave & Nature': ['stalagmite', 'stalactite', 'crystals', 'mushrooms', 'boulder', 'rubble', 'tree', 'palm_tree', 'well', 'campfire'],
  'Magic & Light': ['magic_circle', 'altar', 'cauldron', 'brazier', 'candelabra', 'torch'],
};

const PROPS = {
  coffin: { label: 'Coffin', w: 1, h: 2, draw(c, W, H) {
    const hw = W * 0.4, sh = W * 0.46, hh = H * 0.46;
    c.beginPath();
    c.moveTo(-hw * 0.7, -hh); c.lineTo(hw * 0.7, -hh); c.lineTo(sh, -hh * 0.55);
    c.lineTo(hw * 0.65, hh); c.lineTo(-hw * 0.65, hh); c.lineTo(-sh, -hh * 0.55); c.closePath();
    c.fillStyle = '#5a3a22'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.05; c.stroke();
    c.strokeStyle = 'rgba(200,160,100,0.55)'; c.lineWidth = W * 0.06;
    c.beginPath(); c.moveTo(0, -hh * 0.6); c.lineTo(0, hh * 0.1); c.moveTo(-W * 0.15, -hh * 0.35); c.lineTo(W * 0.15, -hh * 0.35); c.stroke();
  } },
  sarcophagus: { label: 'Sarcophagus', w: 1, h: 2, draw(c, W, H) {
    rr(c, -W * 0.44, -H * 0.46, W * 0.88, H * 0.92, W * 0.12);
    c.fillStyle = '#8a8478'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.05; c.stroke();
    rr(c, -W * 0.3, -H * 0.38, W * 0.6, H * 0.76, W * 0.25);
    c.fillStyle = 'rgba(255,250,235,0.15)'; c.fill(); c.strokeStyle = 'rgba(30,25,15,0.4)'; c.lineWidth = W * 0.03; c.stroke();
    c.beginPath(); c.arc(0, -H * 0.26, W * 0.13, 0, Math.PI * 2); c.stroke();
  } },
  boulder: { label: 'Boulder', w: 1, h: 1, draw(c, W) {
    const r = W * 0.42, pts = [0, 0.9, 1.7, 2.6, 3.5, 4.3, 5.3].map((a, i) => [Math.cos(a) * r * [1, .85, .95, .8, 1, .9, .85][i], Math.sin(a) * r * [1, .85, .95, .8, 1, .9, .85][i]]);
    c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath();
    c.fillStyle = '#7a766c'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.fillStyle = 'rgba(255,250,235,0.2)'; c.beginPath(); c.ellipse(-r * 0.25, -r * 0.3, r * 0.4, r * 0.2, -0.5, 0, Math.PI * 2); c.fill();
  } },
  barrel: { label: 'Barrel', w: 1, h: 1, draw(c, W) {
    const r = W * 0.38;
    c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fillStyle = '#7a5230'; c.fill();
    c.strokeStyle = '#3a3a3a'; c.lineWidth = W * 0.06; c.stroke();
    c.beginPath(); c.arc(0, 0, r * 0.7, 0, Math.PI * 2); c.lineWidth = W * 0.035; c.stroke();
    c.strokeStyle = 'rgba(30,15,5,0.4)'; c.lineWidth = W * 0.02;
    c.beginPath(); for (let i = -2; i <= 2; i++) { const x = i * r * 0.3; const yy = Math.sqrt(Math.max(0, r * r * 0.49 - x * x)); c.moveTo(x, -yy); c.lineTo(x, yy); } c.stroke();
  } },
  crate: { label: 'Crate', w: 1, h: 1, draw(c, W) {
    const h = W * 0.4;
    c.fillStyle = '#8a6a3a'; c.fillRect(-h, -h, h * 2, h * 2);
    c.strokeStyle = INK; c.lineWidth = W * 0.04; c.strokeRect(-h, -h, h * 2, h * 2);
    c.strokeStyle = '#5a4020'; c.lineWidth = W * 0.07; c.strokeRect(-h * 0.85, -h * 0.85, h * 1.7, h * 1.7);
    c.beginPath(); c.moveTo(-h * 0.85, -h * 0.85); c.lineTo(h * 0.85, h * 0.85); c.moveTo(h * 0.85, -h * 0.85); c.lineTo(-h * 0.85, h * 0.85); c.stroke();
  } },
  chest: { label: 'Chest', w: 1, h: 1, draw(c, W) {
    const w = W * 0.8, h = W * 0.56;
    rr(c, -w / 2, -h / 2, w, h, W * 0.06); c.fillStyle = '#7a4e24'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.fillStyle = '#c9a84c';
    c.fillRect(-w / 2, -h * 0.12, w, h * 0.12); c.fillRect(-w * 0.32, -h / 2, w * 0.08, h); c.fillRect(w * 0.24, -h / 2, w * 0.08, h);
    c.fillRect(-W * 0.06, -h * 0.05, W * 0.12, W * 0.14);
  } },
  table: { label: 'Table', w: 2, h: 1, draw(c, W, H) {
    rr(c, -W * 0.46, -H * 0.38, W * 0.92, H * 0.76, H * 0.1);
    c.fillStyle = '#8a6438'; c.fill(); c.strokeStyle = INK; c.lineWidth = H * 0.05; c.stroke();
    c.strokeStyle = 'rgba(40,20,5,0.35)'; c.lineWidth = H * 0.025;
    c.beginPath(); c.moveTo(-W * 0.44, -H * 0.12); c.lineTo(W * 0.44, -H * 0.12); c.moveTo(-W * 0.44, H * 0.13); c.lineTo(W * 0.44, H * 0.13); c.stroke();
  } },
  chair: { label: 'Chair', w: 1, h: 1, draw(c, W) {
    rr(c, -W * 0.26, -W * 0.2, W * 0.52, W * 0.5, W * 0.05); c.fillStyle = '#7a5630'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    rr(c, -W * 0.3, -W * 0.34, W * 0.6, W * 0.14, W * 0.04); c.fillStyle = '#5a3e22'; c.fill(); c.stroke();
  } },
  bed: { label: 'Bed', w: 1, h: 2, draw(c, W, H) {
    rr(c, -W * 0.44, -H * 0.46, W * 0.88, H * 0.92, W * 0.08); c.fillStyle = '#5a3e22'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    rr(c, -W * 0.36, -H * 0.4, W * 0.72, H * 0.16, W * 0.08); c.fillStyle = '#e8e0d0'; c.fill();
    rr(c, -W * 0.4, -H * 0.18, W * 0.8, H * 0.6, W * 0.06); c.fillStyle = '#7a2a30'; c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.moveTo(-W * 0.4, -H * 0.08); c.lineTo(W * 0.4, -H * 0.08); c.stroke();
  } },
  bookshelf: { label: 'Bookshelf', w: 2, h: 1, draw(c, W, H) {
    c.fillStyle = '#4a3220'; c.fillRect(-W * 0.48, -H * 0.3, W * 0.96, H * 0.6);
    c.strokeStyle = INK; c.lineWidth = H * 0.05; c.strokeRect(-W * 0.48, -H * 0.3, W * 0.96, H * 0.6);
    const cols = ['#8a2a2a', '#2a4a7a', '#3a6a3a', '#a08030', '#6a3a6a'];
    const bw = W * 0.06;
    for (let i = 0; i < 14; i++) { c.fillStyle = cols[(i * 7) % cols.length]; c.fillRect(-W * 0.44 + i * bw * 1.08, -H * 0.22, bw, H * 0.44); }
  } },
  statue: { label: 'Statue', w: 1, h: 1, draw(c, W) {
    rr(c, -W * 0.42, -W * 0.42, W * 0.84, W * 0.84, W * 0.06); c.fillStyle = '#6a665e'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.fillStyle = '#b0aa9c';
    c.beginPath(); c.ellipse(0, W * 0.08, W * 0.28, W * 0.16, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(0, -W * 0.08, W * 0.13, 0, Math.PI * 2); c.fill(); c.stroke();
  } },
  brazier: { label: 'Brazier', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.arc(0, 0, W * 0.36, 0, Math.PI * 2); c.fillStyle = '#3a3634'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.05; c.stroke();
    const g = c.createRadialGradient(0, 0, 0, 0, 0, W * 0.3);
    g.addColorStop(0, '#fff0a0'); g.addColorStop(0.45, '#f0a030'); g.addColorStop(1, 'rgba(200,50,10,0.2)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, W * 0.28, 0, Math.PI * 2); c.fill();
  } },
  campfire: { label: 'Campfire', w: 1, h: 1, draw(c, W) {
    c.strokeStyle = '#5a3a1e'; c.lineCap = 'round'; c.lineWidth = W * 0.12;
    c.beginPath(); c.moveTo(-W * 0.32, -W * 0.22); c.lineTo(W * 0.32, W * 0.22); c.moveTo(W * 0.32, -W * 0.22); c.lineTo(-W * 0.32, W * 0.22); c.stroke(); c.lineCap = 'butt';
    const g = c.createRadialGradient(0, 0, 0, 0, 0, W * 0.26);
    g.addColorStop(0, '#fff6b0'); g.addColorStop(0.5, '#f09030'); g.addColorStop(1, 'rgba(220,60,10,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, W * 0.26, 0, Math.PI * 2); c.fill();
  } },
  well: { label: 'Well', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.arc(0, 0, W * 0.42, 0, Math.PI * 2); c.fillStyle = '#7a766c'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.strokeStyle = 'rgba(30,25,20,0.45)'; c.lineWidth = W * 0.02;
    c.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.moveTo(Math.cos(a) * W * 0.28, Math.sin(a) * W * 0.28); c.lineTo(Math.cos(a) * W * 0.42, Math.sin(a) * W * 0.42); } c.stroke();
    c.beginPath(); c.arc(0, 0, W * 0.27, 0, Math.PI * 2); c.fillStyle = '#16303e'; c.fill();
  } },
  bones: { label: 'Bones', w: 1, h: 1, draw(c, W) {
    c.strokeStyle = '#e0d8c4'; c.lineCap = 'round'; c.lineWidth = W * 0.07;
    c.beginPath(); c.moveTo(-W * 0.3, W * 0.25); c.lineTo(W * 0.15, -W * 0.05); c.moveTo(-W * 0.1, W * 0.32); c.lineTo(W * 0.32, W * 0.15); c.stroke(); c.lineCap = 'butt';
    c.fillStyle = '#e8e0cc'; c.beginPath(); c.arc(-W * 0.12, -W * 0.18, W * 0.17, 0, Math.PI * 2); c.fill();
    c.strokeStyle = INK; c.lineWidth = W * 0.03; c.stroke();
    c.fillStyle = '#2a2218'; c.beginPath(); c.arc(-W * 0.18, -W * 0.2, W * 0.04, 0, Math.PI * 2); c.arc(-W * 0.06, -W * 0.2, W * 0.04, 0, Math.PI * 2); c.fill();
  } },
  cauldron: { label: 'Cauldron', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.arc(0, 0, W * 0.38, 0, Math.PI * 2); c.fillStyle = '#26242a'; c.fill(); c.strokeStyle = '#0a0a0c'; c.lineWidth = W * 0.05; c.stroke();
    c.beginPath(); c.arc(0, 0, W * 0.28, 0, Math.PI * 2); c.fillStyle = '#4a8a3a'; c.fill();
    c.fillStyle = 'rgba(200,255,150,0.5)'; c.beginPath(); c.arc(-W * 0.08, -W * 0.06, W * 0.05, 0, Math.PI * 2); c.arc(W * 0.1, W * 0.05, W * 0.035, 0, Math.PI * 2); c.fill();
  } },
  rubble: { label: 'Rubble Pile', w: 1, h: 1, draw(c, W) {
    [[-0.2, -0.15, 0.16], [0.15, -0.2, 0.13], [0.18, 0.15, 0.17], [-0.15, 0.2, 0.12], [0.0, 0.0, 0.14]].forEach(([x, y, r], i) => {
      c.beginPath(); for (let k = 0; k < 5; k++) { const a = k * 1.256 + i; const px = (x + Math.cos(a) * r) * W, py = (y + Math.sin(a) * r) * W; k ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath();
      c.fillStyle = i % 2 ? '#8a8478' : '#6a665e'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.025; c.stroke();
    });
  } },
  ladder: { label: 'Ladder', w: 1, h: 1, draw(c, W) {
    c.strokeStyle = '#8a6438'; c.lineWidth = W * 0.08;
    c.beginPath(); c.moveTo(-W * 0.22, -W * 0.44); c.lineTo(-W * 0.22, W * 0.44); c.moveTo(W * 0.22, -W * 0.44); c.lineTo(W * 0.22, W * 0.44); c.stroke();
    c.lineWidth = W * 0.05;
    c.beginPath(); for (let i = -3; i <= 3; i++) { c.moveTo(-W * 0.22, i * W * 0.13); c.lineTo(W * 0.22, i * W * 0.13); } c.stroke();
  } },
  magic_circle: { label: 'Magic Circle', w: 3, h: 3, draw(c, W) {
    const R = W * 0.47;
    c.shadowColor = 'rgba(120,180,255,0.9)'; c.shadowBlur = W * 0.04; c.shadowOffsetY = 0;
    const glow = c.createRadialGradient(0, 0, 0, 0, 0, R);
    glow.addColorStop(0, 'rgba(110,160,255,0.22)'); glow.addColorStop(0.8, 'rgba(110,160,255,0.06)'); glow.addColorStop(1, 'rgba(110,160,255,0)');
    c.fillStyle = glow; c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(170,210,255,0.9)';
    c.lineWidth = W * 0.012; c.beginPath(); c.arc(0, 0, R * 0.98, 0, Math.PI * 2); c.stroke();
    c.lineWidth = W * 0.006; c.beginPath(); c.arc(0, 0, R * 0.84, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(0, 0, R * 0.36, 0, Math.PI * 2); c.stroke();
    // Rune band between the two outer rings
    c.fillStyle = 'rgba(190,225,255,0.9)';
    c.font = `${Math.max(5, W * 0.055)}px serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      c.save(); c.rotate(a); c.fillText(runes[i % runes.length], 0, -R * 0.91); c.restore();
    }
    // Heptagram (7-pointed star)
    c.lineWidth = W * 0.008; c.beginPath();
    for (let i = 0; i <= 7; i++) {
      const a = -Math.PI / 2 + (i * 3 * 2 * Math.PI) / 7;
      const x = Math.cos(a) * R * 0.84, y = Math.sin(a) * R * 0.84;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
    // Small sigil circles at the star points
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
      c.beginPath(); c.arc(Math.cos(a) * R * 0.84, Math.sin(a) * R * 0.84, R * 0.06, 0, Math.PI * 2);
      c.fillStyle = 'rgba(20,30,60,0.9)'; c.fill(); c.stroke();
    }
  } },
  // ── Cave ──
  stalagmite: { label: 'Stalagmite', w: 1, h: 1, draw(c, W) { drawSpireCluster(c, W, false); } },
  stalactite: { label: 'Stalactite (overhead)', w: 1, h: 1, draw(c, W) { drawSpireCluster(c, W, true); } },
  crystals: { label: 'Crystal Cluster', w: 1, h: 1, draw(c, W) {
    const shards = [[-0.6, 0.38, 0.11], [-0.15, 0.44, 0.13], [0.35, 0.36, 0.1], [1.1, 0.3, 0.09], [2.3, 0.32, 0.1], [3.4, 0.28, 0.09], [4.6, 0.34, 0.11]];
    c.shadowColor = 'rgba(170,120,255,0.7)'; c.shadowBlur = W * 0.15; c.shadowOffsetY = 0;
    for (const [a, len, wd] of shards) {
      const dx = Math.cos(a - Math.PI / 2), dy = Math.sin(a - Math.PI / 2), nx = -dy, ny = dx;
      const L = len * W, Wd = wd * W;
      c.beginPath();
      c.moveTo(nx * Wd / 2, ny * Wd / 2); c.lineTo(dx * L * 0.8 + nx * Wd / 2, dy * L * 0.8 + ny * Wd / 2);
      c.lineTo(dx * L, dy * L); c.lineTo(dx * L * 0.8 - nx * Wd / 2, dy * L * 0.8 - ny * Wd / 2);
      c.lineTo(-nx * Wd / 2, -ny * Wd / 2); c.closePath();
      const g = c.createLinearGradient(0, 0, dx * L, dy * L);
      g.addColorStop(0, '#5a3a9a'); g.addColorStop(1, '#c8b0ff');
      c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(40,20,70,0.8)'; c.lineWidth = W * 0.02; c.stroke();
    }
    c.shadowBlur = 0;
    c.beginPath(); c.arc(0, 0, W * 0.1, 0, Math.PI * 2); c.fillStyle = '#4a3a5a'; c.fill();
  } },
  mushrooms: { label: 'Cave Mushrooms', w: 1, h: 1, draw(c, W) {
    c.shadowColor = 'rgba(80,230,200,0.8)'; c.shadowBlur = W * 0.12; c.shadowOffsetY = 0;
    [[-0.18, -0.12, 0.17], [0.17, -0.18, 0.12], [0.12, 0.18, 0.15], [-0.2, 0.22, 0.09]].forEach(([x, y, r]) => {
      c.beginPath(); c.arc(x * W, y * W, r * W, 0, Math.PI * 2);
      const g = c.createRadialGradient(x * W, y * W, 0, x * W, y * W, r * W);
      g.addColorStop(0, '#c0fff0'); g.addColorStop(1, '#2a9a8a');
      c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(10,50,45,0.8)'; c.lineWidth = W * 0.02; c.stroke();
    });
    c.shadowBlur = 0; c.fillStyle = 'rgba(255,255,255,0.75)';
    [[-0.22, -0.16], [-0.12, -0.06], [0.15, 0.13], [0.2, -0.2]].forEach(([x, y]) => { c.beginPath(); c.arc(x * W, y * W, W * 0.025, 0, Math.PI * 2); c.fill(); });
  } },
  web: { label: 'Spider Web', w: 1, h: 1, draw(c, W) {
    c.shadowBlur = 0; c.shadowOffsetY = 0;
    c.strokeStyle = 'rgba(235,235,235,0.6)'; c.lineWidth = Math.max(0.5, W * 0.012);
    const R = W * 0.48, spokes = 8;
    c.beginPath();
    for (let i = 0; i < spokes; i++) { const a = i * Math.PI * 2 / spokes; c.moveTo(0, 0); c.lineTo(Math.cos(a) * R, Math.sin(a) * R); }
    for (let ring = 1; ring <= 4; ring++) {
      const r = R * ring / 4.4;
      for (let i = 0; i <= spokes; i++) {
        const a = i * Math.PI * 2 / spokes, rr = r * (i % 2 ? 0.9 : 1);
        i ? c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : c.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
    }
    c.stroke();
  } },

  // ── Throne room / furnishings ──
  throne: { label: 'Throne', w: 1, h: 1, draw(c, W) {
    // High back along the top edge, armrests at the sides, cushioned seat
    rr(c, -W * 0.4, -W * 0.44, W * 0.8, W * 0.86, W * 0.06); c.fillStyle = '#6a4a1e'; c.fill();
    c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.fillStyle = '#c9a84c';
    c.beginPath(); c.moveTo(-W * 0.4, -W * 0.2); c.lineTo(-W * 0.4, -W * 0.44);
    for (let i = 0; i <= 4; i++) { c.lineTo(-W * 0.4 + i * W * 0.2, -W * (i % 2 ? 0.36 : 0.5)); }
    c.lineTo(W * 0.4, -W * 0.2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#8a6a2e';
    c.fillRect(-W * 0.4, -W * 0.2, W * 0.13, W * 0.62); c.fillRect(W * 0.27, -W * 0.2, W * 0.13, W * 0.62);
    rr(c, -W * 0.25, -W * 0.16, W * 0.5, W * 0.52, W * 0.06); c.fillStyle = '#8a1e2a'; c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = W * 0.02; c.stroke();
    c.fillStyle = '#e8d070'; c.beginPath(); c.arc(0, -W * 0.36, W * 0.05, 0, Math.PI * 2); c.fill();
  } },
  rug: { label: 'Rug', w: 2, h: 3, draw(c, W, H) {
    c.shadowBlur = 0; c.shadowOffsetY = 0;
    c.fillStyle = '#7a1e24'; c.fillRect(-W * 0.42, -H * 0.44, W * 0.84, H * 0.88);
    c.strokeStyle = '#c9a84c'; c.lineWidth = W * 0.03;
    c.strokeRect(-W * 0.36, -H * 0.4, W * 0.72, H * 0.8);
    c.strokeStyle = 'rgba(201,168,76,0.6)'; c.lineWidth = W * 0.015;
    c.strokeRect(-W * 0.3, -H * 0.35, W * 0.6, H * 0.7);
    c.beginPath(); c.moveTo(0, -H * 0.24); c.lineTo(W * 0.2, 0); c.lineTo(0, H * 0.24); c.lineTo(-W * 0.2, 0); c.closePath();
    c.fillStyle = 'rgba(201,168,76,0.35)'; c.fill(); c.stroke();
    // Fringe on the short ends
    c.strokeStyle = '#d8c8a0'; c.lineWidth = W * 0.012; c.beginPath();
    for (let i = 0; i <= 12; i++) { const x = -W * 0.4 + i * W * 0.8 / 12; c.moveTo(x, -H * 0.44); c.lineTo(x, -H * 0.48); c.moveTo(x, H * 0.44); c.lineTo(x, H * 0.48); }
    c.stroke();
  } },
  altar: { label: 'Altar', w: 2, h: 1, draw(c, W, H) {
    rr(c, -W * 0.46, -H * 0.38, W * 0.92, H * 0.76, H * 0.06); c.fillStyle = '#7a766c'; c.fill();
    c.strokeStyle = INK; c.lineWidth = H * 0.05; c.stroke();
    c.fillStyle = '#4a2060'; c.fillRect(-W * 0.12, -H * 0.38, W * 0.24, H * 0.76);
    c.fillStyle = '#c9a84c'; c.fillRect(-W * 0.12, H * 0.28, W * 0.24, H * 0.06);
    for (const x of [-0.36, 0.36]) {
      c.fillStyle = '#e8e0cc'; c.beginPath(); c.arc(x * W, 0, H * 0.1, 0, Math.PI * 2); c.fill();
      c.shadowColor = 'rgba(255,190,80,0.9)'; c.shadowBlur = H * 0.3;
      c.fillStyle = '#ffd070'; c.beginPath(); c.arc(x * W, 0, H * 0.05, 0, Math.PI * 2); c.fill();
      c.shadowBlur = 0;
    }
  } },
  candelabra: { label: 'Candelabra', w: 1, h: 1, draw(c, W) {
    c.strokeStyle = '#a08840'; c.lineWidth = W * 0.04;
    c.beginPath(); c.arc(0, 0, W * 0.26, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(0, 0, W * 0.08, 0, Math.PI * 2); c.fillStyle = '#c9a84c'; c.fill();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5, x = Math.cos(a) * W * 0.26, y = Math.sin(a) * W * 0.26;
      c.fillStyle = '#e8e0cc'; c.beginPath(); c.arc(x, y, W * 0.06, 0, Math.PI * 2); c.fill();
      c.shadowColor = 'rgba(255,190,80,1)'; c.shadowBlur = W * 0.15; c.shadowOffsetY = 0;
      c.fillStyle = '#ffd070'; c.beginPath(); c.arc(x, y, W * 0.03, 0, Math.PI * 2); c.fill();
      c.shadowBlur = 0;
    }
  } },
  torch: { label: 'Wall Torch', w: 1, h: 1, draw(c, W) {
    // Bracket on the top edge (rotate to face any wall), flame below it
    c.fillStyle = '#3a3634'; c.fillRect(-W * 0.12, -W * 0.5, W * 0.24, W * 0.12);
    c.strokeStyle = '#5a3a1e'; c.lineWidth = W * 0.08; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, -W * 0.42); c.lineTo(0, -W * 0.12); c.stroke(); c.lineCap = 'butt';
    const g = c.createRadialGradient(0, -W * 0.08, 0, 0, -W * 0.08, W * 0.4);
    g.addColorStop(0, 'rgba(255,240,170,0.95)'); g.addColorStop(0.25, 'rgba(250,160,50,0.6)'); g.addColorStop(1, 'rgba(250,120,30,0)');
    c.shadowBlur = 0; c.fillStyle = g; c.beginPath(); c.arc(0, -W * 0.08, W * 0.4, 0, Math.PI * 2); c.fill();
  } },

  // ── Dungeon / workshop ──
  column: { label: 'Column', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.arc(0, 0, W * 0.44, 0, Math.PI * 2); c.fillStyle = '#5a564e'; c.fill();
    c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    const g = c.createRadialGradient(-W * 0.1, -W * 0.1, 0, 0, 0, W * 0.34);
    g.addColorStop(0, '#c8c2b4'); g.addColorStop(1, '#7a766c');
    c.beginPath(); c.arc(0, 0, W * 0.34, 0, Math.PI * 2); c.fillStyle = g; c.fill();
    c.strokeStyle = 'rgba(40,35,25,0.35)'; c.lineWidth = W * 0.015; c.beginPath();
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.moveTo(Math.cos(a) * W * 0.2, Math.sin(a) * W * 0.2); c.lineTo(Math.cos(a) * W * 0.34, Math.sin(a) * W * 0.34); }
    c.stroke();
  } },
  cage: { label: 'Cage', w: 1, h: 1, draw(c, W) {
    const h = W * 0.42;
    c.fillStyle = 'rgba(10,8,6,0.55)'; c.fillRect(-h, -h, h * 2, h * 2);
    c.strokeStyle = '#4a4a4a'; c.lineWidth = W * 0.05; c.strokeRect(-h, -h, h * 2, h * 2);
    c.lineWidth = W * 0.03; c.beginPath();
    for (let i = 1; i < 5; i++) { const t = -h + i * h * 2 / 5; c.moveTo(t, -h); c.lineTo(t, h); }
    c.moveTo(-h, 0); c.lineTo(h, 0); c.stroke();
  } },
  trapdoor: { label: 'Trapdoor', w: 1, h: 1, draw(c, W) {
    c.shadowBlur = 0; c.shadowOffsetY = 0;
    const h = W * 0.42;
    c.fillStyle = '#6a4a2a'; c.fillRect(-h, -h, h * 2, h * 2);
    c.strokeStyle = INK; c.lineWidth = W * 0.04; c.strokeRect(-h, -h, h * 2, h * 2);
    c.strokeStyle = 'rgba(30,15,5,0.5)'; c.lineWidth = W * 0.02; c.beginPath();
    for (let i = 1; i < 4; i++) { const x = -h + i * h * 2 / 4; c.moveTo(x, -h); c.lineTo(x, h); } c.stroke();
    c.fillStyle = '#3a3a3a'; c.fillRect(-h, -h * 0.7, W * 0.1, W * 0.14); c.fillRect(-h, h * 0.4, W * 0.1, W * 0.14);
    c.strokeStyle = '#8a8a8a'; c.lineWidth = W * 0.03; c.beginPath(); c.arc(h * 0.6, 0, W * 0.07, 0, Math.PI * 2); c.stroke();
  } },
  weapon_rack: { label: 'Weapon Rack', w: 2, h: 1, draw(c, W, H) {
    c.fillStyle = '#5a3e22'; c.fillRect(-W * 0.46, -H * 0.12, W * 0.92, H * 0.24);
    c.strokeStyle = INK; c.lineWidth = H * 0.04; c.strokeRect(-W * 0.46, -H * 0.12, W * 0.92, H * 0.24);
    c.lineCap = 'round';
    [[-0.34, '#b8bcc4'], [-0.17, '#8a6438'], [0, '#b8bcc4'], [0.17, '#8a6438'], [0.34, '#b8bcc4']].forEach(([x, col], i) => {
      c.strokeStyle = col; c.lineWidth = H * (i % 2 ? 0.06 : 0.09);
      c.beginPath(); c.moveTo(x * W, -H * 0.4); c.lineTo(x * W, H * 0.4); c.stroke();
    });
    c.lineCap = 'butt';
  } },
  anvil: { label: 'Anvil', w: 1, h: 1, draw(c, W) {
    c.beginPath();
    c.moveTo(-W * 0.44, 0); c.quadraticCurveTo(-W * 0.3, -W * 0.16, -W * 0.14, -W * 0.16);
    c.lineTo(W * 0.36, -W * 0.16); c.lineTo(W * 0.36, W * 0.16); c.lineTo(-W * 0.14, W * 0.16);
    c.quadraticCurveTo(-W * 0.3, W * 0.16, -W * 0.44, 0); c.closePath();
    c.fillStyle = '#4a4c52'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.035; c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(-W * 0.1, -W * 0.1, W * 0.4, W * 0.08);
  } },

  tree: { label: 'Tree (Large)', w: 2, h: 2, draw(c, W) {
    const blobs = [[0, 0, 0.36], [-0.2, -0.16, 0.22], [0.2, -0.14, 0.22], [0.18, 0.2, 0.22], [-0.2, 0.18, 0.22]];
    c.fillStyle = '#244a20'; blobs.forEach(([x, y, r]) => { c.beginPath(); c.arc(x * W, y * W, r * W, 0, Math.PI * 2); c.fill(); });
    c.strokeStyle = 'rgba(10,25,8,0.6)'; c.lineWidth = W * 0.015; blobs.slice(1).forEach(([x, y, r]) => { c.beginPath(); c.arc(x * W, y * W, r * W, 0, Math.PI * 2); c.stroke(); });
    c.fillStyle = 'rgba(130,180,80,0.3)'; blobs.forEach(([x, y, r]) => { c.beginPath(); c.arc((x - 0.05) * W, (y - 0.05) * W, r * W * 0.55, 0, Math.PI * 2); c.fill(); });
  } },

  palm_tree: { label: 'Palm Tree', w: 2, h: 2, draw(c, W) {
    // Nine arching fronds with feathered leaflets around a coconut cluster
    const fronds = 9, L = W * 0.48;
    for (let i = 0; i < fronds; i++) {
      const a = i * Math.PI * 2 / fronds + 0.3 + (pn(i, 71) - 0.5) * 0.3, len = L * (0.82 + 0.18 * pn(i, 72)), bend = (pn(i, 73) - 0.5) * 0.5;
      c.save(); c.rotate(a);
      // Frond outline: a long leaf from the crown, curving slightly
      c.beginPath(); c.moveTo(0, 0);
      c.quadraticCurveTo(len * 0.45, -len * 0.34 + bend * len * 0.2, len, bend * len * 0.3);
      c.quadraticCurveTo(len * 0.45, len * 0.34 + bend * len * 0.2, 0, 0);
      c.fillStyle = i % 2 ? '#3e7a2e' : '#4a8a34'; c.fill();
      c.strokeStyle = 'rgba(15,35,10,0.7)'; c.lineWidth = W * 0.012; c.stroke();
      noShadow(c);
      // Leaflets along the midrib
      c.strokeStyle = 'rgba(20,50,15,0.6)'; c.lineWidth = Math.max(0.5, W * 0.008); c.beginPath();
      for (let t = 0.15; t < 0.95; t += 0.09) {
        const mx = len * t, my = bend * len * 0.3 * t * t, w = len * 0.17 * Math.sin(Math.PI * t);
        c.moveTo(mx, my); c.lineTo(mx + len * 0.06, my - w); c.moveTo(mx, my); c.lineTo(mx + len * 0.06, my + w);
      }
      c.stroke();
      c.strokeStyle = 'rgba(200,220,130,0.55)'; c.lineWidth = Math.max(0.6, W * 0.012);
      c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(len * 0.5, bend * len * 0.08, len * 0.95, bend * len * 0.28); c.stroke();
      c.restore();
      propShadow(c, W / 2);
    }
    noShadow(c);
    for (const [x, y] of [[-0.04, -0.03], [0.04, -0.02], [0, 0.04]]) {
      c.beginPath(); c.arc(x * W, y * W, W * 0.045, 0, Math.PI * 2); c.fillStyle = '#5a3e1e'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.008; c.stroke();
    }
  } },

  // ── Stairs & cliffs ── (rotate with Q; the top edge is always the high side)
  stairs:      { label: 'Stairs', w: 1, h: 2, tile: true, draw(c, W, H, s) { drawStairs(c, W, H, s, { base: '#8a8272', rails: '#5a564e' }); } },
  stairs_wide: { label: 'Grand Stairs', w: 3, h: 2, tile: true, draw(c, W, H, s) { drawStairs(c, W, H, s, { base: '#a8a296', rails: '#7a766c' }); } },
  stairs_wood: { label: 'Wooden Stairs', w: 1, h: 2, tile: true, draw(c, W, H, s) { drawStairs(c, W, H, s, { base: '#8a6438', rails: '#4a3220' }); } },
  stairs_cave: { label: 'Cave Steps', w: 1, h: 2, tile: true, draw(c, W, H, s) { drawStairs(c, W, H, s, { base: '#6e665a', rough: true }); } },
  spiral_stairs: { label: 'Spiral Stairs', w: 2, h: 2, draw(c, W, H, s) {
    const R = W * 0.46, r0 = W * 0.1, N = 12, span = Math.PI * 2 * 0.88, a0 = -Math.PI / 2;
    propShadow(c, s); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fillStyle = '#2e2a26'; c.fill(); noShadow(c);
    for (let k = 0; k < N; k++) {
      const s0 = a0 + span * k / N, s1 = a0 + span * (k + 1) / N;
      c.beginPath(); c.arc(0, 0, R * 0.92, s0, s1); c.arc(0, 0, r0, s1, s0, true); c.closePath();
      c.fillStyle = shade('#8a8272', 1.3 - 0.8 * k / (N - 1)); c.fill();
      c.strokeStyle = 'rgba(15,10,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025); c.stroke();
    }
    c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.stroke();
    c.beginPath(); c.arc(0, 0, r0, 0, Math.PI * 2); c.fillStyle = '#6a665e'; c.fill(); c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03); c.stroke();
  } },
  cliff: { label: 'Cliff Face', w: 2, h: 1, tile: true, draw(c, W, H, s) {
    // High ground above the lip, the face drops toward the bottom edge
    const x0 = -W / 2, ea = -H / 2 + CLIFF_A * s, eb = H / 2 - (1 - CLIFF_B) * s;
    const sh = c.createLinearGradient(0, eb, 0, eb + s * 0.15);
    sh.addColorStop(0, 'rgba(0,0,0,0.35)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
    noShadow(c); c.fillStyle = sh; c.fillRect(x0, eb, W, s * 0.15);
    const g = c.createLinearGradient(0, ea, 0, eb); g.addColorStop(0, CLIFF_EDGE); g.addColorStop(1, CLIFF_BASE);
    cliffFace(c, t => [x0 + W * t, ea], t => [x0 + W * t, eb], Math.max(3, Math.round(W / (s * 0.16))), s, g);
  } },
  cliff_outer: { label: 'Cliff Corner (outer)', w: 1, h: 1, draw(c, W, H, s) {
    // High ground in the top-left corner; joins a Cliff Face on its left and a
    // three-quarter-turned one above it
    const cx = -W / 2, cy = -W / 2, ra = CLIFF_A * W, rb = CLIFF_B * W;
    const pt = r => t => [cx + Math.cos(t * Math.PI / 2) * r, cy + Math.sin(t * Math.PI / 2) * r];
    const sh = c.createRadialGradient(cx, cy, rb, cx, cy, rb + W * 0.15);
    sh.addColorStop(0, 'rgba(0,0,0,0.35)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
    noShadow(c); c.fillStyle = sh; c.beginPath(); c.arc(cx, cy, rb + W * 0.15, 0, Math.PI / 2); c.arc(cx, cy, rb, Math.PI / 2, 0, true); c.closePath(); c.fill();
    const g = c.createRadialGradient(cx, cy, ra, cx, cy, rb); g.addColorStop(0, CLIFF_EDGE); g.addColorStop(1, CLIFF_BASE);
    cliffFace(c, pt(ra), pt(rb), 3, W, g, 13);
  } },
  cliff_inner: { label: 'Cliff Corner (inner)', w: 1, h: 1, draw(c, W, H, s) {
    // Low ground in the bottom-right corner, high ground wraps around it
    const cx = W / 2, cy = W / 2, ra = (1 - CLIFF_A) * W, rb = (1 - CLIFF_B) * W;
    const pt = r => t => [cx + Math.cos(Math.PI + t * Math.PI / 2) * r, cy + Math.sin(Math.PI + t * Math.PI / 2) * r];
    const g = c.createRadialGradient(cx, cy, rb, cx, cy, ra); g.addColorStop(0, CLIFF_BASE); g.addColorStop(1, CLIFF_EDGE);
    cliffFace(c, pt(ra), pt(rb), 7, W, g, 17);
  } },
  cliff_end_r: { label: 'Cliff End (right)', w: 1, h: 1, draw(c, W, H, s) { drawCliffEnd(c, W, H, W, false); } },
  cliff_end_l: { label: 'Cliff End (left)', w: 1, h: 1, draw(c, W, H, s) { drawCliffEnd(c, W, H, W, true); } },

  // ── Buildings ── (roofs seen from above; resize freely, the roof redraws to fit)
  cottage:   { label: 'Cottage', w: 2, h: 2, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#a8884a', pattern: 'thatch' }); } },
  house:     { label: 'House', w: 2, h: 3, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#6a4a2e', pattern: 'shingle', chimneys: [[0.25, -0.3]] }); } },
  townhouse: { label: 'Townhouse', w: 2, h: 2, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#9a4a32', pattern: 'tile', hip: true, chimneys: [[-0.25, 0.25]] }); } },
  longhouse: { label: 'Longhouse', w: 2, h: 5, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#9a7a40', pattern: 'thatch' }); } },
  inn:       { label: 'Inn / Tavern', w: 4, h: 2, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#8a3a2a', pattern: 'tile', chimneys: [[-0.32, -0.22], [0.3, 0.22]] }); } },
  manor:     { label: 'Manor', w: 4, h: 3, tile: true, draw(c, W, H, s) { drawHouse(c, W, H, s, { color: '#4a5058', pattern: 'slate', hip: true, chimneys: [[-0.3, -0.25], [0.3, -0.25]] }); } },
  house_l: { label: 'L-Shaped House', w: 3, h: 3, draw(c, W, H, s) {
    const u = W / 3, wing = 1.4 * u;
    propShadow(c, s); c.fillStyle = '#3a2a1a';
    c.beginPath(); c.moveTo(-W / 2, -W / 2); c.lineTo(W / 2, -W / 2); c.lineTo(W / 2, -W / 2 + wing);
    c.lineTo(-W / 2 + wing, -W / 2 + wing); c.lineTo(-W / 2 + wing, W / 2); c.lineTo(-W / 2, W / 2); c.closePath(); c.fill(); noShadow(c);
    const o = { color: '#6a4a2e', pattern: 'shingle' };
    c.save(); c.translate(-W / 2 + wing / 2, 0); drawHouse(c, wing, W, u, o, false); c.restore();
    c.save(); c.translate(0, -W / 2 + wing / 2); drawHouse(c, W, wing, u, { ...o, chimneys: [[0.3, -0.25]] }, false); c.restore();
  } },
  temple: { label: 'Temple / Chapel', w: 3, h: 5, draw(c, W, H, s) {
    const u = W / 3, tw = 1.5 * u, naveTop = -H / 2 + tw - 0.2 * u, naveW = 2.4 * u;
    propShadow(c, s); c.fillStyle = '#2a2e34';
    c.fillRect(-naveW / 2, naveTop, naveW, H / 2 - naveTop); c.fillRect(-tw / 2, -H / 2, tw, tw); noShadow(c);
    c.save(); c.translate(0, (naveTop + H / 2) / 2); drawHouse(c, naveW, H / 2 - naveTop, u, { color: '#4a5058', pattern: 'slate' }, false); c.restore();
    c.save(); c.translate(0, -H / 2 + tw / 2); drawHouse(c, tw, tw, u, { color: '#3a4048', pattern: 'slate', hip: true }, false);
    c.strokeStyle = '#e8d070'; c.lineWidth = Math.max(1, u * 0.06);
    c.beginPath(); c.moveTo(0, -u * 0.2); c.lineTo(0, u * 0.2); c.moveTo(-u * 0.12, -u * 0.06); c.lineTo(u * 0.12, -u * 0.06); c.stroke();
    c.restore();
  } },
  tower: { label: 'Round Tower', w: 2, h: 2, draw(c, W, H, s) { drawCone(c, W, s, '#4a5058', 'slate'); } },
  hut:   { label: 'Round Hut', w: 2, h: 2, draw(c, W, H, s) { drawCone(c, W, s, '#a8884a', 'thatch'); } },
  tent:  { label: 'Tent', w: 2, h: 2, tile: true, draw(c, W, H, s) {
    drawHouse(c, W, H, s, { color: '#c8b890', pattern: 'canvas', hip: true });
    c.beginPath(); c.arc(0, 0, s * 0.06, 0, Math.PI * 2); c.fillStyle = '#5a3e22'; c.fill();
  } },

  // ── Town ──
  market_stall: { label: 'Market Stall', w: 2, h: 1, draw(c, W, H, s) {
    const x0 = -W * 0.46, y0 = -H * 0.42, aw = W * 0.92, ah = H * 0.72, n = 8;
    propShadow(c, s); c.fillStyle = '#5a3e22'; c.fillRect(x0, y0, aw, ah); noShadow(c);
    for (let i = 0; i < n; i++) { c.fillStyle = i % 2 ? '#e8dcc0' : '#a83a32'; c.fillRect(x0 + aw * i / n, y0, aw / n + 0.5, ah); }
    // Scalloped front edge
    for (let i = 0; i < n; i++) {
      c.beginPath(); c.arc(x0 + aw * (i + 0.5) / n, y0 + ah, aw / n / 2, 0, Math.PI);
      c.fillStyle = i % 2 ? '#e8dcc0' : '#a83a32'; c.fill(); c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.02); c.stroke();
    }
    c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(x0, y0, aw, ah / 2);
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.04); c.strokeRect(x0, y0, aw, ah);
  } },
  fountain: { label: 'Fountain', w: 2, h: 2, draw(c, W, H, s) {
    const oct = r => { c.beginPath(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; i ? c.lineTo(Math.cos(a) * r, Math.sin(a) * r) : c.moveTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); };
    propShadow(c, s); oct(W * 0.48); c.fillStyle = '#8a8478'; c.fill(); noShadow(c);
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.04); c.stroke();
    oct(W * 0.4); const g = c.createRadialGradient(0, 0, W * 0.05, 0, 0, W * 0.4);
    g.addColorStop(0, '#6ab0d0'); g.addColorStop(1, '#2a5a7a'); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(15,10,5,0.5)'; c.lineWidth = Math.max(0.6, s * 0.025); c.stroke();
    c.strokeStyle = 'rgba(220,240,255,0.35)'; c.lineWidth = Math.max(0.5, s * 0.015);
    for (const r of [0.17, 0.25, 0.33]) { c.beginPath(); c.arc(0, 0, W * r, 0, Math.PI * 2); c.stroke(); }
    c.beginPath(); c.arc(0, 0, W * 0.1, 0, Math.PI * 2); c.fillStyle = '#a8a296'; c.fill(); c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03); c.stroke();
    c.beginPath(); c.arc(0, 0, W * 0.04, 0, Math.PI * 2); c.fillStyle = '#e8f6ff'; c.fill();
  } },
  cart: { label: 'Cart', w: 1, h: 2, draw(c, W, H, s) {
    c.strokeStyle = '#5a3e22'; c.lineWidth = W * 0.06; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-W * 0.14, -H * 0.47); c.lineTo(-W * 0.14, -H * 0.2); c.moveTo(W * 0.14, -H * 0.47); c.lineTo(W * 0.14, -H * 0.2); c.stroke(); c.lineCap = 'butt';
    c.fillStyle = '#2e2218';
    for (const x of [-0.46, 0.36]) c.fillRect(W * x, H * 0.02, W * 0.1, H * 0.26);
    rr(c, -W * 0.36, -H * 0.24, W * 0.72, H * 0.68, W * 0.04); c.fillStyle = '#8a6438'; c.fill();
    c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke();
    c.strokeStyle = 'rgba(40,20,5,0.4)'; c.lineWidth = W * 0.02; c.beginPath();
    for (let i = 1; i < 5; i++) { const y = -H * 0.24 + i * H * 0.68 / 5; c.moveTo(-W * 0.34, y); c.lineTo(W * 0.34, y); } c.stroke();
  } },
  lamp_post: { label: 'Lamp Post', w: 1, h: 1, draw(c, W) {
    noShadow(c);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, W * 0.48);
    g.addColorStop(0, 'rgba(255,220,130,0.45)'); g.addColorStop(1, 'rgba(255,200,100,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, W * 0.48, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#2a2622'; c.fillRect(-W * 0.11, -W * 0.11, W * 0.22, W * 0.22);
    c.fillStyle = '#ffe08a'; c.fillRect(-W * 0.065, -W * 0.065, W * 0.13, W * 0.13);
  } },
  signpost: { label: 'Signpost', w: 1, h: 1, draw(c, W) {
    const board = (ang, len) => {
      c.save(); c.rotate(ang);
      c.beginPath(); c.moveTo(0, -W * 0.07); c.lineTo(len - W * 0.08, -W * 0.07); c.lineTo(len, 0); c.lineTo(len - W * 0.08, W * 0.07); c.lineTo(0, W * 0.07); c.closePath();
      c.fillStyle = '#9a7444'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.03; c.stroke(); c.restore();
    };
    board(-0.4, W * 0.44); board(Math.PI + 0.3, W * 0.4); board(1.9, W * 0.34);
    c.beginPath(); c.arc(0, 0, W * 0.08, 0, Math.PI * 2); c.fillStyle = '#4a3220'; c.fill(); c.stroke();
  } },
  bench: { label: 'Bench', w: 2, h: 1, draw(c, W, H) {
    rr(c, -W * 0.44, -H * 0.18, W * 0.88, H * 0.36, H * 0.05); c.fillStyle = '#8a6438'; c.fill();
    c.strokeStyle = INK; c.lineWidth = H * 0.04; c.stroke();
    c.strokeStyle = 'rgba(40,20,5,0.45)'; c.lineWidth = H * 0.025; c.beginPath();
    for (const y of [-0.06, 0.06]) { c.moveTo(-W * 0.43, H * y); c.lineTo(W * 0.43, H * y); } c.stroke();
  } },
  hay_bale: { label: 'Hay Bale', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.arc(0, 0, W * 0.38, 0, Math.PI * 2); c.fillStyle = '#c8a850'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.035; c.stroke();
    noShadow(c); c.strokeStyle = 'rgba(110,80,20,0.6)'; c.lineWidth = W * 0.025; c.beginPath();
    for (let a = 0; a < Math.PI * 7; a += 0.2) { const r = W * 0.34 * a / (Math.PI * 7); a ? c.lineTo(Math.cos(a) * r, Math.sin(a) * r) : c.moveTo(0, 0); }
    c.stroke();
  } },
  woodpile: { label: 'Woodpile', w: 2, h: 1, draw(c, W, H) {
    [[-0.22, 0], [0, 0], [0.22, 0]].forEach(([y], i) => {
      rr(c, -W * 0.44, H * (y - 0.11), W * 0.88, H * 0.22, H * 0.11);
      c.fillStyle = i % 2 ? '#6a4a2a' : '#7a5632'; c.fill(); c.strokeStyle = INK; c.lineWidth = H * 0.03; c.stroke();
      for (const x of [-0.42, 0.42]) { c.beginPath(); c.arc(W * x, H * y, H * 0.08, 0, Math.PI * 2); c.fillStyle = '#c8a070'; c.fill(); }
    });
  } },
  garden: { label: 'Garden Bed', w: 2, h: 1, draw(c, W, H) {
    rr(c, -W * 0.46, -H * 0.4, W * 0.92, H * 0.8, H * 0.06); c.fillStyle = '#4a3422'; c.fill();
    c.strokeStyle = '#6a5a4e'; c.lineWidth = H * 0.06; c.stroke(); noShadow(c);
    const cols = ['#d8506a', '#e8c050', '#a070d0', '#f0f0e0'];
    for (let i = 0; i < 14; i++) {
      const x = (-0.4 + 0.8 * ((i % 7) + 0.5 * (i >= 7)) / 6.5) * W, y = (i >= 7 ? 0.15 : -0.15) * H;
      c.beginPath(); c.arc(x, y, H * 0.11, 0, Math.PI * 2); c.fillStyle = '#3e6a2e'; c.fill();
      c.beginPath(); c.arc(x, y, H * 0.05, 0, Math.PI * 2); c.fillStyle = cols[i % cols.length]; c.fill();
    }
  } },
  fence: { label: 'Fence', w: 2, h: 1, tile: true, draw(c, W, H, s) {
    const segs = Math.max(1, Math.round(W / s)), ps = s * 0.12, x0 = -W / 2 + ps / 2, span = W - ps;
    c.strokeStyle = '#7a5630'; c.lineWidth = Math.max(1, s * 0.05);
    c.beginPath(); for (const y of [-0.06, 0.06]) { c.moveTo(x0, y * s); c.lineTo(x0 + span, y * s); } c.stroke();
    noShadow(c); c.fillStyle = '#5a3e22'; c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.025);
    for (let k = 0; k <= segs; k++) { const x = x0 + span * k / segs; c.fillRect(x - ps / 2, -ps / 2, ps, ps); c.strokeRect(x - ps / 2, -ps / 2, ps, ps); }
  } },
  bridge: { label: 'Wooden Bridge', w: 2, h: 3, tile: true, draw(c, W, H, s) {
    const rail = s * 0.12, n = Math.max(3, Math.round(H / (s * 0.2)));
    propShadow(c, s); c.fillStyle = '#4a3220'; c.fillRect(-W / 2, -H / 2, W, H); noShadow(c);
    for (let i = 0; i < n; i++) {
      c.fillStyle = shade('#8a6438', 0.85 + pn(i, 31) * 0.3);
      c.fillRect(-W / 2 + rail, -H / 2 + i * H / n + 0.6, W - rail * 2, H / n - 1.2);
    }
    c.fillStyle = '#5a3e22'; c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.025);
    for (const x of [-W / 2, W / 2 - rail]) {
      c.fillRect(x, -H / 2, rail, H); c.strokeRect(x, -H / 2, rail, H);
      for (let k = 0; k <= Math.round(H / s); k++) { const y = Math.min(H / 2 - rail, -H / 2 + k * s); c.fillStyle = '#3a2814'; c.fillRect(x, y, rail, rail); c.fillStyle = '#5a3e22'; }
    }
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.04); c.strokeRect(-W / 2, -H / 2, W, H);
  } },

  // ── Fortifications ── (gates sit across a gap in a wall; resize to fit the gap)
  gate_wood: { label: 'Wooden Gate', w: 2, h: 1, tile: true, draw(c, W, H, s) {
    const [x0, x1] = gateJambs(c, W, H, s), dh = Math.min(H, s) * 0.34;
    c.fillStyle = '#7a5230'; c.fillRect(x0, -dh / 2, x1 - x0, dh);
    c.strokeStyle = 'rgba(30,15,5,0.5)'; c.lineWidth = Math.max(0.5, s * 0.02); c.beginPath();
    for (let x = x0 + s * 0.14; x < x1; x += s * 0.14) { c.moveTo(x, -dh / 2); c.lineTo(x, dh / 2); } c.stroke();
    c.strokeStyle = '#2a2622'; c.lineWidth = Math.max(1, s * 0.04); c.beginPath();
    for (const y of [-0.28, 0.28]) { c.moveTo(x0, y * dh); c.lineTo(x1, y * dh); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.strokeRect(x0, -dh / 2, x1 - x0, dh);
    c.beginPath(); c.moveTo(0, -dh / 2); c.lineTo(0, dh / 2); c.stroke();
    c.fillStyle = '#c9a84c'; for (const x of [-s * 0.08, s * 0.08]) { c.beginPath(); c.arc(x, 0, s * 0.035, 0, Math.PI * 2); c.fill(); }
  } },
  portcullis: { label: 'Portcullis', w: 2, h: 1, tile: true, draw(c, W, H, s) {
    const [x0, x1] = gateJambs(c, W, H, s), dh = Math.min(H, s) * 0.22;
    c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(x0, -dh / 2, x1 - x0, dh);
    c.strokeStyle = '#2a2a2e'; c.lineWidth = Math.max(1, s * 0.05);
    c.beginPath(); for (const y of [-dh / 2, dh / 2]) { c.moveTo(x0, y); c.lineTo(x1, y); } c.stroke();
    const n = Math.max(2, Math.round((x1 - x0) / (s * 0.16)));
    c.lineWidth = Math.max(1, s * 0.06); c.beginPath();
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; c.moveTo(x, -dh * 0.8); c.lineTo(x, dh * 0.8); } c.stroke();
    c.strokeStyle = 'rgba(200,205,215,0.4)'; c.lineWidth = Math.max(0.5, s * 0.015); c.beginPath();
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n - s * 0.012; c.moveTo(x, -dh * 0.8); c.lineTo(x, dh * 0.8); } c.stroke();
  } },
  drawbridge: { label: 'Drawbridge', w: 2, h: 3, tile: true, draw(c, W, H, s) {
    // The top edge is hinged to the gate; chains run up from the outer corners
    const beam = s * 0.14, n = Math.max(4, Math.round(H / (s * 0.22)));
    propShadow(c, s); c.fillStyle = '#4a3220'; c.fillRect(-W / 2, -H / 2, W, H); noShadow(c);
    for (let i = 0; i < n; i++) {
      c.fillStyle = shade('#7a5632', 0.85 + pn(i, 41) * 0.3);
      c.fillRect(-W / 2 + beam, -H / 2 + i * H / n + 0.6, W - beam * 2, H / n - 1.2);
    }
    c.fillStyle = '#3a2814'; c.fillRect(-W / 2, -H / 2, beam, H); c.fillRect(W / 2 - beam, -H / 2, beam, H);
    c.strokeStyle = '#2a2622'; c.lineWidth = Math.max(1, s * 0.05); c.beginPath();
    for (const y of [-H / 2 + s * 0.3, H / 2 - s * 0.3]) { c.moveTo(-W / 2, y); c.lineTo(W / 2, y); } c.stroke();
    // Chains
    c.strokeStyle = '#8a8a90'; c.lineWidth = Math.max(0.6, s * 0.025);
    for (const x of [-W / 2 + beam / 2, W / 2 - beam / 2]) {
      for (let y = H / 2 - s * 0.2; y > -H / 2; y -= s * 0.12) { c.beginPath(); c.ellipse(x, y, s * 0.03, s * 0.055, 0, 0, Math.PI * 2); c.stroke(); }
    }
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.045); c.strokeRect(-W / 2, -H / 2, W, H);
  } },
  gatehouse: { label: 'Gatehouse', w: 4, h: 2, tile: true, draw(c, W, H, s) {
    const tw = Math.min(W * 0.34, s * 1.5), px0 = -W / 2 + tw, px1 = W / 2 - tw;
    // Covered passage between the towers, with a portcullis and murder holes
    propShadow(c, s); c.fillStyle = '#5a564e'; c.fillRect(px0, -H / 2 + s * 0.1, px1 - px0, H - s * 0.2); noShadow(c);
    stoneFloor(c, px0, -H / 2 + s * 0.1, px1 - px0, H - s * 0.2, s, '#5a564e');
    crenelRect(c, px0, -H / 2 + s * 0.1, px1 - px0, H - s * 0.2, s);
    c.fillStyle = '#141210';
    for (let x = px0 + s * 0.45; x < px1 - s * 0.3; x += s * 0.5) { c.fillRect(x - s * 0.06, -s * 0.06, s * 0.12, s * 0.12); }
    c.strokeStyle = '#2a2a2e'; c.lineWidth = Math.max(1, s * 0.06);
    c.beginPath(); c.moveTo(px0, H / 2 - s * 0.32); c.lineTo(px1, H / 2 - s * 0.32); c.stroke();
    squareTower(c, -W / 2, -H / 2, tw, H, s); squareTower(c, W / 2 - tw, -H / 2, tw, H, s);
  } },
  guard_tower: { label: 'Guard Tower', w: 2, h: 2, tile: true, draw(c, W, H, s) {
    squareTower(c, -W / 2, -H / 2, W, H, s);
    // Trapdoor down into the tower
    const t = s * 0.36, x = W / 2 - s * 0.3 - t, y = H / 2 - s * 0.3 - t;
    c.fillStyle = '#6a4a2a'; c.fillRect(x, y, t, t); c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03); c.strokeRect(x, y, t, t);
    c.beginPath(); c.moveTo(x + t / 2, y); c.lineTo(x + t / 2, y + t); c.stroke();
  } },
  round_watchtower: { label: 'Round Watchtower', w: 2, h: 2, draw(c, W, H, s) {
    const R = W * 0.47;
    propShadow(c, s); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fillStyle = FORT_STONE; c.fill(); noShadow(c);
    c.save(); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.clip(); stoneFloor(c, -R, -R, R * 2, R * 2, s, FORT_STONE); c.restore();
    // Stairwell opening
    c.fillStyle = '#141210'; c.beginPath(); c.arc(R * 0.25, R * 0.25, R * 0.22, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(200,190,170,0.4)'; c.lineWidth = Math.max(0.5, s * 0.02); c.beginPath();
    for (let k = 0; k < 4; k++) { const a = k * 0.7; c.moveTo(R * 0.25, R * 0.25); c.lineTo(R * 0.25 + Math.cos(a) * R * 0.22, R * 0.25 + Math.sin(a) * R * 0.22); } c.stroke();
    crenelRing(c, R, s);
  } },
  watchtower_wood: { label: 'Wooden Watchtower', w: 2, h: 2, draw(c, W, H, s) {
    const h = W * 0.44, post = s * 0.16;
    propShadow(c, s); c.fillStyle = '#5a3e22'; c.fillRect(-h, -h, h * 2, h * 2); noShadow(c);
    for (let i = 0; i < 8; i++) { c.fillStyle = shade('#8a6438', 0.85 + pn(i, 51) * 0.3); c.fillRect(-h, -h + i * h / 4 + 0.5, h * 2, h / 4 - 1); }
    c.strokeStyle = '#4a3220'; c.lineWidth = Math.max(1, s * 0.07); c.strokeRect(-h + post / 2, -h + post / 2, h * 2 - post, h * 2 - post);
    c.fillStyle = '#3a2814'; c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.025);
    for (const x of [-h, 0 - post / 2, h - post]) for (const y of [-h, 0 - post / 2, h - post]) {
      if (x === -post / 2 && y === -post / 2) continue;
      c.fillRect(x, y, post, post); c.strokeRect(x, y, post, post);
    }
    // Ladder hatch
    c.fillStyle = '#141210'; c.fillRect(-s * 0.2, h * 0.2, s * 0.4, s * 0.45);
    c.strokeStyle = '#8a6438'; c.lineWidth = Math.max(0.8, s * 0.04); c.beginPath();
    for (let k = 1; k < 4; k++) { c.moveTo(-s * 0.2, h * 0.2 + k * s * 0.11); c.lineTo(s * 0.2, h * 0.2 + k * s * 0.11); } c.stroke();
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.045); c.strokeRect(-h, -h, h * 2, h * 2);
  } },
  sorcerer_tower: { label: 'Sorcerer Tower', w: 3, h: 3, draw(c, W, H, s) {
    const R = W * 0.48;
    propShadow(c, s * 1.5); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fillStyle = '#4a4650'; c.fill(); noShadow(c);
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.stroke();
    // Steep violet cone (drawn inside the stone ring), dusted with gold stars
    c.save(); c.scale(0.9, 0.9); drawCone(c, W, s, '#4a2a7a', 'slate'); c.restore();
    c.fillStyle = 'rgba(240,210,120,0.85)';
    for (let i = 0; i < 9; i++) {
      const a = pn(i, 61) * Math.PI * 2, r = R * (0.25 + 0.55 * pn(i, 62));
      fourStar(c, Math.cos(a) * r, Math.sin(a) * r, s * (0.06 + 0.05 * pn(i, 63)));
    }
    // Glowing orb finial
    const g = c.createRadialGradient(0, 0, 0, 0, 0, R * 0.35);
    g.addColorStop(0, 'rgba(220,200,255,0.95)'); g.addColorStop(0.25, 'rgba(170,120,255,0.6)'); g.addColorStop(1, 'rgba(140,90,255,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, R * 0.35, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#f4eeff'; c.beginPath(); c.arc(0, 0, s * 0.1, 0, Math.PI * 2); c.fill();
  } },
  arcane_spire: { label: 'Arcane Spire', w: 3, h: 3, draw(c, W, H, s) {
    // Open tower top: a glowing summoning circle around a floating crystal
    const R = W * 0.46;
    propShadow(c, s * 1.5); c.beginPath();
    for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, r = i % 2 ? R : R * 1.06; i ? c.lineTo(Math.cos(a) * r, Math.sin(a) * r) : c.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    c.closePath(); c.fillStyle = '#3a3640'; c.fill(); noShadow(c); c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.stroke();
    c.beginPath(); c.arc(0, 0, R * 0.86, 0, Math.PI * 2); c.fillStyle = '#1e1c26'; c.fill(); c.stroke();
    c.shadowColor = 'rgba(150,110,255,0.9)'; c.shadowBlur = s * 0.3;
    c.strokeStyle = 'rgba(190,160,255,0.9)'; c.lineWidth = Math.max(0.8, s * 0.035);
    for (const r of [0.74, 0.6]) { c.beginPath(); c.arc(0, 0, R * r, 0, Math.PI * 2); c.stroke(); }
    c.beginPath();
    for (let t = 0; t < 2; t++) for (let i = 0; i <= 3; i++) {
      const a = -Math.PI / 2 + t * Math.PI / 3 + i * Math.PI * 2 / 3, x = Math.cos(a) * R * 0.6, y = Math.sin(a) * R * 0.6;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
    c.fillStyle = 'rgba(200,180,255,0.9)';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.beginPath(); c.arc(Math.cos(a) * R * 0.67, Math.sin(a) * R * 0.67, s * 0.035, 0, Math.PI * 2); c.fill(); }
    // Crystal
    c.shadowBlur = s * 0.5;
    c.beginPath(); c.moveTo(0, -s * 0.38); c.lineTo(s * 0.18, 0); c.lineTo(0, s * 0.38); c.lineTo(-s * 0.18, 0); c.closePath();
    const g = c.createLinearGradient(-s * 0.18, -s * 0.38, s * 0.18, s * 0.38); g.addColorStop(0, '#f0e8ff'); g.addColorStop(1, '#7a4ad8');
    c.fillStyle = g; c.fill(); noShadow(c); c.strokeStyle = 'rgba(40,20,80,0.8)'; c.lineWidth = Math.max(0.6, s * 0.02); c.stroke();
    c.beginPath(); c.moveTo(0, -s * 0.38); c.lineTo(0, s * 0.38); c.moveTo(-s * 0.18, 0); c.lineTo(s * 0.18, 0); c.stroke();
  } },
  ballista: { label: 'Ballista', w: 1, h: 1, draw(c, W) {
    // Points toward the top edge
    c.fillStyle = '#6a4a2a'; c.fillRect(-W * 0.06, -W * 0.42, W * 0.12, W * 0.8);
    c.strokeStyle = INK; c.lineWidth = W * 0.03; c.strokeRect(-W * 0.06, -W * 0.42, W * 0.12, W * 0.8);
    c.strokeStyle = '#4a3220'; c.lineWidth = W * 0.07; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-W * 0.44, -W * 0.05); c.quadraticCurveTo(0, -W * 0.34, W * 0.44, -W * 0.05); c.stroke(); c.lineCap = 'butt';
    c.strokeStyle = '#d8d0bc'; c.lineWidth = W * 0.015;
    c.beginPath(); c.moveTo(-W * 0.44, -W * 0.05); c.lineTo(0, W * 0.18); c.lineTo(W * 0.44, -W * 0.05); c.stroke();
    c.strokeStyle = '#b8bcc4'; c.lineWidth = W * 0.03; c.beginPath(); c.moveTo(0, W * 0.18); c.lineTo(0, -W * 0.48); c.stroke();
    c.fillStyle = '#b8bcc4'; c.beginPath(); c.moveTo(0, -W * 0.5); c.lineTo(W * 0.05, -W * 0.4); c.lineTo(-W * 0.05, -W * 0.4); c.closePath(); c.fill();
  } },
  catapult: { label: 'Catapult', w: 2, h: 2, draw(c, W) {
    const h = W * 0.36;
    c.fillStyle = '#2a2018';
    for (const [x, y] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) c.fillRect(x * h - (x > 0 ? W * 0.03 : W * 0.07), y * h * 0.75 - W * 0.09, W * 0.1, W * 0.18);
    c.fillStyle = '#6a4a2a'; c.strokeStyle = INK; c.lineWidth = W * 0.015;
    for (const x of [-h * 0.8, h * 0.8 - W * 0.06]) { c.fillRect(x, -h, W * 0.06, h * 2); c.strokeRect(x, -h, W * 0.06, h * 2); }
    for (const y of [-h * 0.9, h * 0.5]) { c.fillRect(-h * 0.8, y, h * 1.6, W * 0.05); c.strokeRect(-h * 0.8, y, h * 1.6, W * 0.05); }
    // Throwing arm with its bucket toward the top
    c.fillStyle = '#8a6438'; c.fillRect(-W * 0.03, -h * 0.75, W * 0.06, h * 1.4); c.strokeRect(-W * 0.03, -h * 0.75, W * 0.06, h * 1.4);
    c.beginPath(); c.arc(0, -h * 0.8, W * 0.08, 0, Math.PI * 2); c.fillStyle = '#5a3e22'; c.fill(); c.stroke();
    c.beginPath(); c.arc(0, -h * 0.8, W * 0.05, 0, Math.PI * 2); c.fillStyle = '#7a766c'; c.fill();
  } },
  barricade: { label: 'Spiked Barricade', w: 2, h: 1, tile: true, draw(c, W, H, s) {
    c.strokeStyle = '#5a3e22'; c.lineCap = 'round';
    const n = Math.max(2, Math.round(W / (s * 0.5)));
    for (let i = 0; i < n; i++) {
      const x = -W / 2 + (i + 0.5) * W / n, d = s * 0.3;
      c.lineWidth = Math.max(1, s * 0.06);
      c.beginPath(); c.moveTo(x - d, -d); c.lineTo(x + d, d); c.moveTo(x + d, -d); c.lineTo(x - d, d); c.stroke();
      c.fillStyle = '#d8c8a0';
      for (const [px, py] of [[x - d, -d], [x + d, d], [x + d, -d], [x - d, d]]) { c.beginPath(); c.arc(px, py, s * 0.025, 0, Math.PI * 2); c.fill(); }
    }
    c.lineWidth = Math.max(1, s * 0.1); c.strokeStyle = '#6a4a2a';
    c.beginPath(); c.moveTo(-W / 2 + s * 0.08, 0); c.lineTo(W / 2 - s * 0.08, 0); c.stroke(); c.lineCap = 'butt';
  } },
  banner: { label: 'War Banner', w: 1, h: 1, draw(c, W) {
    c.beginPath(); c.moveTo(-W * 0.3, -W * 0.06);
    c.bezierCurveTo(-W * 0.1, -W * 0.2, W * 0.1, W * 0.02, W * 0.42, -W * 0.1);
    c.lineTo(W * 0.32, W * 0.02); c.lineTo(W * 0.44, W * 0.14);
    c.bezierCurveTo(W * 0.1, W * 0.24, -W * 0.1, W * 0.04, -W * 0.3, W * 0.16); c.closePath();
    c.fillStyle = '#8a1e24'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.025; c.stroke();
    noShadow(c); c.fillStyle = '#e0c060'; fourStar(c, W * 0.02, W * 0.04, W * 0.08);
    c.beginPath(); c.arc(-W * 0.3, W * 0.05, W * 0.07, 0, Math.PI * 2); c.fillStyle = '#3a2814'; c.fill(); c.stroke();
    c.beginPath(); c.arc(-W * 0.3, W * 0.05, W * 0.03, 0, Math.PI * 2); c.fillStyle = '#c9a84c'; c.fill();
  } },
  archery_target: { label: 'Archery Target', w: 1, h: 1, draw(c, W) {
    [['#e8e0d0', 0.4], ['#2a2a2a', 0.32], ['#3a6aa8', 0.24], ['#b83a32', 0.16], ['#e8c050', 0.08]].forEach(([col, r], i) => {
      c.beginPath(); c.arc(0, 0, W * r, 0, Math.PI * 2); c.fillStyle = col; c.fill();
      if (!i) { c.strokeStyle = INK; c.lineWidth = W * 0.03; c.stroke(); noShadow(c); }
    });
    c.strokeStyle = '#6a4a2a'; c.lineWidth = W * 0.02; c.beginPath();
    for (const [x, y] of [[0.06, -0.1], [-0.14, 0.05], [0.18, 0.12]]) { c.moveTo(W * x, W * y); c.lineTo(W * x + W * 0.1, W * y - W * 0.1); } c.stroke();
  } },
  training_dummy: { label: 'Training Dummy', w: 1, h: 1, draw(c, W) {
    c.strokeStyle = '#6a4a2a'; c.lineWidth = W * 0.09; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-W * 0.34, 0); c.lineTo(W * 0.34, 0); c.stroke(); c.lineCap = 'butt';
    c.beginPath(); c.ellipse(0, W * 0.02, W * 0.2, W * 0.14, 0, 0, Math.PI * 2); c.fillStyle = '#c8a860'; c.fill();
    c.strokeStyle = INK; c.lineWidth = W * 0.03; c.stroke();
    c.beginPath(); c.arc(0, -W * 0.02, W * 0.12, 0, Math.PI * 2); c.fillStyle = '#d8bc78'; c.fill(); c.stroke();
    c.strokeStyle = 'rgba(80,50,10,0.6)'; c.lineWidth = W * 0.02; c.beginPath(); c.moveTo(-W * 0.18, W * 0.08); c.lineTo(W * 0.18, W * 0.08); c.stroke();
  } },

  // ── Shops & guilds ── (each roof carries a sign showing the trade)
  general_store: { label: 'General Store', w: 3, h: 2, ...shop({ color: '#7a5a3a', pattern: 'shingle', chimneys: [[0.32, -0.25]] }, 'sack') },
  alchemist:     { label: 'Alchemist', w: 2, h: 2, ...shop({ color: '#3a5a4a', pattern: 'slate', hip: true, chimneys: [[0.27, -0.27]], glow: '110,230,120' }, 'flask') },
  blacksmith:    { label: 'Blacksmith', w: 2, h: 3, ...shop({ color: '#4a4440', pattern: 'slate', chimneys: [[0.25, 0.32]], glow: '255,140,40' }, 'anvil') },
  magic_shop:    { label: 'Magic Shop', w: 2, h: 2, ...shop({ color: '#3a2a6a', pattern: 'tile', hip: true, chimneys: [[-0.27, 0.27]], glow: '170,120,255' }, 'star') },
  bookshop:      { label: 'Bookshop / Library', w: 2, h: 3, ...shop({ color: '#6a3a2a', pattern: 'tile', chimneys: [[-0.25, -0.32]] }, 'book') },
  bank:          { label: 'Bank / Moneylender', w: 3, h: 3, ...shop({ color: '#5a5a62', pattern: 'slate', hip: true }, 'coins') },
  guild_hall:    { label: 'Guild Hall', w: 4, h: 3, ...shop({ color: '#7a2a2a', pattern: 'tile', hip: true, chimneys: [[-0.32, -0.25], [0.32, 0.25]] }, 'shield') },
  stable:        { label: 'Stable', w: 3, h: 2, ...shop({ color: '#a8884a', pattern: 'thatch' }, 'horseshoe') },
  warehouse:     { label: 'Warehouse', w: 4, h: 3, ...shop({ color: '#5a4a3a', pattern: 'shingle' }, 'crate') },

  // ── Transport ── (bows and engines face the top edge)
  ship: { label: 'Sailing Ship', w: 3, h: 7, draw(c, W, H, s) {
    c.strokeStyle = '#5a3e22'; c.lineWidth = Math.max(1, s * 0.07); c.beginPath(); c.moveTo(0, -H * 0.42); c.lineTo(0, -H / 2); c.stroke();
    drawDeck(c, W * 0.66, H * 0.94, s, '#5a3a1e', '#a07a4a');
    c.fillStyle = 'rgba(255,240,210,0.12)'; c.fillRect(-W, H * 0.28, W * 2, H);
    c.strokeStyle = 'rgba(30,15,5,0.6)'; c.lineWidth = Math.max(0.8, s * 0.04); c.beginPath(); c.moveTo(-W, H * 0.28); c.lineTo(W, H * 0.28); c.stroke();
    c.restore();
    grate(c, -s * 0.3, -H * 0.06, s * 0.6, s * 0.45, s); grate(c, -s * 0.25, H * 0.16, s * 0.5, s * 0.4, s);
    shipWheel(c, 0, H * 0.37, s * 0.12);
    sail(c, -H * 0.2, W * 0.92, s * 0.5, s); sail(c, H * 0.06, W * 0.98, s * 0.55, s);
    c.fillStyle = '#4a3220';
    for (const y of [-H * 0.2, H * 0.06]) { c.beginPath(); c.arc(0, y, s * 0.1, 0, Math.PI * 2); c.fill(); }
  } },
  rowboat: { label: 'Rowboat', w: 1, h: 2, draw(c, W, H, s) {
    c.strokeStyle = '#8a6438'; c.lineWidth = Math.max(1, s * 0.05); c.lineCap = 'round'; c.beginPath();
    for (const d of [-1, 1]) { c.moveTo(d * W * 0.2, 0); c.lineTo(d * W * 0.48, H * 0.12); } c.stroke(); c.lineCap = 'butt';
    drawDeck(c, W * 0.72, H * 0.94, s, '#5a3a1e', '#8a6438'); c.restore();
    c.fillStyle = '#5a3e22'; for (const y of [-0.08, 0.18]) c.fillRect(-W * 0.3, H * y, W * 0.6, s * 0.1);
  } },
  airship: { label: 'Airship', w: 4, h: 7, draw(c, W, H, s) {
    // Canvas wings and steam propellers, then the deck, then the gas envelope overhead (dashed)
    c.fillStyle = '#c8b48a'; c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03);
    for (const d of [-1, 1]) {
      c.beginPath(); c.moveTo(d * W * 0.2, -H * 0.06); c.lineTo(d * W * 0.49, H * 0.02); c.lineTo(d * W * 0.49, H * 0.12); c.lineTo(d * W * 0.2, H * 0.16); c.closePath();
      c.fill(); c.stroke();
      c.beginPath(); for (let i = 1; i < 4; i++) { const x = d * (W * 0.2 + W * 0.29 * i / 4); c.moveTo(x, -H * 0.06 + H * 0.08 * i / 4); c.lineTo(x, H * 0.16 - H * 0.04 * i / 4); } c.stroke();
      c.strokeStyle = '#4a4440'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.moveTo(d * W * 0.18, H * 0.34); c.lineTo(d * W * 0.38, H * 0.38); c.stroke();
      c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03);
      propeller(c, d * W * 0.38, H * 0.4, s * 0.4);
    }
    drawDeck(c, W * 0.46, H * 0.9, s, '#4a3020', '#9a7448'); c.restore();
    c.fillStyle = '#6a5a4a'; c.fillRect(-s * 0.45, H * 0.18, s * 0.9, s * 0.6); c.strokeStyle = INK; c.strokeRect(-s * 0.45, H * 0.18, s * 0.9, s * 0.6);
    c.fillStyle = '#b08a3a'; for (const x of [-0.22, 0.22]) { c.beginPath(); c.arc(x * s, H * 0.18 + s * 0.3, s * 0.15, 0, Math.PI * 2); c.fill(); c.stroke(); }
    grate(c, -s * 0.3, -H * 0.12, s * 0.6, s * 0.45, s); shipWheel(c, 0, H * 0.36, s * 0.12);
    propeller(c, 0, H * 0.44, s * 0.3);
    c.setLineDash([s * 0.15, s * 0.1]);
    c.beginPath(); c.ellipse(0, -H * 0.03, W * 0.34, H * 0.44, 0, 0, Math.PI * 2);
    c.fillStyle = 'rgba(215,195,150,0.16)'; c.fill(); c.strokeStyle = 'rgba(240,230,205,0.8)'; c.lineWidth = Math.max(0.8, s * 0.04); c.stroke();
    c.strokeStyle = 'rgba(240,230,205,0.4)'; c.lineWidth = Math.max(0.5, s * 0.02);
    for (const f of [0.33, 0.66]) { c.beginPath(); c.ellipse(0, -H * 0.03, W * 0.34 * f, H * 0.44, 0, 0, Math.PI * 2); c.stroke(); }
    c.setLineDash([]);
  } },
  airship_dock: { label: 'Airship Docking Tower', w: 3, h: 3, draw(c, W, H, s) {
    const R = W * 0.46;
    propShadow(c, s * 1.5); c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fillStyle = '#5a564e'; c.fill(); noShadow(c);
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.stroke();
    c.beginPath(); c.arc(0, 0, R * 0.9, 0, Math.PI * 2); c.fillStyle = '#8a6438'; c.fill();
    c.strokeStyle = 'rgba(40,20,5,0.4)'; c.lineWidth = Math.max(0.5, s * 0.02); c.beginPath();
    for (let i = 0; i < 32; i++) { const a = i * Math.PI / 16; c.moveTo(Math.cos(a) * R * 0.25, Math.sin(a) * R * 0.25); c.lineTo(Math.cos(a) * R * 0.9, Math.sin(a) * R * 0.9); }
    c.stroke();
    // Gangway out to the top edge, where a docked airship ties up
    c.fillStyle = '#7a5632'; c.fillRect(-s * 0.24, -H / 2, s * 0.48, H / 2);
    c.strokeStyle = 'rgba(40,20,5,0.45)'; c.beginPath();
    for (let y = -H / 2; y < 0; y += s * 0.15) { c.moveTo(-s * 0.24, y); c.lineTo(s * 0.24, y); } c.stroke();
    c.strokeStyle = '#3a2814'; c.lineWidth = Math.max(1, s * 0.05); c.beginPath();
    for (const x of [-s * 0.24, s * 0.24]) { c.moveTo(x, -H / 2); c.lineTo(x, -R * 0.5); } c.stroke();
    c.beginPath(); c.arc(0, 0, R * 0.9, -Math.PI / 2 + 0.17, Math.PI * 1.5 - 0.17); c.stroke();
    c.fillStyle = '#3a2814'; for (let i = 0; i < 24; i++) { const a = -Math.PI / 2 + 0.26 + i * (Math.PI * 2 - 0.52) / 23; c.beginPath(); c.arc(Math.cos(a) * R * 0.9, Math.sin(a) * R * 0.9, s * 0.04, 0, Math.PI * 2); c.fill(); }
    // Lattice mooring mast with a brass cone
    const m = s * 0.42;
    c.fillStyle = '#3a3a40'; c.fillRect(-m, -m, m * 2, m * 2);
    c.strokeStyle = '#8a8a90'; c.lineWidth = Math.max(0.6, s * 0.03); c.strokeRect(-m, -m, m * 2, m * 2);
    c.beginPath(); c.moveTo(-m, -m); c.lineTo(m, m); c.moveTo(m, -m); c.lineTo(-m, m); c.stroke();
    const g = c.createRadialGradient(-s * 0.05, -s * 0.05, 0, 0, 0, s * 0.22); g.addColorStop(0, '#f0d890'); g.addColorStop(1, '#8a6a2a');
    c.beginPath(); c.arc(0, 0, s * 0.22, 0, Math.PI * 2); c.fillStyle = g; c.fill(); c.strokeStyle = INK; c.stroke();
    for (const a of [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75]) chimneyGlow(c, Math.cos(a) * R * 0.78, Math.sin(a) * R * 0.78, s * 0.3, '255,210,120');
  } },
  submersible: { label: 'Submersible', w: 2, h: 5, draw(c, W, H, s) {
    const hw = W * 0.3, top = -H * 0.46, bot = H * 0.4;
    c.fillStyle = '#2a4444'; c.strokeStyle = INK; c.lineWidth = Math.max(0.8, s * 0.03);
    for (const d of [-1, 1]) {
      c.beginPath(); c.moveTo(d * hw * 0.9, -H * 0.32); c.lineTo(d * W * 0.48, -H * 0.27); c.lineTo(d * hw * 0.9, -H * 0.22); c.closePath(); c.fill(); c.stroke();
    }
    c.fillRect(-W * 0.4, bot - s * 0.1, W * 0.8, s * 0.16); c.strokeRect(-W * 0.4, bot - s * 0.1, W * 0.8, s * 0.16);
    propShadow(c, s); rr(c, -hw, top, hw * 2, bot - top, hw);
    const g = c.createLinearGradient(-hw, 0, hw, 0);
    g.addColorStop(0, '#1e3434'); g.addColorStop(0.35, '#6a9090'); g.addColorStop(1, '#1a2c2c');
    c.fillStyle = g; c.fill(); noShadow(c); c.lineWidth = Math.max(1, s * 0.045); c.stroke();
    c.save(); c.clip();
    c.strokeStyle = 'rgba(10,20,20,0.5)'; c.lineWidth = Math.max(0.5, s * 0.02); c.fillStyle = '#b08a3a';
    for (let y = top + s * 0.5; y < bot; y += s * 0.55) {
      c.beginPath(); c.moveTo(-hw, y); c.lineTo(hw, y); c.stroke();
      for (let x = -hw + s * 0.1; x < hw; x += s * 0.16) { c.beginPath(); c.arc(x, y + s * 0.05, Math.max(0.5, s * 0.015), 0, Math.PI * 2); c.fill(); }
    }
    c.restore();
    // Glowing portholes along both sides
    for (let y = top + s * 0.7; y < bot - s * 0.4; y += s * 0.5) for (const d of [-1, 1]) {
      c.beginPath(); c.arc(d * hw * 0.72, y, s * 0.07, 0, Math.PI * 2); c.fillStyle = '#ffd870'; c.fill();
      c.strokeStyle = '#b08a3a'; c.lineWidth = Math.max(0.5, s * 0.025); c.stroke();
    }
    c.beginPath(); c.ellipse(0, -H * 0.12, hw * 0.5, H * 0.12, 0, 0, Math.PI * 2); c.fillStyle = '#4a6a6a'; c.fill();
    c.strokeStyle = '#b08a3a'; c.lineWidth = Math.max(0.8, s * 0.04); c.stroke();
    c.beginPath(); c.arc(0, -H * 0.15, hw * 0.3, 0, Math.PI * 2); c.fillStyle = '#2a3a3a'; c.fill(); c.stroke();
    c.beginPath(); c.arc(0, -H * 0.05, s * 0.06, 0, Math.PI * 2); c.fillStyle = '#1a1a1a'; c.fill();
    propeller(c, 0, H * 0.44, s * 0.4, 4);
  } },
  rail: { label: 'Railroad Track', w: 1, h: 3, tile: true, draw(c, W, H, s) { noShadow(c); railTrack(c, H, s); } },
  rail_curve: { label: 'Railroad Curve', w: 3, h: 3, draw(c, W, H, s) {
    // Joins a track entering the bottom of the left column to one leaving the right of the top row
    const u = W / 3, cx = W / 2, cy = H / 2, R = 2.5 * u, a0 = Math.PI, a1 = Math.PI * 1.5;
    noShadow(c);
    const band = (r0, r1, col) => { c.beginPath(); c.arc(cx, cy, r1, a0, a1); c.arc(cx, cy, r0, a1, a0, true); c.closePath(); c.fillStyle = col; c.fill(); };
    band(R - 0.42 * u, R + 0.42 * u, '#6a6458');
    c.strokeStyle = '#5a3e22'; c.lineWidth = Math.max(1, u * 0.11);
    const step = 0.3 * u / R;
    for (let a = a0 + step / 2; a < a1; a += step) {
      c.beginPath(); c.moveTo(cx + Math.cos(a) * (R - 0.36 * u), cy + Math.sin(a) * (R - 0.36 * u)); c.lineTo(cx + Math.cos(a) * (R + 0.36 * u), cy + Math.sin(a) * (R + 0.36 * u)); c.stroke();
    }
    for (const r of [R - 0.22 * u, R + 0.22 * u]) {
      c.strokeStyle = '#2a2a2e'; c.lineWidth = Math.max(1, u * 0.08); c.beginPath(); c.arc(cx, cy, r, a0, a1); c.stroke();
      c.strokeStyle = '#b8bcc4'; c.lineWidth = Math.max(0.6, u * 0.035); c.beginPath(); c.arc(cx, cy, r, a0, a1); c.stroke();
    }
  } },
  locomotive: { label: 'Steam Locomotive', w: 1, h: 3, draw(c, W, H, s) {
    propShadow(c, s); c.fillStyle = '#2a2a2a'; c.fillRect(-W * 0.4, -H * 0.42, W * 0.8, H * 0.86); noShadow(c);
    c.beginPath(); c.moveTo(-W * 0.36, -H * 0.42); c.lineTo(W * 0.36, -H * 0.42); c.lineTo(0, -H * 0.5); c.closePath(); c.fillStyle = '#6a6a6a'; c.fill();
    c.strokeStyle = INK; c.lineWidth = Math.max(0.6, s * 0.025); c.stroke();
    rr(c, -W * 0.3, -H * 0.42, W * 0.6, H * 0.56, W * 0.12);
    const g = c.createLinearGradient(-W * 0.3, 0, W * 0.3, 0); g.addColorStop(0, '#1a2a22'); g.addColorStop(0.4, '#3e5e4a'); g.addColorStop(1, '#16241c');
    c.fillStyle = g; c.fill(); c.stroke();
    c.strokeStyle = '#b08a3a'; c.lineWidth = Math.max(0.6, s * 0.03); c.beginPath();
    for (const y of [-0.22, -0.02]) { c.moveTo(-W * 0.3, H * y); c.lineTo(W * 0.3, H * y); } c.stroke();
    c.beginPath(); c.arc(0, -H * 0.32, W * 0.18, 0, Math.PI * 2); c.fillStyle = '#1a1a1a'; c.fill(); c.strokeStyle = INK; c.stroke();
    c.beginPath(); c.arc(0, -H * 0.32, W * 0.1, 0, Math.PI * 2); c.fillStyle = '#000'; c.fill();
    c.beginPath(); c.arc(0, -H * 0.1, W * 0.12, 0, Math.PI * 2); c.fillStyle = '#b08a3a'; c.fill(); c.stroke();
    c.fillStyle = '#ffe08a'; c.beginPath(); c.arc(0, -H * 0.445, W * 0.06, 0, Math.PI * 2); c.fill();
    rr(c, -W * 0.42, H * 0.14, W * 0.84, H * 0.3, W * 0.06); c.fillStyle = '#6a2a24'; c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(-W * 0.42, H * 0.14, W * 0.42, H * 0.3);
  } },
  rail_wagon: { label: 'Freight Wagon', w: 1, h: 2, draw(c, W, H, s) {
    c.fillStyle = '#2a2a2a'; for (const y of [-0.5, 0.46]) c.fillRect(-W * 0.06, H * y, W * 0.12, H * 0.04);
    propShadow(c, s); c.fillStyle = '#6a4a2a'; c.fillRect(-W * 0.4, -H * 0.46, W * 0.8, H * 0.92); noShadow(c);
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.04); c.strokeRect(-W * 0.4, -H * 0.46, W * 0.8, H * 0.92);
    c.fillStyle = '#1e1c1a'; c.fillRect(-W * 0.32, -H * 0.42, W * 0.64, H * 0.84);
    for (let i = 0; i < 14; i++) { c.fillStyle = pn(i, 91) < 0.5 ? '#3a3836' : '#2a2826'; c.beginPath(); c.arc((pn(i, 92) - 0.5) * W * 0.5, (pn(i, 93) - 0.5) * H * 0.75, W * 0.1, 0, Math.PI * 2); c.fill(); }
  } },
  minecart: { label: 'Minecart', w: 1, h: 1, draw(c, W) {
    rr(c, -W * 0.32, -W * 0.38, W * 0.64, W * 0.76, W * 0.06); c.fillStyle = '#5a5248'; c.fill(); c.strokeStyle = INK; c.lineWidth = W * 0.04; c.stroke(); noShadow(c);
    c.fillStyle = '#26221e'; c.fillRect(-W * 0.24, -W * 0.3, W * 0.48, W * 0.6);
    for (let i = 0; i < 8; i++) { c.fillStyle = i % 3 ? '#6a665e' : '#d8b040'; c.beginPath(); c.arc((pn(i, 95) - 0.5) * W * 0.36, (pn(i, 96) - 0.5) * W * 0.48, W * 0.07, 0, Math.PI * 2); c.fill(); }
    c.strokeStyle = '#3a3a3a'; c.lineWidth = W * 0.04; c.beginPath(); c.moveTo(-W * 0.32, -W * 0.1); c.lineTo(W * 0.32, -W * 0.1); c.moveTo(-W * 0.32, W * 0.14); c.lineTo(W * 0.32, W * 0.14); c.stroke();
  } },
  station: { label: 'Terminal Station', w: 6, h: 4, tile: true, draw(c, W, H, s) {
    // Front building along the top edge, glass train shed with platforms behind it
    const fh = Math.min(H * 0.35, s * 1.5), y0 = -H / 2 + fh;
    propShadow(c, s); c.fillStyle = '#3a3630'; c.fillRect(-W / 2, -H / 2, W, H); noShadow(c);
    c.fillStyle = '#8a8478'; c.fillRect(-W / 2, y0, W, H / 2 - y0);
    const n = Math.max(1, Math.floor(W / (s * 2.2)));
    for (let i = 0; i < n; i++) {
      const x = -W / 2 + (i + 0.5) * W / n;
      c.save(); c.beginPath(); c.rect(-W / 2, y0, W, H / 2 - y0); c.clip(); c.translate(x, (y0 + H / 2) / 2);
      railTrack(c, H / 2 - y0, s); c.restore();
      c.strokeStyle = '#e8d070'; c.lineWidth = Math.max(0.5, s * 0.02); c.setLineDash([s * 0.1, s * 0.08]); c.beginPath();
      for (const d of [-1, 1]) { c.moveTo(x + d * s * 0.5, y0); c.lineTo(x + d * s * 0.5, H / 2); } c.stroke(); c.setLineDash([]);
    }
    c.fillStyle = 'rgba(170,205,225,0.28)'; c.fillRect(-W / 2, y0, W, H / 2 - y0);
    c.strokeStyle = 'rgba(40,45,55,0.85)'; c.lineWidth = Math.max(1, s * 0.05); c.beginPath();
    for (let y = y0 + s * 0.6; y < H / 2; y += s * 0.6) { c.moveTo(-W / 2, y); c.lineTo(W / 2, y); } c.stroke();
    c.lineWidth = Math.max(0.5, s * 0.02); c.beginPath();
    for (let x = -W / 2 + s * 0.5; x < W / 2; x += s * 0.5) { c.moveTo(x, y0); c.lineTo(x, H / 2); } c.stroke();
    c.save(); c.translate(0, -H / 2 + fh / 2);
    drawHouse(c, W, fh, s, { color: '#4a5058', pattern: 'slate', hip: true, chimneys: [[-0.4, 0], [0.4, 0]] }, false);
    emblem(c, 0, 0, Math.min(fh * 0.35, s * 0.45), 'clock', s);
    c.restore();
    c.strokeStyle = INK; c.lineWidth = Math.max(1, s * 0.05); c.strokeRect(-W / 2, -H / 2, W, H);
  } },
};

const snapHalf = v => Math.round(v * 2) / 2;
const PROP_MIN = 0.5, PROP_MAX = 12;

// Unrotated size in squares: the prop's own (if resized) or its default
function propSize(p) {
  const d = PROPS[p.kind] || { w: 1, h: 1 };
  return { w: p.w ?? d.w, h: p.h ?? d.h };
}

// On-map footprint in squares once rotated (odd quarter-turns swap width/height)
function propDims(p) {
  const { w, h } = propSize(p);
  return p.rot % 2 ? { fw: h, fh: w } : { fw: w, fh: h };
}

// `p` needs kind/rot and optionally w/h
function drawProp(c, p, px, py, s, alpha) {
  const def = PROPS[p.kind];
  if (!def) return;
  const { w, h } = propSize(p);
  const { fw, fh } = propDims(p);
  c.save();
  if (alpha !== undefined) c.globalAlpha = alpha;
  c.translate(px + fw * s / 2, py + fh * s / 2);
  c.rotate((p.rot || 0) * Math.PI / 2);
  c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = Math.max(2, s * 0.15); c.shadowOffsetY = s * 0.05;
  // Art is drawn to fit its default proportions, then stretched to the prop's size
  // `tile` props redraw at their real size instead (steps, roof rows, etc. repeat)
  if (def.tile) def.draw(c, w * s, h * s, s);
  else { c.scale(w / def.w, h / def.h); def.draw(c, def.w * s, def.h * s, s); }
  c.restore();
}

// Topmost prop under a map point (in squares, fractional)
function propAtPoint(wx, wy) {
  for (let i = props.length - 1; i >= 0; i--) {
    const p = props[i], { fw, fh } = propDims(p);
    if (wx >= p.x && wx < p.x + fw && wy >= p.y && wy < p.y + fh) return p;
  }
  return null;
}

// Screen-space box of the selected prop's resize handle (bottom-right corner)
function propHandleHit(cx, cy) {
  const p = props.find(q => q.id === selectedPropId);
  if (!p) return false;
  const s = tileS(), { fw, fh } = propDims(p);
  const hx = view.ox + (p.x + fw) * s, hy = view.oy + (p.y + fh) * s;
  return Math.abs(cx - hx) <= 7 && Math.abs(cy - hy) <= 7;
}

// Where a new prop goes so its footprint is centred on the cursor square
// Top-left for a footprint of `size` squares whose centre should sit at `center`
function snapAnchor(center, size, mode = propSnap) {
  if (mode === 'free') return Math.round((center - size / 2) * 100) / 100;
  if (mode === 'tile') return Math.round(center - size / 2);
  return snapHalf(center) - size / 2;
}

// Where a prop goes when its centre is aimed at map point (wx, wy)
function propAnchor(p, wx, wy, mode = propSnap) {
  const { fw, fh } = propDims(p);
  return { x: snapAnchor(wx, fw, mode), y: snapAnchor(wy, fh, mode) };
}

// Alt held = place/move freely, whatever the snap setting
const snapModeFor = e => (e?.altKey ? 'free' : propSnap);

function renderProps(s) {
  for (const p of props) {
    const { x: px, y: py } = toScreen(p.x, p.y);
    const { fw, fh } = propDims(p);
    if (px > canvas.width || py > canvas.height || px + fw * s < 0 || py + fh * s < 0) continue;
    drawProp(ctx, p, px, py, s);
    if (activeTool === 'prop' && p.id === selectedPropId) {
      ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
      ctx.strokeRect(px + 1, py + 1, fw * s - 2, fh * s - 2);
      ctx.setLineDash([]);
      // Resize handle
      const hx = px + fw * s, hy = py + fh * s;
      ctx.fillStyle = '#ffd700'; ctx.fillRect(hx - 5, hy - 5, 10, 10);
      ctx.strokeStyle = '#0a0908'; ctx.lineWidth = 1; ctx.strokeRect(hx - 5, hy - 5, 10, 10);
    }
  }
  // Placement ghost under the cursor
  if (activeTool === 'prop' && mouse.onCanvas && !propDrag && !spaceDown &&
      !propAtPoint(mouse.rawX, mouse.rawY) && !propHandleHit(mouse.cx ?? -99, mouse.cy ?? -99)) {
    const a = propAnchor({ kind: selectedProp, rot: propRot }, mouse.rawX, mouse.rawY, mouse.alt ? 'free' : propSnap);
    const { x: px, y: py } = toScreen(a.x, a.y);
    drawProp(ctx, { kind: selectedProp, rot: propRot }, px, py, s, 0.5);
  }
}

function notifyPropSelect() {
  const p = props.find(q => q.id === selectedPropId);
  if (!p) { window.__editorOnPropSelect?.(null); return; }
  const { w, h } = propSize(p), d = PROPS[p.kind];
  window.__editorOnPropSelect?.({ label: d.label, w, h, resized: w !== d.w || h !== d.h });
}

// Tells the page which prop the Prop tool will place next
function notifyPropKind() {
  const d = PROPS[selectedProp];
  if (d) window.__editorOnPropKind?.({ label: d.label, w: d.w, h: d.h });
}

function selectPropById(id) {
  selectedPropId = id;
  notifyPropSelect();
  scheduleRender();
}

function placeProp(kind, wx, wy, mode = propSnap) {
  if (!PROPS[kind]) return;
  saveUndo();
  const a = propAnchor({ kind, rot: propRot }, wx, wy, mode);
  const p = { id: crypto.randomUUID(), kind, x: a.x, y: a.y, rot: propRot };
  props.push(p);
  selectPropById(p.id);
}

function deleteProp(id = selectedPropId) {
  const i = props.findIndex(p => p.id === id);
  if (i < 0) return;
  saveUndo();
  props.splice(i, 1);
  if (selectedPropId === id) selectPropById(null);
  scheduleRender();
}

// Rotate the selected prop (around its centre) — or, with none selected, the next one placed
function rotateProp(dir = 1) {
  const p = props.find(q => q.id === selectedPropId);
  if (!p) { propRot = (propRot + dir + 4) % 4; scheduleRender(); return; }
  saveUndo();
  const before = propDims(p);
  const cx = p.x + before.fw / 2, cy = p.y + before.fh / 2;
  p.rot = (p.rot + dir + 4) % 4;
  const after = propDims(p);
  p.x = snapAnchor(cx, after.fw); p.y = snapAnchor(cy, after.fh);
  propRot = p.rot;
  scheduleRender();
}

// Set the selected prop's on-map footprint (fw × fh squares), keeping its top-left
function setPropFootprint(p, fw, fh) {
  fw = Math.min(PROP_MAX, Math.max(PROP_MIN, snapHalf(fw)));
  fh = Math.min(PROP_MAX, Math.max(PROP_MIN, snapHalf(fh)));
  const d = PROPS[p.kind];
  // Store the unrotated size; drop it when it's back to the default
  const [w, h] = p.rot % 2 ? [fh, fw] : [fw, fh];
  if (w === d.w && h === d.h) { delete p.w; delete p.h; } else { p.w = w; p.h = h; }
}

// Grow/shrink the selected prop by half a square on its shorter side, keeping
// proportions and its centre. step: +1 / -1; 0 resets to the default size.
function scaleProp(step) {
  const p = props.find(q => q.id === selectedPropId);
  if (!p) return;
  saveUndo();
  const before = propDims(p);
  const cx = p.x + before.fw / 2, cy = p.y + before.fh / 2;
  if (step === 0) { delete p.w; delete p.h; }
  else {
    const short = Math.min(before.fw, before.fh);
    const k = Math.max(PROP_MIN, short + step * 0.5) / short;
    setPropFootprint(p, before.fw * k, before.fh * k);
  }
  const after = propDims(p);
  p.x = snapAnchor(cx, after.fw); p.y = snapAnchor(cy, after.fh);
  notifyPropSelect();
  scheduleRender();
}

function selectPropKind(kind) {
  if (!PROPS[kind]) return;
  selectedProp = kind;
  document.querySelectorAll('.palette-prop').forEach(el => el.classList.toggle('selected', el.dataset.prop === kind));
  if (activeTool !== 'prop') selectTool('prop');
  // Picking from the palette means "place this next": drop any placed-prop
  // selection, otherwise the toolbar (and resize/rotate/delete) still target it
  if (selectedPropId) selectPropById(null);
  notifyPropKind();
  scheduleRender();
}

// ── Text boxes ─────────────────────────────────────────────────────────────────
// Word-wraps a box's text at the current zoom. Shared by drawing, hit-testing
// and the inline editor so all three agree on the box's size.
function textboxLayout(tb, s) {
  const fs  = Math.max(5, (TEXTBOX_SIZES[tb.size] || TEXTBOX_SIZES.m) * s);
  const pad = fs * 0.45;
  const lh  = fs * 1.25;
  const maxW = Math.max(fs, tb.w * s - pad * 2);
  ctx.font = `${fs}px Georgia, serif`;
  const lines = [];
  for (const para of String(tb.text || '').split('\n')) {
    let line = '';
    for (const word of para.split(' ')) {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxW) { lines.push(line); line = word; }
      else line = test;
    }
    lines.push(line);
  }
  return { fs, pad, lh, lines, wPx: tb.w * s, hPx: Math.max(1, lines.length) * lh + pad * 2 };
}

function textboxRect(tb, s) {
  const L = textboxLayout(tb, s);
  return { x: view.ox + tb.x * s, y: view.oy + tb.y * s, w: L.wPx, h: L.hPx, L };
}

function textboxAt(cx, cy) {
  const s = tileS();
  for (let i = textboxes.length - 1; i >= 0; i--) {
    const r = textboxRect(textboxes[i], s);
    if (cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h) return textboxes[i];
  }
  return null;
}

// The width handle sits on the right edge, vertically centred
function textboxResizeHit(cx, cy) {
  const tb = textboxes.find(t => t.id === selectedTextboxId);
  if (!tb) return false;
  const r = textboxRect(tb, tileS());
  return Math.abs(cx - (r.x + r.w)) <= 6 && cy >= r.y - 4 && cy <= r.y + r.h + 4;
}

const TEXTBOX_BG = {
  dark:      { fill: 'rgba(14,12,9,0.85)', stroke: 'rgba(201,168,76,0.35)' },
  parchment: { fill: '#d9c9a3',            stroke: '#8a7448' },
  none:      null,
};

function renderTextboxes(s) {
  for (const tb of textboxes) {
    const { x, y, w, h, L } = textboxRect(tb, s);
    if (x > canvas.width || y > canvas.height || x + w < 0 || y + h < 0) continue;
    const bg = TEXTBOX_BG[tb.bg];
    if (bg) {
      ctx.fillStyle = bg.fill; ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = bg.stroke; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    }
    if (tb.id !== editingTextboxId) {
      ctx.font = `${L.fs}px Georgia, serif`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = tb.color || '#e8e0d0';
      if (!bg) { ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = Math.max(2, L.fs * 0.25); }
      L.lines.forEach((line, i) => ctx.fillText(line, x + L.pad, y + L.pad + i * L.lh + L.lh / 2));
      ctx.shadowBlur = 0;
    }
    if (activeTool === 'text' && tb.id === selectedTextboxId) {
      ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.strokeRect(x - 2.5, y - 2.5, w + 5, h + 5);
      ctx.setLineDash([]);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + w - 3, y + h / 2 - 7, 6, 14);
    }
  }

  // Box being dragged out
  if (textboxDrag?.mode === 'create') {
    const { x0, y0, x1, y1 } = textboxDrag;
    const px = view.ox + Math.min(x0, x1) * s, py = view.oy + Math.min(y0, y1) * s;
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]);
    ctx.strokeRect(px, py, Math.abs(x1 - x0) * s, Math.abs(y1 - y0) * s);
    ctx.setLineDash([]);
  }
}

function notifyTextboxSelect() {
  const tb = textboxes.find(t => t.id === selectedTextboxId);
  window.__editorOnTextboxSelect?.(tb ? { size: tb.size, color: tb.color, bg: tb.bg } : null);
}

function selectTextbox(id) {
  selectedTextboxId = id;
  notifyTextboxSelect();
  scheduleRender();
}

function createTextbox(x, y, w) {
  saveUndo();
  const tb = { id: crypto.randomUUID(), x: Math.round(x * 20) / 20, y: Math.round(y * 20) / 20, w: Math.max(1, w), text: '', ...textboxStyle };
  textboxes.push(tb);
  selectTextbox(tb.id);
  openTextEditor(tb, true);
}

function deleteTextbox(id) {
  const i = textboxes.findIndex(t => t.id === id);
  if (i < 0) return;
  saveUndo();
  textboxes.splice(i, 1);
  if (selectedTextboxId === id) selectTextbox(null);
  scheduleRender();
}

// Inline editing: a textarea laid exactly over the box, kept in place on pan/zoom.
function openTextEditor(tb, isNew) {
  commitTextEdit();
  editingTextboxId = tb.id;
  editingIsNew = !!isNew;
  if (!textEditorEl) {
    textEditorEl = document.createElement('textarea');
    textEditorEl.className = 'tb-editor';
    textEditorEl.spellcheck = true;
    textEditorEl.addEventListener('blur', commitTextEdit);
    textEditorEl.addEventListener('keydown', e => {
      if (e.key === 'Escape' || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault(); commitTextEdit(); canvas.focus();
      }
    });
    textEditorEl.addEventListener('input', () => {
      const t = textboxes.find(b => b.id === editingTextboxId);
      if (t) { t.text = textEditorEl.value; positionTextEditor(); scheduleRender(); }
    });
    textEditorEl.addEventListener('mousedown', e => e.stopPropagation());
  }
  const wrap = document.getElementById('canvas-wrap');
  if (textEditorEl.parentElement !== wrap) wrap.appendChild(textEditorEl);
  textEditorEl._original = tb.text;
  textEditorEl.value = tb.text;
  textEditorEl.style.display = 'block';
  positionTextEditor();
  textEditorEl.focus();
  textEditorEl.setSelectionRange(tb.text.length, tb.text.length);
  scheduleRender();
}

function positionTextEditor() {
  if (!editingTextboxId || !textEditorEl) return;
  const tb = textboxes.find(t => t.id === editingTextboxId);
  if (!tb) { commitTextEdit(); return; }
  const { x, y, w, h, L } = textboxRect(tb, tileS());
  Object.assign(textEditorEl.style, {
    left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`,
    fontSize: `${L.fs}px`, lineHeight: `${L.lh}px`, padding: `${L.pad}px`,
    color: tb.color || '#e8e0d0',
  });
}

// Ends inline editing. Mutates the box in place (never reassigns `textboxes`)
// so it's safe to call while a level switch is half-done.
function commitTextEdit() {
  if (!editingTextboxId) return;
  const id = editingTextboxId;
  editingTextboxId = null;
  const original = textEditorEl._original ?? '';
  const value = textEditorEl.value.replace(/\s+$/, '');
  textEditorEl.style.display = 'none';
  const i = textboxes.findIndex(t => t.id === id);
  if (i < 0) return;
  if (!value.trim()) {
    // Empty box: a new one simply vanishes (its creation undo entry covers it)
    if (!editingIsNew) { textboxes[i].text = original; saveUndo(); }
    textboxes.splice(i, 1);
    if (selectedTextboxId === id) { selectedTextboxId = null; notifyTextboxSelect(); }
  } else if (value !== original && !editingIsNew) {
    // Record the pre-edit text for undo, then apply the new text
    textboxes[i].text = original;
    saveUndo();
    textboxes[i].text = value;
  } else {
    textboxes[i].text = value;
  }
  scheduleRender();
}

function setTextboxStyle(opts) {
  for (const k of ['size', 'color', 'bg']) if (opts?.[k] !== undefined) textboxStyle[k] = opts[k];
  const tb = textboxes.find(t => t.id === selectedTextboxId);
  if (tb) {
    saveUndo();
    for (const k of ['size', 'color', 'bg']) if (opts?.[k] !== undefined) tb[k] = opts[k];
    positionTextEditor();
    scheduleRender();
  }
}

// ── Notes ──────────────────────────────────────────────────────────────────────
// Screen anchor (viewport coords) just right of a square, for React popovers.
function tileClientAnchor(x, y) {
  const rect = canvas.getBoundingClientRect();
  const { x: sx, y: sy } = toScreen(x + 1, y);
  return { screenX: rect.left + sx, screenY: rect.top + sy };
}

// Ask React to open the note editor — for an existing note, or a new one at (x, y).
function openNoteEditor(noteOrTile) {
  setNoteHover(null);
  const n = noteOrTile.id ? noteOrTile : { x: noteOrTile.x, y: noteOrTile.y, name: '', text: '' };
  window.__editorOnNoteEdit?.({ id: n.id ?? null, x: n.x, y: n.y, name: n.name || '', text: n.text || '', ...tileClientAnchor(n.x, n.y) });
}

function setNoteHover(note) {
  const id = note?.id ?? null;
  if (id === hoverNoteId) return;
  hoverNoteId = id;
  window.__editorOnNoteHover?.(note ? { ...note, ...tileClientAnchor(note.x, note.y) } : null);
}

function saveNote({ id, x, y, name, text }) {
  saveUndo();
  const title = (name || '').trim();
  const body  = (text || '').trim();
  const existing = id && tokens.find(t => t.id === id);
  if (existing) { existing.name = title; existing.text = body; }
  else tokens.push({ id: crypto.randomUUID(), x, y, type: 'note', refId: null, name: title, text: body });
  commitLevel();
  notifyTokensChanged(); scheduleRender();
}

// ── Content-panel drag & drop onto the canvas ──────────────────────────────────
function dragTileFromEvent(e) {
  const { cx, cy } = getPos(e);
  return toTile(cx, cy);
}

function onTokenDragOver(e) {
  if (!Array.from(e.dataTransfer.types).includes(TOKEN_DRAG_MIME)) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  const t = dragTileFromEvent(e);
  if (!dropHoverTile || dropHoverTile.x !== t.x || dropHoverTile.y !== t.y) {
    dropHoverTile = t; scheduleRender();
  }
}

function onTokenDragLeave() {
  // Canvas fires spurious leave/enter pairs mid-drag; just clear the highlight
  // and let the next dragover restore it. The drop reads its own position.
  dropHoverTile = null; scheduleRender();
}

function onTokenDrop(e) {
  const raw = e.dataTransfer.getData(TOKEN_DRAG_MIME);
  if (!raw) return;
  e.preventDefault();
  // Firefox can report (0,0) on drop — fall back to the last dragover tile then.
  const target = (e.clientX || e.clientY) ? dragTileFromEvent(e) : dropHoverTile;
  dropHoverTile = null;
  if (!target) { scheduleRender(); return; }
  try {
    const { type, id, name } = JSON.parse(raw);
    if (type === 'prop') {
      const kind = JSON.parse(raw).prop;
      if (PROPS[kind]) {
        const { cx, cy } = getPos(e), s = tileS();
        const at = (e.clientX || e.clientY)
          ? { x: (cx - view.ox) / s, y: (cy - view.oy) / s }
          : { x: target.x + 0.5, y: target.y + 0.5 };
        selectPropKind(kind); placeProp(kind, at.x, at.y, snapModeFor(e)); canvas.focus();
      }
      scheduleRender();
      return;
    }
    if (type === 'textbox') {
      // Free-placed: use the exact drop point, not the square
      const { cx, cy } = getPos(e);
      const s = tileS();
      const at = (e.clientX || e.clientY)
        ? { x: (cx - view.ox) / s, y: (cy - view.oy) / s }
        : { x: target.x, y: target.y };
      selectTool('text');
      createTextbox(at.x, at.y, 4);
      return;
    }
    if (!TOKEN_TYPES[type]) return;
    const tok = { id: crypto.randomUUID(), x: target.x, y: target.y, type, refId: id ?? null, name: name || '' };
    if (!hasDuplicateToken(tok, tok.x, tok.y)) {
      saveUndo();
      tokens.push(tok);
      notifyTokensChanged();
    }
  } catch { /* malformed payload — ignore */ }
  canvas.focus();
  scheduleRender();
}

// ── Render ─────────────────────────────────────────────────────────────────────
function scheduleRender() {
  if (!rafPending) { rafPending = true; requestAnimationFrame(() => { rafPending = false; render(); }); }
}

// ── Floor textures ─────────────────────────────────────────────────────────────
// Drawn over the tile's base colour with translucent light/dark strokes so each
// texture works with any base colour. Per-tile variation comes from tileNoise(),
// so a tile always looks the same frame to frame. `g` (the tile grid) lets
// carpet draw a border only where it meets a non-carpet square; pass null for
// a standalone swatch.
// Outside edges of a fortification square: an ink outline, plus a crenellated
// parapet (merlons and embrasures) for `crenel` walls. Merlons are keyed to world
// position so they alternate evenly along a wall of any length. With no grid
// (palette swatch) the top and bottom count as outside.
function drawFortEdges(c, def, sx, sy, s, tx, ty, g) {
  const out = (dx, dy) => g ? !TILES[g.get(key(tx + dx, ty + dy))]?.fort : dy !== 0;
  const L = out(-1, 0), R = out(1, 0), T = out(0, -1), B = out(0, 1);
  if (!(L || R || T || B)) return;
  // Each edge as [present, x, y, along-x?, flip toward the inside, world index]
  const edges = [[T, sx, sy, true, 1, tx], [B, sx, sy + s, true, -1, tx], [L, sx, sy, false, 1, ty], [R, sx + s, sy, false, -1, ty]];
  if (def.crenel && s >= 10) {
    const band = s * 0.22, seg = s / 4;
    for (const [on, x, y, horiz, dir, idx] of edges) {
      if (!on) continue;
      // Walkway shadow cast by the parapet
      c.fillStyle = 'rgba(0,0,0,0.28)';
      if (horiz) c.fillRect(x, dir > 0 ? y + band : y - band - s * 0.07, s, s * 0.07);
      else c.fillRect(dir > 0 ? x + band : x - band - s * 0.07, y, s * 0.07, s);
      // Parapet band (embrasures read as the lower, darker gaps)
      c.fillStyle = 'rgba(0,0,0,0.22)';
      if (horiz) c.fillRect(x, dir > 0 ? y : y - band, s, band); else c.fillRect(dir > 0 ? x : x - band, y, band, s);
      c.strokeStyle = 'rgba(10,8,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.025);
      for (let j = 0; j < 4; j++) {
        if ((idx * 4 + j) % 2) continue;
        const rx = horiz ? x + j * seg : (dir > 0 ? x : x - band), ry = horiz ? (dir > 0 ? y : y - band) : y + j * seg;
        const rw = horiz ? seg : band, rh = horiz ? band : seg;
        c.fillStyle = 'rgba(255,250,235,0.28)'; c.fillRect(rx, ry, rw, rh); c.strokeRect(rx, ry, rw, rh);
      }
    }
  }
  c.strokeStyle = 'rgba(12,9,6,0.9)'; c.lineWidth = Math.max(1, s * (def.crenel ? 0.07 : 0.05)); c.lineCap = 'square';
  c.beginPath();
  for (const [on, x, y, horiz] of edges) {
    if (!on) continue;
    c.moveTo(x, y); horiz ? c.lineTo(x + s, y) : c.lineTo(x, y + s);
  }
  c.stroke(); c.lineCap = 'butt';
}

function drawTilePattern(c, def, tileKey, sx, sy, s, tx, ty, g) {
  const n = i => tileNoise(tx, ty, i * 7919 + 101);
  const lw = Math.max(0.6, s * 0.035);
  switch (def.pattern) {
    case 'planks': {
      const rows = 3, h = s / rows;
      c.fillStyle = 'rgba(255,230,190,0.06)';
      c.fillRect(sx, sy + Math.floor(n(9) * rows) * h, s, h);
      c.strokeStyle = 'rgba(30,15,5,0.45)'; c.lineWidth = lw;
      c.beginPath();
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h;
        c.moveTo(sx, y); c.lineTo(sx + s, y);
        if (n(r + 1) < 0.6) {
          const x = sx + (0.15 + 0.7 * n(r + 11)) * s;
          c.moveTo(x, y); c.lineTo(x, y + h);
        }
      }
      c.stroke();
      break;
    }
    case 'flagstone': {
      const vert = n(1) < 0.5, p = 0.35 + 0.3 * n(2);
      const stones = vert ? [[0, 0, p, 1], [p, 0, 1 - p, 1]] : [[0, 0, 1, p], [0, p, 1, 1 - p]];
      c.lineWidth = Math.max(1, s * 0.07);
      c.strokeStyle = 'rgba(0,0,0,0.42)';
      stones.forEach(([x, y, w, h], i) => {
        const shade = n(3 + i) - 0.5;
        c.fillStyle = shade > 0 ? `rgba(255,245,225,${shade * 0.16})` : `rgba(0,0,0,${-shade * 0.2})`;
        c.fillRect(sx + x * s, sy + y * s, w * s, h * s);
        c.strokeRect(sx + x * s, sy + y * s, w * s, h * s);
      });
      break;
    }
    case 'cobble': {
      const k = s >= 16 ? 3 : 2;
      c.lineWidth = Math.max(0.6, s * 0.04);
      c.strokeStyle = 'rgba(0,0,0,0.5)';
      for (let j = 0; j < k; j++) for (let i = 0; i < k; i++) {
        const idx = j * k + i;
        const cx = sx + ((i + 0.5) / k + (n(idx) - 0.5) * 0.12) * s;
        const cy = sy + ((j + 0.5) / k + (n(idx + 20) - 0.5) * 0.12) * s;
        const r = (s / k / 2) * (0.72 + n(idx + 40) * 0.2);
        c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2);
        c.fillStyle = n(idx + 60) < 0.5 ? 'rgba(255,245,225,0.12)' : 'rgba(0,0,0,0.12)';
        c.fill(); c.stroke();
      }
      break;
    }
    case 'checker': {
      const h = s / 2;
      c.fillStyle = 'rgba(255,250,235,0.16)';
      c.fillRect(sx, sy, h, h); c.fillRect(sx + h, sy + h, h, h);
      c.fillStyle = 'rgba(0,0,0,0.18)';
      c.fillRect(sx + h, sy, h, h); c.fillRect(sx, sy + h, h, h);
      break;
    }
    case 'marble': {
      c.strokeStyle = 'rgba(255,255,255,0.22)'; c.lineWidth = lw;
      c.strokeRect(sx + 0.5, sy + 0.5, s - 1, s - 1);
      if (n(1) < 0.65) {
        c.strokeStyle = 'rgba(70,70,85,0.3)'; c.lineWidth = Math.max(0.5, s * 0.025);
        c.beginPath();
        c.moveTo(sx, sy + n(2) * s);
        c.bezierCurveTo(sx + s * 0.35, sy + n(3) * s, sx + s * 0.65, sy + n(4) * s, sx + s, sy + n(5) * s);
        c.stroke();
      }
      break;
    }
    case 'carpet': {
      const edge = (dx, dy) => !g || g.get(key(tx + dx, ty + dy)) !== tileKey;
      const L = edge(-1, 0), R = edge(1, 0), T = edge(0, -1), B = edge(0, 1);
      const band = s * 0.16;
      c.fillStyle = 'rgba(0,0,0,0.28)';
      if (L) c.fillRect(sx, sy, band, s);
      if (R) c.fillRect(sx + s - band, sy, band, s);
      if (T) c.fillRect(sx, sy, s, band);
      if (B) c.fillRect(sx, sy + s - band, s, band);
      c.strokeStyle = 'rgba(220,180,90,0.55)'; c.lineWidth = Math.max(0.8, s * 0.045);
      c.beginPath();
      if (L) { c.moveTo(sx + band, sy + (T ? band : 0)); c.lineTo(sx + band, sy + s - (B ? band : 0)); }
      if (R) { c.moveTo(sx + s - band, sy + (T ? band : 0)); c.lineTo(sx + s - band, sy + s - (B ? band : 0)); }
      if (T) { c.moveTo(sx + (L ? band : 0), sy + band); c.lineTo(sx + s - (R ? band : 0), sy + band); }
      if (B) { c.moveTo(sx + (L ? band : 0), sy + s - band); c.lineTo(sx + s - (R ? band : 0), sy + s - band); }
      c.stroke();
      const m = s * 0.16, cx = sx + s / 2, cy = sy + s / 2;
      c.fillStyle = 'rgba(220,180,90,0.22)';
      c.beginPath(); c.moveTo(cx, cy - m); c.lineTo(cx + m, cy); c.lineTo(cx, cy + m); c.lineTo(cx - m, cy); c.closePath(); c.fill();
      break;
    }
    case 'grate': {
      c.fillStyle = 'rgba(0,0,0,0.55)';
      const bars = 4, w = Math.max(1, s * 0.09);
      for (let i = 0; i < bars; i++) for (let j = 0; j < bars; j++) {
        const cw = s / bars;
        c.fillRect(sx + i * cw + w / 2, sy + j * cw + w / 2, cw - w, cw - w);
      }
      break;
    }
    case 'speckle': {
      const light = tileKey === 'sand';
      const dot = Math.max(0.8, s * 0.055);
      for (let i = 0; i < 6; i++) {
        c.fillStyle = (i % 2) === (light ? 1 : 0) ? 'rgba(255,240,210,0.16)' : 'rgba(0,0,0,0.25)';
        c.fillRect(sx + n(i) * (s - dot), sy + n(i + 10) * (s - dot), dot, dot);
      }
      if (tileKey === 'mud' && n(30) < 0.5) {
        c.fillStyle = 'rgba(120,140,150,0.12)';
        c.beginPath(); c.ellipse(sx + s * (0.3 + 0.4 * n(31)), sy + s * (0.3 + 0.4 * n(32)), s * 0.22, s * 0.12, 0, 0, Math.PI * 2); c.fill();
      }
      break;
    }
    case 'tufts': {
      c.strokeStyle = 'rgba(150,200,100,0.45)'; c.lineWidth = Math.max(0.6, s * 0.035);
      c.beginPath();
      for (let i = 0; i < 3; i++) {
        const x = sx + (0.15 + 0.7 * n(i)) * s, y = sy + (0.25 + 0.6 * n(i + 10)) * s, h = s * 0.14;
        c.moveTo(x - h * 0.6, y - h); c.lineTo(x, y); c.lineTo(x + h * 0.6, y - h);
        c.moveTo(x, y); c.lineTo(x, y - h * 1.2);
      }
      c.stroke();
      break;
    }
    case 'rubble': {
      for (let i = 0; i < 5; i++) {
        const x = sx + (0.12 + 0.76 * n(i)) * s, y = sy + (0.12 + 0.76 * n(i + 10)) * s;
        const r = s * (0.07 + 0.08 * n(i + 20)), a = n(i + 30) * Math.PI;
        c.fillStyle = i % 2 ? 'rgba(255,245,225,0.18)' : 'rgba(0,0,0,0.38)';
        c.beginPath();
        c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        c.lineTo(x + Math.cos(a + 2.1) * r, y + Math.sin(a + 2.1) * r);
        c.lineTo(x + Math.cos(a + 4.2) * r, y + Math.sin(a + 4.2) * r);
        c.closePath(); c.fill();
      }
      break;
    }
    case 'cracks': {
      if (n(9) < 0.4) {
        c.fillStyle = 'rgba(255,255,255,0.07)';
        c.beginPath(); c.moveTo(sx, sy + s * 0.6); c.lineTo(sx + s * 0.6, sy); c.lineTo(sx + s * 0.8, sy); c.lineTo(sx, sy + s * 0.8); c.closePath(); c.fill();
      }
      c.strokeStyle = 'rgba(235,248,255,0.5)'; c.lineWidth = Math.max(0.5, s * 0.025);
      c.beginPath();
      let x = sx + n(1) * s, y = sy;
      c.moveTo(x, y);
      for (let i = 0; i < 3; i++) { x = sx + n(i + 2) * s; y = sy + ((i + 1) / 3) * s; c.lineTo(x, y); }
      c.stroke();
      break;
    }
    case 'ripples': {
      c.strokeStyle = 'rgba(180,220,235,0.3)'; c.lineWidth = Math.max(0.6, s * 0.035);
      c.beginPath();
      for (let i = 0; i < 2; i++) {
        const y = sy + (0.3 + 0.4 * i + (n(i) - 0.5) * 0.15) * s, x0 = sx + s * 0.15, x1 = sx + s * 0.85;
        c.moveTo(x0, y);
        c.quadraticCurveTo(x0 + (x1 - x0) * 0.25, y - s * 0.07, (x0 + x1) / 2, y);
        c.quadraticCurveTo(x0 + (x1 - x0) * 0.75, y + s * 0.07, x1, y);
      }
      c.stroke();
      break;
    }

    case 'arcane': {
      // Glowing rune circle per square, with ley lines joining neighbouring arcane squares
      const cx = sx + s / 2, cy = sy + s / 2, r = s * 0.34;
      const glow = c.createRadialGradient(cx, cy, 0, cx, cy, s * 0.5);
      glow.addColorStop(0, 'rgba(110,160,255,0.22)'); glow.addColorStop(1, 'rgba(110,160,255,0)');
      c.fillStyle = glow; c.fillRect(sx, sy, s, s);
      c.strokeStyle = 'rgba(160,205,255,0.7)'; c.lineWidth = Math.max(0.6, s * 0.03);
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
      c.beginPath();
      // Inscribed square, alternating orientation in a checker so the floor isn't uniform
      const rot = ((tx + ty) % 2 === 0) ? Math.PI / 4 : 0;
      for (let i = 0; i <= 4; i++) {
        const a = rot + i * Math.PI / 2, x = cx + Math.cos(a) * r * 0.78, y = cy + Math.sin(a) * r * 0.78;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
      c.fillStyle = 'rgba(200,230,255,0.8)';
      c.beginPath(); c.arc(cx, cy, Math.max(0.8, s * 0.04), 0, Math.PI * 2); c.fill();
      const joins = (dx, dy) => g && g.get(key(tx + dx, ty + dy)) === tileKey;
      c.strokeStyle = 'rgba(140,190,255,0.35)';
      c.beginPath();
      if (joins(1, 0)) { c.moveTo(cx + r, cy); c.lineTo(sx + s, cy); }
      if (joins(-1, 0)) { c.moveTo(cx - r, cy); c.lineTo(sx, cy); }
      if (joins(0, 1)) { c.moveTo(cx, cy + r); c.lineTo(cx, sy + s); }
      if (joins(0, -1)) { c.moveTo(cx, cy - r); c.lineTo(cx, sy); }
      c.stroke();
      break;
    }

    // ── Nature ──
    case 'canopy':
    case 'pine': {
      const pine = def.pattern === 'pine';
      c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
      // Leaf clusters (round) or needle tufts (pointed), dark first then light
      // Small clusters kept inside the square, so nothing gets cut at the edge
      // (cut shapes make the square grid visible through the foliage)
      for (let i = 0; i < 10; i++) {
        const r = s * (0.09 + 0.08 * n(i + 20));
        const x = sx + r + n(i) * (s - 2 * r), y = sy + r + n(i + 10) * (s - 2 * r);
        c.fillStyle = i < 5 ? (pine ? 'rgba(5,20,12,0.35)' : 'rgba(10,30,8,0.32)')
                            : (pine ? 'rgba(90,140,100,0.25)' : 'rgba(120,170,80,0.26)');
        c.beginPath();
        if (pine) { c.moveTo(x, y - r); c.lineTo(x + r * 0.8, y + r * 0.7); c.lineTo(x - r * 0.8, y + r * 0.7); c.closePath(); }
        else c.arc(x, y, r, 0, Math.PI * 2);
        c.fill();
      }
      // Shade the canopy's outer edge so tree outlines read against the ground
      const edge = (dx, dy) => !g || !['canopy', 'pine'].includes(g.get(key(tx + dx, ty + dy)));
      const band = s * 0.22;
      const shade = (x0, y0, x1, y1, w, h) => {
        const gr = c.createLinearGradient(x0, y0, x1, y1);
        gr.addColorStop(0, 'rgba(0,0,0,0.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = gr; c.fillRect(Math.min(x0, x1), Math.min(y0, y1), w, h);
      };
      if (edge(-1, 0)) shade(sx, sy, sx + band, sy, band, s);
      if (edge(1, 0))  shade(sx + s, sy, sx + s - band, sy, band, s);
      if (edge(0, -1)) shade(sx, sy, sx, sy + band, s, band);
      if (edge(0, 1))  shade(sx, sy + s, sx, sy + s - band, s, band);
      c.restore();
      break;
    }
    case 'trunk': {
      const cx = sx + s / 2, cy = sy + s / 2, r = s * 0.36;
      c.fillStyle = 'rgba(0,0,0,0.3)';
      c.beginPath(); c.ellipse(cx + r * 0.15, cy + r * 0.2, r, r * 0.95, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#5a3e22';
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(30,18,8,0.6)'; c.lineWidth = Math.max(0.6, s * 0.03);
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
      c.strokeStyle = 'rgba(200,160,110,0.35)';
      c.beginPath(); c.arc(cx, cy, r * 0.6, 0, Math.PI * 2); c.arc(cx, cy, r * 0.28, 0, Math.PI * 2); c.stroke();
      break;
    }
    case 'bush': {
      const cx = sx + s * (0.45 + 0.1 * n(1)), cy = sy + s * (0.45 + 0.1 * n(2)), r = s * 0.36;
      c.fillStyle = 'rgba(0,0,0,0.28)';
      c.beginPath(); c.arc(cx + r * 0.15, cy + r * 0.2, r, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#2e4a24';
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
      for (let i = 0; i < 4; i++) {
        c.fillStyle = 'rgba(120,170,80,0.35)';
        c.beginPath(); c.arc(cx + (n(i + 3) - 0.6) * r, cy + (n(i + 7) - 0.6) * r, r * 0.35, 0, Math.PI * 2); c.fill();
      }
      break;
    }
    case 'boulder': {
      const cx = sx + s / 2, cy = sy + s / 2, r = s * 0.4, a0 = n(1) * Math.PI;
      const pts = [];
      for (let i = 0; i < 7; i++) {
        const a = a0 + (i / 7) * Math.PI * 2, rr = r * (0.75 + 0.25 * n(i + 2));
        pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
      }
      const poly = (ox, oy) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x + ox, y + oy) : c.moveTo(x + ox, y + oy)); c.closePath(); };
      c.fillStyle = 'rgba(0,0,0,0.35)'; poly(s * 0.05, s * 0.06); c.fill();
      c.fillStyle = '#7a766c'; poly(0, 0); c.fill();
      c.strokeStyle = 'rgba(20,18,14,0.55)'; c.lineWidth = Math.max(0.7, s * 0.035); c.stroke();
      c.fillStyle = 'rgba(255,250,235,0.18)';
      c.beginPath(); c.ellipse(cx - r * 0.25, cy - r * 0.3, r * 0.4, r * 0.22, -0.5, 0, Math.PI * 2); c.fill();
      break;
    }
    case 'tallgrass': {
      c.lineWidth = Math.max(0.6, s * 0.03);
      for (let i = 0; i < 10; i++) {
        const x = sx + n(i) * s, y = sy + (0.35 + 0.65 * n(i + 20)) * s, h = s * (0.22 + 0.18 * n(i + 40));
        c.strokeStyle = i % 3 ? 'rgba(150,200,90,0.5)' : 'rgba(20,40,10,0.45)';
        c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + h * 0.1, y - h * 0.6, x + (n(i + 60) - 0.5) * h * 0.8, y - h); c.stroke();
      }
      break;
    }
    case 'flowers': {
      const colors = ['#e05a5a', '#e8d060', '#f0ece0', '#a070d0', '#e890b0'];
      for (let i = 0; i < 6; i++) {
        const x = sx + (0.1 + 0.8 * n(i)) * s, y = sy + (0.1 + 0.8 * n(i + 10)) * s, r = Math.max(1, s * 0.05);
        c.fillStyle = colors[Math.floor(n(i + 20) * colors.length)];
        c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      }
      break;
    }
    case 'crops': {
      // Furrow rows aligned across squares
      const rows = 3, h = s / rows;
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h;
        c.fillStyle = 'rgba(40,28,10,0.35)'; c.fillRect(sx, y + h * 0.65, s, h * 0.35);
        c.fillStyle = 'rgba(120,170,60,0.55)';
        for (let i = 0; i < 4; i++) {
          const x = sx + (i + 0.5) * (s / 4);
          c.beginPath(); c.ellipse(x, y + h * 0.4, s * 0.06, h * 0.26, 0, 0, Math.PI * 2); c.fill();
        }
      }
      break;
    }
    case 'snow': {
      c.fillStyle = 'rgba(120,150,180,0.12)';
      c.beginPath(); c.ellipse(sx + s * (0.3 + 0.4 * n(1)), sy + s * (0.3 + 0.4 * n(2)), s * 0.3, s * 0.14, n(3), 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.7)';
      for (let i = 0; i < 5; i++) {
        const d = Math.max(0.8, s * 0.04);
        c.fillRect(sx + n(i + 10) * (s - d), sy + n(i + 20) * (s - d), d, d);
      }
      break;
    }

    // ── Roofs ── row patterns use the absolute row (ty) so courses line up across squares
    case 'roofTile': {
      const rows = 3, h = s / rows, w = s / 3;
      c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h, off = ((ty * rows + r) % 2 === 0) ? 0 : w / 2;
        c.fillStyle = 'rgba(255,190,150,0.12)'; c.fillRect(sx, y, s, h * 0.35);
        c.strokeStyle = 'rgba(50,12,0,0.5)'; c.lineWidth = Math.max(0.7, s * 0.035);
        c.beginPath();
        for (let i = -1; i <= 3; i++) {
          const cx = sx + i * w + off + w / 2;
          c.moveTo(cx + w / 2, y);
          c.arc(cx, y, w / 2, 0, Math.PI);
        }
        c.stroke();
      }
      c.restore();
      break;
    }
    case 'shingle':
    case 'slate': {
      const slate = def.pattern === 'slate';
      const rows = slate ? 4 : 3, h = s / rows, w = s / (slate ? 3 : 2.5);
      c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
      c.strokeStyle = slate ? 'rgba(10,14,20,0.55)' : 'rgba(30,15,5,0.5)'; c.lineWidth = Math.max(0.6, s * 0.03);
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h, row = ty * rows + r, off = (row % 2) * (w / 2);
        for (let i = -1; i <= Math.ceil(s / w); i++) {
          const x = sx + i * w + off;
          // Per-shingle shade, keyed to the shingle's world position
          const v = tileNoise(Math.round((tx * s + x - sx) / w), row, slate ? 71 : 37) - 0.5;
          c.fillStyle = v > 0 ? `rgba(255,240,220,${v * (slate ? 0.14 : 0.18)})` : `rgba(0,0,0,${-v * 0.25})`;
          c.fillRect(x, y, w, h);
          c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.stroke();
        }
        c.beginPath(); c.moveTo(sx, y + h); c.lineTo(sx + s, y + h); c.stroke();
      }
      c.restore();
      break;
    }
    case 'thatch': {
      const rows = 3, h = s / rows;
      c.lineWidth = Math.max(0.6, s * 0.03);
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h;
        for (let i = 0; i < 9; i++) {
          const x = sx + (i + n(r * 10 + i) * 0.8) * (s / 9);
          c.strokeStyle = i % 2 ? 'rgba(250,225,150,0.35)' : 'rgba(70,45,10,0.35)';
          c.beginPath(); c.moveTo(x, y + h * 0.05); c.lineTo(x + s * 0.03, y + h * 0.95); c.stroke();
        }
        c.fillStyle = 'rgba(50,32,8,0.4)'; c.fillRect(sx, y + h * 0.85, s, h * 0.15);
      }
      break;
    }
    case 'canvas': {
      // Alternating panels with a seam, aligned across squares
      const panels = 2, w = s / panels;
      for (let i = 0; i < panels; i++) {
        if ((tx * panels + i) % 2) { c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(sx + i * w, sy, w, s); }
        c.strokeStyle = 'rgba(60,45,25,0.35)'; c.lineWidth = Math.max(0.5, s * 0.02);
        c.beginPath(); c.moveTo(sx + i * w, sy); c.lineTo(sx + i * w, sy + s); c.stroke();
      }
      break;
    }
    // ── Terrain & structure tiles ──
    case 'pit':
    case 'air': {
      // A drop: walls visible on the inside of every edge that meets solid ground
      const air = def.pattern === 'air', kin = air ? ['air'] : ['pit'];
      // The palette swatch (no grid) shows open air with no edges
      const open = (dx, dy) => g ? !kin.includes(g.get(key(tx + dx, ty + dy))) : !air;
      if (air) {
        // Cloud sea: billowing puffs seen from above. Each square owns a few puffs;
        // puffs from neighbouring open-air squares spill over (clipped here), drawn
        // in one world-wide order, so clouds flow across squares without seams.
        const puffs = [];
        for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
          const nx = tx + ox, ny = ty + oy;
          if ((ox || oy) && (g ? g.get(key(nx, ny)) !== 'air' : false)) continue;
          for (let i = 0; i < 3; i++) {
            const pv = j => tileNoise(nx, ny, 4243 + i * 31 + j);
            puffs.push({ wx: nx + pv(1), wy: ny + pv(2), r: 0.34 + 0.3 * pv(3) });
          }
        }
        puffs.sort((a, b) => a.wy - b.wy || a.wx - b.wx);
        c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
        for (const p of puffs) {
          const px = sx + (p.wx - tx) * s, py = sy + (p.wy - ty) * s, r = p.r * s;
          if (px + r * 1.3 < sx || px - r > sx + s || py + r * 1.3 < sy || py - r > sy + s) continue;
          c.fillStyle = 'rgba(70,85,130,0.32)';
          c.beginPath(); c.arc(px + r * 0.12, py + r * 0.2, r, 0, Math.PI * 2); c.fill();
          const gr = c.createRadialGradient(px - r * 0.3, py - r * 0.35, 0, px, py, r * 1.05);
          gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.55, '#e4eaf4'); gr.addColorStop(1, '#b4c0d6');
          c.fillStyle = gr; c.beginPath(); c.arc(px, py, r, 0, Math.PI * 2); c.fill();
        }
        c.restore();
      } else {
        c.fillStyle = 'rgba(90,80,65,0.25)';
        for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(sx + (0.2 + 0.6 * n(i + 1)) * s, sy + (0.2 + 0.6 * n(i + 4)) * s, s * 0.04, 0, Math.PI * 2); c.fill(); }
      }
      const d = s * 0.4;
      const edges = [[open(0, -1), sx, sy, sx, sy + d, [sx, sy, s, d]], [open(0, 1), sx, sy + s, sx, sy + s - d, [sx, sy + s - d, s, d]],
                     [open(-1, 0), sx, sy, sx + d, sy, [sx, sy, d, s]], [open(1, 0), sx + s, sy, sx + s - d, sy, [sx + s - d, sy, d, s]]];
      for (const [on, x0, y0, x1, y1, r] of edges) {
        if (!on) continue;
        const gr = c.createLinearGradient(x0, y0, x1, y1);
        // Air: the ledge casts a soft shadow onto the cloud tops below
        gr.addColorStop(0, air ? 'rgba(35,45,80,0.6)' : 'rgba(120,104,84,1)'); gr.addColorStop(0.5, air ? 'rgba(50,65,105,0.22)' : 'rgba(60,50,40,0.6)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = gr; c.fillRect(...r);
      }
      c.strokeStyle = 'rgba(12,9,6,0.95)'; c.lineWidth = Math.max(1, s * 0.06);
      c.beginPath();
      if (edges[0][0]) { c.moveTo(sx, sy); c.lineTo(sx + s, sy); }
      if (edges[1][0]) { c.moveTo(sx, sy + s); c.lineTo(sx + s, sy + s); }
      if (edges[2][0]) { c.moveTo(sx, sy); c.lineTo(sx, sy + s); }
      if (edges[3][0]) { c.moveTo(sx + s, sy); c.lineTo(sx + s, sy + s); }
      c.stroke(); c.setLineDash([]);
      break;
    }
    case 'water': {
      c.fillStyle = 'rgba(0,10,25,0.18)'; c.beginPath(); c.arc(sx + n(1) * s, sy + n(2) * s, s * 0.35, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(170,210,240,0.3)'; c.lineWidth = Math.max(0.6, s * 0.03); c.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        const x = sx + (0.12 + 0.55 * n(i + 3)) * s, y = sy + (0.2 + 0.3 * i) * s, w = s * (0.18 + 0.12 * n(i + 6));
        c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + w / 2, y - s * 0.07, x + w, y); c.stroke();
      }
      c.lineCap = 'butt';
      // Foam where the water meets anything but water
      const wet = ['water', 'shallows'], shore = (dx, dy) => g && !wet.includes(g.get(key(tx + dx, ty + dy)));
      c.strokeStyle = 'rgba(225,240,250,0.5)'; c.lineWidth = Math.max(0.8, s * 0.05); c.beginPath();
      if (shore(0, -1)) { c.moveTo(sx, sy + s * 0.06); c.lineTo(sx + s, sy + s * 0.06); }
      if (shore(0, 1)) { c.moveTo(sx, sy + s * 0.94); c.lineTo(sx + s, sy + s * 0.94); }
      if (shore(-1, 0)) { c.moveTo(sx + s * 0.06, sy); c.lineTo(sx + s * 0.06, sy + s); }
      if (shore(1, 0)) { c.moveTo(sx + s * 0.94, sy); c.lineTo(sx + s * 0.94, sy + s); }
      c.stroke();
      break;
    }
    case 'lava': {
      // Glowing seams between dark crust plates, with hot spots
      c.fillStyle = '#e8601a'; c.fillRect(sx, sy, s, s);
      c.fillStyle = 'rgba(255,200,80,0.5)'; c.fillRect(sx, sy, s, s);
      c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
      for (let i = 0; i < 4; i++) {
        const cx = sx + ((i % 2) + 0.5) * s / 2 + (n(i + 1) - 0.5) * s * 0.12, cy = sy + ((i >> 1) + 0.5) * s / 2 + (n(i + 5) - 0.5) * s * 0.12;
        c.beginPath();
        for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + n(i + 9), r = s * (0.2 + 0.07 * n(i * 6 + k + 20)); k ? c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
        c.closePath(); c.fillStyle = n(i + 30) < 0.5 ? '#3a1a10' : '#4a2012'; c.fill();
        c.strokeStyle = 'rgba(255,120,30,0.5)'; c.lineWidth = Math.max(0.5, s * 0.02); c.stroke();
      }
      const hx = sx + n(40) * s, hy = sy + n(41) * s, gr = c.createRadialGradient(hx, hy, 0, hx, hy, s * 0.3);
      gr.addColorStop(0, 'rgba(255,240,150,0.8)'); gr.addColorStop(1, 'rgba(255,140,30,0)');
      c.fillStyle = gr; c.fillRect(sx, sy, s, s);
      c.restore();
      break;
    }
    case 'bars': {
      // A row of iron bars set in the floor. Runs follow neighbouring bars.
      const isBars = (dx, dy) => g && g.get(key(tx + dx, ty + dy)) === tileKey;
      const horiz = !g || isBars(-1, 0) || isBars(1, 0) || !(isBars(0, -1) || isBars(0, 1));
      c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = Math.max(0.6, s * 0.03);
      c.beginPath(); c.moveTo(sx + s * n(1), sy); c.lineTo(sx + s * n(2), sy + s); c.stroke();
      const along = (t, off = 0) => horiz ? [sx + t * s, sy + s / 2 + off] : [sx + s / 2 + off, sy + t * s];
      c.strokeStyle = 'rgba(0,0,0,0.4)'; c.lineWidth = Math.max(1, s * 0.12);
      c.beginPath(); c.moveTo(...along(0, s * 0.05)); c.lineTo(...along(1, s * 0.05)); c.stroke();
      c.strokeStyle = '#26262a'; c.lineWidth = Math.max(1, s * 0.07);
      c.beginPath(); c.moveTo(...along(0)); c.lineTo(...along(1)); c.stroke();
      for (let i = 0; i < 4; i++) {
        const [x, y] = along((i + 0.5) / 4);
        c.beginPath(); c.arc(x, y, s * 0.075, 0, Math.PI * 2); c.fillStyle = '#3a3a40'; c.fill();
        c.strokeStyle = '#111'; c.lineWidth = Math.max(0.5, s * 0.02); c.stroke();
        c.fillStyle = 'rgba(210,215,225,0.55)'; c.beginPath(); c.arc(x - s * 0.02, y - s * 0.02, s * 0.025, 0, Math.PI * 2); c.fill();
      }
      break;
    }
    case 'pillar': {
      const cx = sx + s / 2, cy = sy + s / 2;
      c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = Math.max(0.6, s * 0.03); c.strokeRect(sx, sy, s, s);
      c.fillStyle = '#7a766c'; c.fillRect(sx + s * 0.08, sy + s * 0.08, s * 0.84, s * 0.84);
      c.strokeStyle = 'rgba(12,9,6,0.85)'; c.lineWidth = Math.max(0.8, s * 0.04); c.strokeRect(sx + s * 0.08, sy + s * 0.08, s * 0.84, s * 0.84);
      c.fillStyle = 'rgba(0,0,0,0.35)'; c.beginPath(); c.arc(cx + s * 0.04, cy + s * 0.05, s * 0.34, 0, Math.PI * 2); c.fill();
      const gr = c.createRadialGradient(cx - s * 0.1, cy - s * 0.1, 0, cx, cy, s * 0.34);
      gr.addColorStop(0, '#d8d2c4'); gr.addColorStop(1, '#6a665e');
      c.beginPath(); c.arc(cx, cy, s * 0.34, 0, Math.PI * 2); c.fillStyle = gr; c.fill(); c.stroke();
      c.strokeStyle = 'rgba(40,35,25,0.35)'; c.lineWidth = Math.max(0.5, s * 0.015); c.beginPath();
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.moveTo(cx + Math.cos(a) * s * 0.2, cy + Math.sin(a) * s * 0.2); c.lineTo(cx + Math.cos(a) * s * 0.33, cy + Math.sin(a) * s * 0.33); }
      c.stroke();
      break;
    }
    case 'stairsUp':
    case 'stairsDown': {
      // Four steps per square; up stairs brighten toward the top of the map,
      // down stairs darken toward the bottom. Side walls where the flight ends.
      const up = def.pattern === 'stairsUp', same = (dx, dy) => g && g.get(key(tx + dx, ty + dy)) === tileKey;
      const steps = 4, h = s / steps;
      for (let i = 0; i < steps; i++) {
        c.fillStyle = up ? `rgba(255,248,230,${0.04 + (steps - 1 - i) * 0.06})` : `rgba(0,0,0,${0.06 + i * 0.09})`;
        c.fillRect(sx, sy + i * h, s, h);
        c.strokeStyle = 'rgba(15,10,5,0.6)'; c.lineWidth = Math.max(0.6, s * 0.03);
        c.beginPath(); c.moveTo(sx, sy + i * h); c.lineTo(sx + s, sy + i * h); c.stroke();
        c.strokeStyle = 'rgba(255,250,230,0.2)'; c.lineWidth = Math.max(0.5, s * 0.015);
        c.beginPath(); c.moveTo(sx, sy + i * h + s * 0.03); c.lineTo(sx + s, sy + i * h + s * 0.03); c.stroke();
      }
      const wall = s * 0.1;
      c.fillStyle = '#4a4440'; c.strokeStyle = 'rgba(12,9,6,0.9)'; c.lineWidth = Math.max(0.8, s * 0.03);
      if (!same(-1, 0)) { c.fillRect(sx, sy, wall, s); c.beginPath(); c.moveTo(sx + wall, sy); c.lineTo(sx + wall, sy + s); c.stroke(); }
      if (!same(1, 0)) { c.fillRect(sx + s - wall, sy, wall, s); c.beginPath(); c.moveTo(sx + s - wall, sy); c.lineTo(sx + s - wall, sy + s); c.stroke(); }
      if (s >= 14 && !(g && same(0, up ? -1 : 1))) {
        // Arrow on the last square of the flight, pointing the way it goes
        const cx = sx + s / 2, cy = sy + s / 2, a = s * 0.16, dir = up ? -1 : 1;
        c.strokeStyle = 'rgba(15,10,5,0.55)'; c.lineWidth = Math.max(1, s * 0.05); c.lineCap = 'round';
        c.beginPath(); c.moveTo(cx - a, cy - dir * a * 0.4); c.lineTo(cx, cy + dir * a * 0.6); c.lineTo(cx + a, cy - dir * a * 0.4); c.stroke(); c.lineCap = 'butt';
      }
      break;
    }
    case 'altarTile':
    case 'chestTile': {
      c.save(); c.translate(sx + s / 2, sy + s / 2); propShadow(c, s);
      if (def.pattern === 'altarTile') PROPS.altar.draw(c, s, s * 0.55, s); else PROPS.chest.draw(c, s, s, s);
      c.restore();
      break;
    }
    case 'trapTile': {
      // Pressure plate with spike holes, ringed in a dashed warning line for the GM
      const p = s * 0.2;
      c.fillStyle = 'rgba(255,245,225,0.1)'; c.fillRect(sx + p, sy + p, s - 2 * p, s - 2 * p);
      c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = Math.max(0.6, s * 0.03); c.strokeRect(sx + p, sy + p, s - 2 * p, s - 2 * p);
      c.fillStyle = 'rgba(10,8,5,0.8)';
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(sx + (0.33 + i * 0.17) * s, sy + (0.33 + j * 0.17) * s, s * 0.025, 0, Math.PI * 2); c.fill(); }
      c.strokeStyle = 'rgba(220,70,55,0.85)'; c.lineWidth = Math.max(0.8, s * 0.04); c.setLineDash([s * 0.08, s * 0.06]);
      c.strokeRect(sx + s * 0.08, sy + s * 0.08, s * 0.84, s * 0.84); c.setLineDash([]);
      break;
    }
    case 'marker': {
      const cx = sx + s / 2, cy = sy + s / 2, r = s * 0.34;
      const col = { entry: '#6ad86a', exit: '#e06a5a', spawn: '#b88ae8' }[def.mark];
      c.strokeStyle = col; c.lineWidth = Math.max(1, s * 0.06); c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
      c.beginPath();
      if (def.mark === 'spawn') {
        // Crossed swords
        for (const d of [-1, 1]) {
          c.moveTo(cx - d * r * 0.55, cy + r * 0.55); c.lineTo(cx + d * r * 0.55, cy - r * 0.55);
          c.moveTo(cx - d * r * 0.55 - r * 0.2, cy + r * 0.55 - d * r * 0.2); c.lineTo(cx - d * r * 0.55 + r * 0.2, cy + r * 0.55 + d * r * 0.2);
        }
      } else {
        // Arrow pointing into the ring (entry) or out of it (exit)
        const x0 = def.mark === 'entry' ? cx - r * 1.1 : cx - r * 0.3, x1 = def.mark === 'entry' ? cx + r * 0.3 : cx + r * 1.15;
        c.moveTo(x0, cy); c.lineTo(x1, cy); c.moveTo(x1 - r * 0.4, cy - r * 0.4); c.lineTo(x1, cy); c.lineTo(x1 - r * 0.4, cy + r * 0.4);
      }
      c.stroke(); c.lineCap = 'butt'; c.lineJoin = 'miter';
      break;
    }
    // ── Fortifications ──
    case 'ashlar':
    case 'brick':
    case 'ruin': {
      // Coursed blocks in running bond, keyed to world position so courses line up
      const brick = def.pattern === 'brick', rows = brick ? 4 : 2, h = s / rows, w = s / 2;
      c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
      c.strokeStyle = brick ? 'rgba(40,20,12,0.55)' : 'rgba(0,0,0,0.42)'; c.lineWidth = Math.max(0.6, s * (brick ? 0.025 : 0.035));
      for (let r = 0; r < rows; r++) {
        const y = sy + r * h, row = ty * rows + r, off = (row % 2) * (w / 2);
        for (let i = -1; i <= 2; i++) {
          const x = sx + i * w + off;
          const v = tileNoise(tx * 2 + i, row, brick ? 61 : 53) - 0.5;
          c.fillStyle = v > 0 ? `rgba(255,245,225,${v * 0.18})` : `rgba(0,0,0,${-v * 0.25})`;
          c.fillRect(x, y, w, h);
          c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.stroke();
        }
        c.beginPath(); c.moveTo(sx, y); c.lineTo(sx + s, y); c.stroke();
      }
      c.restore();
      if (def.pattern === 'ruin') {
        // A broken-away corner, fallen blocks and cracks
        if (n(1) < 0.6) {
          // Corner 0–3 clockwise from top-left; the arc sweeps into the square
          const corner = Math.floor(n(2) * 4), r = s * (0.22 + 0.16 * n(4));
          const cx = sx + (corner === 1 || corner === 2 ? s : 0), cy = sy + (corner >= 2 ? s : 0);
          c.save(); c.beginPath(); c.rect(sx, sy, s, s); c.clip();
          c.fillStyle = '#4a3e30'; c.beginPath(); c.moveTo(cx, cy);
          for (let k = 0; k <= 6; k++) {
            const a = (corner + k / 6) * Math.PI / 2;
            const rr = r * (0.75 + 0.4 * n(10 + k));
            c.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
          }
          c.closePath(); c.fill(); c.restore();
        }
        for (let k = 0; k < 3; k++) {
          const x = sx + (0.15 + 0.7 * n(20 + k)) * s, y = sy + (0.15 + 0.7 * n(30 + k)) * s, r = s * (0.05 + 0.05 * n(40 + k));
          c.fillStyle = '#8a8478'; c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = Math.max(0.5, s * 0.02);
          c.beginPath(); for (let j = 0; j < 5; j++) { const a = j * 1.256 + k; j ? c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
          c.closePath(); c.fill(); c.stroke();
        }
        c.strokeStyle = 'rgba(0,0,0,0.55)'; c.lineWidth = Math.max(0.5, s * 0.02); c.beginPath();
        c.moveTo(sx + n(5) * s, sy); c.lineTo(sx + n(6) * s, sy + s * 0.5); c.lineTo(sx + n(7) * s, sy + s); c.stroke();
      }
      break;
    }
    case 'fieldstone': {
      c.fillStyle = 'rgba(0,0,0,0.3)'; c.fillRect(sx, sy, s, s);
      c.lineWidth = Math.max(0.6, s * 0.03); c.strokeStyle = 'rgba(0,0,0,0.55)';
      for (let i = 0; i < 4; i++) {
        const cx = sx + ((i % 2) + 0.5) * s / 2 + (n(i + 1) - 0.5) * s * 0.08, cy = sy + ((i >> 1) + 0.5) * s / 2 + (n(i + 5) - 0.5) * s * 0.08;
        const v = n(i + 9) - 0.5;
        c.beginPath();
        for (let k = 0; k < 7; k++) {
          const a = k * Math.PI * 2 / 7 + n(i + 13), r = s * (0.2 + 0.06 * n(i * 7 + k + 20));
          k ? c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        c.closePath();
        c.fillStyle = v > 0 ? `rgba(220,212,195,${0.35 + v * 0.3})` : `rgba(170,162,145,${0.35 - v * 0.3})`;
        c.fill(); c.stroke();
      }
      break;
    }
    case 'palisade': {
      // Sharpened log ends in a 3×3 cluster
      for (let i = 0; i < 9; i++) {
        const cx = sx + ((i % 3) + 0.5) * s / 3 + (n(i + 1) - 0.5) * s * 0.03, cy = sy + (Math.floor(i / 3) + 0.5) * s / 3 + (n(i + 11) - 0.5) * s * 0.03;
        const r = s * (0.14 + 0.025 * n(i + 21));
        c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2);
        c.fillStyle = n(i + 31) < 0.5 ? '#7a5632' : '#6a4a2a'; c.fill();
        c.strokeStyle = 'rgba(20,10,5,0.7)'; c.lineWidth = Math.max(0.5, s * 0.025); c.stroke();
        c.beginPath(); c.moveTo(cx, cy - r * 0.8); c.lineTo(cx + r * 0.7, cy + r * 0.4); c.lineTo(cx - r * 0.7, cy + r * 0.4); c.closePath();
        c.fillStyle = 'rgba(230,200,150,0.35)'; c.fill();
      }
      break;
    }
  }
  if (def.fort) drawFortEdges(c, def, sx, sy, s, tx, ty, g);
  if (def.difficult && s >= 12) {
    // Difficult-terrain flag in the bottom-right corner
    const t = s * 0.17;
    c.fillStyle = 'rgba(235,185,70,0.45)';
    c.beginPath(); c.moveTo(sx + s, sy + s - t); c.lineTo(sx + s, sy + s); c.lineTo(sx + s - t, sy + s); c.closePath(); c.fill();
  }
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
    if ((def.pattern || def.difficult) && s >= 8) drawTilePattern(ctx, def, tileKey, sx, sy, s, tx, ty, tileGrid);
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

  renderHatching(s);

  // Grid lines — with auto walls they're clipped to the rooms (outside reads as
  // solid rock); otherwise an infinite grid as before
  if (s >= 6) {
    const x0 = Math.floor(-view.ox / s) - 1, x1 = Math.ceil((canvas.width  - view.ox) / s) + 1;
    const y0 = Math.floor(-view.oy / s) - 1, y1 = Math.ceil((canvas.height - view.oy) / s) + 1;
    ctx.save();
    if (wallStyle.auto) {
      ctx.beginPath();
      for (const k of grid.keys()) {
        const [tx, ty] = k.split(',').map(Number);
        if (tx < x0 || tx > x1 || ty < y0 || ty > y1) continue;
        ctx.rect(view.ox + tx * s, view.oy + ty * s, s, s);
      }
      ctx.clip();
    }
    ctx.strokeStyle = wallStyle.auto ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.07)';
    ctx.lineWidth = wallStyle.auto ? Math.max(0.5, s * 0.025) : 0.5;
    ctx.beginPath();
    for (let tx = x0; tx <= x1; tx++) { const x = view.ox + tx * s; ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
    for (let ty = y0; ty <= y1; ty++) { const y = view.oy + ty * s; ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
    ctx.stroke();
    ctx.restore();
  }

  renderProps(s);
  renderWalls(s);
  renderDoors(s);
  renderSecretDoors(s);
  renderMarkers(s);
  renderTextboxes(s);
  renderTokens(s);
  positionTextEditor();

  // Rect preview
  if (activeTool === 'rect' && mouse.down && mouse.btn === 0 && mouse.rectActive) {
    const area = (Math.abs(mouse.tx - mouse.rectX0) + 1) * (Math.abs(mouse.ty - mouse.rectY0) + 1);
    const sel = rectSelection(area <= 6000);
    const { frx1, fry1, frx2, fry2, rx1, ry1, rx2, ry2, R } = sel;
    let px1, py1, px2, py2;
    if (rectOptions.snapGrid) {
      ({ x: px1, y: py1 } = toScreen(rx1, ry1));
      ({ x: px2, y: py2 } = toScreen(rx2 + 1, ry2 + 1));
    } else {
      px1 = view.ox + frx1 * s; py1 = view.oy + fry1 * s;
      px2 = view.ox + frx2 * s; py2 = view.oy + fry2 * s;
    }
    const pw = px2 - px1, ph = py2 - py1;
    const isErase = rectOptions.mode === 'erase';

    // Tile-by-tile preview: show when snap-on, or when corners/rough need live feedback,
    // or when a tiny snap-off rect falls back to whole squares.
    // Snap-off (basic rect): use smooth floating outline so the lack of grid-snapping is visible.
    const showTiles = rectOptions.snapGrid || R > 0 || rectOptions.rough || sel.fallback;
    if (showTiles && sel.tiles) {
      ctx.fillStyle = isErase ? 'rgba(180,50,30,0.52)' : 'rgba(255,215,0,0.28)';
      for (const [gx, gy] of sel.tiles) {
        const { x: sx, y: sy } = toScreen(gx, gy);
        ctx.fillRect(sx, sy, s, s);
      }
    }

    // Outline
    const pr = Math.min(R * s, Math.min(pw, ph) / 2);
    ctx.beginPath();
    if (pr > 0) {
      ctx.moveTo(px1 + pr, py1);
      ctx.lineTo(px1 + pw - pr, py1);
      ctx.arcTo(px1 + pw, py1, px1 + pw, py1 + pr, pr);
      ctx.lineTo(px1 + pw, py1 + ph - pr);
      ctx.arcTo(px1 + pw, py1 + ph, px1 + pw - pr, py1 + ph, pr);
      ctx.lineTo(px1 + pr, py1 + ph);
      ctx.arcTo(px1, py1 + ph, px1, py1 + ph - pr, pr);
      ctx.lineTo(px1, py1 + pr);
      ctx.arcTo(px1, py1, px1 + pr, py1, pr);
      ctx.closePath();
    } else {
      ctx.rect(px1, py1, pw, ph);
    }
    if (!showTiles) {
      // Snap-off basic rect: thin translucent fill so interior is readable
      ctx.fillStyle = isErase ? 'rgba(180,50,30,0.08)' : 'rgba(255,215,0,0.06)';
      ctx.fill();
    }
    if (rectOptions.rough) ctx.setLineDash([4, 3]);
    // Snap-off: brighter/thicker outline to make the free-floating border obvious
    ctx.strokeStyle = isErase ? '#c04030' : (rectOptions.snapGrid ? 'rgba(255,215,0,0.7)' : '#ffd700');
    ctx.lineWidth = rectOptions.snapGrid ? 1.5 : 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimension label — fractional in snap-off mode so sub-tile precision is visible
    const dimW = rectOptions.snapGrid ? rx2 - rx1 + 1 : Math.round((frx2 - frx1) * 10) / 10;
    const dimH = rectOptions.snapGrid ? ry2 - ry1 + 1 : Math.round((fry2 - fry1) * 10) / 10;
    const dimLabel = `${dimW} × ${dimH}`;
    const fontSize = Math.max(11, Math.min(15, s * 0.55)) | 0;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lcx = (px1 + px2) / 2, lcy = (py1 + py2) / 2;
    const tw = ctx.measureText(dimLabel).width;
    const pad = 4;
    ctx.fillStyle = 'rgba(12,11,9,0.78)';
    ctx.fillRect(lcx - tw / 2 - pad, lcy - fontSize / 2 - pad, tw + pad * 2, fontSize + pad * 2);
    ctx.fillStyle = '#ffd700';
    ctx.fillText(dimLabel, lcx, lcy);
  }

  if (mouse.onCanvas && activeTool !== 'door' && activeTool !== 'secret' && activeTool !== 'wall' && activeTool !== 'marker' && activeTool !== 'text' && activeTool !== 'prop' &&!(activeTool === 'token' && !tokenDragState) && !(activeTool === 'rect' && !rectOptions.snapGrid)) {
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
  const here = mouse.onCanvas ? tokens.filter(tk => tk.x === mouse.tx && tk.y === mouse.ty) : [];
  const prop = mouse.onCanvas ? propAtPoint(mouse.rawX, mouse.rawY) : null;
  const names = [...(prop ? [PROPS[prop.kind].label] : []), ...here.map(tk => tk.name || TOKEN_TYPES[tk.type]?.label)];
  const hereLabel = names.length ? ` · ${names.join(', ')}` : '';
  document.getElementById('status-tile').textContent = t ? `Tile: ${TILES[t]?.label ?? t}${TILES[t]?.difficult ? ' (difficult)' : ''}${hereLabel}` : '';
  const snapIndicator = activeTool === 'rect' ? (rectOptions.snapGrid ? ' [snap]' : ' [free]') : '';
  document.getElementById('status-tool').textContent =
    spaceDown ? 'Tool: pan (space)' : `Tool: ${activeTool}${snapIndicator}`;
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
  const _s = tileS();
  mouse.rawX = (cx - view.ox) / _s; mouse.rawY = (cy - view.oy) / _s;
  mouse.down = true; mouse.btn = e.button; mouse.tx = tx; mouse.ty = ty;

  // Marker right-click: delete marker under cursor
  if (activeTool === 'marker' && e.button === 2) {
    const hit = markerAtPoint(cx, cy);
    if (hit) {
      saveUndo();
      markers = markers.filter(m => m.id !== hit.id);
      commitLevel();
      if (selectedMarkerId === hit.id) { selectedMarkerId = null; markerDragState = null; }
    }
    scheduleRender(); return;
  }

  // Token tool: left-drag a token to move it, right-click to remove it.
  // Right-click on empty space still falls through to panning.
  // Prop tool: click to place the palette's prop, drag one to move it,
  // right-click to remove (right-click on empty space still pans).
  if (activeTool === 'prop' && !spaceDown && (e.button === 0 || e.button === 2)) {
    const wx = mouse.rawX, wy = mouse.rawY;
    const hit = propAtPoint(wx, wy);
    if (e.button === 2) {
      if (hit) { deleteProp(hit.id); return; }
    } else {
      if (propHandleHit(cx, cy)) {
        const p = props.find(q => q.id === selectedPropId);
        const { fw, fh } = propDims(p);
        propDrag = { mode: 'resize', id: p.id, origFw: fw, origFh: fh, undoSaved: false };
      } else if (hit) {
        selectPropById(hit.id);
        propDrag = { mode: 'move', id: hit.id, startWx: wx, startWy: wy, origX: hit.x, origY: hit.y, undoSaved: false };
      } else {
        placeProp(selectedProp, wx, wy, snapModeFor(e));
      }
      scheduleRender();
      return;
    }
  }

  // Text tool: drag a box to move it, its right edge to resize, empty space to
  // draw a new one (a plain click makes a default-width box). Right-click deletes.
  if (activeTool === 'text' && !spaceDown && (e.button === 0 || e.button === 2)) {
    const hit = textboxAt(cx, cy);
    if (e.button === 2) {
      if (hit) { deleteTextbox(hit.id); return; }
    } else {
      const s = tileS();
      if (textboxResizeHit(cx, cy)) {
        const tb = textboxes.find(t => t.id === selectedTextboxId);
        textboxDrag = { mode: 'resize', startCx: cx, origW: tb.w, undoSaved: false };
        return;
      }
      if (hit) {
        selectTextbox(hit.id);
        textboxDrag = { mode: 'move', startCx: cx, startCy: cy, origX: hit.x, origY: hit.y, undoSaved: false };
        return;
      }
      selectTextbox(null);
      const wx = (cx - view.ox) / s, wy = (cy - view.oy) / s;
      textboxDrag = { mode: 'create', x0: wx, y0: wy, x1: wx, y1: wy };
      return;
    }
  }

  // Note tool works the same on existing tokens; a click on an empty spot
  // starts a new note there (a click without dragging on a note edits it — see onMouseUp).
  if ((activeTool === 'token' || activeTool === 'note') && !spaceDown && (e.button === 0 || e.button === 2)) {
    const hit = tokenAtPoint(cx, cy);
    if (hit && e.button === 2) { removeToken(hit.id); return; }
    if (hit && e.button === 0) { setNoteHover(null); tokenDragState = { id: hit.id, undoSaved: false }; scheduleRender(); return; }
    if (!hit && e.button === 0 && activeTool === 'note') {
      mouse.down = false; mouse.btn = -1;
      openNoteEditor({ x: tx, y: ty });
      return;
    }
  }

  // Wall/door/secret tools intercept L+R before the pan block
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

  if (activeTool === 'door' && (e.button === 0 || e.button === 2)) {
    const edge = edgeFromCanvas(cx, cy);
    if (edge) {
      saveUndo();
      const dk = dKey(edge.type, edge.x, edge.y);
      if (e.button === 2) doors.delete(dk);
      else if (doors.has(dk)) doors.delete(dk); else doors.add(dk);
    }
    scheduleRender(); return;
  }

  if (activeTool === 'secret' && (e.button === 0 || e.button === 2)) {
    const edge = edgeFromCanvas(cx, cy);
    if (edge) {
      saveUndo();
      const dk = dKey(edge.type, edge.x, edge.y);
      if (e.button === 2) secretDoors.delete(dk);
      else if (secretDoors.has(dk)) secretDoors.delete(dk); else secretDoors.add(dk);
    }
    scheduleRender(); return;
  }

  if (e.button === 1 || e.button === 2 || (e.button === 0 && (spaceDown || activeTool === 'pan'))) {
    mouse.panX = e.clientX; mouse.panY = e.clientY;
    mouse.panOX = view.ox;  mouse.panOY = view.oy;
    return;
  }
  if (e.button !== 0) return;

  if (activeTool === 'marker') {
    const s = tileS();
    // Check resize handle first (only for selected circle markers)
    if (resizeHandleAtPoint(cx, cy)) {
      const m = markers.find(mk => mk.id === selectedMarkerId);
      if (m) {
        const mpx = view.ox + m.x * s, mpy = view.oy + m.y * s;
        const origDist = Math.sqrt((cx - mpx) ** 2 + (cy - mpy) ** 2);
        markerDragState = { mode: 'resize', startCx: cx, startCy: cy, mPx: mpx, mPy: mpy, origSize: m.size, origDist, undoSaved: false };
      }
      scheduleRender(); return;
    }
    // Click on existing marker → select + start move drag
    const hit = markerAtPoint(cx, cy);
    if (hit) {
      selectedMarkerId = hit.id;
      markerDragState  = { mode: 'move', startCx: cx, startCy: cy, origX: hit.x, origY: hit.y, undoSaved: false };
      scheduleRender(); return;
    }
    // Click on empty space → place new marker
    selectedMarkerId = null; markerDragState = null;
    const rawX = (cx - view.ox) / s, rawY = (cy - view.oy) / s;
    const mx   = Math.round(rawX * 2) / 2, my = Math.round(rawY * 2) / 2;
    let value;
    if (markerTool.type === 'number') {
      const nums = markers.filter(m => m.type === 'number').map(m => parseInt(m.value)).filter(n => !isNaN(n));
      value = String((nums.length ? Math.max(...nums) : 0) + 1);
    } else if (markerTool.type === 'letter') {
      const codes  = markers.filter(m => m.type === 'letter' && m.value.length === 1).map(m => m.value.charCodeAt(0));
      const maxCode = codes.length ? Math.max(...codes) : 64;
      value = String.fromCharCode(maxCode < 90 ? maxCode + 1 : 65);
    } else {
      value = prompt('Label text:', '') ?? '';
      if (!value.trim()) { scheduleRender(); return; }
      value = value.trim();
    }
    saveUndo();
    const newMk = { id: crypto.randomUUID(), type: markerTool.type, value, x: mx, y: my, size: 1, color: markerTool.color };
    markers.push(newMk);
    selectedMarkerId = newMk.id;
    scheduleRender(); return;
  }

  if      (activeTool === 'paint') { saveUndo(); paintedInStroke.clear(); applyPaint(tx, ty); }
  else if (activeTool === 'erase') { saveUndo(); paintedInStroke.clear(); applyErase(tx, ty); }
  else if (activeTool === 'fill')  { saveUndo(); floodFill(tx, ty, selectedTile); scheduleRender(); }
  else if (activeTool === 'rect')  { mouse.rectActive = true; mouse.rectX0 = tx; mouse.rectY0 = ty; mouse.rectRawX0 = mouse.rawX; mouse.rectRawY0 = mouse.rawY; }
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
  const _s = tileS();
  mouse.rawX = (cx - view.ox) / _s; mouse.rawY = (cy - view.oy) / _s;
  if (showSection && ty !== sectionSliceY) sectionSliceY = ty;

  if (activeTool === 'door' || activeTool === 'secret') doorHover = edgeFromCanvas(cx, cy);

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

  if (activeTool === 'marker' && markerDragState && mouse.down && mouse.btn === 0 && !spaceDown) {
    const m = markers.find(mk => mk.id === selectedMarkerId);
    if (m) {
      if (!markerDragState.undoSaved) { saveUndo(); markerDragState.undoSaved = true; }
      const s = tileS();
      if (markerDragState.mode === 'move') {
        const dx = (cx - markerDragState.startCx) / s;
        const dy = (cy - markerDragState.startCy) / s;
        m.x = Math.round((markerDragState.origX + dx) * 2) / 2;
        m.y = Math.round((markerDragState.origY + dy) * 2) / 2;
      } else if (markerDragState.mode === 'resize') {
        const { mPx, mPy, origSize, origDist } = markerDragState;
        const currDist = Math.sqrt((cx - mPx) ** 2 + (cy - mPy) ** 2);
        if (origDist > 2) m.size = Math.max(0.25, Math.min(5, origSize * (currDist / origDist)));
      }
    }
  }

  mouse.cx = cx; mouse.cy = cy; mouse.alt = e.altKey;
  if (propDrag && mouse.down && mouse.btn === 0) {
    const p = props.find(q => q.id === propDrag.id);
    if (p) {
      const wx = mouse.rawX, wy = mouse.rawY;
      if (propDrag.mode === 'move') {
        const { fw, fh } = propDims(p), mode = snapModeFor(e);
        const nx = snapAnchor(propDrag.origX + fw / 2 + (wx - propDrag.startWx), fw, mode);
        const ny = snapAnchor(propDrag.origY + fh / 2 + (wy - propDrag.startWy), fh, mode);
        if (nx !== p.x || ny !== p.y) {
          if (!propDrag.undoSaved) { saveUndo(); propDrag.undoSaved = true; }
          p.x = nx; p.y = ny;
        }
      } else {
        // Resize from the bottom-right corner; top-left stays put.
        // Proportional by default, Shift to stretch freely.
        let fw = wx - p.x, fh = wy - p.y;
        if (!e.shiftKey) {
          const k = Math.max(fw / propDrag.origFw, fh / propDrag.origFh);
          fw = propDrag.origFw * k; fh = propDrag.origFh * k;
        }
        const before = propDims(p);
        const sizeBefore = `${before.fw}x${before.fh}`;
        const saved = { w: p.w, h: p.h };
        setPropFootprint(p, fw, fh);
        const after = propDims(p);
        if (`${after.fw}x${after.fh}` !== sizeBefore) {
          if (!propDrag.undoSaved) {
            // Snapshot the pre-resize size for undo
            const now = { w: p.w, h: p.h };
            if (saved.w === undefined) { delete p.w; delete p.h; } else { p.w = saved.w; p.h = saved.h; }
            saveUndo(); propDrag.undoSaved = true;
            if (now.w === undefined) { delete p.w; delete p.h; } else { p.w = now.w; p.h = now.h; }
          }
          notifyPropSelect();
        }
      }
    }
  }
  if (activeTool === 'prop' && !propDrag) {
    const over = propHandleHit(cx, cy) ? 'nwse-resize' : propAtPoint(mouse.rawX, mouse.rawY) ? 'move' : '';
    if (canvas.style.cursor !== over) canvas.style.cursor = over;
  }

  if (textboxDrag && mouse.down && mouse.btn === 0) {
    const s = tileS();
    if (textboxDrag.mode === 'create') {
      textboxDrag.x1 = (cx - view.ox) / s; textboxDrag.y1 = (cy - view.oy) / s;
    } else {
      const tb = textboxes.find(t => t.id === selectedTextboxId);
      if (tb && (cx !== textboxDrag.startCx || cy !== textboxDrag.startCy)) {
        if (!textboxDrag.undoSaved) { saveUndo(); textboxDrag.undoSaved = true; }
        if (textboxDrag.mode === 'move') {
          tb.x = Math.round((textboxDrag.origX + (cx - textboxDrag.startCx) / s) * 20) / 20;
          tb.y = Math.round((textboxDrag.origY + (cy - textboxDrag.startCy) / s) * 20) / 20;
        } else {
          tb.w = Math.max(1, Math.round((textboxDrag.origW + (cx - textboxDrag.startCx) / s) * 20) / 20);
        }
      }
    }
  }
  if (activeTool === 'text') {
    const over = textboxResizeHit(cx, cy) ? 'ew-resize' : textboxAt(cx, cy) ? 'move' : 'text';
    if (canvas.style.cursor !== over) canvas.style.cursor = over;
  }

  // Hover preview for notes (any tool, when not mid-drag)
  if (!mouse.down) {
    const hov = tokenAtPoint(cx, cy);
    setNoteHover(hov?.type === 'note' ? hov : null);
  }

  if (tokenDragState && mouse.down && mouse.btn === 0 && moved) {
    const tok = tokens.find(t => t.id === tokenDragState.id);
    if (tok) {
      if (!tokenDragState.undoSaved) { saveUndo(); tokenDragState.undoSaved = true; }
      tok.x = tx; tok.y = ty;
    }
  }

  if (mouse.down && mouse.btn === 0 && moved && !spaceDown && activeTool !== 'pan' && activeTool !== 'door' && activeTool !== 'secret' && activeTool !== 'wall' && activeTool !== 'marker') {
    if (activeTool === 'paint') applyPaint(tx, ty);
    if (activeTool === 'erase') applyErase(tx, ty);
  }
  scheduleRender();
}

function onMouseUp(e) {
  if (!mouse.down) return;
  // Refresh position from the actual mouseup event (mousemove may not fire at exact release point)
  const { cx: upCx, cy: upCy } = getPos(e);
  const _upS = tileS();
  mouse.rawX = (upCx - view.ox) / _upS;
  mouse.rawY = (upCy - view.oy) / _upS;
  mouse.tx   = Math.floor(mouse.rawX);
  mouse.ty   = Math.floor(mouse.rawY);
  if (activeTool === 'wall' && (e.button === 0 || e.button === 2)) {
    wallPainting = false; wallErasing = false; paintedInWallStroke.clear();
  }
  if (e.button === 0 && activeTool === 'marker' && markerDragState) {
    markerDragState = null;
  }
  if (e.button === 0 && propDrag) {
    propDrag = null;
    scheduleRender();
  }
  if (e.button === 0 && textboxDrag) {
    const d = textboxDrag;
    textboxDrag = null;
    if (d.mode === 'create') {
      const w = Math.abs(d.x1 - d.x0);
      // A click (or tiny drag) gets a sensible default width
      if (w < 0.5) createTextbox(d.x0, d.y0, 4);
      else createTextbox(Math.min(d.x0, d.x1), Math.min(d.y0, d.y1), w);
    }
    if (e.button === mouse.btn) { mouse.down = false; mouse.btn = -1; }
    scheduleRender();
    return;
  }
  if (e.button === 0 && tokenDragState) {
    const tok = tokens.find(t => t.id === tokenDragState.id);
    if (tok && !tokenDragState.undoSaved && tok.type === 'note' && activeTool === 'note') {
      // Plain click (no drag) on a note → edit it
      tokenDragState = null; scheduleRender();
      openNoteEditor(tok);
      if (e.button === mouse.btn) { mouse.down = false; mouse.btn = -1; }
      return;
    }
    // Moving onto a square that already holds the same content merges them
    if (tok && hasDuplicateToken(tok, tok.x, tok.y, tok.id)) tokens = tokens.filter(t => t.id !== tok.id);
    commitLevel();
    tokenDragState = null;
    notifyTokensChanged(); scheduleRender();
  }
  if (e.button === 0 && activeTool === 'rect' && mouse.rectActive) {
    const sel = rectSelection();
    saveUndo();
    const tileToSet = rectOptions.mode === 'draw' ? selectedTile : 'stone';
    for (const [x, y] of sel.tiles) setTile(x, y, tileToSet);
    mouse.rectActive = false; scheduleRender();
  }
  if (e.button === mouse.btn) { mouse.down = false; mouse.btn = -1; }
}

function onDoubleClick(e) {
  if (activeTool === 'token') {
    const { cx, cy } = getPos(e);
    const hit = tokenAtPoint(cx, cy);
    if (hit?.type === 'note') openNoteEditor(hit);
    else if (hit) window.__editorOnTokenOpen?.({ ...hit });
    return;
  }
  if (activeTool === 'note') return;
  if (activeTool === 'text') {
    const { cx, cy } = getPos(e);
    const hit = textboxAt(cx, cy);
    if (hit) { selectTextbox(hit.id); openTextEditor(hit, false); }
    return;
  }
  if (activeTool !== 'marker') return;
  const { cx, cy } = getPos(e);
  const hit = markerAtPoint(cx, cy);
  if (!hit) return;
  const newVal = prompt(hit.type === 'text' ? 'Label text:' : 'Value:', hit.value);
  if (newVal !== null) {
    const trimmed = newVal.trim();
    if (trimmed && trimmed !== hit.value) {
      saveUndo();
      hit.value = trimmed;
      scheduleRender();
    }
  }
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
  setNoteHover(null);
  const { cx, cy } = getPos(e);
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  const ns = Math.max(0.15, Math.min(8, view.scale * factor));
  view.ox = cx - (cx - view.ox) * (ns / view.scale);
  view.oy = cy - (cy - view.oy) * (ns / view.scale);
  view.scale = ns; scheduleRender();
}

// ── Keyboard ───────────────────────────────────────────────────────────────────
function isTypingTarget(t) {
  return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
}

function onKeyDown(e) {
  if (e.key === ' ') {
    if (!isTypingTarget(e.target)) {
      e.preventDefault();
      if (!spaceDown) { spaceDown = true; spacePanLast = null; window.addEventListener('mousemove', onSpacePanMove); scheduleRender(); }
    }
    return;
  }
  if (isTypingTarget(e.target)) return;
  if (activeTool === 'prop') {
    if (e.key === 'q' || e.key === 'Q') { e.preventDefault(); rotateProp(e.shiftKey ? -1 : 1); return; }
    if (selectedPropId && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); deleteProp(selectedPropId); return; }
    if (selectedPropId && (e.key === '=' || e.key === '+')) { e.preventDefault(); scaleProp(1); return; }
    if (selectedPropId && (e.key === '-' || e.key === '_')) { e.preventDefault(); scaleProp(-1); return; }
    if (selectedPropId && e.key === '0') { e.preventDefault(); scaleProp(0); return; }
    if (e.key === 'Escape') { selectPropById(null); return; }
  }
  if (activeTool === 'text' && selectedTextboxId) {
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteTextbox(selectedTextboxId); return; }
    if (e.key === 'Escape') { selectTextbox(null); return; }
    if (e.key === 'Enter') {
      const tb = textboxes.find(t => t.id === selectedTextboxId);
      if (tb) { e.preventDefault(); openTextEditor(tb, false); }
      return;
    }
  }
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); return; }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); return; }
  const toolKeys = { b: 'paint', e: 'erase', f: 'fill', r: 'rect', p: 'pick', d: 'door', s: 'secret', w: 'wall', m: 'marker', t: 'token', n: 'note', x: 'text', o: 'prop' };
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
  sw.style.background = swatchBackground(k); sw.textContent = def?.sym ?? '';
  document.getElementById('selected-tile-name').textContent = def?.label ?? k;
}

function selectTool(tool) {
  activeTool = tool;
  if (tool !== 'marker') { selectedMarkerId = null; markerDragState = null; }
  if (tool !== 'token' && tool !== 'note') tokenDragState = null;
  if (tool !== 'prop') { propDrag = null; if (selectedPropId) selectPropById(null); if (canvas && activeTool !== 'text') canvas.style.cursor = ''; }
  if (tool !== 'text') {
    commitTextEdit();
    textboxDrag = null;
    if (selectedTextboxId) { selectedTextboxId = null; notifyTextboxSelect(); }
    if (canvas) canvas.style.cursor = '';
  }
  document.querySelectorAll('.tool-btn').forEach(el => el.classList.toggle('active', el.dataset.tool === tool));
  window.__editorOnToolChanged?.(tool);
  scheduleRender();
}

// ── Save / Load ────────────────────────────────────────────────────────────────
function levelToRecord(lv) {
  return {
    id:          lv.id,
    name:        lv.name,
    height:      lv.height ?? 10,
    tiles:       Array.from(lv.grid, ([k, t]) => { const [x, y] = k.split(',').map(Number); return { x, y, tile: t }; }),
    doors:       Array.from(lv.doors),
    secretDoors: Array.from(lv.secretDoors),
    walls:       Array.from(lv.walls),
    markers:     (lv.markers || []).map(m => ({...m})),
    tokens:      (lv.tokens  || []).map(t => ({...t})),
    textboxes:   (lv.textboxes || []).map(t => ({...t})),
    props:       (lv.props || []).map(p => ({...p})),
  };
}

function recordToLevel(rec) {
  const lv = createLevel(rec.name || 'Layer');
  lv.id     = rec.id || lv.id;
  lv.height = (typeof rec.height === 'number' && rec.height > 0) ? rec.height : 10;
  for (const { x, y, tile } of (rec.tiles || [])) {
    if (tile && tile !== 'stone' && TILES[tile]) lv.grid.set(key(x, y), tile);
  }
  for (const dk of (rec.doors       || [])) lv.doors.add(dk);
  for (const dk of (rec.secretDoors || [])) lv.secretDoors.add(dk);
  for (const wk of (rec.walls       || [])) lv.walls.add(wk);
  for (const mk of (rec.markers     || [])) {
    if (mk && mk.id && mk.type && mk.value !== undefined) lv.markers.push({...mk});
  }
  for (const tk of (rec.tokens || [])) {
    if (tk && tk.id && TOKEN_TYPES[tk.type] && Number.isFinite(tk.x) && Number.isFinite(tk.y)) {
      const t = { id: tk.id, x: tk.x, y: tk.y, type: tk.type, refId: tk.refId ?? null, name: tk.name ?? '' };
      if (typeof tk.text === 'string') t.text = tk.text;
      lv.tokens.push(t);
    }
  }
  for (const p of (rec.props || [])) {
    if (p && p.id && PROPS[p.kind] && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      const pr = { id: p.id, kind: p.kind, x: p.x, y: p.y, rot: ((p.rot | 0) % 4 + 4) % 4 };
      if (Number.isFinite(p.w) && Number.isFinite(p.h) && p.w >= PROP_MIN && p.h >= PROP_MIN) { pr.w = p.w; pr.h = p.h; }
      lv.props.push(pr);
    }
  }
  for (const tb of (rec.textboxes || [])) {
    if (tb && tb.id && Number.isFinite(tb.x) && Number.isFinite(tb.y) && typeof tb.text === 'string') {
      lv.textboxes.push({
        id: tb.id, x: tb.x, y: tb.y, w: Number.isFinite(tb.w) && tb.w > 0 ? tb.w : 4, text: tb.text,
        size: TEXTBOX_SIZES[tb.size] ? tb.size : 'm', color: tb.color || '#e8e0d0',
        bg: ['dark', 'parchment', 'none'].includes(tb.bg) ? tb.bg : 'dark',
      });
    }
  }
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
  loadLevelRefs(levels[currentLevelIdx]);
  notifyLevelsChanged();
}

function currentData() {
  commitLevel();
  return {
    name: mapName,
    levels: levels.map(levelToRecord),
    activeLevel: currentLevelIdx,
    wallStyle: { ...wallStyle },
    // Legacy fields kept so play-tab renderer isn't broken
    buildings: [], entryX: 0, entryY: 0, tierTitle: 'Dungeon',
  };
}

async function saveToLibrary() {
  try {
    if (!currentContentId) currentContentId = crypto.randomUUID();
    await window.hxStorage.upsert({ id: currentContentId, type: 'battlemap', name: mapName, data: currentData() });
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
      setWallStyle({ ...WALL_STYLE_DEFAULTS, ...(d.wallStyle || {}) });
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

// ── Export (PDF / JPG) ─────────────────────────────────────────────────────────
// Renders a layer onto an offscreen canvas at a fixed print resolution,
// cropped to what's been drawn. render() and its helpers paint onto the shared
// `canvas`/`ctx`/`view` and the active level's arrays, so those are swapped
// for the duration and restored afterwards, with all editing overlays (hover,
// selection, previews, ghost layers, section slice) switched off.
// Returns [{ name, dataUrl, width, height }], one per non-empty layer exported.
const EXPORT_PX = 64;          // pixels per square
const EXPORT_MAX_SIDE = 8000;  // browsers refuse much larger canvases
const EXPORT_MAX_AREA = 40e6;

function levelBounds(lv) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const add = (x0, y0, x1, y1) => { minX = Math.min(minX, x0); minY = Math.min(minY, y0); maxX = Math.max(maxX, x1); maxY = Math.max(maxY, y1); };
  for (const k of lv.grid.keys()) { const [x, y] = k.split(',').map(Number); add(x, y, x + 1, y + 1); }
  for (const p of lv.props || []) { const { fw, fh } = propDims(p); add(p.x, p.y, p.x + fw, p.y + fh); }
  for (const t of lv.textboxes || []) add(t.x, t.y, t.x + t.w, t.y + 1);
  for (const m of lv.markers || []) add(m.x - 0.5, m.y - 0.5, m.x + 0.5, m.y + 0.5);
  if (!isFinite(minX)) return null;
  return { minX: Math.floor(minX), minY: Math.floor(minY), maxX: Math.ceil(maxX), maxY: Math.ceil(maxY) };
}

function buildExportPages(mimeType = 'image/png', { allLevels = false, includeTokens = false } = {}) {
  commitTextEdit(); commitLevel();
  const saved = {
    canvas, ctx, ox: view.ox, oy: view.oy, scale: view.scale,
    grid, doors, secretDoors, walls, markers, tokens, textboxes, props,
    selectedPropId, selectedTextboxId, selectedMarkerId, doorHover, wallHover, dropHoverTile, hoverNoteId,
    activeTool, showGhostAbove, showGhostBelow, showSection, onCanvas: mouse.onCanvas, down: mouse.down,
  };
  selectedPropId = selectedTextboxId = selectedMarkerId = doorHover = wallHover = dropHoverTile = hoverNoteId = null;
  activeTool = 'export'; showGhostAbove = showGhostBelow = showSection = false;
  mouse.onCanvas = false; mouse.down = false;

  const pages = [];
  try {
    const idxs = allLevels ? levels.map((_, i) => i) : [currentLevelIdx];
    for (const i of idxs) {
      const lv = levels[i], b = levelBounds(lv);
      if (!b) continue;
      grid = lv.grid; doors = lv.doors; secretDoors = lv.secretDoors; walls = lv.walls;
      markers = lv.markers ?? []; textboxes = lv.textboxes ?? []; props = lv.props ?? [];
      tokens = includeTokens ? (lv.tokens ?? []) : [];
      // One square of margin all round so the wall hatching around rooms shows
      const pad = 1, cols = b.maxX - b.minX + pad * 2, rows = b.maxY - b.minY + pad * 2;
      let px = EXPORT_PX;
      px = Math.min(px, EXPORT_MAX_SIDE / cols, EXPORT_MAX_SIDE / rows, Math.sqrt(EXPORT_MAX_AREA / (cols * rows)));
      px = Math.max(8, Math.floor(px));
      const off = document.createElement('canvas');
      off.width = cols * px; off.height = rows * px;
      canvas = off; ctx = off.getContext('2d');
      view.scale = px / TILE_SIZE;
      view.ox = (pad - b.minX) * px; view.oy = (pad - b.minY) * px;
      render();
      pages.push({ name: lv.name, dataUrl: off.toDataURL(mimeType, 0.92), width: off.width, height: off.height });
    }
  } finally {
    ({ canvas, ctx, grid, doors, secretDoors, walls, markers, tokens, textboxes, props,
       selectedPropId, selectedTextboxId, selectedMarkerId, doorHover, wallHover, dropHoverTile, hoverNoteId,
       activeTool, showGhostAbove, showGhostBelow, showSection } = saved);
    view.ox = saved.ox; view.oy = saved.oy; view.scale = saved.scale;
    mouse.onCanvas = saved.onCanvas; mouse.down = saved.down;
    scheduleRender();
  }
  return pages;
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
// Textured swatch images for patterned floors, rendered once with the same
// drawTilePattern() the canvas uses so the palette matches the map.
const swatchCache = new Map();
function swatchBackground(k) {
  const def = TILES[k];
  if (!def) return '#555';
  if (!def.pattern && !def.difficult) return def.color;
  if (!swatchCache.has(k)) {
    const size = 36;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const cx = c.getContext('2d');
    cx.fillStyle = def.color;
    cx.fillRect(0, 0, size, size);
    drawTilePattern(cx, def, k, 0, 0, size, 3, 5, null);
    swatchCache.set(k, `${def.color} url(${c.toDataURL()}) center / cover`);
  }
  return swatchCache.get(k);
}

function buildPalette() {
  const container = document.getElementById('palette');
  for (const cat of TILE_CATS) {
    const h = document.createElement('div');
    h.className = 'palette-cat'; h.textContent = cat;
    container.appendChild(h);
    for (const [k, def] of Object.entries(TILES)) {
      if (def.cat !== cat) continue;
      const btn = document.createElement('button');
      btn.className = 'palette-tile'; btn.dataset.tile = k;
      btn.title = def.difficult ? `${def.label} (difficult terrain)` : def.label;
      btn.onclick = () => selectTile(k);
      const sw = document.createElement('span'); sw.className = 'palette-swatch'; sw.style.background = swatchBackground(k);
      if (def.sym) sw.textContent = def.sym;
      const lb = document.createElement('span'); lb.className = 'palette-label'; lb.textContent = def.label;
      btn.appendChild(sw); btn.appendChild(lb); container.appendChild(btn);
    }
  }

  // Props — click to pick (switches to the Prop tool) or drag straight onto the map
  const listed = new Set(Object.values(PROP_CATS).flat());
  const groups = [...Object.entries(PROP_CATS), ['Other', Object.keys(PROPS).filter(k => !listed.has(k))]];
  for (const [cat, keys] of groups) {
    const valid = keys.filter(k => PROPS[k]);
    if (!valid.length) continue;
    const h = document.createElement('div');
    h.className = 'palette-cat'; h.textContent = `Props · ${cat}`;
    container.appendChild(h);
    for (const k of valid) addPropButton(k, PROPS[k]);
  }
  document.querySelectorAll('.palette-prop').forEach(el => el.classList.toggle('selected', el.dataset.prop === selectedProp));
  notifyPropKind();

  function addPropButton(k, def) {
    const btn = document.createElement('button');
    btn.className = 'palette-tile palette-prop'; btn.dataset.prop = k;
    btn.title = `${def.label} (${def.w}×${def.h}) — click, or drag onto the map`;
    btn.draggable = true;
    btn.onclick = () => selectPropKind(k);
    btn.addEventListener('dragstart', e => {
      e.dataTransfer.setData(TOKEN_DRAG_MIME, JSON.stringify({ type: 'prop', prop: k }));
      e.dataTransfer.effectAllowed = 'copy';
    });
    const sw = document.createElement('span'); sw.className = 'palette-swatch prop-swatch';
    const cv = document.createElement('canvas'); cv.width = cv.height = 36;
    const size = 34 / Math.max(def.w, def.h);
    drawProp(cv.getContext('2d'), { kind: k, rot: 0 }, (36 - def.w * size) / 2, (36 - def.h * size) / 2, size);
    sw.appendChild(cv);
    const lb = document.createElement('span'); lb.className = 'palette-label'; lb.textContent = def.label;
    btn.appendChild(sw); btn.appendChild(lb); container.appendChild(btn);
  }
}

// ── Init ───────────────────────────────────────────────────────────────────────
async function init() {
  canvas = document.getElementById('editor-canvas');
  ctx = canvas.getContext('2d');

  const wrap = document.getElementById('canvas-wrap');
  function resizeCanvas() { canvas.width = wrap.clientWidth; canvas.height = wrap.clientHeight; scheduleRender(); }
  new ResizeObserver(resizeCanvas).observe(wrap);

  // Load existing content
  const incomingId = window.__editorContentId || null;
  if (incomingId) {
    try {
      const item = await window.hxStorage.getById(incomingId);
      if (item?.data) {
        currentContentId = incomingId;
        mapName = item.name || 'Untitled Dungeon';
        document.getElementById('input-name').value = mapName;
        const d = item.data;
        setWallStyle({ ...WALL_STYLE_DEFAULTS, ...(d.wallStyle || {}) }, { notify: false });
        if (d.levels && Array.isArray(d.levels)) {
          applyLoadedLevels(d.levels.map(recordToLevel), d.activeLevel ?? 0);
        } else {
          applyLoadedLevels([legacyToLevel(d)], 0);
        }
      }
    } catch { /* start fresh */ }
  }

  window.__editorOnWallStyle?.({ ...wallStyle });
  buildPalette();
  selectTile('floor');
  selectTool('rect');
  syncUndoButtons();
  notifyLevelsChanged();

  setTimeout(() => { resizeCanvas(); fitView(); scheduleRender(); }, 50);

  canvas.addEventListener('mousedown',   onMouseDown);
  canvas.addEventListener('mousemove',   onMouseMove);
  canvas.addEventListener('dblclick',    onDoubleClick);
  canvas.addEventListener('mouseleave',  () => { mouse.onCanvas = false; doorHover = null; wallHover = null; setNoteHover(null); scheduleRender(); });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('dragover',    onTokenDragOver);
  canvas.addEventListener('dragleave',   onTokenDragLeave);
  canvas.addEventListener('drop',        onTokenDrop);
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
      loadLevelRefs(levels[0]);
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
window.editorDuplicateLevel = duplicateLevel;
window.editorExportPages    = buildExportPages;
window.editorShowToast      = showToast;
window.editorToggleGhostAbove = toggleGhostAbove;
window.editorToggleGhostBelow = toggleGhostBelow;
window.editorToggleSection    = toggleSection;
window.editorInitSection      = initSection;
window.editorSetLayerHeight    = setLayerHeight;
window.editorSetRectOptions    = (opts) => {
  if (opts?.mode         !== undefined) rectOptions.mode         = opts.mode;
  if (opts?.cornerRadius !== undefined) rectOptions.cornerRadius = Math.max(0, Math.min(8, opts.cornerRadius));
  if (opts?.rough        !== undefined) rectOptions.rough        = opts.rough;
  if (opts?.snapGrid     !== undefined) rectOptions.snapGrid     = opts.snapGrid;
  scheduleRender();
};
window.editorSetMarkerSubTool  = (opts) => {
  if (opts?.type)  markerTool.type  = opts.type;
  if (opts?.color) markerTool.color = opts.color;
};

window.editorRemoveToken = removeToken;
window.editorSetTextboxStyle = setTextboxStyle;
window.editorRotateProp      = rotateProp;
window.editorScaleProp       = scaleProp;
window.editorSetPropSnap     = (mode) => { if (['half', 'tile', 'free'].includes(mode)) { propSnap = mode; scheduleRender(); } };
window.editorDeleteProp      = () => deleteProp();
window.editorSetWallStyle    = (opts) => setWallStyle(opts);
window.editorSaveNote    = saveNote;
window.editorEditNote    = (id) => {
  const tok = tokens.find(t => t.id === id && t.type === 'note');
  if (tok) openNoteEditor(tok);
};
// Centre the view on a placed token (from the "On this layer" list).
window.editorFocusToken = (id) => {
  const tok = tokens.find(t => t.id === id);
  if (!tok || !canvas) return;
  const s = tileS();
  view.ox = canvas.width  / 2 - (tok.x + 0.5) * s;
  view.oy = canvas.height / 2 - (tok.y + 0.5) * s;
  scheduleRender();
};

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
