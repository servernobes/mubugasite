import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";

export const metadata: Metadata = { title: "School Fees Collection Account" };

export default function SchoolFeesCollection() {
  return (
    <SavingsDetailTemplate
      title="School Fees Collection Account"
      tagline="Plan ahead and save for your children's education"
      description="The School Fees Collection Account is a dedicated savings account that helps families accumulate funds specifically for school fee payments. By saving consistently throughout the year, families can reduce the financial pressure that comes with each school term. Confirm account terms with SACCO staff."
      features={[
        "Dedicated account for accumulating school fee funds",
        "Helps families plan ahead for term-by-term payments",
        "Encourages disciplined saving around the school calendar",
        "Terms and access conditions to be confirmed with management",
      ]}
      suitableFor={[
        "Parents and guardians with school-going children",
        "Families planning ahead for secondary or tertiary fees",
        "Members who receive income seasonally and want to spread costs",
      ]}
      faqs={[
        { q: "Can funds be withdrawn at any time or only at term time?", a: "Withdrawal conditions must be confirmed with SACCO staff when opening the account." },
        { q: "Is this account separate from my ordinary savings?", a: "Account structure and separation from other products must be confirmed with management." },
      ]}
    />
  );
}
