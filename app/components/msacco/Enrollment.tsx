const prerequisites = [
  "You must already be a registered Mubuga SACCO member",
  "Your phone number must be registered with the SACCO",
  "Your KYC names on the phone must match your SACCO records exactly",
  "You need either an MTN or Airtel SIM card",
  "You must know your SACCO account number",
];

const steps = [
  {
    step: 1,
    title: "Dial the USSD Code",
    mtn: "*165*6*3#",
    airtel: "*185*7*3*1#",
    desc: "Dial the code for your network from your registered phone number. Do not use a different SIM.",
  },
  {
    step: 2,
    title: "Select MSACCO & Accept",
    desc: "From the menu, select MSACCO and accept the service terms when prompted.",
    note: null,
  },
  {
    step: 3,
    title: "Select Join — Option 6",
    desc: "Choose option 6 (Join) from the MSACCO menu to begin enrollment.",
    note: null,
  },
  {
    step: 4,
    title: "Confirm Consent",
    desc: "Confirm your consent to the MSACCO terms and conditions when prompted.",
    note: null,
  },
  {
    step: 5,
    title: "Enter the Institution ID",
    desc: "When asked for the institution ID, enter exactly:",
    highlight: "MUBUG/230256",
    note: "This is Mubuga SACCO's registered MSACCO institution ID.",
  },
  {
    step: 6,
    title: "Enter Your SACCO Account Number",
    desc: "Enter your Mubuga SACCO account number. This must match the account registered with the SACCO. Contact the office on 0394 841 360 if you do not know your account number.",
    note: null,
  },
  {
    step: 7,
    title: "Enter an Alternative Recovery Number",
    desc: "Enter a secondary phone number that will be used to recover your account if needed. This should be a number you control.",
    note: "Keep this number safe. Never share it.",
  },
  {
    step: 8,
    title: "Create Your 5-Digit MSACCO PIN",
    desc: "Choose a 5-digit PIN and confirm it when prompted. This PIN protects your account.",
    note: "Never share your PIN with anyone — including SACCO staff. Choose a PIN that is not your date of birth or phone number.",
  },
  {
    step: 9,
    title: "Receive Your MSACCO Number",
    desc: "Once enrollment is complete, your MSACCO number will be returned to your phone by SMS. Save this number — you will need it for future transactions.",
    note: null,
  },
];

const Step = ({ s }: { s: typeof steps[0] }) => (
  <div className="flex gap-4 sm:gap-5">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
        <span className="text-white font-extrabold text-sm">{s.step}</span>
      </div>
      {s.step < steps.length && <div className="w-0.5 bg-line flex-1 mt-2" />}
    </div>
    <div className="pb-6 flex-1">
      <h3 className="font-bold text-brand-ink text-sm sm:text-base mb-1">{s.title}</h3>
      {(s as any).mtn && (
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-gold/20 border border-gold/40 text-brand-ink font-extrabold text-base px-3 py-1 rounded-lg">
            MTN: {(s as any).mtn}
          </span>
          <span className="bg-accent/10 border border-accent-ink/30 text-brand-ink font-extrabold text-base px-3 py-1 rounded-lg">
            Airtel: {(s as any).airtel}
          </span>
        </div>
      )}
      <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
      {(s as any).highlight && (
        <div className="mt-2 inline-flex items-center gap-2 bg-brand rounded-lg px-4 py-2">
          <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
          </svg>
          <span className="text-gold font-extrabold text-base tracking-wider">{(s as any).highlight}</span>
        </div>
      )}
      {s.note && (
        <p className="mt-2 text-xs text-accent-ink font-semibold flex items-start gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          {s.note}
        </p>
      )}
    </div>
  </div>
);

export default function MSACCOEnrollment() {
  return (
    <section id="enroll" className="py-12 sm:py-16 scroll-mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="section-label">Step-by-Step Guide</span>
          <h2 className="section-title">How to Join MSACCO</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">
            MSACCO enrollment is done entirely from your mobile phone using a USSD code. This website cannot complete enrollment — it provides instructions only.
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-5 sm:p-6 mb-8">
          <h3 className="font-bold text-brand-ink mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Before You Start — Checklist
          </h3>
          <ul className="space-y-2">
            {prerequisites.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-brand-ink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500 border-t border-gold/30 pt-3">
            If your name on the SIM does not match SACCO records, enrollment will fail. Visit the office to update your records first.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-surface rounded-2xl border border-line p-5 sm:p-8">
          <h3 className="font-bold text-brand-ink mb-6 text-base">Enrollment Steps</h3>
          {steps.map((s) => <Step key={s.step} s={s} />)}
        </div>

        {/* Enrollment failure help */}
        <div className="mt-6 bg-surface rounded-2xl border border-line p-5 sm:p-6">
          <h3 className="font-bold text-brand-ink mb-4 flex items-center gap-2 text-sm sm:text-base">
            <svg className="w-5 h-5 text-accent-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Enrollment Not Working?
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            {[
              ["Names do not match", "Your SIM card registration name must exactly match your Mubuga SACCO records. Visit the office to correct either."],
              ["Wrong account number", "Confirm your SACCO account number at the Mubuga office before retrying."],
              ["Wrong institution ID", "The ID is MUBUG/230256 — ensure there is no space before or after."],
              ["Phone not registered", "Your phone number must be registered with Mubuga SACCO. Call 0394 841 360 to register it."],
              ["Still failing", "Call MSACCO customer care: 0800 220 220 or WhatsApp: 0741-241252."],
            ].map(([issue, sol]) => (
              <div key={issue} className="flex gap-3 pb-3 border-b border-line last:border-0 last:pb-0">
                <svg className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <div>
                  <p className="font-semibold text-brand-ink text-xs mb-0.5">{issue}</p>
                  <p className="text-xs text-gray-500">{sol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
