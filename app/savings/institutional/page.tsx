import type { Metadata } from "next";
import SavingsDetailTemplate from "../../components/SavingsDetailTemplate";
import { SAVINGS_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Institutional Account" };

export default function InstitutionalAccount() {
  return (
    <SavingsDetailTemplate {...SAVINGS_DETAILS["institutional"]} />
  );
}
