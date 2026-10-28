import FAQ from "../components/FAQ";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/faqs", "FAQs", "Answers to common questions about joining Mubuga SACCO, opening a savings account, applying for a loan and using MSACCO mobile banking.");

export default function FAQsPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">Help Centre</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Find answers to common questions about Mubuga SACCO. If your question is not listed,
            contact us directly.
          </p>
        </div>
      </div>

      <FAQ />

      <div className="bg-tint py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Still have a question? Our staff are happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="bg-brand text-white font-bold px-7 py-3 rounded-lg hover:bg-accent transition-colors text-sm">
              Contact Us
            </Link>
            <a href="tel:0775364011"
              className="border-2 border-brand-ink text-brand-ink font-bold px-7 py-3 rounded-lg hover:bg-brand hover:text-white transition-colors text-sm text-center">
              Call 0394 841 360
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
