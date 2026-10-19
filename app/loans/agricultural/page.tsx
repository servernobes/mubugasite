import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Agricultural Loan" };

export default function AgriculturalLoan() {
  return (
    <LoanDetailTemplate
      title="Agricultural Loan"
      tagline="Supporting farmers and rural livelihoods in Kisoro District — 3-month grace period"
      description="The Agricultural Loan is designed to help eligible members finance farming-related activities. It includes a 3-month grace period to align with farming cycles. Agriculture is central to many households in Kisoro, and this product aims to support members in investing in their farming operations. All loans are at 1.8% per month on a reducing balance. Contact us to confirm eligibility and current terms."
      purpose={[
        "Purchase of farm inputs such as seeds and fertilisers",
        "Preparation and cultivation of agricultural land",
        "Other farm-related productive activities",
        "Post-harvest handling and storage expenses",
      ]}
      eligibility={[
        "Active membership in good standing with Mubuga SACCO",
        "Engagement in farming or agricultural activities",
        "Ability to provide required security or guarantor",
        "Other criteria as determined by SACCO management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Security or guarantor documentation as required",
        "Any additional documents specified by management",
      ]}
      faqs={[
        { q: "Who can apply for an agricultural loan?", a: "Active SACCO members engaged in farming activities may apply. Eligibility criteria must be confirmed with our office." },
        { q: "Are interest rates fixed or variable?", a: "Interest rates must be confirmed with SACCO staff. Do not rely on unofficial sources for rate information." },
      ]}
    />
  );
}
