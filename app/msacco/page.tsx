import type { Metadata } from "next";
import Link from "next/link";
import MSACCOEnrollment from "../components/msacco/Enrollment";
import MSACCOAgency from "../components/msacco/Agency";
import MSACCOAccountHelp from "../components/msacco/AccountHelp";
import MSACCOBenefits from "../components/msacco/Benefits";

export const metadata: Metadata = {
  title: "MSACCO — Mobile Banking",
  description:
    "Join MSACCO to access Mubuga SACCO services on your phone via MTN or Airtel. Deposits, withdrawals, loan repayments and more.",
};

const tabs = [
  { id: "enroll", label: "How to Enroll" },
  { id: "agency", label: "Agent Guide" },
  { id: "account", label: "Account Help" },
  { id: "benefits", label: "Benefits" },
];

export default function MSACCOPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#001E5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#D2003C] rounded-xl px-3 py-1.5">
                  <p className="text-white text-xs font-black uppercase tracking-wider">MSACCO</p>
                </div>
                <span className="text-white/50 text-xs">Mobile Financial Services</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                Bank with Mubuga SACCO<br />
                <span className="text-[#FFE100]">on Your Phone</span>
              </h1>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mb-5">
                MSACCO lets you access your Mubuga SACCO account directly from your mobile phone through MTN or Airtel. Make deposits, withdrawals, loan repayments and school-fee payments — anytime, anywhere.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                  <p className="text-[#FFE100] text-xs font-bold mb-1">MTN USSD</p>
                  <p className="text-white font-extrabold text-lg tracking-wider">*165*6*3#</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                  <p className="text-[#FFE100] text-xs font-bold mb-1">Airtel USSD</p>
                  <p className="text-white font-extrabold text-lg tracking-wider">*185*7*3*1#</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                  <p className="text-[#FFE100] text-xs font-bold mb-1">Institution ID</p>
                  <p className="text-white font-extrabold text-base tracking-wider">MUBUG/230256</p>
                </div>
              </div>
            </div>
            {/* MSACCO icon panel */}
            <div className="hidden md:flex w-48 h-48 bg-white/10 rounded-3xl border border-white/20 items-center justify-center shrink-0">
              <div className="text-center">
                <svg className="w-16 h-16 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <p className="text-white/50 text-xs">Dial from your phone</p>
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div className="mt-6 bg-[#D2003C]/20 border border-[#D2003C]/40 rounded-xl px-4 py-3 flex items-start gap-3">
            <svg className="w-4 h-4 text-[#FFE100] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <p className="text-white/80 text-xs leading-relaxed">
              <strong className="text-white">Security:</strong> Never share your MSACCO PIN or mobile money PIN with anyone — including SACCO staff. Mubuga SACCO will never ask for your PIN. This website does not process transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-[#E2E2EA] sticky top-[66px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`}
                className="shrink-0 px-4 sm:px-5 py-3.5 text-sm font-semibold text-gray-500 hover:text-[#001E5A] border-b-2 border-transparent hover:border-[#001E5A] transition-colors whitespace-nowrap">
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-[#FAFAF5]">
        <MSACCOEnrollment />
        <MSACCOAgency />
        <MSACCOAccountHelp />
        <MSACCOBenefits />
      </div>

      {/* Help footer */}
      <div className="bg-[#001E5A] py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-extrabold text-white text-xl sm:text-2xl mb-2">Need Help with MSACCO?</h2>
          <p className="text-white/60 text-sm mb-6">
            Contact MSACCO customer care or visit any Mubuga SACCO office. Verify that these contact details are current before use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href="tel:0800220220"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              MSACCO Care: 0800 220 220
            </a>
            <a href="https://wa.me/256741241252" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: 0741-241252
            </a>
          </div>
          <p className="text-white/40 text-xs">
            Contact details sourced from MSACCO training materials. Verify with Mubuga SACCO before publication.
          </p>
          <div className="mt-5">
            <Link href="/contact" className="text-[#FFE100] text-sm font-semibold hover:underline">
              Contact Mubuga SACCO office →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
