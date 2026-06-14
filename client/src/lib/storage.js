const KEY = 'hx_content';

export function getAll() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function getByType(type) {
  return getAll().filter(i => i.type === type);
}

export function getById(id) {
  return getAll().find(i => i.id === id) ?? null;
}

export function upsert(item) {
  const all = getAll();
  const now = new Date().toISOString();
  const idx = all.findIndex(i => i.id === item.id);
  const record = { ...item, updatedAt: now, createdAt: all[idx]?.createdAt ?? now };
  if (idx >= 0) all[idx] = record; else all.unshift(record);
  localStorage.setItem(KEY, JSON.stringify(all));
  return record;
}

export function remove(id) {
  localStorage.setItem(KEY, JSON.stringify(getAll().filter(i => i.id !== id)));
}
