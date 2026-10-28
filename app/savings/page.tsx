"use cache";
import { cacheTag } from "next/cache";
import ProductList from "../components/ProductList";
import { createCachedClient } from "@/lib/supabase/cached";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings", "Savings Products", "Savings accounts at Mubuga SACCO in Kisoro: ordinary, voluntary, fixed deposit, junior, individual, group and institutional accounts.");

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

      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Interest rates, minimum balances and account terms must be confirmed with Mubuga SACCO staff.
            </p>
          </div>
          <div className="bg-tint rounded-xl border border-line p-5 sm:p-6 mb-5 sm:mb-6">
            <h2 className="font-bold text-brand-ink text-base sm:text-lg mb-2">Saving with Mubuga SACCO</h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Open a savings account and begin building your financial future. Regular saving helps you manage unexpected expenses,
              plan for school fees and work towards larger goals. Your savings also strengthen your position when applying for a loan.
            </p>
          </div>
          <ProductList kind="savings" items={list} />
        </div>
      </section>
    </>
  );
}
