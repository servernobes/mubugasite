import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/junior", "Junior / Minor Account", "Junior (minor) savings accounts at Mubuga SACCO to help parents in Kisoro save for their children's future.");

export default function JuniorSavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["junior"]} />
  );
}
