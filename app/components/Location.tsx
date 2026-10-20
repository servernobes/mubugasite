"use client";
import { useState } from "react";

type Branch = {
  id: string;
  name: string;
  type: string;
  address: string | null;
  postal: string | null;
  phone1: string | null;
  phone2: string | null;
  email: string | null;
  hours: string | null;
  map_embed_src: string | null;
};

interface Props { branches: Branch[] }

export default function Location({ branches }: Props) {
  const [activeId, setActiveId] = useState(branches[0]?.id ?? "");
  const branch = branches.find((b) => b.id === activeId) ?? branches[0];

  if (!branches.length) return null;

  const isMain = (b: Branch) => b.type === "Main";

  return (
    <section id="branches" className="section-pad bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="section-label">Branches &amp; Offices</span>
          <h2 className="section-title">Find Us</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
            We have offices in Kisoro District. Select a branch to see its location on the map.
          </p>
        </div>

        {/* Branch selector */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {branches.map((b) => (
            <button key={b.id} onClick={() => setActiveId(b.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                activeId === b.id
                  ? "bg-[#001E5A] text-white border-[#001E5A]"
                  : "bg-white text-[#001E5A] border-[#E2E2EA] hover:border-[#001E5A]"
              }`}>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {b.name}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                activeId === b.id
                  ? "bg-white/20 text-white"
                  : isMain(b) ? "bg-[#001E5A]/10 text-[#001E5A]" : "bg-[#D2003C]/10 text-[#A8002E]"
              }`}>{b.type}</span>
            </button>
          ))}
        </div>

        {branch && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Map */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border-2 border-[#E2E2EA] h-64 sm:h-80 lg:h-[380px] shadow-sm">
              {branch.map_embed_src ? (
                <iframe key={activeId} title={`${branch.name} location map`}
                  src={branch.map_embed_src} width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="w-full h-full bg-[#001E5A]/10 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Map not yet configured</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-[#E2E2EA] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-bold text-[#001E5A] text-base">{branch.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isMain(branch) ? "bg-[#001E5A]/10 text-[#001E5A]" : "bg-[#D2003C]/10 text-[#A8002E]"}`}>
                    {branch.type}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {branch.address && (
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <p className="text-gray-700">{branch.address}{branch.postal ? `, ${branch.postal}` : ""}</p>
                    </div>
                  )}
                  {(branch.phone1 || branch.phone2) && (
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <p className="text-gray-700">{[branch.phone1, branch.phone2].filter(Boolean).join(" / ")}</p>
                    </div>
                  )}
                  {branch.email && (
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <a href={`mailto:${branch.email}`} className="text-gray-700 hover:text-[#001E5A] transition-colors">{branch.email}</a>
                    </div>
                  )}
                  {branch.hours && (
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <p className="text-gray-700">{branch.hours}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
