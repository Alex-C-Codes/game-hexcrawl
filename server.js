const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const SimplexNoise = require('simplex-noise');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 30;
const MAX_PLAYERS = 4;

app.use(express.static('public'));

// Will be initialized after POI_TYPES is defined
let gameMap, rivers, arlandCity, allPois, startHex;

// ---- Map generation ----
function generateMap() {
  const elevNoise = new SimplexNoise();
  const moistNoise = new SimplexNoise();
  const hexes = [];
  for (let r = 0; r < MAP_HEIGHT; r++) {
    for (let q = 0; q < MAP_WIDTH; q++) {
      const nx = q / MAP_WIDTH - 0.5;
      const ny = r / MAP_HEIGHT - 0.5;
      const raw =
        elevNoise.noise2D(nx * 4, ny * 4) * 0.6 +
        elevNoise.noise2D(nx * 8, ny * 8) * 0.3 +
        elevNoise.noise2D(nx * 16, ny * 16) * 0.1;
      const noiseVal = (raw + 1) / 2;
      const d = Math.sqrt(nx * nx + ny * ny);
      const mask = Math.max(0, 1 - d * 3.5);
      const elevation = noiseVal * 0.65 + mask * 0.35;
      const moisture = (moistNoise.noise2D(nx * 3, ny * 3) + 1) / 2;
      // Store elevation (0-100) so rivers can path downhill
      hexes.push({ q, r, biome: getBiome(elevation, moisture), e: Math.round(elevation * 100) });
    }
  }
  return { hexes, width: MAP_WIDTH, height: MAP_HEIGHT };
}

function getBiome(e, m) {
  if (e < 0.28) return 'ocean';
  if (e < 0.35) return 'coast';
  if (e > 0.82) return 'mountain';
  if (e > 0.68) return m < 0.4 ? 'desert' : 'highland';
  if (e > 0.52) return m > 0.5 ? 'forest' : 'hills';
  if (m > 0.65) return 'swamp';
  if (m > 0.38) return 'plains';
  return 'desert';
}

function findStartHex(hexes) {
  const cx = MAP_WIDTH / 2, cy = MAP_HEIGHT / 2;
  const preferred = ['plains', 'hills', 'forest'];
  let best = null, bestDist = Infinity;
  for (const hex of hexes) {
    if (preferred.includes(hex.biome)) {
      const d = Math.hypot(hex.q - cx, hex.r - cy);
      if (d < bestDist) { bestDist = d; best = hex; }
    }
  }
  return best || hexes.find(h => h.biome !== 'ocean');
}

function generateArlandCity(hexes) {
  const cx = MAP_WIDTH / 2, cy = MAP_HEIGHT / 2;
  const preferred = ['plains', 'hills', 'forest'];
  let best = null, bestDist = Infinity;
  for (const hex of hexes) {
    if (preferred.includes(hex.biome)) {
      const d = Math.hypot(hex.q - cx, hex.r - cy);
      if (d < bestDist) { bestDist = d; best = hex; }
    }
  }
  const location = best || hexes.find(h => h.biome !== 'ocean');
  return { q: location.q, r: location.r, type: 'village', name: 'Arland City' };
}

function findStartHexNearSettlement(hexes, settlement) {
  const neighbors = getNeighbors(settlement.q, settlement.r);
  const preferred = ['plains', 'hills', 'forest'];
  let best = null, bestDist = Infinity;
  for (const n of neighbors) {
    const hex = hexes.find(h => h.q === n.q && h.r === n.r);
    if (hex && preferred.includes(hex.biome)) {
      best = hex;
      break;
    }
  }
  return best || neighbors.map(n => hexes.find(h => h.q === n.q && h.r === n.r)).filter(Boolean)[0] || hexes.find(h => h.biome !== 'ocean');
}

