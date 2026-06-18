create table if not exists public.senior_profiles (
  id uuid primary key default gen_random_uuid(),
  last_name text,
  first_name text not null,
  reminder_time text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caregiver_profiles (
  id uuid primary key default gen_random_uuid(),
  last_name text,
  first_name text not null,
  email text not null,
  phone text,
  senior_id uuid references public.senior_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorite_contacts (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid references public.senior_profiles(id) on delete cascade,
  first_name text not null,
  relationship text not null,
  phone_number text not null,
  photo_url text,
  is_primary boolean not null default false,
  display_order numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wellness_checks (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid references public.senior_profiles(id) on delete cascade,
  checked_at timestamptz not null default now(),
  status text not null default 'bien' check (status in ('bien', 'besoin_aide')),
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  plan_name text not null check (plan_name in ('Famille', 'Sérénité')),
  status text not null default 'active' check (status in ('active', 'cancelled', 'expired')),
  stripe_session_id text,
  amount numeric,
  started_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

alter table public.senior_profiles add column if not exists last_name text;
alter table public.senior_profiles add column if not exists is_active boolean not null default true;
alter table public.senior_profiles drop column if exists message;

alter table public.favorite_contacts add column if not exists senior_id uuid references public.senior_profiles(id) on delete cascade;
alter table public.favorite_contacts drop column if exists is_emergency;

alter table public.wellness_checks add column if not exists senior_id uuid references public.senior_profiles(id) on delete cascade;
alter table public.wellness_checks alter column status set default 'bien';

alter table public.senior_profiles enable row level security;
alter table public.caregiver_profiles enable row level security;
alter table public.favorite_contacts enable row level security;
alter table public.wellness_checks enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_requests enable row level security;

drop policy if exists "Allow public read senior profiles" on public.senior_profiles;
drop policy if exists "Allow public insert senior profiles" on public.senior_profiles;
drop policy if exists "Allow public update senior profiles" on public.senior_profiles;
drop policy if exists "Allow public read caregiver profiles" on public.caregiver_profiles;
drop policy if exists "Allow public insert caregiver profiles" on public.caregiver_profiles;
drop policy if exists "Allow public update caregiver profiles" on public.caregiver_profiles;
drop policy if exists "Allow public read favorite contacts" on public.favorite_contacts;
drop policy if exists "Allow public insert favorite contacts" on public.favorite_contacts;
drop policy if exists "Allow public update favorite contacts" on public.favorite_contacts;
drop policy if exists "Allow public delete favorite contacts" on public.favorite_contacts;
drop policy if exists "Allow public read wellness checks" on public.wellness_checks;
drop policy if exists "Allow public insert wellness checks" on public.wellness_checks;
drop policy if exists "Allow public read subscriptions" on public.subscriptions;
drop policy if exists "Allow public insert subscriptions" on public.subscriptions;
drop policy if exists "Allow public update subscriptions" on public.subscriptions;
drop policy if exists "Allow public read subscription requests" on public.subscription_requests;
drop policy if exists "Allow public insert subscription requests" on public.subscription_requests;

create policy "Allow public read senior profiles" on public.senior_profiles for select using (true);
create policy "Allow public insert senior profiles" on public.senior_profiles for insert with check (true);
create policy "Allow public update senior profiles" on public.senior_profiles for update using (true) with check (true);

create policy "Allow public read caregiver profiles" on public.caregiver_profiles for select using (true);
create policy "Allow public insert caregiver profiles" on public.caregiver_profiles for insert with check (true);
create policy "Allow public update caregiver profiles" on public.caregiver_profiles for update using (true) with check (true);

create policy "Allow public read favorite contacts" on public.favorite_contacts for select using (true);
create policy "Allow public insert favorite contacts" on public.favorite_contacts for insert with check (true);
create policy "Allow public update favorite contacts" on public.favorite_contacts for update using (true) with check (true);
create policy "Allow public delete favorite contacts" on public.favorite_contacts for delete using (true);

create policy "Allow public read wellness checks" on public.wellness_checks for select using (true);
create policy "Allow public insert wellness checks" on public.wellness_checks for insert with check (true);

create policy "Allow public read subscriptions" on public.subscriptions for select using (true);
create policy "Allow public insert subscriptions" on public.subscriptions for insert with check (true);
create policy "Allow public update subscriptions" on public.subscriptions for update using (true) with check (true);

create policy "Allow public read subscription requests" on public.subscription_requests for select using (true);
create policy "Allow public insert subscription requests" on public.subscription_requests for insert with check (true);
