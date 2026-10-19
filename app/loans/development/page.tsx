import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Development Loan" };

export default function DevelopmentLoan() {
  return (
    <LoanDetailTemplate
      title="Development Loan"
      tagline="Finance for productive development activities in your community"
      description="The Development Loan supports eligible members undertaking productive development projects that improve livelihoods and contribute to community progress. This may include income-generating investments and other development activities. All loans are at 1.8% per month on a reducing balance. Contact our office to confirm eligibility and terms."
      purpose={[
        "Income-generating development projects",
        "Community development and improvement activities",
        "Productive investments that grow over time",
        "Other development activities approved by management",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "A clearly defined productive development purpose",
        "Ability to provide required security or guarantor",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Description or plan of the development activity",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "What qualifies as a development activity?", a: "Contact our office to discuss your specific project. Staff will advise on whether it qualifies under this product." },
        { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance. Contact us to get your specific repayment schedule." },
      ]}
    />
  );
}
