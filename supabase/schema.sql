-- BuildSoftTech learning platform — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Safe to re-run: everything uses IF NOT EXISTS / OR REPLACE.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (one per auth user)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text not null default '',
  phone       text default '',
  institution text default '',
  degree      text default '',
  role        text not null default 'student' check (role in ('student', 'admin')),
  created_at  timestamptz not null default now()
);

-- Create a profile automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, institution, degree)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'institution', ''),
    coalesce(new.raw_user_meta_data ->> 'degree', '')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- True when the current user is an admin. Used by every policy below.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Courses
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique,
  description  text default '',
  topics       text[] default '{}',
  fee          text default '',
  duration     text default '',
  mode         text default 'Online',
  status       text not null default 'draft' check (status in ('draft', 'open', 'running', 'completed', 'closed')),
  teams_link   text default '',
  drive_folder text default '',
  start_date   date,
  created_at   timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid not null references public.courses (id) on delete cascade,
  student_id   uuid not null references public.profiles (id) on delete cascade,
  status       text not null default 'pending' check (status in ('pending', 'active', 'completed', 'rejected')),
  note         text default '',
  enrolled_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique (course_id, student_id)
);

create table if not exists public.course_sessions (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses (id) on delete cascade,
  position      int not null default 0,
  title         text not null,
  session_date  date,
  recording_url text default '',   -- Google Drive view-only link
  notes         text default '',
  created_at    timestamptz not null default now()
);

create table if not exists public.course_resources (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid not null references public.courses (id) on delete cascade,
  kind         text not null default 'link' check (kind in ('pdf', 'youtube', 'github', 'link')),
  title        text not null,
  url          text default '',    -- external link, or public/signed URL for uploaded PDFs
  storage_path text default '',    -- path inside the course-resources bucket for PDFs
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Internships
-- ---------------------------------------------------------------------------
create table if not exists public.internships (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  domain      text default '',
  description text default '',
  fee         text default '',
  duration    text default '45 Days',
  status      text not null default 'open' check (status in ('draft', 'open', 'closed')),
  created_at  timestamptz not null default now()
);

create table if not exists public.internship_enrollments (
  id                uuid primary key default gen_random_uuid(),
  internship_id     uuid not null references public.internships (id) on delete cascade,
  student_id        uuid not null references public.profiles (id) on delete cascade,
  status            text not null default 'pending' check (status in ('pending', 'active', 'completed', 'rejected')),
  problem_statement text default '',
  weeks_total       int not null default 6 check (weeks_total between 1 and 52),
  repo_url          text default '',
  start_date        date,
  enrolled_at       timestamptz not null default now(),
  completed_at      timestamptz,
  unique (internship_id, student_id)
);

create table if not exists public.internship_reviews (
  id            uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.internship_enrollments (id) on delete cascade,
  week_no       int not null check (week_no between 1 and 52),
  reviewed      boolean not null default false,
  notes         text default '',
  suggestions   text default '',
  reviewed_at   timestamptz,
  unique (enrollment_id, week_no)
);

-- ---------------------------------------------------------------------------
-- Certificates
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id             uuid primary key default gen_random_uuid(),
  certificate_no text unique not null,
  kind           text not null check (kind in ('course', 'internship')),
  student_id     uuid not null references public.profiles (id) on delete cascade,
  enrollment_id  uuid not null,              -- course_enrollments.id or internship_enrollments.id
  title          text not null,              -- course / internship title at issue time
  issued_at      date not null default current_date,
  issued_by      uuid references public.profiles (id),
  unique (kind, enrollment_id)
);

-- ---------------------------------------------------------------------------
-- Site settings (used by the existing /admin settings panel)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key   text primary key,
  value jsonb not null
);

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.profiles               enable row level security;
alter table public.courses                enable row level security;
alter table public.course_enrollments     enable row level security;
alter table public.course_sessions        enable row level security;
alter table public.course_resources       enable row level security;
alter table public.internships            enable row level security;
alter table public.internship_enrollments enable row level security;
alter table public.internship_reviews     enable row level security;
alter table public.certificates           enable row level security;
alter table public.site_settings          enable row level security;

