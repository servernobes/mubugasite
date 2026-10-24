"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Homepage hero photo slider. Photos come from the admin's "Homepage Photos" page
// (gallery_images rows with section = 'hero').
export type Slide = { id: string; url: string; alt: string; caption: string | null };

const DEFAULT_CAPTION = "Financial services rooted in our community";
const INTERVAL_MS = 6000;      // each photo stays 6 seconds
const SLIDE_MS = 700;          // slide animation length
const CONTROLS_HIDE_MS = 3000; // arrows fade away this long after the last touch

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  const loop = count > 1;

  // Seamless loop: the strip is [copy of last, ...slides, copy of first]. `pos` is the position on that
  // strip (real slides are 1..count). After sliding onto a copy we jump, without animation, to the real
  // slide it copies — so going past the last photo simply continues to the first.
  const [pos, setPos] = useState(loop ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [controls, setControls] = useState(false);   // arrows visible (hover / touch / keyboard)
  const touchX = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const moving = useRef(false);

  const track = loop ? [slides[count - 1], ...slides, slides[0]] : slides;
  const index = loop ? (pos - 1 + count) % count : 0;   // the real slide being shown

  const step = useCallback((dir: 1 | -1) => {
    if (!loop || moving.current) return;    // ignore clicks while a slide is still moving
    moving.current = true;
    setAnimate(true);
    setPos((p) => p + dir);
  }, [loop]);

  const goTo = useCallback((i: number) => {
    if (!loop) return;
    setAnimate(true);
    setPos(i + 1);
  }, [loop]);

  // After a slide finishes: if we're on a copy, jump to the real photo it copies (no animation).
  // Done on a timer rather than the browser's "transition ended" event, which is skipped in background
  // tabs and when animations are turned off (reduce motion) and would leave the slider stuck.
  useEffect(() => {
    const t = setTimeout(() => {
      moving.current = false;
      if (pos === count + 1) { setAnimate(false); setPos(1); }
      else if (pos === 0) { setAnimate(false); setPos(count); }
    }, SLIDE_MS + 50);
    return () => clearTimeout(t);
  }, [pos, count]);

  // Turn animation back on right after an invisible jump
  useEffect(() => {
    if (animate) return;
    const f = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(f);
  }, [animate]);

  // Autoplay (skipped for visitors who prefer reduced motion)
  useEffect(() => {
    if (!loop || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => step(1), INTERVAL_MS);
    return () => clearInterval(t);
  }, [loop, paused, step]);

  // Touch: show the arrows, then hide them a few seconds after the last touch
  const showControlsBriefly = () => {
    setControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControls(false), CONTROLS_HIDE_MS);
  };
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <div className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => { setPaused(true); setControls(true); }}
      onMouseLeave={() => { setPaused(false); setControls(false); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); showControlsBriefly(); }}
      onTouchEnd={(e) => {
        const start = touchX.current; touchX.current = null; setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      }}
      role="region" aria-roledescription="carousel" aria-label="Mubuga SACCO photos" data-hero-slider>

      {/* Sliding strip */}
      {/* Animation is set inline and switched fully off ("none") for the invisible jump back from a copy */}
      <div className="flex h-full motion-reduce:!transition-none" data-animating={animate ? "" : undefined}
        style={{ transform: `translateX(-${pos * 100}%)`, transition: animate ? `transform ${SLIDE_MS}ms ease-out` : "none" }}>
        {track.map((s, i) => {
          const isCopy = loop && (i === 0 || i === count + 1);
          return (
            <div key={`${s.id}-${i}`} className="relative h-full w-full shrink-0" aria-hidden={isCopy || i !== pos}
              aria-roledescription={isCopy ? undefined : "slide"} aria-label={isCopy ? undefined : `${index + 1} of ${count}`}>
              <Image src={s.url} alt={isCopy ? "" : s.alt || s.caption || "Mubuga SACCO"} fill priority={i === (loop ? 1 : 0)}
                loading={i === (loop ? 1 : 0) ? "eager" : "lazy"}   /* first photo is the biggest thing on screen: load it at once */
                unoptimized   /* serve the uploaded file as-is: re-compressing small photos made them blurry */
                className="object-cover" />
            </div>
          );
        })}
      </div>

      {/* Dark fade at the bottom so the white caption reads on any photo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

      {/* Captions, written on the photo. Every slide's caption is in the page from the start and we only
          fade between them — swapping the text instead would leave Google Translate showing the first
          caption forever, because it replaces the text with its own translated copy. */}
      <div className="absolute left-5 right-5 sm:left-8 sm:right-16 bottom-10 sm:bottom-12 max-w-xl">
        <div className="grid">
          {slides.map((s, i) => (
            <p key={s.id} aria-hidden={i !== index} data-hero-caption={i === index ? "active" : ""}
              className={`[grid-area:1/1] self-end text-white font-bold text-lg sm:text-2xl lg:text-3xl leading-snug [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"}`}>
              &ldquo;{s.caption || DEFAULT_CAPTION}&rdquo;
            </p>
          ))}
        </div>
        <p className="text-white/80 text-sm mt-1.5">Mubuga SACCO Ltd · Kisoro</p>
      </div>

      {loop && (
        <>
          {/* Arrows: hidden until the photos are hovered, touched or reached with the keyboard */}
          {([
            { label: "Previous photo", dir: -1, side: "left-3", d: "M15 19l-7-7 7-7" },
            { label: "Next photo", dir: 1, side: "right-3", d: "M9 5l7 7-7 7" },
          ] as const).map((a) => (
            <button key={a.label} type="button" onClick={() => { step(a.dir); showControlsBriefly(); }}
              aria-label={a.label} data-hero-step={a.dir}
              className={`absolute ${a.side} top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow flex items-center justify-center transition-opacity duration-300 focus-visible:opacity-100 ${
                controls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={a.d}/>
              </svg>
            </button>
          ))}

          {/* Dots */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button key={s.id} type="button" onClick={() => goTo(i)} aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
