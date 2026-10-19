import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Business Loan" };

export default function BusinessLoan() {
  return (
    <LoanDetailTemplate
      title="Business / Commercial Loan"
      tagline="Credit to grow your business, trade or commercial enterprise"
      description="The Business/Commercial Loan supports eligible members who run businesses, market stalls, retail shops or other trading and commercial activities. This product helps members invest in stock, equipment or working capital to sustain and grow their enterprises. All loans are at 1.8% per month on a reducing balance. Contact us to confirm current terms and eligibility."
      purpose={[
        "Purchasing business stock or inventory",
        "Meeting working capital needs for a small enterprise",
        "Acquiring equipment or tools for a business",
        "Supporting market traders and small shop owners",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "Evidence of an existing or planned business activity",
        "Ability to provide required security or guarantor",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Evidence of business activity where required",
        "Security or guarantor documentation as required",
      ]}
      faqs={[
        { q: "Can I apply for a business loan as a new member?", a: "Membership standing requirements must be confirmed with SACCO staff. Contact our office to discuss your situation." },
        { q: "Is there a minimum or maximum loan amount?", a: "Loan limits must be confirmed with SACCO management. We do not publish unverified figures." },
      ]}
    />
  );
}
