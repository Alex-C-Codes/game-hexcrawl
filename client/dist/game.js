const socket = io();

// ---- Constants ----
const HEX_SIZE  = 24;
// TILE_SIZE, BATTLE_PASSABLE, TILE_COLORS → battlemap.js
const SQRT3    = Math.sqrt(3);
const MIN_SCALE = 0.4;
const MAX_SCALE = 2.8;

// Populated from server's map-data event
let BIOME_COLORS = {};
let BIOME_LABELS = {};
let hexLookup    = new Map(); // "q,r" → hex
let landmarks    = new Set(); // "q,r" of hexes always visible through fog of war
const CLASS_ICONS  = { warrior: '⚔️', ranger: '🏹', mage: '🔮', rogue: '🗡️' };
const TYPE_LABELS  = { creature: 'Creature', item: 'Item', aberration: 'Aberration' };
const POI_COLORS   = {
  village: '#f5d060', ruins: '#b0a080', tower: '#c0b8d8', cave: '#907898',
  shrine:  '#e8dfc0', port:  '#60a0e0', dungeon: '#c04858', barrow: '#a08060',
};
const POI_LABELS   = {
  village: 'Village', ruins: 'Ruins', tower: 'Tower', cave: 'Cave',
  shrine: 'Shrine', port: 'Port', dungeon: 'Dungeon', barrow: 'Barrow',
};

// ---- State ----
let mapData      = null;
let startHex     = null;
let partyHex     = null;
let rivers       = [];
let votes        = {};
let myVote       = null;
let totalPlayers = 0;
let stepCount    = 0;
let worldTime    = null;
let hoverHex     = null;
let scale        = 1.0;
let camera       = { x: 0, y: 0 };
let targetCam    = null;
let drag         = { active: false, startX: 0, startY: 0, camX: 0, camY: 0 };
let didDrag      = false;
let animFrame    = null;
let partyJoined  = false;
let flashHex     = null;
let flashStart   = 0;
const FLASH_MS   = 1400;
const eventLog   = [];
const MAX_LOG    = 8;
let pois   = [];
let poiMap = new Map();
const exploredHexes = new Set();
const VISION_RANGE = 2;
let gmMode = false;

// ---- Settlement / battlemap state ----
let inSettlement    = false;
let battleMap       = null;
let battlePartyTile = null;
let battleVotes     = {};
let battleHoverTile = null;
let settlementName  = '';

// ---- GM Mode ----
function toggleGMMode() {
  gmMode = !gmMode;
  const btn = document.getElementById('gm-toggle');
  btn.textContent = gmMode ? 'GM View: ON' : 'GM View: OFF';
  btn.style.background = gmMode ? '#2a5a2a' : '#555';
}
const gmToggleBtn = document.getElementById('gm-toggle');
if (gmToggleBtn) {
  gmToggleBtn.addEventListener('click', toggleGMMode);
}

const newGameBtn = document.getElementById('new-game-btn');
if (newGameBtn) {
  newGameBtn.addEventListener('click', () => {
    if (confirm('Start a new game? The current world will be lost.')) {
      socket.emit('new-game');
    }
  });
}

// ---- Canvas ----
const canvas  = document.getElementById('map-canvas');
const ctx     = canvas.getContext('2d');
const tooltip = document.getElementById('hex-tooltip');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ---- Game logic helpers ----
function isBattleMoveValid(tx, ty) {
  if (!battlePartyTile || !battleMap) return false;
  const { x: px, y: py } = battlePartyTile;
  if (Math.abs(tx - px) + Math.abs(ty - py) !== 1) return false;
  const { width: W, height: H, grid } = battleMap;
  if (tx < 0 || tx >= W || ty < 0 || ty >= H)
    return (px === 0 || px === W - 1 || py === 0 || py === H - 1);
  return BATTLE_PASSABLE.has(grid[ty * W + tx]);
}

function getNeighbors(q, r) {
  const dirs = (r & 1)
    ? [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]]
    : [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]];
  return dirs
    .map(([dq, dr]) => ({ q: q + dq, r: r + dr }))
    .filter(n => hexLookup.has(`${n.q},${n.r}`));
}

