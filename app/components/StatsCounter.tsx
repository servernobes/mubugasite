"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/sacco-profile";

// "Mubuga SACCO in numbers": each figure counts up from 0 when the row scrolls into view.
// The page is sent with the final numbers (for search engines and if JavaScript is off).
// Numbers are "notranslate" because the translator would otherwise freeze them mid-count.

const DURATION = 1800;

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);   // 0 → 1; 1 = final numbers

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        setProgress(1 - Math.pow(1 - t, 3));   // ease-out
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { observer.disconnect(); run(); }
    }, { threshold: 0.3 });
    setProgress(0);
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((s) => (
        <div key={s.label} className="bg-surface rounded-xl border border-line p-5 sm:p-6 text-center">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tabular-nums notranslate" translate="no">
            {Math.round(s.value * progress).toLocaleString("en-US")}{s.suffix}
          </p>
          <h3 className="mt-2 font-bold text-accent-ink text-sm sm:text-base">{s.label}</h3>
          <p className="mt-1.5 text-gray-600 text-xs sm:text-sm leading-relaxed">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
