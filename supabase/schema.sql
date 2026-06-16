create table if not exists public.senior_profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null default 'Mamie',
  reminder_time text not null default '09:00',
  message text not null default 'Je vais bien, tout va bien, je rassure les miens.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorite_contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  relationship text not null,
  phone_number text not null,
  photo_url text,
  is_primary boolean not null default false,
  is_emergency boolean not null default false,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.wellness_checks (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'ok',
  message text not null,
  checked_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.subscription_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  selected_plan text not null,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.senior_profiles enable row level security;
alter table public.favorite_contacts enable row level security;
alter table public.wellness_checks enable row level security;
alter table public.subscription_requests enable row level security;

create policy "Allow public read senior profiles" on public.senior_profiles for select using (true);
create policy "Allow public insert senior profiles" on public.senior_profiles for insert with check (true);
create policy "Allow public update senior profiles" on public.senior_profiles for update using (true) with check (true);

create policy "Allow public read favorite contacts" on public.favorite_contacts for select using (true);
create policy "Allow public insert favorite contacts" on public.favorite_contacts for insert with check (true);
create policy "Allow public update favorite contacts" on public.favorite_contacts for update using (true) with check (true);
create policy "Allow public delete favorite contacts" on public.favorite_contacts for delete using (true);

create policy "Allow public read wellness checks" on public.wellness_checks for select using (true);
create policy "Allow public insert wellness checks" on public.wellness_checks for insert with check (true);

create policy "Allow public read subscription requests" on public.subscription_requests for select using (true);
create policy "Allow public insert subscription requests" on public.subscription_requests for insert with check (true);
