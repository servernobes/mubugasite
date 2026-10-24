"use client";
import { useState } from "react";
import { useConsent } from "@/lib/consent";

// Google Maps frame that respects the cookie choice: loads straight away with "Accept all" or
// "Accept essential"; after "Reject" (or before answering) it shows a "Show map" button.
export default function MapEmbed({ src, title, directions }: { src: string; title: string; directions: string }) {
  const consent = useConsent();
  const [clicked, setClicked] = useState(false);

  if (consent === "all" || consent === "essential" || clicked) {
    return (
      <iframe src={src} title={title} width="100%" height="100%"
        style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    );
  }

  return (
    <div className="w-full h-full bg-tint flex flex-col items-center justify-center text-center gap-3 p-5">
      <svg className="w-10 h-10 text-brand-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
      <button type="button" onClick={() => setClicked(true)}
        className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-bold transition-colors">
        Show map
      </button>
      <p className="text-gray-500 text-xs max-w-xs">
        Loads Google Maps, which may set its own cookies.{" "}
        <a href={directions} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-ink hover:underline">Open in Google Maps</a>
      </p>
    </div>
  );
}
