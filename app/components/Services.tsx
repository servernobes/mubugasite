import Link from "next/link";

const loans = [
  { title: "Business / Commercial Loan", href: "/loans/business", desc: "Finance for businesses, traders, shops and commercial enterprises to grow their operations.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "Agricultural Loan", href: "/loans/agricultural", desc: "Finance for crop production, farm inputs and agricultural activities. Includes a 3-month grace period.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
  { title: "School Fees Loan", href: "/loans/school-fees", desc: "Help families meet education costs for children at school or university.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { title: "Development Loan", href: "/loans/development", desc: "Finance for productive development activities to improve livelihoods and community progress.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { title: "Home Improvement Loan", href: "/loans/home-improvement", desc: "Finance renovation, construction and development of your family home.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Boda Boda Loan", href: "/loans/boda-boda", desc: "Financing for boda boda operators to acquire or maintain their motorcycles.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Medical Loan", href: "/loans/medical", desc: "Access funds to meet urgent medical and healthcare expenses for your family.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { title: "Emergency Loan", href: "/loans/emergency", desc: "Fast access to funds for urgent and immediate financial emergencies.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
];

const savings = [
  { title: "Ordinary Savings", href: "/savings/ordinary", desc: "A regular savings account for all members to grow their money safely." },
  { title: "Voluntary Savings", href: "/savings/voluntary", desc: "Flexible savings allowing members to deposit amounts of their choice." },
  { title: "Junior / Minor Savings", href: "/savings/junior", desc: "A savings account designed to build financial habits for children." },
  { title: "VSLA Savings", href: "/savings/vsla", desc: "Village savings and lending association accounts for group savers." },
  { title: "School Fees Collection", href: "/savings/school-fees-collection", desc: "Dedicated account to help families plan and save for school fees." },
];

export default function Services() {
  return (
    <>
      {/* Loans */}
      <section id="loans" className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Credit Products</span>
              <h2 className="section-title">Financing to Help You Move Forward</h2>
            </div>
            <Link href="/loans" className="text-sm font-semibold text-[#001E5A] hover:underline shrink-0">
              View all loans →
            </Link>
          </div>

          {/* Interest rate banner */}
          <div className="bg-[#001E5A] rounded-xl px-5 py-4 mb-6 flex items-center gap-3 flex-wrap">
            <div className="bg-[#D2003C] rounded-lg px-3 py-1.5 shrink-0">
              <p className="text-white text-xs font-black uppercase tracking-wider">NB</p>
            </div>
            <p className="text-white font-bold text-sm sm:text-base">
              All loans at <span className="text-[#FFE100]">1.8% per month</span> on reducing balance.
            </p>
            <a href="/contact?enquiry=loans" className="ml-auto shrink-0 bg-[#D2003C] hover:bg-[#A8002E] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
              Apply Now
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loans.map((l) => (
              <div key={l.title} className="bg-white rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all group">
                <div className="w-10 h-10 bg-[#001E5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={l.icon}/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{l.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{l.desc}</p>
                <Link href={l.href} className="text-sm font-semibold text-[#D2003C] hover:underline group-hover:text-[#001E5A] transition-colors">
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agricultural feature */}
      <section className="section-pad bg-[#001E5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="bg-[#0F2470] rounded-2xl h-52 sm:h-64 flex items-center justify-center order-2 md:order-1">
            <div className="text-center text-white/30">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
              </svg>
              <p className="text-sm">Add farming photograph</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block text-[#D2003C] text-xs font-bold uppercase tracking-widest mb-3">Agricultural Finance</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 md:mb-5">
              Supporting Farmers.<br />Strengthening Livelihoods.
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Agriculture is the backbone of many households in Kisoro. Mubuga SACCO offers an agricultural loan product to help eligible members finance farm-related activities. Contact us to enquire about eligibility and terms.
            </p>
            <Link href="/loans/agricultural"
              className="inline-flex items-center gap-2 bg-[#D2003C] hover:bg-[#A8002E] text-white font-bold px-6 py-3 rounded-lg transition-colors">
              Enquire About Agricultural Loans
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Savings */}
      <section id="savings" className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Savings Products</span>
              <h2 className="section-title">Make Saving Part of Your Future</h2>
            </div>
            <Link href="/savings" className="text-sm font-semibold text-[#001E5A] hover:underline shrink-0">
              View all savings →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savings.map((s) => (
              <div key={s.title} className="bg-[#FAFAF5] rounded-xl border border-[#E2E2EA] p-5 hover:shadow-sm hover:border-[#001E5A]/30 transition-all">
                <div className="w-10 h-10 bg-[#FFE100]/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-sm font-semibold text-[#001E5A] hover:underline">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
