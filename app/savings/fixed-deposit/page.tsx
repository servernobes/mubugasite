import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/fixed-deposit", "Fixed Deposit Account", "Earn 13% per annum with a fixed deposit account at Mubuga SACCO in Kisoro District.");

export default function FixedDeposit() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["fixed-deposit"]} />
  );
}
