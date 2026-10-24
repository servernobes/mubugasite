import { cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";
import SocialLinks, { SOCIAL_KEYS } from "./SocialLinks";
import { getHomePhotos } from "./HomePhotos";
import { CookieSettingsLink } from "./CookieBanner";

// Contact details and social links (social_*, e.g. X and TikTok) come from site_settings, edited in Admin → Site Text & Info.

export default async function Footer() {
  "use cache";
  cacheTag("site-settings", "cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();

  const [{ data: settingsData }, photos] = await Promise.all([
    supabase.from("site_settings").select("key, value")
      .in("key", ["address", "pobox", "phone_primary", "phone_secondary", "email", ...SOCIAL_KEYS]),
    // Footer background: Admin → Homepage Photos → Footer Photo, otherwise a slider photo
    getHomePhotos(["footer", "hero"]),
  ]);
  const footerPhoto = photos.footer ?? photos.hero ?? null;

  const s: Record<string, string> = {};
  (settingsData ?? []).forEach((r) => { s[r.key] = r.value; });

  const address  = s.address         ?? "Nyakinama Sub-county, Kisoro District, Uganda";
  const pobox    = s.pobox           ?? "P.O. Box 99, Kisoro, Uganda";
  const phone1   = s.phone_primary   ?? "0394 841 360";
  const phone2   = s.phone_secondary ?? "0394 845 526";
  const email    = s.email           ?? "mubugasacco@gmail.com";

  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      {/* Photo shows through at about 50% under the brand colour; a light dark layer keeps the text readable */}
      {footerPhoto && (
        <>
          <Image src={footerPhoto.storage_url} alt="" fill sizes="100vw" className="object-cover" aria-hidden />
          <div aria-hidden className="absolute inset-0 bg-brand/50" />
          <div aria-hidden className="absolute inset-0 bg-black/30" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/musacco-logo.png" alt="Mubuga SACCO" width={128} height={128}
                className="h-16 w-auto rounded-xl bg-white p-1.5"/>
              <div>
                <p className="font-extrabold text-base leading-tight">Mubuga SACCO Ltd</p>
                <p className="text-white/50 text-xs">Kisoro, Uganda</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              A member-owned savings and credit cooperative serving Nyakinama Sub-county and the wider Kisoro District community.
            </p>
            <p className="text-gold text-xs font-semibold italic">&ldquo;Development Through Rural Saving&rdquo;</p>
            <SocialLinks links={s} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ["About Us",        "/about"],
                ["Membership",      "/membership"],
                ["Savings & Loans", "/products"],
                ["Branches",        "/branches"],
                ["Contact",         "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white/60 text-sm whitespace-pre-line">{address}{"\n"}{pobox}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-white/60 text-sm whitespace-pre-line">{phone1}{"\n"}{phone2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${email}`} className="text-white/60 text-sm hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Mubuga SACCO Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <CookieSettingsLink className="hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
