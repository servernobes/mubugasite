import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "School Fees Loan" };

export default function SchoolFeesLoan() {
  return (
    <LoanDetailTemplate
      title="School Fees Loan"
      tagline="Helping families meet education costs for their children"
      description="The School Fees Loan helps eligible members manage education expenses for their children at primary, secondary or tertiary level. Education is a priority investment for many families in Kisoro, and this product is designed to make it more manageable. Confirm current terms and requirements with our office."
      purpose={[
        "Payment of school fees at primary or secondary level",
        "Tertiary institution tuition and related costs",
        "School uniforms, books and learning materials",
        "Other directly education-related expenses",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "Responsibility for a child or student's education costs",
        "Ability to provide required security or guarantor",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "School fee invoice or admission letter where required",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "When should I apply for a school fees loan?", a: "Apply before the school term begins to allow processing time. Contact our office for guidance on timing." },
        { q: "Can the loan cover multiple children?", a: "Discuss your specific circumstances with SACCO staff. Loan terms are subject to management approval." },
      ]}
    />
  );
}
