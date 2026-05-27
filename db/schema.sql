-- =============================================================
--  Hexcrawl Database Schema
--  Three pillars: CONTENT  |  GEOGRAPHY  |  ACTIVE PLAY
--  Engine: SQLite (AUTOINCREMENT / INTEGER PRIMARY KEY)
-- =============================================================

BEGIN TRANSACTION;

-- =============================================================
--  SUPPORTING TABLES
--  Shared lookup data referenced across pillars
-- =============================================================

-- Biome types (seeded from db/hex_types.json)
CREATE TABLE IF NOT EXISTS hex_types (
  key           TEXT    PRIMARY KEY,
  label         TEXT    NOT NULL,
  color         TEXT    NOT NULL,
  traversable   INTEGER NOT NULL DEFAULT 1,
  requires_boat INTEGER NOT NULL DEFAULT 0
);

-- Random encounter events per biome (seeded from db/hex_types.json)
CREATE TABLE IF NOT EXISTS hex_type_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  hex_type_key TEXT    NOT NULL REFERENCES hex_types(key) ON DELETE CASCADE,
  event_type   TEXT    NOT NULL CHECK(event_type IN ('creature','item','aberration')),
  title        TEXT    NOT NULL,
  description  TEXT    NOT NULL
);

-- Settlement tier configuration
CREATE TABLE IF NOT EXISTS settlement_tiers (
  tier              INTEGER PRIMARY KEY,
  title             TEXT    NOT NULL,
  grid_width        INTEGER NOT NULL,
  grid_height       INTEGER NOT NULL,
  pop_min           INTEGER NOT NULL,
  pop_max           INTEGER NOT NULL,
  has_walls         INTEGER NOT NULL DEFAULT 0,
  has_marketplace   INTEGER NOT NULL DEFAULT 0
);

-- Buildings allowed at each settlement tier
CREATE TABLE IF NOT EXISTS settlement_tier_buildings (
  tier          INTEGER NOT NULL REFERENCES settlement_tiers(tier) ON DELETE CASCADE,
  building      TEXT    NOT NULL,
  PRIMARY KEY (tier, building)
);

-- Name-generation syllables (prefixes / suffixes)
CREATE TABLE IF NOT EXISTS name_parts (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  part_type TEXT    NOT NULL CHECK(part_type IN ('prefix','suffix')),
  category  TEXT,   -- e.g. 'village', 'port', 'ruins' — null means universal
  value     TEXT    NOT NULL
);


-- =============================================================
--  PILLAR 1: CONTENT
--  Reusable templates and catalog data.
--  Nothing here represents a live game object.
-- =============================================================

-- Factions that exist in the world
CREATE TABLE IF NOT EXISTS faction_template (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL UNIQUE,
  description TEXT,
  alignment   TEXT    -- e.g. 'lawful good', 'chaotic evil'
);

-- Creature stat-block templates
CREATE TABLE IF NOT EXISTS creature_template (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  name                TEXT    NOT NULL,
  challenge_rating    REAL    NOT NULL DEFAULT 0,
  max_hp              INTEGER NOT NULL DEFAULT 1,
  ac                  INTEGER NOT NULL DEFAULT 10,
  str                 INTEGER NOT NULL DEFAULT 10,
  dex                 INTEGER NOT NULL DEFAULT 10,
  con                 INTEGER NOT NULL DEFAULT 10,
  intelligence        INTEGER NOT NULL DEFAULT 10,
  wis                 INTEGER NOT NULL DEFAULT 10,
  cha                 INTEGER NOT NULL DEFAULT 10,
  speed               INTEGER NOT NULL DEFAULT 30,
  description         TEXT,
  faction_template_id INTEGER REFERENCES faction_template(id)
);

-- Which biomes a creature template can spawn in
CREATE TABLE IF NOT EXISTS creature_template_biome (
  creature_template_id INTEGER NOT NULL REFERENCES creature_template(id) ON DELETE CASCADE,
  biome_key            TEXT    NOT NULL REFERENCES hex_types(key)         ON DELETE CASCADE,
  spawn_weight         INTEGER NOT NULL DEFAULT 1,  -- relative likelihood
  PRIMARY KEY (creature_template_id, biome_key)
);

