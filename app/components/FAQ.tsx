"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type FAQ = { id: string; question: string; answer: string };

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    createClient()
      .from("faqs")
      .select("id, question, answer")
      .eq("published", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setFaqs(data); });
  }, []);

  return (
    <section className="section-pad bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="section-label">Help</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        {faqs.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">No FAQs published yet.</p>
        ) : (
          <div className="divide-y divide-line border border-line rounded-xl overflow-hidden">
            {faqs.map((f) => (
              <div key={f.id}>
                <button
                  onClick={() => setOpen(open === f.id ? null : f.id)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left bg-surface hover:bg-tint transition-colors">
                  <span className="font-semibold text-brand-ink text-sm pr-3">{f.question}</span>
                  <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open === f.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {open === f.id && (
                  <div className="px-6 pb-5 bg-tint">
                    <p className="text-gray-600 text-sm leading-relaxed">{f.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
