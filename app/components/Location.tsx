"use client";
import { useState } from "react";

const branches = [
  {
    id: "head",
    name: "Head Office – Mubuga",
    badge: "Main",
    badgeColor: "bg-[#001E5A]/10 text-[#001E5A]",
    border: "border-[#001E5A]",
    address: "Mubuga, Nyakinama Sub-county",
    district: "Kisoro District, Uganda",
    postal: "P.O. Box 99, Kisoro",
    phone1: "0394 841 360",
    phone2: "0394 845 526",
    email: "mubugasacco@gmail.com",
    hours: "Mon–Fri: 8:00 AM – 5:00 PM",
    // Embedded map pinned to Mubuga, Nyakinama, Kisoro
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3!2d29.675!3d-1.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc28b7b7e3f001%3A0x1234abcd!2sMubuga%2C%20Nyakinama%2C%20Kisoro%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000001!5m2!1sen!2sug",
    directions: "https://www.google.com/maps/search/Mubuga+Nyakinama+Kisoro+Uganda",
  },
  {
    id: "town",
    name: "Kisoro Town Branch",
    badge: "Branch",
    badgeColor: "bg-[#D2003C]/10 text-[#A8002E]",
    border: "border-[#D2003C]",
    address: "Kisoro–Bunagana Road, before Stabex",
    district: "Kisoro Town, Kisoro District",
    postal: "",
    phone1: "0394 841 360",
    phone2: "",
    email: "mubugasacco@gmail.com",
    hours: "Mon–Fri: 8:00 AM – 5:00 PM",
    // Embedded map pinned to Kisoro town on Bunagana road
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8!2d29.697!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc291c0000001%3A0xabcdef123456!2sKisoro%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000002!5m2!1sen!2sug",
    directions: "https://www.google.com/maps/search/Kisoro+Bunagana+Road+Stabex+Kisoro+Uganda",
  },
];

export default function Location() {
  const [active, setActive] = useState("head");
  const branch = branches.find((b) => b.id === active)!;

  return (
    <section id="branches" className="section-pad bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="section-label">Branches & Offices</span>
          <h2 className="section-title">Find Us</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
            We have two offices in Kisoro District. Select a branch to see its location on the map.
          </p>
        </div>

        {/* Branch selector tabs */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setActive(b.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                active === b.id
                  ? "bg-[#001E5A] text-white border-[#001E5A]"
                  : "bg-white text-[#001E5A] border-[#E2E2EA] hover:border-[#001E5A]"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {b.name}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${b.badgeColor} ${active === b.id ? "bg-white/20 text-white" : ""}`}>
                {b.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Map with pin */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border-2 border-[#E2E2EA] h-64 sm:h-80 lg:h-[380px] shadow-sm">
            <iframe
              key={active}
              title={`${branch.name} location map`}
              src={branch.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Branch detail card */}
          <div className={`lg:col-span-2 bg-white rounded-2xl border-l-4 ${branch.border} border border-[#E2E2EA] p-5 sm:p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#001E5A] rounded-lg p-2 shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#001E5A] text-sm leading-tight">{branch.name}</h3>
                <span className={`text-xs font-bold ${branch.badgeColor}`}>{branch.badge}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              {/* Address */}
              <div className="flex items-start gap-2.5 text-gray-600">
                <svg className="w-4 h-4 text-[#001E5A] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="font-medium text-[#001E5A]">{branch.address}</p>
                  <p className="text-gray-400 text-xs">{branch.district}</p>
                  {branch.postal && <p className="text-gray-400 text-xs">{branch.postal}</p>}
                </div>
              </div>

              {/* Phone 1 */}
              <a href={`tel:${branch.phone1}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {branch.phone1}
              </a>

              {/* Phone 2 */}
              {branch.phone2 && (
                <a href={`tel:${branch.phone2}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {branch.phone2}
                </a>
              )}

              {/* Email */}
              <a href={`mailto:${branch.email}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {branch.email}
              </a>

              {/* Hours */}
              <div className="flex items-center gap-2.5 text-gray-500">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {branch.hours}
              </div>
            </div>

            {/* Directions */}
            <a href={branch.directions} target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 bg-[#001E5A] hover:bg-[#D2003C] text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors w-full justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
