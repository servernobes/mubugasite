import Link from "next/link";

interface LoanDetailProps {
  title: string;
  tagline: string;
  description: string;
  purpose: string[];
  eligibility: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
}

export default function LoanDetailTemplate({ title, tagline, description, purpose, eligibility, documents, faqs }: LoanDetailProps) {
  return (
    <>
      {/* Page hero */}
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/loans" className="inline-flex items-center gap-1 text-white/50 text-xs mb-4 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            All Loan Products
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{title}</h1>
          <p className="text-[#D2003C] mt-2 font-medium text-sm sm:text-base">{tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* ── Sidebar (shows at top on mobile, right column on lg) ── */}
          <aside className="lg:col-span-1 lg:order-2 space-y-5">
            {/* Enquiry CTA */}
            <div className="bg-[#001E5A] rounded-2xl p-5 sm:p-6 text-white">
              <h3 className="font-bold text-base sm:text-lg mb-2">Interested in This Loan?</h3>
              <p className="text-white/70 text-sm mb-4">Contact us to find out more about eligibility, documents and the application process.</p>
              <Link href="/contact?enquiry=loans"
                className="block text-center bg-[#D2003C] hover:bg-[#A8002E] text-white font-bold py-3 rounded-lg transition-colors text-sm">
                Enquire Now
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

            {/* Calculator link */}
            <div className="bg-[#FAFAF5] border border-[#E2E2EA] rounded-xl p-4 sm:p-5">
              <h4 className="font-bold text-[#001E5A] mb-1.5 text-sm">Estimate Repayments</h4>
              <p className="text-gray-500 text-xs mb-3">Use our loan calculator for an indicative repayment estimate.</p>
              <Link href="/#calculator" className="block text-center border border-[#001E5A] text-[#001E5A] text-sm font-semibold py-2 rounded-lg hover:bg-[#001E5A] hover:text-white transition-colors">
                Open Calculator
              </Link>
            </div>

            {/* Other loans */}
            <div className="bg-white border border-[#E2E2EA] rounded-xl p-4 sm:p-5">
              <h4 className="font-bold text-[#001E5A] mb-3 text-sm">Other Loan Products</h4>
              <ul className="space-y-1.5">
                {["Business / Commercial Loan","Agricultural Loan","School Fees Loan","Development Loan","Home Improvement Loan","Boda Boda Loan","Medical Loan","Emergency Loan"].map((l) => (
                  <li key={l}>
                    <Link href={`/loans/${l.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}
                      className="text-sm text-gray-600 hover:text-[#001E5A] hover:underline">
                      {l}
                    </Link>
                  </li>
                ))}
                <li><Link href="/loans" className="text-sm text-[#D2003C] font-semibold hover:underline">View all →</Link></li>
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
              <h3 className="font-bold text-[#001E5A] text-base sm:text-lg mb-3">Intended Purpose</h3>
              <ul className="space-y-2">
                {purpose.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-[#D2003C] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#001E5A] text-base sm:text-lg mb-3">Eligibility Requirements</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-4">
                <p className="text-amber-700 text-xs">Eligibility criteria must be confirmed with Mubuga SACCO staff. The information below is indicative only.</p>
              </div>
              <ul className="space-y-2">
                {eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-[#001E5A] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#001E5A] text-base sm:text-lg mb-3">Typical Documents Required</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-4">
                <p className="text-amber-700 text-xs">Exact documentation requirements must be confirmed with SACCO staff before applying.</p>
              </div>
              <ul className="space-y-2">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAFAF5] border border-[#E2E2EA] rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-[#001E5A] mb-3 text-sm sm:text-base">Interest Rate & Repayment Terms</h3>
              <div className="flex items-center gap-3 bg-[#001E5A] rounded-lg px-4 py-2.5 mb-3">
                <span className="bg-[#D2003C] text-white text-xs font-black px-2 py-0.5 rounded shrink-0">NB</span>
                <p className="text-white font-bold text-sm">All loans: <span className="text-[#FFE100]">1.8% per month</span> on reducing balance.</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Contact the office directly to confirm your specific repayment schedule, loan limit and any applicable fees before applying.
              </p>
            </div>

            {faqs.length > 0 && (
              <div>
                <h3 className="font-bold text-[#001E5A] text-base sm:text-lg mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <div key={f.q} className="bg-white border border-[#E2E2EA] rounded-xl p-4">
                      <p className="font-semibold text-[#001E5A] text-sm mb-1">{f.q}</p>
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
