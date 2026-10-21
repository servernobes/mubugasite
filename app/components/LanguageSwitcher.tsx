"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// The choice only changes via setLang(), which reloads the page — nothing to subscribe to
const noSubscribe = () => () => {};

// Visitor's language choice. Translation is done by Google Translate (machine translation),
// driven by its "googtrans" cookie; <TranslateLoader/> in the layout runs the engine.
// Runyakitara uses Google's Kiga/Rukiga (cgg); Rufumbira uses Google's Kinyarwanda (rw).
export const LANGUAGES = [
  { code: "en",  label: "English",     short: "EN" },
  { code: "rw",  label: "Rufumbira",   short: "RF" },   // Google's Kinyarwanda engine
  { code: "cgg", label: "Runyakitara", short: "RK" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export function readLang(): LangCode {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z]+)/);
  const code = m?.[1];
  return LANGUAGES.some((l) => l.code === code) ? (code as LangCode) : "en";
}

function setLang(code: LangCode) {
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

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  // Cookie is read in the browser only; the server always renders "en" (no hydration mismatch)
  const lang = useSyncExternalStore(noSubscribe, readLang, () => "en" as LangCode);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className={`relative notranslate ${className}`} translate="no">
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}
        title="Choose language"
        className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-line text-gray-600 hover:text-brand-ink hover:bg-tint transition-colors text-xs font-bold">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {current.short}
        <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div role="listbox" className="absolute right-0 top-full mt-2 w-48 bg-surface border border-line rounded-xl shadow-lg py-1 z-50">
          {LANGUAGES.map((l) => (
            <button key={l.code} role="option" aria-selected={l.code === lang}
              onClick={() => { setOpen(false); if (l.code !== lang) setLang(l.code); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-soft ${
                l.code === lang ? "text-brand-ink font-bold" : "text-ink"}`}>
              {l.label}
              {l.code === lang && (
                <svg className="w-4 h-4 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              )}
            </button>
          ))}
          <p className="px-4 pt-2 pb-1.5 mt-1 border-t border-line text-[10px] leading-snug text-gray-400">
            Automatic translation. If anything is unclear, the English version is official.
          </p>
        </div>
      )}
    </div>
  );
}
