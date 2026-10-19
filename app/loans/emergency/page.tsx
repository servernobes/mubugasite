import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Emergency Loan" };

export default function EmergencyLoan() {
  return (
    <LoanDetailTemplate
      title="Emergency Loan"
      tagline="Fast access to funds when you need them most"
      description="The Emergency Loan provides eligible members with rapid access to funds for urgent and immediate financial needs. This product is designed for genuine emergencies where time is critical. All loans are at 1.8% per month on a reducing balance. Contact our office to confirm eligibility and begin your application."
      purpose={[
        "Addressing genuine urgent financial emergencies",
        "Covering unexpected essential expenses",
        "Short-term relief for critical situations",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "A genuine and verifiable emergency need",
        "Sufficient savings balance or guarantor as required",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Evidence of the emergency where required",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "How fast is an emergency loan processed?", a: "Contact our office immediately on 0394 841 360. Staff will prioritise genuine emergency applications." },
        { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance." },
      ]}
    />
  );
}
