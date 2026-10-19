"use client";
import { useState } from "react";

const accountOptions = [
  { opt: "1", title: "Request Token", desc: "Request a token for account verification or recovery purposes." },
  { opt: "2", title: "Reset PIN", desc: "Reset your MSACCO PIN if you have forgotten it or it has been compromised. You will need your recovery number." },
  { opt: "3", title: "Change PIN", desc: "Change your 5-digit MSACCO PIN to a new one. You must know your current PIN." },
  { opt: "4", title: "Change Recovery Number", desc: "Update the alternative number linked to your MSACCO account." },
  { opt: "5", title: "View Recovery Number", desc: "View the recovery number currently registered on your account." },
  { opt: "6", title: "View MSACCO Number", desc: "View your assigned MSACCO number. Useful if you have forgotten it." },
  { opt: "7", title: "Approval", desc: "Used to approve pending actions or authorizations on the account." },
];

const errors = [
  {
    code: "Invalid Account / Low SACCO Credit",
    cause: "The account number entered is incorrect, or the SACCO has insufficient credit to process the transaction.",
    fix: "Confirm the correct account number at the Mubuga SACCO office. Contact staff if the SACCO credit issue persists.",
  },
  {
    code: "Insufficient Float",
    cause: "The agent does not have enough float to process the withdrawal.",
    fix: "As an agent, top up your float before attempting the transaction again.",
  },
  {
    code: "Failed to Retrieve Customer Details",
    cause: "The MSACCO system could not find the customer's KYC information for the account number entered.",
    fix: "Verify the customer's MSACCO number is correct. The customer should confirm their number by dialing the USSD and selecting View MSACCO Number.",
  },
  {
    code: "Device Identifier Mismatch",
    cause: "The SIM card or device being used does not match the one registered for this MSACCO account.",
    fix: "Use the same phone and SIM used during enrollment. If the SIM has changed, visit the office to update records.",
  },
  {
    code: "Transaction Failure",
    cause: "The transaction could not be completed due to a system or network error.",
    fix: "Wait a few minutes and try again. If the problem persists, call MSACCO customer care on 0800 220 220.",
  },
  {
    code: "SIM Registration Name Mismatch",
    cause: "The name on the SIM card does not match the name in SACCO or MSACCO records.",
    fix: "Visit Mubuga SACCO office to ensure your registered name matches your telecoms SIM registration.",
  },
  {
    code: "Unable to Retrieve Balance",
    cause: "The balance enquiry could not be completed, usually due to a network or system timeout.",
    fix: "Try again after a short wait. Contact MSACCO care if the issue continues.",
  },
  {
    code: "Failed Onboarding",
    cause: "Enrollment did not complete. Common reasons: name mismatch, wrong institution ID, wrong account number.",
    fix: "Check all enrollment details carefully. Use Institution ID MUBUG/230256. Ensure your SACCO account number is correct and visit the office if needed.",
  },
];

export default function MSACCOAccountHelp() {
  const [openError, setOpenError] = useState<number | null>(null);

  return (
    <section id="account" className="py-12 sm:py-16 scroll-mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="section-label">Help & Support</span>
          <h2 className="section-title">Account Management & Troubleshooting</h2>
        </div>

        {/* Account options */}
        <div className="bg-white rounded-2xl border border-[#E2E2EA] mb-8 overflow-hidden">
          <div className="bg-[#001E5A] px-5 py-4">
            <h3 className="font-bold text-white text-sm">Account Management Options</h3>
            <p className="text-white/50 text-xs mt-0.5">Access these by dialing your USSD code → MSACCO → Account</p>
          </div>
          <div className="divide-y divide-[#E2E2EA]">
            {accountOptions.map((o) => (
              <div key={o.opt} className="flex items-start gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#001E5A]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#001E5A] font-extrabold text-sm">{o.opt}</span>
                </div>
                <div>
                  <p className="font-bold text-[#001E5A] text-sm">{o.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error guide */}
        <div className="bg-white rounded-2xl border border-[#E2E2EA] overflow-hidden">
          <div className="bg-[#D2003C] px-5 py-4">
            <h3 className="font-bold text-white text-sm">Common Errors & What to Do</h3>
            <p className="text-white/70 text-xs mt-0.5">Tap an error to see the cause and solution</p>
          </div>
          <div className="divide-y divide-[#E2E2EA]">
            {errors.map((e, i) => (
              <div key={e.code}>
                <button
                  onClick={() => setOpenError(openError === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[#FAFAF5] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D2003C] shrink-0" />
                    <span className="font-semibold text-[#001E5A] text-sm">{e.code}</span>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openError === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {openError === i && (
                  <div className="px-5 pb-5 bg-[#FAFAF5]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Cause</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{e.cause}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#001E5A] uppercase tracking-wider mb-1.5">What to Do</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{e.fix}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer care */}
        <div className="mt-6 bg-[#001E5A] rounded-2xl p-5 sm:p-6">
          <h3 className="font-bold text-white mb-4 text-sm">MSACCO Customer Care</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:0800220220"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors">
              <svg className="w-5 h-5 text-[#FFE100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <p className="text-white/50 text-xs">Phone</p>
                <p className="text-white font-bold">0800 220 220</p>
              </div>
            </a>
            <a href="https://wa.me/256741241252" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 rounded-xl px-4 py-3 transition-colors">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div>
                <p className="text-white/50 text-xs">WhatsApp</p>
                <p className="text-white font-bold">0741-241252</p>
              </div>
            </a>
          </div>
          <p className="text-white/40 text-xs mt-3">Contact details from MSACCO training materials — verify before publication.</p>
        </div>
      </div>
    </section>
  );
}
