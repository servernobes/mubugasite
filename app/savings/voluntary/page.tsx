import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";

export const metadata: Metadata = { title: "Voluntary Savings" };

export default function VoluntarySavings() {
  return (
    <SavingsDetailTemplate
      title="Voluntary Savings"
      tagline="Save on your own terms with flexible deposits"
      description="The Voluntary Savings account gives members the flexibility to save amounts of their choosing according to their financial circumstances. There is no fixed deposit schedule, making this product suitable for members with irregular incomes such as farmers or casual labourers. Contact us to confirm current terms."
      features={[
        "Flexible deposit amounts and schedule",
        "Suitable for members with variable incomes",
        "Interest rate to be confirmed with management",
        "Minimum and maximum balance terms to be confirmed",
      ]}
      suitableFor={[
        "Farmers and seasonal workers with irregular income",
        "Members who prefer flexibility over fixed commitments",
        "Members saving towards a specific goal",
      ]}
      faqs={[
        { q: "Is there a minimum amount I must deposit each time?", a: "Minimum deposit amounts must be confirmed with SACCO staff." },
        { q: "Can I hold both Ordinary and Voluntary savings accounts?", a: "Account holding arrangements must be confirmed with SACCO management." },
      ]}
    />
  );
}
