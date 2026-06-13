const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const fs   = require('fs');
const path = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
const PORT   = 3000;

// ---- App routes ----
// In dev, Vite serves the frontend on its own port. In production, serve the built client.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));
}

// ---- Load data files ----
const HEX_TYPES          = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/seeds/geography_pillar/hex_types.json'),        'utf8'));
const ROUTE_THEMES       = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/seeds/geography_pillar/route_themes.json'),      'utf8'));
const POI_NAMES          = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/seeds/active_play_pillar/poi_names.json'),       'utf8'));
const WORLD_CONFIG       = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/world_config.json'),                             'utf8'));
const SETTLEMENT_CATALOG = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/seeds/active_play_pillar/settlement_catalog.json'), 'utf8'));

const { CALENDAR, makeStartingDate, getTimeOfDay, advanceTime } = require('./lib/time');
const { BATTLE_PASSABLE, generateBattleMap } = require('./lib/battlemap');

const BIOME_EVENTS   = Object.fromEntries(HEX_TYPES.map(ht => [ht.key, ht.events]));
const BIOME_META     = Object.fromEntries(HEX_TYPES.map(ht => [ht.key, {
  label:           ht.label,
  color:           ht.color,
  encounterChance: ht.encounter_chance,
}]));
const TRAVEL_COSTS   = Object.fromEntries(HEX_TYPES.map(ht => [ht.key, ht.travel_cost ?? null]));

const {
  anchor_count:        ANCHOR_COUNT,
  min_anchor_dist:     MIN_ANCHOR_DIST,
  anchor_spread:       ANCHOR_SPREAD,
  core_paint_radius:   CORE_RADIUS,
  edge_paint_radius:   EDGE_RADIUS,
  path_avoidance_cost: AVOIDANCE,
  gen_radius:          GEN_RADIUS,
  anchor_types:        ANCHOR_TYPES,
  default_biomes:      DEFAULT_BIOMES,
  starting_settlement: STARTING_SETTLEMENT_CFG,
  party_start:         PARTY_START_CFG,
} = WORLD_CONFIG;

// Resolve starting settlement from catalog
const startingSettlementEntry = SETTLEMENT_CATALOG.static_settlements.find(
  s => s.id === STARTING_SETTLEMENT_CFG.catalog_id
);
if (!startingSettlementEntry) {
  throw new Error(`Catalog ID ${STARTING_SETTLEMENT_CFG.catalog_id} not found in settlement_catalog.json`);
}

// ---- Hex math ----
function offsetToCube(q, r) {
  const x = q - (r - (r & 1)) / 2;
  const z = r;
  return { x, y: -x - z, z };
}

function hexDist(q1, r1, q2, r2) {
  const a = offsetToCube(q1, r1);
  const b = offsetToCube(q2, r2);
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

function neighborCoords(q, r) {
  const dirs = (r & 1)
    ? [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]]
    : [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]];
  return dirs.map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
}

// BFS to enumerate all hexes within radius steps of (q, r)
function getHexesInRadius(q, r, radius) {
  const result  = [];
  const visited = new Set([`${q},${r}`]);
  const queue   = [{ q, r, d: 0 }];
  let head = 0;
  while (head < queue.length) {
    const { q: cq, r: cr, d } = queue[head++];
    result.push({ q: cq, r: cr });
    if (d < radius) {
      for (const n of neighborCoords(cq, cr)) {
        const nk = `${n.q},${n.r}`;
        if (!visited.has(nk)) { visited.add(nk); queue.push({ q: n.q, r: n.r, d: d + 1 }); }
      }
    }
  }
  return result;
}

// ---- A* pathfinding (infinite grid) ----
// penalties: Map<"q,r", extraCost> — used to force paths to diverge
function astar(fq, fr, tq, tr, penalties) {
  const hk = (q, r) => `${q},${r}`;
  const h  = (q, r) => hexDist(q, r, tq, tr);

  const open     = [{ q: fq, r: fr, f: h(fq, fr), g: 0 }];
  const gScore   = new Map([[hk(fq, fr), 0]]);
  const cameFrom = new Map();

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const { q, r } = open.shift();
    const ck = hk(q, r);

    if (q === tq && r === tr) {
      const path = [];
      let cur = ck;
      while (cur) {
        const [cq, cr] = cur.split(',').map(Number);
        path.unshift({ q: cq, r: cr });
        cur = cameFrom.get(cur);
      }
      return path;
    }

    for (const n of neighborCoords(q, r)) {
      const nk    = hk(n.q, n.r);
      const tentG = gScore.get(ck) + 1 + (penalties.get(nk) || 0);
      if (!gScore.has(nk) || tentG < gScore.get(nk)) {
        gScore.set(nk, tentG);
        cameFrom.set(nk, ck);
        open.push({ q: n.q, r: n.r, g: tentG, f: tentG + h(n.q, n.r) });
      }
    }
  }
  return [{ q: fq, r: fr }, { q: tq, r: tr }];
}

