const socket = io();

// ---- Constants ----
const HEX_SIZE = 24;
const SQRT3 = Math.sqrt(3);

const BIOME_COLORS = {
  ocean:    '#1a4a6e',
  coast:    '#3a8abf',
  plains:   '#7eb05a',
  forest:   '#2d6a4f',
  hills:    '#7a9c52',
  highland: '#8a9e72',
  mountain: '#7a7a8a',
  desert:   '#c9a84c',
  swamp:    '#4a6741',
};

const BIOME_LABELS = {
  ocean: 'Ocean', coast: 'Coast', plains: 'Plains', forest: 'Forest',
  hills: 'Hills', highland: 'Highland', mountain: 'Mountain',
  desert: 'Desert', swamp: 'Swamp',
};

const CLASS_ICONS = { warrior: '⚔️', ranger: '🏹', mage: '🔮', rogue: '🗡️' };

// ---- State ----
let mapData      = null;
let startHex     = null;
let partyHex     = null;
let votes        = {};
let myVote       = null;
let totalPlayers = 0;
let hoverHex     = null;
let camera       = { x: 0, y: 0 };
let targetCam    = null;
let drag         = { active: false, startX: 0, startY: 0, camX: 0, camY: 0 };
let didDrag      = false;
let animFrame    = null;
let partyJoined  = false;

// ---- Canvas ----
const canvas = document.getElementById('map-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ---- Hex math ----
function hexToPixel(q, r) {
  return {
    x: HEX_SIZE * SQRT3 * (q + 0.5 * (r & 1)),
    y: HEX_SIZE * 1.5 * r,
  };
}

// Approximate pixel → hex (good enough for clicking large hex tiles)
function pixelToHex(screenX, screenY) {
  const x = screenX - (camera.x + canvas.width  / 2);
  const y = screenY - (camera.y + canvas.height / 2);
  const r = Math.round(y / (HEX_SIZE * 1.5));
  const q = Math.round(x / (HEX_SIZE * SQRT3) - 0.5 * (r & 1));
  return { q, r };
}

// Pointy-top offset-r neighbor directions
function getNeighbors(q, r) {
  const dirs = (r & 1)
    ? [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]]
    : [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]];
  return dirs
    .map(([dq, dr]) => ({ q: q + dq, r: r + dr }))
    .filter(n => n.q >= 0 && n.q < mapData.width && n.r >= 0 && n.r < mapData.height);
}

function isNeighbor(hex) {
  if (!partyHex || !mapData) return false;
  return getNeighbors(partyHex.q, partyHex.r).some(n => n.q === hex.q && n.r === hex.r);
}

function traceHex(cx, cy) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    i === 0
      ? ctx.moveTo(cx + HEX_SIZE * Math.cos(a), cy + HEX_SIZE * Math.sin(a))
      : ctx.lineTo(cx + HEX_SIZE * Math.cos(a), cy + HEX_SIZE * Math.sin(a));
  }
  ctx.closePath();
}

// ---- Biome art ----
function drawBiomeArt(cx, cy, biome) {
  ctx.save();
  ctx.translate(cx, cy);
  switch (biome) {
    case 'mountain': artMountain(); break;
    case 'highland': artHighland(); break;
    case 'forest':   artForest();   break;
    case 'hills':    artHills();    break;
    case 'plains':   artPlains();   break;
    case 'desert':   artDesert();   break;
    case 'swamp':    artSwamp();    break;
    case 'ocean':    artOcean();    break;
    case 'coast':    artCoast();    break;
  }
  ctx.restore();
}

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

// ---- Camera lerp ----
function updateCamera() {
  if (!targetCam) return;
  camera.x += (targetCam.x - camera.x) * 0.1;
  camera.y += (targetCam.y - camera.y) * 0.1;
  if (Math.hypot(targetCam.x - camera.x, targetCam.y - camera.y) < 0.5) {
    camera.x = targetCam.x; camera.y = targetCam.y; targetCam = null;
  }
}

// ---- Render ----
function render(ts = 0) {
  updateCamera();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!mapData) return;

  const offX = camera.x + canvas.width  / 2;
  const offY = camera.y + canvas.height / 2;
  const margin = HEX_SIZE * 2;

  for (const hex of mapData.hexes) {
    const { x, y } = hexToPixel(hex.q, hex.r);
    const cx = x + offX, cy = y + offY;
    if (cx < -margin || cx > canvas.width  + margin) continue;
    if (cy < -margin || cy > canvas.height + margin) continue;

    traceHex(cx, cy);
    ctx.fillStyle = BIOME_COLORS[hex.biome] || '#888';
    ctx.fill();
    drawBiomeArt(cx, cy, hex.biome);
    traceHex(cx, cy);
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Voting overlays — drawn after base hexes so they sit on top
  if (partyJoined && partyHex) drawVoteOverlays(offX, offY);

  // Party marker
  if (partyHex) {
    const { x, y } = hexToPixel(partyHex.q, partyHex.r);
    drawPartyMarker(x + offX, y + offY, ts);
  }

  drawLegend();
}

