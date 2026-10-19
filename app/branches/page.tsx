import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Branches & Offices" };

const branches = [
  {
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
    hours: "Mon – Fri: 8:00 AM – 5:00 PM",
    directions: "https://www.google.com/maps/search/Mubuga+Nyakinama+Kisoro+Uganda",
    note: "Our main office is located in Mubuga village, Nyakinama Sub-county. Ask locally for Mubuga SACCO or call ahead for precise directions.",
  },
  {
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
    hours: "Mon – Fri: 8:00 AM – 5:00 PM",
    directions: "https://www.google.com/maps/search/Kisoro+Bunagana+Road+Stabex+Kisoro",
    note: "Located on the Kisoro–Bunagana road, before the Stabex fuel station. Accessible from Kisoro town centre.",
  },
];

export default function BranchesPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Locations</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">Branches & Offices</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO has two offices in Kisoro District. Visit us during working hours or call ahead on 0394 841 360.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Google Maps embed — Kisoro District overview */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#E2E2EA] mb-8 h-64 sm:h-80 lg:h-[440px]">
            <iframe
              title="Mubuga SACCO — Kisoro District Locations"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3!2d29.675!3d-1.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc28b7b7e3f001%3A0x1234abcd!2sMubuga%2C%20Nyakinama%2C%20Kisoro%2C%20Uganda!5e0!3m2!1sen!2sug!4v1700000000001!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Branch cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {branches.map((b) => (
              <div key={b.name} className={`bg-white rounded-xl border-l-4 ${b.border} border border-[#E2E2EA] p-6`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-[#001E5A] rounded-lg p-2.5 shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#001E5A] text-lg">{b.name}</h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${b.badgeColor}`}>{b.badge}</span>
                </div>

                {/* Note / landmark */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 bg-[#FAFAF5] rounded-lg px-3 py-2.5 border border-[#E2E2EA]">
                  {b.note}
                </p>

                <div className="space-y-2.5 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-gray-600">
                    <svg className="w-4 h-4 text-[#001E5A] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                      <p className="font-medium">{b.address}</p>
                      <p className="text-gray-400 text-xs">{b.district}</p>
                      {b.postal && <p className="text-gray-400 text-xs">{b.postal}</p>}
                    </div>
                  </div>

                  {/* Phones */}
                  <a href={`tel:${b.phone1}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    {b.phone1}
                  </a>
                  {b.phone2 && (
                    <a href={`tel:${b.phone2}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      {b.phone2}
                    </a>
                  )}

                  {/* Email */}
                  <a href={`mailto:${b.email}`} className="flex items-center gap-2.5 text-[#001E5A] font-medium hover:underline">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {b.email}
                  </a>

                  {/* Hours */}
                  <div className="flex items-center gap-2.5 text-gray-500">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {b.hours}
                  </div>
                </div>

                <a href={b.directions} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D2003C] hover:underline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Get directions on Google Maps
                </a>
              </div>
            ))}
          </div>

          {/* Getting there */}
          <div className="bg-white rounded-xl border border-[#E2E2EA] p-6 sm:p-7">
            <h3 className="font-bold text-[#001E5A] text-lg mb-5">Getting to Kisoro</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", title: "From Kabale", desc: "Kisoro is about 90 km from Kabale via the Kabale–Kisoro road. Regular bus and minibus services operate this route." },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Call Ahead", desc: "Call 0394 841 360 before visiting to confirm opening hours and get precise directions to either branch." },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", title: "Location", desc: "Kisoro District is in southwestern Uganda, bordering Rwanda and the DRC. The town sits near the foot of the Virunga volcanoes." },
              ].map((t) => (
                <div key={t.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#001E5A]/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon}/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#001E5A] text-sm mb-1">{t.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-[#001E5A] hover:bg-[#D2003C] text-white font-bold px-8 py-3.5 rounded-lg transition-colors">
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