// ---- River generation ----
function generateRivers(hexes) {
  const elevMap  = new Map(hexes.map(h => [`${h.q},${h.r}`, h.e]));
  const biomeMap = new Map(hexes.map(h => [`${h.q},${h.r}`, h.biome]));
  const hexMap   = new Map(hexes.map(h => [`${h.q},${h.r}`, h]));

  const sources = hexes.filter(h => h.biome === 'mountain').sort(() => Math.random() - 0.5);
  const rivers  = [];
  const TARGET  = 6;

  for (const start of sources) {
    if (rivers.length >= TARGET) break;

    const path    = [];
    const visited = new Set();
    let current   = start;

    for (let step = 0; step < 80; step++) {
      const key = `${current.q},${current.r}`;
      if (visited.has(key)) break;
      visited.add(key);
      path.push({ q: current.q, r: current.r });

      const biome = biomeMap.get(key);
      if (biome === 'ocean') break;

      const neighbors = getNeighbors(current.q, current.r)
        .filter(n => !visited.has(`${n.q},${n.r}`))
        .map(n => ({ ...n, e: elevMap.get(`${n.q},${n.r}`) ?? 50 }))
        .sort((a, b) => a.e - b.e);

      if (neighbors.length === 0) break;

      const currentElev = elevMap.get(key) ?? 50;
      const downhill    = neighbors.filter(n => n.e <= currentElev);
      const pool        = downhill.length > 0 ? downhill.slice(0, 3) : neighbors.slice(0, 2);
      const next        = pool[Math.floor(Math.random() * pool.length)];

      current = hexMap.get(`${next.q},${next.r}`);
      if (!current) break;
    }

    const lastBiome = biomeMap.get(`${path[path.length - 1].q},${path[path.length - 1].r}`);
    if (path.length >= 5 && (lastBiome === 'ocean' || lastBiome === 'coast' || path.length >= 12)) {
      rivers.push(path);
    }
  }
  return rivers;
}

// ---- Points of Interest ----
const POI_TYPES = [
  { type: 'village', biomes: ['plains','hills','forest','highland'], weight: 3 },
  { type: 'ruins',   biomes: ['plains','hills','desert','highland','forest','swamp'], weight: 2 },
  { type: 'tower',   biomes: ['hills','highland','mountain','plains'], weight: 2 },
  { type: 'cave',    biomes: ['mountain','highland','hills'], weight: 3 },
  { type: 'shrine',  biomes: ['forest','plains','hills','coast','highland','swamp'], weight: 2 },
  { type: 'port',    biomes: ['coast'], weight: 3 },
  { type: 'dungeon', biomes: ['mountain','hills','highland','plains'], weight: 1 },
  { type: 'barrow',  biomes: ['plains','hills','highland','desert'], weight: 2 },
];

const POI_NAMES = {
  village: { prefixes: ['Ash','Oak','Stone','Mill','River','Black','Green','Grey','Iron','Crow'],   suffixes: ['haven','wick','ford','stead','bridge','hollow','gate','moor','vale','cross'] },
  port:    { prefixes: ['Salt','Storm','Har','Drake','Iron','Sea','Anchor','Tide','Gull','Wave'],   suffixes: ['port','haven','bay','reach','mouth','dock','cove','shore','fleet','wharf'] },
  ruins:   { adj: ['Ancient','Shattered','Forgotten','Sunken','Crumbling','Cursed','Silent','Broken','Fallen','Lost'],      noun: ['Citadel','Keep','Hall','Temple','Gate','Vault','Spire','Throne','Sanctum','Archive'] },
  shrine:  { adj: ['Sacred','Moonlit','Hidden','Overgrown','Stone','Weathered','Moss-Grown','Hollow','Gilded','Pale'],      noun: ['Shrine','Altar','Cairn','Idol','Obelisk','Monolith','Waystone','Font','Reliquary','Totem'] },
  tower:   { adj: ['Broken','High','Dark','Lone','Frost','Ash','Bone','Storm','Ember','Grim'],                             noun: ['Tower','Spire','Watchtower','Pinnacle','Beacon','Turret','Obelisk','Column','Pillar','Needle'] },
  cave:    { adj: ['Deep','Dark','Cold','Hollow','Stone','Iron','Shadow','Echo','Bone','Black'],                           noun: ['Cave','Cavern','Grotto','Den','Delve','Warren','Pit','Lair','Burrow','Passage'] },
  dungeon: { adj: ['Forsaken','Dread','Black','Sunken','Cursed','Hollow','Ancient','Grim','Ruined','Sealed'],               noun: ['Dungeon','Vault','Crypt','Catacomb','Labyrinth','Prison','Depths','Tomb','Ruin','Underhold'] },
  barrow:  { adj: ['Ancient','Forgotten','Wind-Swept','Mossy','Lonely','Haunted','Silent','Weathered','Earthen','Grey'],   noun: ['Barrow','Mound','Kurgan','Cairn','Howe','Tumulus','Dolmen','Grave-Mound','Cist','Henge'] },
};