-- Item templates (weapons, armor, potions, legendaries, etc.)
CREATE TABLE IF NOT EXISTS item_template (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  item_type   TEXT    NOT NULL CHECK(item_type IN ('weapon','armor','potion','tool','misc','legendary')),
  description TEXT,
  damage_dice TEXT,         -- e.g. '2d6'
  damage_type TEXT,         -- e.g. 'slashing'
  ac_bonus    INTEGER       DEFAULT 0,
  value_gp    REAL          DEFAULT 0,
  weight_lbs  REAL          DEFAULT 0,
  rarity      TEXT    NOT NULL DEFAULT 'common'
                      CHECK(rarity IN ('common','uncommon','rare','very_rare','legendary'))
);

-- Spell templates
CREATE TABLE IF NOT EXISTS spell_template (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL UNIQUE,
  spell_level INTEGER NOT NULL DEFAULT 0,
  school      TEXT,         -- e.g. 'evocation', 'necromancy'
  description TEXT,
  range_ft    INTEGER,
  duration    TEXT,
  components  TEXT,         -- e.g. 'V, S, M'
  damage_dice TEXT,
  damage_type TEXT
);

-- Settlement templates (reusable authored settlement definitions)
CREATE TABLE IF NOT EXISTS settlement_template (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  name                 TEXT    NOT NULL UNIQUE,
  description          TEXT,
  tier                 INTEGER REFERENCES settlement_tiers(tier),
  starting_population  INTEGER,
  layout_style         TEXT
);

-- Guaranteed buildings for a settlement template
CREATE TABLE IF NOT EXISTS settlement_template_building (
  settlement_template_id INTEGER NOT NULL REFERENCES settlement_template(id) ON DELETE CASCADE,
  building_name          TEXT    NOT NULL,
  PRIMARY KEY (settlement_template_id, building_name)
);

-- Tags / traits for a settlement template
CREATE TABLE IF NOT EXISTS settlement_template_tag (
  settlement_template_id INTEGER NOT NULL REFERENCES settlement_template(id) ON DELETE CASCADE,
  tag                    TEXT    NOT NULL,
  PRIMARY KEY (settlement_template_id, tag)
);


-- =============================================================
--  PILLAR 2: GEOGRAPHY
--  Placed / instantiated world structure.
--  Hierarchy: world → hex_map → hex → settlement_map
--                                   └→ battle_map
-- =============================================================

CREATE TABLE IF NOT EXISTS world (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  description TEXT
);

-- A hex map belongs to a world (one world can have multiple maps)
CREATE TABLE IF NOT EXISTS hex_map (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  world_id INTEGER NOT NULL REFERENCES world(id) ON DELETE CASCADE,
  name     TEXT    NOT NULL,
  width    INTEGER NOT NULL,
  height   INTEGER NOT NULL,
  seed     TEXT    -- stored so the same map can be regenerated
);

-- Individual hexes on a hex map
CREATE TABLE IF NOT EXISTS hex (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  hex_map_id INTEGER NOT NULL REFERENCES hex_map(id) ON DELETE CASCADE,
  q          INTEGER NOT NULL,
  r          INTEGER NOT NULL,
  biome_key  TEXT    NOT NULL REFERENCES hex_types(key),
  elevation  INTEGER NOT NULL DEFAULT 50,   -- 0–100
  moisture   INTEGER NOT NULL DEFAULT 50,   -- 0–100
  UNIQUE (hex_map_id, q, r)
);

-- A settlement placed on a specific hex
CREATE TABLE IF NOT EXISTS settlement_map (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  hex_id                 INTEGER NOT NULL REFERENCES hex(id) ON DELETE CASCADE,
  settlement_template_id INTEGER          REFERENCES settlement_template(id),
  faction_template_id    INTEGER          REFERENCES faction_template(id),
  name                   TEXT    NOT NULL  -- instance name (may differ from template)
);

-- Named routes between settlements (3 per connection, computed at map generation)
CREATE TABLE IF NOT EXISTS route (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  from_settlement_id INTEGER REFERENCES settlement_map(id),
  to_settlement_id   INTEGER REFERENCES settlement_map(id),
  route_index        INTEGER NOT NULL DEFAULT 0,  -- 0, 1, 2 (the three choices)
  name               TEXT    NOT NULL,             -- e.g. "The High Pass"
  theme              TEXT    NOT NULL,             -- 'highland' | 'wetlands' | 'open'
  hex_count          INTEGER NOT NULL DEFAULT 0,
  encounter_bonus    REAL    NOT NULL DEFAULT 0.0  -- added to base biome encounter_chance
);