// ---- POI name generation ----
function generatePOIName(type) {
  const n = POI_NAMES[type] || POI_NAMES.ruins;
  if (n.prefixes) {
    return n.prefixes[Math.floor(Math.random() * n.prefixes.length)]
         + n.suffixes[Math.floor(Math.random() * n.suffixes.length)];
  }
  return n.adj[Math.floor(Math.random() * n.adj.length)]
       + ' ' + n.noun[Math.floor(Math.random() * n.noun.length)];
}

// ---- Anchor placement ----
function placeAnchors() {
  const anchors = [];
  let tries = 0;
  while (anchors.length < ANCHOR_COUNT && tries < ANCHOR_COUNT * 300) {
    tries++;
    const q = Math.floor(Math.random() * ANCHOR_SPREAD * 2) - ANCHOR_SPREAD;
    const r = Math.floor(Math.random() * ANCHOR_SPREAD * 2) - ANCHOR_SPREAD;
    if (anchors.every(a => hexDist(a.q, a.r, q, r) >= MIN_ANCHOR_DIST)) {
      const type = ANCHOR_TYPES[Math.floor(Math.random() * ANCHOR_TYPES.length)];
      anchors.push({ q, r, type, name: generatePOIName(type) });
    }
  }
  return anchors;
}

// Connect each anchor to its 2 nearest neighbours (deduplicated edges)
function buildConnections(anchors) {
  const edges   = [];
  const edgeSet = new Set();
  for (let i = 0; i < anchors.length; i++) {
    const byDist = anchors
      .map((a, j) => ({ j, d: hexDist(anchors[i].q, anchors[i].r, a.q, a.r) }))
      .filter(x => x.j !== i)
      .sort((a, b) => a.d - b.d);
    let added = 0;
    for (const { j } of byDist) {
      if (added >= 2) break;
      const ek = `${Math.min(i,j)}-${Math.max(i,j)}`;
      if (!edgeSet.has(ek)) { edgeSet.add(ek); edges.push([anchors[i], anchors[j]]); added++; }
    }
  }
  return edges;
}

// Trace 3 diverging routes between two anchors
function traceThreeRoutes(a, b) {
  const themes = [...ROUTE_THEMES].sort(() => Math.random() - 0.5);
  const p1 = astar(a.q, a.r, b.q, b.r, new Map());
  const p2 = astar(a.q, a.r, b.q, b.r, new Map(p1.map(h => [`${h.q},${h.r}`, AVOIDANCE])));
  const p3 = astar(a.q, a.r, b.q, b.r, new Map([...p1, ...p2].map(h => [`${h.q},${h.r}`, AVOIDANCE])));
  return [p1, p2, p3].map((path, i) => ({
    path,
    theme: themes[i],
    name:  themes[i].names[Math.floor(Math.random() * themes[i].names.length)],
  }));
}

// ---- Trace influence spatial index ----
// Runs once at world build. For every hex coordinate near a path trace, records
// its distance to the nearest trace and which theme owns it.
// getBiomeForHex() is then O(1) at runtime.
let traceInfluence = new Map(); // "q,r" → { dist, theme }

function buildTraceIndex(allTraces) {
  traceInfluence = new Map();
  for (const { path, theme } of allTraces) {
    const distMap = new Map();
    const queue   = [];
    for (const { q, r } of path) {
      const k = `${q},${r}`;
      if (!distMap.has(k)) { distMap.set(k, 0); queue.push({ q, r, d: 0 }); }
    }
    let head = 0;
    while (head < queue.length) {
      const { q, r, d } = queue[head++];
      if (d >= EDGE_RADIUS) continue;
      for (const n of neighborCoords(q, r)) {
        const nk = `${n.q},${n.r}`;
        if (!distMap.has(nk)) { distMap.set(nk, d + 1); queue.push({ q: n.q, r: n.r, d: d + 1 }); }
      }
    }
    for (const [k, d] of distMap) {
      const existing = traceInfluence.get(k);
      if (!existing || d < existing.dist) traceInfluence.set(k, { dist: d, theme });
    }
  }
}

