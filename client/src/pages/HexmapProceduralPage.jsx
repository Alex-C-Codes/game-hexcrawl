import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ---- Biome definitions — matches db/seeds/geography_pillar/hex_types.json ----
const BIOME_CATEGORIES = [
  {
    id: 'classic', label: 'Classic',
    biomes: {
      ocean:    { label: 'Ocean',    color: '#1a4a6e', weight: 5 },
      coast:    { label: 'Coast',    color: '#3a8abf', weight: 8 },
      plains:   { label: 'Plains',   color: '#7eb05a', weight: 30 },
      grassland: { label: 'Grassland', color: '#9bc25c', weight: 20 },
      farm:     { label: 'Farm',     color: '#b8a852', weight: 0 },
      forest:   { label: 'Forest',   color: '#2d6a4f', weight: 22 },
      jungle:   { label: 'Jungle',   color: '#1f5c38', weight: 10 },
      mushroomforest: { label: 'Mushroom Forest', color: '#3a6a4a', weight: 0 },
      worldtree:      { label: 'World Tree',      color: '#4a5a3a', weight: 0 },
      hills:    { label: 'Hills',    color: '#7a9c52', weight: 15 },
      highland: { label: 'Highland', color: '#8a9e72', weight: 10 },
      mountain: { label: 'Mountain', color: '#7a7a8a', weight: 5 },
      tundra:   { label: 'Tundra',   color: '#a8c4d4', weight: 4 },
      desert:   { label: 'Desert',   color: '#c9a84c', weight: 3 },
      swamp:    { label: 'Swamp',    color: '#4a6741', weight: 2 },
      beacon:   { label: 'Beacon',   color: '#b23a2e', weight: 0 },
      fort:     { label: 'Fort',     color: '#6a6a78', weight: 0 },
      tower:        { label: 'Tower',        color: '#8a8078', weight: 0 },
      ancientruins: { label: 'Ruins',        color: '#7a8070', weight: 0 },
      temple:       { label: 'Temple',       color: '#d4c896', weight: 0 },
    },
  },
  {
    id: 'undead', label: 'Undead',
    biomes: {
      graveyard:      { label: 'Graveyard',       color: '#5a5a52', weight: 0 },
      hauntedforest:  { label: 'Haunted Forest',  color: '#2a3a30', weight: 0 },
      necropolis:     { label: 'Necropolis',      color: '#8a8a92', weight: 0 },
      bonefields:     { label: 'Bone Fields',     color: '#c9c0a0', weight: 0 },
      cursedswamp:    { label: 'Cursed Swamp',    color: '#3a4a42', weight: 0 },
      crypt:          { label: 'Crypt',           color: '#2a2a30', weight: 0 },
      witheredwastes: { label: 'Withered Wastes', color: '#6a6050', weight: 0 },
    },
  },
  {
    id: 'sky', label: 'Sky Islands',
    biomes: {
      void:     { label: 'Void',           color: '#0d0d1f', weight: 0 },
      cloudsea: { label: 'Cloud Sea',       color: '#c7d2df', weight: 0 },
      skyreef:  { label: 'Sky Reef',        color: '#5c8a6f', weight: 0 },
      storm:    { label: 'Storm Front',     color: '#453a5e', weight: 0 },
      crystal:  { label: 'Crystal Spire',   color: '#8f6fd1', weight: 0 },
      ashfall:  { label: 'Ashfall Isle',    color: '#4a3d38', weight: 0 },
      ruins:    { label: 'Ruined Isle',     color: '#a99872', weight: 0 },
      skydock:  { label: 'Skydock',         color: '#c98a4c', weight: 0 },
      airship:        { label: 'Airship',        color: '#7a8ba0', weight: 0 },
      flyingfortress: { label: 'Flying Fortress', color: '#5a5a68', weight: 0 },
      crackedland:    { label: 'Cracked Land',   color: '#8a7860', weight: 0 },
    },
  },
  {
    id: 'wasteland', label: 'Wasteland',
    biomes: {
      wastes:      { label: 'Irradiated Wastes', color: '#8a8a4a', weight: 0 },
      ruinfield:   { label: 'Ruined City',       color: '#5a5650', weight: 0 },
      craterzone:  { label: 'Blast Crater',      color: '#3a4a2e', weight: 0 },
      deadforest:  { label: 'Dead Forest',       color: '#554d40', weight: 0 },
      toxicswamp:  { label: 'Toxic Sludge',      color: '#5a6b3a', weight: 0 },
      dunefield:   { label: 'Ashen Dunes',       color: '#a89f88', weight: 0 },
      junkyard:    { label: 'Scrapyard',         color: '#7a5236', weight: 0 },
      bunker:      { label: 'Bunker Outpost',    color: '#4a5240', weight: 0 },
    },
  },
  {
    id: 'steampunk', label: 'Steampunk',
    biomes: {
      factoryland:  { label: 'Factory District', color: '#4a4038', weight: 0 },
      clockwork:    { label: 'Clockwork Hills',  color: '#8a7040', weight: 0 },
      railway:      { label: 'Rail Yards',       color: '#6a5a4a', weight: 0 },
      aetherfield:  { label: 'Aether Fields',    color: '#5a7a9c', weight: 0 },
      smogmarsh:    { label: 'Smog Marsh',       color: '#5a5a3a', weight: 0 },
      slagmountain: { label: 'Slag Peaks',       color: '#6a4a42', weight: 0 },
      airdock:      { label: 'Airship Yard',     color: '#b5793f', weight: 0 },
      quarry:       { label: 'Coal Quarry',      color: '#3a352f', weight: 0 },
    },
  },
  {
    id: 'underdark', label: 'Underdark',
    biomes: {
      cavern:           { label: 'Cavern',           color: '#3a3038', weight: 0 },
      chasm:            { label: 'Chasm',             color: '#0a0a12', weight: 0 },
      fungalforest:     { label: 'Fungal Forest',     color: '#4a6b5c', weight: 0 },
      undergroundlake:  { label: 'Underground Lake',  color: '#1a2a3a', weight: 0 },
      crystalcave:      { label: 'Crystal Cave',      color: '#3a6a6e', weight: 0 },
      lavatube:         { label: 'Lava Tube',         color: '#4a2a20', weight: 0 },
      deeproad:         { label: 'Deep Road',         color: '#6a6258', weight: 0 },
      drowoutpost:      { label: 'Drow Outpost',      color: '#3a2a4a', weight: 0 },
    },
  },
];

