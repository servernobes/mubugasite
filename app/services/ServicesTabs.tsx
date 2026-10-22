"use client";
import { useState, type ReactNode } from "react";
import ServiceList, { type ServiceItem } from "../components/ServiceList";

// Tab switcher for the Services page, styled like the Savings | Loans tabs on /products.
// Tab content (intro + items) is built on the server and passed in.
export type ServiceTab = { id: string; label: string; icon: string; intro: ReactNode; items: ServiceItem[] };

export default function ServicesTabs({ tabs }: { tabs: ServiceTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === tab.id} onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
              t.id === tab.id
                ? "bg-brand text-white shadow-sm"
                : "bg-surface text-brand-ink border border-line hover:border-brand-ink/30"
            }`}>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon}/>
            </svg>
            {t.label} ({t.items.length})
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab.intro}
        {/* key resets the open card when switching tabs */}
        <ServiceList key={tab.id} items={tab.items} />
      </div>
    </>
  );
}