-- profiles: own row read/update; admins everything
drop policy if exists "profiles own read"   on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "profiles admin all"  on public.profiles;
create policy "profiles own read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles own update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'student');
create policy "profiles admin all"  on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- courses / internships: anyone can read non-draft listings; admins manage
drop policy if exists "courses public read" on public.courses;
drop policy if exists "courses admin all"   on public.courses;
create policy "courses public read" on public.courses for select using (status <> 'draft' or public.is_admin());
create policy "courses admin all"   on public.courses for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "internships public read" on public.internships;
drop policy if exists "internships admin all"   on public.internships;
create policy "internships public read" on public.internships for select using (status <> 'draft' or public.is_admin());
create policy "internships admin all"   on public.internships for all using (public.is_admin()) with check (public.is_admin());

-- enrollments: student sees and creates own (pending); admin manages
drop policy if exists "course_enr own read"   on public.course_enrollments;
drop policy if exists "course_enr own insert" on public.course_enrollments;
drop policy if exists "course_enr admin all"  on public.course_enrollments;
create policy "course_enr own read"   on public.course_enrollments for select using (student_id = auth.uid() or public.is_admin());
create policy "course_enr own insert" on public.course_enrollments for insert with check (student_id = auth.uid() and status = 'pending');
create policy "course_enr admin all"  on public.course_enrollments for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "intern_enr own read"   on public.internship_enrollments;
drop policy if exists "intern_enr own insert" on public.internship_enrollments;
drop policy if exists "intern_enr admin all"  on public.internship_enrollments;
create policy "intern_enr own read"   on public.internship_enrollments for select using (student_id = auth.uid() or public.is_admin());
create policy "intern_enr own insert" on public.internship_enrollments for insert with check (student_id = auth.uid() and status = 'pending');
create policy "intern_enr admin all"  on public.internship_enrollments for all using (public.is_admin()) with check (public.is_admin());

-- sessions / resources: visible only to actively enrolled students (and admins)
drop policy if exists "sessions enrolled read" on public.course_sessions;
drop policy if exists "sessions admin all"     on public.course_sessions;
create policy "sessions enrolled read" on public.course_sessions for select using (
  public.is_admin() or exists (
    select 1 from public.course_enrollments e
    where e.course_id = course_sessions.course_id and e.student_id = auth.uid() and e.status in ('active', 'completed')
  )
);
create policy "sessions admin all" on public.course_sessions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "resources enrolled read" on public.course_resources;
drop policy if exists "resources admin all"     on public.course_resources;
create policy "resources enrolled read" on public.course_resources for select using (
  public.is_admin() or exists (
    select 1 from public.course_enrollments e
    where e.course_id = course_resources.course_id and e.student_id = auth.uid() and e.status in ('active', 'completed')
  )
);
create policy "resources admin all" on public.course_resources for all using (public.is_admin()) with check (public.is_admin());

-- reviews: student reads own; admin writes
drop policy if exists "reviews own read"  on public.internship_reviews;
drop policy if exists "reviews admin all" on public.internship_reviews;
create policy "reviews own read" on public.internship_reviews for select using (
  public.is_admin() or exists (
    select 1 from public.internship_enrollments e where e.id = internship_reviews.enrollment_id and e.student_id = auth.uid()
  )
);
create policy "reviews admin all" on public.internship_reviews for all using (public.is_admin()) with check (public.is_admin());

-- certificates: student reads own; public verification is done server-side with the service key
drop policy if exists "certs own read"  on public.certificates;
drop policy if exists "certs admin all" on public.certificates;
create policy "certs own read"  on public.certificates for select using (student_id = auth.uid() or public.is_admin());
create policy "certs admin all" on public.certificates for all using (public.is_admin()) with check (public.is_admin());

-- site_settings: public read, admin write
drop policy if exists "settings public read" on public.site_settings;
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings public read" on public.site_settings for select using (true);
create policy "settings admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for course PDFs (private; files are served via signed URLs)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('course-resources', 'course-resources', false)
on conflict (id) do nothing;

drop policy if exists "course files admin all"      on storage.objects;
drop policy if exists "course files enrolled read"  on storage.objects;
create policy "course files admin all" on storage.objects for all
  using (bucket_id = 'course-resources' and public.is_admin())
  with check (bucket_id = 'course-resources' and public.is_admin());
create policy "course files enrolled read" on storage.objects for select
  using (
    bucket_id = 'course-resources' and exists (
      select 1 from public.course_resources r
      join public.course_enrollments e on e.course_id = r.course_id
      where r.storage_path = storage.objects.name and e.student_id = auth.uid() and e.status in ('active', 'completed')
    )
  );

-- ---------------------------------------------------------------------------
-- Make yourself admin (run after signing up on the website with that email):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------
