const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const db = new Database(path.join(__dirname, '../db/settlements.db'));
const hexTypes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/hex_types.json'), 'utf8'));

db.exec(`
  CREATE TABLE IF NOT EXISTS hex_types (
    key           TEXT PRIMARY KEY,
    label         TEXT NOT NULL,
    color         TEXT NOT NULL,
    traversable   INTEGER NOT NULL DEFAULT 1,
    requires_boat INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS hex_type_events (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    hex_type_key TEXT NOT NULL REFERENCES hex_types(key) ON DELETE CASCADE,
    event_type   TEXT NOT NULL CHECK(event_type IN ('creature','item','aberration')),
    title        TEXT NOT NULL,
    description  TEXT NOT NULL
  );
`);

const insertType = db.prepare(`
  INSERT OR REPLACE INTO hex_types (key, label, color, traversable, requires_boat)
  VALUES (@key, @label, @color, @traversable, @requires_boat)
`);
const deleteEvents = db.prepare(`DELETE FROM hex_type_events WHERE hex_type_key = ?`);
const insertEvent = db.prepare(`
  INSERT INTO hex_type_events (hex_type_key, event_type, title, description)
  VALUES (@hex_type_key, @event_type, @title, @description)
`);

const seed = db.transaction((types) => {
  for (const ht of types) {
    insertType.run({
      key: ht.key,
      label: ht.label,
      color: ht.color,
      traversable: ht.traversable ? 1 : 0,
      requires_boat: ht.requires_boat ? 1 : 0,
    });
    deleteEvents.run(ht.key);
    for (const ev of ht.events) {
      insertEvent.run({
        hex_type_key: ht.key,
        event_type: ev.type,
        title: ev.title,
        description: ev.desc,
      });
    }
  }
});

seed(hexTypes);
console.log(`Seeded ${hexTypes.length} hex types and ${hexTypes.reduce((n, ht) => n + ht.events.length, 0)} events.`);
db.close();
