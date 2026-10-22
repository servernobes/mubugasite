import { cacheTag } from "next/cache";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";

// One product per row: icon, name and short description, arrow. Kept slim so the homepage stays short.
function ProductRows({ items, href, icon, iconClass, rowClass, cta }: {
  items: { id: string; slug: string; title: string; description: string }[];
  href: string; icon: string; iconClass: string; rowClass: string; cta: string;
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((p) => (
        <li key={p.id}>
          <Link href={`${href}/${p.slug}`}
            className={`group flex items-center gap-3 sm:gap-4 rounded-xl border border-line px-4 sm:px-5 py-3.5 hover:border-brand-ink/30 hover:shadow-sm transition-all ${rowClass}`}>
            <span className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${iconClass}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon}/>
              </svg>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold text-brand-ink text-sm sm:text-base">{p.title}</span>
              <span className="block text-gray-500 text-xs sm:text-sm leading-relaxed mt-0.5">{p.description}</span>
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-accent-ink whitespace-nowrap">{cta}</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-ink group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Services() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const [{ data: loanData }, { data: savingsData }] = await Promise.all([
    supabase.from("loan_products").select("id, slug, title, description").eq("published", true).order("sort_order"),
    supabase.from("savings_products").select("id, slug, title, description").eq("published", true).order("sort_order"),
  ]);

  const loans   = loanData   ?? [];
  const savings = savingsData ?? [];

  return (
    <>
      <section id="savings" className="section-pad bg-tint">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Savings &amp; Accounts</span>
              <h2 className="section-title">Save with Purpose, Grow with Us</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-brand-ink hover:underline shrink-0">View all products →</Link>
          </div>
          <ProductRows items={savings} href="/savings" cta="Learn more"
            icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
            iconClass="bg-accent/10 text-accent-ink" rowClass="bg-surface" />
        </div>
      </section>

      <section id="loans" className="section-pad bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Credit Products</span>
              <h2 className="section-title">Financing to Help You Move Forward</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-brand-ink hover:underline shrink-0">View all products →</Link>
          </div>
          <div className="bg-brand rounded-xl px-5 py-4 mb-6 flex items-center gap-3 flex-wrap">
            <div className="bg-accent rounded-lg px-3 py-1.5 shrink-0">
              <p className="text-white text-xs font-black uppercase tracking-wider">NB</p>
            </div>
            <p className="text-white font-bold text-sm sm:text-base">
              All loans at <span className="text-gold">1.8% per month</span> on reducing balance.
            </p>
            <a href="/contact?enquiry=loans" className="ml-auto shrink-0 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
              Apply Now
            </a>
          </div>
          <ProductRows items={loans} href="/loans" cta="View details"
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            iconClass="bg-brand/10 text-brand-ink" rowClass="bg-tint" />
        </div>
      </section>

      <section className="section-pad bg-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="bg-surface border border-line rounded-2xl h-52 sm:h-64 flex items-center justify-center order-2 md:order-1">
            <div className="text-center text-brand-ink/30">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
              </svg>
              <p className="text-sm">Add farming photograph</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block text-accent-ink text-xs font-bold uppercase tracking-widest mb-3">Agricultural Finance</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink leading-tight mb-4 md:mb-5">
              Supporting Farmers.<br />Strengthening Livelihoods.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Agriculture is the backbone of many households in Kisoro. Mubuga SACCO offers an agricultural loan product to help eligible members finance farm-related activities.
            </p>
            <Link href="/loans/agricultural" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-lg transition-colors">
              Enquire About Agricultural Loans
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
