-- Lets the website save form enquiries with the public (anon) key as well as the service
-- role. Visitors can only ADD a new enquiry; they cannot read, change or delete any.
-- Run once in the Supabase SQL editor after 003_enquiries.sql. Safe to re-run.

drop policy if exists "enquiries public insert" on public.enquiries;
create policy "enquiries public insert" on public.enquiries for insert
  to anon, authenticated
  with check (status = 'new');

grant insert on public.enquiries to anon, authenticated;

notify pgrst, 'reload schema';
