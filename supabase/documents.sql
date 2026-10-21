-- ============================================================
--  Mubuga SACCO – Reports & Publications (documents)
--  Run once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create table if not exists documents (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  category    text not null default 'other'
              check (category in ('audited','annual','financial','agm','policy','other')),
  year        int,
  description text not null default '',
  file_url    text not null,          -- Supabase Storage public URL (media bucket, documents/ folder)
  file_name   text not null default '',
  file_size   bigint,                 -- bytes
  published   boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table documents enable row level security;

-- Visitors see published documents only; signed-in admins manage everything
create policy "public_read_documents" on documents for select using (published = true);
create policy "admin_all_documents"   on documents for all    using (auth.role() = 'authenticated');

-- Files go in the existing public "media" bucket, which already allows
-- public reads and authenticated uploads/deletes (see schema.sql).