function generatePOIName(type) {
  const names = POI_NAMES[type];
  if (type === 'village' || type === 'port') {
    return names.prefixes[Math.floor(Math.random() * names.prefixes.length)]
         + names.suffixes[Math.floor(Math.random() * names.suffixes.length)];
  }
  return names.adj[Math.floor(Math.random() * names.adj.length)]
       + ' ' + names.noun[Math.floor(Math.random() * names.noun.length)];
}

function generatePOIs(hexes, excludePoi = null) {
  const placed   = [];
  const MIN_DIST = 4;
  const MAX_POIS = 50;
  const shuffled = hexes.slice().sort(() => Math.random() - 0.5);

  for (const hex of shuffled) {
    if (placed.length >= MAX_POIS) break;
    if (Math.random() > 0.10) continue;

    const valid = POI_TYPES.filter(pt => pt.biomes.includes(hex.biome));
    if (valid.length === 0) continue;

    if (placed.some(p => Math.hypot(p.q - hex.q, p.r - hex.r) < MIN_DIST)) continue;
    
    if (excludePoi && Math.hypot(excludePoi.q - hex.q, excludePoi.r - hex.r) < MIN_DIST) continue;

    const totalWeight = valid.reduce((s, pt) => s + pt.weight, 0);
    let rng = Math.random() * totalWeight;
    let chosen = valid[valid.length - 1];
    for (const pt of valid) { rng -= pt.weight; if (rng <= 0) { chosen = pt; break; } }

    placed.push({ q: hex.q, r: hex.r, type: chosen.type, name: generatePOIName(chosen.type) });
  }
  return placed;
}

// ---- Initialize game world ----
gameMap  = generateMap();
rivers   = generateRivers(gameMap.hexes);
arlandCity = generateArlandCity(gameMap.hexes);
allPois  = [arlandCity, ...generatePOIs(gameMap.hexes, arlandCity)];
startHex = findStartHexNearSettlement(gameMap.hexes, arlandCity);

