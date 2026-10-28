import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/voluntary", "Voluntary Savings", "Voluntary savings accounts at Mubuga SACCO: save any amount, any time, and build your savings in Kisoro.");

export default function VoluntarySavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["voluntary"]} />
  );
}
