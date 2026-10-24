import type { Metadata } from "next";
import Link from "next/link";
import ServicesTabs, { type ServiceTab } from "./ServicesTabs";
import MsaccoAppButtons from "../components/MsaccoAppButtons";

export const metadata: Metadata = { title: "Services" };

// Content comes from the MSACCO training material used on /msacco (app/components/msacco/*).

const ICONS = {
  phone:   "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  agents:  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  more:    "M4 6h16M4 12h16M4 18h7",
  join:    "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  cash:    "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
  loan:    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  school:  "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 17.5c0 .5-.03 1-.09 1.5M12 14l-6.16-3.422A12.083 12.083 0 003 17.5c0 .5.03 1 .09 1.5M12 14v7",
  shield:  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  key:     "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  deposit: "M12 4v16m0 0l-6-6m6 6l6-6",
  withdraw:"M12 20V4m0 0l-6 6m6-6l6 6",
  star:    "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  book:    "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  steps:   "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  forms:   "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

const ARROW = "M17 8l4 4m0 0l-4 4m4-4H3";
const CHECK = "M5 13l4 4L19 7";
const USSD = "Dial *165*6*3# (MTN) or *185*7*3*1# (Airtel)";

// ── Small building blocks for card details ─────────────────────────────

const Steps = ({ items }: { items: (string | { title: string; desc: React.ReactNode })[] }) => (
  <ol className="flex flex-col">
    {items.map((it, i) => {
      const title = typeof it === "string" ? it : it.title;
      const desc = typeof it === "string" ? null : it.desc;
      return (
        <li key={i} className="relative flex gap-3.5 pb-3.5 last:pb-0">
          {i < items.length - 1 && <span aria-hidden className="absolute left-[13px] top-7 bottom-0 w-0.5 bg-line" />}
          <span className="relative z-10 w-7 h-7 shrink-0 rounded-full bg-accent text-white text-xs font-extrabold flex items-center justify-center">{i + 1}</span>
          <span className="pt-1">
            <span className="block text-sm text-gray-700 font-medium">{title}</span>
            {desc && <span className="block text-gray-500 text-xs leading-relaxed mt-0.5">{desc}</span>}
          </span>
        </li>
      );
    })}
  </ol>
);

const Checks = ({ items }: { items: [string, string][] }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    {items.map(([title, desc]) => (
      <li key={title} className="flex items-start gap-3 bg-surface rounded-lg p-3 border border-line">
        <svg className="w-4 h-4 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={CHECK}/>
        </svg>
        <span>
          <span className="block font-semibold text-brand-ink text-sm">{title}</span>
          <span className="block text-gray-500 text-xs mt-0.5">{desc}</span>
        </span>
      </li>
    ))}
  </ul>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-500 text-xs leading-relaxed">{children}</p>
);

const Actions = ({ primary, secondary }: { primary: [string, string]; secondary?: [string, string] }) => (
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
    <Link href={primary[1]}
      className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg transition-colors">
      {primary[0]}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ARROW}/>
      </svg>
    </Link>
    {secondary && (
      <Link href={secondary[1]}
        className="inline-flex items-center justify-center text-sm font-semibold text-brand-ink border border-brand-ink/30 hover:bg-brand/5 px-4 py-2 rounded-lg transition-colors">
        {secondary[0]}
      </Link>
    )}
  </div>
);

const Intro = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-tint rounded-xl border border-line p-5 sm:p-6 mb-5 sm:mb-6">
    <h2 className="font-bold text-brand-ink text-base sm:text-lg mb-2">{title}</h2>
    <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">{children}</div>
  </div>
);

const Codes = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 notranslate" translate="no">
    {[["MTN", "*165*6*3#"], ["Airtel", "*185*7*3*1#"], ["Institution ID", "MUBUG/230256"]].map(([label, code]) => (
      <div key={label} className="bg-surface border border-line rounded-lg px-3.5 py-2.5">
        <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-brand-ink font-extrabold tracking-wider mt-0.5">{code}</p>
      </div>
    ))}
  </div>
);

