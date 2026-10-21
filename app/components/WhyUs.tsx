import Link from "next/link";

const reasons = [
  {
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Community-Focused Services",
    desc: "We are a member-owned cooperative. Every decision is made in the interest of our members and the Kisoro community.",
  },
  {
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
    title: "A Culture of Saving",
    desc: "We encourage regular saving through accessible and flexible savings products suited to different income levels.",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Productive Financing",
    desc: "Our loan products are designed to finance productive activities — farming, business, education and household development.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Range of Products",
    desc: "From agricultural loans to school fees financing and VSLA savings, we offer products for varied member needs.",
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Direct Staff Access",
    desc: "Speak directly with our staff at the Nyakinama office. We are here to answer your questions and guide your application.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad bg-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <span className="section-label">Why Mubuga SACCO</span>
          <h2 className="section-title mx-auto max-w-xl">Why Choose Mubuga SACCO?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-surface rounded-xl border border-line p-6">
              <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={r.icon}/>
                </svg>
              </div>
              <h3 className="font-bold text-brand-ink mb-2">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Membership CTA */}
        <div className="mt-10 md:mt-14 bg-brand rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">Become Part of the Mubuga SACCO Community</h3>
            <p className="text-white/70 text-sm max-w-xl">
              Membership is open to eligible individuals in the community. Enquire with our office about requirements, registration and how to get started.
            </p>
          </div>
          <Link href="/contact?enquiry=membership"
            className="w-full sm:w-auto shrink-0 text-center bg-accent hover:bg-accent-hover text-white font-bold px-7 py-3.5 rounded-lg transition-colors">
            Membership Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
