# game-hexcrawl

## Ideas
- players can't enter water hexes unless they have a boat
- hexes are procedurally generated. As the party advances, they see hexes as they go rather than seeing the entire world already
- intro as server loads: "The King is cursed with an immortal wound. His realm has become a wasteland. Find the cure; save the kingdom!"
- party starts on a village hex, or a town hex, or castle/city hex.
- each class starts with different amounts of gold
- walking over a hex might take 1 whole day to cross, or party might be able to cross hex in 2 to 3 days

- MAKE A VERSION: where streamer chats can vote and decide on a direction / certain decisions for the streamer, or they can join the streamer's server as villager NPCs. Something like that.

## Battlemap
- 

## Hexmap
- need to add roads between settlements

### Random Event Generation
- maybe we pull monsters, spells, and items from dnd api??
- create regions that have higher tier monsters??
- event: the rogue/ranger found a boar! Hunt it??
- event: the party has found ancient ruins! Explore?

### Settlement Types
- Starter Town. This has everything the party could want and/or need. They can frequently return to this city. Serves as a central hub. They can store inventory, buy a house, etc. This is where the Wounded King stays.
    - if the party's reputation is ruined here, then they will be recruited by the bad guys
- Village: population 300, 20 guards??, little gold, low level priest
- town: pop 2,000
- castle town: pop 7,000
- city: pop 10,000
    - can buy ariships and ships
- village/town/city of outlaws

- odd wizard's tower: not sure if friendly or evil
- airship merchant floating city
- floating island
- floating castle

## Narrative

### Quest Structure
- PCs can get quests from settlements. These quests take the party to nearby hexes where they'll find hints as to a nearby boss's whereabouts, learn about ancient loot/lore, and discover dungeons to delve into.

### Faction Reputation System
- Arland's Order. Main faction that needs help healing the king. If PCs make this faction mad, they will get a bounty and can join rebel forces / evil bad guys.
- Black Blaggard Pirates.
- Thieves Guild.
- Cult of the Dragon Prince.
- jackal 

### Create Bosses
- Immortal Emperor
- Nilab the Dragon Prince
- Belladonna the Vampire Queen
- Hemlock the Green Dragon
- Nahk the Gnoll Warlord

- bosses have their own goals, resources (like 20 skeletons, 50 undead), and timeframe to achieve their goals

### Player Class Abilities
Rogue
- when in a settlement, the rogue can steal gold, but risks getting imprisoned / getting a bounty on the party

Warrior
- excellent at fighting

Mage
- does damage, but is weak

Healer (Cleric)
- can heal

Jester
- throw banana peels and cream pies at enemies. Help party get out of jail??

### PC Stats
- hp, ac, dex, str, con, int, cha, wis

### Items
- Maps. Maps will reveal a location / region / certain grid of hexes far away, a dungeon location, incomplete parts of a battlemap
- legendary artifacts with tradeoffs like in Stonetop TTRPG

#### Shop Items
- Maps can be bought that reveal a certain amount of hexes and/or a region. Ex: map reveals 10 hexes around current settlement for 500GP. Map reveals nearby point of interest or 150GP. Etc. Map reveals battlemap rooms/location, but we don't know which POI they're tied to.

## Phases of build

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