import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Boda Boda Loan" };

export default function BodaBodaLoan() {
  return (
    <LoanDetailTemplate
      title="Boda Boda Loan"
      tagline="Finance for boda boda operators in Kisoro"
      description="The Boda Boda Loan is designed for eligible members who operate or intend to operate motorcycle taxis. This product can assist with acquiring a motorcycle or meeting maintenance costs. Boda boda transport plays an important role in the local economy. Contact us to confirm eligibility and current terms."
      purpose={[
        "Acquisition of a motorcycle for boda boda operations",
        "Repair and maintenance of an existing motorcycle",
        "Meeting operational costs for boda boda transport",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "Engagement in or intention to engage in boda boda operations",
        "Ability to provide required security or guarantor",
        "Valid riding licence where applicable",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Riding licence or relevant permit where required",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "Can I apply if I do not yet own a motorcycle?", a: "Contact our office to discuss your circumstances. Eligibility depends on criteria set by management." },
        { q: "Does the SACCO require the motorcycle as security?", a: "Security requirements must be confirmed with SACCO staff before applying." },
      ]}
    />
  );
}
