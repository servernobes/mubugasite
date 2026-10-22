import type { Metadata } from "next";
import Link from "next/link";
import Staff from "../components/Staff";
import Governance from "../components/Governance";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-accent-ink text-xs font-bold uppercase tracking-widest mb-2">About Mubuga SACCO</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink">
            Financial Services Rooted in Our Community
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Mubuga SACCO Ltd is a member-owned savings and credit cooperative operating in Kisoro District, Uganda.
          </p>
          {/* Quick nav */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              ["Who We Are", "#who"],
              ["Vision & Mission", "#mission"],
              ["Board of Directors", "#governance"],
              ["Management", "#governance"],
              ["Our Team", "#team"],
            ].map(([label, href]) => (
              <a key={label} href={href}
                className="text-xs font-semibold text-gray-600 hover:text-brand-ink border border-line hover:border-brand-ink/30 px-3 py-1.5 rounded-full transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section id="who" className="section-pad bg-surface scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-5">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mubuga SACCO Ltd is a Savings and Credit Cooperative Society registered and operating in Nyakinama Sub-county, Kisoro District, Uganda.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our cooperative provides accessible savings and credit products to members in the community — including farmers, traders, boda boda operators, households and small business owners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As a cooperative, Mubuga SACCO is owned by its members. Membership gives you access to our savings products, credit facilities and other financial services, while making you a co-owner of the institution.
            </p>
          </div>
          <div className="space-y-0 divide-y divide-line">
            {[
              { label: "Institution Type", val: "Savings and Credit Cooperative Society (SACCO)" },
              { label: "Location", val: "Nyakinama Sub-county, Kisoro District, Uganda" },
              { label: "Postal Address", val: "P.O. Box 99, Kisoro, Uganda" },
              { label: "Head Office Tel", val: "0394 841 360" },
              { label: "Kisoro Branch Tel", val: "0394 845 526" },
              { label: "Email", val: "mubugasacco@gmail.com" },
            ].map((r) => (
              <div key={r.label} className="flex gap-4 py-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider w-36 shrink-0 pt-0.5">{r.label}</p>
                <p className="text-gray-700 text-sm">{r.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section id="mission" className="section-pad bg-tint scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-label">Our Direction</span>
            <h2 className="section-title">Vision, Mission & Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Vision", color: "border-brand-ink", bg: "bg-brand/10", tc: "text-brand-ink", content: "[Vision statement to be confirmed by management]" },
              { title: "Mission", color: "border-accent-ink", bg: "bg-accent/10", tc: "text-accent-ink", content: "[Mission statement to be confirmed by management]" },
              { title: "Core Values", color: "border-brand-ink", bg: "bg-brand/10", tc: "text-brand-ink", content: "[Core values to be confirmed by management — e.g. Integrity, Trust, Community, Accountability, Transparency]" },
            ].map((c) => (
              <div key={c.title} className={`bg-surface rounded-xl border-t-4 ${c.color} border border-line p-6`}>
                <div className={`w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <span className={`${c.tc} font-extrabold text-xs`}>{c.title[0]}</span>
                </div>
                <h3 className={`font-bold ${c.tc} mb-2`}>{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed italic">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors & Top Management */}
      <div id="governance" className="scroll-mt-28">
        <Governance />
      </div>

      {/* Staff */}
      <div id="team" className="scroll-mt-28">
        <Staff />
      </div>

      {/* CTA */}
      <section className="section-pad bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title mb-4">Ready to Join?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Contact our office to enquire about membership eligibility, requirements and the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact?enquiry=membership"
              className="bg-brand hover:bg-accent text-white font-bold px-7 py-3 rounded-lg transition-colors text-sm">
              Membership Enquiry
            </Link>
            <Link href="/branches"
              className="border-2 border-brand-ink text-brand-ink hover:bg-brand hover:text-white font-bold px-7 py-3 rounded-lg transition-colors text-sm">
              Find Our Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
