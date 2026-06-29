/* Hexmap Manual Editor — infinite sparse grid */
(function () {
  'use strict';

  // ── Biomes — matches db/seeds/geography_pillar/hex_types.json ────────────
  const BIOMES = {
    ocean:      { label: 'Ocean',      color: '#1a4a6e' },
    coast:      { label: 'Coast',      color: '#3a8abf' },
    plains:     { label: 'Plains',     color: '#7eb05a' },
    forest:     { label: 'Forest',     color: '#2d6a4f' },
    hills:      { label: 'Hills',      color: '#7a9c52' },
    highland:   { label: 'Highland',   color: '#8a9e72' },
    mountain:   { label: 'Mountain',   color: '#7a7a8a' },
    desert:     { label: 'Desert',     color: '#c9a84c' },
    swamp:      { label: 'Swamp',      color: '#4a6741' },
    settlement: { label: 'Settlement', color: '#8a6030' },
  };

  const BIOME_KEYS = Object.keys(BIOMES);
  const HEX_SIZE   = 24;

  // ── Hex geometry ──────────────────────────────────────────────────────────
  function hexToPixel(q, r, size) {
    return {
      x: size * Math.sqrt(3) * (q + 0.5 * (r & 1)),
      y: size * 1.5 * r,
    };
  }

  function pixelToHex(px, py, offX, offY, size) {
    const x = (px - offX) / (size * Math.sqrt(3));
    const y = (py - offY) / (size * 1.5);
    const r0 = Math.round(y);
    const q0 = Math.round(x - 0.5 * (r0 & 1));
    const candidates = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dq = -1; dq <= 1; dq++) {
        const r = r0 + dr, q = q0 + dq;
        const { x: hx, y: hy } = hexToPixel(q, r, size);
        const dx = px - (hx + offX), dy = py - (hy + offY);
        candidates.push({ q, r, d: dx * dx + dy * dy });
      }
    }
    candidates.sort((a, b) => a.d - b.d);
    return { q: candidates[0].q, r: candidates[0].r };
  }

  // Six neighbors in odd-r offset (pointy-top)
  function neighbors(q, r) {
    const o = r & 1;
    return [
      { q: q + 1,     r     },
      { q: q - 1,     r     },
      { q: q + o,     r: r - 1 },
      { q: q + o - 1, r: r - 1 },
      { q: q + o,     r: r + 1 },
      { q: q + o - 1, r: r + 1 },
    ];
  }

  function traceHexPath(cx, cy, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i - Math.PI / 6;
      ctx.lineTo(cx + size * Math.cos(a), cy + size * Math.sin(a));
    }
    ctx.closePath();
  }

  // ── Biome art — matches worldmap.js ──────────────────────────────────────
  function artMountain() {
    ctx.fillStyle = 'rgba(210,210,230,0.5)';
    ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(4,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(190,190,215,0.82)';
    ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(13,6); ctx.lineTo(-7,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(8,-5); ctx.lineTo(-2,-5); ctx.closePath(); ctx.fill();
  }
  function artHighland() {
    ctx.fillStyle = 'rgba(255,255,255,0.17)';
    ctx.beginPath(); ctx.arc(0,9,13,Math.PI,0,true); ctx.closePath(); ctx.fill();
  }
  function artForest() {
    ctx.fillStyle = 'rgba(10,60,20,0.78)';
    ctx.beginPath(); ctx.moveTo(-6,-9); ctx.lineTo(1,5); ctx.lineTo(-13,5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(25,105,40,0.88)';
    ctx.beginPath(); ctx.moveTo(5,-9); ctx.lineTo(13,5); ctx.lineTo(-3,5); ctx.closePath(); ctx.fill();
  }
  function artHills() {
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath(); ctx.arc(-4,8,8,Math.PI,0,true); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(5,9,6,Math.PI,0,true); ctx.closePath(); ctx.fill();
  }
  function artPlains() {
    ctx.strokeStyle = 'rgba(0,60,0,0.55)'; ctx.lineWidth = 1.5;
    [[-5,0],[0,1],[5,0]].forEach(([xo,yo]) => {
      ctx.beginPath(); ctx.moveTo(xo,7+yo); ctx.quadraticCurveTo(xo-2,2+yo,xo,-6+yo); ctx.stroke();
    });
  }
  function artDesert() {
    ctx.strokeStyle = 'rgba(160,118,20,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-10,-3); ctx.quadraticCurveTo(-5,-9,0,-3); ctx.quadraticCurveTo(5,3,10,-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-9,4); ctx.quadraticCurveTo(-2,-2,4,4); ctx.stroke();
  }
  function artSwamp() {
    ctx.strokeStyle = 'rgba(0,45,0,0.72)'; ctx.lineWidth = 1.5;
    [-6,0,6].forEach(x => {
      ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x,-4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x,0); ctx.quadraticCurveTo(x+6,-5,x+5,-1); ctx.stroke();
    });
  }
  function artOcean() {
    ctx.strokeStyle = 'rgba(130,195,255,0.32)'; ctx.lineWidth = 1.5;
    [-6,0,6].forEach(y => {
      ctx.beginPath(); ctx.moveTo(-9,y); ctx.quadraticCurveTo(-4,y-4,0,y); ctx.quadraticCurveTo(4,y+4,9,y); ctx.stroke();
    });
  }
  function artCoast() {
    ctx.strokeStyle = 'rgba(255,255,255,0.38)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-9,2); ctx.quadraticCurveTo(-4,-5,0,2); ctx.quadraticCurveTo(4,9,9,2); ctx.stroke();
  }
  function artSettlement() {
    // Dark circle with golden border — matches the village POI in the play tab
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = '#f5d060'; ctx.lineWidth = 1.5; ctx.stroke();
    // House icon (triangle roof + rectangle body)
    ctx.fillStyle = '#f5d060';
    ctx.beginPath(); ctx.moveTo(-3, 1); ctx.lineTo(0, -4); ctx.lineTo(3, 1); ctx.closePath(); ctx.fill();
    ctx.fillRect(-2.5, 1, 5, 3.5);
  }

  function drawBiomeArt(cx, cy, size, biome) {
    ctx.save();
    traceHexPath(cx, cy, size);
    ctx.clip();
    ctx.translate(cx, cy);
    ctx.scale(size / 24, size / 24);
    switch (biome) {
      case 'mountain': artMountain(); break;
      case 'highland': artHighland(); break;
      case 'forest':   artForest();   break;
      case 'hills':    artHills();    break;
      case 'plains':   artPlains();   break;
      case 'desert':   artDesert();   break;
      case 'swamp':    artSwamp();    break;
      case 'ocean':    artOcean();    break;
      case 'coast':      artCoast();      break;
      case 'settlement': artSettlement(); break;
    }
    ctx.restore();
  }

  function drawHex(cx, cy, size, biome) {
    traceHexPath(cx, cy, size);
    ctx.fillStyle = BIOMES[biome]?.color ?? BIOMES.ocean.color;
    ctx.fill();
    drawBiomeArt(cx, cy, size, biome);
    traceHexPath(cx, cy, size);
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // ── State ─────────────────────────────────────────────────────────────────
  // Sparse infinite grid: only painted hexes exist in the map
  let grid = new Map(); // "q,r" → biome string
  let currentBiome = 'plains';
  let currentTool  = 'paint';
  let currentContentId = null;

  let ox = 0, oy = 0, scale = 1;
  let isPainting = false, isPanning = false;
  let panStart = null;
  let undoStack = [], redoStack = [];
  let pendingSnapshot = null;
  let spaceDown = false;
  let spacePanLast = null; // last mouse pos during no-click space-pan
  let hexArticles = new Map(); // "q,r" → { id, name }

  // Center-pick mode: set by React when user clicks "Pick on map"
  let pickCenterCb = null;

  let canvas, ctx, wrap;
  let rafId = null;

  // ── Undo / redo ───────────────────────────────────────────────────────────
  function snapshot() { return new Map(grid); }

  function pushUndo(before) {
    undoStack.push(before);
    if (undoStack.length > 80) undoStack.shift();
    redoStack = [];
  }

  function undo() {
    if (!undoStack.length) return;
    redoStack.push(snapshot());
    grid = undoStack.pop();
    scheduleRender();
  }

  function redo() {
    if (!redoStack.length) return;
    undoStack.push(snapshot());
    grid = redoStack.pop();
    scheduleRender();
  }

  // ── Grid helpers ──────────────────────────────────────────────────────────
  function key(q, r) { return q + ',' + r; }

  // ── Flood fill (only spreads to existing hexes) ───────────────────────────
  function floodFill(startQ, startR) {
    const startKey = key(startQ, startR);
    if (!grid.has(startKey)) return;
    const origBiome = grid.get(startKey);
    if (origBiome === currentBiome) return;

    const before = snapshot();
    const queue   = [{ q: startQ, r: startR }];
    const visited = new Set([startKey]);

    while (queue.length) {
      const { q, r } = queue.pop();
      grid.set(key(q, r), currentBiome);
      for (const nb of neighbors(q, r)) {
        const nk = key(nb.q, nb.r);
        if (!visited.has(nk) && grid.has(nk) && grid.get(nk) === origBiome) {
          visited.add(nk);
          queue.push(nb);
        }
      }
    }
    pushUndo(before);
  }

  // ── Rendering ─────────────────────────────────────────────────────────────
  function scheduleRender() {
    if (!rafId) rafId = requestAnimationFrame(() => { rafId = null; render(); });
  }

  function renderGrid(size, cxOff, cyOff) {
    const margin = size * 2;
    const S3     = Math.sqrt(3);

    const rMin = Math.floor((-margin - cyOff) / (size * 1.5)) - 1;
    const rMax = Math.ceil((canvas.height + margin - cyOff) / (size * 1.5)) + 1;

    ctx.beginPath();
    for (let r = rMin; r <= rMax; r++) {
      const qMin = Math.floor((-margin - cxOff) / (size * S3) - 0.5 * (r & 1)) - 1;
      const qMax = Math.ceil((canvas.width + margin - cxOff) / (size * S3) - 0.5 * (r & 1)) + 1;
      for (let q = qMin; q <= qMax; q++) {
        const { x, y } = hexToPixel(q, r, size);
        const sx = x + cxOff, sy = y + cyOff;
        for (let i = 0; i < 6; i++) {
          const a  = Math.PI / 3 * i - Math.PI / 6;
          const px = sx + size * Math.cos(a);
          const py = sy + size * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
      }
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth   = 0.8;
    ctx.stroke();
  }

  function drawArticleIndicator(cx, cy, size) {
    const r  = Math.max(6, size * 0.22);
    const ix = cx + size * 0.38;
    const iy = cy - size * 0.48;
    ctx.save();
    ctx.beginPath(); ctx.arc(ix, iy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8,6,4,0.92)'; ctx.fill();
    ctx.strokeStyle = '#c9a84c'; ctx.lineWidth = Math.max(1.2, r * 0.25); ctx.stroke();
    ctx.fillStyle = '#c9a84c';
    ctx.font = `bold ${Math.round(r * 1.2)}px Georgia, serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('A', ix, iy + r * 0.07);
    ctx.restore();
  }

  function render() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#080706';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const size   = HEX_SIZE * scale;
    const cxOff  = canvas.width  / 2 + ox;
    const cyOff  = canvas.height / 2 + oy;
    const margin = size * 2;

    renderGrid(size, cxOff, cyOff);

    for (const [k, biome] of grid) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (sx < -margin || sx > canvas.width  + margin) continue;
      if (sy < -margin || sy > canvas.height + margin) continue;
      drawHex(sx, sy, size - 0.5, biome);
    }

    // Draw article-link badges on linked hexes
    for (const [k] of hexArticles) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (sx < -margin || sx > canvas.width  + margin) continue;
      if (sy < -margin || sy > canvas.height + margin) continue;
      drawArticleIndicator(sx, sy, size);
    }

    if (hoverHex) {
      const { x, y } = hexToPixel(hoverHex.q, hoverHex.r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (pickCenterCb) {
        // Gold ghost in pick-center mode
        traceHexPath(sx, sy, size - 0.5);
        ctx.fillStyle   = 'rgba(255,215,0,0.08)';
        ctx.fill();
        traceHexPath(sx, sy, size - 0.5);
        ctx.strokeStyle = 'rgba(255,215,0,0.8)';
        ctx.lineWidth   = 2;
        ctx.stroke();
      } else {
        // Normal hover highlight
        traceHexPath(sx, sy, size - 0.5);
        ctx.fillStyle   = 'rgba(255,255,255,0.07)';
        ctx.fill();
        traceHexPath(sx, sy, size - 0.5);
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      }
    }
  }

  let hoverHex = null;

  // ── Fit view to grid bounds ───────────────────────────────────────────────
  function fitView() {
    if (!grid.size) { ox = 0; oy = 0; scale = 1; scheduleRender(); return; }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const k of grid.keys()) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, HEX_SIZE);
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }

    const pad  = HEX_SIZE * 2;
    const mapW = (maxX - minX) + pad * 2;
    const mapH = (maxY - minY) + pad * 2;
    scale = Math.min(canvas.width / mapW, canvas.height / mapH, 2);
    ox = -((minX + maxX) / 2) * scale;
    oy = -((minY + maxY) / 2) * scale;
    scheduleRender();
  }

  // ── Canvas sizing ─────────────────────────────────────────────────────────
  function resizeCanvas() {
    canvas.width  = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    scheduleRender();
  }

  // ── Tools ─────────────────────────────────────────────────────────────────
  function applyTool(q, r) {
    if (currentTool === 'paint') {
      grid.set(key(q, r), currentBiome);
    } else if (currentTool === 'erase') {
      grid.delete(key(q, r));
    } else if (currentTool === 'pick') {
      const b = grid.get(key(q, r));
      if (b) { currentBiome = b; updatePalette(); updateSelectedInfo(); }
    }
    scheduleRender();
  }

  // ── Save / load ───────────────────────────────────────────────────────────
  function gridToArray() {
    const result = [];
    for (const [k, biome] of grid) {
      const [q, r] = k.split(',').map(Number);
      result.push({ q, r, biome });
    }
    return result;
  }

  function arrayToGrid(arr) {
    grid = new Map();
    for (const { q, r, biome } of arr) {
      grid.set(key(q, r), biome);
    }
  }

  function mergeHexes(arr) {
    for (const { q, r, biome } of arr) {
      grid.set(key(q, r), biome);
    }
  }

  function hexArticlesToArray() {
    const result = [];
    for (const [k, article] of hexArticles) {
      const [q, r] = k.split(',').map(Number);
      result.push({ q, r, id: article.id, name: article.name });
    }
    return result;
  }

  function arrayToHexArticles(arr) {
    hexArticles = new Map();
    for (const { q, r, id, name } of (arr || [])) {
      hexArticles.set(key(q, r), { id, name });
    }
  }

  function getMapName() {
    return document.getElementById('hx-input-name')?.value || 'Untitled Hex Map';
  }

  function saveToLibrary() {
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    const now  = new Date().toISOString();
    const id   = currentContentId || crypto.randomUUID();
    currentContentId = id;
    const record = {
      id, type: 'hexmap', name: getMapName(),
      data: { hexes: gridToArray(), hexArticles: hexArticlesToArray() },
      updatedAt: now,
      createdAt: all.find(i => i.id === id)?.createdAt ?? now,
    };
    const idx = all.findIndex(i => i.id === id);
    if (idx >= 0) all[idx] = record; else all.unshift(record);
    localStorage.setItem('hx_content', JSON.stringify(all));
    showToast('Saved to library!');
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ name: getMapName(), hexes: gridToArray(), hexArticles: hexArticlesToArray() }, null, 2)],
      { type: 'application/json' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (getMapName() || 'hexmap') + '.json';
    a.click();
  }

  function loadContent(id) {
    try {
      const all  = JSON.parse(localStorage.getItem('hx_content') || '[]');
      const item = all.find(i => i.id === id);
      if (!item) return;
      const nameEl = document.getElementById('hx-input-name');
      if (nameEl) nameEl.value = item.name || 'Untitled Hex Map';
      if (item.data?.hexes) {
        arrayToGrid(item.data.hexes);
        arrayToHexArticles(item.data.hexArticles);
        scheduleRender();
      }
    } catch (e) { console.error('hexmap load error', e); }
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  function showToast(msg) {
    const t = document.getElementById('hx-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  }

  // ── Palette ───────────────────────────────────────────────────────────────
  function buildPalette() {
    const el = document.getElementById('hx-palette');
    if (!el) return;
    el.innerHTML = '';
    for (const bk of BIOME_KEYS) {
      const b    = BIOMES[bk];
      const item = document.createElement('div');
      item.className  = 'hx-pal-item' + (bk === currentBiome ? ' selected' : '');
      item.dataset.biome = bk;
      const swatch = document.createElement('span');
      swatch.className = 'hx-pal-swatch';
      swatch.style.background = b.color;
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(b.label));
      item.addEventListener('click', () => {
        currentBiome = bk;
        currentTool  = 'paint';
        updatePalette();
        updateSelectedInfo();
        updateToolbar();
      });
      el.appendChild(item);
    }
  }

  function updatePalette() {
    document.querySelectorAll('#hx-palette .hx-pal-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.biome === currentBiome);
    });
  }

  function updateSelectedInfo() {
    const swatch = document.getElementById('hx-selected-tile-swatch');
    const name   = document.getElementById('hx-selected-tile-name');
    if (swatch) swatch.style.background = BIOMES[currentBiome]?.color ?? '#111';
    if (name)   name.textContent = BIOMES[currentBiome]?.label ?? currentBiome;
  }

  function updateToolbar() {
    document.querySelectorAll('#hx-toolbar .hx-tool-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === currentTool);
    });
  }

  function updateStatus(q, r) {
    const hasTile = grid.has(key(q, r));
    const article = hexArticles.get(key(q, r));
    const posEl   = document.getElementById('hx-status-pos');
    const tileEl  = document.getElementById('hx-status-tile');
    const artEl   = document.getElementById('hx-status-article');
    const toolEl  = document.getElementById('hx-status-tool');
    if (posEl)  posEl.textContent  = `(${q}, ${r})`;
    if (tileEl) tileEl.textContent = hasTile ? (BIOMES[grid.get(key(q, r))]?.label ?? '') : '';
    if (artEl)  artEl.textContent  = article ? `· ${article.name}` : '';
    if (toolEl) toolEl.textContent = pickCenterCb ? 'Click a hex to set center'
      : spaceDown ? 'Tool: pan (space)' : 'Tool: ' + currentTool;
  }

  function updateCursor() {
    if (pickCenterCb)                         { canvas.style.cursor = 'cell';       return; }
    if (isPanning)                            { canvas.style.cursor = 'grabbing';   return; }
    if (spaceDown || currentTool === 'pan')   { canvas.style.cursor = 'grab';       return; }
    canvas.style.cursor = 'crosshair';
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  // ── Article drag-drop ─────────────────────────────────────────────────────
  // Track last drag-hover hex separately: drop events can have wrong clientX/Y
  // in some browsers (e.g. Firefox reports 0,0), so we use the last dragover position.
  let dragTargetHex = null;

  function onDragOver(e) {
    const types = Array.from(e.dataTransfer.types);
    if (!types.includes('application/hexmap-article')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'link';
    const { q, r } = hexFromEvent(e);
    dragTargetHex = { q, r };
    hoverHex = { q, r };
    scheduleRender();
  }

  function onDragLeave(e) {
    // Ignore leave events caused by moving to a child element
    if (e.relatedTarget && canvas.contains(e.relatedTarget)) return;
    dragTargetHex = null;
    hoverHex = null;
    scheduleRender();
  }

  function onDrop(e) {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/hexmap-article');
    const target = dragTargetHex;
    dragTargetHex = null;
    hoverHex = null;
    if (!raw || !target) { scheduleRender(); return; }
    try {
      const { id, name } = JSON.parse(raw);
      hexArticles.set(key(target.q, target.r), { id, name });
      scheduleRender();
      window.__hexmapOnLinksChanged?.();
    } catch { scheduleRender(); }
  }

  // Window-level pan handler for click-drag panning (middle/right/pan-tool)
  function onPanMove(e) {
    if (!isPanning || !panStart) return;
    ox = panStart.ox + (e.clientX - panStart.x);
    oy = panStart.oy + (e.clientY - panStart.y);
    scheduleRender();
  }

  // No-click space pan: move mouse while space held to pan
  function onSpacePanMove(e) {
    if (isPanning) { spacePanLast = null; return; } // click-pan in progress, defer
    if (spacePanLast) {
      ox += e.clientX - spacePanLast.x;
      oy += e.clientY - spacePanLast.y;
      scheduleRender();
    }
    spacePanLast = { x: e.clientX, y: e.clientY };
  }

  function hexFromEvent(e) {
    const rect  = canvas.getBoundingClientRect();
    const size  = HEX_SIZE * scale;
    const cxOff = canvas.width  / 2 + ox;
    const cyOff = canvas.height / 2 + oy;
    return pixelToHex(e.clientX - rect.left, e.clientY - rect.top, cxOff, cyOff, size);
  }

  function onMouseDown(e) {
    // Middle-click, right-click, or pan-tool left-click → click-drag pan
    if (e.button === 1 || e.button === 2 ||
        (e.button === 0 && currentTool === 'pan')) {
      isPanning = true;
      panStart  = { x: e.clientX, y: e.clientY, ox, oy };
      window.addEventListener('mousemove', onPanMove);
      updateCursor();
      return;
    }
    if (e.button !== 0) return;
    if (spaceDown) return; // space-pan handled by mousemove, ignore left-clicks

    const { q, r } = hexFromEvent(e);

    // Center-pick mode: hand the hex back to React and exit
    if (pickCenterCb) {
      pickCenterCb({ q, r });
      pickCenterCb = null;
      updateCursor();
      scheduleRender();
      return;
    }

    if (currentTool === 'fill') {
      floodFill(q, r);
      scheduleRender();
      return;
    }

    pendingSnapshot = snapshot();
    isPainting = true;
    applyTool(q, r);
    updateStatus(q, r);
  }

  function onMouseMove(e) {
    if (isPanning) return; // handled globally by onPanMove
    const { q, r } = hexFromEvent(e);
    // Notify React when the hovered hex changes (for the article hover card)
    if (!hoverHex || hoverHex.q !== q || hoverHex.r !== r) {
      window.__hexmapOnHexHover?.(q, r, hexArticles.get(key(q, r)) || null);
    }
    hoverHex = { q, r };
    updateStatus(q, r);
    if (isPainting) applyTool(q, r);
    scheduleRender();
  }

  function onMouseUp() {
    if (isPainting && pendingSnapshot) {
      pushUndo(pendingSnapshot);
      pendingSnapshot = null;
    }
    isPainting = false;
    isPanning  = false;
    panStart   = null;
    window.removeEventListener('mousemove', onPanMove);
    updateCursor();
  }

  function onWheel(e) {
    e.preventDefault();
    const rect   = canvas.getBoundingClientRect();
    const mx     = e.clientX - rect.left - canvas.width  / 2;
    const my     = e.clientY - rect.top  - canvas.height / 2;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const ns     = Math.max(0.15, Math.min(8, scale * factor));
    ox = mx - (mx - ox) * (ns / scale);
    oy = my - (my - oy) * (ns / scale);
    scale = ns;
    scheduleRender();
  }

  function onKeyDown(e) {
    // Space pan: handle before the input guard so it works regardless of focus
    if (e.key === ' ') {
      if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (!spaceDown) {
          spaceDown = true;
          spacePanLast = null;
          window.addEventListener('mousemove', onSpacePanMove);
          updateCursor();
          scheduleRender();
        }
      }
      return;
    }
    // All other shortcuts are suppressed while typing in an input
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'Escape' && pickCenterCb) {
      pickCenterCb = null;
      updateCursor();
      scheduleRender();
      return;
    }
    const toolMap = { b: 'paint', e: 'erase', f: 'fill', p: 'pick', h: 'pan' };
    const tool = toolMap[e.key.toLowerCase()];
    if (tool) { currentTool = tool; updateToolbar(); updateCursor(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
  }

  function onKeyUp(e) {
    if (e.key === ' ') {
      spaceDown = false;
      spacePanLast = null;
      window.removeEventListener('mousemove', onSpacePanMove);
      updateCursor();
      scheduleRender();
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    canvas = document.getElementById('hx-canvas');
    wrap   = document.getElementById('hx-canvas-wrap');
    if (!canvas || !wrap) return;
    ctx = canvas.getContext('2d');

    const incomingId = window.__hexmapContentId || null;
    currentContentId = incomingId;
    if (incomingId) loadContent(incomingId);

    // Seed new maps with the 7-hex flower (center + 6 neighbors)
    if (!grid.size) {
      [[0,0],[1,0],[-1,0],[0,-1],[-1,-1],[0,1],[-1,1]]
        .forEach(([q, r]) => grid.set(key(q, r), 'plains'));
    }

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(wrap);
    resizeCanvas();
    fitView();

    canvas.addEventListener('mousedown',   onMouseDown);
    canvas.addEventListener('mousemove',   onMouseMove);
    canvas.addEventListener('mouseleave',  () => { hoverHex = null; window.__hexmapOnHexHover?.(null, null, null); scheduleRender(); });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('wheel',       onWheel, { passive: false });
    canvas.addEventListener('dragover',    onDragOver);
    canvas.addEventListener('dragleave',   onDragLeave);
    canvas.addEventListener('drop',        onDrop);
    window.addEventListener('mouseup',     onMouseUp);
    document.addEventListener('keydown',   onKeyDown);
    document.addEventListener('keyup',     onKeyUp);
    window.addEventListener('blur',        () => {
      if (spaceDown) {
        spaceDown = false;
        spacePanLast = null;
        window.removeEventListener('mousemove', onSpacePanMove);
        updateCursor();
      }
    });

    document.querySelectorAll('#hx-toolbar .hx-tool-btn').forEach(btn => {
      if (!btn.dataset.tool) return;
      btn.addEventListener('click', () => { currentTool = btn.dataset.tool; updateToolbar(); });
    });

    document.getElementById('btn-hx-undo')?.addEventListener('click', undo);
    document.getElementById('btn-hx-redo')?.addEventListener('click', redo);
    document.getElementById('btn-hx-save')?.addEventListener('click', saveToLibrary);
    document.getElementById('btn-hx-export')?.addEventListener('click', exportJson);
    document.getElementById('btn-hx-fit')?.addEventListener('click', fitView);

    buildPalette();
    updateSelectedInfo();
    updateToolbar();

    // ── API exposed to React ─────────────────────────────────────────────────

    // Merge generated hexes into the grid (called from Generate panel)
    window.hexmapLoadHexes = function (hexes) {
      const before = snapshot();
      mergeHexes(hexes);
      pushUndo(before);
      fitView();
    };

    // Enter center-pick mode; cb receives { q, r } of the clicked hex
    window.hexmapStartPickCenter = function (cb) {
      pickCenterCb = cb;
      canvas.style.cursor = 'cell';
      scheduleRender();
    };

    // Cancel center-pick mode (called if user clicks away in React UI)
    window.hexmapCancelPickCenter = function () {
      pickCenterCb = null;
      canvas.style.cursor = 'crosshair';
      scheduleRender();
    };

    window.hexmapGetAllLinks = function () {
      return hexArticlesToArray();
    };

    window.hexmapGetHexScreenPos = function (q, r) {
      const size = HEX_SIZE * scale;
      const cxOff = canvas.width  / 2 + ox;
      const cyOff = canvas.height / 2 + oy;
      const { x, y } = hexToPixel(q, r, size);
      const rect = canvas.getBoundingClientRect();
      return { x: rect.left + x + cxOff, y: rect.top + y + cyOff, size };
    };

    window.hexmapUnlinkArticle = function (q, r) {
      hexArticles.delete(key(q, r));
      scheduleRender();
      window.__hexmapOnLinksChanged?.();
    };

    window.cleanupHexmap = function () {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup',   onKeyUp);
      window.removeEventListener('mouseup',   onMouseUp);
      window.removeEventListener('mousemove', onPanMove);
      window.removeEventListener('mousemove', onSpacePanMove);
      window.removeEventListener('blur',      () => {});
      canvas.removeEventListener('dragover',  onDragOver);
      canvas.removeEventListener('dragleave', onDragLeave);
      canvas.removeEventListener('drop',      onDrop);
      window.__hexmapOnLinksChanged = null;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      window.hexmapLoadHexes        = null;
      window.hexmapStartPickCenter  = null;
      window.hexmapCancelPickCenter = null;
      window.hexmapGetAllLinks      = null;
      window.hexmapUnlinkArticle    = null;
      window.hexmapGetHexScreenPos  = null;
      window.__hexmapOnHexHover     = null;
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
