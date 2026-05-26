# game-hexcrawl

Here's how I'd break it into 6 phases, each playable/testable on its own:

Phase 1 — Server skeleton
Express + Socket.io running, basic HTML shell loads in browser, players can connect and see connection count. Nothing game-y yet, just the plumbing working.

Phase 2 — Map generation
Procedural hex map with biomes (simplex noise). Rendered on a canvas in the browser — pan around, see the colored hexes with biome labels. No players yet.

Phase 3 — Lobby & character select
Up to 4 players join with a name, pick an adventurer class (Warrior, Ranger, Mage, Rogue). Party appears on a starting hex. Player list visible on screen.

Phase 4 — Voting & movement
Players vote on a direction (6 neighbors shown). Once all connected players vote, the party advances. Map updates to show new position.

Phase 5 — Events
Each new hex triggers a random event based on the biome — creature encounter, item found, magical aberration. Event shown in a log panel.

Phase 6 — Polish
Hex details on click (biome name, elevation), event history scroll, rivers rendered on map, better styling.