// ---- Events ----
const BIOME_EVENTS = {
  plains: [
    { type: 'creature',   title: 'Wolf Pack',           desc: 'A pack of gaunt wolves emerges from the tall grass, yellow eyes locked on the party.' },
    { type: 'creature',   title: 'Wandering Ogre',      desc: 'A lumbering ogre blocks the road, demanding a toll of "shiny things."' },
    { type: 'creature',   title: 'Giant Boar',          desc: 'The ground trembles as a massive boar thunders out of the grass, tusks gleaming.' },
    { type: 'item',       title: 'Merchant\'s Wagon',   desc: 'A painted wagon sits unattended. Its owner is gone, but the goods remain.' },
    { type: 'item',       title: 'Hidden Cache',        desc: 'A loose stone marks a pit. Inside: wrapped provisions and a handful of old coins.' },
    { type: 'aberration', title: 'Fairy Ring',          desc: 'A perfect circle of glowing mushrooms hums with music. Time feels elastic inside.' },
    { type: 'aberration', title: 'Standing Stones',     desc: 'Three ancient menhirs pulse with forgotten power. Their runes shift as you watch.' },
  ],
  forest: [
    { type: 'creature',   title: 'Dire Wolf',           desc: 'A wolf the size of a horse steps between the trees, breath misting in the cool air.' },
    { type: 'creature',   title: 'Giant Spider',        desc: 'Silken webs span the path. Something large stirs in the canopy above.' },
    { type: 'creature',   title: 'Forest Troll',        desc: 'A moss-covered troll lurches from behind a fallen oak, sniffing the air.' },
    { type: 'item',       title: 'Druid\'s Cache',      desc: 'A hollow tree conceals a bundle of salves, seeds, and a carved wooden token.' },
    { type: 'item',       title: 'Ranger\'s Camp',      desc: 'An abandoned campsite, still warm. Whoever was here left in a hurry.' },
    { type: 'aberration', title: 'Whispering Grove',    desc: 'The trees speak in overlapping voices, arguing about something long forgotten.' },
    { type: 'aberration', title: 'Will-o\'-Wisp',       desc: 'A blue light dances between trunks, always just out of reach, leading deeper in.' },
  ],
  hills: [
    { type: 'creature',   title: 'Bandit Ambush',       desc: 'Arrows thud into the earth. Rough voices demand surrender from the ridgeline.' },
    { type: 'creature',   title: 'Hill Giant',          desc: 'A giant hurls boulders at birds from the nearest hill — and then notices the party.' },
    { type: 'creature',   title: 'Goblin Warband',      desc: 'A dozen goblins pour over the crest, shrieking and waving rusty blades.' },
    { type: 'item',       title: 'Buried Treasure',     desc: 'A rusted sword pommel sticks from the earth. Pulling it reveals a buried iron box.' },
    { type: 'item',       title: 'Ruined Watchtower',   desc: 'A crumbling tower commands the hill. A skeleton clutches a sealed message tube.' },
    { type: 'aberration', title: 'Echo Stones',         desc: 'Certain rocks repeat your words back in different voices, seconds after you move on.' },
    { type: 'aberration', title: 'Gravity Anomaly',     desc: 'Pebbles drift upward in a small clearing. Loose coins float from pockets.' },
  ],
  highland: [
    { type: 'creature',   title: 'Griffon',             desc: 'A griffon descends from above with a piercing shriek, wings beating a storm of dust.' },
    { type: 'creature',   title: 'Wyvern',              desc: 'A wyvern circles overhead, its barbed tail trailing poison. It has spotted the party.' },
    { type: 'creature',   title: 'Mountain Lions',      desc: 'Three tawny lions flank the party from opposite ridges, moving in perfect silence.' },
    { type: 'item',       title: 'Fallen Knight',       desc: 'A knight in tarnished armor lies by the path. The sword and shield are still intact.' },
    { type: 'item',       title: 'Hermit\'s Cave',      desc: 'A recluse offers cryptic warnings and trades a strange flask for bread.' },
    { type: 'aberration', title: 'Ley Line Crossing',   desc: 'The air crackles. Spells misfire. The ground hums with invisible power beneath.' },
    { type: 'aberration', title: 'Ghost of the Pass',   desc: 'A transparent warrior marches the ridge. It does not notice the living.' },
  ],
  mountain: [
    { type: 'creature',   title: 'Dragon Wyrmling',     desc: 'A young dragon emerges from a cave mouth, breathing jets of flame.' },
    { type: 'creature',   title: 'Stone Golem',         desc: 'What seemed a rockface lurches forward — a massive golem, eyes glowing dull red.' },
    { type: 'creature',   title: 'Frost Giant',         desc: 'A frost giant crests the ridge, glacier-blue eyes scanning below.' },
    { type: 'item',       title: 'Dwarf Vault',         desc: 'A carved door is set into the mountainside, half-buried in scree. The lock is old.' },
    { type: 'item',       title: 'Frozen Explorer',     desc: 'A figure suspended in ice clutches a satchel. The bag is frozen but clearly full.' },
    { type: 'aberration', title: 'Voice in the Peak',   desc: 'A voice booms from the summit in no known tongue. The mountain is asking something.' },
    { type: 'aberration', title: 'Crystal Visions',     desc: 'Quartz formations reflect scenes that haven\'t happened yet — or have, elsewhere.' },
  ],
  desert: [
    { type: 'creature',   title: 'Giant Scorpion',      desc: 'A scorpion the size of a cart crawls from beneath the sand, claws raised.' },
    { type: 'creature',   title: 'Sand Worm',           desc: 'The ground vibrates. Seconds before something enormous breaks the surface.' },
    { type: 'creature',   title: 'Desert Lich',         desc: 'A desiccated figure stands at the dune\'s crest. It speaks. The air grows cold.' },
    { type: 'item',       title: 'Sunken Temple',       desc: 'Wind has exposed the carved top of a buried structure. Stairs lead into darkness.' },
    { type: 'item',       title: 'Merchant\'s Bones',   desc: 'A collapsed merchant lies half-buried. The cargo is sealed and intact.' },
    { type: 'aberration', title: 'Mirage City',         desc: 'A gleaming city shimmers at the horizon and shows no sign of fading as you approach.' },
    { type: 'aberration', title: 'Solar Deity Vision',  desc: 'A figure of living flame walks beside the party for seven steps at high noon, then vanishes.' },
  ],
  coast: [
    { type: 'creature',   title: 'Pirate Raiders',      desc: 'A longboat beaches nearby. Armed sailors fan out, scanning for valuables.' },
    { type: 'creature',   title: 'Giant Crab',          desc: 'The rocks shift — they aren\'t rocks. A crab the size of a barn heaves upright.' },
    { type: 'creature',   title: 'Sea Hag',             desc: 'A figure beckons from the tideline, beautiful from a distance, terrifying up close.' },
    { type: 'item',       title: 'Shipwreck',           desc: 'A wrecked hull lies in the shallows. The cargo hold is accessible at low tide.' },
    { type: 'item',       title: 'Sea Cave Cache',      desc: 'A cave behind a waterfall holds crates stamped with a long-defunct trading company.' },
    { type: 'aberration', title: 'Ghost Ship',          desc: 'A galleon glides silently through the fog — no crew, no wind, no explanation.' },
    { type: 'aberration', title: 'Siren Song',          desc: 'Music drifts from the sea. The most beautiful sound any of you has ever heard. It\'s getting louder.' },
  ],
  ocean: [
    { type: 'creature',   title: 'Sea Serpent',         desc: 'A serpentine neck rises from the depths, water sheeting off dark scales.' },
    { type: 'creature',   title: 'Kraken\'s Reach',     desc: 'A single tentacle breaks the surface nearby — forty feet long and searching.' },
    { type: 'creature',   title: 'Hostile Merfolk',     desc: 'Scaled figures surface armed with bone tridents. They do not look welcoming.' },
    { type: 'item',       title: 'Floating Wreckage',   desc: 'Debris bobs on the surface — a sealed chest among it, stamped with a royal cipher.' },
    { type: 'item',       title: 'Sunken Ruins',        desc: 'The water is clear. Far below, the outline of towers and streets is unmistakable.' },
    { type: 'aberration', title: 'The Maelstrom',       desc: 'A spiral of water opens on the horizon. It is enormous. It is moving toward you.' },
    { type: 'aberration', title: 'Time Fog',            desc: 'A bank of silver mist rolls in. When it clears, the stars are in the wrong positions.' },
  ],
  swamp: [
    { type: 'creature',   title: 'Bog Troll',           desc: 'Something enormous slides from the black water, reaching with long arms.' },
    { type: 'creature',   title: 'Swamp Witch',         desc: 'A figure watches from a stilted shack. She already knows your names.' },
    { type: 'creature',   title: 'Poison Serpents',     desc: 'The water comes alive with serpents, converging as if drawn by something stranger than hunger.' },
    { type: 'item',       title: 'Sunken Chest',        desc: 'A glint in the murk catches the eye. Heavy with silt, but the lock has snapped.' },
    { type: 'item',       title: 'Poacher\'s Cache',    desc: 'A waterproof bundle hangs from a submerged tree — traps, vials, and a hand-drawn map.' },
    { type: 'aberration', title: 'The Green Mist',      desc: 'A luminous mist settles around your knees. Shapes move inside it. Too many limbs.' },
    { type: 'aberration', title: 'Forgotten Shrine',    desc: 'A carved face rises from the mire, weeping black water. Offerings were left recently.' },
  ],
};

