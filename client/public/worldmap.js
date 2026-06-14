'use strict';

// ---- Hex math ----
function hexToPixel(q, r) {
  const S = HEX_SIZE * scale;
  return {
    x: S * SQRT3 * (q + 0.5 * (r & 1)),
    y: S * 1.5   * r,
  };
}

function pixelToHex(screenX, screenY) {
  const hx = (screenX - canvas.width  / 2 - camera.x) / scale;
  const hy = (screenY - canvas.height / 2 - camera.y) / scale;
  const r  = Math.round(hy / (HEX_SIZE * 1.5));
  const q  = Math.round(hx / (HEX_SIZE * SQRT3) - 0.5 * (r & 1));
  return { q, r };
}

// ---- Canvas helper ----
function traceHex(cx, cy) {
  const S = HEX_SIZE * scale;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    i === 0
      ? ctx.moveTo(cx + S * Math.cos(a), cy + S * Math.sin(a))
      : ctx.lineTo(cx + S * Math.cos(a), cy + S * Math.sin(a));
  }
  ctx.closePath();
}

// ---- Biome art ----
function drawBiomeArt(cx, cy, biome) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
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

// ---- Shared rendering (used by both world and battle renderers) ----
function drawPartyMarker(cx, cy, ts) {
  const pulse = (Math.sin(ts * 0.003) + 1) / 2;
  ctx.save();
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur  = 8 + pulse * 12;
  ctx.fillStyle   = `rgba(255,215,0,${0.72 + pulse * 0.28})`;
  ctx.beginPath(); ctx.arc(cx, cy, 7 * scale, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur  = 0;
  ctx.fillStyle   = 'rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawVignette() {
  const grd = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, canvas.height * 0.35,
    canvas.width / 2, canvas.height / 2, canvas.height * 0.85
  );
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  grd.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ---- World map renderer ----
function renderWorldMap(ts = 0) {
  updateCamera();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!mapData) return;

  const offX   = camera.x + canvas.width  / 2;
  const offY   = camera.y + canvas.height / 2;
  const S      = HEX_SIZE * scale;
  const margin = S * 2;

  for (const hex of mapData.hexes) {
    const isVisible  = isHexVisible(hex);
    const isExplored = isHexExplored(hex);
    if (!isVisible && !isExplored) continue;
    const { x, y } = hexToPixel(hex.q, hex.r);
    const cx = x + offX, cy = y + offY;
    if (cx < -margin || cx > canvas.width  + margin) continue;
    if (cy < -margin || cy > canvas.height + margin) continue;

    traceHex(cx, cy);
    ctx.fillStyle = BIOME_COLORS[hex.biome] || '#888';
    if (!isVisible && isExplored) ctx.globalAlpha = 0.35;
    ctx.fill();
    drawBiomeArt(cx, cy, hex.biome);
    traceHex(cx, cy);
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';
    ctx.lineWidth   = 0.8;
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }

  drawRivers(offX, offY);
  drawPOIs(offX, offY);

  if (partyHex) {
    const { x, y } = hexToPixel(partyHex.q, partyHex.r);
    const cx = x + offX, cy = y + offY;
    traceHex(cx, cy);
    ctx.strokeStyle = 'rgba(255,215,0,0.35)';
    ctx.lineWidth   = 3;
    ctx.stroke();
  }

  if (partyJoined && partyHex) drawVoteOverlays(offX, offY);

  if (flashHex) {
    const { x, y } = hexToPixel(flashHex.q, flashHex.r);
    const alpha = Math.max(0, 1 - (Date.now() - flashStart) / FLASH_MS);
    if (alpha > 0) {
      traceHex(x + offX, y + offY);
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.9})`;
      ctx.lineWidth   = 3;
      ctx.stroke();
    } else {
      flashHex = null;
    }
  }

  if (partyHex) {
    const { x, y } = hexToPixel(partyHex.q, partyHex.r);
    drawPartyMarker(x + offX, y + offY, ts);
  }

  drawVignette();
  drawLegend();
}

function drawRivers(offX, offY) {
  if (!rivers.length) return;
  ctx.save();
  ctx.strokeStyle = 'rgba(90,165,230,0.62)';
  ctx.lineWidth   = Math.max(1.2, 2 * scale);
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  for (const river of rivers) {
    if (river.length < 2) continue;
    const pts = river.map(({ q, r }) => {
      const hex = hexLookup.get(`${q},${r}`);
      const isVisible  = isHexVisible(hex);
      const isExplored = isHexExplored(hex);
      const { x, y } = hexToPixel(q, r);
      return { x: x + offX, y: y + offY, visible: isVisible, explored: isExplored };
    });
    for (let i = 0; i < pts.length - 1; i++) {
      if (!pts[i].visible && !pts[i].explored) continue;
      if (!pts[i + 1].visible && !pts[i + 1].explored) continue;
      if (!pts[i].visible && pts[i].explored) ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  }
  ctx.restore();
}

function drawPOIs(offX, offY) {
  if (!pois.length) return;
  const S      = HEX_SIZE * scale;
  const margin = S * 2;
  const R      = 8;

  for (const poi of pois) {
    const hex = hexLookup.get(`${poi.q},${poi.r}`);
    const isVisible  = isHexVisible(hex);
    const isExplored = isHexExplored(hex);
    if (!isVisible && !isExplored) continue;
    const { x, y } = hexToPixel(poi.q, poi.r);
    const cx = x + offX, cy = y + offY;
    if (cx < -margin || cx > canvas.width  + margin) continue;
    if (cy < -margin || cy > canvas.height + margin) continue;

    const color = POI_COLORS[poi.type] || '#fff';
    if (!isVisible && isExplored) ctx.globalAlpha = 0.35;

    ctx.beginPath(); ctx.arc(cx, cy, R * scale, 0, Math.PI * 2);
    ctx.fillStyle   = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, 1.5 * scale); ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy); ctx.scale(scale, scale);
    ctx.fillStyle   = color;
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1;
    drawPoiIcon(poi.type);
    ctx.restore();

    if (scale > 1.3) {
      const fontSize = Math.round(9 * scale);
      ctx.font = `${fontSize}px Georgia, serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'top';
      const tw = ctx.measureText(poi.name).width;
      const lx = cx - tw / 2 - 3;
      const ly = cy + R * scale + 3;
      ctx.fillStyle = 'rgba(0,0,0,0.72)';
      ctx.fillRect(lx, ly, tw + 6, fontSize + 4);
      ctx.fillStyle = '#e0e0e0';
      ctx.fillText(poi.name, cx, ly + 2);
    }
    ctx.globalAlpha = 1.0;
  }
}

