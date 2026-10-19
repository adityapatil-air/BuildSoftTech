-- Public certificate check for /certificates/[number].
-- Callable without login; returns only what the verification page shows.
-- Run once in the Supabase SQL editor after schema.sql. Safe to re-run.

create or replace function public.verify_certificate(p_no text)
returns table (certificate_no text, kind text, title text, issued_at date, student_name text)
language sql stable security definer set search_path = public as $$
  select c.certificate_no, c.kind, c.title, c.issued_at, p.full_name
  from public.certificates c join public.profiles p on p.id = c.student_id
  where c.certificate_no = p_no;
$$;

grant execute on function public.verify_certificate(text) to anon, authenticated;
