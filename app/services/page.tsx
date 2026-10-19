import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Other Services" };

const procedures = [
  {
    step: "01",
    title: "Become a Member",
    desc: "Visit any MUSACCO office, fill in the membership application form and pay your share capital contribution to become a member.",
  },
  {
    step: "02",
    title: "Open a Savings Account",
    desc: "Once a member, open your savings account and begin depositing regularly. Your savings build your eligibility for loans.",
  },
  {
    step: "03",
    title: "Apply for a Loan",
    desc: "Complete a loan application form at any of our offices. A credit officer will assess your application and advise on the next steps.",
  },
  {
    step: "04",
    title: "Loan Approval",
    desc: "Your loan application is reviewed by the credit committee. You will be notified of the outcome and the approved amount.",
  },
  {
    step: "05",
    title: "Disbursement",
    desc: "Once approved, funds are disbursed. Repayments begin as agreed on your schedule at 1.8% per month on reducing balance.",
  },
  {
    step: "06",
    title: "Repayment & Support",
    desc: "Make your repayments on time through our offices or authorised MUSACCO agents. Our staff are always available to assist you.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#D2003C]">What We Offer</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">More Ways to Access Financial Services</h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm sm:text-base">
            Beyond savings and loans, MUSACCO provides additional services to make banking more accessible for members across Kisoro.
          </p>
        </div>
      </div>

      <section className="section-pad bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

          {/* MSACCO highlight — links to the dedicated page */}
          <div className="bg-[#001E5A] rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#D2003C] rounded-lg px-2.5 py-1">
                    <p className="text-white text-xs font-black uppercase tracking-wider">MSACCO</p>
                  </div>
                  <span className="text-white/50 text-xs">Mobile Financial Services</span>
                </div>
                <h2 className="font-extrabold text-white text-lg sm:text-xl mb-2">Bank on Your Phone with MSACCO</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  MSACCO lets you deposit savings, repay loans, pay school fees and more — directly from your MTN or Airtel phone.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">MTN: *165*6*3#</span>
                  <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Airtel: *185*7*3*1#</span>
                  <span className="bg-[#FFE100]/20 border border-[#FFE100]/30 text-[#FFE100] text-xs font-bold px-3 py-1.5 rounded-lg">ID: MUBUG/230256</span>
                </div>
                <Link href="/msacco"
                  className="inline-flex items-center gap-2 bg-[#D2003C] hover:bg-[#A8002E] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Full MSACCO Guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
              <div className="hidden sm:flex w-36 h-36 bg-white/10 rounded-2xl border border-white/20 items-center justify-center shrink-0">
                <div className="text-center">
                  <svg className="w-12 h-12 text-white/40 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-white/30 text-xs">Mobile Banking</p>
                </div>
              </div>
            </div>
          </div>

          {/* MUSACCO Procedures */}
          <div className="bg-white rounded-2xl border border-[#E2E2EA] overflow-hidden">
            <div className="bg-[#001E5A] px-6 sm:px-8 py-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D2003C] rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-white text-lg">MUSACCO Procedures</h2>
                <p className="text-white/60 text-xs mt-0.5">How to access MUSACCO services step by step</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {procedures.map((p) => (
                  <div key={p.step} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#D2003C] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white font-extrabold text-xs">{p.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#001E5A] text-sm mb-1">{p.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-[#E2E2EA] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <p className="text-gray-500 text-sm">Ready to get started? Visit any of our offices or call us.</p>
                <Link href="/contact"
                  className="shrink-0 bg-[#001E5A] hover:bg-[#D2003C] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Agency Banking — own agents */}
          <div className="bg-white rounded-2xl border border-[#E2E2EA] overflow-hidden">
            <div className="bg-[#001E5A] px-6 sm:px-8 py-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D2003C] rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-white text-lg">MUSACCO Agency Banking</h2>
                <p className="text-white/60 text-xs mt-0.5">Access services through our own authorised agents</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    MUSACCO operates its own network of authorised agents across the community. These agents allow members to conduct SACCO transactions conveniently without travelling to the main offices — saving time and transport costs.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Through MUSACCO agents you can make loan repayments, deposit savings and conduct other approved transactions. Always ensure you are transacting with an officially authorised MUSACCO agent.
                  </p>
                  <Link href="/contact?enquiry=services"
                    className="inline-flex items-center gap-2 bg-[#001E5A] hover:bg-[#D2003C] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                    Find an Agent Near You
                  </Link>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Loan Repayments", desc: "Repay your MUSACCO loan through any authorised agent." },
                    { title: "Savings Deposits", desc: "Deposit into your savings account without visiting the office." },
                    { title: "Balance Enquiries", desc: "Check your account balance through MUSACCO agents." },
                    { title: "Authorised & Secure", desc: "Only transact with agents officially approved by MUSACCO." },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3 bg-[#FAFAF5] rounded-xl p-3.5 border border-[#E2E2EA]">
                      <div className="w-8 h-8 bg-[#001E5A]/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#001E5A] text-xs">{f.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Banking */}
          <div className="bg-white rounded-2xl border border-[#E2E2EA] p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-[#001E5A]/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-[#001E5A] text-xl mb-2">Mobile Banking</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Contact our office to enquire about currently available mobile banking options including mobile money integrations for deposits and repayments.
                </p>
                <a href="tel:0394841360"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#001E5A] hover:underline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Call 0394 841 360 to enquire
                </a>
              </div>
            </div>
          </div>

          {/* Forms & Downloads */}
          <div className="bg-white rounded-2xl border border-[#E2E2EA] p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-[#D2003C]/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#D2003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-[#001E5A] text-xl mb-2">Forms & Downloads</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Visit any MUSACCO office to collect application forms for membership, loans and savings accounts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Membership Application Form","Loan Application Form","Savings Account Opening Form","Loan Guarantor Form"].map((f) => (
                    <div key={f} className="flex items-center gap-3 bg-[#FAFAF5] border border-[#E2E2EA] rounded-lg p-3">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span className="text-sm text-gray-600">{f}</span>
                      <span className="ml-auto text-xs font-semibold text-[#001E5A]">At office</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
