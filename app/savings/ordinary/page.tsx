import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";

export const metadata: Metadata = { title: "Ordinary Savings" };

export default function OrdinarySavings() {
  return (
    <SavingsDetailTemplate
      title="Ordinary Savings"
      tagline="A regular savings account for all Mubuga SACCO members"
      description="The Ordinary Savings account is the standard savings account available to all members of Mubuga SACCO. It allows members to deposit money regularly and build their savings over time. This account is typically a prerequisite for accessing loan products. Contact us to confirm current terms."
      features={[
        "Available to all active SACCO members",
        "Regular deposits encouraged to build savings",
        "Savings balance may support loan eligibility",
        "Interest rate to be confirmed with SACCO management",
        "Minimum balance requirements to be confirmed",
      ]}
      suitableFor={[
        "All members wishing to begin saving with the SACCO",
        "Members building savings towards a loan application",
        "Individuals who want a safe and accessible place to save",
      ]}
      faqs={[
        { q: "How do I open an Ordinary Savings account?", a: "Visit our Nyakinama office to complete the account opening process. Bring your national identification document and proof of membership." },
        { q: "Can I withdraw from my savings at any time?", a: "Withdrawal terms must be confirmed with SACCO staff. Some restrictions may apply." },
      ]}
    />
  );
}
