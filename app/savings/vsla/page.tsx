import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";

export const metadata: Metadata = { title: "VSLA Savings" };

export default function VslaSavings() {
  return (
    <SavingsDetailTemplate
      title="VSLA Savings"
      tagline="Village savings and lending association accounts for group savers"
      description="The VSLA Savings account supports members who save as part of a village savings and lending association group. VSLA groups are a common and effective savings model in Ugandan communities, allowing members to pool resources and access small loans within the group. Contact us to learn how Mubuga SACCO can support your VSLA group."
      features={[
        "Designed for VSLA group members saving collectively",
        "Supports community-based savings models",
        "Group account management terms to be confirmed",
        "Interest and access terms to be confirmed with management",
      ]}
      suitableFor={[
        "Members who are part of an existing VSLA group",
        "Community groups looking to formalise their savings",
        "Groups seeking a safe and accountable savings structure",
      ]}
      faqs={[
        { q: "Can our VSLA group open an account even if not all members are SACCO members?", a: "Group membership and account requirements must be confirmed with SACCO staff." },
        { q: "How does the group access funds from the account?", a: "Account access and authorisation procedures must be confirmed with SACCO management." },
      ]}
    />
  );
}
