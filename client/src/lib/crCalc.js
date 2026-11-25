// Challenge Rating calculator — the procedure from the 2014 Dungeon Master's
// Guide, ch. 9 "Creating a Monster" (the most recent CR-building method WotC
// has published):
//
//   1. Defensive CR: find the row whose HP range holds the monster's effective
//      HP, then move one CR step per 2 points its effective AC is above/below
//      that row's AC.
//   2. Offensive CR: find the row whose damage range holds its average damage
//      per round over the first three rounds, then move one step per 2 points
//      its attack bonus (or save DC, if it mostly uses saves) is above/below
//      that row's value.
//   3. CR = average of the two, rounded to the nearest CR.
//
// Effective HP / AC adjustments (also from the DMG) are applied first.

// [CR, numeric, AC, hpMin, hpMax, attackBonus, dmgMin, dmgMax, saveDC]
const TABLE = [
  ['0',   0,     13,   1,   6,  3,   0,   1, 13],
  ['1/8', 0.125, 13,   7,  35,  3,   2,   3, 13],
  ['1/4', 0.25,  13,  36,  49,  3,   4,   5, 13],
  ['1/2', 0.5,   13,  50,  70,  3,   6,   8, 13],
  ['1',   1,     13,  71,  85,  3,   9,  14, 13],
  ['2',   2,     13,  86, 100,  3,  15,  20, 13],
  ['3',   3,     13, 101, 115,  4,  21,  26, 13],
  ['4',   4,     14, 116, 130,  5,  27,  32, 14],
  ['5',   5,     15, 131, 145,  6,  33,  38, 15],
  ['6',   6,     15, 146, 160,  6,  39,  44, 15],
  ['7',   7,     15, 161, 175,  6,  45,  50, 15],
  ['8',   8,     16, 176, 190,  7,  51,  56, 16],
  ['9',   9,     16, 191, 205,  7,  57,  62, 16],
  ['10',  10,    17, 206, 220,  7,  63,  68, 16],
  ['11',  11,    17, 221, 235,  8,  69,  74, 17],
  ['12',  12,    17, 236, 250,  8,  75,  80, 17],
  ['13',  13,    18, 251, 265,  8,  81,  86, 18],
  ['14',  14,    18, 266, 280,  8,  87,  92, 18],
  ['15',  15,    18, 281, 295,  8,  93,  98, 18],
  ['16',  16,    18, 296, 310,  9,  99, 104, 18],
  ['17',  17,    19, 311, 325, 10, 105, 110, 19],
  ['18',  18,    19, 326, 340, 10, 111, 116, 19],
  ['19',  19,    19, 341, 355, 10, 117, 122, 19],
  ['20',  20,    19, 356, 400, 10, 123, 140, 19],
  ['21',  21,    19, 401, 445, 11, 141, 158, 20],
  ['22',  22,    19, 446, 490, 11, 159, 176, 20],
  ['23',  23,    19, 491, 535, 11, 177, 194, 20],
  ['24',  24,    19, 536, 580, 12, 195, 212, 21],
  ['25',  25,    19, 581, 625, 12, 213, 230, 21],
  ['26',  26,    19, 626, 670, 12, 231, 248, 21],
  ['27',  27,    19, 671, 715, 13, 249, 266, 22],
  ['28',  28,    19, 716, 760, 13, 267, 284, 22],
  ['29',  29,    19, 761, 805, 13, 285, 302, 22],
  ['30',  30,    19, 806, 850, 14, 303, 320, 23],
].map(([cr, num, ac, hpMin, hpMax, atk, dmgMin, dmgMax, dc]) => ({ cr, num, ac, hpMin, hpMax, atk, dmgMin, dmgMax, dc }));

const PHYSICAL = /bludgeoning|piercing|slashing/i;
const DAMAGE_TYPES = /acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder/gi;
const WORD_NUMS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 };

function rowIndexBy(value, lo, hi) {
  if (value <= TABLE[0][hi]) return 0;
  for (let i = 0; i < TABLE.length; i++) {
    if (value >= TABLE[i][lo] && value <= TABLE[i][hi]) return i;
  }
  // Gaps can't happen (ranges are contiguous) — so this is above the top row
  return TABLE.length - 1;
}

const clampIdx = i => Math.max(0, Math.min(TABLE.length - 1, i));
// DMG: adjust one CR per full 2 points of difference, in either direction
const stepsFor = diff => (diff >= 0 ? Math.floor(diff / 2) : -Math.floor(-diff / 2));