function generateEvent(biome) {
  const pool = BIOME_EVENTS[biome] || BIOME_EVENTS.plains;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ---- Game state ----
const players = {};
let partyHex   = { ...startHex };
let votes      = {};
let stepCount  = 0;
let connectedCount = 0;

function getNeighbors(q, r) {
  const dirs = (r & 1)
    ? [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]]
    : [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]];
  return dirs
    .map(([dq, dr]) => ({ q: q + dq, r: r + dr }))
    .filter(n => n.q >= 0 && n.q < MAP_WIDTH && n.r >= 0 && n.r < MAP_HEIGHT);
}

function hexAt(q, r) {
  return gameMap.hexes.find(h => h.q === q && h.r === r) || { q, r, biome: 'plains', e: 50 };
}

function advanceParty() {
  const tally = {};
  for (const { q, r } of Object.values(votes)) {
    const k = `${q},${r}`;
    tally[k] = (tally[k] || 0) + 1;
  }
  const entries = Object.entries(tally);
  if (entries.length === 0) return;

  const maxVotes = Math.max(...entries.map(([, c]) => c));
  const winners  = entries.filter(([, c]) => c === maxVotes);
  const [winKey] = winners[Math.floor(Math.random() * winners.length)];
  const [q, r]   = winKey.split(',').map(Number);

  partyHex = hexAt(q, r);
  votes    = {};
  stepCount++;

  const event = generateEvent(partyHex.biome);
  console.log(`Step ${stepCount}: (${q},${r}) ${partyHex.biome} — ${event.type}: ${event.title}`);
  io.emit('party-moved', { partyHex, votes, event, step: stepCount });
}

