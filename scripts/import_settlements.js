// scripts/import_settlements.js
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '..', 'db', 'settlements.db');
const jsonPath = path.resolve(__dirname, '..', 'db', 'settlement_catalog.json');

const db = new Database(dbPath);
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Simple helpers
const run = (sql, params=[]) => db.prepare(sql).run(...params);
const insert = (sql, params=[]) => db.prepare(sql).run(...params);

db.transaction(() => {
  // Insert tiers
  const tierSettings = data.procedural_blueprints?.tier_settings || {};
  for (const [k, v] of Object.entries(tierSettings)) {
    const tier = Number(k);
    run(
      `INSERT OR REPLACE INTO settlement_tiers (tier, title, grid_width, grid_height, pop_min, pop_max, has_walls, has_marketplace)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [tier, v.title, v.grid_size.width, v.grid_size.height, v.population_range.min, v.population_range.max, v.has_walls ? 1 : 0, v.has_marketplace ? 1 : 0]
    );

    // allowed buildings
    const allowed = v.allowed_buildings || [];
    for (const b of allowed) {
      run(`INSERT OR IGNORE INTO settlement_tier_allowed_buildings (tier, building) VALUES (?, ?)`, [tier, b]);
    }
  }

  // name parts
  const names = data.procedural_blueprints?.name_generation || {};
  (names.prefixes || []).forEach(p => run(`INSERT OR IGNORE INTO name_parts (part_type, value) VALUES ('prefix', ?)`, [p]));
  (names.suffixes || []).forEach(s => run(`INSERT OR IGNORE INTO name_parts (part_type, value) VALUES ('suffix', ?)`, [s]));

  // static settlements
  for (const s of data.static_settlements || []) {
    run(`INSERT OR REPLACE INTO settlements (id, name, description, tier_level, starting_population, layout_style)
         VALUES (?, ?, ?, ?, ?, ?)`, [s.id, s.name, s.description || null, s.tier_level || null, s.starting_population || null, s.layout_style || null]);

    for (const b of s.guaranteed_buildings || []) {
      run(`INSERT OR IGNORE INTO settlement_buildings (settlement_id, building_name) VALUES (?, ?)`, [s.id, b]);
    }
    for (const t of s.unique_tags || []) {
      run(`INSERT OR IGNORE INTO settlement_tags (settlement_id, tag) VALUES (?, ?)`, [s.id, t]);
    }
  }

  // store full procedural metadata as JSON if wanted
  run(`INSERT OR REPLACE INTO procedural_metadata (key, json_value) VALUES ('procedural_blueprints', ?)`, [JSON.stringify(data.procedural_blueprints || {})]);
})();

console.log('Import complete.');
db.close();
