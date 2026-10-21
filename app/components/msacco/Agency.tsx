const depositSteps = [
  { n: 1, text: "Dial *165*6*3# (MTN) or *185*7*3*1# (Airtel) from your registered agent SIM." },
  { n: 2, text: "Select MSACCO from the menu and accept." },
  { n: 3, text: "Select Agency — Option 9." },
  { n: 4, text: "Enter your agent MSACCO number." },
  { n: 5, text: "Select Deposit — Option 1." },
  { n: 6, text: "Enter the customer's MSACCO number." },
  { n: 7, text: "Enter the transaction amount in UGX." },
  { n: 8, text: "Confirm the customer's KYC details displayed on screen." },
  { n: 9, text: "Authorize the transaction using your agent MSACCO PIN. The customer receives an SMS confirmation." },
];

const withdrawalSteps = [
  { n: 1, text: "Dial *165*6*3# (MTN) or *185*7*3*1# (Airtel) from your registered agent SIM." },
  { n: 2, text: "Select MSACCO from the menu and accept." },
  { n: 3, text: "Select Agency — Option 9." },
  { n: 4, text: "Enter your agent MSACCO number." },
  { n: 5, text: "Select Withdrawal — Option 2." },
  { n: 6, text: "Enter the customer's MSACCO number." },
  { n: 7, text: "Enter the withdrawal amount." },
  { n: 8, text: "Confirm the customer's KYC details." },
  { n: 9, text: "Authorize with your agent MSACCO PIN. Disburse cash to the customer after confirmation." },
];

const terms = [
  { term: "MSACCO Number", def: "The unique mobile account number assigned to a member or agent after enrollment. It is different from the SACCO account number." },
  { term: "SACCO Account Number", def: "The account number held at Mubuga SACCO's main system. Used during enrollment to link the member." },
  { term: "Institution ID", def: "MUBUG/230256 — Mubuga SACCO's registered ID on the MSACCO platform. Used once during enrollment." },
  { term: "Agent MSACCO Number", def: "The MSACCO number assigned specifically to you as an authorised Mubuga SACCO agent." },
  { term: "MSACCO PIN", def: "Your personal 5-digit PIN for authorizing transactions. Never share it." },
];

const StepList = ({ steps }: { steps: { n: number; text: string }[] }) => (
  <ol className="space-y-3">
    {steps.map((s) => (
      <li key={s.n} className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white font-bold text-xs">{s.n}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed pt-0.5">{s.text}</p>
      </li>
    ))}
  </ol>
);

export default function MSACCOAgency() {
  return (
    <section id="agency" className="py-12 sm:py-16 bg-surface scroll-mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="section-label">For Authorised Agents</span>
          <h2 className="section-title">MUSACCO Agent Banking Guide</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">
            This guide is for people who are officially authorised as Mubuga SACCO agents. These instructions are for training purposes — this website cannot execute transactions.
          </p>
        </div>

        {/* Terms glossary */}
        <div className="bg-tint rounded-2xl border border-line p-5 sm:p-6 mb-8">
          <h3 className="font-bold text-brand-ink mb-4 text-sm">Important Terms to Understand</h3>
          <div className="space-y-3">
            {terms.map((t) => (
              <div key={t.term} className="flex gap-3 pb-3 border-b border-line last:border-0 last:pb-0">
                <div className="bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 h-fit mt-0.5">{t.term}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{t.def}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit + Withdrawal side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Deposit */}
          <div className="bg-brand rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white">Agent Deposit</h3>
                <p className="text-white/50 text-xs">Option 1 in Agency menu</p>
              </div>
            </div>
            <StepList steps={depositSteps} />
          </div>

          {/* Withdrawal */}
          <div className="bg-tint rounded-2xl border border-line p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-brand-ink">Agent Withdrawal</h3>
                <p className="text-gray-500 text-xs">Option 2 in Agency menu</p>
              </div>
            </div>
            <StepList steps={withdrawalSteps} />
          </div>
        </div>

        {/* Agent security notice */}
        <div className="bg-accent/10 border border-accent-ink/30 rounded-2xl p-5 sm:p-6">
          <h3 className="font-bold text-accent-ink mb-3 flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Agent Security Rules
          </h3>
          <ul className="space-y-2">
            {[
              "Always verify the customer's KYC details before authorizing any transaction.",
              "Never share your agent MSACCO PIN with a customer.",
              "Only process transactions on your own registered agent MSACCO number.",
              "Ensure sufficient float before processing withdrawals.",
              "Report any suspicious activity to Mubuga SACCO immediately on 0394 841 360.",
              "Do not accept cash before the transaction is confirmed with an SMS.",
            ].map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
