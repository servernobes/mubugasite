import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Ordinary Savings" };

export default function OrdinarySavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["ordinary"]} />
  );
}
