"use client";
import Link from "next/link";

// Sticky bottom bar on mobile — key for small Android screens
export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface border-t border-line shadow-lg">
      <div className="grid grid-cols-2 divide-x divide-line">
        <a
          href="tel:0775364011"
          className="flex items-center justify-center gap-2 py-3.5 text-brand-ink font-bold text-sm active:bg-tint transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 py-3.5 bg-accent text-white font-bold text-sm active:bg-accent-hover transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Enquire Now
        </Link>
      </div>
    </div>
  );
}
