import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/institutional", "Institutional Account", "Savings accounts at Mubuga SACCO for schools, churches, cooperatives and other institutions in Kisoro.");

export default function InstitutionalAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["institutional"]} />
  );
}
