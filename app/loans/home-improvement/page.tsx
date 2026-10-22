import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Home Improvement Loan" };

export default function HomeImprovementLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["home-improvement"]} />
  );
}
