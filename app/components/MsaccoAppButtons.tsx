// Official MSACCO app (by FutureLink Technologies Ltd, Kampala) — store links used across the site.
export const MSACCO_APP = {
  android: "https://play.google.com/store/apps/details?id=com.fltug.msacco.msaccoapp",
  ios: "https://apps.apple.com/app/msacco/id6741559560",
};

const ANDROID_ICON = "M3.6 2.3c-.4.2-.6.6-.6 1.1v17.2c0 .5.2.9.6 1.1l9.6-9.7-9.6-9.7zm10.7 10.8l2.6 2.6-11.3 6.4 8.7-9zm0-2.2L5.6 1.9l11.3 6.4-2.6 2.6zm3.7-2.1l3 1.7c.8.5.8 1.6 0 2.1l-3 1.7-2.9-2.8 2.9-2.7z";
const APPLE_ICON = "M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-3.9zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z";

/** "Get it on Google Play" / "Download on the App Store" buttons. `light` = for dark backgrounds. */
export default function MsaccoAppButtons({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const base = light
    ? "bg-white/10 hover:bg-white/20 border-white/25 text-white"
    : "bg-ink hover:opacity-90 border-transparent text-surface";
  return (
    <div className={`flex flex-wrap gap-2.5 notranslate ${className}`} translate="no">
      {[
        { href: MSACCO_APP.android, icon: ANDROID_ICON, small: "GET IT ON", big: "Google Play" },
        { href: MSACCO_APP.ios, icon: APPLE_ICON, small: "Download on the", big: "App Store" },
      ].map((b) => (
        <a key={b.big} href={b.href} target="_blank" rel="noopener noreferrer"
          aria-label={`Download the MSACCO app on ${b.big}`}
          className={`inline-flex items-center gap-2.5 border rounded-xl pl-3 pr-4 py-2 transition-colors ${base}`}>
          <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d={b.icon}/></svg>
          <span className="leading-none text-left">
            <span className="block text-[9px] font-semibold tracking-wide opacity-80">{b.small}</span>
            <span className="block text-base font-bold mt-0.5">{b.big}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
