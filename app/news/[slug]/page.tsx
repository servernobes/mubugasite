// This route fetches per-request (dynamic slug) — opt out of instant/prerender validation
export const instant = false;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createCachedClient } from "@/lib/supabase/cached";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createCachedClient();
  const { data } = await supabase
    .from("news_articles")
    .select("title, excerpt, cover_url, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (!data) return { title: "Article not found" };
  return {
    title: data.title,
    description: data.excerpt,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article", title: data.title, description: data.excerpt ?? undefined, url: `/news/${slug}`,
      ...(data.published_at ? { publishedTime: data.published_at } : {}),
      ...(data.cover_url ? { images: [data.cover_url] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const supabase = createCachedClient();
  const { data: article } = await supabase
    .from("news_articles")
    .select("id, slug, category, title, excerpt, body, cover_url, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/news" className="inline-flex items-center gap-1 text-gray-500 text-xs mb-4 hover:text-brand-ink transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Back to News
          </Link>
          <span className="inline-block bg-accent/10 text-accent-ink text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-ink leading-snug">
            {article.title}
          </h1>
          {article.published_at && (
            <p className="text-gray-500 text-xs mt-3">
              {new Date(article.published_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {article.cover_url && (
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-8 border border-line">
            <Image
              src={article.cover_url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
          {article.excerpt}
        </p>

        {article.body ? (
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {article.body}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">Full article content coming soon.</p>
        )}

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/news" className="text-sm font-semibold text-brand-ink hover:underline">
            ← Back to all articles
          </Link>
          <Link href="/contact"
            className="w-full sm:w-auto text-center bg-accent hover:bg-accent-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
