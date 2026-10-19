import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Article" };

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/news" className="inline-flex items-center gap-1 text-white/50 text-xs mb-4 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Back to News
          </Link>
          <span className="inline-block bg-[#FFE100]/20 text-[#FFE100] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Article
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
            Article content coming soon
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-6 mb-8">
          <p className="text-amber-800 text-sm font-medium mb-1">Content placeholder</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            This article page template is ready. Replace with management-approved content before launch.{" "}
            Article slug: <code className="bg-amber-100 px-1 rounded text-xs">{params.slug}</code>
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          Full article content will appear here. Each article should include a relevant image, publication date,
          body text and a call to action where appropriate.
        </p>

        <div className="mt-10 pt-6 border-t border-[#E2E2EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/news" className="text-sm font-semibold text-[#001E5A] hover:underline">
            ← Back to all articles
          </Link>
          <Link href="/contact"
            className="w-full sm:w-auto text-center bg-[#D2003C] hover:bg-[#A8002E] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