function getHexDistance(q1, r1, q2, r2) {
  // Odd-r offset → cube coords before measuring distance
  const ax = q1 - (r1 - (r1 & 1)) / 2, az = r1, ay = -ax - az;
  const bx = q2 - (r2 - (r2 & 1)) / 2, bz = r2, by = -bx - bz;
  return Math.max(Math.abs(ax - bx), Math.abs(ay - by), Math.abs(az - bz));
}

function updateExploredHexes() {
  if (!partyHex || !mapData) return;
  for (const hex of mapData.hexes) {
    const dist = getHexDistance(partyHex.q, partyHex.r, hex.q, hex.r);
    if (dist <= VISION_RANGE) {
      exploredHexes.add(`${hex.q},${hex.r}`);
    }
  }
}

function isHexVisible(hex) {
  if (gmMode) return true;
  if (landmarks.has(`${hex.q},${hex.r}`)) return true;
  if (!partyHex) return false;
  const dist = getHexDistance(partyHex.q, partyHex.r, hex.q, hex.r);
  return dist <= VISION_RANGE;
}

function isHexExplored(hex) {
  if (gmMode) return true;
  if (landmarks.has(`${hex.q},${hex.r}`)) return true;
  return exploredHexes.has(`${hex.q},${hex.r}`);
}

function isNeighbor(hex) {
  if (!partyHex || !mapData) return false;
  return getNeighbors(partyHex.q, partyHex.r).some(n => n.q === hex.q && n.r === hex.r);
}

// ---- Render dispatch ----
function render(ts = 0) {
  if (inSettlement) renderBattleMap(ts);
  else              renderWorldMap(ts);
}

// ---- Animation loop ----
function startLoop() {
  cancelAnimationFrame(animFrame);
  function loop(ts) { render(ts); animFrame = requestAnimationFrame(loop); }
  animFrame = requestAnimationFrame(loop);
}

// ---- Panning & clicking ----
canvas.addEventListener('mousedown', (e) => {
  drag = { active: true, startX: e.clientX, startY: e.clientY, camX: camera.x, camY: camera.y };
  didDrag = false;
});
canvas.addEventListener('mousemove', (e) => {
  if (drag.active) {
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 4) didDrag = true;
    camera.x = drag.camX + (e.clientX - drag.startX);
    camera.y = drag.camY + (e.clientY - drag.startY);
    canvas.style.cursor = 'grabbing';
  }

  if (inSettlement) {
    battleHoverTile = pixelToTile(e.clientX, e.clientY);
    if (!drag.active) {
      canvas.style.cursor = (partyJoined && isBattleMoveValid(battleHoverTile.x, battleHoverTile.y))
        ? 'pointer' : 'grab';
    }
    tooltip.style.display = 'none';
    document.getElementById('settlement-card').style.display = 'none';
    return;
  }

  hoverHex = pixelToHex(e.clientX, e.clientY);
  const overNeighbor = partyJoined && partyHex && isNeighbor(hoverHex);

  if (!drag.active) {
    canvas.style.cursor = overNeighbor ? 'pointer' : 'grab';
  }

  if (!drag.active && mapData) {
    const h   = hexLookup.get(`${hoverHex.q},${hoverHex.r}`);
    const poi = h ? poiMap.get(`${h.q},${h.r}`) : null;
    const card = document.getElementById('settlement-card');

    if (h && (gmMode || isHexVisible(h) || isHexExplored(h))) {
      if (poi && poi.description) {
        // Rich settlement card — positioned above the hex
        const offX = camera.x + canvas.width  / 2;
        const offY = camera.y + canvas.height / 2;
        const { x, y } = hexToPixel(poi.q, poi.r);
        const S = HEX_SIZE * scale;

        const buildingsHtml = poi.buildings
          ? poi.buildings.map(b => `<li>${formatBuilding(b)}</li>`).join('')
          : '';
        card.innerHTML = `
          <div class="sc-header">
            <span class="sc-name">${escapeHtml(poi.name)}</span>
            <span class="sc-tier">${escapeHtml(poi.tier_title || poi.type)}</span>
          </div>
          <p class="sc-desc">${escapeHtml(poi.description)}</p>
          ${poi.population ? `<p class="sc-pop">Pop. ~${poi.population}</p>` : ''}
          ${buildingsHtml ? `<div class="sc-buildings"><span class="sc-section">Notable</span><ul>${buildingsHtml}</ul></div>` : ''}
        `;
        card.style.display = 'block';

        const cardW = card.offsetWidth;
        const cardH = card.offsetHeight;
        let cx = x + offX - cardW / 2;
        let cy = y + offY - S * 1.4 - cardH;
        cx = Math.max(8, Math.min(cx, canvas.width  - cardW - 8));
        cy = Math.max(8, Math.min(cy, canvas.height - cardH - 44));
        card.style.left = cx + 'px';
        card.style.top  = cy + 'px';

        tooltip.style.display = 'none';
      } else {
        card.style.display = 'none';
        tooltip.textContent = poi
          ? `${BIOME_LABELS[h.biome] || h.biome} · ${poi.name}`
          : BIOME_LABELS[h.biome] || h.biome;
        tooltip.style.left    = (e.clientX + 14) + 'px';
        tooltip.style.top     = (e.clientY - 10) + 'px';
        tooltip.style.display = 'block';
      }
    } else {
      tooltip.style.display = 'none';
      card.style.display    = 'none';
    }
  }
});
canvas.addEventListener('mouseup',    (e) => { drag.active = false; if (!didDrag) handleClick(e.clientX, e.clientY); });
canvas.addEventListener('mouseleave', () => {
  drag.active = false;
  hoverHex = null;
  battleHoverTile = null;
  tooltip.style.display = 'none';
  document.getElementById('settlement-card').style.display = 'none';
});