const BIOMES = Object.assign({}, ...BIOME_CATEGORIES.map(c => c.biomes));
const DEFAULT_WEIGHTS = Object.fromEntries(Object.entries(BIOMES).map(([k, b]) => [k, b.weight]));
const HEX_SIZE = 24;

// ---- Hex math ----
function hexToPixel(q, r, size) {
  return {
    x: size * Math.sqrt(3) * (q + 0.5 * (r & 1)),
    y: size * 1.5 * r,
  };
}

function traceHex(ctx, cx, cy, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i - Math.PI / 6;
    ctx.lineTo(cx + size * Math.cos(a), cy + size * Math.sin(a));
  }
  ctx.closePath();
}

// ---- Biome art — matches worldmap.js ----
function artMountain(ctx) {
  ctx.fillStyle = 'rgba(210,210,230,0.5)';
  ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(4,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(190,190,215,0.82)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(13,6); ctx.lineTo(-7,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(8,-5); ctx.lineTo(-2,-5); ctx.closePath(); ctx.fill();
}
function artTundra(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath(); ctx.arc(-5,7,7,Math.PI,0,true); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(5,8,6,Math.PI,0,true); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(150,190,210,0.55)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-8,-6); ctx.lineTo(-2,-2); ctx.lineTo(-6,2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(4,-8); ctx.lineTo(8,-3); ctx.lineTo(3,-1); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-1,-11); ctx.lineTo(-1,-7); ctx.moveTo(-3,-9); ctx.lineTo(1,-9); ctx.stroke();
}
function artHighland(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.17)';
  ctx.beginPath(); ctx.arc(0,9,13,Math.PI,0,true); ctx.closePath(); ctx.fill();
}
function artForest(ctx) {
  ctx.fillStyle = 'rgba(10,60,20,0.78)';
  ctx.beginPath(); ctx.moveTo(-6,-9); ctx.lineTo(1,5); ctx.lineTo(-13,5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(25,105,40,0.88)';
  ctx.beginPath(); ctx.moveTo(5,-9); ctx.lineTo(13,5); ctx.lineTo(-3,5); ctx.closePath(); ctx.fill();
}
function artJungle(ctx) {
  ctx.fillStyle = 'rgba(5,45,15,0.85)';
  ctx.beginPath(); ctx.moveTo(-8,-8); ctx.lineTo(0,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(15,80,30,0.85)';
  ctx.beginPath(); ctx.moveTo(2,-10); ctx.lineTo(12,6); ctx.lineTo(-4,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(40,140,55,0.9)';
  ctx.beginPath(); ctx.moveTo(-2,-6); ctx.lineTo(5,5); ctx.lineTo(-9,5); ctx.closePath(); ctx.fill();
}
function artMushroomforest(ctx) {
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
function artWorldtree(ctx) {
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
function artHills(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath(); ctx.arc(-4,8,8,Math.PI,0,true); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(5,9,6,Math.PI,0,true); ctx.closePath(); ctx.fill();
}
function artPlains(ctx) {
  ctx.strokeStyle = 'rgba(0,60,0,0.55)'; ctx.lineWidth = 1.5;
  [[-5,0],[0,1],[5,0]].forEach(([xo,yo]) => {
    ctx.beginPath(); ctx.moveTo(xo,7+yo); ctx.quadraticCurveTo(xo-2,2+yo,xo,-6+yo); ctx.stroke();
  });
}
function artGrassland(ctx) {
  ctx.strokeStyle = 'rgba(30,90,10,0.5)'; ctx.lineWidth = 1.3;
  [[-8,2],[-4,-1],[0,2],[4,-1],[8,2]].forEach(([xo,yo]) => {
    ctx.beginPath(); ctx.moveTo(xo,8+yo); ctx.quadraticCurveTo(xo-1,3+yo,xo+1,-5+yo); ctx.stroke();
  });
}
function artFarm(ctx) {
  ctx.strokeStyle = 'rgba(120,90,30,0.55)'; ctx.lineWidth = 1.3;
  [-8,-3,2,7].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,9); ctx.lineTo(x+3,-9); ctx.stroke();
  });
  ctx.strokeStyle = 'rgba(90,65,20,0.7)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(10,0); ctx.stroke();
}
function artDesert(ctx) {
  ctx.strokeStyle = 'rgba(160,118,20,0.6)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-10,-3); ctx.quadraticCurveTo(-5,-9,0,-3); ctx.quadraticCurveTo(5,3,10,-3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-9,4); ctx.quadraticCurveTo(-2,-2,4,4); ctx.stroke();
}
function artSwamp(ctx) {
  ctx.strokeStyle = 'rgba(0,45,0,0.72)'; ctx.lineWidth = 1.5;
  [-6,0,6].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x,-4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x,0); ctx.quadraticCurveTo(x+6,-5,x+5,-1); ctx.stroke();
  });
}
function artBeacon(ctx) {
  ctx.strokeStyle = 'rgba(70,50,35,0.9)'; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(0, 9); ctx.lineTo(0, -11); ctx.stroke();
  ctx.fillStyle = '#f5d060';
  ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(9, -7); ctx.lineTo(0, -3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,220,140,0.9)';
  ctx.beginPath(); ctx.arc(0, -11, 2.2, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,220,140,0.35)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(0, -11, 5, 0, Math.PI * 2); ctx.stroke();
}
function artFort(ctx) {
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
  ctx.strokeStyle = '#b0b0b8'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#b0b0b8';
  ctx.fillRect(-3, -1, 6, 5);
  ctx.fillRect(-3.5, -3, 2, 2.5);
  ctx.fillRect(1.5, -3, 2, 2.5);
}
function artTower(ctx) {
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
  ctx.strokeStyle = '#c8c0b0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#c8c0b0';
  ctx.beginPath(); ctx.moveTo(-2.5,5); ctx.lineTo(-2,-3); ctx.lineTo(2,-3); ctx.lineTo(2.5,5); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-3,-3); ctx.lineTo(0,-8); ctx.lineTo(3,-3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(-0.7,0,1.4,2);
}
function artAncientruins(ctx) {
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
function artTemple(ctx) {
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
function artOcean(ctx) {
  ctx.strokeStyle = 'rgba(130,195,255,0.32)'; ctx.lineWidth = 1.5;
  [-6,0,6].forEach(y => {
    ctx.beginPath(); ctx.moveTo(-9,y); ctx.quadraticCurveTo(-4,y-4,0,y); ctx.quadraticCurveTo(4,y+4,9,y); ctx.stroke();
  });
}
function artCoast(ctx) {
  ctx.strokeStyle = 'rgba(255,255,255,0.38)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-9,2); ctx.quadraticCurveTo(-4,-5,0,2); ctx.quadraticCurveTo(4,9,9,2); ctx.stroke();
}

// ---- Sky island art ----
function artVoid(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  [[-7,-6],[4,-8],[8,3],[-3,7],[0,-2],[-9,2]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill();
  });
  ctx.strokeStyle = 'rgba(120,110,200,0.35)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(0, 0, 9, 0.4, 3.6); ctx.stroke();
}
function artCloudsea(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  [[-7,2,6],[-1,-2,7],[6,2,6],[1,5,5]].forEach(([x, y, rad]) => {
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
  });
}
function artSkyreef(ctx) {
  ctx.fillStyle = 'rgba(90,70,55,0.85)';
  ctx.beginPath(); ctx.moveTo(-8,-2); ctx.lineTo(-2,-9); ctx.lineTo(6,-4); ctx.lineTo(8,4); ctx.lineTo(-6,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(90,150,90,0.7)';
  ctx.beginPath(); ctx.arc(-2,-6,3.5,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0,9); ctx.lineTo(0,13); ctx.stroke();
}
function artStorm(ctx) {
  ctx.fillStyle = 'rgba(20,15,35,0.6)';
  ctx.beginPath(); ctx.arc(-4,-4,7,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(5,-2,6,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#f5d060';
  ctx.beginPath();
  ctx.moveTo(1,-3); ctx.lineTo(-3,4); ctx.lineTo(0,4); ctx.lineTo(-2,10); ctx.lineTo(4,2); ctx.lineTo(1,2); ctx.closePath();
  ctx.fill();
}
function artCrystal(ctx) {
  ctx.fillStyle = 'rgba(160,120,220,0.55)';
  ctx.beginPath(); ctx.moveTo(-2,-11); ctx.lineTo(2,-2); ctx.lineTo(-6,-2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(120,200,220,0.6)';
  ctx.beginPath(); ctx.moveTo(5,-8); ctx.lineTo(8,2); ctx.lineTo(1,1); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(180,140,230,0.7)';
  ctx.beginPath(); ctx.moveTo(-8,-4); ctx.lineTo(-4,6); ctx.lineTo(-11,4); ctx.closePath(); ctx.fill();
}
function artAshfall(ctx) {
  ctx.fillStyle = 'rgba(40,32,30,0.85)';
  ctx.beginPath(); ctx.moveTo(0,-9); ctx.lineTo(9,6); ctx.lineTo(-9,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,110,40,0.85)';
  ctx.beginPath(); ctx.arc(0,-8,2.2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(90,85,85,0.5)';
  ctx.beginPath(); ctx.arc(3,-11,3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(-2,-13,2.4,0,Math.PI*2); ctx.fill();
}
function artRuins(ctx) {
  ctx.fillStyle = 'rgba(200,190,165,0.75)';
  ctx.fillRect(-8,-2,4,9);
  ctx.fillRect(-1,-8,4,15);
  ctx.fillRect(5,1,4,6);
  ctx.fillStyle = 'rgba(140,130,110,0.6)';
  ctx.fillRect(-9,7,20,2);
}
function artSkydock(ctx) {
  ctx.strokeStyle = 'rgba(120,90,50,0.8)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-9,4); ctx.lineTo(9,4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-6,4); ctx.lineTo(-6,8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6,4); ctx.lineTo(6,8); ctx.stroke();
  ctx.strokeStyle = 'rgba(220,200,160,0.9)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(0,-9); ctx.stroke();
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath(); ctx.moveTo(0,-9); ctx.lineTo(7,-6); ctx.lineTo(0,-3); ctx.closePath(); ctx.fill();
}
function artAirship(ctx) {
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
function artFlyingfortress(ctx) {
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
function artCrackedland(ctx) {
  ctx.strokeStyle = 'rgba(40,30,20,0.75)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(-2,-1); ctx.lineTo(-5,5); ctx.lineTo(0,9); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6,-9); ctx.lineTo(1,-2); ctx.lineTo(7,3); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,140,60,0.5)'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(-2,-1); ctx.lineTo(1,-2); ctx.stroke();
  ctx.fillStyle = 'rgba(90,75,55,0.7)';
  ctx.beginPath(); ctx.moveTo(2,10); ctx.lineTo(6,11); ctx.lineTo(4,14); ctx.closePath(); ctx.fill();
}

// ---- Wasteland art ----
function artWastes(ctx) {
  ctx.strokeStyle = 'rgba(40,35,10,0.6)'; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.moveTo(-9,-7); ctx.lineTo(-2,-1); ctx.lineTo(-6,6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(2,-8); ctx.lineTo(-2,-1); ctx.lineTo(6,3); ctx.lineTo(3,9); ctx.stroke();
  ctx.fillStyle = 'rgba(180,200,40,0.55)';
  ctx.beginPath(); ctx.arc(-2,-1,2,0,Math.PI*2); ctx.fill();
}
function artRuinfield(ctx) {
  ctx.fillStyle = 'rgba(40,38,35,0.8)';
  ctx.beginPath(); ctx.moveTo(-9,7); ctx.lineTo(-9,-6); ctx.lineTo(-6,-9); ctx.lineTo(-4,-3); ctx.lineTo(-2,7); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0,7); ctx.lineTo(0,-2); ctx.lineTo(4,-8); ctx.lineTo(6,1); ctx.lineTo(8,7); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,140,40,0.4)';
  ctx.beginPath(); ctx.arc(-6,-4,1.2,0,Math.PI*2); ctx.fill();
}
function artCraterzone(ctx) {
  ctx.strokeStyle = 'rgba(60,60,50,0.6)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(0,2,10,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,2,6,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle = 'rgba(140,220,90,0.55)';
  ctx.beginPath(); ctx.arc(0,2,3,0,Math.PI*2); ctx.fill();
}
function artDeadforest(ctx) {
  ctx.strokeStyle = 'rgba(50,42,32,0.8)'; ctx.lineWidth = 1.4;
  [-6,1,7].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,9); ctx.lineTo(x-1,-6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x-1,-2); ctx.lineTo(x-5,-6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x-1,-4); ctx.lineTo(x+4,-8); ctx.stroke();
  });
}
function artToxicswamp(ctx) {
  ctx.fillStyle = 'rgba(120,160,40,0.5)';
  ctx.beginPath(); ctx.ellipse(0,6,10,3,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(160,210,60,0.65)';
  [[-4,0,1.6],[3,-3,1.2],[-1,-6,1]].forEach(([x,y,rad]) => {
    ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fill();
  });
}
function artDunefield(ctx) {
  ctx.strokeStyle = 'rgba(120,112,95,0.55)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(-10,-2); ctx.quadraticCurveTo(-5,-8,0,-2); ctx.quadraticCurveTo(5,4,10,-2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-9,5); ctx.quadraticCurveTo(-2,-1,5,5); ctx.stroke();
}
function artJunkyard(ctx) {
  ctx.fillStyle = 'rgba(120,70,40,0.7)';
  ctx.beginPath(); ctx.moveTo(-8,7); ctx.lineTo(-6,-3); ctx.lineTo(-1,0); ctx.lineTo(-3,7); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(90,90,95,0.7)';
  ctx.beginPath(); ctx.moveTo(0,7); ctx.lineTo(3,-6); ctx.lineTo(8,-1); ctx.lineTo(6,7); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(50,45,40,0.6)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-8,-1); ctx.lineTo(2,-4); ctx.stroke();
}
function artBunker(ctx) {
  ctx.fillStyle = 'rgba(60,64,55,0.85)';
  ctx.beginPath(); ctx.arc(0,4,9,Math.PI,0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(20,18,15,0.85)';
  ctx.beginPath(); ctx.arc(0,4,2.4,Math.PI,0); ctx.fill();
  ctx.strokeStyle = 'rgba(150,150,140,0.8)'; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.moveTo(6,-5); ctx.lineTo(6,-11); ctx.stroke();
  ctx.fillStyle = 'rgba(220,60,50,0.8)';
  ctx.beginPath(); ctx.arc(6,-11,1.3,0,Math.PI*2); ctx.fill();
}

// ---- Steampunk / arcanepunk / dieselpunk art ----
function artFactoryland(ctx) {
  ctx.fillStyle = 'rgba(80,50,40,0.85)';
  ctx.fillRect(-8,-2,3,11);
  ctx.fillRect(-1,-6,3,15);
  ctx.fillRect(5,0,3,9);
  ctx.fillStyle = 'rgba(150,150,150,0.5)';
  ctx.beginPath(); ctx.arc(0,-9,3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(2,-13,2.4,0,Math.PI*2); ctx.fill();
}
function artClockwork(ctx) {
  ctx.strokeStyle = 'rgba(200,160,70,0.8)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0,0,6,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle = 'rgba(200,160,70,0.8)';
  for (let i = 0; i < 8; i++) {
    ctx.save(); ctx.rotate(Math.PI / 4 * i); ctx.fillRect(-1,-9,2,3); ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0,0,2,0,Math.PI*2); ctx.fill();
}
function artRailway(ctx) {
  ctx.strokeStyle = 'rgba(90,80,70,0.8)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(-8,8); ctx.lineTo(-3,-9); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8,8); ctx.lineTo(3,-9); ctx.stroke();
  ctx.strokeStyle = 'rgba(60,50,40,0.7)'; ctx.lineWidth = 1.2;
  [[-6,6,6],[-5,0,5],[-4,-5,4]].forEach(([x1,y,x2]) => {
    ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke();
  });
}
function artAetherfield(ctx) {
  ctx.strokeStyle = 'rgba(140,120,255,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-7,3); ctx.quadraticCurveTo(0,-8,7,2); ctx.stroke();
  ctx.fillStyle = 'rgba(120,200,255,0.8)';
  [[-7,3],[0,-6],[7,2],[-2,6]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x,y,1.6,0,Math.PI*2); ctx.fill();
  });
}
function artSmogmarsh(ctx) {
  ctx.fillStyle = 'rgba(90,100,60,0.5)';
  ctx.beginPath(); ctx.ellipse(0,6,10,3,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(70,65,60,0.55)';
  ctx.beginPath(); ctx.arc(-3,-3,6,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4,-1,5,0,Math.PI*2); ctx.fill();
}
function artSlagmountain(ctx) {
  ctx.fillStyle = 'rgba(70,45,40,0.8)';
  ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(4,6); ctx.lineTo(-14,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(60,40,38,0.85)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(13,6); ctx.lineTo(-7,6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,120,40,0.85)';
  ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(6,-4); ctx.lineTo(0,-4); ctx.closePath(); ctx.fill();
}
function artAirdock(ctx) {
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
function artQuarry(ctx) {
  ctx.strokeStyle = 'rgba(20,18,16,0.7)'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(0,2,10,Math.PI*0.15,Math.PI*0.85); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,3,6,Math.PI*0.1,Math.PI*0.9); ctx.stroke();
  ctx.fillStyle = 'rgba(10,10,10,0.6)';
  ctx.beginPath(); ctx.ellipse(0,6,4,2,0,0,Math.PI*2); ctx.fill();
}

// ---- Underdark art ----
function artCavern(ctx) {
  ctx.fillStyle = 'rgba(70,64,70,0.75)';
  [[-8,-12],[0,-13],[7,-11]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x+2,y); ctx.lineTo(x,y+8); ctx.closePath(); ctx.fill();
  });
  ctx.fillStyle = 'rgba(50,45,50,0.75)';
  [[-5,12],[4,13]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x+2,y); ctx.lineTo(x,y-8); ctx.closePath(); ctx.fill();
  });
}
function artChasm(ctx) {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.beginPath();
  ctx.moveTo(-9,-6); ctx.lineTo(-2,-2); ctx.lineTo(-6,3); ctx.lineTo(0,8);
  ctx.lineTo(6,2); ctx.lineTo(2,-4); ctx.lineTo(9,-7); ctx.lineTo(3,0);
  ctx.closePath(); ctx.fill();
}
function artFungalforest(ctx) {
  ctx.strokeStyle = 'rgba(200,180,220,0.6)'; ctx.lineWidth = 1.4;
  [[-6,8],[6,8],[0,9]].forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-6); ctx.stroke(); });
  ctx.fillStyle = 'rgba(140,90,160,0.75)';
  ctx.beginPath(); ctx.ellipse(-6,1,5,3,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(6,1,5,3,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(180,140,200,0.8)';
  ctx.beginPath(); ctx.ellipse(0,2,6,3.5,0,0,Math.PI*2); ctx.fill();
}
function artUndergroundlake(ctx) {
  ctx.strokeStyle = 'rgba(80,130,190,0.35)'; ctx.lineWidth = 1.3;
  [-5,1,7].forEach(y => {
    ctx.beginPath(); ctx.moveTo(-9,y); ctx.quadraticCurveTo(-4,y-3,0,y); ctx.quadraticCurveTo(4,y+3,9,y); ctx.stroke();
  });
}
function artCrystalcave(ctx) {
  ctx.fillStyle = 'rgba(80,200,210,0.55)';
  ctx.beginPath(); ctx.moveTo(-2,-10); ctx.lineTo(2,-1); ctx.lineTo(-6,-1); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(60,170,190,0.6)';
  ctx.beginPath(); ctx.moveTo(5,-7); ctx.lineTo(8,3); ctx.lineTo(1,2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(100,220,220,0.7)';
  ctx.beginPath(); ctx.moveTo(-8,-3); ctx.lineTo(-4,7); ctx.lineTo(-11,5); ctx.closePath(); ctx.fill();
}
function artLavatube(ctx) {
  ctx.fillStyle = 'rgba(30,20,18,0.8)';
  ctx.beginPath(); ctx.arc(0,10,11,Math.PI,0,true); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,90,30,0.85)'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(-7,4); ctx.lineTo(-2,7); ctx.lineTo(2,3); ctx.lineTo(7,6); ctx.stroke();
}
function artDeeproad(ctx) {
  ctx.strokeStyle = 'rgba(150,144,130,0.6)'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(-9,7); ctx.lineTo(9,-7); ctx.stroke();
  ctx.strokeStyle = 'rgba(100,94,84,0.5)'; ctx.lineWidth = 1.2;
  [[-4,4],[1,-1],[6,-6]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.moveTo(x-2,y+2); ctx.lineTo(x+2,y-2); ctx.stroke();
  });
}
function artDrowoutpost(ctx) {
  ctx.beginPath(); ctx.arc(0,0,8,0,Math.PI*2);
  ctx.fillStyle = 'rgba(20,10,30,0.85)'; ctx.fill();
  ctx.strokeStyle = '#a070d0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#a070d0';
  ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(2,1); ctx.lineTo(-2,1); ctx.closePath(); ctx.fill();
  ctx.fillRect(-1,1,2,4);
}

// ---- Undead art ----
function artGraveyard(ctx) {
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
function artHauntedforest(ctx) {
  ctx.strokeStyle = 'rgba(30,25,25,0.85)'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(0,9); ctx.quadraticCurveTo(-3,0,-1,-8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-1,-3); ctx.lineTo(-7,-7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-1,-5); ctx.lineTo(4,-9); ctx.stroke();
  ctx.fillStyle = 'rgba(140,220,140,0.55)';
  ctx.beginPath(); ctx.arc(5,-2,2.2,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(140,220,140,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(5,-2,5,0,Math.PI*2); ctx.stroke();
}
function artNecropolis(ctx) {
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.78)'; ctx.fill();
  ctx.strokeStyle = '#9098a0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#9098a0';
  ctx.beginPath(); ctx.moveTo(-3,1); ctx.lineTo(0,-4); ctx.lineTo(3,1); ctx.closePath(); ctx.fill();
  ctx.fillRect(-3,1,6,3.5);
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.beginPath(); ctx.arc(0,-1,1,0,Math.PI*2); ctx.fill();
}
function artBonefields(ctx) {
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
function artCursedswamp(ctx) {
  ctx.strokeStyle = 'rgba(20,30,20,0.75)'; ctx.lineWidth = 1.4;
  [-6,0,6].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x,-2); ctx.stroke();
  });
  ctx.fillStyle = 'rgba(140,100,200,0.4)';
  ctx.beginPath(); ctx.arc(2,-5,3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(-4,-7,2,0,Math.PI*2); ctx.fill();
}
function artCrypt(ctx) {
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
function artWitheredwastes(ctx) {
  ctx.strokeStyle = 'rgba(60,55,40,0.6)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(-8,4); ctx.lineTo(-2,0); ctx.lineTo(-6,-6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(3,6); ctx.lineTo(7,1); ctx.lineTo(4,-4); ctx.stroke();
  ctx.strokeStyle = 'rgba(40,38,30,0.8)'; ctx.lineWidth = 1;
  [-4,2,7].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x,8); ctx.lineTo(x-1,4); ctx.moveTo(x,8); ctx.lineTo(x+1,4); ctx.stroke();
  });
}

