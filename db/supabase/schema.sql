-- =============================================================
--  Content library table (hexmaps, battlemaps, 3D battlemaps,
--  articles, settlement maps) — run once in the Supabase SQL editor.
-- =============================================================

create table if not exists public.library_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  type       text not null check (type in ('hexmap','battlemap','voxel3d','article','settlement')),
  name       text not null default 'Untitled',
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.library_items enable row level security;

create policy "select own items" on public.library_items
  for select using (auth.uid() = user_id);

create policy "insert own items" on public.library_items
  for insert with check (auth.uid() = user_id);

create policy "update own items" on public.library_items
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete own items" on public.library_items
  for delete using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists library_items_set_updated_at on public.library_items;
create trigger library_items_set_updated_at
before update on public.library_items
for each row execute function public.set_updated_at();