function drawVoteOverlays(offX, offY) {
  const neighbors = getNeighbors(partyHex.q, partyHex.r);

  // Tally votes per hex
  const tally = {};
  for (const v of Object.values(votes)) {
    const k = `${v.q},${v.r}`;
    tally[k] = (tally[k] || 0) + 1;
  }

  for (const n of neighbors) {
    const { x, y } = hexToPixel(n.q, n.r);
    const cx = x + offX, cy = y + offY;
    const count  = tally[`${n.q},${n.r}`] || 0;
    const isMine = myVote && myVote.q === n.q && myVote.r === n.r;
    const isHov  = hoverHex && hoverHex.q === n.q && hoverHex.r === n.r;

    // Tinted fill
    traceHex(cx, cy);
    if (isMine)      { ctx.fillStyle = 'rgba(255,215,0,0.18)'; ctx.fill(); }
    else if (isHov)  { ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fill(); }

    // Border
    traceHex(cx, cy);
    ctx.strokeStyle = isMine ? '#ffd700' : isHov ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)';
    ctx.lineWidth   = isMine ? 2.5 : isHov ? 2 : 1.2;
    ctx.stroke();

    // Vote count
    if (count > 0) {
      ctx.fillStyle     = '#ffd700';
      ctx.font          = 'bold 12px Georgia, serif';
      ctx.textAlign     = 'center';
      ctx.textBaseline  = 'middle';
      ctx.fillText(count, cx, cy);
    }
  }
}

function drawPartyMarker(cx, cy, ts) {
  const pulse = (Math.sin(ts * 0.003) + 1) / 2;
  ctx.save();
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur  = 8 + pulse * 12;
  ctx.fillStyle   = `rgba(255,215,0,${0.72 + pulse * 0.28})`;
  ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur  = 0;
  ctx.fillStyle   = 'rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawLegend() {
  const pad = 10, swatch = 13, lineH = 20;
  const biomes = Object.keys(BIOME_COLORS);
  const lw = 108, lh = pad * 2 + biomes.length * lineH;
  const lx = canvas.width - lw - 12, ly = 12;

  ctx.fillStyle = 'rgba(0,0,0,0.62)';
  ctx.beginPath(); ctx.roundRect(lx, ly, lw, lh, 6); ctx.fill();

  ctx.font = '12px Georgia, serif';
  biomes.forEach((biome, i) => {
    const bx = lx + pad, by = ly + pad + i * lineH;
    ctx.fillStyle = BIOME_COLORS[biome];
    ctx.fillRect(bx, by + 1, swatch, swatch);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5;
    ctx.strokeRect(bx, by + 1, swatch, swatch);
    ctx.fillStyle = '#ccc';
    ctx.fillText(BIOME_LABELS[biome], bx + swatch + 6, by + 12);
  });
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
  hoverHex = pixelToHex(e.clientX, e.clientY);
  const overNeighbor = partyJoined && partyHex && isNeighbor(hoverHex);
  if (drag.active) {
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 4) didDrag = true;
    camera.x = drag.camX + (e.clientX - drag.startX);
    camera.y = drag.camY + (e.clientY - drag.startY);
    canvas.style.cursor = 'grabbing';
  } else {
    canvas.style.cursor = overNeighbor ? 'pointer' : 'grab';
  }
});
canvas.addEventListener('mouseup', (e) => {
  drag.active = false;
  if (!didDrag) handleClick(e.clientX, e.clientY);
});
canvas.addEventListener('mouseleave', () => { drag.active = false; hoverHex = null; });

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
  if (!partyJoined || !partyHex) return;
  const hex = pixelToHex(screenX, screenY);
  if (isNeighbor(hex)) socket.emit('vote', { q: hex.q, r: hex.r });
}

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
  socket.emit('player-join', { name, playerClass: selectedClass });
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

// ---- Vote status HUD ----
function updateVoteStatus() {
  const el = document.getElementById('vote-status');
  if (!el || !partyJoined) return;
  const cast = Object.keys(votes).length;
  el.textContent = totalPlayers > 0
    ? `${cast}/${totalPlayers} voted`
    : '';
}

// ---- Socket events ----
socket.on('connect', () => {
  document.getElementById('status').textContent = 'Connected';
});
socket.on('disconnect', () => {
  document.getElementById('status').textContent = 'Disconnected';
  document.getElementById('vote-status').textContent = '';
});
socket.on('player-count', (count) => {
  document.getElementById('player-count').textContent =
    `${count} adventurer${count === 1 ? '' : 's'} online`;
});
socket.on('map-data', (data) => {
  mapData  = data;
  startHex = data.startHex;
  partyHex = data.partyHex;
  votes    = data.votes || {};
  myVote   = votes[socket.id] || null;
  const { x, y } = hexToPixel(partyHex.q, partyHex.r);
  camera.x = -x; camera.y = -y;
  startLoop();
});
socket.on('players-update', (players) => {
  totalPlayers = players.length;
  // Confirm join once server echoes our player back
  if (!partyJoined && players.some(p => p.playerClass === selectedClass)) {
    partyJoined = true;
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('players-panel').style.display = 'block';
  }
  updatePlayersPanel(players);
  updateVoteStatus();
});
socket.on('vote-update', (newVotes) => {
  votes  = newVotes;
  myVote = votes[socket.id] || null;
  updateVoteStatus();
});
socket.on('party-moved', (data) => {
  partyHex = data.partyHex;
  votes    = data.votes || {};
  myVote   = null;
  // Smooth pan to new position
  const { x, y } = hexToPixel(partyHex.q, partyHex.r);
  targetCam = { x: -x, y: -y };
  updateVoteStatus();
});
