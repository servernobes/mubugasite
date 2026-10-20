"use cache";
import type { Metadata } from "next";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";

export const metadata: Metadata = { title: "Branches & Offices" };

export default async function BranchesPage() {
  "use cache";
  const supabase = createCachedClient();
  const { data: branches } = await supabase
    .from("branches")
    .select("id, name, type, address, postal, phone1, phone2, email, hours, map_embed_src, note")
    .eq("confirmed", true)
    .order("name");

  const list = branches ?? [];

  const typeStyle = (type: string) => ({
    badge:       type === "Main" ? "bg-[#001E5A]/10 text-[#001E5A]" : "bg-[#D2003C]/10 text-[#A8002E]",
    border:      type === "Main" ? "border-l-[#001E5A]" : "border-l-[#D2003C]",
  });

  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Locations</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">Branches &amp; Offices</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO has offices in Kisoro District. Visit us during working hours or call ahead.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {list.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-sm">Branch information coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {list.map((b) => {
                const { badge, border } = typeStyle(b.type);
                return (
                  <div key={b.id} className={`bg-white rounded-xl border-l-4 ${border} border border-[#E2E2EA] p-6`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-[#001E5A] rounded-lg p-2.5 shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#001E5A] text-lg">{b.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badge}`}>{b.type}</span>
                    </div>
                    {b.note && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 bg-[#FAFAF5] rounded-lg px-3 py-2.5 border border-[#E2E2EA]">
                        {b.note}
                      </p>
                    )}
                    <div className="space-y-2.5 text-sm">
                      {b.address && (
                        <div className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <p className="text-gray-700">{b.address}{b.postal ? `, ${b.postal}` : ""}</p>
                        </div>
                      )}
                      {(b.phone1 || b.phone2) && (
                        <div className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                          <p className="text-gray-700">{[b.phone1, b.phone2].filter(Boolean).join(" · ")}</p>
                        </div>
                      )}
                      {b.email && (
                        <div className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          <a href={`mailto:${b.email}`} className="text-gray-700 hover:text-[#001E5A] transition-colors">{b.email}</a>
                        </div>
                      )}
                      {b.hours && (
                        <div className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <p className="text-gray-700">{b.hours}</p>
                        </div>
                      )}
                    </div>
                    {b.map_embed_src && (
                      <div className="mt-5 rounded-xl overflow-hidden h-40 border border-[#E2E2EA]">
                        <iframe src={b.map_embed_src} title={`${b.name} map`}
                          width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#001E5A] hover:bg-[#D2003C] text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
