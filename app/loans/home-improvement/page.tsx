import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";

export const metadata: Metadata = { title: "Home Improvement Loan" };

export default function HomeImprovementLoan() {
  return (
    <LoanDetailTemplate
      title="Home Improvement Loan"
      tagline="Finance to develop and improve your family home"
      description="The Home Improvement Loan helps eligible members invest in the construction, renovation or development of their family homes. Improving one's living conditions is a meaningful goal for many households in Kisoro. Contact our office to confirm current terms and eligibility requirements."
      purpose={[
        "Construction of a new family home",
        "Renovation or extension of an existing structure",
        "Roofing, flooring and structural improvements",
        "Installation of basic home utilities and amenities",
      ]}
      eligibility={[
        "Active SACCO membership in good standing",
        "Ownership or lawful occupation of the property",
        "Ability to provide required security or guarantor",
        "Other criteria as confirmed by management",
      ]}
      documents={[
        "Valid national identification document",
        "Proof of SACCO membership",
        "Completed loan application form",
        "Land title or proof of property rights where required",
        "Security or guarantor documentation",
      ]}
      faqs={[
        { q: "Do I need to own land to qualify?", a: "Property requirements must be confirmed with SACCO staff. Contact our office to discuss your situation." },
        { q: "Can I use this loan for rental property construction?", a: "The intended use is subject to management approval. Discuss your plans with SACCO staff before applying." },
      ]}
    />
  );
}
