import Link from "next/link";

interface SavingsDetailProps {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  suitableFor: string[];
  faqs: { q: string; a: string }[];
}

export default function SavingsDetailTemplate({ title, tagline, description, features, suitableFor, faqs }: SavingsDetailProps) {
  return (
    <>
      {/* Page hero */}
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/savings" className="inline-flex items-center gap-1 text-gray-500 text-xs mb-4 hover:text-brand-ink transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            All Savings Products
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink">{title}</h1>
          <p className="text-accent-ink mt-2 font-medium text-sm sm:text-base">{tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1 lg:order-2 space-y-5">
            <div className="bg-brand rounded-2xl p-5 sm:p-6 text-white">
              <h3 className="font-bold text-base sm:text-lg mb-2">Open This Account</h3>
              <p className="text-white/70 text-sm mb-4">Visit our office or contact us to enquire about opening this savings account.</p>
              <Link href="/contact?enquiry=savings"
                className="block text-center bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors text-sm">
                Make an Enquiry
              </Link>
              <div className="mt-4 space-y-2 text-sm text-white/60">
                <a href="tel:0775364011" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  0394 841 360
                </a>
                <a href="tel:0705472884" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  0394 845 526
                </a>
              </div>
            </div>

            <div className="bg-surface border border-line rounded-xl p-4 sm:p-5">
              <h4 className="font-bold text-brand-ink mb-3 text-sm">Other Savings Products</h4>
              <ul className="space-y-1.5">
                {["Ordinary Savings","Voluntary Savings","Junior / Minor Savings","VSLA Savings","School Fees Collection"].map((s) => (
                  <li key={s}>
                    <Link href={`/savings/${s.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}
                      className="text-sm text-gray-600 hover:text-brand-ink hover:underline">
                      {s}
                    </Link>
                  </li>
                ))}
                <li><Link href="/savings" className="text-sm text-accent-ink font-semibold hover:underline">View all →</Link></li>
              </ul>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="lg:col-span-2 lg:order-1 space-y-8 sm:space-y-10">
            <div>
              <h2 className="section-title mb-3 sm:mb-4">Product Overview</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
            </div>

            <div>
              <h3 className="font-bold text-brand-ink text-base sm:text-lg mb-3">Key Features</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-4">
                <p className="text-amber-700 text-xs">Interest rates, minimum deposits and account terms must be confirmed with SACCO staff.</p>
              </div>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-brand-ink text-base sm:text-lg mb-3">Suitable For</h3>
              <ul className="space-y-2">
                {suitableFor.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-brand-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-tint border border-line rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-brand-ink mb-2 text-sm sm:text-base">How to Open This Account</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Visit the Mubuga SACCO office at Nyakinama Sub-county, Kisoro District. Our staff will guide you through the requirements. Do not attempt to open accounts through unverified channels.
              </p>
            </div>

            {faqs.length > 0 && (
              <div>
                <h3 className="font-bold text-brand-ink text-base sm:text-lg mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <div key={f.q} className="bg-surface border border-line rounded-xl p-4">
                      <p className="font-semibold text-brand-ink text-sm mb-1">{f.q}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
