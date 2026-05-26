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

const gameMap = generateMap();
const startHex = findStartHex(gameMap.hexes);

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

      hexes.push({ q, r, biome: getBiome(elevation, moisture) });
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

// ---- Game state ----
const players = {};
let partyHex = { ...startHex };
let votes = {};
let connectedCount = 0;

// Neighbors for pointy-top offset-r hex grid
function getNeighbors(q, r) {
  const dirs = (r & 1)
    ? [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]]
    : [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]];
  return dirs
    .map(([dq, dr]) => ({ q: q + dq, r: r + dr }))
    .filter(n => n.q >= 0 && n.q < MAP_WIDTH && n.r >= 0 && n.r < MAP_HEIGHT);
}

function hexAt(q, r) {
  return gameMap.hexes.find(h => h.q === q && h.r === r) || { q, r, biome: 'plains' };
}

function advanceParty() {
  // Tally votes
  const tally = {};
  for (const { q, r } of Object.values(votes)) {
    const key = `${q},${r}`;
    tally[key] = (tally[key] || 0) + 1;
  }
  const entries = Object.entries(tally);
  if (entries.length === 0) return;

  // Pick winner; break ties randomly
  const maxVotes = Math.max(...entries.map(([, c]) => c));
  const winners = entries.filter(([, c]) => c === maxVotes);
  const [winKey] = winners[Math.floor(Math.random() * winners.length)];
  const [q, r] = winKey.split(',').map(Number);

  partyHex = hexAt(q, r);
  votes = {};
  io.emit('party-moved', { partyHex, votes });
  console.log(`Party moved to (${q},${r}) — ${partyHex.biome}`);
}

// ---- Socket ----
io.on('connection', (socket) => {
  connectedCount++;
  console.log(`Connected: ${socket.id} (${connectedCount} total)`);

  socket.emit('map-data', { ...gameMap, startHex, partyHex, votes });
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
    // Validate: must be a real neighbor of the current party hex
    if (!getNeighbors(partyHex.q, partyHex.r).some(n => n.q === q && n.r === r)) return;

    votes[socket.id] = { q, r };
    io.emit('vote-update', votes);

    const playerCount = Object.keys(players).length;
    if (playerCount > 0 && Object.keys(votes).length >= playerCount) {
      advanceParty();
    }
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
      // If remaining players all already voted, advance now
      const playerCount = Object.keys(players).length;
      if (playerCount > 0 && Object.keys(votes).length >= playerCount) {
        advanceParty();
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Hexcrawl server running at http://localhost:${PORT}`);
});
