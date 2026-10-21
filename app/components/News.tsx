import { cacheTag } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

export default async function News() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: articles } = await supabase
    .from("news_articles")
    .select("id, slug, category, title, excerpt, cover_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (!articles?.length) return null;

  const categoryColor: Record<string, string> = {
    "Notice": "bg-brand/10 text-brand-ink",
    "Financial Literacy": "bg-blue-50 text-blue-700",
    "Loans": "bg-accent/10 text-accent-ink",
    "Savings": "bg-green-50 text-green-700",
    "Community": "bg-orange-50 text-orange-700",
    "Event": "bg-purple-50 text-purple-700",
  };

  return (
    <section id="news" className="section-pad bg-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Updates</span>
            <h2 className="section-title">News and Updates from Mubuga SACCO</h2>
          </div>
          <Link href="/news" className="text-sm font-semibold text-brand-ink hover:underline shrink-0">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <article key={a.id} className="bg-surface rounded-xl border border-line overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-brand/10 h-36 sm:h-40 overflow-hidden relative">
                {a.cover_url ? (
                  <Image src={a.cover_url} alt={a.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-ink/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[a.category] ?? "bg-gray-100 text-gray-600"}`}>{a.category}</span>
                  <span className="text-gray-400 text-xs">
                    {a.published_at ? new Date(a.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}
                  </span>
                </div>
                <h3 className="font-bold text-brand-ink mb-2 leading-snug">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                <Link href={`/news/${a.slug}`} className="text-sm font-semibold text-accent-ink hover:underline">Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
