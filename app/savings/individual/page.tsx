import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/individual", "Individual Account", "Open an individual savings account at Mubuga SACCO in Kisoro and save safely for your goals.");

export default function IndividualAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["individual"]} />
  );
}
