"use client";
import { useState } from "react";
import Link from "next/link";

// Expandable product cards — used for both savings and loan products.
type Product = { id: string; slug: string; title: string; description: string };

const ICONS = {
  savings: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
  loans:   "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const COPY = {
  savings: { href: "/savings", more: "Click below to view full details, eligibility and how to apply for this savings account.", cta: "Enquire About Savings", empty: "Savings products coming soon." },
  loans:   { href: "/loans",   more: "Click below to view full details, eligibility requirements, documents needed and how to apply.", cta: "Enquire About Loans", empty: "Loan products coming soon." },
};

export default function ProductList({ kind, items }: { kind: "savings" | "loans"; items: Product[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const copy = COPY[kind];

  return (
    <>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">{copy.empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <div key={p.id}
                className={`bg-tint rounded-xl border transition-all ${
                  isOpen ? "border-brand-ink/40 shadow-md" : "border-line hover:border-brand-ink/30"
                }`}>
                <button onClick={() => setExpanded(isOpen ? null : p.id)} className="w-full text-left p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[kind]}/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brand-ink text-sm sm:text-base mb-1">{p.title}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{p.description}</p>
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
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-line pt-3 sm:pt-4">
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{copy.more}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Link href={`${copy.href}/${p.slug}`}
                        className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg transition-colors">
                        View full details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </Link>
                      <Link href={`/contact?enquiry=${kind}`}
                        className="inline-flex items-center justify-center text-sm font-semibold text-brand-ink border border-brand-ink/30 hover:bg-brand/5 px-4 py-2 rounded-lg transition-colors">
                        Enquire
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-5 sm:mt-6">
        <Link href={`/contact?enquiry=${kind}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-brand hover:bg-brand-hover px-4 sm:px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start">
          {copy.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>
    </>
  );
}
