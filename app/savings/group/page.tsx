import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Group Account" };

export default function GroupAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["group"]} />
  );
}
