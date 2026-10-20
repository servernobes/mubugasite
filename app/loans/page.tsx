"use cache";
import type { Metadata } from "next";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";

export const metadata: Metadata = { title: "Loan Products" };

export default async function LoansPage() {
  "use cache";
  const supabase = createCachedClient();
  const { data: loans } = await supabase
    .from("loan_products")
    .select("id, slug, title, description, icon_path")
    .eq("published", true)
    .order("sort_order");

  const list = loans ?? [];

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
              <strong>Important:</strong> Loan terms, interest rates, limits and eligibility requirements must be confirmed with Mubuga SACCO staff before applying.
            </p>
          </div>
          {list.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-sm">Loan products coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((l) => (
                <div key={l.id} className="bg-white rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all group">
                  <div className="w-10 h-10 bg-[#001E5A]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={l.icon_path}/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#001E5A] mb-2">{l.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{l.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/loans/${l.slug}`} className="text-sm font-semibold text-[#001E5A] hover:underline">View details →</Link>
                    <Link href="/contact?enquiry=loans" className="text-sm font-semibold text-[#D2003C] hover:underline">Enquire</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
