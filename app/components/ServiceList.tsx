"use client";
import { useState, type ReactNode } from "react";

// Expandable service cards, same look as the savings/loan lists (ProductList).
// Each item's `details` is rendered on the server and passed in, so this file only handles open/close.
export type ServiceItem = { id: string; title: string; description: string; icon: string; details: ReactNode };

export default function ServiceList({ items, openFirst = false }: { items: ServiceItem[]; openFirst?: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(openFirst ? items[0]?.id ?? null : null);

  return (
    <div className="space-y-3">
      {items.map((s) => {
        const isOpen = expanded === s.id;
        return (
          <div key={s.id} id={s.id}
            className={`scroll-mt-28 bg-tint rounded-xl border transition-all ${
              isOpen ? "border-brand-ink/40 shadow-md" : "border-line hover:border-brand-ink/30"
            }`}>
            <button onClick={() => setExpanded(isOpen ? null : s.id)} aria-expanded={isOpen}
              className="w-full text-left p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon}/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-brand-ink text-sm sm:text-base mb-1">{s.title}</h2>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand-ink"
                }`}>
                  <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
                  </svg>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-line pt-4">
                {s.details}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
