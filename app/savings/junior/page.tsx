import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Junior / Minor Account" };

export default function JuniorSavings() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["junior"]} />
  );
}
