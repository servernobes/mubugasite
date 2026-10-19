import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "News & Updates" };

const articles = [
  { slug: "welcome", category: "Notice", date: "[Date to be confirmed]", title: "Welcome to the New Mubuga SACCO Website", excerpt: "We are pleased to present our updated website. Visit us at our Nyakinama office or call 0394 841 360 to learn more about our products and services." },
  { slug: "why-saving-matters", category: "Financial Literacy", date: "[Date to be confirmed]", title: "Why Saving Regularly Matters for Your Family", excerpt: "Regular saving, even in small amounts, can help your family build resilience, plan for school fees and work towards important goals." },
  { slug: "agricultural-loan", category: "Loans", date: "[Date to be confirmed]", title: "Understanding Our Agricultural Loan Product", excerpt: "Our agricultural loan is designed to support eligible farmers in Kisoro. Contact us to enquire about requirements and how to apply." },
  { slug: "membership-benefits", category: "Membership", date: "[Date to be confirmed]", title: "The Benefits of SACCO Membership", excerpt: "As a SACCO member you gain access to savings products, loan facilities and become a co-owner of a community cooperative." },
  { slug: "school-fees", category: "Products", date: "[Date to be confirmed]", title: "Planning for School Fees? We Can Help", excerpt: "Our school fees collection account and school fees loan are designed to make education more manageable for Kisoro families." },
  { slug: "vsla-groups", category: "Community", date: "[Date to be confirmed]", title: "Supporting VSLA Groups in Kisoro", excerpt: "Village savings and lending associations are an important part of the financial landscape in Uganda. Mubuga SACCO supports VSLA group members." },
];

const categoryColors: Record<string, string> = {
  "Notice": "bg-[#001E5A]/10 text-[#001E5A]",
  "Financial Literacy": "bg-blue-50 text-blue-700",
  "Loans": "bg-[#D2003C]/10 text-[#A8002E]",
  "Membership": "bg-purple-50 text-purple-700",
  "Products": "bg-green-50 text-green-700",
  "Community": "bg-orange-50 text-orange-700",
};

export default function NewsPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Updates</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">News & Updates from Mubuga SACCO</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Announcements, financial literacy articles, product updates and community news.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-amber-800 text-sm">Articles below are placeholder content. Replace with verified, management-approved content before launch. Do not publish unverified announcements, financial figures or event details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <article key={a.slug} className="bg-white rounded-xl border border-[#E2E2EA] overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-[#001E5A]/15 h-36 sm:h-44 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#001E5A]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[a.category] ?? "bg-gray-100 text-gray-600"}`}>{a.category}</span>
                    <span className="text-gray-400 text-xs">{a.date}</span>
                  </div>
                  <h3 className="font-bold text-[#001E5A] mb-2 leading-snug">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                  <Link href={`/news/${a.slug}`} className="text-sm font-semibold text-[#D2003C] hover:underline">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
