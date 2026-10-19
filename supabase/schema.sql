-- ============================================================
--  Mubuga SACCO – Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Enable UUID extension ────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── NEWS ARTICLES ────────────────────────────────────────────
create table if not exists news_articles (
  id            uuid primary key default uuid_generate_v4(),
  slug          text not null unique,
  category      text not null default 'Notice',
  title         text not null,
  excerpt       text not null,
  body          text not null default '',
  cover_url     text,          -- Supabase Storage public URL
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── STAFF MEMBERS ────────────────────────────────────────────
create table if not exists staff_members (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text not null,
  bio        text not null default '',
  photo_url  text,
  sort_order int not null default 0,
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── BOARD / GOVERNANCE ───────────────────────────────────────
create table if not exists board_members (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text not null,
  group_type text not null check (group_type in ('board','management')),
  photo_url  text,
  confirmed  boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── GALLERY IMAGES ───────────────────────────────────────────
create table if not exists gallery_images (
  id          uuid primary key default uuid_generate_v4(),
  storage_url text not null,
  alt_text    text not null default '',
  caption     text,
  section     text not null default 'general',  -- 'hero','about','agri','gallery'
  sort_order  int not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── SITE SETTINGS (key-value) ────────────────────────────────
create table if not exists site_settings (
  key        text primary key,
  value      text not null,
  label      text not null,
  updated_at timestamptz not null default now()
);

-- Seed default settings
insert into site_settings (key, value, label) values
  ('phone_primary',   '0394 841 360',                          'Primary Phone'),
  ('phone_secondary', '0394 845 526',                          'Secondary Phone'),
  ('email',           'mubugasacco@gmail.com',                 'Email Address'),
  ('address',         'Nyakinama Sub-county, Kisoro District', 'Physical Address'),
  ('pobox',           'P.O. Box 99, Kisoro, Uganda',           'P.O. Box'),
  ('hours_weekday',   'Mon – Fri: 8:00 AM – 5:00 PM',         'Weekday Hours'),
  ('hero_headline',   'Growing Together,\nServing Kisoro.',    'Hero Headline'),
  ('hero_subtext',    'Mubuga SACCO provides affordable savings and credit services to members across Kisoro District, Uganda.', 'Hero Subtext'),
  ('interest_rate',   '1.8%',                                  'Loan Interest Rate (monthly)')
on conflict (key) do nothing;

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
-- Public (anon) can read published content only
alter table news_articles  enable row level security;
alter table staff_members  enable row level security;
alter table board_members  enable row level security;
alter table gallery_images enable row level security;
alter table site_settings  enable row level security;

-- Anon read policies
create policy "public_read_news"     on news_articles  for select using (published = true);
create policy "public_read_staff"    on staff_members  for select using (published = true);
create policy "public_read_board"    on board_members  for select using (true);
create policy "public_read_gallery"  on gallery_images for select using (published = true);
create policy "public_read_settings" on site_settings  for select using (true);

-- Authenticated (admin) full access
create policy "admin_all_news"     on news_articles  for all using (auth.role() = 'authenticated');
create policy "admin_all_staff"    on staff_members  for all using (auth.role() = 'authenticated');
create policy "admin_all_board"    on board_members  for all using (auth.role() = 'authenticated');
create policy "admin_all_gallery"  on gallery_images for all using (auth.role() = 'authenticated');
create policy "admin_all_settings" on site_settings  for all using (auth.role() = 'authenticated');

-- ── STORAGE BUCKETS ──────────────────────────────────────────
-- Run these separately in the SQL editor OR create them in
-- Storage → New bucket in the Supabase Dashboard
insert into storage.buckets (id, name, public) values
  ('media', 'media', true)
on conflict (id) do nothing;

-- Allow public to read the media bucket
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'media');

-- Allow authenticated users to upload/delete in media bucket
create policy "admin_upload_media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "admin_delete_media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ── ENQUIRIES (from contact form) ────────────────────────────
create table if not exists enquiries (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  phone       text,
  email       text,
  category    text not null default 'General Enquiry',
  message     text not null,
  status      text not null default 'new' check (status in ('new','responded')),
  created_at  timestamptz not null default now()
);

alter table enquiries enable row level security;

-- Anyone can submit an enquiry (insert only)
create policy "public_insert_enquiry" on enquiries
  for insert with check (true);

-- Only authenticated admin can read/update/delete enquiries
create policy "admin_read_enquiries"   on enquiries for select using (auth.role() = 'authenticated');
create policy "admin_update_enquiries" on enquiries for update using (auth.role() = 'authenticated');
create policy "admin_delete_enquiries" on enquiries for delete using (auth.role() = 'authenticated');

-- ── BRANCHES ─────────────────────────────────────────────────
create table if not exists branches (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  type          text not null default 'Branch',
  address       text,
  postal        text,
  phone1        text,
  phone2        text,
  email         text,
  hours         text,
  map_embed_src text,
  confirmed     boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table branches enable row level security;
create policy "public_read_branches" on branches for select using (true);
create policy "admin_all_branches"   on branches for all using (auth.role() = 'authenticated');

-- Seed default branches
insert into branches (name, type, address, postal, phone1, phone2, email, hours, confirmed) values
  ('Head Office – Mubuga',  'Main',   'Mubuga, Nyakinama Sub-county', 'P.O. Box 99, Kisoro, Uganda', '0394 841 360', '0394 845 526', 'mubugasacco@gmail.com', 'Mon–Fri: 8:00 AM – 5:00 PM', true),
  ('Kisoro Town Branch',    'Branch', 'Kisoro–Bunagana Road, before Stabex', '',                     '0394 841 360', '',             'mubugasacco@gmail.com', 'Mon–Fri: 8:00 AM – 5:00 PM', true)
on conflict do nothing;

-- ── LOAN PRODUCTS ────────────────────────────────────────────
create table if not exists loan_products (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  title       text not null,
  description text not null default '',
  tagline     text not null default '',
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table loan_products enable row level security;
create policy "public_read_loans" on loan_products for select using (published = true);
create policy "admin_all_loans"   on loan_products for all using (auth.role() = 'authenticated');

insert into loan_products (slug, title, description, sort_order) values
  ('business',        'Business / Commercial Loan',  'Finance for businesses, traders, shops and commercial enterprises to grow their operations.', 1),
  ('agricultural',    'Agricultural Loan',            'Finance for crop production, farm inputs and agricultural activities. Includes a 3-month grace period.', 2),
  ('school-fees',     'School Fees Loan',             'Help families meet education costs for children at school or university.', 3),
  ('development',     'Development Loan',             'Finance for productive development activities to improve livelihoods and community progress.', 4),
  ('home-improvement','Home Improvement Loan',        'Finance renovation, construction and development of your family home.', 5),
  ('boda-boda',       'Boda Boda Loan',               'Financing for boda boda operators to acquire or maintain their motorcycles.', 6),
  ('medical',         'Medical Loan',                 'Access funds to meet urgent medical and healthcare expenses for your family.', 7),
  ('emergency',       'Emergency Loan',               'Fast access to funds for urgent and immediate financial emergencies.', 8)
on conflict (slug) do nothing;

-- ── SAVINGS PRODUCTS ─────────────────────────────────────────
create table if not exists savings_products (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  title       text not null,
  description text not null default '',
  tagline     text not null default '',
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table savings_products enable row level security;
create policy "public_read_savings" on savings_products for select using (published = true);
create policy "admin_all_savings"   on savings_products for all using (auth.role() = 'authenticated');

insert into savings_products (slug, title, description, sort_order) values
  ('ordinary',              'Ordinary Savings',       'A regular savings account for all members to grow their money safely.', 1),
  ('voluntary',             'Voluntary Savings',      'Flexible savings allowing members to deposit amounts of their choice.', 2),
  ('junior',                'Junior / Minor Savings', 'A savings account designed to build financial habits for children.', 3),
  ('vsla',                  'VSLA Savings',           'Village savings and lending association accounts for group savers.', 4),
  ('school-fees-collection','School Fees Collection', 'Dedicated account to help families plan and save for school fees.', 5)
on conflict (slug) do nothing;

-- ── MEMBERS ──────────────────────────────────────────────────
create sequence if not exists members_seq start 1;

create table if not exists members (
  id             uuid primary key default uuid_generate_v4(),
  member_number  text unique default ('M' || lpad(nextval('members_seq')::text, 5, '0')),
  name           text not null,
  phone          text not null,
  email          text,
  address        text,
  date_of_birth  date,
  date_joined    date,
  status         text not null default 'active' check (status in ('active','inactive','suspended')),
  created_at     timestamptz not null default now()
);

alter table members enable row level security;
-- Only authenticated admin can access member records
create policy "admin_all_members" on members for all using (auth.role() = 'authenticated');

-- ── VIDEOS ───────────────────────────────────────────────────
create table if not exists videos (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  description   text not null default '',
  video_url     text not null,          -- Supabase Storage URL or external URL
  thumbnail_url text,                   -- poster image shown before play
  section       text not null default 'homepage'
                check (section in ('homepage','about','news','general')),
  sort_order    int not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table videos enable row level security;
create policy "public_read_videos" on videos for select using (published = true);
create policy "admin_all_videos"   on videos for all   using (auth.role() = 'authenticated');

-- ── SCHEMA PATCHES ───────────────────────────────────────────

-- 1. FAQs table
create table if not exists faqs (
  id         uuid primary key default uuid_generate_v4(),
  question   text not null,
  answer     text not null,
  sort_order int not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table faqs enable row level security;
create policy "public_read_faqs" on faqs for select using (published = true);
create policy "admin_all_faqs"   on faqs for all   using (auth.role() = 'authenticated');

-- Seed default FAQs
insert into faqs (question, answer, sort_order) values
  ('How do I become a member of Mubuga SACCO?', 'To become a member, visit our office at Nyakinama Sub-county, Kisoro District. Our staff will guide you through the membership application process. Eligibility criteria, required documents and registration fees must be confirmed directly with management.', 1),
  ('What savings products are available?', 'We offer Ordinary Savings, Voluntary Savings, Junior/Minor Savings, VSLA Savings and a School Fees Collection Account. Contact us for details about each product.', 2),
  ('What loan products does Mubuga SACCO offer?', 'We offer Business/Commercial Loans, Agricultural Loans (with a 3-month grace period), School Fees Loans, Development Loans, Home Improvement Loans, Boda Boda Loans, Medical Loans and Emergency Loans. All loans are at 1.8% per month on a reducing balance.', 3),
  ('What documents might be required for a loan?', 'Typical requirements may include proof of membership, valid identification and collateral or guarantor information. Exact requirements vary by product. Please contact us or visit our office for specific documentation requirements.', 4),
  ('How do I enquire about a loan?', 'You can enquire by visiting our Mubuga office or Kisoro Town Branch, calling 0394 841 360 (Head Office) or using the enquiry form on our Contact page. Our staff will explain the process and requirements.', 5),
  ('Where is the Mubuga SACCO office?', 'Our head office is located at Nyakinama Sub-county, Kisoro District, Uganda. P.O. Box 99, Kisoro. Contact us to confirm the exact physical address and current branch locations.', 6),
  ('Can I access services through mobile banking?', 'Please contact our office to enquire about currently available mobile or agency banking options.', 7)
on conflict do nothing;

-- 2. Add icon_path to loan_products
alter table loan_products add column if not exists icon_path text not null default 'M13 10V3L4 14h7v7l9-11h-7z';
update loan_products set icon_path = 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' where slug = 'business';
update loan_products set icon_path = 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' where slug = 'agricultural';
update loan_products set icon_path = 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13' where slug = 'school-fees';
update loan_products set icon_path = 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' where slug = 'development';
update loan_products set icon_path = 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' where slug = 'home-improvement';
update loan_products set icon_path = 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' where slug = 'boda-boda';
update loan_products set icon_path = 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' where slug = 'medical';
update loan_products set icon_path = 'M13 10V3L4 14h7v7l9-11h-7z' where slug = 'emergency';

-- 3. Add note column to branches
alter table branches add column if not exists note text;
update branches set note = 'Our main office is located in Mubuga village, Nyakinama Sub-county. Ask locally for Mubuga SACCO or call ahead for precise directions.' where name = 'Head Office – Mubuga';
update branches set note = 'Located on the Kisoro–Bunagana road, before the Stabex fuel station. Accessible from Kisoro town centre.' where name = 'Kisoro Town Branch';

-- 4. Add missing site_settings keys
insert into site_settings (key, value, label) values
  ('hours_saturday', 'Saturday & Public Holidays: 8:30 AM – 2:00 PM', 'Saturday / Holiday Hours'),
  ('phone_secondary', '0394 845 526', 'Secondary Phone')
on conflict (key) do nothing;
