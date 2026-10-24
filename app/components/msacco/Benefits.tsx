import Link from "next/link";

const memberBenefits = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Convenient Transactions",
    desc: "Deposit savings, repay loans and pay school fees from your phone at any time — no need to travel to the office.",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Savings Growth",
    desc: "Regular, easy mobile deposits help you build your savings consistently and reach your financial goals faster.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Security",
    desc: "Your transactions are PIN-protected. Notification SMSs keep you informed of every activity on your account.",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Transaction Notifications",
    desc: "Receive SMS confirmations for every deposit, withdrawal and loan repayment so you always know your balance movement.",
  },
  {
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
    title: "Loan Repayments",
    desc: "Repay your MUSACCO loan directly from your phone. No queues, no travel — just dial and repay.",
  },
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13",
    title: "School Fees Payments",
    desc: "Pay school fees for your children directly through MSACCO — fast and trackable.",
  },
];

const agentBenefits = [
  {
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    title: "Commission Opportunities",
    desc: "Earn commissions on transactions processed through your agency. Contact Mubuga SACCO for current commission details.",
  },
  {
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    title: "Business Growth",
    desc: "Becoming a MUSACCO agent increases foot traffic to your business as members visit to transact.",
  },
  {
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    title: "MSACCO Support",
    desc: "As an authorised agent you have access to MSACCO customer care and Mubuga SACCO staff for operational support.",
  },
  {
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    title: "Community Visibility",
    desc: "Your location becomes a known financial services point in the community, building your reputation as a trusted business.",
  },
];

export default function MSACCOBenefits() {
  return (
    <section id="benefits" className="py-12 sm:py-16 bg-surface scroll-mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="section-label">Why Use MSACCO</span>
          <h2 className="section-title">Benefits for Members & Agents</h2>
        </div>

        {/* Member benefits */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 className="font-bold text-brand-ink text-base sm:text-lg">For Members</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberBenefits.map((b) => (
              <div key={b.title} className="bg-tint rounded-xl border border-line p-4 sm:p-5 hover:border-brand-ink/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 bg-brand/10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon}/>
                  </svg>
                </div>
                <h4 className="font-bold text-brand-ink text-sm mb-1">{b.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent benefits */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="font-bold text-brand-ink text-base sm:text-lg">For Agents</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agentBenefits.map((b) => (
              <div key={b.title} className="bg-tint rounded-xl border border-line p-4 sm:p-5 hover:border-accent-ink/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon}/>
                  </svg>
                </div>
                <h4 className="font-bold text-brand-ink text-sm mb-1">{b.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Become an agent CTA */}
        <div className="bg-brand rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <h3 className="font-extrabold text-white text-lg mb-2">Become a MUSACCO Agent</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Interested in becoming an authorised Mubuga SACCO agent? Contact our office to learn about requirements and the application process. Commission details will be confirmed by management.
            </p>
          </div>
          <Link href="/contact?enquiry=services"
            className="shrink-0 w-full sm:w-auto text-center bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
            Enquire About Agency
          </Link>
        </div>
      </div>
    </section>
  );
}
