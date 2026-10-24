"use client";
import Link from "next/link";
import { resetConsent, setConsent, useConsent } from "@/lib/consent";

// First-visit cookie notice (Uganda Data Protection and Privacy Act 2019: tell visitors and get agreement
// before anything beyond what's essential). Sits above the mobile "Call Us / Enquire Now" bar.
const OPTIONS = [
  // What each choice does is explained in the privacy policy (section 6) and in lib/consent.ts
  { value: "all", label: "Accept all", primary: true },
  { value: "essential", label: "Accept essential", primary: false },
  { value: "reject", label: "Reject", primary: false },
] as const;

export default function CookieBanner() {
  const consent = useConsent();
  if (consent !== null) return null;   // answered already, or not read yet

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie notice"
      className="fixed inset-x-3 sm:inset-x-auto sm:right-5 sm:left-auto bottom-[68px] lg:bottom-5 z-[90] sm:max-w-md bg-surface border border-line rounded-2xl shadow-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-gold/25 text-gold-ink flex items-center justify-center" aria-hidden>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3a9 9 0 109 9 3 3 0 01-3-3 3 3 0 01-3-3 3 3 0 01-3-3zM8.5 10.5h.01M10 15h.01M15 14h.01"/>
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-bold text-brand-ink text-sm">We value your privacy</p>
          <p className="text-gray-600 text-xs leading-relaxed mt-1">
            We use cookies to give you the best experience on our website.{" "}
            <Link href="/privacy-policy#cookies" className="font-semibold text-brand-ink underline-offset-2 hover:underline">Learn more</Link>
          </p>
        </div>
      </div>
      {/* Three choices, one under another (what each does: lib/consent.ts and the privacy policy) */}
      <div className="mt-4 flex flex-col gap-2">
        {OPTIONS.map((o) => (
          <button key={o.value} type="button" onClick={() => setConsent(o.value)}
            className={`w-full px-4 py-2.5 rounded-xl transition-colors ${
              o.primary ? "bg-brand hover:bg-brand-hover text-white" : "border border-line text-brand-ink hover:bg-tint"}`}>
            <span className="block text-sm font-bold text-center">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Footer link that brings the banner back */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}
