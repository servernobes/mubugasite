import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Loan Products" };

const loans = [
  { title: "Business / Commercial Loan", slug: "business", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", desc: "Finance for businesses, traders, shops and commercial enterprises." },
  { title: "Agricultural Loan", slug: "agricultural", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", desc: "Finance for crop production and farm inputs. Includes a 3-month grace period." },
  { title: "School Fees Loan", slug: "school-fees", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13", desc: "Help families meet education costs for children at school or university." },
  { title: "Development Loan", slug: "development", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", desc: "Finance for productive development activities to improve livelihoods." },
  { title: "Home Improvement Loan", slug: "home-improvement", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", desc: "Finance renovation, construction and development of your family home." },
  { title: "Boda Boda Loan", slug: "boda-boda", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", desc: "Finance for boda boda operators to acquire or maintain their motorcycles." },
  { title: "Medical Loan", slug: "medical", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", desc: "Access funds to meet urgent medical and healthcare expenses for your family." },
  { title: "Emergency Loan", slug: "emergency", icon: "M13 10V3L4 14h7v7l9-11h-7z", desc: "Fast access to funds for urgent and immediate financial emergencies." },
];

export default function LoansPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Credit Products</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">Loan Products</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO offers a range of loan products to support members in Kisoro. Contact us to confirm current terms, eligibility and application requirements.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Loan terms, interest rates, limits and eligibility requirements must be confirmed with Mubuga SACCO staff before applying. Information on individual product pages is indicative only.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loans.map((l) => (
              <div key={l.slug} className="bg-white rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all group">
                <div className="w-10 h-10 bg-[#001E5A]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={l.icon}/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{l.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{l.desc}</p>
                <div className="flex gap-3">
                  <Link href={`/loans/${l.slug}`} className="text-sm font-semibold text-[#001E5A] hover:underline">View details →</Link>
                  <Link href="/contact?enquiry=loans" className="text-sm font-semibold text-[#D2003C] hover:underline">Enquire</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
