import Image from "next/image";
import Link from "next/link";

const loans = [
  { label: "Business / Commercial Loan", slug: "business" },
  { label: "Agricultural Loan", slug: "agricultural" },
  { label: "School Fees Loan", slug: "school-fees" },
  { label: "Development Loan", slug: "development" },
  { label: "Home Improvement Loan", slug: "home-improvement" },
  { label: "Boda Boda Loan", slug: "boda-boda" },
  { label: "Medical Loan", slug: "medical" },
  { label: "Emergency Loan", slug: "emergency" },
];
const savings = [
  { label: "Ordinary Savings", slug: "ordinary" },
  { label: "Voluntary Savings", slug: "voluntary" },
  { label: "Junior / Minor Savings", slug: "junior" },
  { label: "VSLA Savings", slug: "vsla" },
  { label: "School Fees Collection", slug: "school-fees-collection" },
];

export default function Footer() {
  return (
    <footer className="bg-[#001E5A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/musacco-logo.png" alt="Mubuga SACCO" width={44} height={44} className="h-11 w-auto rounded-lg bg-white p-1"/>
              <div>
                <p className="font-extrabold text-base leading-tight">Mubuga SACCO Ltd</p>
                <p className="text-white/50 text-xs">Kisoro, Uganda</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              A member-owned savings and credit cooperative serving Nyakinama Sub-county and the wider Kisoro District community.
            </p>
            <p className="text-[#FFE100] text-xs font-semibold italic">"Development Through Rural Saving"</p>
            <div className="mt-4 text-white/50 text-xs">
            </div>
          </div>

          {/* Loan products */}
          <div>
            <h4 className="font-bold text-[#FFE100] text-sm mb-4 uppercase tracking-wider">Loan Products</h4>
            <ul className="space-y-2">
              {loans.map((l) => (
                <li key={l.slug}>
                  <Link href={`/loans/${l.slug}`} className="text-white/60 text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Savings products */}
          <div>
            <h4 className="font-bold text-[#FFE100] text-sm mb-4 uppercase tracking-wider">Savings Products</h4>
            <ul className="space-y-2">
              {savings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/savings/${s.slug}`} className="text-white/60 text-sm hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-[#FFE100] text-sm mt-6 mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[["About Us","/about"],["Services","/services"],["MSACCO","/msacco"],["Branches","/branches"],["News","/news"],["FAQs","/faqs"],["Contact","/contact"]].map(([l,h]) => (
                <li key={l}><Link href={h} className="text-white/60 text-sm hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#FFE100] text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", val: "Nyakinama Sub-county\nKisoro District, Uganda\nP.O. Box 99, Kisoro" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", val: "0394 841 360\n0394 845 526" },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", val: "mubugasacco@gmail.com" },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#FFE100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon}/>
                  </svg>
                  <span className="text-white/60 text-sm whitespace-pre-line">{c.val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>© 2025 Mubuga SACCO Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
