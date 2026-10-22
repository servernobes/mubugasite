"use client";
import { useCallback, useEffect, useState } from "react";
import { LANGUAGES, readLang, setLang } from "./LanguageSwitcher";

// First-visit guided tour of the navbar. Starts automatically once per browser
// (localStorage "tour-done") and can be replayed with the "?" button (fires "start-tour").
// Steps point at elements marked data-tour="…" in Navbar.tsx; desktop and mobile each have
// their own copy, so the visible one is used.

type Step = {
  target?: "language" | "menu" | "theme" | "help";
  title: string;
  body: string;
};

const STEPS: Step[] = [
  { title: "Welcome to Mubuga SACCO", body: "Let us show you around in a few quick steps: how to change the language and where to find what you need." },
  { target: "language", title: "Choose your language", body: "Read this website in English, Rufumbira or Runyakitara. Pick one now, or change it any time with this button." },
  { target: "menu", title: "Find your way", body: "Use the menu for Savings & Loans, Membership, Services (including MSACCO mobile banking), Branches and how to contact us." },
  { target: "theme", title: "Light or dark", body: "Tap here to switch between a light and a dark screen, whichever is easier on your eyes." },
  { target: "help", title: "Need help again?", body: "Tap the ? button any time to replay this tour." },
];

const STORE_KEY = "tour-done";
const PAD = 6;

function visibleTarget(name: string): HTMLElement | null {
  const all = Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${name}"]`));
  return all.find((el) => el.offsetParent !== null && el.getBoundingClientRect().width > 0) ?? null;
}

export default function WelcomeTour() {
  const [step, setStep] = useState<number | null>(null);   // null = closed
  const [rect, setRect] = useState<DOMRect | null>(null);

  const close = useCallback(() => {
    setStep(null);
    try { localStorage.setItem(STORE_KEY, "1"); } catch {}
  }, []);

  // Auto-start on first visit; replay on request from the "?" button
  useEffect(() => {
    let seen = true;
    try { seen = localStorage.getItem(STORE_KEY) === "1"; } catch {}
    const t = seen ? undefined : setTimeout(() => setStep(0), 1200);
    const replay = () => setStep(0);
    window.addEventListener("start-tour", replay);
    return () => { clearTimeout(t); window.removeEventListener("start-tour", replay); };
  }, []);

  // Track where the highlighted element is
  useEffect(() => {
    if (step === null) return;
    const target = STEPS[step].target;
    const measure = () => setRect(target ? visibleTarget(target)?.getBoundingClientRect() ?? null : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); window.removeEventListener("scroll", measure); };
  }, [step]);

  // Esc closes the tour
  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, close]);

  if (step === null) return null;

  const s = STEPS[step];
  const last = step === STEPS.length - 1;
  const hasTarget = !!(s.target && rect);
  const current = readLang();

  // Bubble below the highlighted element, kept inside the screen; centred card when there is no target
  const width = 320;
  const bubbleStyle: React.CSSProperties = hasTarget
    ? {
        top: rect!.bottom + PAD + 12,
        left: Math.min(Math.max(12, rect!.left + rect!.width / 2 - width / 2), window.innerWidth - width - 12),
        width: Math.min(width, window.innerWidth - 24),
      }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: Math.min(360, window.innerWidth - 24) };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      {/* Dimmed backdrop with a spotlight hole around the target */}
      {hasTarget ? (
        <div aria-hidden className="absolute rounded-xl ring-4 ring-accent transition-all duration-300 pointer-events-none"
          style={{
            top: rect!.top - PAD, left: rect!.left - PAD, width: rect!.width + PAD * 2, height: rect!.height + PAD * 2,
            boxShadow: "0 0 0 9999px rgba(10, 18, 32, 0.6)",
          }} />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-[rgba(10,18,32,0.6)]" />
      )}
      <div className="absolute inset-0" onClick={close} />

      {/* Speech bubble */}
      <div className="absolute bg-surface border border-line rounded-2xl shadow-2xl p-5" style={bubbleStyle}>
        {hasTarget && (
          <span aria-hidden className="absolute -top-2 w-4 h-4 rotate-45 bg-surface border-l border-t border-line"
            style={{ left: Math.min(Math.max(16, rect!.left + rect!.width / 2 - (bubbleStyle.left as number) - 8), (bubbleStyle.width as number) - 32) }} />
        )}
        <p className="text-[11px] font-bold uppercase tracking-wider text-accent-ink mb-1">
          Step {step + 1} of {STEPS.length}
        </p>
        <h2 id="tour-title" className="font-extrabold text-brand-ink text-lg leading-snug">{s.title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed mt-1.5">{s.body}</p>

        {/* Language choice right inside the tour */}
        {s.target === "language" && (
          <div className="mt-4 grid gap-2 notranslate" translate="no">
            {LANGUAGES.map((l) => (
              <button key={l.code} type="button"
                onClick={() => { close(); if (l.code !== current) setLang(l.code); }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                  l.code === current ? "border-brand-ink bg-tint text-brand-ink" : "border-line text-ink hover:bg-soft"}`}>
                {l.label}
                {l.code === current && <span className="text-xs font-bold text-accent-ink">Current</span>}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button type="button" onClick={close} className="text-sm font-semibold text-gray-500 hover:text-brand-ink">
            {last ? "Close" : "Skip tour"}
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 rounded-lg border border-line text-sm font-semibold text-brand-ink hover:bg-soft">
                Back
              </button>
            )}
            <button type="button" onClick={() => (last ? close() : setStep(step + 1))}
              className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-bold" autoFocus>
              {step === 0 ? "Start tour" : last ? "Done" : "Next"}
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-accent" : "w-1.5 bg-line"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The "?" button in the navbar that replays the tour */
export function TourButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("start-tour"))}
      aria-label="Help: show me around" title="Help: show me around"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line text-gray-600 hover:text-brand-ink hover:bg-tint transition-colors font-extrabold text-sm">
      ?
    </button>
  );
}
