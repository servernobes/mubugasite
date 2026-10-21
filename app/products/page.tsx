"use cache";
import { cacheTag } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";
import ProductsTabs from "./ProductsTabs";

export const metadata: Metadata = {
  title: "Products — Loans & Savings",
  description:
    "Explore all Mubuga SACCO products — savings accounts and loan products designed for members in Kisoro District.",
};

export default async function ProductsPage() {
  "use cache";
  cacheTag("cms", "site-settings"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const [{ data: loanData }, { data: savingsData }] = await Promise.all([
    supabase
      .from("loan_products")
      .select("id, slug, title, description")
      .eq("published", true)
      .order("sort_order"),
    supabase
      .from("savings_products")
      .select("id, slug, title, description")
      .eq("published", true)
      .order("sort_order"),
  ]);

  const { data: rateRow } = await supabase
    .from("site_settings").select("value").eq("key", "interest_rate").maybeSingle();
  const contact = { rate: rateRow?.value ?? "1.8%" };

  const loans   = loanData   ?? [];
  const savings = savingsData ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">Our Products</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">
            Savings &amp; Loan Products
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO offers savings accounts and loan products to help members in Kisoro build financial
            security and access affordable credit. Switch between Savings and Loans below.
          </p>
        </div>
      </div>

      {/* ── Tabbed content ── */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProductsTabs loans={loans} savings={savings} contact={contact} />
        </div>
      </section>

      {/* ── Notice ── */}
      <section className="bg-tint py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Loan terms, interest rates, limits, eligibility, minimum balances and
              account terms must be confirmed with Mubuga SACCO staff. Do not act on unverified information.
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="bg-brand text-white font-bold px-7 py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm">
              Contact Us
            </Link>
            <Link href="/branches"
              className="border-2 border-brand-ink text-brand-ink font-bold px-7 py-3 rounded-lg hover:bg-brand hover:text-white transition-colors text-sm">
              Visit Our Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