// ---- Biome assignment ----
// Outside trace corridors, use a deterministic coordinate hash so the same hex
// always generates the same biome regardless of when it's first visited.
function defaultBiome(q, r) {
  const i = (((q * 7919 + r * 6271 + q * r * 547) % DEFAULT_BIOMES.length) + DEFAULT_BIOMES.length) % DEFAULT_BIOMES.length;
  return DEFAULT_BIOMES[i];
}

function getBiomeForHex(q, r) {
  const inf = traceInfluence.get(`${q},${r}`);
  if (!inf) return defaultBiome(q, r);

  let idx = Math.min(inf.dist, inf.theme.biomes.length - 1);
  // Hash-based edge softening so biome boundaries aren't perfectly sharp
  if (inf.dist > CORE_RADIUS) {
    const hash = (((q * 7919 + r * 6271) % 10) + 10) % 10;
    if (hash < 3) idx = Math.min(idx + 1, inf.theme.biomes.length - 1);
  }
  return inf.theme.biomes[idx];
}

// ---- Lazy hex generation ----
// Called every time the party moves. Generates any unseen hexes within GEN_RADIUS
// and returns them so they can be broadcast to all clients.
function generateHexesAround(q, r) {
  const newHexes = [];
  for (const { q: hq, r: hr } of getHexesInRadius(q, r, GEN_RADIUS)) {
    const k = `${hq},${hr}`;
    if (!hexIndex.has(k)) {
      const hex = { q: hq, r: hr, biome: getBiomeForHex(hq, hr), e: 50 };
      hexIndex.set(k, hex);
      newHexes.push(hex);
    }
  }
  return newHexes;
}

