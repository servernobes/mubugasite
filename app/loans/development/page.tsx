import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Development Loan" };

export default function DevelopmentLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["development"]} />
  );
}
