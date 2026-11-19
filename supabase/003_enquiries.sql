-- Enquiries from the public forms (training demo, internship application, contact).
-- Rows are written by the website server with the service role key, so visitors never
-- get direct table access. Only admins can read or change them.
-- Run once in the Supabase SQL editor after schema.sql. Safe to re-run.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('demo', 'internship', 'contact')),
  full_name text not null,
  mobile text not null default '',
  email text not null default '',
  topic text not null default '',
  details jsonb not null default '{}'::jsonb,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;

drop policy if exists "enquiries admin all" on public.enquiries;
create policy "enquiries admin all" on public.enquiries for all
  using (public.is_admin()) with check (public.is_admin());

notify pgrst, 'reload schema';