-- Ordered hexes that make up a route
CREATE TABLE IF NOT EXISTS route_hex (
  route_id    INTEGER NOT NULL REFERENCES route(id) ON DELETE CASCADE,
  hex_id      INTEGER NOT NULL REFERENCES hex(id)   ON DELETE CASCADE,
  step_order  INTEGER NOT NULL,
  PRIMARY KEY (route_id, step_order)
);

-- A battle map placed on a hex; optionally inside a settlement
CREATE TABLE IF NOT EXISTS battle_map (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  hex_id            INTEGER NOT NULL REFERENCES hex(id) ON DELETE CASCADE,
  settlement_map_id INTEGER          REFERENCES settlement_map(id),
  name              TEXT    NOT NULL,
  map_type          TEXT    NOT NULL DEFAULT 'wilderness'
                    CHECK(map_type IN (
                      'wilderness','dungeon','cave','crypt','prison',
                      'inn','tower','ship','airship','other'
                    )),
  width             INTEGER NOT NULL DEFAULT 20,
  height            INTEGER NOT NULL DEFAULT 20
);


-- =============================================================
--  PILLAR 3: ACTIVE PLAY
--  Runtime game state: sessions, parties, characters, creatures.
-- =============================================================

-- A game session ties active play to a specific world
CREATE TABLE IF NOT EXISTS game_session (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  world_id   INTEGER NOT NULL REFERENCES world(id),
  name       TEXT    NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'active'
                     CHECK(status IN ('active','archived')),
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- A party belongs to a session and has a current location on the hex map
CREATE TABLE IF NOT EXISTS party (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  game_session_id INTEGER NOT NULL REFERENCES game_session(id) ON DELETE CASCADE,
  name            TEXT    NOT NULL,
  current_hex_id  INTEGER          REFERENCES hex(id),
  step_count      INTEGER NOT NULL DEFAULT 0
);

-- Player characters belong to a party
CREATE TABLE IF NOT EXISTS player_character (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  party_id     INTEGER NOT NULL REFERENCES party(id) ON DELETE CASCADE,
  name         TEXT    NOT NULL,
  player_class TEXT    NOT NULL
                       CHECK(player_class IN ('warrior','ranger','mage','rogue','cleric','jester')),
  level        INTEGER NOT NULL DEFAULT 1,
  gold         REAL    NOT NULL DEFAULT 0,
  -- Combat stats
  hp           INTEGER NOT NULL DEFAULT 10,
  max_hp       INTEGER NOT NULL DEFAULT 10,
  ac           INTEGER NOT NULL DEFAULT 10,
  -- Ability scores
  str          INTEGER NOT NULL DEFAULT 10,
  dex          INTEGER NOT NULL DEFAULT 10,
  con          INTEGER NOT NULL DEFAULT 10,
  intelligence INTEGER NOT NULL DEFAULT 10,
  wis          INTEGER NOT NULL DEFAULT 10,
  cha          INTEGER NOT NULL DEFAULT 10,
  status       TEXT    NOT NULL DEFAULT 'active'
                       CHECK(status IN ('active','unconscious','dead'))
);

-- Creatures spawned into the live world
-- hex_id      → wandering on the hex map
-- battle_map_id → placed inside a specific battle map
-- (both can be set: a creature engaged in combat on a hex)
CREATE TABLE IF NOT EXISTS spawned_creature (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  creature_template_id INTEGER NOT NULL REFERENCES creature_template(id),
  faction_template_id  INTEGER          REFERENCES faction_template(id),  -- overrides template default
  hex_id               INTEGER          REFERENCES hex(id),
  battle_map_id        INTEGER          REFERENCES battle_map(id),
  -- Runtime stats (snapshot from template at spawn, modified during play)
  current_hp           INTEGER NOT NULL DEFAULT 1,
  status               TEXT    NOT NULL DEFAULT 'alive'
                                CHECK(status IN ('alive','dead','fleeing','subdued'))
);

COMMIT;
