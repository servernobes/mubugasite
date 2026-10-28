"use cache";
import { cacheTag } from "next/cache";
import ProductList from "../components/ProductList";
import LoansIntro from "../components/LoansIntro";
import { createCachedClient } from "@/lib/supabase/cached";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans", "Loan Products", "Loans from Mubuga SACCO in Kisoro: business, agricultural, school fees, development, home improvement, boda boda, medical and emergency loans for members.");

export default async function LoansPage() {
  "use cache";
  cacheTag("cms", "site-settings"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: loans } = await supabase
    .from("loan_products")
    .select("id, slug, title, description")
    .eq("published", true)
    .order("sort_order");

  const { data: rateRow } = await supabase
    .from("site_settings").select("value").eq("key", "interest_rate").maybeSingle();
  const contact = { rate: rateRow?.value ?? "1.8%" };

  const list = loans ?? [];

  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">Credit Products</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Loan Products</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO offers a range of loan products to support members in Kisoro. Contact us to confirm current terms, eligibility and application requirements.
          </p>
        </div>
      </div>

      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Loan terms, interest rates, limits and eligibility requirements must be confirmed with Mubuga SACCO staff before applying.
            </p>
          </div>
          <LoansIntro rate={contact.rate} />
          <ProductList kind="loans" items={list} />
        </div>
      </section>
    </>
  );
}
