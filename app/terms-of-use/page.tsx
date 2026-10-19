import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing this website, you agree to these terms of use. If you do not agree, please do not use this website." },
  { title: "2. Purpose of This Website", body: "This website provides general information about Mubuga SACCO Ltd, its products and services. It is not a platform for conducting financial transactions, opening accounts or applying for loans online." },
  { title: "3. Accuracy of Information", body: "We aim to keep information accurate and current. However, some details — including interest rates, product terms and branch information — require confirmation with SACCO management before you rely on them. We do not accept liability for decisions made on the basis of unverified website content." },
  { title: "4. No Financial Advice", body: "Nothing on this website constitutes financial advice. You should speak with SACCO staff or an independent financial adviser before making financial decisions." },
  { title: "5. Intellectual Property", body: "Content on this website, including text, the SACCO logo and any images, is the property of Mubuga SACCO Ltd or used with permission. Do not reproduce content without written permission." },
  { title: "6. Links", body: "This website may contain links to third-party websites. We are not responsible for the content or practices of external sites." },
  { title: "7. Governing Law", body: "These terms are governed by the laws of Uganda. Any disputes will be subject to the jurisdiction of Ugandan courts." },
  { title: "8. Changes", body: "We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the updated terms." },
  { title: "9. Contact", body: "Questions about these terms can be directed to mubugasacco@gmail.com or 0394 841 360." },
];

export default function TermsOfUse() {
  return (
    <>
      <div className="bg-[#001E5A] py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Use</h1>
          <p className="text-white/60 mt-2 text-xs sm:text-sm">
            Last reviewed: [Date to be confirmed by management]
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6 sm:space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
          <p className="text-amber-800 text-sm leading-relaxed">
            These terms of use are a placeholder. A legally reviewed terms document must be drafted
            and approved by management or a qualified legal adviser before public launch.
          </p>
        </div>

        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-[#001E5A] text-base sm:text-lg mb-2">{s.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