function drawBiomeArt(ctx, cx, cy, size, biome) {
  ctx.save();
  traceHex(ctx, cx, cy, size);
  ctx.clip();
  ctx.translate(cx, cy);
  ctx.scale(size / 24, size / 24);
  switch (biome) {
    case 'mountain': artMountain(ctx); break;
    case 'tundra':   artTundra(ctx);   break;
    case 'highland': artHighland(ctx); break;
    case 'forest':   artForest(ctx);   break;
    case 'jungle':   artJungle(ctx);   break;
    case 'mushroomforest': artMushroomforest(ctx); break;
    case 'worldtree':      artWorldtree(ctx);      break;
    case 'hills':    artHills(ctx);    break;
    case 'plains':   artPlains(ctx);   break;
    case 'grassland': artGrassland(ctx); break;
    case 'farm':     artFarm(ctx);      break;
    case 'desert':   artDesert(ctx);   break;
    case 'swamp':    artSwamp(ctx);    break;
    case 'beacon':   artBeacon(ctx);   break;
    case 'fort':     artFort(ctx);     break;
    case 'tower':        artTower(ctx);        break;
    case 'ancientruins': artAncientruins(ctx); break;
    case 'temple':       artTemple(ctx);       break;
    case 'ocean':    artOcean(ctx);    break;
    case 'coast':    artCoast(ctx);    break;
    case 'void':     artVoid(ctx);     break;
    case 'cloudsea': artCloudsea(ctx); break;
    case 'skyreef':  artSkyreef(ctx);  break;
    case 'storm':    artStorm(ctx);    break;
    case 'crystal':  artCrystal(ctx);  break;
    case 'ashfall':  artAshfall(ctx);  break;
    case 'ruins':    artRuins(ctx);    break;
    case 'skydock':  artSkydock(ctx);  break;
    case 'airship':        artAirship(ctx);        break;
    case 'flyingfortress': artFlyingfortress(ctx); break;
    case 'crackedland':    artCrackedland(ctx);    break;
    case 'wastes':       artWastes(ctx);       break;
    case 'ruinfield':    artRuinfield(ctx);    break;
    case 'craterzone':   artCraterzone(ctx);   break;
    case 'deadforest':   artDeadforest(ctx);   break;
    case 'toxicswamp':   artToxicswamp(ctx);   break;
    case 'dunefield':    artDunefield(ctx);    break;
    case 'junkyard':     artJunkyard(ctx);     break;
    case 'bunker':       artBunker(ctx);       break;
    case 'factoryland':  artFactoryland(ctx);  break;
    case 'clockwork':    artClockwork(ctx);    break;
    case 'railway':      artRailway(ctx);      break;
    case 'aetherfield':  artAetherfield(ctx);  break;
    case 'smogmarsh':    artSmogmarsh(ctx);    break;
    case 'slagmountain': artSlagmountain(ctx); break;
    case 'airdock':      artAirdock(ctx);      break;
    case 'quarry':       artQuarry(ctx);       break;
    case 'cavern':          artCavern(ctx);          break;
    case 'chasm':           artChasm(ctx);           break;
    case 'fungalforest':    artFungalforest(ctx);    break;
    case 'undergroundlake': artUndergroundlake(ctx); break;
    case 'crystalcave':     artCrystalcave(ctx);     break;
    case 'lavatube':        artLavatube(ctx);        break;
    case 'deeproad':        artDeeproad(ctx);        break;
    case 'drowoutpost':     artDrowoutpost(ctx);     break;
    case 'graveyard':      artGraveyard(ctx);      break;
    case 'hauntedforest':  artHauntedforest(ctx);  break;
    case 'necropolis':     artNecropolis(ctx);     break;
    case 'bonefields':     artBonefields(ctx);     break;
    case 'cursedswamp':    artCursedswamp(ctx);    break;
    case 'crypt':          artCrypt(ctx);          break;
    case 'witheredwastes': artWitheredwastes(ctx); break;
  }
  ctx.restore();
}

