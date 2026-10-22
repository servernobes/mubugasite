import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Individual Account" };

export default function IndividualAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["individual"]} />
  );
}
