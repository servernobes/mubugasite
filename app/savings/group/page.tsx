import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/savings/group", "Group Account", "Group savings accounts at Mubuga SACCO for savings groups, associations and VSLAs in Kisoro District.");

export default function GroupAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["group"]} />
  );
}
