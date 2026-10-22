import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Agricultural Loan" };

export default function AgriculturalLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["agricultural"]} />
  );
}
