import { cacheTag } from "next/cache";
import { createCachedClient } from "@/lib/supabase/cached";

export default async function TopBar() {
  "use cache";
  cacheTag("site-settings"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: rows } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["phone_primary", "email", "address", "hours_weekday", "hours_saturday"]);

  const s: Record<string, string> = {};
  (rows ?? []).forEach((r) => { s[r.key] = r.value; });

  const phone    = s.phone_primary   ?? "0394 841 360";
  const email    = s.email           ?? "mubugasacco@gmail.com";
  const address  = s.address         ?? "Nyakinama Sub-county, Kisoro District, Uganda";
  const weekday  = s.hours_weekday   ?? "Mon – Fri: 8:00 AM – 5:00 PM";
  const saturday = s.hours_saturday  ?? "Saturday & Public Holidays: 8:30 AM – 2:00 PM";

  return (
    <div className="hidden md:block bg-tint text-gray-600 text-xs py-2 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 min-w-0">
          <span className="flex items-center gap-1.5 min-w-0">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="truncate">{address}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{weekday} &nbsp;·&nbsp; {saturday}</span>
          </span>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent-ink transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-accent-ink transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
