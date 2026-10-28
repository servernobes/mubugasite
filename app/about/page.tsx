import Link from "next/link";
import Staff from "../components/Staff";
import { CORE_VALUES, GOAL, MISSION, VISION } from "@/lib/sacco-profile";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/about", "About Us", "About Mubuga SACCO Ltd: a member-owned savings and credit cooperative in Nyakinama, Kisoro District, founded in 2005. Our mission, vision, core values and team.");

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
              ["Mission & Vision", "#mission"],
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
              <div key={r.label} className="flex flex-col gap-1 sm:flex-row sm:gap-4 py-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider sm:w-36 shrink-0 pt-0.5">{r.label}</p>
                <p className="text-gray-700 text-sm min-w-0 break-words">{r.val}</p>
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
            <h2 className="section-title">Mission, Vision, Goals & Core Values</h2>
          </div>
          {/* Official wording: lib/sacco-profile.ts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Mission", color: "border-accent-ink", bg: "bg-accent/10", tc: "text-accent-ink", content: MISSION },
              { title: "Vision", color: "border-brand-ink", bg: "bg-brand/10", tc: "text-brand-ink", content: VISION },
              { title: "Goals", color: "border-gold-ink", bg: "bg-gold/25", tc: "text-gold-ink", content: GOAL },
            ].map((c) => (
              <div key={c.title} className={`bg-surface rounded-xl border-t-4 ${c.color} border border-line p-6`}>
                <div className={`w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <span className={`${c.tc} font-extrabold text-xs`}>{c.title[0]}</span>
                </div>
                <h3 className={`font-bold ${c.tc} mb-2`}>{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-surface rounded-xl border-t-4 border-brand-ink border border-line p-6">
            <h3 className="font-bold text-brand-ink mb-4">Core Values</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CORE_VALUES.map((v) => (
                <li key={v} className="flex items-start gap-3 bg-tint rounded-lg p-4 border border-line">
                  <svg className="w-5 h-5 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Board of Directors are not shown publicly (members prefer to stay in the background) */}
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
