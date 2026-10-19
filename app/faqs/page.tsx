import type { Metadata } from "next";
import FAQ from "../components/FAQ";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQs" };

export default function FAQsPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Help Centre</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Find answers to common questions about Mubuga SACCO. If your question is not listed,
            contact us directly.
          </p>
        </div>
      </div>

      <FAQ />

      <div className="bg-[#FAFAF5] py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Still have a question? Our staff are happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="bg-[#001E5A] text-white font-bold px-7 py-3 rounded-lg hover:bg-[#D2003C] transition-colors text-sm">
              Contact Us
            </Link>
            <a href="tel:0775364011"
              className="border-2 border-[#001E5A] text-[#001E5A] font-bold px-7 py-3 rounded-lg hover:bg-[#001E5A] hover:text-white transition-colors text-sm text-center">
              Call 0394 841 360
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
