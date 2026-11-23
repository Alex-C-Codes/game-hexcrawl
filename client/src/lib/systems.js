// Game-system templates for creature & item entries.
//
// An entry's data is system-agnostic:
//   { system, description, stats: {key: value}, sections: {key: [{id,name,text}]},
//     custom: [{id,label,value}], notes }
// A template only decides which `stats` fields and `sections` the editor shows
// and how the preview reads them. Switching systems never deletes data — keys
// the new template doesn't use are just hidden — so a template can be added
// later without migrating anything.
//
// Field kinds: text | number | select | checkbox | abilities | textarea
// `span` is out of a 6-column grid (default 2).

// ── 5.5e (2024) reference tables ─────────────────────────────────────────────
export const ABILITIES = [
  ['str', 'STR'], ['dex', 'DEX'], ['con', 'CON'],
  ['int', 'INT'], ['wis', 'WIS'], ['cha', 'CHA'],
];

const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const CREATURE_TYPES = [
  'Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey',
  'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead',
];
const ITEM_CATEGORIES = [
  'Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Staff', 'Wand', 'Weapon', 'Wondrous Item',
  'Adventuring Gear', 'Tool', 'Ammunition', 'Mount or Vehicle', 'Trade Good',
];
const RARITIES = ['', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];

// [CR, XP]
const CR_TABLE = [
  ['0', 10], ['1/8', 25], ['1/4', 50], ['1/2', 100],
  ['1', 200], ['2', 450], ['3', 700], ['4', 1100], ['5', 1800], ['6', 2300],
  ['7', 2900], ['8', 3900], ['9', 5000], ['10', 5900], ['11', 7200], ['12', 8400],
  ['13', 10000], ['14', 11500], ['15', 13000], ['16', 15000], ['17', 18000],
  ['18', 20000], ['19', 22000], ['20', 25000], ['21', 33000], ['22', 41000],
  ['23', 50000], ['24', 62000], ['25', 75000], ['26', 90000], ['27', 105000],
  ['28', 120000], ['29', 135000], ['30', 155000],
];

export function crInfo(cr) {
  const row = CR_TABLE.find(r => r[0] === cr);
  if (!row) return null;
  const n = cr.includes('/') ? 0 : parseInt(cr, 10);
  const pb = n < 5 ? 2 : 2 + Math.ceil((n - 4) / 4);
  return { xp: row[1], pb };
}

export function abilityMod(score) {
  const n = Number(score);
  return Number.isFinite(n) ? Math.floor((n - 10) / 2) : 0;
}

export function fmtMod(n) {
  return n >= 0 ? `+${n}` : `−${Math.abs(n)}`;
}

const blank = v => v === undefined || v === null || String(v).trim() === '';

// Pull a skill bonus like "Perception +5" out of the free-text skills line.
function skillBonus(skills, name) {
  const m = new RegExp(`${name}\\s*([+−-])\\s*(\\d+)`, 'i').exec(skills || '');
  if (!m) return null;
  return (m[1] === '+' ? 1 : -1) * parseInt(m[2], 10);
}

// ── Templates ────────────────────────────────────────────────────────────────
const GENERIC = {
  label: 'Generic',
  creature: {
    fields: [
      { key: 'kind',     label: 'Kind',          kind: 'text', placeholder: 'Beast, spirit, bandit…', span: 3 },
      { key: 'level',    label: 'Level / Threat', kind: 'text', placeholder: 'e.g. 3, Elite, Boss', span: 3 },
      { key: 'health',   label: 'Health',        kind: 'text', span: 2 },
      { key: 'defense',  label: 'Defense',       kind: 'text', span: 2 },
      { key: 'movement', label: 'Movement',      kind: 'text', span: 2 },
    ],
    sections: [
      { key: 'traits',  label: 'Abilities' },
      { key: 'actions', label: 'Actions' },
    ],
    subtitle: s => s.kind || '',
    lines: s => ({
      top: [['Level', s.level], ['Health', s.health], ['Defense', s.defense], ['Movement', s.movement]],
      bottom: [],
    }),
  },
  item: {
    fields: [
      { key: 'category', label: 'Category', kind: 'text', placeholder: 'Weapon, relic, potion…', span: 3 },
      { key: 'rarity',   label: 'Rarity',   kind: 'text', span: 3 },
      { key: 'value',    label: 'Value',    kind: 'text', span: 3 },
      { key: 'weight',   label: 'Weight',   kind: 'text', span: 3 },
    ],
    sections: [{ key: 'properties', label: 'Properties' }],
    subtitle: s => [s.category, s.rarity].filter(v => !blank(v)).join(', '),
    lines: s => ({ top: [['Value', s.value], ['Weight', s.weight]], bottom: [] }),
  },
};

