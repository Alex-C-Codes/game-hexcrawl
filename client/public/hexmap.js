/* Hexmap Manual Editor — infinite sparse grid */
(function () {
  'use strict';

  // ── Biomes, grouped by setting — matches db/seeds/geography_pillar/hex_types.json for the Classic set ──
  const BIOME_CATEGORIES = [
    {
      id: 'classic', label: 'Classic',
      biomes: {
        ocean:      { label: 'Ocean',      color: '#1a4a6e' },
        coast:      { label: 'Coast',      color: '#3a8abf' },
        plains:     { label: 'Plains',     color: '#7eb05a' },
        grassland:  { label: 'Grassland',  color: '#9bc25c' },
        farm:       { label: 'Farm',       color: '#b8a852' },
        forest:     { label: 'Forest',     color: '#2d6a4f' },
        jungle:     { label: 'Jungle',     color: '#1f5c38' },
        mushroomforest: { label: 'Mushroom Forest', color: '#3a6a4a' },
        worldtree:      { label: 'World Tree',      color: '#4a5a3a' },
        hills:      { label: 'Hills',      color: '#7a9c52' },
        highland:   { label: 'Highland',   color: '#8a9e72' },
        mountain:   { label: 'Mountain',   color: '#7a7a8a' },
        tundra:     { label: 'Tundra',     color: '#a8c4d4' },
        desert:     { label: 'Desert',     color: '#c9a84c' },
        swamp:      { label: 'Swamp',      color: '#4a6741' },
        settlement: { label: 'Settlement', color: '#8a6030' },
        beacon:     { label: 'Beacon',     color: '#b23a2e' },
        fort:       { label: 'Fort',       color: '#6a6a78' },
        tower:        { label: 'Tower',        color: '#8a8078' },
        ancientruins: { label: 'Ruins',        color: '#7a8070' },
        temple:       { label: 'Temple',        color: '#d4c896' },
      },
    },
    {
      id: 'undead', label: 'Undead',
      biomes: {
        graveyard:       { label: 'Graveyard',        color: '#5a5a52' },
        hauntedforest:   { label: 'Haunted Forest',   color: '#2a3a30' },
        necropolis:      { label: 'Necropolis',       color: '#8a8a92' },
        bonefields:      { label: 'Bone Fields',      color: '#c9c0a0' },
        cursedswamp:     { label: 'Cursed Swamp',     color: '#3a4a42' },
        crypt:           { label: 'Crypt',            color: '#2a2a30' },
        witheredwastes:  { label: 'Withered Wastes',  color: '#6a6050' },
      },
    },
    {
      id: 'sky', label: 'Sky Islands',
      biomes: {
        void:     { label: 'Void',           color: '#0d0d1f' },
        cloudsea: { label: 'Cloud Sea',       color: '#8ec9ee' },
        skyreef:  { label: 'Sky Reef',        color: '#5c8a6f' },
        storm:    { label: 'Storm Front',     color: '#453a5e' },
        crystal:  { label: 'Crystal Spire',   color: '#8f6fd1' },
        ashfall:  { label: 'Ashfall Isle',    color: '#4a3d38' },
        ruins:    { label: 'Ruined Isle',     color: '#a99872' },
        skydock:  { label: 'Skydock',         color: '#c98a4c' },
        airship:        { label: 'Airship',        color: '#7a8ba0' },
        flyingfortress: { label: 'Flying Fortress', color: '#5a5a68' },
        crackedland:    { label: 'Cracked Land',   color: '#8a7860' },
      },
    },
    {
      id: 'wasteland', label: 'Wasteland',
      biomes: {
        wastes:      { label: 'Irradiated Wastes', color: '#8a8a4a' },
        ruinfield:   { label: 'Ruined City',       color: '#5a5650' },
        craterzone:  { label: 'Blast Crater',      color: '#3a4a2e' },
        deadforest:  { label: 'Dead Forest',       color: '#554d40' },
        toxicswamp:  { label: 'Toxic Sludge',      color: '#5a6b3a' },
        dunefield:   { label: 'Ashen Dunes',       color: '#a89f88' },
        junkyard:    { label: 'Scrapyard',         color: '#7a5236' },
        bunker:      { label: 'Bunker Outpost',    color: '#4a5240' },
      },
    },
    {
      id: 'steampunk', label: 'Steampunk',
      biomes: {
        factoryland:  { label: 'Factory District', color: '#4a4038' },
        clockwork:    { label: 'Clockwork Hills',  color: '#8a7040' },
        railway:      { label: 'Rail Yards',       color: '#6a5a4a' },
        aetherfield:  { label: 'Aether Fields',    color: '#5a7a9c' },
        smogmarsh:    { label: 'Smog Marsh',       color: '#5a5a3a' },
        slagmountain: { label: 'Slag Peaks',       color: '#6a4a42' },
        airdock:      { label: 'Airship Yard',     color: '#b5793f' },
        quarry:       { label: 'Coal Quarry',      color: '#3a352f' },
      },
    },
    {
      id: 'underdark', label: 'Underdark',
      biomes: {
        cavern:           { label: 'Cavern',           color: '#3a3038' },
        chasm:            { label: 'Chasm',             color: '#0a0a12' },
        fungalforest:     { label: 'Fungal Forest',     color: '#4a6b5c' },
        undergroundlake:  { label: 'Underground Lake',  color: '#1a2a3a' },
        crystalcave:      { label: 'Crystal Cave',      color: '#3a6a6e' },
        lavatube:         { label: 'Lava Tube',         color: '#4a2a20' },
        deeproad:         { label: 'Deep Road',         color: '#6a6258' },
        drowoutpost:      { label: 'Drow Outpost',      color: '#3a2a4a' },
      },
    },
  ];

  const BIOMES = Object.assign({}, ...BIOME_CATEGORIES.map(c => c.biomes));
  const HEX_SIZE = 24;

  // ── Linkable content types — articles & battlemaps dragged onto a hex ────
  const LINK_TYPES = {
    article:   { badge: 'A', color: '#c9a84c' },
    battlemap: { badge: 'B', color: '#b05a4a' },
  };

  // ── Paintable attribute layers — zone-of-influence style overlays ────────
  // Each entry's `sourceType` is the library item type its swatches are
  // pulled from (fetched live via window.hxStorage). Adding a new paintable
  // attribute later is just adding another entry here.
  const ATTRIBUTE_TYPES = {
    faction: { label: 'Faction', sourceType: 'faction' },
  };

  // ── Route types — linear features drawn across hex centers ───────────────
  // width/dash are in "hex units" and scale with zoom, like everything else.
  const ROUTE_TYPES = {
    water_river: { label: 'Water River',       color: '#3a8abf', width: 3, dash: [] },
    lava_river:  { label: 'Lava River',        color: '#e0502a', width: 3, dash: [] },
    toxic_river: { label: 'Toxic River',       color: '#8ac93a', width: 3, dash: [] },
    road:        { label: 'Road',              color: '#c9a86a', width: 2, dash: [6, 3] },
    current:     { label: 'Air/Water Current', color: '#7ec8e3', width: 2, dash: [2, 4] },
    leyline:     { label: 'Ley Line',          color: '#a070d0', width: 2, dash: [1, 3] },
    trade_route: { label: 'Trade Route',       color: '#e0b04c', width: 2, dash: [8, 4] },
  };
  // Colors are user-editable per type (see buildRoutePalette) — this is the live copy.
  let routeTypeColors = Object.fromEntries(Object.entries(ROUTE_TYPES).map(([k, v]) => [k, v.color]));
  let currentRouteType = Object.keys(ROUTE_TYPES)[0];

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
  function artTundra() {
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath(); ctx.arc(-5,7,7,Math.PI,0,true); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(5,8,6,Math.PI,0,true); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(150,190,210,0.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-8,-6); ctx.lineTo(-2,-2); ctx.lineTo(-6,2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4,-8); ctx.lineTo(8,-3); ctx.lineTo(3,-1); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-1,-11); ctx.lineTo(-1,-7); ctx.moveTo(-3,-9); ctx.lineTo(1,-9); ctx.stroke();
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
  function artJungle() {
    ctx.fillStyle = 'rgba(5,45,15,0.85)';
    ctx.beginPath(); ctx.moveTo(-8,-8); ctx.lineTo(0,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(15,80,30,0.85)';
    ctx.beginPath(); ctx.moveTo(2,-10); ctx.lineTo(12,6); ctx.lineTo(-4,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(40,140,55,0.9)';
    ctx.beginPath(); ctx.moveTo(-2,-6); ctx.lineTo(5,5); ctx.lineTo(-9,5); ctx.closePath(); ctx.fill();
  }
  function artMushroomforest() {
    ctx.fillStyle = 'rgba(200,60,50,0.85)';
    ctx.beginPath(); ctx.ellipse(-5,-2,4,2.5,0,Math.PI,0); ctx.fill();
    ctx.fillStyle = 'rgba(230,220,200,0.9)';
    [[-6.5,-2.5],[-3.5,-2.5],[-5,-3.5]].forEach(([x,y]) => { ctx.beginPath(); ctx.arc(x,y,0.6,0,Math.PI*2); ctx.fill(); });
    ctx.fillStyle = 'rgba(220,210,190,0.9)';
    ctx.fillRect(-6,-2,2,5);
    ctx.fillStyle = 'rgba(180,50,45,0.8)';
    ctx.beginPath(); ctx.ellipse(4,-5,5.5,3.5,0,Math.PI,0); ctx.fill();
    ctx.fillStyle = 'rgba(230,220,200,0.85)';
    [[2,-6],[6,-6],[4,-7.5]].forEach(([x,y]) => { ctx.beginPath(); ctx.arc(x,y,0.7,0,Math.PI*2); ctx.fill(); });
    ctx.fillStyle = 'rgba(220,210,190,0.85)';
    ctx.fillRect(3,-5,2,7);
  }
  function artWorldtree() {
    ctx.fillStyle = 'rgba(60,45,30,0.9)';
    ctx.beginPath();
    ctx.moveTo(-5,10); ctx.lineTo(-4,-2); ctx.lineTo(-6,-6); ctx.lineTo(-2,-4);
    ctx.lineTo(0,-9); ctx.lineTo(2,-4); ctx.lineTo(6,-6); ctx.lineTo(4,-2); ctx.lineTo(5,10);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(60,45,30,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-5,8); ctx.lineTo(-11,11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5,8); ctx.lineTo(11,11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,14); ctx.stroke();
    ctx.fillStyle = 'rgba(50,110,60,0.55)';
    ctx.beginPath(); ctx.arc(0,-10,11,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(80,150,80,0.5)';
    ctx.beginPath(); ctx.arc(-5,-8,7,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(6,-9,6,0,Math.PI*2); ctx.fill();
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
  function artGrassland() {
    ctx.strokeStyle = 'rgba(30,90,10,0.5)'; ctx.lineWidth = 1.3;
    [[-8,2],[-4,-1],[0,2],[4,-1],[8,2]].forEach(([xo,yo]) => {
      ctx.beginPath(); ctx.moveTo(xo,8+yo); ctx.quadraticCurveTo(xo-1,3+yo,xo+1,-5+yo); ctx.stroke();
    });
  }
  function artFarm() {
    ctx.strokeStyle = 'rgba(120,90,30,0.55)'; ctx.lineWidth = 1.3;
    [-8,-3,2,7].forEach(x => {
      ctx.beginPath(); ctx.moveTo(x,9); ctx.lineTo(x+3,-9); ctx.stroke();
    });
    ctx.strokeStyle = 'rgba(90,65,20,0.7)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(10,0); ctx.stroke();
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
  function artBeacon() {
    // Pole with a waving pennant and a lit glow at the tip
    ctx.strokeStyle = 'rgba(70,50,35,0.9)'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(0, 9); ctx.lineTo(0, -11); ctx.stroke();
    ctx.fillStyle = '#f5d060';
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(9, -7); ctx.lineTo(0, -3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,220,140,0.9)';
    ctx.beginPath(); ctx.arc(0, -11, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,220,140,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, -11, 5, 0, Math.PI * 2); ctx.stroke();
  }
  function artFort() {
    // Dark circle with steel border, echoing Settlement's POI marker style
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = '#b0b0b8'; ctx.lineWidth = 1.5; ctx.stroke();
    // Crenellated tower
    ctx.fillStyle = '#b0b0b8';
    ctx.fillRect(-3, -1, 6, 5);
    ctx.fillRect(-3.5, -3, 2, 2.5);
    ctx.fillRect(1.5, -3, 2, 2.5);
  }
  function artTower() {
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = '#c8c0b0'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#c8c0b0';
    ctx.beginPath(); ctx.moveTo(-2.5,5); ctx.lineTo(-2,-3); ctx.lineTo(2,-3); ctx.lineTo(2.5,5); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-3,-3); ctx.lineTo(0,-8); ctx.lineTo(3,-3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(-0.7,0,1.4,2);
  }
  function artAncientruins() {
    ctx.fillStyle = 'rgba(150,145,130,0.75)';
    ctx.fillRect(-8,-2,4,10);
    ctx.fillRect(-1,-9,4,17);
    ctx.fillRect(5,2,4,6);
    ctx.fillStyle = 'rgba(100,95,85,0.6)';
    ctx.fillRect(-9,8,20,2);
    ctx.strokeStyle = 'rgba(60,100,50,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-7,-2); ctx.quadraticCurveTo(-9,2,-6,6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-9); ctx.quadraticCurveTo(-2,-4,1,0); ctx.stroke();
  }
  function artTemple() {
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = '#e8dcb0'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#e8dcb0';
    ctx.beginPath(); ctx.moveTo(-5,-2); ctx.lineTo(0,-6); ctx.lineTo(5,-2); ctx.closePath(); ctx.fill();
    ctx.fillRect(-4,-2,1.4,5);
    ctx.fillRect(-1,-2,1.4,5);
    ctx.fillRect(2.6,-2,1.4,5);
    ctx.fillRect(-5,3,10,1.3);
  }

  // ── Sky island art ──
  function artVoid() {
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    [[-7,-6],[4,-8],[8,3],[-3,7],[0,-2],[-9,2]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = 'rgba(120,110,200,0.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(0, 0, 9, 0.4, 3.6); ctx.stroke();
  }
  function artCloudsea() {
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    [[-7,2,6],[-1,-2,7],[6,2,6],[1,5,5]].forEach(([x, y, rad]) => {
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
    });
  }
  function artSkyreef() {
    ctx.fillStyle = 'rgba(90,70,55,0.85)';
    ctx.beginPath(); ctx.moveTo(-8,-2); ctx.lineTo(-2,-9); ctx.lineTo(6,-4); ctx.lineTo(8,4); ctx.lineTo(-6,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(90,150,90,0.7)';
    ctx.beginPath(); ctx.arc(-2,-6,3.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0,9); ctx.lineTo(0,13); ctx.stroke();
  }
  function artStorm() {
    ctx.fillStyle = 'rgba(20,15,35,0.6)';
    ctx.beginPath(); ctx.arc(-4,-4,7,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-2,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f5d060';
    ctx.beginPath();
    ctx.moveTo(1,-3); ctx.lineTo(-3,4); ctx.lineTo(0,4); ctx.lineTo(-2,10); ctx.lineTo(4,2); ctx.lineTo(1,2); ctx.closePath();
    ctx.fill();
  }
  function artCrystal() {
    ctx.fillStyle = 'rgba(160,120,220,0.55)';
    ctx.beginPath(); ctx.moveTo(-2,-11); ctx.lineTo(2,-2); ctx.lineTo(-6,-2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(120,200,220,0.6)';
    ctx.beginPath(); ctx.moveTo(5,-8); ctx.lineTo(8,2); ctx.lineTo(1,1); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(180,140,230,0.7)';
    ctx.beginPath(); ctx.moveTo(-8,-4); ctx.lineTo(-4,6); ctx.lineTo(-11,4); ctx.closePath(); ctx.fill();
  }
  function artAshfall() {
    ctx.fillStyle = 'rgba(40,32,30,0.85)';
    ctx.beginPath(); ctx.moveTo(0,-9); ctx.lineTo(9,6); ctx.lineTo(-9,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,110,40,0.85)';
    ctx.beginPath(); ctx.arc(0,-8,2.2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(90,85,85,0.5)';
    ctx.beginPath(); ctx.arc(3,-11,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-2,-13,2.4,0,Math.PI*2); ctx.fill();
  }
  function artRuins() {
    ctx.fillStyle = 'rgba(200,190,165,0.75)';
    ctx.fillRect(-8,-2,4,9);
    ctx.fillRect(-1,-8,4,15);
    ctx.fillRect(5,1,4,6);
    ctx.fillStyle = 'rgba(140,130,110,0.6)';
    ctx.fillRect(-9,7,20,2);
  }
  function artSkydock() {
    ctx.strokeStyle = 'rgba(120,90,50,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-9,4); ctx.lineTo(9,4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6,4); ctx.lineTo(-6,8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,4); ctx.lineTo(6,8); ctx.stroke();
    ctx.strokeStyle = 'rgba(220,200,160,0.9)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(0,-9); ctx.stroke();
    ctx.fillStyle = '#c9a84c';
    ctx.beginPath(); ctx.moveTo(0,-9); ctx.lineTo(7,-6); ctx.lineTo(0,-3); ctx.closePath(); ctx.fill();
  }
  function artAirship() {
    ctx.fillStyle = 'rgba(200,170,120,0.85)';
    ctx.beginPath(); ctx.ellipse(0,-3,11,5,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(120,90,60,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-6,-7); ctx.lineTo(-6,1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-8); ctx.lineTo(0,2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-7); ctx.lineTo(6,1); ctx.stroke();
    ctx.fillStyle = 'rgba(60,50,40,0.9)';
    ctx.fillRect(-5,3,10,3.5);
    ctx.strokeStyle = 'rgba(60,50,40,0.7)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(-5,4); ctx.lineTo(-7,2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5,4); ctx.lineTo(7,2); ctx.stroke();
  }
  function artFlyingfortress() {
    ctx.fillStyle = 'rgba(70,65,60,0.85)';
    ctx.beginPath(); ctx.moveTo(-10,4); ctx.lineTo(-6,9); ctx.lineTo(8,9); ctx.lineTo(10,3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(90,88,95,0.9)';
    ctx.fillRect(-8,-3,16,7);
    ctx.fillRect(-9,-8,4,6);
    ctx.fillRect(5,-8,4,6);
    ctx.fillRect(-2,-10,4,8);
    ctx.fillStyle = 'rgba(40,38,42,0.7)';
    ctx.fillRect(-9,-8,1.3,1.3);
    ctx.fillRect(-6.5,-8,1.3,1.3);
    ctx.fillRect(5,-8,1.3,1.3);
    ctx.fillRect(7.5,-8,1.3,1.3);
  }
  function artCrackedland() {
    ctx.strokeStyle = 'rgba(40,30,20,0.75)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(-2,-1); ctx.lineTo(-5,5); ctx.lineTo(0,9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-9); ctx.lineTo(1,-2); ctx.lineTo(7,3); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,140,60,0.5)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(-2,-1); ctx.lineTo(1,-2); ctx.stroke();
    ctx.fillStyle = 'rgba(90,75,55,0.7)';
    ctx.beginPath(); ctx.moveTo(2,10); ctx.lineTo(6,11); ctx.lineTo(4,14); ctx.closePath(); ctx.fill();
  }

  // ── Wasteland art ──
  function artWastes() {
    ctx.strokeStyle = 'rgba(40,35,10,0.6)'; ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(-9,-7); ctx.lineTo(-2,-1); ctx.lineTo(-6,6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2,-8); ctx.lineTo(-2,-1); ctx.lineTo(6,3); ctx.lineTo(3,9); ctx.stroke();
    ctx.fillStyle = 'rgba(180,200,40,0.55)';
    ctx.beginPath(); ctx.arc(-2,-1,2,0,Math.PI*2); ctx.fill();
  }
  function artRuinfield() {
    ctx.fillStyle = 'rgba(40,38,35,0.8)';
    ctx.beginPath(); ctx.moveTo(-9,7); ctx.lineTo(-9,-6); ctx.lineTo(-6,-9); ctx.lineTo(-4,-3); ctx.lineTo(-2,7); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,7); ctx.lineTo(0,-2); ctx.lineTo(4,-8); ctx.lineTo(6,1); ctx.lineTo(8,7); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,140,40,0.4)';
    ctx.beginPath(); ctx.arc(-6,-4,1.2,0,Math.PI*2); ctx.fill();
  }
  function artCraterzone() {
    ctx.strokeStyle = 'rgba(60,60,50,0.6)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(0,2,10,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0,2,6,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle = 'rgba(140,220,90,0.55)';
    ctx.beginPath(); ctx.arc(0,2,3,0,Math.PI*2); ctx.fill();
  }
  function artDeadforest() {
    ctx.strokeStyle = 'rgba(50,42,32,0.8)'; ctx.lineWidth = 1.4;
    [-6,1,7].forEach(x => {
      ctx.beginPath(); ctx.moveTo(x,9); ctx.lineTo(x-1,-6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x-1,-2); ctx.lineTo(x-5,-6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x-1,-4); ctx.lineTo(x+4,-8); ctx.stroke();
    });
  }
  function artToxicswamp() {
    ctx.fillStyle = 'rgba(120,160,40,0.5)';
    ctx.beginPath(); ctx.ellipse(0,6,10,3,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(160,210,60,0.65)';
    [[-4,0,1.6],[3,-3,1.2],[-1,-6,1]].forEach(([x,y,rad]) => {
      ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fill();
    });
  }
  function artDunefield() {
    ctx.strokeStyle = 'rgba(120,112,95,0.55)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-10,-2); ctx.quadraticCurveTo(-5,-8,0,-2); ctx.quadraticCurveTo(5,4,10,-2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-9,5); ctx.quadraticCurveTo(-2,-1,5,5); ctx.stroke();
  }
  function artJunkyard() {
    ctx.fillStyle = 'rgba(120,70,40,0.7)';
    ctx.beginPath(); ctx.moveTo(-8,7); ctx.lineTo(-6,-3); ctx.lineTo(-1,0); ctx.lineTo(-3,7); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(90,90,95,0.7)';
    ctx.beginPath(); ctx.moveTo(0,7); ctx.lineTo(3,-6); ctx.lineTo(8,-1); ctx.lineTo(6,7); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(50,45,40,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-8,-1); ctx.lineTo(2,-4); ctx.stroke();
  }
  function artBunker() {
    ctx.fillStyle = 'rgba(60,64,55,0.85)';
    ctx.beginPath(); ctx.arc(0,4,9,Math.PI,0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(20,18,15,0.85)';
    ctx.beginPath(); ctx.arc(0,4,2.4,Math.PI,0); ctx.fill();
    ctx.strokeStyle = 'rgba(150,150,140,0.8)'; ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(6,-5); ctx.lineTo(6,-11); ctx.stroke();
    ctx.fillStyle = 'rgba(220,60,50,0.8)';
    ctx.beginPath(); ctx.arc(6,-11,1.3,0,Math.PI*2); ctx.fill();
  }

  // ── Steampunk / arcanepunk / dieselpunk art ──
  function artFactoryland() {
    ctx.fillStyle = 'rgba(80,50,40,0.85)';
    ctx.fillRect(-8,-2,3,11);
    ctx.fillRect(-1,-6,3,15);
    ctx.fillRect(5,0,3,9);
    ctx.fillStyle = 'rgba(150,150,150,0.5)';
    ctx.beginPath(); ctx.arc(0,-9,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(2,-13,2.4,0,Math.PI*2); ctx.fill();
  }
  function artClockwork() {
    ctx.strokeStyle = 'rgba(200,160,70,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0,0,6,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle = 'rgba(200,160,70,0.8)';
    for (let i = 0; i < 8; i++) {
      ctx.save(); ctx.rotate(Math.PI / 4 * i); ctx.fillRect(-1,-9,2,3); ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0,0,2,0,Math.PI*2); ctx.fill();
  }
  function artRailway() {
    ctx.strokeStyle = 'rgba(90,80,70,0.8)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-8,8); ctx.lineTo(-3,-9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8,8); ctx.lineTo(3,-9); ctx.stroke();
    ctx.strokeStyle = 'rgba(60,50,40,0.7)'; ctx.lineWidth = 1.2;
    [[-6,6,6],[-5,0,5],[-4,-5,4]].forEach(([x1,y,x2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke();
    });
  }
  function artAetherfield() {
    ctx.strokeStyle = 'rgba(140,120,255,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-7,3); ctx.quadraticCurveTo(0,-8,7,2); ctx.stroke();
    ctx.fillStyle = 'rgba(120,200,255,0.8)';
    [[-7,3],[0,-6],[7,2],[-2,6]].forEach(([x,y]) => {
      ctx.beginPath(); ctx.arc(x,y,1.6,0,Math.PI*2); ctx.fill();
    });
  }
  function artSmogmarsh() {
    ctx.fillStyle = 'rgba(90,100,60,0.5)';
    ctx.beginPath(); ctx.ellipse(0,6,10,3,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(70,65,60,0.55)';
    ctx.beginPath(); ctx.arc(-3,-3,6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4,-1,5,0,Math.PI*2); ctx.fill();
  }
  function artSlagmountain() {
    ctx.fillStyle = 'rgba(70,45,40,0.8)';
    ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(4,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(60,40,38,0.85)';
    ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(13,6); ctx.lineTo(-7,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,120,40,0.85)';
    ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(6,-4); ctx.lineTo(0,-4); ctx.closePath(); ctx.fill();
  }
  function artAirdock() {
    ctx.strokeStyle = 'rgba(120,90,50,0.8)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,-2); ctx.stroke();
    ctx.fillStyle = 'rgba(180,140,80,0.75)';
    ctx.beginPath(); ctx.ellipse(2,-7,8,4,0.15,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(90,70,50,0.85)';
    ctx.fillRect(0,-3,4,2.5);
    ctx.strokeStyle = 'rgba(90,70,50,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-2,-4); ctx.lineTo(-3,-2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-4); ctx.lineTo(7,-2); ctx.stroke();
  }
  function artQuarry() {
    ctx.strokeStyle = 'rgba(20,18,16,0.7)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(0,2,10,Math.PI*0.15,Math.PI*0.85); ctx.stroke();
    ctx.beginPath(); ctx.arc(0,3,6,Math.PI*0.1,Math.PI*0.9); ctx.stroke();
    ctx.fillStyle = 'rgba(10,10,10,0.6)';
    ctx.beginPath(); ctx.ellipse(0,6,4,2,0,0,Math.PI*2); ctx.fill();
  }

  // ── Underdark art ──
  function artCavern() {
    ctx.fillStyle = 'rgba(70,64,70,0.75)';
    [[-8,-12],[0,-13],[7,-11]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x+2,y); ctx.lineTo(x,y+8); ctx.closePath(); ctx.fill();
    });
    ctx.fillStyle = 'rgba(50,45,50,0.75)';
    [[-5,12],[4,13]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x+2,y); ctx.lineTo(x,y-8); ctx.closePath(); ctx.fill();
    });
  }
  function artChasm() {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.moveTo(-9,-6); ctx.lineTo(-2,-2); ctx.lineTo(-6,3); ctx.lineTo(0,8);
    ctx.lineTo(6,2); ctx.lineTo(2,-4); ctx.lineTo(9,-7); ctx.lineTo(3,0);
    ctx.closePath(); ctx.fill();
  }
  function artFungalforest() {
    ctx.strokeStyle = 'rgba(200,180,220,0.6)'; ctx.lineWidth = 1.4;
    [[-6,8],[6,8],[0,9]].forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-6); ctx.stroke(); });
    ctx.fillStyle = 'rgba(140,90,160,0.75)';
    ctx.beginPath(); ctx.ellipse(-6,1,5,3,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6,1,5,3,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(180,140,200,0.8)';
    ctx.beginPath(); ctx.ellipse(0,2,6,3.5,0,0,Math.PI*2); ctx.fill();
  }
  function artUndergroundlake() {
    ctx.strokeStyle = 'rgba(80,130,190,0.35)'; ctx.lineWidth = 1.3;
    [-5,1,7].forEach(y => {
      ctx.beginPath(); ctx.moveTo(-9,y); ctx.quadraticCurveTo(-4,y-3,0,y); ctx.quadraticCurveTo(4,y+3,9,y); ctx.stroke();
    });
  }
  function artCrystalcave() {
    ctx.fillStyle = 'rgba(80,200,210,0.55)';
    ctx.beginPath(); ctx.moveTo(-2,-10); ctx.lineTo(2,-1); ctx.lineTo(-6,-1); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(60,170,190,0.6)';
    ctx.beginPath(); ctx.moveTo(5,-7); ctx.lineTo(8,3); ctx.lineTo(1,2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(100,220,220,0.7)';
    ctx.beginPath(); ctx.moveTo(-8,-3); ctx.lineTo(-4,7); ctx.lineTo(-11,5); ctx.closePath(); ctx.fill();
  }
  function artLavatube() {
    ctx.fillStyle = 'rgba(30,20,18,0.8)';
    ctx.beginPath(); ctx.arc(0,10,11,Math.PI,0,true); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,90,30,0.85)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(-7,4); ctx.lineTo(-2,7); ctx.lineTo(2,3); ctx.lineTo(7,6); ctx.stroke();
  }
  function artDeeproad() {
    ctx.strokeStyle = 'rgba(150,144,130,0.6)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(-9,7); ctx.lineTo(9,-7); ctx.stroke();
    ctx.strokeStyle = 'rgba(100,94,84,0.5)'; ctx.lineWidth = 1.2;
    [[-4,4],[1,-1],[6,-6]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x-2,y+2); ctx.lineTo(x+2,y-2); ctx.stroke();
    });
  }
  function artDrowoutpost() {
    ctx.beginPath(); ctx.arc(0,0,8,0,Math.PI*2);
    ctx.fillStyle = 'rgba(20,10,30,0.85)'; ctx.fill();
    ctx.strokeStyle = '#a070d0'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#a070d0';
    ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(2,1); ctx.lineTo(-2,1); ctx.closePath(); ctx.fill();
    ctx.fillRect(-1,1,2,4);
  }

  // ── Undead art ──
  function artGraveyard() {
    ctx.fillStyle = 'rgba(160,160,155,0.75)';
    [[-7,2],[0,0],[6,3]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.moveTo(x-2,y+6); ctx.lineTo(x-2,y-1);
      ctx.arc(x,y-1,2,Math.PI,0,true);
      ctx.lineTo(x+2,y+6);
      ctx.closePath(); ctx.fill();
    });
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-7,-3); ctx.lineTo(-7,0); ctx.moveTo(-8,-1); ctx.lineTo(-6,-1); ctx.stroke();
  }
  function artHauntedforest() {
    ctx.strokeStyle = 'rgba(30,25,25,0.85)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(0,9); ctx.quadraticCurveTo(-3,0,-1,-8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1,-3); ctx.lineTo(-7,-7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1,-5); ctx.lineTo(4,-9); ctx.stroke();
    ctx.fillStyle = 'rgba(140,220,140,0.55)';
    ctx.beginPath(); ctx.arc(5,-2,2.2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(140,220,140,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(5,-2,5,0,Math.PI*2); ctx.stroke();
  }
  function artNecropolis() {
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
    ctx.strokeStyle = '#9098a0'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#9098a0';
    ctx.beginPath(); ctx.moveTo(-3,1); ctx.lineTo(0,-4); ctx.lineTo(3,1); ctx.closePath(); ctx.fill();
    ctx.fillRect(-3,1,6,3.5);
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath(); ctx.arc(0,-1,1,0,Math.PI*2); ctx.fill();
  }
  function artBonefields() {
    ctx.strokeStyle = 'rgba(90,85,70,0.7)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-8,3); ctx.lineTo(-2,1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2,-3); ctx.lineTo(8,-5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3,6); ctx.quadraticCurveTo(0,2,3,6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2,5); ctx.quadraticCurveTo(0,3,2,5); ctx.stroke();
    ctx.fillStyle = 'rgba(210,200,175,0.8)';
    ctx.beginPath(); ctx.arc(-4,-4,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(30,25,20,0.8)';
    ctx.beginPath(); ctx.arc(-5,-4.5,0.7,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-3,-4.5,0.7,0,Math.PI*2); ctx.fill();
  }
  function artCursedswamp() {
    ctx.strokeStyle = 'rgba(20,30,20,0.75)'; ctx.lineWidth = 1.4;
    [-6,0,6].forEach(x => {
      ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x,-2); ctx.stroke();
    });
    ctx.fillStyle = 'rgba(140,100,200,0.4)';
    ctx.beginPath(); ctx.arc(2,-5,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-4,-7,2,0,Math.PI*2); ctx.fill();
  }
  function artCrypt() {
    ctx.fillStyle = 'rgba(50,48,52,0.85)';
    ctx.beginPath();
    ctx.moveTo(-6,8); ctx.lineTo(-6,-2);
    ctx.arc(0,-2,6,Math.PI,0,true);
    ctx.lineTo(6,8);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.beginPath();
    ctx.moveTo(-3,8); ctx.lineTo(-3,-1);
    ctx.arc(0,-1,3,Math.PI,0,true);
    ctx.lineTo(3,8);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(140,220,140,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0,6); ctx.lineTo(0,2); ctx.stroke();
  }
  function artWitheredwastes() {
    ctx.strokeStyle = 'rgba(60,55,40,0.6)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-8,4); ctx.lineTo(-2,0); ctx.lineTo(-6,-6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3,6); ctx.lineTo(7,1); ctx.lineTo(4,-4); ctx.stroke();
    ctx.strokeStyle = 'rgba(40,38,30,0.8)'; ctx.lineWidth = 1;
    [-4,2,7].forEach(x => {
      ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x-1,4); ctx.moveTo(x,8); ctx.lineTo(x+1,4); ctx.stroke();
    });
  }

  function drawBiomeArt(cx, cy, size, biome) {
    ctx.save();
    traceHexPath(cx, cy, size);
    ctx.clip();
    ctx.translate(cx, cy);
    ctx.scale(size / 24, size / 24);
    switch (biome) {
      case 'mountain': artMountain(); break;
      case 'tundra':   artTundra();   break;
      case 'highland': artHighland(); break;
      case 'forest':   artForest();   break;
      case 'hills':    artHills();    break;
      case 'plains':   artPlains();   break;
      case 'grassland': artGrassland(); break;
      case 'farm':     artFarm();      break;
      case 'jungle':   artJungle();   break;
      case 'mushroomforest': artMushroomforest(); break;
      case 'worldtree':      artWorldtree();      break;
      case 'desert':   artDesert();   break;
      case 'swamp':    artSwamp();    break;
      case 'ocean':    artOcean();    break;
      case 'coast':      artCoast();      break;
      case 'settlement': artSettlement(); break;
      case 'beacon':     artBeacon();     break;
      case 'fort':       artFort();       break;
      case 'tower':        artTower();        break;
      case 'ancientruins': artAncientruins(); break;
      case 'temple':       artTemple();       break;
      case 'void':      artVoid();      break;
      case 'cloudsea':  artCloudsea();  break;
      case 'skyreef':   artSkyreef();   break;
      case 'storm':     artStorm();     break;
      case 'crystal':   artCrystal();   break;
      case 'ashfall':   artAshfall();   break;
      case 'ruins':     artRuins();     break;
      case 'skydock':   artSkydock();   break;
      case 'airship':        artAirship();        break;
      case 'flyingfortress': artFlyingfortress(); break;
      case 'crackedland':    artCrackedland();    break;
      case 'wastes':       artWastes();       break;
      case 'ruinfield':    artRuinfield();    break;
      case 'craterzone':   artCraterzone();   break;
      case 'deadforest':   artDeadforest();   break;
      case 'toxicswamp':   artToxicswamp();   break;
      case 'dunefield':    artDunefield();    break;
      case 'junkyard':     artJunkyard();     break;
      case 'bunker':       artBunker();       break;
      case 'factoryland':  artFactoryland();  break;
      case 'clockwork':    artClockwork();    break;
      case 'railway':      artRailway();      break;
      case 'aetherfield':  artAetherfield();  break;
      case 'smogmarsh':    artSmogmarsh();    break;
      case 'slagmountain': artSlagmountain(); break;
      case 'airdock':      artAirdock();      break;
      case 'quarry':       artQuarry();       break;
      case 'cavern':          artCavern();          break;
      case 'chasm':           artChasm();           break;
      case 'fungalforest':    artFungalforest();    break;
      case 'undergroundlake': artUndergroundlake(); break;
      case 'crystalcave':     artCrystalcave();     break;
      case 'lavatube':        artLavatube();        break;
      case 'deeproad':        artDeeproad();        break;
      case 'drowoutpost':     artDrowoutpost();     break;
      case 'graveyard':      artGraveyard();      break;
      case 'hauntedforest':  artHauntedforest();  break;
      case 'necropolis':     artNecropolis();     break;
      case 'bonefields':     artBonefields();     break;
      case 'cursedswamp':    artCursedswamp();    break;
      case 'crypt':          artCrypt();          break;
      case 'witheredwastes': artWitheredwastes(); break;
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
  // User-defined, freely reorderable layers sharing the same (q,r) coordinate
  // space — e.g. "Sky Islands" above, "Realm" at ground level, "Underdark" below.
  function createLayer(name) {
    return {
      id: crypto.randomUUID(),
      name,
      grid: new Map(),       // "q,r" → biome string
      hexLinks: new Map(),   // "q,r" → [{ id, name, type }, ...]
      attributes: new Map(), // attrKey → Map("q,r" → { id, name, color })
      routes: [],              // [{ id, type, points: [{q,r}, ...] }]
      undoStack: [],
      redoStack: [],
    };
  }

  // Get-or-create a single attribute layer's "q,r" → value map.
  function attrGrid(attrKey) {
    if (!L().attributes.has(attrKey)) L().attributes.set(attrKey, new Map());
    return L().attributes.get(attrKey);
  }

  // Read-only accessor that never mutates `attributes` just by being looked at.
  const EMPTY_MAP = new Map();
  function attrGridReadonly(attrKey) {
    return L().attributes.get(attrKey) || EMPTY_MAP;
  }

  let layers = [createLayer('Sky Islands'), createLayer('Realm'), createLayer('Underdark')];
  let currentLayerIdx = 1; // "Realm" active by default
  function L() { return layers[currentLayerIdx]; }

  function notifyLayersChanged() {
    window.__hexmapOnLayersChanged?.(layers.map(l => ({ id: l.id, name: l.name })), currentLayerIdx);
  }

  function switchLayer(idx) {
    if (idx < 0 || idx >= layers.length || idx === currentLayerIdx) return;
    currentLayerIdx = idx;
    updateToolbar();
    updateStatus(hoverHex?.q ?? 0, hoverHex?.r ?? 0);
    scheduleRender();
    notifyLayersChanged();
    window.__hexmapOnLinksChanged?.();
  }

  function addLayer() {
    const layer = createLayer(`Layer ${layers.length + 1}`);
    layers.splice(currentLayerIdx + 1, 0, layer);
    currentLayerIdx = currentLayerIdx + 1;
    scheduleRender();
    notifyLayersChanged();
    window.__hexmapOnLinksChanged?.();
  }

  function deleteLayer(idx) {
    if (layers.length <= 1 || idx < 0 || idx >= layers.length) return;
    layers.splice(idx, 1);
    currentLayerIdx = Math.min(currentLayerIdx, layers.length - 1);
    scheduleRender();
    notifyLayersChanged();
    window.__hexmapOnLinksChanged?.();
  }

  function renameLayer(idx, name) {
    if (!layers[idx] || !name) return;
    layers[idx].name = name;
    notifyLayersChanged();
  }

  function reorderLayer(fromIdx, toIdx) {
    if (fromIdx === toIdx || !layers[fromIdx] || !layers[toIdx]) return;
    const activeId = layers[currentLayerIdx].id;
    const [moved] = layers.splice(fromIdx, 1);
    layers.splice(toIdx, 0, moved);
    currentLayerIdx = layers.findIndex(l => l.id === activeId);
    notifyLayersChanged();
  }

  // ── Ghost layers — faint onion-skin preview of the layer above/below ─────
  let showGhostAbove = false, showGhostBelow = false;

  function notifyGhostChanged() {
    window.__hexmapOnGhostChanged?.(showGhostAbove, showGhostBelow);
  }

  function toggleGhostAbove() {
    showGhostAbove = !showGhostAbove;
    scheduleRender();
    notifyGhostChanged();
  }

  function toggleGhostBelow() {
    showGhostBelow = !showGhostBelow;
    scheduleRender();
    notifyGhostChanged();
  }

  let currentBiome = 'plains';
  let currentTool  = 'paint';
  let currentContentId = null;

  // ── Attribute painting (zone-of-influence style overlays) ────────────────
  // currentPaintTarget is 'biome' or an ATTRIBUTE_TYPES key — paint/erase/fill/
  // radius/pick all branch on it. currentAttrValue is the swatch currently
  // selected from the attribute palette (null until the user picks one).
  let currentPaintTarget  = 'biome';
  let currentAttributeType = 'faction';
  let currentAttrValue    = null; // { id, name, color }

  function targetMap() {
    return currentPaintTarget === 'biome' ? L().grid : attrGrid(currentPaintTarget);
  }
  function targetMapReadonly() {
    return currentPaintTarget === 'biome' ? L().grid : attrGridReadonly(currentPaintTarget);
  }
  function targetValue() {
    return currentPaintTarget === 'biome' ? currentBiome : currentAttrValue;
  }

  // Radius tool: click a hex to paint a ring (or filled disk) of a given
  // radius around it, all in currentBiome.
  let radiusToolValue = 3;
  let radiusToolMode = 'ring'; // 'ring' | 'fill'

  function offsetToAxial(q, r) {
    return { aq: q - (r - (r & 1)) / 2, ar: r };
  }
  function axialToOffset(aq, ar) {
    return { q: aq + (ar - (ar & 1)) / 2, r: ar };
  }

  function hexRing(centerAq, centerAr, radius) {
    if (radius <= 0) return [{ aq: centerAq, ar: centerAr }];
    const dirs = [[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
    const results = [];
    let aq = centerAq + dirs[4][0] * radius;
    let ar = centerAr + dirs[4][1] * radius;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < radius; j++) {
        results.push({ aq, ar });
        aq += dirs[i][0];
        ar += dirs[i][1];
      }
    }
    return results;
  }

  function hexDisk(centerAq, centerAr, radius) {
    const results = [];
    for (let dq = -radius; dq <= radius; dq++) {
      for (let dr = Math.max(-radius, -dq - radius); dr <= Math.min(radius, -dq + radius); dr++) {
        results.push({ aq: centerAq + dq, ar: centerAr + dr });
      }
    }
    return results;
  }

  function applyRadiusTool(centerQ, centerR) {
    if (currentPaintTarget !== 'biome' && !currentAttrValue) return; // nothing selected to paint
    const { aq, ar } = offsetToAxial(centerQ, centerR);
    const cells = radiusToolMode === 'fill'
      ? hexDisk(aq, ar, radiusToolValue)
      : hexRing(aq, ar, radiusToolValue);
    const tMap = targetMap();
    const value = targetValue();
    const before = snapshot();
    for (const c of cells) {
      const { q, r } = axialToOffset(c.aq, c.ar);
      // Attributes describe existing terrain, not empty space — radius-paint
      // an attribute only where a biome tile already exists.
      if (currentPaintTarget !== 'biome' && !L().grid.has(key(q, r))) continue;
      tMap.set(key(q, r), value);
    }
    pushUndo(before);
    scheduleRender();
  }

  let ox = 0, oy = 0, scale = 1;
  let isPainting = false, isPanning = false;
  let panStart = null;
  let pendingSnapshot = null;
  let spaceDown = false;
  let spacePanLast = null; // last mouse pos during no-click space-pan

  // Route drawing: drag through hexes to lay a path; a plain click (no drag)
  // on an existing route's hex deletes that route instead.
  let isDrawingRoute = false;
  let routeDidDrag = false;
  let pendingRoutePoints = [];
  let routeEraseCandidate = null;

  // Center-pick mode: set by React when user clicks "Pick on map"
  let pickCenterCb = null;

  let canvas, ctx, wrap;
  let rafId = null;

  // ── Undo / redo (per layer) ─────────────────────────────────────────────────
  // A snapshot captures both the tile grid and the routes drawn on this layer.
  function snapshot() {
    return {
      grid: new Map(L().grid),
      routes: L().routes.map(r => ({ ...r, points: [...r.points] })),
      attributes: new Map([...L().attributes].map(([k, m]) => [k, new Map(m)])),
    };
  }

  function pushUndo(before) {
    L().undoStack.push(before);
    if (L().undoStack.length > 80) L().undoStack.shift();
    L().redoStack = [];
  }

  function undo() {
    if (!L().undoStack.length) return;
    L().redoStack.push(snapshot());
    const prev = L().undoStack.pop();
    L().grid = prev.grid;
    L().routes = prev.routes;
    L().attributes = prev.attributes;
    scheduleRender();
  }

  function redo() {
    if (!L().redoStack.length) return;
    L().undoStack.push(snapshot());
    const next = L().redoStack.pop();
    L().grid = next.grid;
    L().routes = next.routes;
    L().attributes = next.attributes;
    scheduleRender();
  }

  // Loose equality for paint-target values: biome values are plain strings;
  // attribute values are small { id, name, color } snapshots compared by id.
  function valuesEqual(a, b) {
    const av = a ?? null, bv = b ?? null;
    if (av === bv) return true;
    if (av && bv && typeof av === 'object' && typeof bv === 'object') return av.id === bv.id;
    return false;
  }

  // ── Grid helpers ──────────────────────────────────────────────────────────
  function key(q, r) { return q + ',' + r; }

  // ── Routes ────────────────────────────────────────────────────────────────
  function findRouteAt(q, r) {
    return L().routes.find(route => route.points.some(p => p.q === q && p.r === r)) || null;
  }

  function drawRoute(route, size, cxOff, cyOff) {
    if (!route.points || route.points.length < 2) return;
    const def = ROUTE_TYPES[route.type];
    if (!def) return;
    ctx.save();
    ctx.strokeStyle = routeTypeColors[route.type] ?? def.color;
    ctx.lineWidth = Math.max(1, def.width * scale);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash((def.dash || []).map(d => d * scale));
    ctx.beginPath();
    route.points.forEach((p, i) => {
      const { x, y } = hexToPixel(p.q, p.r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    });
    ctx.stroke();
    ctx.restore();
  }

  // ── Flood fill — only spreads across hexes that already have terrain, but
  // writes into whichever map is currently targeted (biome or an attribute) ──
  function floodFill(startQ, startR) {
    const startKey = key(startQ, startR);
    if (!L().grid.has(startKey)) return;
    if (currentPaintTarget !== 'biome' && !currentAttrValue) return; // nothing selected to paint

    const tMap = targetMap();
    const newValue = targetValue();
    const origValue = tMap.get(startKey) ?? null;
    if (valuesEqual(origValue, newValue)) return;

    const before = snapshot();
    const queue   = [{ q: startQ, r: startR }];
    const visited = new Set([startKey]);

    while (queue.length) {
      const { q, r } = queue.pop();
      tMap.set(key(q, r), newValue);
      for (const nb of neighbors(q, r)) {
        const nk = key(nb.q, nb.r);
        if (!visited.has(nk) && L().grid.has(nk) && valuesEqual(tMap.get(nk) ?? null, origValue)) {
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

  // Draw another layer's tiles faintly, underneath/above the active layer —
  // an onion-skin reference so you can align hexes across layers without switching.
  function renderGhostLayer(layer, size, cxOff, cyOff, margin, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    for (const [k, biome] of layer.grid) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (sx < -margin || sx > canvas.width  + margin) continue;
      if (sy < -margin || sy > canvas.height + margin) continue;
      drawHex(sx, sy, size - 0.5, biome);
    }
    ctx.restore();
  }

  // Returns the on-screen badge positions for a hex's links, in draw order —
  // shared by rendering and click hit-testing so they never drift apart.
  function linkBadgePositions(cx, cy, size, count) {
    const r  = Math.max(6, size * 0.22);
    const gap = r * 1.9;
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push({ x: cx + size * 0.38 + i * gap, y: cy - size * 0.48, r });
    }
    return out;
  }

  function drawLinkIndicators(cx, cy, size, links) {
    const positions = linkBadgePositions(cx, cy, size, links.length);
    links.forEach((link, i) => {
      const { x: ix, y: iy, r } = positions[i];
      const def = LINK_TYPES[link.type] || LINK_TYPES.article;
      ctx.save();
      ctx.beginPath(); ctx.arc(ix, iy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8,6,4,0.92)'; ctx.fill();
      ctx.strokeStyle = def.color; ctx.lineWidth = Math.max(1.2, r * 0.25); ctx.stroke();
      ctx.fillStyle = def.color;
      ctx.font = `bold ${Math.round(r * 1.2)}px Georgia, serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(def.badge, ix, iy + r * 0.07);
      ctx.restore();
    });
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

    // Ghost layers below the active one — drawn first so they sit underneath
    if (showGhostBelow) {
      for (let i = currentLayerIdx + 1; i < layers.length; i++) {
        const dist = i - currentLayerIdx;
        renderGhostLayer(layers[i], size, cxOff, cyOff, margin, Math.max(0.05, 0.17 / dist));
      }
    }

    for (const [k, biome] of L().grid) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (sx < -margin || sx > canvas.width  + margin) continue;
      if (sy < -margin || sy > canvas.height + margin) continue;
      drawHex(sx, sy, size - 0.5, biome);
    }

    // Ghost layers above the active one — drawn after so they float on top
    if (showGhostAbove) {
      for (let i = currentLayerIdx - 1; i >= 0; i--) {
        const dist = currentLayerIdx - i;
        renderGhostLayer(layers[i], size, cxOff, cyOff, margin, Math.max(0.05, 0.17 / dist));
      }
    }

    // Zone-of-influence style overlay for whichever attribute is being
    // painted right now (e.g. faction territory) — tinted over the terrain.
    if (currentPaintTarget !== 'biome') {
      for (const [k, value] of attrGridReadonly(currentPaintTarget)) {
        const [q, r] = k.split(',').map(Number);
        const { x, y } = hexToPixel(q, r, size);
        const sx = x + cxOff, sy = y + cyOff;
        if (sx < -margin || sx > canvas.width  + margin) continue;
        if (sy < -margin || sy > canvas.height + margin) continue;
        ctx.save();
        traceHexPath(sx, sy, size - 0.5);
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = value.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Routes (rivers, roads, ley lines, ...) drawn on top of terrain
    for (const route of L().routes) {
      drawRoute(route, size, cxOff, cyOff);
    }
    if (isDrawingRoute && pendingRoutePoints.length >= 2) {
      drawRoute({ type: currentRouteType, points: pendingRoutePoints }, size, cxOff, cyOff);
    }

    // Draw content-link badges on linked hexes
    for (const [k, links] of L().hexLinks) {
      if (!links.length) continue;
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cxOff, sy = y + cyOff;
      if (sx < -margin || sx > canvas.width  + margin) continue;
      if (sy < -margin || sy > canvas.height + margin) continue;
      drawLinkIndicators(sx, sy, size, links);
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
    if (!L().grid.size) { ox = 0; oy = 0; scale = 1; scheduleRender(); return; }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const k of L().grid.keys()) {
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
    const onBiome = currentPaintTarget === 'biome';

    if (currentTool === 'paint') {
      if (onBiome) {
        L().grid.set(key(q, r), currentBiome);
      } else if (currentAttrValue && L().grid.has(key(q, r))) {
        // Attributes describe existing terrain, not empty space.
        attrGrid(currentPaintTarget).set(key(q, r), currentAttrValue);
      }
    } else if (currentTool === 'erase') {
      if (onBiome) {
        L().grid.delete(key(q, r));
        const hitRoute = findRouteAt(q, r);
        if (hitRoute) L().routes = L().routes.filter(rt => rt.id !== hitRoute.id);
      } else {
        attrGrid(currentPaintTarget).delete(key(q, r));
      }
    } else if (currentTool === 'pick') {
      if (onBiome) {
        const b = L().grid.get(key(q, r));
        if (b) { currentBiome = b; updatePalette(); updateSelectedInfo(); }
      } else {
        const v = attrGridReadonly(currentPaintTarget).get(key(q, r));
        if (v) { currentAttrValue = v; updateAttributePalette(); updateSelectedInfo(); }
      }
    }
    scheduleRender();
  }

  // ── Save / load ───────────────────────────────────────────────────────────
  function gridToArray(layer) {
    const result = [];
    for (const [k, biome] of layer.grid) {
      const [q, r] = k.split(',').map(Number);
      result.push({ q, r, biome });
    }
    return result;
  }

  function arrayToGrid(layer, arr) {
    const g = new Map();
    for (const { q, r, biome } of arr) {
      g.set(key(q, r), biome);
    }
    layer.grid = g;
  }

  function mergeHexes(arr) {
    for (const { q, r, biome } of arr) {
      L().grid.set(key(q, r), biome);
    }
  }

  function hexLinksToArray(layer) {
    const result = [];
    for (const [k, links] of layer.hexLinks) {
      const [q, r] = k.split(',').map(Number);
      for (const link of links) {
        result.push({ q, r, id: link.id, name: link.name, type: link.type });
      }
    }
    return result;
  }

  // Accepts either the current flat link array ({q,r,id,name,type}, one row
  // per link) or the legacy pre-multi-link shape (one article per hex, no
  // `type`) and rebuilds the "q,r" → [links] map either way.
  function arrayToHexLinks(layer, arr) {
    const m = new Map();
    for (const { q, r, id, name, type } of (arr || [])) {
      const k = key(q, r);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push({ id, name, type: type || 'article' });
    }
    layer.hexLinks = m;
  }

  function attributesToArray(layer) {
    const result = [];
    for (const [attrKey, m] of layer.attributes) {
      for (const [k, value] of m) {
        const [q, r] = k.split(',').map(Number);
        result.push({ attrKey, q, r, value });
      }
    }
    return result;
  }

  function arrayToAttributes(layer, arr) {
    const m = new Map();
    for (const { attrKey, q, r, value } of (arr || [])) {
      if (!m.has(attrKey)) m.set(attrKey, new Map());
      m.get(attrKey).set(key(q, r), value);
    }
    layer.attributes = m;
  }

  function getMapName() {
    return document.getElementById('hx-input-name')?.value || 'Untitled Hex Map';
  }

  function layersToSaveData() {
    return layers.map(l => ({
      id: l.id,
      name: l.name,
      hexes: gridToArray(l),
      hexLinks: hexLinksToArray(l),
      attributes: attributesToArray(l),
      routes: l.routes,
    }));
  }

  async function saveToLibrary() {
    const id = currentContentId || crypto.randomUUID();
    currentContentId = id;
    try {
      await window.hxStorage.upsert({
        id, type: 'hexmap', name: getMapName(),
        data: { layers: layersToSaveData(), activeLayer: currentLayerIdx, routeColors: routeTypeColors },
      });
      showToast('Saved to library!');
    } catch (e) {
      console.error('hexmap save error', e);
      alert('Save failed: ' + e.message);
    }
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ name: getMapName(), layers: layersToSaveData(), activeLayer: currentLayerIdx, routeColors: routeTypeColors }, null, 2)],
      { type: 'application/json' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (getMapName() || 'hexmap') + '.json';
    a.click();
  }

  // ── PDF export — renders only the drawn hexes, cropped tightly around them ──
  // Returns one { name, dataUrl, width, height } PNG per non-empty layer, each
  // tightly cropped to just that layer's own painted hexes and routes — same
  // padding convention as fitView(), so only what you've actually drawn is exported.
  function buildExportPages(mimeType = 'image/png') {
    const EXPORT_SIZE = 42; // fixed print resolution, independent of on-screen zoom
    const pad = EXPORT_SIZE * 2;

    // Only the currently-active layer — not the whole map.
    const layer = L();
    if (!layer.grid.size && !layer.routes.length) return [];

    // drawHex/drawRoute paint onto the shared module-level `canvas`/`ctx`/`scale` —
    // redirect them at an offscreen canvas for the duration of the export, then restore.
    const savedCanvas = canvas, savedCtx = ctx, savedScale = scale;
    scale = EXPORT_SIZE / HEX_SIZE;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const k of layer.grid.keys()) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, EXPORT_SIZE);
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    for (const route of layer.routes) {
      for (const p of route.points) {
        const { x, y } = hexToPixel(p.q, p.r, EXPORT_SIZE);
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    minX -= pad; maxX += pad; minY -= pad; maxY += pad;
    const width  = Math.ceil(maxX - minX);
    const height = Math.ceil(maxY - minY);
    const cxOff  = -minX, cyOff = -minY;

    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    canvas = off;
    ctx = off.getContext('2d');

    ctx.fillStyle = '#080706';
    ctx.fillRect(0, 0, width, height);

    for (const [k, biome] of layer.grid) {
      const [q, r] = k.split(',').map(Number);
      const { x, y } = hexToPixel(q, r, EXPORT_SIZE);
      drawHex(x + cxOff, y + cyOff, EXPORT_SIZE - 0.5, biome);
    }
    for (const route of layer.routes) {
      drawRoute(route, EXPORT_SIZE, cxOff, cyOff);
    }

    const page = { name: layer.name, dataUrl: off.toDataURL(mimeType, 0.92), width, height };

    canvas = savedCanvas;
    ctx = savedCtx;
    scale = savedScale;
    return [page];
  }

  async function loadContent(id) {
    try {
      const item = await window.hxStorage.getById(id);
      if (!item) return;
      const nameEl = document.getElementById('hx-input-name');
      if (nameEl) nameEl.value = item.name || 'Untitled Hex Map';
      if (item.data?.routeColors) {
        routeTypeColors = { ...routeTypeColors, ...item.data.routeColors };
      }
      if (Array.isArray(item.data?.layers) && item.data.layers.length) {
        layers = item.data.layers.map(rec => {
          const l = createLayer(rec.name || 'Layer');
          if (rec.id) l.id = rec.id;
          arrayToGrid(l, rec.hexes || []);
          arrayToHexLinks(l, rec.hexLinks || rec.hexArticles || []);
          arrayToAttributes(l, rec.attributes || []);
          l.routes = rec.routes || [];
          return l;
        });
        currentLayerIdx = Math.min(Math.max(item.data.activeLayer ?? 0, 0), layers.length - 1);
        scheduleRender();
      } else if (item.data?.hexes) {
        // Legacy single-layer format (pre-layers) → migrate into a single "Realm" layer
        layers = [createLayer('Realm')];
        arrayToGrid(layers[0], item.data.hexes);
        arrayToHexLinks(layers[0], item.data.hexLinks || item.data.hexArticles || []);
        currentLayerIdx = 0;
        scheduleRender();
      }
      notifyLayersChanged();
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
    for (const cat of BIOME_CATEGORIES) {
      const heading = document.createElement('div');
      heading.className = 'hx-pal-group-label';
      heading.textContent = cat.label;
      el.appendChild(heading);

      for (const bk of Object.keys(cat.biomes)) {
        const b    = cat.biomes[bk];
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
  }

  function updatePalette() {
    document.querySelectorAll('#hx-palette .hx-pal-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.biome === currentBiome);
    });
  }

  // ── Route palette ─────────────────────────────────────────────────────────
  function buildRoutePalette() {
    const el = document.getElementById('hx-route-palette');
    if (!el) return;
    el.innerHTML = '';
    for (const rk of Object.keys(ROUTE_TYPES)) {
      const def  = ROUTE_TYPES[rk];
      const item = document.createElement('div');
      item.className = 'hx-pal-item' + (rk === currentRouteType && currentTool === 'route' ? ' selected' : '');
      item.dataset.route = rk;

      const swatch = document.createElement('input');
      swatch.type = 'color';
      swatch.className = 'hx-route-swatch';
      swatch.value = routeTypeColors[rk];
      swatch.title = 'Change color';
      swatch.addEventListener('click', e => e.stopPropagation());
      swatch.addEventListener('input', e => {
        routeTypeColors[rk] = e.target.value;
        if (rk === currentRouteType) updateSelectedInfo();
        scheduleRender();
      });

      const label = document.createElement('span');
      label.textContent = def.label;
      label.style.flex = '1';

      const lineSample = document.createElement('span');
      lineSample.className = 'hx-route-linesample';
      lineSample.style.borderTopColor = routeTypeColors[rk];
      if (def.dash && def.dash.length) lineSample.style.borderTopStyle = 'dashed';

      item.appendChild(swatch);
      item.appendChild(label);
      item.appendChild(lineSample);
      item.addEventListener('click', () => {
        currentRouteType = rk;
        currentTool = 'route';
        updateRoutePalette();
        updateSelectedInfo();
        updateToolbar();
      });
      el.appendChild(item);
    }
  }

  function updateRoutePalette() {
    document.querySelectorAll('#hx-route-palette .hx-pal-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.route === currentRouteType && currentTool === 'route');
    });
  }

  // ── Attribute palette — swatches pulled live from a library item type ─────
  // (e.g. every saved "faction") rather than a hardcoded list like biomes/routes.
  async function buildAttributePalette() {
    const el = document.getElementById('hx-attribute-palette');
    if (!el) return;
    const requestedKey = currentAttributeType;
    const def = ATTRIBUTE_TYPES[requestedKey];
    if (!def || !window.hxStorage) { el.innerHTML = ''; return; }

    const items = await window.hxStorage.getByType(def.sourceType);
    // currentAttributeType may have changed (or the tab closed) while this fetch was in flight
    if (currentAttributeType !== requestedKey) return;

    el.innerHTML = '';
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'hx-links-empty';
      empty.textContent = `No ${def.label.toLowerCase()}s saved yet. Create one, then come back to paint it on.`;
      el.appendChild(empty);
      return;
    }

    for (const it of items) {
      const value = { id: it.id, name: it.name, color: it.data?.color || '#888' };
      const item = document.createElement('div');
      item.className = 'hx-pal-item' + (currentAttrValue?.id === value.id ? ' selected' : '');
      item.dataset.attrId = value.id;
      const swatch = document.createElement('span');
      swatch.className = 'hx-pal-swatch';
      swatch.style.background = value.color;
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(value.name));
      item.addEventListener('click', () => {
        currentAttrValue   = value;
        currentPaintTarget = currentAttributeType;
        currentTool        = 'paint';
        updateAttributePalette();
        updateSelectedInfo();
        updateToolbar();
      });
      el.appendChild(item);
    }
  }

  function updateAttributePalette() {
    document.querySelectorAll('#hx-attribute-palette .hx-pal-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.attrId === currentAttrValue?.id);
    });
  }

  function updateSelectedInfo() {
    const swatch = document.getElementById('hx-selected-tile-swatch');
    const name   = document.getElementById('hx-selected-tile-name');
    if (currentTool === 'route') {
      const def = ROUTE_TYPES[currentRouteType];
      if (swatch) swatch.style.background = routeTypeColors[currentRouteType] ?? def?.color ?? '#111';
      if (name)   name.textContent = def?.label ?? currentRouteType;
      return;
    }
    if (currentPaintTarget !== 'biome') {
      if (swatch) swatch.style.background = currentAttrValue?.color ?? '#111';
      if (name)   name.textContent = currentAttrValue?.name ?? 'None selected';
      return;
    }
    if (swatch) swatch.style.background = BIOMES[currentBiome]?.color ?? '#111';
    if (name)   name.textContent = BIOMES[currentBiome]?.label ?? currentBiome;
  }

  function updateToolbar() {
    document.querySelectorAll('#hx-toolbar .hx-tool-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === currentTool);
    });
  }

  function updateStatus(q, r) {
    const hasTile = L().grid.has(key(q, r));
    const route   = findRouteAt(q, r);
    const links   = L().hexLinks.get(key(q, r)) || [];
    const posEl   = document.getElementById('hx-status-pos');
    const tileEl  = document.getElementById('hx-status-tile');
    const artEl   = document.getElementById('hx-status-article');
    const toolEl  = document.getElementById('hx-status-tool');
    if (posEl)  posEl.textContent  = `(${q}, ${r})`;
    if (tileEl) {
      const tileLabel  = hasTile ? (BIOMES[L().grid.get(key(q, r))]?.label ?? '') : '';
      const routeLabel = route ? (ROUTE_TYPES[route.type]?.label ?? '') : '';
      tileEl.textContent = [tileLabel, routeLabel].filter(Boolean).join(' · ');
    }
    if (artEl)  artEl.textContent  = links.length ? `· ${links.map(l => l.name).join(', ')}` : '';
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
    if (!types.includes('application/hexmap-link')) return;
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
    const raw = e.dataTransfer.getData('application/hexmap-link');
    const target = dragTargetHex;
    dragTargetHex = null;
    hoverHex = null;
    if (!raw || !target) { scheduleRender(); return; }
    try {
      const { id, name, type } = JSON.parse(raw);
      const k = key(target.q, target.r);
      const existing = L().hexLinks.get(k) || [];
      // Dropping the same item onto a hex it's already linked to is a no-op, not a duplicate
      if (!existing.some(l => l.id === id && l.type === type)) {
        L().hexLinks.set(k, [...existing, { id, name, type }]);
      }
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

  // Did this click land on one of a hex's link badges? Checked against the
  // same positions drawLinkIndicators used, so hit area always matches what's drawn.
  function badgeHitAt(e, q, r) {
    const links = L().hexLinks.get(key(q, r)) || [];
    if (!links.length) return null;
    const size  = HEX_SIZE * scale;
    const cxOff = canvas.width  / 2 + ox;
    const cyOff = canvas.height / 2 + oy;
    const { x, y } = hexToPixel(q, r, size);
    const rect = canvas.getBoundingClientRect();
    const sx = rect.left + x + cxOff, sy = rect.top + y + cyOff;
    const positions = linkBadgePositions(sx, sy, size, links.length);
    for (let i = 0; i < positions.length; i++) {
      const { x: ix, y: iy, r: br } = positions[i];
      const dx = e.clientX - ix, dy = e.clientY - iy;
      if (dx * dx + dy * dy <= br * br) return links[i];
    }
    return null;
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

    // Clicking a link badge opens that content instead of painting —
    // checked before any tool so it works no matter which tool is active.
    const hitLink = badgeHitAt(e, q, r);
    if (hitLink) {
      window.__hexmapOnLinkClick?.(hitLink, q, r);
      return;
    }

    if (currentTool === 'fill') {
      floodFill(q, r);
      scheduleRender();
      return;
    }

    if (currentTool === 'radius') {
      applyRadiusTool(q, r);
      updateStatus(q, r);
      return;
    }

    if (currentTool === 'route') {
      routeEraseCandidate = findRouteAt(q, r);
      isDrawingRoute = true;
      routeDidDrag = false;
      pendingRoutePoints = [{ q, r }];
      updateStatus(q, r);
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
    // Notify React when the hovered hex changes (for the link hover card)
    if (!hoverHex || hoverHex.q !== q || hoverHex.r !== r) {
      window.__hexmapOnHexHover?.(q, r, L().hexLinks.get(key(q, r)) || null);
    }
    hoverHex = { q, r };
    updateStatus(q, r);
    if (isPainting) applyTool(q, r);
    if (isDrawingRoute) {
      const last = pendingRoutePoints[pendingRoutePoints.length - 1];
      if (!last || last.q !== q || last.r !== r) {
        pendingRoutePoints.push({ q, r });
        routeDidDrag = true;
      }
    }
    scheduleRender();
  }

  function onMouseUp() {
    if (isPainting && pendingSnapshot) {
      pushUndo(pendingSnapshot);
      pendingSnapshot = null;
    }
    if (isDrawingRoute) {
      if (!routeDidDrag && routeEraseCandidate) {
        const before = snapshot();
        L().routes = L().routes.filter(r => r.id !== routeEraseCandidate.id);
        pushUndo(before);
      } else if (pendingRoutePoints.length >= 2) {
        const before = snapshot();
        L().routes.push({ id: crypto.randomUUID(), type: currentRouteType, points: pendingRoutePoints });
        pushUndo(before);
      }
      isDrawingRoute = false;
      pendingRoutePoints = [];
      routeEraseCandidate = null;
      if (hoverHex) updateStatus(hoverHex.q, hoverHex.r);
      scheduleRender();
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
    const toolMap = { b: 'paint', e: 'erase', f: 'fill', p: 'pick', h: 'pan', r: 'route' };
    const tool = toolMap[e.key.toLowerCase()];
    if (tool) { currentTool = tool; updateToolbar(); updateSelectedInfo(); updateCursor(); return; }
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
  async function init() {
    canvas = document.getElementById('hx-canvas');
    wrap   = document.getElementById('hx-canvas-wrap');
    if (!canvas || !wrap) return;
    ctx = canvas.getContext('2d');

    const incomingId = window.__hexmapContentId || null;
    currentContentId = incomingId;
    if (incomingId) {
      await loadContent(incomingId);
    } else {
      // Brand-new map: seed the active (Realm) layer with the 7-hex flower
      [[0,0],[1,0],[-1,0],[0,-1],[-1,-1],[0,1],[-1,1]]
        .forEach(([q, r]) => L().grid.set(key(q, r), 'plains'));
    }
    notifyLayersChanged();

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
      btn.addEventListener('click', () => { currentTool = btn.dataset.tool; updateToolbar(); updateSelectedInfo(); });
    });

    document.getElementById('btn-hx-undo')?.addEventListener('click', undo);
    document.getElementById('btn-hx-redo')?.addEventListener('click', redo);
    document.getElementById('btn-hx-save')?.addEventListener('click', saveToLibrary);
    document.getElementById('btn-hx-export')?.addEventListener('click', exportJson);
    document.getElementById('btn-hx-fit')?.addEventListener('click', fitView);

    buildPalette();
    buildRoutePalette();
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
      return hexLinksToArray(L());
    };

    window.hexmapGetHexScreenPos = function (q, r) {
      const size = HEX_SIZE * scale;
      const cxOff = canvas.width  / 2 + ox;
      const cyOff = canvas.height / 2 + oy;
      const { x, y } = hexToPixel(q, r, size);
      const rect = canvas.getBoundingClientRect();
      return { x: rect.left + x + cxOff, y: rect.top + y + cyOff, size };
    };

    // Removes a single link from a hex (a hex may carry several).
    window.hexmapUnlinkLink = function (q, r, id, type) {
      const k = key(q, r);
      const remaining = (L().hexLinks.get(k) || []).filter(l => !(l.id === id && l.type === type));
      if (remaining.length) L().hexLinks.set(k, remaining);
      else L().hexLinks.delete(k);
      scheduleRender();
      window.__hexmapOnLinksChanged?.();
    };

    window.hexmapExportPdfPages = buildExportPages;
    window.hexmapExportImages   = buildExportPages;

    window.hexmapSetRadiusValue = function (n) {
      radiusToolValue = Math.max(0, Math.min(30, Number(n) || 0));
    };
    window.hexmapSetRadiusMode = function (mode) {
      radiusToolMode = mode === 'fill' ? 'fill' : 'ring';
    };
    window.hexmapShowToast = showToast;

    // ── Layers ────────────────────────────────────────────────────────────
    window.hexmapGetLayers = function () {
      return layers.map(l => ({ id: l.id, name: l.name }));
    };

    window.hexmapGetActiveLayerIndex = function () {
      return currentLayerIdx;
    };

    window.hexmapSwitchLayer   = switchLayer;
    window.hexmapAddLayer      = addLayer;
    window.hexmapDeleteLayer   = deleteLayer;
    window.hexmapRenameLayer   = renameLayer;
    window.hexmapReorderLayer  = reorderLayer;
    window.hexmapToggleGhostAbove = toggleGhostAbove;
    window.hexmapToggleGhostBelow = toggleGhostBelow;

    // Entering attribute mode points paint/erase/fill/radius/pick at the given
    // attribute layer instead of the biome grid, and shows its overlay tint.
    window.hexmapEnterAttributeMode = function (attrKey) {
      if (!ATTRIBUTE_TYPES[attrKey]) return;
      currentAttributeType = attrKey;
      currentPaintTarget   = attrKey;
      currentAttrValue     = null;
      buildAttributePalette();
      updateSelectedInfo();
      scheduleRender();
    };

    window.hexmapExitAttributeMode = function () {
      currentPaintTarget = 'biome';
      scheduleRender();
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
      window.__hexmapOnLayersChanged = null;
      window.__hexmapOnGhostChanged = null;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      window.hexmapLoadHexes         = null;
      window.hexmapStartPickCenter   = null;
      window.hexmapCancelPickCenter  = null;
      window.hexmapGetAllLinks       = null;
      window.hexmapUnlinkLink        = null;
      window.__hexmapOnLinkClick     = null;
      window.hexmapGetHexScreenPos   = null;
      window.hexmapExportPdfPages    = null;
      window.hexmapExportImages      = null;
      window.hexmapSetRadiusValue    = null;
      window.hexmapSetRadiusMode     = null;
      window.hexmapShowToast         = null;
      window.hexmapGetLayers         = null;
      window.hexmapGetActiveLayerIndex = null;
      window.hexmapSwitchLayer       = null;
      window.hexmapAddLayer          = null;
      window.hexmapDeleteLayer       = null;
      window.hexmapRenameLayer       = null;
      window.hexmapReorderLayer      = null;
      window.hexmapToggleGhostAbove  = null;
      window.hexmapToggleGhostBelow  = null;
      window.hexmapEnterAttributeMode = null;
      window.hexmapExitAttributeMode  = null;
      window.__hexmapOnHexHover      = null;
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
