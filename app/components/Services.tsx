import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";

export default async function Services() {
  "use cache";
  const supabase = createCachedClient();
  const [{ data: loanData }, { data: savingsData }] = await Promise.all([
    supabase.from("loan_products").select("id, slug, title, description, icon_path").eq("published", true).order("sort_order"),
    supabase.from("savings_products").select("id, slug, title, description").eq("published", true).order("sort_order"),
  ]);

  const loans   = loanData   ?? [];
  const savings = savingsData ?? [];

  return (
    <>
      <section id="loans" className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Credit Products</span>
              <h2 className="section-title">Financing to Help You Move Forward</h2>
            </div>
            <Link href="/loans" className="text-sm font-semibold text-[#001E5A] hover:underline shrink-0">View all loans →</Link>
          </div>
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
              <div key={l.id} className="bg-white rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all group">
                <div className="w-10 h-10 bg-[#001E5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={l.icon_path}/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{l.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{l.description}</p>
                <Link href={`/loans/${l.slug}`} className="text-sm font-semibold text-[#D2003C] hover:underline group-hover:text-[#001E5A] transition-colors">
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              Agriculture is the backbone of many households in Kisoro. Mubuga SACCO offers an agricultural loan product to help eligible members finance farm-related activities.
            </p>
            <Link href="/loans/agricultural" className="inline-flex items-center gap-2 bg-[#D2003C] hover:bg-[#A8002E] text-white font-bold px-6 py-3 rounded-lg transition-colors">
              Enquire About Agricultural Loans
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="savings" className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Savings Products</span>
              <h2 className="section-title">Save with Purpose, Grow with Us</h2>
            </div>
            <Link href="/savings" className="text-sm font-semibold text-[#001E5A] hover:underline shrink-0">View all savings →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savings.map((s) => (
              <div key={s.id} className="bg-[#FAFAF5] rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all group">
                <div className="w-10 h-10 bg-[#D2003C]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#D2003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.description}</p>
                <Link href={`/savings/${s.slug}`} className="text-sm font-semibold text-[#D2003C] hover:underline group-hover:text-[#001E5A] transition-colors">
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