// ---- Socket ----
io.on('connection', (socket) => {
  connectedCount++;
  console.log(`Connected: ${socket.id} (${connectedCount} total)`);

  socket.emit('map-data', { ...gameMap, rivers, pois: allPois, startHex, partyHex, votes, step: stepCount });
  io.emit('player-count', connectedCount);

  socket.on('player-join', ({ name, playerClass }) => {
    if (Object.keys(players).length >= MAX_PLAYERS) {
      socket.emit('lobby-error', 'The party is full (max 4 adventurers).');
      return;
    }
    const validClasses = ['warrior', 'ranger', 'mage', 'rogue'];
    const cleanName = String(name).trim().slice(0, 20);
    if (!cleanName || !validClasses.includes(playerClass)) return;
    players[socket.id] = { id: socket.id, name: cleanName, playerClass };
    io.emit('players-update', Object.values(players));
  });

  socket.on('vote', ({ q, r }) => {
    if (!players[socket.id]) return;
    if (!getNeighbors(partyHex.q, partyHex.r).some(n => n.q === q && n.r === r)) return;
    votes[socket.id] = { q, r };
    io.emit('vote-update', votes);
    const playerCount = Object.keys(players).length;
    if (playerCount > 0 && Object.keys(votes).length >= playerCount) advanceParty();
  });

  socket.on('disconnect', () => {
    connectedCount--;
    const wasPlayer = !!players[socket.id];
    delete players[socket.id];
    delete votes[socket.id];
    console.log(`Disconnected: ${socket.id} (${connectedCount} total)`);
    io.emit('player-count', connectedCount);
    if (wasPlayer) {
      io.emit('players-update', Object.values(players));
      io.emit('vote-update', votes);
      const playerCount = Object.keys(players).length;
      if (playerCount > 0 && Object.keys(votes).length >= playerCount) advanceParty();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Hexcrawl server running at http://localhost:${PORT}`);
});
