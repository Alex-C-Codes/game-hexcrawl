import { supabase } from './supabaseClient';

function mapRow(row) {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAll() {
  const { data, error } = await supabase
    .from('library_items')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
}

export async function getByType(type) {
  const { data, error } = await supabase
    .from('library_items')
    .select('*')
    .eq('type', type)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
}

export async function getById(id) {
  const { data, error } = await supabase
    .from('library_items')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function upsert(item) {
  const row = { id: item.id, type: item.type, name: item.name, data: item.data };
  const { data, error } = await supabase
    .from('library_items')
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function remove(id) {
  const { error } = await supabase.from('library_items').delete().eq('id', id);
  if (error) throw error;
}