function nearestCR(num) {
  let best = 0;
  for (let i = 1; i < TABLE.length; i++) {
    // `<=` so exact ties round up
    if (Math.abs(TABLE[i].num - num) <= Math.abs(TABLE[best].num - num)) best = i;
  }
  return best;
}

function leadingInt(v) {
  const m = /-?\d+/.exec(String(v ?? ''));
  return m ? parseInt(m[0], 10) : null;
}

function num(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).replace('−', '-').replace('+', ''));
  return Number.isFinite(n) ? n : null;
}

// Average damage written in an entry: every "13 (2d8 + 4)" is summed.
function entryDamage(text) {
  let total = 0;
  for (const m of String(text || '').matchAll(/(\d+)\s*\(\s*\d+d\d+[^)]*\)/g)) total += parseInt(m[1], 10);
  return total;
}

// 2024: "Melee Attack Roll: +5, reach 5 ft."   2014: "Melee Weapon Attack: +5 to hit"
function entryAttackBonus(text) {
  const t = String(text || '');
  const m = /attack roll:\s*([+−-]\s*\d+)/i.exec(t) || /([+−-]\s*\d+)\s*to hit/i.exec(t);
  return m ? num(m[1].replace(/\s/g, '')) : null;
}

function entryDC(text) {
  const m = /\bDC\s*(\d+)/i.exec(String(text || ''));
  return m ? parseInt(m[1], 10) : null;
}

// Read damage per round, attack bonus and save DC out of the Actions section.
export function parseOffense(actions) {
  const list = (actions || []).filter(a => a && (a.name || a.text));
  const dmg = new Map(list.map(a => [a, entryDamage(a.text)]));
  const isMulti   = a => /multiattack/i.test(a.name || '');
  const isRecharge = a => /recharge|\/day/i.test(a.name || '');
  const notes = [];

  // Best single non-recharge action
  const regular = list.filter(a => !isMulti(a) && !isRecharge(a));
  let baseline = Math.max(0, ...regular.map(a => dmg.get(a)));

  // Multiattack: "makes two Claw attacks", "one Bite attack and two Claw attacks"
  const multi = list.find(isMulti);
  if (multi) {
    let total = 0, matched = 0;
    // "Claws" in the text should match an action named "Claw" and vice versa
    const norm = str => str.trim().toLowerCase().replace(/s$/, '');
    const findAction = ref => regular.find(a => {
      const n = norm((a.name || '').split('(')[0]);
      return n && (n === norm(ref) || n.startsWith(norm(ref)) || norm(ref).startsWith(n));
    });
    const N = '(one|two|three|four|five|six|seven|eight|\\d+)';
    const patterns = [
      new RegExp(`\\b${N}\\s+([A-Za-z][\\w' ]*?)\\s+attacks?\\b`, 'gi'), // 2024: "two Claw attacks"
      new RegExp(`\\b${N}\\s+with\\s+its\\s+([A-Za-z][\\w']*)`, 'gi'),     // 2014: "two with its claws"
    ];
    const text = String(multi.text || '');
    for (const re of patterns) {
      for (const m of text.matchAll(re)) {
        const count = WORD_NUMS[m[1].toLowerCase()] ?? parseInt(m[1], 10);
        const target = findAction(m[2]);
        if (target) { total += count * dmg.get(target); matched++; }
      }
      if (matched) break; // don't double-count if both phrasings appear
    }
    if (matched) {
      baseline = Math.max(baseline, total);
      notes.push(`Multiattack read as ${total} damage`);
    } else {
      notes.push('Multiattack found but couldn’t match it to named actions — set Damage/Round manually');
    }
  }

  // Recharge / limited-use action: DMG assumes it's used once in the first
  // three rounds, so average it with two rounds of the regular routine.
  let dpr = baseline;
  const burst = list.filter(isRecharge).map(a => dmg.get(a)).sort((a, b) => b - a)[0] || 0;
  if (burst > baseline) {
    dpr = Math.round((burst + 2 * baseline) / 3);
    notes.push(`Recharge/limited action (${burst}) averaged over 3 rounds`);
  }

  const bonuses = list.map(a => entryAttackBonus(a.text)).filter(v => v !== null);
  const dcs     = list.map(a => entryDC(a.text)).filter(v => v !== null);
  return {
    dpr,
    attackBonus: bonuses.length ? Math.max(...bonuses) : null,
    saveDC:      dcs.length ? Math.max(...dcs) : null,
    notes,
  };
}

