import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">Reach Us</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">Talk to Mubuga SACCO</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            We are here to answer your questions about membership, savings, loans and other services.
            Contact us or visit our office in Kisoro.
          </p>
        </div>
      </div>
      <Contact />
    </>
  );
}
