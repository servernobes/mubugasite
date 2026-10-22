-- ============================================================
--  Mubuga SACCO – Website traffic (page views)
--  Run once in: Supabase Dashboard → SQL Editor → New query
--
--  The website records one row per page view (app/components/VisitTracker.tsx).
--  No names, IP addresses or cookies are stored – only an anonymous random
--  id per browser, so unique visitors can be counted.
--  The admin's "Website Traffic" page reads totals via traffic_stats().
-- ============================================================

create table if not exists page_views (
  id          bigint generated always as identity primary key,
  path        text not null check (char_length(path) <= 300),
  source      text check (char_length(source) <= 100),      -- referring site's host name, null = direct
  visitor_id  text check (char_length(visitor_id) <= 64),
  device      text check (device in ('mobile', 'tablet', 'desktop')),
  lang        text check (char_length(lang) <= 10),
  created_at  timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on page_views (created_at);

alter table page_views enable row level security;

-- Anyone visiting the site may add a view; only signed-in admins can read or clear them
create policy "record_page_view"  on page_views for insert to anon, authenticated with check (true);
create policy "admin_read_views"   on page_views for select using (auth.role() = 'authenticated');
create policy "admin_delete_views" on page_views for delete using (auth.role() = 'authenticated');

-- Summary for the admin dashboard. Days are counted in Uganda time (Africa/Kampala).
create or replace function traffic_stats(days int default 30)
returns json
language sql
stable
as $$
  with v as (
    select *, (created_at at time zone 'Africa/Kampala')::date as day
    from page_views
    where created_at >= now() - make_interval(days => days)
  ),
  today as (
    select * from v where day = (now() at time zone 'Africa/Kampala')::date
  ),
  classified as (
    select *,
      case
        when source is null or source = ''             then 'Direct / typed address'
        when source ~* '(^|\.)google\.'                then 'Google'
        when source ~* '(^|\.)bing\.'                  then 'Bing'
        when source ~* '(facebook\.com|fb\.com|fb\.me)' then 'Facebook'
        when source ~* 'whatsapp'                      then 'WhatsApp'
        when source ~* '(twitter\.com|t\.co|x\.com)'   then 'X (Twitter)'
        when source ~* 'instagram'                     then 'Instagram'
        when source ~* 'linkedin'                      then 'LinkedIn'
        when source ~* 'youtube'                       then 'YouTube'
        else source
      end as source_name
    from v
  )
  select json_build_object(
    'views',          (select count(*) from v),
    'visitors',       (select count(distinct visitor_id) from v),
    'today_views',    (select count(*) from today),
    'today_visitors', (select count(distinct visitor_id) from today),
    'from_google',    (select count(*) from classified where source_name = 'Google'),
    'daily', (
      select coalesce(json_agg(json_build_object('day', d.day::date, 'views', coalesce(x.views, 0), 'visitors', coalesce(x.visitors, 0)) order by d.day), '[]'::json)
      from generate_series((now() at time zone 'Africa/Kampala')::date - (days - 1), (now() at time zone 'Africa/Kampala')::date, interval '1 day') as d(day)
      left join (select day, count(*) as views, count(distinct visitor_id) as visitors from v group by day) x on x.day = d.day::date
    ),
    'pages', (
      select coalesce(json_agg(p), '[]'::json) from (
        select path, count(*) as views from v group by path order by views desc limit 10
      ) p
    ),
    'sources', (
      select coalesce(json_agg(s), '[]'::json) from (
        select source_name as name, count(*) as views from classified group by source_name order by views desc limit 8
      ) s
    ),
    'devices', (
      select coalesce(json_agg(dv), '[]'::json) from (
        select coalesce(device, 'unknown') as name, count(*) as views from v group by 1 order by views desc
      ) dv
    ),
    'languages', (
      select coalesce(json_agg(l), '[]'::json) from (
        select coalesce(lang, 'en') as name, count(*) as views from v group by 1 order by views desc
      ) l
    )
  );
$$;

revoke execute on function traffic_stats(int) from public, anon;
grant execute on function traffic_stats(int) to authenticated;