// Full calculation. `stats` is the 5.5e creature stats object, `sections` the
// entry's sections ({ traits, actions, ... }).
export function calculateCR(stats, sections) {
  const s = stats || {};
  const traits = (sections?.traits || []).map(t => `${t.name} ${t.text}`).join('\n');
  const actionsText = (sections?.actions || []).map(a => a.text).join('\n');
  const parsed = parseOffense(sections?.actions);
  const steps = [];

  const hp = leadingInt(s.hp);
  if (!hp || hp < 1) return { cr: null, missing: 'Enter HP to calculate CR', parsed };

  // ── Defensive ──
  const hpRow = rowIndexBy(hp, 'hpMin', 'hpMax');
  const expected = TABLE[hpRow].num; // "expected CR" used by the DMG's multipliers
  let effHP = hp;

  const tier = expected <= 4 ? 0 : expected <= 10 ? 1 : expected <= 16 ? 2 : 3;
  const resistMult = [2, 1.5, 1.25, 1][tier];
  const immuneMult = [2, 2, 1.5, 1.25][tier];
  const damageImmunities = String(s.immunities || '').split(';')[0]; // 2024 format: "Damage; Conditions"
  const significant = txt => PHYSICAL.test(txt) || (txt.match(DAMAGE_TYPES) || []).length >= 3;
  if (significant(damageImmunities) && immuneMult > 1) {
    effHP = Math.round(effHP * immuneMult);
    steps.push(`Immunities ×${immuneMult} effective HP`);
  } else if (significant(String(s.resistances || '')) && resistMult > 1) {
    effHP = Math.round(effHP * resistMult);
    steps.push(`Resistances ×${resistMult} effective HP`);
  }

  const lr = /legendary resistance\s*\((\d+)\s*\/\s*day\)/i.exec(traits);
  if (lr) {
    const per = expected <= 4 ? 10 : expected <= 10 ? 20 : 30;
    effHP += per * parseInt(lr[1], 10);
    steps.push(`Legendary Resistance +${per * parseInt(lr[1], 10)} effective HP`);
  }

  const ac = num(s.ac);
  let effAC = ac;
  if (effAC !== null) {
    const saveCount = Object.values(s.saves || {}).filter(Boolean).length;
    if (saveCount >= 5)      { effAC += 4; steps.push(`${saveCount} save proficiencies +4 effective AC`); }
    else if (saveCount >= 3) { effAC += 2; steps.push(`${saveCount} save proficiencies +2 effective AC`); }
    if (/magic resistance/i.test(traits)) { effAC += 2; steps.push('Magic Resistance +2 effective AC'); }
    if (/\bfly\b/i.test(s.speed || '') && /ranged|range \d+/i.test(actionsText) && expected <= 10) {
      effAC += 2; steps.push('Flying with ranged attacks +2 effective AC');
    }
  }

  const defRow = rowIndexBy(effHP, 'hpMin', 'hpMax');
  const acSteps = effAC === null ? 0 : stepsFor(effAC - TABLE[defRow].ac);
  const defIdx = clampIdx(defRow + acSteps);

  // ── Offensive ──
  const dprOverride = num(s.dpr);
  const dpr = dprOverride ?? parsed.dpr;
  const offRow = rowIndexBy(dpr, 'dmgMin', 'dmgMax');

  let atk = num(s.attackBonus) ?? parsed.attackBonus;
  const dc = num(s.saveDC) ?? parsed.saveDC;
  if (atk !== null && /pack tactics/i.test(traits)) { atk += 1; steps.push('Pack Tactics +1 effective attack bonus'); }
  // DMG: use whichever the monster relies on — attack rolls if it has any
  const useAtk = atk !== null;
  const offDiff = useAtk ? atk - TABLE[offRow].atk : dc !== null ? dc - TABLE[offRow].dc : 0;
  const offIdx = clampIdx(offRow + stepsFor(offDiff));

  const finalIdx = nearestCR((TABLE[defIdx].num + TABLE[offIdx].num) / 2);

  return {
    cr: TABLE[finalIdx].cr,
    parsed,
    steps,
    defensive: {
      hp, effHP, ac, effAC,
      hpCR: TABLE[defRow].cr, expectedAC: TABLE[defRow].ac, acSteps, cr: TABLE[defIdx].cr,
    },
    offensive: {
      dpr, dprSource: dprOverride !== null ? 'manual' : 'from actions',
      dmgCR: TABLE[offRow].cr,
      using: useAtk ? 'attack' : dc !== null ? 'dc' : null,
      value: useAtk ? atk : dc,
      expected: useAtk ? TABLE[offRow].atk : TABLE[offRow].dc,
      steps: stepsFor(offDiff), cr: TABLE[offIdx].cr,
    },
  };
}