// ---- Events ----
function generateEvent(biome) {
  const pool = BIOME_EVENTS[biome] || BIOME_EVENTS.plains;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ---- World state (rebuilt on new game) ----
let hexIndex  = new Map();
let pois      = [];
let landmarks = [];
let routeData = [];
let partyStart;

// ---- Build world ----
function buildWorld() {
  traceInfluence = new Map();
  hexIndex       = new Map();
  routeData      = [];
  landmarks      = [];

  const hearthAnchor = {
    q:            STARTING_SETTLEMENT_CFG.q,
    r:            STARTING_SETTLEMENT_CFG.r,
    type:         startingSettlementEntry.tier_level <= 2 ? 'village' : 'town',
    name:         startingSettlementEntry.name,
    catalogEntry: startingSettlementEntry,
  };

  const extraAnchors = placeAnchors().slice(0, Math.max(0, ANCHOR_COUNT - 1));
  const anchors      = [hearthAnchor, ...extraAnchors];
  const connections  = buildConnections(anchors);
  const allTraces    = [];

  for (const [a, b] of connections) {
    const routes = traceThreeRoutes(a, b);
    for (const rt of routes) allTraces.push(rt);
    routeData.push({
      from:   { q: a.q, r: a.r, name: a.name },
      to:     { q: b.q, r: b.r, name: b.name },
      routes: routes.map(rt => ({
        name:           rt.name,
        theme:          rt.theme.key,
        hexCount:       rt.path.length,
        encounterBonus: rt.theme.encounter_bonus,
        path:           rt.path,
      })),
    });
  }

  buildTraceIndex(allTraces);

  pois = anchors.map(a => {
    const poi = { q: a.q, r: a.r, type: a.type, name: a.name };
    if (a.catalogEntry) {
      const tierCfg = SETTLEMENT_CATALOG.procedural_blueprints.tier_settings[String(a.catalogEntry.tier_level)];
      poi.description = a.catalogEntry.description;
      poi.tier_level  = a.catalogEntry.tier_level;
      poi.tier_title  = tierCfg ? tierCfg.title : 'Settlement';
      poi.population  = a.catalogEntry.starting_population;
      poi.buildings   = a.catalogEntry.guaranteed_buildings;
    }
    return poi;
  });

  if (STARTING_SETTLEMENT_CFG.is_landmark) {
    const { q, r } = hearthAnchor;
    landmarks.push({ q, r });
    hexIndex.set(`${q},${r}`, { q, r, biome: 'plains', e: 50 });
  }

  partyStart = { q: PARTY_START_CFG.q, r: PARTY_START_CFG.r };
  generateHexesAround(partyStart.q, partyStart.r);

  console.log(`World: ${anchors.length} anchor(s) | ${allTraces.length} traces | ${hexIndex.size} initial hexes | ${landmarks.length} landmark(s)`);
}

// ---- Game state ----
const players      = {};
let partyHex;
let votes          = {};
let stepCount      = 0;
let connectedCount = 0;
let worldTime       = makeStartingDate();
let gameMode        = 'world'; // 'world' | 'settlement'
let activeBattleMap = null;
let battlePartyPos  = null;
let battleVotes     = {};

// Initial world build
buildWorld();
partyHex = hexAt(partyStart.q, partyStart.r);

// ---- Reset world ----
function resetWorld() {
  buildWorld();
  partyHex  = hexAt(partyStart.q, partyStart.r);
  votes     = {};
  stepCount = 0;
  worldTime       = makeStartingDate();
  gameMode        = 'world';
  activeBattleMap = null;
  battlePartyPos  = null;
  battleVotes     = {};

  io.emit('map-data', {
    hexes:     [...hexIndex.values()],
    pois,
    routes:    routeData,
    startHex:  partyStart,
    partyHex,
    votes,
    step:      stepCount,
    biomeMeta: BIOME_META,
    landmarks,
    worldTime: { ...worldTime, timeOfDay: getTimeOfDay(worldTime.progress) },
    reset:     true,
  });
}

function enterSettlement(poi) {
  gameMode        = 'settlement';
  activeBattleMap = generateBattleMap(poi, SETTLEMENT_CATALOG);
  battlePartyPos  = { x: activeBattleMap.entryX, y: activeBattleMap.entryY };
  battleVotes     = {};
  console.log(`Entering settlement: ${poi.name} (${activeBattleMap.width}×${activeBattleMap.height})`);
  io.emit('settlement-entered', { battleMap: activeBattleMap, partyPos: battlePartyPos });
}

function exitSettlement() {
  gameMode        = 'world';
  activeBattleMap = null;
  battlePartyPos  = null;
  battleVotes     = {};
  console.log(`Exiting settlement, returning to (${partyHex.q},${partyHex.r})`);
  io.emit('settlement-exited', {
    partyHex,
    worldTime: { ...worldTime, timeOfDay: getTimeOfDay(worldTime.progress) },
  });
}

function advanceBattleParty() {
  const tally = {};
  for (const { x, y } of Object.values(battleVotes)) {
    const k = `${x},${y}`;
    tally[k] = (tally[k] || 0) + 1;
  }
  const entries = Object.entries(tally);
  if (!entries.length) return;

  const max     = Math.max(...entries.map(([, c]) => c));
  const winners = entries.filter(([, c]) => c === max);
  const [winKey] = winners[Math.floor(Math.random() * winners.length)];
  const [x, y]   = winKey.split(',').map(Number);
  battleVotes = {};

  const { width: W, height: H } = activeBattleMap;
  if (x < 0 || x >= W || y < 0 || y >= H) {
    exitSettlement();
  } else {
    battlePartyPos = { x, y };
    io.emit('battle-party-moved', { partyPos: battlePartyPos, votes: battleVotes });
  }
}

function getNeighbors(q, r) {
  return neighborCoords(q, r).filter(n => hexIndex.has(`${n.q},${n.r}`));
}

function hexAt(q, r) {
  return hexIndex.get(`${q},${r}`) || { q, r, biome: 'plains', e: 50 };
}

function advanceParty() {
  const tally = {};
  for (const { q, r } of Object.values(votes)) {
    const k = `${q},${r}`;
    tally[k] = (tally[k] || 0) + 1;
  }
  const entries = Object.entries(tally);
  if (!entries.length) return;

  const max     = Math.max(...entries.map(([, c]) => c));
  const winners = entries.filter(([, c]) => c === max);
  const [winKey] = winners[Math.floor(Math.random() * winners.length)];
  const [q, r]   = winKey.split(',').map(Number);

  partyHex = hexAt(q, r);
  votes    = {};
  stepCount++;
  advanceTime(worldTime, partyHex.biome, TRAVEL_COSTS);

  // Check for settlement entry
  const settlementPoi = pois.find(p => p.q === q && p.r === r && p.tier_level);
  if (settlementPoi) {
    enterSettlement(settlementPoi);
    return;
  }

  const newHexes = generateHexesAround(q, r);
  if (newHexes.length > 0) io.emit('hexes-discovered', newHexes);

  const event = generateEvent(partyHex.biome);
  const timeOfDay = getTimeOfDay(worldTime.progress);
  console.log(`Step ${stepCount}: (${q},${r}) ${partyHex.biome} — ${timeOfDay}, Day ${worldTime.day} — ${event.title}`);
  io.emit('party-moved', { partyHex, votes, event, step: stepCount, worldTime: { ...worldTime, timeOfDay } });
}

// ---- Sockets ----
io.on('connection', (socket) => {
  connectedCount++;
  console.log(`Connected: ${socket.id} (${connectedCount} total)`);

  socket.emit('map-data', {
    hexes:     [...hexIndex.values()],
    pois,
    routes:    routeData,
    startHex:  partyStart,
    partyHex,
    votes,
    step:      stepCount,
    biomeMeta: BIOME_META,
    landmarks,
    worldTime: { ...worldTime, timeOfDay: getTimeOfDay(worldTime.progress) },
    calendar:  CALENDAR,
  });
  io.emit('player-count', connectedCount);

  if (gameMode === 'settlement' && activeBattleMap) {
    socket.emit('settlement-entered', { battleMap: activeBattleMap, partyPos: battlePartyPos });
  }

  socket.on('player-join', ({ name, playerClass }) => {
    if (Object.keys(players).length >= 4) {
      socket.emit('lobby-error', 'The party is full (max 4 adventurers).');
      return;
    }
    const valid     = ['warrior', 'ranger', 'mage', 'rogue'];
    const cleanName = String(name).trim().slice(0, 20);
    if (!cleanName || !valid.includes(playerClass)) return;
    players[socket.id] = { id: socket.id, name: cleanName, playerClass };
    io.emit('players-update', Object.values(players));
  });

  socket.on('vote', ({ q, r }) => {
    if (gameMode !== 'world' || !players[socket.id]) return;
    if (!getNeighbors(partyHex.q, partyHex.r).some(n => n.q === q && n.r === r)) return;
    votes[socket.id] = { q, r };
    io.emit('vote-update', votes);
    const count = Object.keys(players).length;
    if (count > 0 && Object.keys(votes).length >= count) advanceParty();
  });

  socket.on('battle-vote', ({ x, y }) => {
    if (gameMode !== 'settlement' || !players[socket.id] || !activeBattleMap) return;
    const { width: W, height: H } = activeBattleMap;
    const { x: px, y: py } = battlePartyPos;
    if (Math.abs(x - px) + Math.abs(y - py) !== 1) return;
    const isExit = x < 0 || x >= W || y < 0 || y >= H;
    if (isExit && !(px === 0 || px === W - 1 || py === 0 || py === H - 1)) return;
    if (!isExit && !BATTLE_PASSABLE.has(activeBattleMap.grid[y * W + x])) return;
    battleVotes[socket.id] = { x, y };
    io.emit('battle-vote-update', battleVotes);
    const count = Object.keys(players).length;
    if (count > 0 && Object.keys(battleVotes).length >= count) advanceBattleParty();
  });

  socket.on('new-game', () => resetWorld());

  socket.on('disconnect', () => {
    connectedCount--;
    const wasPlayer = !!players[socket.id];
    delete players[socket.id];
    delete votes[socket.id];
    delete battleVotes[socket.id];
    console.log(`Disconnected: ${socket.id} (${connectedCount} total)`);
    io.emit('player-count', connectedCount);
    if (wasPlayer) {
      io.emit('players-update', Object.values(players));
      io.emit('vote-update', votes);
      const count = Object.keys(players).length;
      if (count > 0 && Object.keys(votes).length >= count) advanceParty();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Hexcrawl running at http://localhost:${PORT}`);
});
