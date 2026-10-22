"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { LOAN_DETAILS, SAVINGS_DETAILS, type FAQ } from "@/lib/product-details";

// Savings / loan products as cards: one column on phones, a grid on larger screens.
// "+" opens the card across the full row and shows all of the product's details in place.
type Product = { id: string; slug: string; title: string; description: string };

const ICONS = {
  savings: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
  loans:   "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const COPY = {
  savings: { cta: "Enquire About Savings", empty: "Savings products coming soon." },
  loans:   { cta: "Enquire About Loans",   empty: "Loan products coming soon." },
};

const CHECK = "M5 13l4 4L19 7";

function Bullets({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="font-bold text-brand-ink text-sm mb-2.5">{title}</h4>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-gray-700">
            <svg className="w-4 h-4 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={CHECK}/>
            </svg>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faqs({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;
  return (
    <div>
      <h4 className="font-bold text-brand-ink text-sm mb-2.5">Frequently asked questions</h4>
      <dl className="space-y-2.5">
        {faqs.map((f) => (
          <div key={f.q} className="bg-surface border border-line rounded-lg p-3.5">
            <dt className="font-semibold text-brand-ink text-sm">{f.q}</dt>
            <dd className="text-gray-600 text-sm mt-1 leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Details({ kind, slug, fallback }: { kind: "savings" | "loans"; slug: string; fallback: string }) {
  if (kind === "loans") {
    const d = LOAN_DETAILS[slug];
    if (!d) return <p className="text-gray-600 text-sm leading-relaxed">{fallback}</p>;
    return (
      <div className="space-y-6">
        <div>
          {d.tagline && <p className="text-accent-ink font-semibold text-sm mb-1.5">{d.tagline}</p>}
          <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Bullets title="What it can be used for" items={d.purpose} />
          <Bullets title="Who can apply" items={d.eligibility} />
          <Bullets title="Documents needed" items={d.documents} />
        </div>
        <Faqs faqs={d.faqs} />
      </div>
    );
  }
  const d = SAVINGS_DETAILS[slug];
  if (!d) return <p className="text-gray-600 text-sm leading-relaxed">{fallback}</p>;
  return (
    <div className="space-y-6">
      <div>
        {d.tagline && <p className="text-accent-ink font-semibold text-sm mb-1.5">{d.tagline}</p>}
        <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Bullets title="Features" items={d.features} />
        <Bullets title="Suitable for" items={d.suitableFor} />
      </div>
      <Faqs faqs={d.faqs} />
    </div>
  );
}

export default function ProductList({ kind, items }: { kind: "savings" | "loans"; items: Product[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const copy = COPY[kind];

  const toggle = (id: string) => {
    const opening = expanded !== id;
    setExpanded(opening ? id : null);
    // The opened card moves to its own full-width row; keep it in view
    if (opening) requestAnimationFrame(() => cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">{copy.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 grid-flow-row-dense">
          {items.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <div key={p.id} ref={(el) => { cardRefs.current[p.id] = el; }}
                className={`scroll-mt-28 flex flex-col bg-tint rounded-xl border transition-all ${
                  isOpen ? "md:col-span-2 lg:col-span-3 border-brand-ink/40 shadow-md" : "border-line hover:border-brand-ink/30"
                }`}>
                <button onClick={() => toggle(p.id)} aria-expanded={isOpen} className="w-full grow text-left p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[kind]}/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brand-ink text-sm sm:text-base mb-1">{p.title}</h3>
                        <p className={`text-gray-500 text-xs sm:text-sm leading-relaxed ${isOpen ? "" : "line-clamp-3"}`}>{p.description}</p>
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
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-line pt-5">
                    <Details kind={kind} slug={p.slug} fallback={p.description} />
                    <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Link href={`/contact?enquiry=${kind}`}
                        className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg transition-colors">
                        {kind === "loans" ? "Apply / Enquire" : "Open an account / Enquire"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </Link>
                      <button type="button" onClick={() => toggle(p.id)}
                        className="inline-flex items-center justify-center text-sm font-semibold text-brand-ink border border-brand-ink/30 hover:bg-brand/5 px-4 py-2 rounded-lg transition-colors">
                        Close
                      </button>
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
