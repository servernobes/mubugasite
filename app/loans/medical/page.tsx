import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Medical Loan" };

export default function MedicalLoan() {
  return (
    <LoanDetailTemplate
      title="Medical Loan"
      tagline="Accessing funds for urgent medical and healthcare needs"
      description="The Medical Loan is available to eligible members who need to meet urgent medical or healthcare expenses for themselves or their family members. Health emergencies create sudden financial pressure and this product aims to provide timely support. All loans are at 1.8% per month on a reducing balance. Contact us to confirm eligibility."
      purpose={[
        "Meeting hospital bills and inpatient treatment costs",
        "Paying for prescribed medicines and medical supplies",
        "Covering outpatient consultation and diagnostic fees",
        "Other urgent healthcare-related expenses",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "A verifiable medical or healthcare need",
        "Ability to provide required security or guarantor",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Medical documentation or hospital invoice where required",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "How quickly can a medical loan be processed?", a: "Contact our office urgently on 0394 841 360. Staff will advise on processing times for medical emergencies." },
        { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance." },
      ]}
    />
  );
}