const AGENT_START = [
  `${USSD} from your registered agent SIM.`,
  "Select MSACCO from the menu and accept.",
  "Select Agency (option 9).",
  "Enter your agent MSACCO number.",
];

// ── Tabs ───────────────────────────────────────────────────────────────

const tabs: ServiceTab[] = [
  {
    id: "msacco",
    label: "MSACCO",
    icon: ICONS.phone,
    intro: (
      <Intro title="MSACCO: bank on your phone">
        MSACCO lets Mubuga SACCO members deposit savings, repay loans and pay school fees from an MTN or Airtel phone, any time,
        without travelling to the office. Every transaction is protected by your PIN and confirmed by SMS.
        <Codes />
        <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mt-4 mb-2">Or use the MSACCO app</p>
        <MsaccoAppButtons />
      </Intro>
    ),
    items: [
      {
        id: "join",
        title: "Join MSACCO",
        description: "Register your phone for MSACCO in a few minutes using your SACCO account number.",
        icon: ICONS.join,
        details: (
          <div className="space-y-4">
            <Steps items={[
              { title: "Dial the USSD code", desc: `${USSD} from your registered phone number. Do not use a different SIM.` },
              { title: "Select MSACCO & accept", desc: "Choose MSACCO from the menu and accept the service terms." },
              { title: "Select Join (option 6)", desc: "Choose option 6 from the MSACCO menu to begin enrollment." },
              { title: "Confirm consent", desc: "Confirm your consent to the MSACCO terms and conditions." },
              { title: "Enter the Institution ID", desc: <>Enter exactly <strong className="notranslate" translate="no">MUBUG/230256</strong>.</> },
              { title: "Enter your SACCO account number", desc: "It must match the account registered with the SACCO. Call 0394 841 360 if you don't know it." },
              { title: "Enter a recovery number", desc: "A second phone number you control, used to recover your account if needed." },
              { title: "Create your 5-digit PIN", desc: "Choose a PIN and confirm it. This PIN protects your account." },
              { title: "Receive your MSACCO number", desc: "It arrives by SMS. Save it: you will need it for transactions." },
            ]} />
            <Actions primary={["Full MSACCO Guide", "/msacco"]} secondary={["Need help? Contact us", "/contact?enquiry=services"]} />
          </div>
        ),
      },
      {
        id: "deposits",
        title: "Deposits & Withdrawals",
        description: "Move money between your SACCO account and mobile money from your phone, or through a MUSACCO agent.",
        icon: ICONS.cash,
        details: (
          <div className="space-y-4">
            <Checks items={[
              ["Deposit from your phone", "Send money from mobile money into your SACCO savings."],
              ["Withdraw to mobile money", "Move money from your SACCO account to your phone."],
              ["Deposit or withdraw at an agent", "Visit an authorised MUSACCO agent with your MSACCO number."],
              ["SMS confirmation", "Every transaction is confirmed by SMS."],
            ]} />
            <Note>{USSD}, select MSACCO and follow the menu prompts. Authorise with your 5-digit PIN.</Note>
            <Actions primary={["Full MSACCO Guide", "/msacco"]} secondary={["Find an agent", "/contact?enquiry=services"]} />
          </div>
        ),
      },
      {
        id: "repayments",
        title: "Loan Repayments",
        description: "Repay your MUSACCO loan directly from your phone. No queues, no travel: just dial and repay.",
        icon: ICONS.loan,
        details: (
          <div className="space-y-4">
            <Note>
              {USSD}, select MSACCO and choose loan repayment, then follow the prompts and authorise with your PIN.
              Repaying on time keeps you eligible for future loans. All loans are at 1.8% per month on reducing balance.
            </Note>
            <Actions primary={["Our Loan Products", "/loans"]} secondary={["Loan enquiry", "/contact?enquiry=loans"]} />
          </div>
        ),
      },
      {
        id: "school-fees",
        title: "School Fees Payments",
        description: "Pay school fees for your children directly through MSACCO: fast and trackable.",
        icon: ICONS.school,
        details: (
          <div className="space-y-4">
            <Note>
              {USSD}, select MSACCO and choose school fees payment. Keep the SMS confirmation as your record.
              Schools can also collect fees from parents through an Institutional Account.
            </Note>
            <Actions primary={["Institutional Account (school fees collection)", "/savings/institutional"]} secondary={["School Fees Loan", "/loans/school-fees"]} />
          </div>
        ),
      },
      {
        id: "security",
        title: "SMS Notifications & Security",
        description: "Every transaction is PIN-protected and confirmed by SMS, so you always know what happens on your account.",
        icon: ICONS.shield,
        details: (
          <div className="space-y-4">
            <Checks items={[
              ["PIN protected", "Transactions need your personal 5-digit MSACCO PIN."],
              ["SMS for every transaction", "Deposits, withdrawals and repayments are confirmed by SMS."],
              ["Never share your PIN", "Not even with people who say they are SACCO staff."],
              ["Report anything strange", "Call MSACCO care or visit our office straight away."],
            ]} />
            <Note>MSACCO customer care: <a href="tel:0800220220" className="font-semibold text-brand-ink hover:underline">0800 220 220</a> (toll free).</Note>
          </div>
        ),
      },
      {
        id: "account",
        title: "Account & PIN Management",
        description: "Reset or change your PIN, view your MSACCO number and manage your recovery number.",
        icon: ICONS.key,
        details: (
          <div className="space-y-4">
            <Note>{USSD} → MSACCO → Account, then choose:</Note>
            <Checks items={[
              ["Request Token", "For account verification or recovery."],
              ["Reset PIN", "If you forgot it or it was compromised. You'll need your recovery number."],
              ["Change PIN", "Change your 5-digit PIN. You must know your current PIN."],
              ["Change Recovery Number", "Update the alternative number linked to your account."],
              ["View Recovery Number", "See the recovery number currently registered."],
              ["View MSACCO Number", "Useful if you have forgotten it."],
            ]} />
            <Actions primary={["Errors & troubleshooting", "/msacco"]} />
          </div>
        ),
      },
    ],
  },
  {
    id: "agency",
    label: "Agency Banking",
    icon: ICONS.agents,
    intro: (
      <Intro title="MUSACCO Agency Banking">
        MUSACCO runs its own network of authorised agents in the community. Members can deposit, withdraw and repay loans near home,
        saving time and transport costs. Always make sure you are transacting with an officially authorised MUSACCO agent.
      </Intro>
    ),
    items: [
      {
        id: "agent-deposit",
        title: "Customer Deposit via Agent",
        description: "How an authorised agent deposits money into a member's SACCO account.",
        icon: ICONS.deposit,
        details: (
          <div className="space-y-4">
            <Steps items={[
              ...AGENT_START,
              "Select Deposit (option 1).",
              "Enter the customer's MSACCO number.",
              "Enter the amount in UGX.",
              "Confirm the customer's KYC details shown on screen.",
              "Authorise with your agent MSACCO PIN. The customer receives an SMS confirmation.",
            ]} />
          </div>
        ),
      },
      {
        id: "agent-withdrawal",
        title: "Customer Withdrawal via Agent",
        description: "How an authorised agent pays out cash from a member's SACCO account.",
        icon: ICONS.withdraw,
        details: (
          <div className="space-y-4">
            <Steps items={[
              ...AGENT_START,
              "Select Withdrawal (option 2).",
              "Enter the customer's MSACCO number.",
              "Enter the withdrawal amount.",
              "Confirm the customer's KYC details.",
              "Authorise with your agent MSACCO PIN, then give the customer the cash after confirmation.",
            ]} />
          </div>
        ),
      },
      {
        id: "become-agent",
        title: "Become a MUSACCO Agent",
        description: "Earn commission and grow your business by serving members in your community.",
        icon: ICONS.star,
        details: (
          <div className="space-y-4">
            <Checks items={[
              ["Commission", "Earn on transactions you process. Ask us for current rates."],
              ["Business growth", "Members visiting to transact bring more customers."],
              ["Support", "Access to MSACCO customer care and Mubuga SACCO staff."],
              ["Community visibility", "Become a known, trusted financial services point."],
            ]} />
            <Actions primary={["Apply to be an agent", "/contact?enquiry=services"]} secondary={["Full agent guide", "/msacco"]} />
          </div>
        ),
      },
      {
        id: "terms",
        title: "Important Terms",
        description: "MSACCO number, SACCO account number, Institution ID and PIN explained.",
        icon: ICONS.book,
        details: (
          <dl className="space-y-3">
            {[
              ["MSACCO Number", "The mobile account number given to a member or agent after enrollment. It is different from the SACCO account number."],
              ["SACCO Account Number", "Your account number in Mubuga SACCO's main system, used during enrollment to link you."],
              ["Institution ID", "MUBUG/230256: Mubuga SACCO's ID on the MSACCO platform, used once during enrollment."],
              ["Agent MSACCO Number", "The MSACCO number given to you as an authorised Mubuga SACCO agent."],
              ["MSACCO PIN", "Your personal 5-digit PIN for authorising transactions. Never share it."],
            ].map(([term, def]) => (
              <div key={term} className="bg-surface border border-line rounded-lg p-3">
                <dt className="font-semibold text-brand-ink text-sm">{term}</dt>
                <dd className="text-gray-500 text-xs mt-0.5 leading-relaxed">{def}</dd>
              </div>
            ))}
          </dl>
        ),
      },
    ],
  },
  {
    id: "other",
    label: "Other Services",
    icon: ICONS.more,
    intro: (
      <Intro title="At our offices">
        Visit us in Mubuga (Head Office) or Kisoro Town to join, open an account, apply for a loan or collect forms.
      </Intro>
    ),
    items: [
      {
        id: "procedures",
        title: "How to Access Our Services",
        description: "Step by step: from becoming a member to receiving and repaying a loan.",
        icon: ICONS.steps,
        details: (
          <div className="space-y-4">
            <Steps items={[
              { title: "Become a Member", desc: "Visit any MUSACCO office, fill in the membership application form and pay your share capital contribution." },
              { title: "Open a Savings Account", desc: "Deposit regularly. Your savings build your eligibility for loans." },
              { title: "Apply for a Loan", desc: "Complete a loan application form. A credit officer will assess it and advise you." },
              { title: "Loan Approval", desc: "The credit committee reviews your application and tells you the outcome and amount." },
              { title: "Disbursement", desc: "Funds are paid out. Repayments follow your schedule at 1.8% per month on reducing balance." },
              { title: "Repayment & Support", desc: "Repay at our offices, through MSACCO or authorised agents. Our staff are ready to help." },
            ]} />
            <Actions primary={["Become a Member", "/membership"]} secondary={["Savings & Loans", "/products"]} />
          </div>
        ),
      },
      {
        id: "forms",
        title: "Forms & Downloads",
        description: "Membership, loan and savings application forms, plus our official reports.",
        icon: ICONS.forms,
        details: (
          <div className="space-y-4">
            <Note>Application forms are available at any MUSACCO office. Our staff will help you fill them in.</Note>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {["Membership Application Form", "Loan Application Form", "Savings Account Opening Form", "Loan Guarantor Form"].map((f) => (
                <li key={f} className="flex items-center gap-3 bg-surface border border-line rounded-lg p-3">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="text-sm text-gray-700">{f}</span>
                  <span className="ml-auto text-xs font-semibold text-brand-ink whitespace-nowrap">At office</span>
                </li>
              ))}
            </ul>
            <Actions primary={["Reports & Publications", "/publications"]} secondary={["Find an Office", "/branches"]} />
          </div>
        ),
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-accent-ink">What We Offer</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Our Services</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Bank on your phone with MSACCO, through our agents near your home, or at our offices. Switch between the services below.
          </p>
        </div>
      </div>

      <section className="section-pad bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ServicesTabs tabs={tabs} />

          <div className="mt-5 sm:mt-6">
            <Link href="/contact?enquiry=services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-brand hover:bg-brand-hover px-4 sm:px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start">
              Enquire About Our Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ARROW}/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