// ---- Zoom ----
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const factor   = e.deltaY < 0 ? 1.12 : 0.9;
  const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * factor));
  const hx = (e.clientX - canvas.width  / 2 - camera.x) / scale;
  const hy = (e.clientY - canvas.height / 2 - camera.y) / scale;
  camera.x = e.clientX - canvas.width  / 2 - hx * newScale;
  camera.y = e.clientY - canvas.height / 2 - hy * newScale;
  scale = newScale;
}, { passive: false });

// ---- Touch ----
canvas.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  drag = { active: true, startX: t.clientX, startY: t.clientY, camX: camera.x, camY: camera.y };
  didDrag = false;
});
canvas.addEventListener('touchmove', (e) => {
  if (!drag.active) return;
  const t = e.touches[0];
  if (Math.hypot(t.clientX - drag.startX, t.clientY - drag.startY) > 4) didDrag = true;
  camera.x = drag.camX + (t.clientX - drag.startX);
  camera.y = drag.camY + (t.clientY - drag.startY);
  e.preventDefault();
}, { passive: false });
canvas.addEventListener('touchend', (e) => {
  drag.active = false;
  if (!didDrag) { const t = e.changedTouches[0]; handleClick(t.clientX, t.clientY); }
});

function handleClick(screenX, screenY) {
  if (!partyJoined) return;
  if (inSettlement) {
    if (!battlePartyTile) return;
    const tile = pixelToTile(screenX, screenY);
    if (isBattleMoveValid(tile.x, tile.y)) socket.emit('battle-vote', { x: tile.x, y: tile.y });
  } else {
    if (!partyHex) return;
    const hex = pixelToHex(screenX, screenY);
    if (isNeighbor(hex)) socket.emit('vote', { q: hex.q, r: hex.r });
  }
}

// ---- Mode select ----
let selectedMode = null;
document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    selectedMode = card.dataset.mode;
    document.getElementById('mode-select').style.display = 'none';
    document.getElementById('lobby').style.display = 'flex';
  });
});

