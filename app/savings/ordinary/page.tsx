import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/ordinary", "Ordinary Savings", "Ordinary savings accounts at Mubuga SACCO in Kisoro: keep your money safe and qualify for member loans.");

export default function OrdinarySavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["ordinary"]} />
  );
}