const DND_55 = {
  label: 'D&D 5.5e (2024)',
  creature: {
    fields: [
      { key: 'size',         label: 'Size',      kind: 'select', options: SIZES, span: 2 },
      { key: 'creatureType', label: 'Type',      kind: 'select', options: CREATURE_TYPES, span: 2 },
      { key: 'alignment',    label: 'Alignment', kind: 'text', placeholder: 'Neutral Evil', span: 2 },
      { key: 'ac',           label: 'AC',        kind: 'number', span: 1 },
      { key: 'initiative',   label: 'Initiative', kind: 'text', placeholder: 'DEX', span: 1 },
      { key: 'hp',           label: 'HP',        kind: 'text', placeholder: '52 (8d8 + 16)', span: 2 },
      { key: 'speed',        label: 'Speed',     kind: 'text', placeholder: '30 ft., Fly 60 ft.', span: 2 },
      { key: 'abilities',    label: 'Ability Scores', kind: 'abilities', span: 6 },
      { key: 'skills',          label: 'Skills',          kind: 'text', placeholder: 'Perception +5, Stealth +6', span: 3 },
      { key: 'senses',          label: 'Senses',          kind: 'text', placeholder: 'Darkvision 60 ft.', span: 3 },
      { key: 'vulnerabilities', label: 'Vulnerabilities', kind: 'text', span: 2 },
      { key: 'resistances',     label: 'Resistances',     kind: 'text', span: 2 },
      { key: 'immunities',      label: 'Immunities',      kind: 'text', placeholder: 'Poison; Poisoned', span: 2 },
      { key: 'gear',            label: 'Gear',            kind: 'text', span: 2 },
      { key: 'languages',       label: 'Languages',       kind: 'text', placeholder: 'Common, Draconic', span: 2 },
      { key: 'cr',              label: 'CR',              kind: 'select', options: ['', ...CR_TABLE.map(r => r[0])], span: 2 },
    ],
    sections: [
      { key: 'traits',          label: 'Traits' },
      { key: 'actions',         label: 'Actions' },
      { key: 'bonusActions',    label: 'Bonus Actions' },
      { key: 'reactions',       label: 'Reactions' },
      { key: 'legendaryActions', label: 'Legendary Actions' },
    ],
    // Derived numbers shown in the editor and preview
    derive(s) {
      const cr  = crInfo(s.cr || '');
      const pb  = cr?.pb ?? 2;
      const ab  = s.abilities || {};
      const saves = s.saves || {};
      const mods = Object.fromEntries(ABILITIES.map(([k]) => [k, abilityMod(ab[k] ?? 10)]));
      const saveVals = Object.fromEntries(ABILITIES.map(([k]) => [k, mods[k] + (saves[k] ? pb : 0)]));
      const init = blank(s.initiative) ? mods.dex : parseInt(String(s.initiative).replace('−', '-'), 10);
      const perception = skillBonus(s.skills, 'Perception');
      const passive = 10 + (perception ?? mods.wis);
      return { cr, pb, mods, saveVals, init: Number.isFinite(init) ? init : mods.dex, passive };
    },
    subtitle: s => {
      const kind = [s.size, s.creatureType].filter(v => !blank(v)).join(' ');
      return [kind, s.alignment].filter(v => !blank(v)).join(', ');
    },
    lines(s) {
      const d = this.derive(s);
      const senses = /passive perception/i.test(s.senses || '')
        ? s.senses
        : [s.senses, `Passive Perception ${d.passive}`].filter(v => !blank(v)).join('; ');
      return {
        top: [
          ['AC', s.ac],
          ['Initiative', `${fmtMod(d.init)} (${10 + d.init})`],
          ['HP', s.hp],
          ['Speed', s.speed],
        ],
        bottom: [
          ['Skills', s.skills],
          ['Vulnerabilities', s.vulnerabilities],
          ['Resistances', s.resistances],
          ['Immunities', s.immunities],
          ['Gear', s.gear],
          ['Senses', senses],
          ['Languages', s.languages],
          ['CR', d.cr ? `${s.cr} (XP ${d.cr.xp.toLocaleString()}; PB ${fmtMod(d.pb)})` : ''],
        ],
      };
    },
  },
  item: {
    fields: [
      { key: 'category',    label: 'Category', kind: 'select', options: ['', ...ITEM_CATEGORIES], span: 2 },
      { key: 'subtype',     label: 'Subtype',  kind: 'text', placeholder: 'Longsword, Any Ring…', span: 2 },
      { key: 'rarity',      label: 'Rarity',   kind: 'select', options: RARITIES, optionLabels: { '': '— (mundane)' }, span: 2 },
      { key: 'attunement',  label: 'Requires Attunement', kind: 'checkbox', span: 2 },
      { key: 'attunementBy', label: 'Attunement by', kind: 'text', placeholder: 'a Wizard', span: 4, showIf: s => !!s.attunement },
      { key: 'charges',     label: 'Charges',  kind: 'text', placeholder: '7, regains 1d6+1 at dawn', span: 2 },
      { key: 'value',       label: 'Value',    kind: 'text', placeholder: '500 GP', span: 2 },
      { key: 'weight',      label: 'Weight',   kind: 'text', placeholder: '3 lb.', span: 2 },
    ],
    sections: [{ key: 'properties', label: 'Properties' }],
    subtitle(s) {
      const cat = blank(s.subtype) ? s.category : `${s.category || 'Item'} (${s.subtype})`;
      let rar = s.rarity || '';
      if (s.attunement) {
        const att = blank(s.attunementBy) ? 'Requires Attunement' : `Requires Attunement by ${s.attunementBy}`;
        rar = rar ? `${rar} (${att})` : `(${att})`;
      }
      return [cat, rar].filter(v => !blank(v)).join(', ');
    },
    lines: s => ({ top: [['Charges', s.charges], ['Value', s.value], ['Weight', s.weight]], bottom: [] }),
  },
};

export const SYSTEMS = { '5.5e': DND_55, generic: GENERIC };
export const DEFAULT_SYSTEM = '5.5e';

export function getTemplate(system, kind) {
  return (SYSTEMS[system] || SYSTEMS[DEFAULT_SYSTEM])[kind];
}

export { blank as isBlank };
