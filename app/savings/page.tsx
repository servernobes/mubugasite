import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Savings Products" };

const products = [
  { title: "Ordinary Savings", slug: "ordinary", desc: "A regular savings account for all members to deposit and grow their money with Mubuga SACCO." },
  { title: "Voluntary Savings", slug: "voluntary", desc: "A flexible savings account allowing members to deposit amounts according to their means and schedule." },
  { title: "Junior / Minor Savings", slug: "junior", desc: "A savings account designed to help parents and guardians build savings for children." },
  { title: "VSLA Savings", slug: "vsla", desc: "Village savings and lending association accounts for members saving as part of a group." },
  { title: "School Fees Collection Account", slug: "school-fees-collection", desc: "A dedicated account to help families plan and accumulate funds for school fee payments." },
];

export default function SavingsPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Savings Products</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">Make Saving Part of Your Future</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO offers a range of savings accounts to suit different needs. Start saving today — visit our Nyakinama office to open an account.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Interest rates, minimum balances and account terms must be confirmed with Mubuga SACCO staff. Do not open accounts based on unverified information.
            </p>
          </div>

          {/* Intro */}
          <div className="bg-white rounded-xl border border-[#E2E2EA] p-7 mb-8">
            <h2 className="font-bold text-[#001E5A] text-xl mb-3">Saving with Mubuga SACCO</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              As a member of Mubuga SACCO, you can open a savings account and begin building your financial future. Regular saving — even in small amounts — helps you manage unexpected expenses, plan for school fees and work towards larger goals.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your savings with the SACCO also strengthen your position when applying for a loan. Contact us or visit our office to learn how to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div key={p.slug} className="bg-white rounded-xl border border-[#E2E2EA] p-5 hover:shadow-md hover:border-[#001E5A]/30 transition-all">
                <div className="w-10 h-10 bg-[#D2003C]/15 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#D2003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#001E5A] mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex gap-3">
                  <Link href={`/savings/${p.slug}`} className="text-sm font-semibold text-[#001E5A] hover:underline">Learn more →</Link>
                  <Link href="/contact?enquiry=savings" className="text-sm font-semibold text-[#D2003C] hover:underline">Enquire</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
