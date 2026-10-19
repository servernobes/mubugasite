import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";

export const metadata: Metadata = { title: "Junior / Minor Savings" };

export default function JuniorSavings() {
  return (
    <SavingsDetailTemplate
      title="Junior / Minor Savings"
      tagline="Building a savings habit for children and young people"
      description="The Junior or Minor Savings account is designed to help parents, guardians and families save on behalf of children. Starting a savings habit early can help young people develop financial responsibility and build a foundation for their future. Confirm account terms and age requirements with SACCO staff."
      features={[
        "Opened and managed by a parent or guardian on behalf of a minor",
        "Encourages a savings culture from a young age",
        "Terms and minimum ages to be confirmed with management",
        "Interest rates to be confirmed with SACCO staff",
      ]}
      suitableFor={[
        "Parents saving on behalf of their children",
        "Guardians managing finances for minors in their care",
        "Families planning for a child's future education expenses",
      ]}
      faqs={[
        { q: "At what age can a child hold their own account?", a: "Age requirements and transition arrangements must be confirmed with SACCO staff." },
        { q: "Who controls the account while the child is a minor?", a: "Account control arrangements must be confirmed with SACCO management when opening the account." },
      ]}
    />
  );
}
