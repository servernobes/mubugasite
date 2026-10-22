import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Voluntary Savings" };

export default function VoluntarySavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["voluntary"]} />
  );
}
