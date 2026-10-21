"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Homepage hero photo slider. Photos come from the admin's "Homepage Slider" page
// (gallery_images rows with section = 'hero').
export type Slide = { id: string; url: string; alt: string; caption: string | null };

const DEFAULT_CAPTION = "Financial services rooted in our community";
const INTERVAL_MS = 5000;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Autoplay (skipped for visitors who prefer reduced motion)
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(t);
  }, [count, paused]);

  const caption = slides[index]?.caption || DEFAULT_CAPTION;

  return (
    <div className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        const start = touchX.current; touchX.current = null; setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
      role="region" aria-roledescription="carousel" aria-label="Mubuga SACCO photos">

      {/* Sliding track */}
      <div className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={s.id} className="relative h-full w-full shrink-0" aria-hidden={i !== index}
            aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
            <Image src={s.url} alt={s.alt || s.caption || "Mubuga SACCO"} fill priority={i === 0}
              sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Soft shade at the bottom so the caption card reads well on any photo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />

      {/* Caption card */}
      <div className="absolute left-4 right-4 sm:left-5 sm:right-auto sm:max-w-sm bottom-10 bg-surface/90 backdrop-blur rounded-xl border border-line px-5 py-4 shadow-sm">
        <p className="text-brand-ink font-bold text-base sm:text-lg">&ldquo;{caption}&rdquo;</p>
        <p className="text-gray-500 text-sm mt-1">Mubuga SACCO Ltd · Kisoro</p>
      </div>

      {count > 1 && (
        <>
          {/* Arrows */}
          {[
            { label: "Previous photo", step: -1, side: "left-3", d: "M15 19l-7-7 7-7" },
            { label: "Next photo", step: 1, side: "right-3", d: "M9 5l7 7-7 7" },
          ].map((a) => (
            <button key={a.label} type="button" onClick={() => go(index + a.step)} aria-label={a.label}
              className={`absolute ${a.side} top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow flex items-center justify-center transition-colors`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={a.d}/>
              </svg>
            </button>
          ))}

          {/* Dots */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)} aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