// ---- Lobby ----
let selectedClass = null;
document.querySelectorAll('.class-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedClass = card.dataset.class;
    syncJoinBtn();
  });
});
document.getElementById('player-name').addEventListener('input', syncJoinBtn);
function syncJoinBtn() {
  const name = document.getElementById('player-name').value.trim();
  document.getElementById('join-btn').disabled = !name || !selectedClass;
}
document.getElementById('join-btn').addEventListener('click', () => {
  const name = document.getElementById('player-name').value.trim();
  if (!name || !selectedClass) return;
  socket.emit('player-join', { name, playerClass: selectedClass, gameMode: selectedMode });
});
socket.on('lobby-error', (msg) => {
  document.getElementById('lobby-error').textContent = msg;
});

// ---- Players panel ----
function updatePlayersPanel(players) {
  document.getElementById('party-list').innerHTML = players.map(p => `
    <div class="player-entry">
      <span class="player-icon">${CLASS_ICONS[p.playerClass] || '?'}</span>
      <div>
        <span class="player-name-text">${escapeHtml(p.name)}</span>
        <span class="player-class-text">${p.playerClass}</span>
      </div>
    </div>
  `).join('');
}
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatBuilding(b) {
  return b.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ---- Event panel ----
function showEvent(event, biome) {
  eventLog.unshift({ event, biome });
  if (eventLog.length > MAX_LOG) eventLog.pop();

  document.getElementById('event-placeholder').style.display = 'none';
  const current = document.getElementById('current-event');
  current.style.display = 'block';

  const badge = document.getElementById('event-badge');
  badge.textContent = TYPE_LABELS[event.type] || event.type;
  badge.className   = `event-badge ${event.type}`;
  document.getElementById('event-biome-tag').textContent = BIOME_LABELS[biome] || biome;
  document.getElementById('event-title').textContent     = event.title;
  document.getElementById('event-desc').textContent      = event.desc;

  const logSection = document.getElementById('event-log-section');
  const logList    = document.getElementById('event-log-list');
  if (eventLog.length > 1) {
    logSection.style.display = 'block';
    logList.innerHTML = eventLog.slice(1).map(({ event: e }) => `
      <div class="event-log-entry">
        <span class="event-log-badge ${e.type}">${e.type[0].toUpperCase()}</span>
        <span class="event-log-title">${escapeHtml(e.title)}</span>
      </div>
    `).join('');
  }
}

// ---- HUD helpers ----
function updateTimeHUD() {
  const el = document.getElementById('world-time');
  if (!el || !worldTime) return;
  const cal = window._calendar;
  const monthName = cal ? cal.month_names[worldTime.month - 1] : `Month ${worldTime.month}`;
  el.textContent = `${worldTime.timeOfDay} · Day ${worldTime.day}, ${monthName}, Year ${worldTime.year}`;
}

function updateVoteStatus() {
  const el = document.getElementById('vote-status');
  if (!el || !partyJoined) return;
  const cast = Object.keys(votes).length;
  el.textContent = totalPlayers > 0 ? `${cast}/${totalPlayers} voted` : '';
}

function updateBiomeHUD() {
  if (!partyHex) return;
  const label = BIOME_LABELS[partyHex.biome] || partyHex.biome;
  document.getElementById('current-biome').textContent = label;
  document.getElementById('step-count').textContent    = stepCount > 0 ? `step ${stepCount}` : '';
}

// ---- Socket events ----
socket.on('connect', () => {
  document.getElementById('status').textContent = 'Connected';
});
socket.on('disconnect', () => {
  document.getElementById('status').textContent = 'Disconnected';
  document.getElementById('vote-status').textContent   = '';
  document.getElementById('current-biome').textContent = '';
});
socket.on('player-count', (count) => {
  document.getElementById('player-count').textContent =
    `${count} adventurer${count === 1 ? '' : 's'} online`;
});
socket.on('map-data', (data) => {
  if (data.reset) {
    exploredHexes.clear();
    eventLog.length = 0;
    inSettlement    = false;
    battleMap       = null;
    battlePartyTile = null;
    battleVotes     = {};
    settlementName  = '';
    document.getElementById('event-placeholder').style.display = 'block';
    document.getElementById('current-event').style.display     = 'none';
    document.getElementById('event-log-section').style.display = 'none';
  }

  mapData   = data;
  startHex  = data.startHex;
  partyHex  = data.partyHex;
  rivers    = data.rivers || [];
  pois      = data.pois   || [];
  poiMap    = new Map(pois.map(p => [`${p.q},${p.r}`, p]));
  votes     = data.votes  || {};
  stepCount = data.step   || 0;
  myVote    = votes[socket.id] || null;

  hexLookup = new Map(data.hexes.map(h => [`${h.q},${h.r}`, h]));
  landmarks = new Set((data.landmarks || []).map(l => `${l.q},${l.r}`));

  if (data.biomeMeta) {
    BIOME_COLORS = Object.fromEntries(Object.entries(data.biomeMeta).map(([k, v]) => [k, v.color]));
    BIOME_LABELS = Object.fromEntries(Object.entries(data.biomeMeta).map(([k, v]) => [k, v.label]));
  }
  if (data.calendar) window._calendar = data.calendar;
  if (data.worldTime) { worldTime = data.worldTime; updateTimeHUD(); }

  updateExploredHexes();

  const { x, y } = hexToPixel(partyHex.q, partyHex.r);
  camera.x = -x; camera.y = -y;
  startLoop();
});
socket.on('players-update', (players) => {
  totalPlayers = players.length;
  if (!partyJoined && players.some(p => p.playerClass === selectedClass)) {
    partyJoined = true;
    document.getElementById('lobby').style.display         = 'none';
    document.getElementById('players-panel').style.display = 'block';
    document.getElementById('event-panel').style.display   = 'block';
    document.getElementById('gm-toggle').style.display     = 'inline-block';
    document.getElementById('new-game-btn').style.display  = 'inline-block';
    updateBiomeHUD();
  }
  updatePlayersPanel(players);
  updateVoteStatus();
});
socket.on('settlement-entered', (data) => {
  inSettlement    = true;
  battleMap       = data.battleMap;
  battlePartyTile = data.partyPos;
  battleVotes     = {};
  settlementName  = data.battleMap.settlementName;

  const S = TILE_SIZE * scale;
  const { x, y } = tileToPixel(battlePartyTile.x, battlePartyTile.y);
  camera.x = -x - S / 2;
  camera.y = -y - S / 2;

  document.getElementById('current-biome').textContent = `Inside: ${settlementName}`;
  document.getElementById('step-count').textContent    = '';
});

socket.on('battle-vote-update', (votes) => {
  battleVotes = votes;
});

socket.on('battle-party-moved', (data) => {
  battlePartyTile = data.partyPos;
  battleVotes     = data.votes || {};
  const S = TILE_SIZE * scale;
  const { x, y } = tileToPixel(battlePartyTile.x, battlePartyTile.y);
  targetCam = { x: -x - S / 2, y: -y - S / 2 };
});

socket.on('settlement-exited', (data) => {
  inSettlement    = false;
  battleMap       = null;
  battlePartyTile = null;
  battleVotes     = {};
  settlementName  = '';
  partyHex        = data.partyHex;
  if (data.worldTime) { worldTime = data.worldTime; updateTimeHUD(); }
  const { x, y } = hexToPixel(partyHex.q, partyHex.r);
  camera.x = -x; camera.y = -y;
  updateBiomeHUD();
});

socket.on('hexes-discovered', (newHexes) => {
  for (const hex of newHexes) {
    hexLookup.set(`${hex.q},${hex.r}`, hex);
    mapData.hexes.push(hex);
  }
});
socket.on('vote-update', (newVotes) => {
  votes  = newVotes;
  myVote = votes[socket.id] || null;
  updateVoteStatus();
});
socket.on('party-moved', (data) => {
  partyHex  = data.partyHex;
  votes     = data.votes || {};
  stepCount = data.step  || stepCount + 1;
  myVote    = null;
  if (data.worldTime) { worldTime = data.worldTime; updateTimeHUD(); }

  updateExploredHexes();

  const { x, y } = hexToPixel(partyHex.q, partyHex.r);
  targetCam = { x: -x, y: -y };

  flashHex   = partyHex;
  flashStart = Date.now();

  if (data.event) showEvent(data.event, partyHex.biome);
  updateVoteStatus();
  updateBiomeHUD();
});