function drawPoiIcon(type) {
  switch (type) {
    case 'village':
      ctx.beginPath(); ctx.moveTo(-3, 1); ctx.lineTo(0, -4); ctx.lineTo(3, 1); ctx.closePath(); ctx.fill();
      ctx.fillRect(-2.5, 1, 5, 3.5);
      break;
    case 'tower':
      ctx.fillRect(-1.5, -5, 3, 8);
      break;
    case 'cave':
      ctx.beginPath(); ctx.arc(0, 3, 4, Math.PI, 0, true); ctx.closePath(); ctx.fill();
      break;
    case 'shrine':
      ctx.fillRect(-1, -5, 2, 10);
      ctx.fillRect(-4, -1, 8, 2);
      break;
    case 'ruins':
      ctx.fillRect(-4, 0, 2.5, 4); ctx.fillRect(-4, -3, 1.5, 3);
      ctx.fillRect(1.5, 0, 2.5, 5); ctx.fillRect(2.5, -5, 1.5, 5);
      break;
    case 'port':
      ctx.beginPath();
      ctx.arc(0, -3, 1.5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -1.5); ctx.lineTo(0, 5);
      ctx.moveTo(-3, 1); ctx.lineTo(3, 1);
      ctx.stroke();
      break;
    case 'dungeon':
      ctx.beginPath(); ctx.arc(0, -1, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.82)';
      ctx.beginPath(); ctx.arc(-1.3, -1.5, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(1.3, -1.5, 1, 0, Math.PI * 2); ctx.fill();
      break;
    case 'barrow':
      ctx.beginPath(); ctx.arc(0, 4, 5, Math.PI, 0, true); ctx.closePath(); ctx.fill();
      break;
    default:
      ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, Math.PI * 2); ctx.fill();
  }
}

function drawVoteOverlays(offX, offY) {
  const neighbors = getNeighbors(partyHex.q, partyHex.r);
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

    traceHex(cx, cy);
    if (isMine)     { ctx.fillStyle = 'rgba(255,215,0,0.18)'; ctx.fill(); }
    else if (isHov) { ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fill(); }

    traceHex(cx, cy);
    ctx.strokeStyle = isMine ? '#ffd700' : isHov ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)';
    ctx.lineWidth   = isMine ? 2.5 : isHov ? 2 : 1.2;
    ctx.stroke();

    if (count > 0) {
      ctx.fillStyle    = '#ffd700';
      ctx.font         = `bold ${Math.round(11 * scale)}px Georgia, serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(count, cx, cy);
    }
  }
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
