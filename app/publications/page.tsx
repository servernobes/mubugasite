"use cache";
import { cacheTag } from "next/cache";
import type { Metadata } from "next";
import { createCachedClient } from "@/lib/supabase/cached";

export const metadata: Metadata = {
  title: "Reports & Publications",
  description: "Audited financial statements, annual reports, AGM documents and policies of Mubuga SACCO Ltd.",
};

// Same category ids as the admin Documents page (mubug-admin/src/pages/Documents.jsx)
const CATEGORIES = [
  { id: "audited",   label: "Audited Financial Statements", desc: "Independently audited books of account." },
  { id: "annual",    label: "Annual Reports",               desc: "Yearly reports on performance and activities." },
  { id: "financial", label: "Financial Reports",            desc: "Quarterly and other periodic financial reports." },
  { id: "agm",       label: "AGM Documents",                desc: "Notices, agendas and minutes of general meetings." },
  { id: "policy",    label: "Policies & Bylaws",            desc: "Governing documents and member policies." },
  { id: "other",     label: "Other Documents",              desc: "Forms, circulars and other publications." },
];

const fmtSize = (bytes: number | null) => {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const fileType = (name: string, url: string) =>
  ((name || url).split("?")[0].split(".").pop() ?? "file").toUpperCase().slice(0, 4);

export default async function PublicationsPage() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data } = await supabase
    .from("documents")
    .select("id, title, category, year, description, file_url, file_name, file_size")
    .eq("published", true)
    .order("year", { ascending: false, nullsFirst: false })
    .order("sort_order");

  const docs = data ?? [];
  const groups = CATEGORIES
    .map((c) => ({ ...c, docs: docs.filter((d) => (CATEGORIES.some((x) => x.id === d.category) ? d.category : "other") === c.id) }))
    .filter((g) => g.docs.length > 0);

  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label">Transparency</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Reports &amp; Publications</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Audited financial statements, annual reports and other official documents of Mubuga SACCO Ltd, published for our members.
          </p>
          {groups.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a key={g.id} href={`#${g.id}`}
                  className="text-xs font-semibold text-gray-600 hover:text-brand-ink border border-line hover:border-brand-ink/30 bg-surface px-3 py-1.5 rounded-full transition-colors">
                  {g.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="section-pad bg-tint">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          {groups.length === 0 && (
            <p className="text-center text-gray-400 py-16 text-sm">No documents have been published yet. Please check back soon.</p>
          )}

          {groups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="section-title !text-xl sm:!text-2xl">{g.label}</h2>
              <p className="text-gray-500 text-sm mt-3 mb-5">{g.desc}</p>
              <div className="bg-surface rounded-2xl border border-line divide-y divide-line overflow-hidden">
                {g.docs.map((d) => (
                  <div key={d.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-11 h-12 shrink-0 rounded-lg bg-accent/10 text-accent-ink flex flex-col items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span className="text-[8px] font-black mt-0.5">{fileType(d.file_name, d.file_url)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-brand-ink text-sm sm:text-base leading-snug">{d.title}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {[d.year, fmtSize(d.file_size)].filter(Boolean).join(" · ")}
                        </p>
                        {d.description && <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{d.description}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 sm:ml-auto">
                      <a href={d.file_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-line text-brand-ink hover:bg-tint text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                        View
                      </a>
                      <a href={`${d.file_url}?download=${encodeURIComponent(d.file_name || d.title)}`}
                        className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="text-center text-gray-500 text-xs">
            Need a document that isn&apos;t listed here? Contact the SACCO office and we&apos;ll help you.
          </p>
        </div>
      </section>
    </>
  );
}
