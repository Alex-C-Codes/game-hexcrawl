'use strict';

const WORLD_CONFIG = require('../db/world_config.json');
const CALENDAR     = WORLD_CONFIG.calendar;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStartingDate() {
  const sd = CALENDAR.starting_date;
  return {
    day:      randInt(sd.day_range[0],  sd.day_range[1]),
    month:    sd.month,
    year:     randInt(sd.year_range[0], sd.year_range[1]),
    progress: 0.0,
  };
}

function getTimeOfDay(progress) {
  for (const p of CALENDAR.time_periods) {
    if (progress >= p.from && progress < p.to) return p.name;
  }
  return CALENDAR.time_periods[CALENDAR.time_periods.length - 1].name;
}

// Mutates the worldTime object passed in.
function advanceTime(worldTime, biome, travelCosts) {
  const cost = travelCosts[biome];
  if (!cost) return;
  worldTime.progress += cost;
  while (worldTime.progress >= 1.0) {
    worldTime.progress -= 1.0;
    worldTime.day++;
    if (worldTime.day > CALENDAR.days_per_month) {
      worldTime.day = 1;
      worldTime.month++;
      if (worldTime.month > CALENDAR.months_per_year) {
        worldTime.month = 1;
        worldTime.year++;
      }
    }
  }
}

module.exports = { CALENDAR, randInt, makeStartingDate, getTimeOfDay, advanceTime };
