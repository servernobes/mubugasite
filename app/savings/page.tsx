"use cache";
import { cacheTag } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";

export const metadata: Metadata = { title: "Savings Products" };

export default async function SavingsPage() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: products } = await supabase
    .from("savings_products")
    .select("id, slug, title, description")
    .eq("published", true)
    .order("sort_order");

  const list = products ?? [];

  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">Savings Products</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Make Saving Part of Your Future</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO offers a range of savings accounts to suit different needs. Visit our Nyakinama office to open an account.
          </p>
        </div>
      </div>

      <section className="section-pad bg-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Interest rates, minimum balances and account terms must be confirmed with Mubuga SACCO staff.
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-line p-7 mb-8">
            <h2 className="font-bold text-brand-ink text-xl mb-3">Saving with Mubuga SACCO</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              As a member of Mubuga SACCO, you can open a savings account and begin building your financial future. Regular saving helps you manage unexpected expenses, plan for school fees and work towards larger goals.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your savings with the SACCO also strengthen your position when applying for a loan. Contact us or visit our office to learn how to get started.
            </p>
          </div>
          {list.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-sm">Savings products coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p) => (
                <div key={p.id} className="bg-surface rounded-xl border border-line p-5 hover:shadow-md hover:border-brand-ink/30 transition-all">
                  <div className="w-10 h-10 bg-accent/15 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-brand-ink mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/savings/${p.slug}`} className="text-sm font-semibold text-brand-ink hover:underline">Learn more →</Link>
                    <Link href="/contact?enquiry=savings" className="text-sm font-semibold text-accent-ink hover:underline">Enquire</Link>
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
