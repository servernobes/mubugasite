"use client";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

// The choice only changes via setLang(), which reloads the page — nothing to subscribe to
const noSubscribe = () => () => {};

// Visitor's language choice. Translation is done by Google Translate (machine translation),
// driven by its "googtrans" cookie; <TranslateLoader/> in the layout runs the engine.
// Rukiga / Runyankore uses Google's Kiga/Rukiga (cgg); Rufumbira uses Google's Kinyarwanda (rw).
export const LANGUAGES = [
  { code: "en",  label: "English",     short: "EN", hint: "Official language" },
  { code: "rw",  label: "Rufumbira",   short: "RF", hint: "Spoken in Kisoro · Bufumbira" },   // Google's Kinyarwanda engine
  { code: "cgg", label: "Rukiga / Runyankore", short: "RK", hint: "Spoken in Kigezi & Ankole" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

// Letter badge colours follow the site theme (brand / accent / highlight)
const BADGE: Record<LangCode, string> = {
  en:  "bg-brand/10 text-brand-ink",
  rw:  "bg-accent/10 text-accent-ink",
  cgg: "bg-gold/25 text-gold-ink",
};

export function readLang(): LangCode {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z]+)/);
  const code = m?.[1];
  return LANGUAGES.some((l) => l.code === code) ? (code as LangCode) : "en";
}

export function setLang(code: LangCode) {
  const host = location.hostname;
  // The cookie may exist for the bare host and for the parent domain — clear/set both
  const domains = ["", `;domain=${host}`, host.includes(".") ? `;domain=.${host.split(".").slice(-2).join(".")}` : ""];
  for (const d of domains) {
    document.cookie = `googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
  if (code !== "en") {
    document.cookie = `googtrans=/en/${code};path=/`;
    document.cookie = `googtrans=/en/${code};path=/;domain=${host}`;
  }
  location.reload();
}

// United Kingdom flag for English. Each copy gets its own clip-path ids (useId) so several flags can share a page.
export function UkFlag({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={className} role="img" aria-label="United Kingdom flag">
      <clipPath id={`${id}s`}><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id={`${id}t`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

// English shows the flag; the local languages show their letters (no flag)
function LangMark({ code, short, size }: { code: LangCode; short: string; size: "sm" | "lg" }) {
  if (code === "en") {
    return size === "sm"
      ? <UkFlag className="w-5 h-3.5 rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] shrink-0" />
      : <span className="w-10 h-10 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center"><UkFlag className="w-7 h-[18px] rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" /></span>;
  }
  return size === "sm"
    ? <span className={`h-5 px-1 rounded-[4px] flex items-center justify-center text-[10px] font-extrabold shrink-0 ${BADGE[code]}`}>{short}</span>
    : <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-extrabold ${BADGE[code]}`}>{short}</span>;
}

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  // Cookie is read in the browser only; the server always renders "en" (no hydration mismatch)
  const lang = useSyncExternalStore(noSubscribe, readLang, () => "en" as LangCode);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click or Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button ref={buttonRef} type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}
        aria-label={`Translator: currently ${current.label}. Change language`}
        className={`group inline-flex items-center gap-1.5 h-9 pl-2.5 pr-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
          open ? "border-brand-ink/40 bg-tint text-brand-ink shadow-sm" : "border-line text-gray-700 hover:text-brand-ink hover:bg-tint"}`}>
        {/* Current language mark (flag / RF / RK, never translated) + the label "Translator", which is
            translated with the rest of the page (and goes through the Rufumbira word swaps) */}
        <span className="notranslate flex" translate="no"><LangMark code={current.code} short={current.short} size="sm" /></span>
        {/* Hidden only on the narrowest phones (under 360px) so the navbar still fits */}
        <span className="whitespace-nowrap max-[359px]:hidden">Translator</span>
        <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Drop-down card: always in the page so it can fade/slide in; hidden from everyone when closed */}
      <div role="listbox" aria-label="Choose your language" aria-hidden={!open}
        className={`z-50 bg-surface border border-line rounded-2xl shadow-xl overflow-hidden transition duration-200 ease-out
          fixed left-4 right-4 top-[80px] sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 origin-top-right ${
          open ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 -translate-y-1 scale-95 invisible pointer-events-none"}`}>
        <div className="px-4 pt-3.5 pb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Choose your language</p>
        </div>

        <div className="px-2 pb-2 notranslate" translate="no">
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button key={l.code} type="button" role="option" aria-selected={active} tabIndex={open ? 0 : -1}
                onClick={() => { setOpen(false); if (!active) setLang(l.code); }}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-colors ${
                  active ? "bg-tint ring-1 ring-brand-ink/15" : "hover:bg-soft"}`}>
                <LangMark code={l.code} short={l.short} size="lg" />
                <span className="flex-1 min-w-0">
                  <span className={`block text-sm ${active ? "font-bold text-brand-ink" : "font-semibold text-ink"}`}>{l.label}</span>
                  <span className="block text-xs text-gray-500 truncate">{l.hint}</span>
                </span>
                {active ? (
                  <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                ) : (
                  <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <p className="px-4 py-2.5 border-t border-line bg-tint text-[11px] leading-snug text-gray-500">
          Automatic translation. If anything is unclear, the English version is official.
        </p>
      </div>
    </div>
  );
}
