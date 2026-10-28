import Contact from "../components/Contact";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/contact", "Contact Us", "Contact Mubuga SACCO Ltd in Kisoro, Uganda. Call 0394 841 360, email mubugasacco@gmail.com or visit us in Nyakinama Sub-county.");

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">Reach Us</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Talk to Mubuga SACCO</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            We are here to answer your questions about membership, savings, loans and other services.
            Contact us or visit our office in Kisoro.
          </p>
        </div>
      </div>
      <Contact />
    </>
  );
}
