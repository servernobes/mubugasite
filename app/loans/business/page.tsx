import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Business Loan" };

export default function BusinessLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["business"]} />
  );
}