// ---- Seeded RNG ----
function makeRng(seed) {
  let s = ((Math.abs(seed | 0)) % 2147483647) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ---- Map generation (Voronoi biome seeding) ----
function generateMap(radius, seed, weights) {
  const rng = makeRng(seed);

  // All hexes in radius (axial cube coords)
  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      hexes.push({ aq: q, ar: r });
    }
  }

  // Build weighted biome pool for seed placement
  const activeBiomes = Object.entries(weights).filter(([, w]) => w > 0);
  const totalW = activeBiomes.reduce((s, [, w]) => s + w, 0);

  // Number of Voronoi seeds scales with map size
  const numSeeds = Math.max(8, Math.floor(hexes.length / 6));
  const seeds = Array.from({ length: numSeeds }, () => {
    let roll = rng() * totalW, acc = 0, biome = activeBiomes[0][0];
    for (const [b, w] of activeBiomes) { acc += w; if (roll <= acc) { biome = b; break; } }
    const h = hexes[Math.floor(rng() * hexes.length)];
    return { aq: h.aq, ar: h.ar, biome };
  });

  // Assign each hex to nearest seed (axial distance)
  return hexes.map(({ aq, ar }) => {
    let bestBiome = seeds[0].biome, bestDist = Infinity;
    for (const s of seeds) {
      const dq = aq - s.aq, dr = ar - s.ar;
      const d = (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
      if (d < bestDist) { bestDist = d; bestBiome = s.biome; }
    }
    // Convert axial → odd-r offset
    return { q: aq + (ar - (ar & 1)) / 2, r: ar, biome: bestBiome };
  });
}

