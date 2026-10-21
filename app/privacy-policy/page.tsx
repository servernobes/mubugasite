import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  { title: "1. Who We Are", body: "Mubuga SACCO Ltd is a savings and credit cooperative society registered in Uganda with its head office at Nyakinama Sub-county, Kisoro District. References to 'we', 'us' and 'our' in this policy refer to Mubuga SACCO Ltd." },
  { title: "2. Information We Collect", body: "When you use this website's contact form, we collect the name, phone number, email address (if provided) and message content you submit. We do not collect national identification numbers, account details, passwords or sensitive financial information through this public website." },
  { title: "3. How We Use Your Information", body: "We use contact form submissions solely to respond to your enquiry. We do not sell, rent or share your personal information with third parties for marketing purposes. We may retain records of enquiries for administrative purposes in line with applicable Ugandan law." },
  { title: "4. Data Security", body: "We take reasonable steps to protect information submitted through this website. However, no internet transmission is completely secure. Do not submit sensitive personal or financial information through the contact form." },
  { title: "5. Your Rights", body: "You may request access to, correction of or deletion of personal information we hold about you by contacting us at mubugasacco@gmail.com or visiting our office. We will respond within a reasonable timeframe." },
  { title: "6. Cookies", body: "This website may use basic cookies for functionality. We do not currently use tracking or analytics cookies. If this changes, this policy will be updated." },
  { title: "7. Contact", body: "For any questions about this privacy policy, contact us at mubugasacco@gmail.com or call 0394 841 360." },
];

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">Privacy Policy</h1>
          <p className="text-gray-600 mt-2 text-xs sm:text-sm">
            Last reviewed: [Date to be confirmed by management]
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6 sm:space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
          <p className="text-amber-800 text-sm leading-relaxed">
            This privacy policy is a placeholder. A legally reviewed privacy policy must be drafted and
            approved by management or a qualified legal adviser before the website is launched publicly.
          </p>
        </div>

        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-brand-ink text-base sm:text-lg mb-2">{s.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
