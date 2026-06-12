'use strict';

const BATTLE_PASSABLE = new Set(['ground', 'road', 'square', 'door']);

const LANDMARK_DEFS = {
  tavern:          { w: 6, h: 4, label: 'Tavern' },
  general_store:   { w: 5, h: 4, label: 'General Store' },
  healer:          { w: 4, h: 4, label: 'Healer' },
  stables:         { w: 7, h: 3, label: 'Stables' },
  blacksmith:      { w: 5, h: 4, label: 'Blacksmith' },
  inn:             { w: 6, h: 5, label: 'Inn' },
  barracks:        { w: 7, h: 4, label: 'Barracks' },
  market_square:   { w: 6, h: 5, label: 'Market' },
  granary:         { w: 5, h: 3, label: 'Granary' },
  town_hall:       { w: 7, h: 5, label: 'Town Hall' },
  smelter:         { w: 6, h: 4, label: 'Smelter' },
  armory:          { w: 5, h: 4, label: 'Armory' },
  deep_mine_shaft: { w: 4, h: 4, label: 'Mine Shaft' },
};

function generateBattleMap(poi, settlementCatalog) {
  const tier    = poi.tier_level || 2;
  const tierCfg = settlementCatalog.procedural_blueprints.tier_settings[String(tier)];
  const W = tierCfg.grid_size.width;
  const H = tierCfg.grid_size.height;

  let seed = ((Math.abs(poi.q) * 7919 + Math.abs(poi.r) * 6271 + (poi.q * poi.r * 547 | 0)) % 2147483647 + 2147483647) % 2147483647;
  const rng = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  const grid = new Array(W * H).fill('ground');
  const buildings = [];

  const set = (x, y, t) => { if (x >= 0 && x < W && y >= 0 && y < H) grid[y * W + x] = t; };
  const get = (x, y)    => (x < 0 || x >= W || y < 0 || y >= H) ? null : grid[y * W + x];

  // Border roads (2 tiles wide)
  for (let i = 0; i < 2; i++) {
    for (let x = 0; x < W; x++) { set(x, i, 'road'); set(x, H - 1 - i, 'road'); }
    for (let y = 0; y < H; y++) { set(i, y, 'road'); set(W - 1 - i, y, 'road'); }
  }

  // Main cross roads through center (2 tiles wide)
  const mx = Math.floor(W / 2) - 1;
  const my = Math.floor(H / 2) - 1;
  for (let x = 0; x < W; x++) { set(x, my, 'road'); set(x, my + 1, 'road'); }
  for (let y = 0; y < H; y++) { set(mx, y, 'road'); set(mx + 1, y, 'road'); }

  // Town square around center junction
  for (let dy = -2; dy <= 3; dy++)
    for (let dx = -2; dx <= 3; dx++)
      if (get(mx + dx, my + dy) === 'ground') set(mx + dx, my + dy, 'square');

  // Place a building footprint; returns true if the area was clear
  const tryPlace = (bx, by, bw, bh, type, label) => {
    for (let dy = 0; dy < bh; dy++)
      for (let dx = 0; dx < bw; dx++)
        if (get(bx + dx, by + dy) !== 'ground') return false;
    for (let dy = 0; dy < bh; dy++)
      for (let dx = 0; dx < bw; dx++)
        set(bx + dx, by + dy, type);
    set(bx + Math.floor(bw / 2), by + bh - 1, 'door');
    buildings.push({ x: bx, y: by, w: bw, h: bh, type, label });
    return true;
  };

  // Landmark buildings — one per quadrant, anchored near the road junction
  const landmarkAnchors = [
    { x: 3,      y: 3 },
    { x: mx + 3, y: 3 },
    { x: 3,      y: my + 3 },
    { x: mx + 3, y: my + 3 },
  ];
  (poi.buildings || []).forEach((key, i) => {
    if (i >= landmarkAnchors.length) return;
    const def = LANDMARK_DEFS[key] || { w: 5, h: 4, label: key };
    tryPlace(landmarkAnchors[i].x, landmarkAnchors[i].y, def.w, def.h, key, def.label);
  });

  // Fill quadrants with houses
  const HOUSE_W = 4, HOUSE_H = 3;
  const quadRanges = [
    { x1: 2,      y1: 2,      x2: mx - 1, y2: my - 1 },
    { x1: mx + 2, y1: 2,      x2: W - 3,  y2: my - 1 },
    { x1: 2,      y1: my + 2, x2: mx - 1, y2: H - 3  },
    { x1: mx + 2, y1: my + 2, x2: W - 3,  y2: H - 3  },
  ];
  for (const qr of quadRanges) {
    for (let hy = qr.y1; hy + HOUSE_H <= qr.y2; hy += HOUSE_H + 1) {
      for (let hx = qr.x1; hx + HOUSE_W <= qr.x2; hx += HOUSE_W + 1) {
        if (rng() < 0.18) continue;
        tryPlace(hx, hy, HOUSE_W, HOUSE_H, 'house', 'House');
      }
    }
  }

  return {
    grid,
    buildings,
    width:          W,
    height:         H,
    entryX:         mx,
    entryY:         H - 3,
    settlementName: poi.name,
    tierTitle:      poi.tier_title || 'Settlement',
  };
}

// Returns valid 4-directional move targets from (x, y), including off-map exit tiles
// when the party is standing on a border tile.
function getBattleNeighbors(x, y, battleMap) {
  const { width: W, height: H, grid } = battleMap;
  return [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }]
    .filter(n => {
      if (n.x < 0 || n.x >= W || n.y < 0 || n.y >= H)
        return (x === 0 || x === W - 1 || y === 0 || y === H - 1);
      return BATTLE_PASSABLE.has(grid[n.y * W + n.x]);
    });
}

module.exports = { BATTLE_PASSABLE, generateBattleMap, getBattleNeighbors };