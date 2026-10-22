import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Fixed Deposit Account" };

export default function FixedDeposit() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["fixed-deposit"]} />
  );
}
