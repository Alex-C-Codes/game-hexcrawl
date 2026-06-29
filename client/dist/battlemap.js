'use strict';

const TILE_SIZE = 24;

const BATTLE_PASSABLE = new Set(['ground', 'road', 'square', 'door']);

const TILE_COLORS = {
  ground:        '#546b3e',
  road:          '#7a6a50',
  square:        '#8a7a58',
  door:          '#9a7845',
  house:         '#6a5535',
  tavern:        '#7a4525',
  general_store: '#5a5530',
  healer:        '#4a5550',
  stables:       '#6a6030',
  blacksmith:    '#484840',
  inn:           '#7a4528',
  barracks:      '#504848',
  granary:       '#6a5828',
  market_square: '#6a5525',
  smelter:       '#585040',
  armory:        '#504848',
  town_hall:     '#7a6030',
};

// ---- Tile math ----
function tileToPixel(tx, ty) {
  const S = TILE_SIZE * scale;
  return { x: S * tx, y: S * ty };
}

function pixelToTile(screenX, screenY) {
  const wx = (screenX - canvas.width  / 2 - camera.x) / scale;
  const wy = (screenY - canvas.height / 2 - camera.y) / scale;
  return { x: Math.floor(wx / TILE_SIZE), y: Math.floor(wy / TILE_SIZE) };
}

// ---- Battle map renderer ----
function renderBattleMap(ts = 0) {
  updateCamera();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!battleMap) return;

  const S    = TILE_SIZE * scale;
  const offX = camera.x + canvas.width  / 2;
  const offY = camera.y + canvas.height / 2;
  const { width: W, height: H, grid, buildings } = battleMap;

  for (let ty = 0; ty < H; ty++) {
    for (let tx = 0; tx < W; tx++) {
      const { x, y } = tileToPixel(tx, ty);
      const sx = x + offX, sy = y + offY;
      if (sx + S < 0 || sx > canvas.width || sy + S < 0 || sy > canvas.height) continue;
      ctx.fillStyle = TILE_COLORS[grid[ty * W + tx]] || '#546b3e';
      ctx.fillRect(sx, sy, S, S);
      ctx.strokeStyle = 'rgba(0,0,0,0.18)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(sx, sy, S, S);
    }
  }

  // Exit tile indicators — shown when party is on a border tile
  if (battlePartyTile) {
    const { x: px, y: py } = battlePartyTile;
    const exits = [];
    if (px === 0)     exits.push({ tx: -1, ty: py });
    if (px === W - 1) exits.push({ tx: W,  ty: py });
    if (py === 0)     exits.push({ tx: px, ty: -1 });
    if (py === H - 1) exits.push({ tx: px, ty: H  });
    for (const { tx, ty } of exits) {
      const { x, y } = tileToPixel(tx, ty);
      const sx = x + offX, sy = y + offY;
      ctx.fillStyle = 'rgba(90,200,90,0.18)';
      ctx.fillRect(sx, sy, S, S);
      ctx.strokeStyle = 'rgba(90,200,90,0.55)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sx, sy, S, S);
      ctx.fillStyle = 'rgba(140,230,140,0.85)';
      ctx.font = `bold ${Math.max(7, Math.round(8 * scale))}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('EXIT', sx + S / 2, sy + S / 2);
    }
  }

  // Building labels at higher zoom
  if (scale > 1.1) {
    for (const b of buildings) {
      if (b.type === 'house') continue;
      const { x, y } = tileToPixel(b.x + b.w / 2, b.y + b.h / 2);
      const sx = x + offX, sy = y + offY;
      if (sx < -120 || sx > canvas.width + 120 || sy < -40 || sy > canvas.height + 40) continue;
      ctx.font = `${Math.max(8, Math.round(9 * scale))}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(220,190,120,0.88)';
      ctx.fillText(b.label, sx, sy);
    }
  }

  if (partyJoined && battlePartyTile) drawBattleVoteOverlays(offX, offY, S);

  if (battlePartyTile) {
    const { x, y } = tileToPixel(battlePartyTile.x, battlePartyTile.y);
    drawPartyMarker(x + offX + S / 2, y + offY + S / 2, ts);
  }

  drawVignette();
  drawBattleHUD();
}

function drawBattleVoteOverlays(offX, offY, S) {
  const { x: px, y: py } = battlePartyTile;
  for (const d of [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]) {
    const tx = px + d.x, ty = py + d.y;
    if (!isBattleMoveValid(tx, ty)) continue;
    const { x, y } = tileToPixel(tx, ty);
    const sx = x + offX, sy = y + offY;
    const isMine = battleVotes[socket.id]?.x === tx && battleVotes[socket.id]?.y === ty;
    const isHov  = battleHoverTile && battleHoverTile.x === tx && battleHoverTile.y === ty;
    const count  = Object.values(battleVotes).filter(v => v.x === tx && v.y === ty).length;

    if (isMine)     { ctx.fillStyle = 'rgba(255,215,0,0.2)';   ctx.fillRect(sx, sy, S, S); }
    else if (isHov) { ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(sx, sy, S, S); }

    ctx.strokeStyle = isMine ? '#ffd700' : isHov ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)';
    ctx.lineWidth   = isMine ? 2.5 : isHov ? 2 : 1;
    ctx.strokeRect(sx, sy, S, S);

    if (count > 0) {
      ctx.fillStyle = '#ffd700';
      ctx.font = `bold ${Math.round(11 * scale)}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(count, sx + S / 2, sy + S / 2);
    }
  }
}

function drawBattleHUD() {
  const label = `${battleMap.tierTitle}: ${settlementName}`;
  const pad = 10;
  ctx.font = '13px Georgia, serif';
  const tw = ctx.measureText(label).width;
  ctx.fillStyle = 'rgba(0,0,0,0.62)';
  ctx.fillRect(canvas.width / 2 - tw / 2 - pad, 8, tw + pad * 2, 26);
  ctx.fillStyle = '#c9a84c';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText(label, canvas.width / 2, 14);
}
