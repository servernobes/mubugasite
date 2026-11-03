import Link from "next/link";
import { FAQ_GROUPS, HOME_FAQS, type Faq } from "@/lib/faqs";

// Questions and answers live in lib/faqs.ts. Rendered on the server (no JavaScript needed), so Google can read
// them and the translator translates them. <details> opens and closes each answer.

function FaqItem({ f }: { f: Faq }) {
  return (
    <details className="group">
      <summary className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 cursor-pointer list-none bg-surface hover:bg-tint transition-colors [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-brand-ink text-sm">{f.q}</span>
        <svg className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div className="px-4 sm:px-6 pb-5 pt-1 bg-tint">
        <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
        {f.link && (
          <Link href={f.link.href} className="inline-flex items-center gap-1 mt-2.5 text-sm font-semibold text-accent-ink hover:underline">
            {f.link.label}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        )}
      </div>
    </details>
  );
}

function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border border-line rounded-xl overflow-hidden">
      {items.map((f) => <FaqItem key={f.q} f={f} />)}
    </div>
  );
}

/** Homepage: the most asked questions, with a link to the full list. `all` shows every question by topic (FAQs page). */
export default function FAQ({ all = false }: { all?: boolean }) {
  if (!all) {
    return (
      <section className="section-pad bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-label">Help</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <FaqList items={HOME_FAQS} />
          <div className="text-center mt-6">
            <Link href="/faqs" className="inline-block border-2 border-brand-ink text-brand-ink hover:bg-brand hover:text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
              See all FAQs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Jump to a topic */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FAQ_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`}
              className="text-xs font-semibold text-gray-600 hover:text-brand-ink border border-line hover:border-brand-ink/30 px-3 py-1.5 rounded-full transition-colors">
              {g.title}
            </a>
          ))}
        </div>
        <div className="space-y-10">
          {FAQ_GROUPS.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-28">
              <h2 className="font-extrabold text-brand-ink text-lg sm:text-xl mb-4">{g.title}</h2>
              <FaqList items={g.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