// ---- Shared label style ----
const label = (text) => (
  <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4540', marginBottom: 6 }}>
    {text}
  </div>
);

// ---- Component ----
export default function HexmapProceduralPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const viewRef   = useRef({ ox: 0, oy: 0, scale: 1 });
  const hexesRef  = useRef([]);
  const panRef    = useRef(null);
  const rafRef    = useRef(null);

  const [radius,  setRadius]  = useState(8);
  const [seed,    setSeed]    = useState(() => Math.floor(Math.random() * 99999) + 1);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [hexes,   setHexes]   = useState([]);
  const [mapName, setMapName] = useState('Untitled World');
  const [toast,   setToast]   = useState('');

  // ---- Rendering ----
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { ox, oy, scale } = viewRef.current;
    const size = HEX_SIZE * scale;
    const cx = canvas.width / 2 + ox;
    const cy = canvas.height / 2 + oy;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#080706';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const { q, r, biome } of hexesRef.current) {
      const { x, y } = hexToPixel(q, r, size);
      const sx = x + cx, sy = y + cy;
      if (sx + size * 2 < 0 || sx - size * 2 > canvas.width) continue;
      if (sy + size * 2 < 0 || sy - size * 2 > canvas.height) continue;
      const hexSize = size - 0.5;
      traceHex(ctx, sx, sy, hexSize);
      ctx.fillStyle = BIOMES[biome]?.color ?? BIOMES.ocean.color;
      ctx.fill();
      drawBiomeArt(ctx, sx, sy, hexSize, biome);
      traceHex(ctx, sx, sy, hexSize);
      ctx.strokeStyle = 'rgba(0,0,0,0.28)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }, []);

  const scheduleRender = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => { rafRef.current = null; render(); });
  }, [render]);

  // Sync hexes to ref and re-render
  useEffect(() => { hexesRef.current = hexes; scheduleRender(); }, [hexes, scheduleRender]);

  // ---- Canvas resize ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    const ro = new ResizeObserver(() => {
      canvas.width  = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
      scheduleRender();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [scheduleRender]);

  // ---- Canvas events ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - canvas.width / 2;
      const my = e.clientY - rect.top  - canvas.height / 2;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const ns = Math.max(0.3, Math.min(6, viewRef.current.scale * factor));
      viewRef.current = {
        ox: mx - (mx - viewRef.current.ox) * (ns / viewRef.current.scale),
        oy: my - (my - viewRef.current.oy) * (ns / viewRef.current.scale),
        scale: ns,
      };
      scheduleRender();
    };

    const onDown = (e) => {
      if (e.button === 1 || e.button === 2)
        panRef.current = { x: e.clientX, y: e.clientY, ox: viewRef.current.ox, oy: viewRef.current.oy };
    };
    const onMove = (e) => {
      if (!panRef.current) return;
      viewRef.current.ox = panRef.current.ox + (e.clientX - panRef.current.x);
      viewRef.current.oy = panRef.current.oy + (e.clientY - panRef.current.y);
      scheduleRender();
    };
    const onUp   = ()  => { panRef.current = null; };
    const onMenu = (e) => e.preventDefault();

    canvas.addEventListener('wheel',       onWheel, { passive: false });
    canvas.addEventListener('mousedown',   onDown);
    canvas.addEventListener('mousemove',   onMove);
    canvas.addEventListener('mouseup',     onUp);
    canvas.addEventListener('contextmenu', onMenu);
    return () => {
      canvas.removeEventListener('wheel',       onWheel);
      canvas.removeEventListener('mousedown',   onDown);
      canvas.removeEventListener('mousemove',   onMove);
      canvas.removeEventListener('mouseup',     onUp);
      canvas.removeEventListener('contextmenu', onMenu);
    };
  }, [scheduleRender]);

  // ---- Actions ----
  function generate() {
    viewRef.current = { ox: 0, oy: 0, scale: 1 };
    setHexes(generateMap(radius, seed, weights));
  }

  function randomSeed() {
    const s = Math.floor(Math.random() * 99999) + 1;
    setSeed(s);
    viewRef.current = { ox: 0, oy: 0, scale: 1 };
    setHexes(generateMap(radius, s, weights));
  }

  function saveToLibrary() {
    if (!hexes.length) { setToast('Generate a map first.'); setTimeout(() => setToast(''), 2000); return; }
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    all.unshift({ id, type: 'hexmap', name: mapName, data: { radius, hexes }, createdAt: now, updatedAt: now });
    localStorage.setItem('hx_content', JSON.stringify(all));
    setToast('Saved to library!');
    setTimeout(() => setToast(''), 2000);
  }

  function editManually() {
    if (!hexes.length) return;
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('hx_content') || '[]');
    all.unshift({ id, type: 'hexmap', name: mapName, data: { radius, hexes }, createdAt: now, updatedAt: now });
    localStorage.setItem('hx_content', JSON.stringify(all));
    navigate(`/create/hexmap/manual?id=${id}`);
  }

  // ---- Styles ----
  const S = {
    page:    { display: 'flex', height: 'calc(100vh - 44px)', background: '#111', fontFamily: 'Georgia, serif', overflow: 'hidden' },
    sidebar: { width: 220, flexShrink: 0, background: '#0d0d0d', borderRight: '1px solid #1a1a1a', overflowY: 'auto', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 18 },
    section: { display: 'flex', flexDirection: 'column' },
    input:   { background: '#181510', border: '1px solid #2a2520', borderRadius: 4, color: '#e0d8c8', fontFamily: 'Georgia, serif', fontSize: '0.85rem', padding: '5px 9px', outline: 'none', width: '100%' },
    slider:  { width: '100%', accentColor: '#c9a84c' },
    btn:     { background: '#181510', border: '1px solid #2a2520', borderRadius: 4, color: '#a09060', fontFamily: 'Georgia, serif', fontSize: '0.76rem', padding: '6px 0', cursor: 'pointer', width: '100%', letterSpacing: '0.05em' },
    btnPrimary: { background: '#1e1a0c', border: '1px solid #c9a84c', borderRadius: 4, color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: '0.76rem', padding: '7px 0', cursor: 'pointer', width: '100%', letterSpacing: '0.05em' },
    canvas:  { flex: 1, position: 'relative', overflow: 'hidden' },
  };

  return (
    <div style={S.page}>
      {/* Sidebar */}
      <div style={S.sidebar}>
        <div style={{ color: '#c9a84c', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', paddingBottom: 10, borderBottom: '1px solid #1a1a1a' }}>
          Procedural
        </div>

        {/* Map name */}
        <div style={S.section}>
          {label('Map Name')}
          <input style={S.input} value={mapName} onChange={e => setMapName(e.target.value)} />
        </div>

        {/* Radius */}
        <div style={S.section}>
          {label(`Radius — ${radius}`)}
          <input type="range" min={3} max={16} value={radius} onChange={e => setRadius(+e.target.value)} style={S.slider} />
        </div>

        {/* Seed */}
        <div style={S.section}>
          {label('Seed')}
          <input style={S.input} type="number" value={seed} onChange={e => setSeed(+e.target.value || 1)} />
        </div>

        {/* Generate buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button style={S.btnPrimary} onClick={generate}>Generate</button>
          <button style={S.btn} onClick={randomSeed}>Random Seed</button>
        </div>

        {/* Biome weights */}
        <div style={S.section}>
          {label('Biome Weights')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {BIOME_CATEGORIES.map(cat => (
              <div key={cat.id}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5040', marginBottom: 6 }}>
                  {cat.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(cat.biomes).map(([key, { label: name, color }]) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#7a7060' }}>
                          <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block', flexShrink: 0 }} />
                          {name}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#4a4540' }}>{weights[key]}</span>
                      </div>
                      <input type="range" min={0} max={60} value={weights[key]}
                        onChange={e => setWeights(w => ({ ...w, [key]: +e.target.value }))}
                        style={S.slider} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save / Edit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto', paddingTop: 12 }}>
          <button style={S.btnPrimary} onClick={saveToLibrary} disabled={!hexes.length}>Save to Library</button>
          <button style={S.btn}        onClick={editManually}  disabled={!hexes.length}>Edit Manually →</button>
        </div>

        {toast && (
          <div style={{ color: '#c9a84c', fontSize: '0.72rem', textAlign: 'center', padding: '6px 0' }}>{toast}</div>
        )}
      </div>

      {/* Canvas */}
      <div style={S.canvas}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab' }} />
        {!hexes.length && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a2a2a', fontSize: '0.85rem', fontFamily: 'Georgia, serif', pointerEvents: 'none' }}>
            Set parameters and click Generate
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 10, right: 14, color: '#252520', fontSize: '0.65rem', fontFamily: 'Georgia, serif' }}>
          Right-click drag to pan · Scroll to zoom
        </div>
      </div>
    </div>
  );
}
